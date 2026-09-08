# Infrastructure

Everything Amp'd Resume runs on is defined here. There is a single production environment.

| Component      | Service                      | Why                                                                                  |
| -------------- | ---------------------------- | ------------------------------------------------------------------------------------ |
| Application    | Cloud Run                    | Scales to zero, so an idle service costs nothing                                     |
| Database       | Neon serverless Postgres     | Suspends compute after 5 minutes idle; Cloud SQL and AlloyDB both bill for always-on |
| Images         | Artifact Registry            | Same-region pulls, with cleanup policies to cap storage cost                         |
| Secrets        | Secret Manager               | Mounted into Cloud Run as environment variables                                      |
| CI credentials | Workload Identity Federation | GitHub Actions authenticates without any stored service account key                  |
| CI artifacts   | Cloud Storage                | Cypress screenshots from failed runs, deleted after 30 days                          |

## Cost shape

Both compute layers idle at zero. Cloud Run has `min_instance_count = 0` with `cpu_idle` enabled, so
CPU and memory are billed only while a request is in flight. Neon suspends its compute after five
minutes of inactivity. The trade-off is a cold start on the first request after a quiet period:
roughly a second for Cloud Run, plus a few hundred milliseconds for Neon to resume.

The only unconditional costs are Artifact Registry and Cloud Storage, both of which are pennies per
month at this size.

## First-time setup

Terraform cannot create the bucket that stores its own state, so that part is bootstrapped by a
script.

```bash
# 1. Create the state bucket and enable the APIs Terraform itself needs.
./scripts/gcp-bootstrap.sh YOUR_PROJECT_ID us-west1

# 2. Provide credentials for the two providers.
gcloud auth application-default login
export NEON_API_KEY=...   # https://console.neon.tech -> Account Settings -> API Keys

# 3. Fill in the project-specific values.
cp terraform/terraform.tfvars.example terraform/terraform.tfvars
$EDITOR terraform/terraform.tfvars

# 4. Build everything.
cd terraform
terraform init
terraform apply
```

The first apply creates the Cloud Run service using Google's placeholder `hello` image, because CI
has not pushed a real one yet. Terraform ignores the image field from then on, so deploys and
Terraform runs do not fight over it.

### Populate the secrets

Terraform creates the Secret Manager entries with placeholder values and never sees the real ones.
Fill them in afterwards:

```bash
./scripts/gcp-set-secrets.sh YOUR_PROJECT_ID
```

`DATABASE_URL` is the exception: it comes from the Neon project Terraform just created, so Terraform
manages that value directly.

### Wire up GitHub Actions

`terraform output` prints the values the workflows expect. Set these as **repository variables**
(Settings → Secrets and variables → Actions → Variables) — none of them are secret:

| Variable                         | Source                                        |
| -------------------------------- | --------------------------------------------- |
| `GCP_PROJECT_ID`                 | your project ID                               |
| `GCP_REGION`                     | your region, e.g. `us-west1`                  |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | `terraform output workload_identity_provider` |
| `GCP_DEPLOY_SERVICE_ACCOUNT`     | `terraform output deployer_service_account`   |
| `GCP_TERRAFORM_SERVICE_ACCOUNT`  | `terraform output terraform_service_account`  |
| `CLOUD_RUN_SERVICE`              | `ampdresume`                                  |
| `GCS_CI_ARTIFACTS_BUCKET`        | `terraform output ci_artifacts_bucket`        |
| `NEXT_PUBLIC_BASE_URL`           | `https://ampdresume.com`                      |
| `NEXT_PUBLIC_SENTRY_DSN`         | your Sentry DSN                               |

And these as repository **secrets**:

| Secret              | Used by                                  |
| ------------------- | ---------------------------------------- |
| `NEON_API_KEY`      | Terraform workflows                      |
| `SENTRY_AUTH_TOKEN` | source map upload during the image build |
| `CODECOV_TOKEN`     | coverage upload                          |

## Custom domain

`enable_domain_mapping` is off by default. Cloud Run domain mappings are only offered in some
regions and require the domain to be verified in Google Search Console first. Turn the variable on
once verification is done, then point DNS at the records Cloud Run reports:

```bash
gcloud beta run domain-mappings describe --domain ampdresume.com --region us-west1
```

If the domain is fronted by Cloudflare or another CDN, leave the mapping off and point the CDN at
the Cloud Run URL from `terraform output cloud_run_url` instead.

## Day-to-day

Terraform changes go through pull requests: `ci-infrastructure.yml` runs `fmt`, `validate`, and
`plan`; `cd-infrastructure.yml` applies on merge to `main`. Application changes are deployed
separately by `cd-app.yml`, which builds the image, migrates the database, and updates the service.

Two notes on state and locking:

- The state file contains the Neon connection string in cleartext. The bootstrap script creates the
  bucket with public access prevention and versioning; keep IAM on it tight.
- Do not run `terraform init -upgrade` in CI. The Neon provider is community-maintained, and an
  unattended major upgrade can plan a replacement of the database. Upgrade locally, review the plan,
  and commit the updated `.terraform.lock.hcl`.
