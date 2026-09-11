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

This is the one-time path from an empty Google Cloud account to a Cloud Run service on a live
domain. After it, day-to-day deploys are pull requests to `main`.

### Prerequisites

- A Google account that can create projects, and a
  [billing account](https://console.cloud.google.com/billing) attached to it. Cloud Run and the
  supporting APIs will not enable without billing, even though idle spend is near zero.
- The [gcloud CLI](https://cloud.google.com/sdk/docs/install) and
  [Terraform](https://developer.hashicorp.com/terraform/install) >= 1.9.
- A [Neon](https://console.neon.tech) account. Terraform creates the Postgres project; you only
  supply an organization ID and API key.
- A GitHub repository this configuration is allowed to deploy from (this repo, or a fork).
- A domain you control, if you want a public hostname instead of the `*.run.app` URL Cloud Run
  assigns.

If you are publishing a fork rather than this project as-is, plan to change `project_id`, `domain`,
`github_repository`, and the Terraform state bucket name. GCS bucket names are globally unique;
`ampdresume-tf-state` is already taken by the production project.

### 1. Create the Google Cloud project

```bash
# Optional: confirm you are signed in as the right account.
gcloud auth login
gcloud auth list

# Project IDs are globally unique, 6–30 characters, lowercase letters, digits, hyphens.
gcloud projects create YOUR_PROJECT_ID --name="Amp'd Resume"

gcloud config set project YOUR_PROJECT_ID
```

You can also create the project in the
[Google Cloud Console](https://console.cloud.google.com/projectcreate). Either way, your user needs
**Owner** (or equivalent) on the project so Terraform can create IAM bindings and enable APIs.

### 2. Link a billing account

```bash
gcloud billing accounts list
gcloud billing projects link YOUR_PROJECT_ID --billing-account=BILLING_ACCOUNT_ID
```

### 3. Authenticate the Google provider

Terraform uses Application Default Credentials, which are separate from the `gcloud` user login:

```bash
gcloud auth application-default login
```

### 4. Bootstrap the Terraform state bucket

Terraform cannot create the bucket that stores its own state, so that part is a script. It also
enables the few APIs Terraform itself needs (`cloudresourcemanager`, `iam`, `serviceusage`,
`storage`).

```bash
./scripts/gcp-bootstrap.sh YOUR_PROJECT_ID us-west1
```

The script creates `gs://ampdresume-tf-state` with public access prevention and versioning. If you
need a different name, change it in both `scripts/gcp-bootstrap.sh` (`STATE_BUCKET`) and
`terraform/versions.tf` (`backend "gcs"`) before running the script.

### 5. Neon credentials

Create an API key at https://console.neon.tech → Account Settings → API Keys, and copy the
organization ID from Account Settings → Organization.

```bash
export NEON_API_KEY=...
```

### 6. Fill in project-specific values

```bash
cp terraform/terraform.tfvars.example terraform/terraform.tfvars
```

Set at least:

| Variable            | What to put there                                                               |
| ------------------- | ------------------------------------------------------------------------------- |
| `project_id`        | the Google Cloud project ID from step 1                                         |
| `region`            | e.g. `us-west1`. Domain mappings are only offered in some regions               |
| `domain`            | the hostname the site will be served from, e.g. `example.com`                   |
| `neon_org_id`       | from the Neon console                                                           |
| `github_repository` | `owner/name` of the repo GitHub Actions will deploy from (default is this repo) |

Leave `enable_domain_mapping` `false` until the domain is verified (see
[Custom domain](#custom-domain)). `terraform.tfvars` is gitignored for local use. CI sets the same
inputs with `TF_VAR_*` from GitHub Actions repository variables.

### 7. Apply

```bash
cd terraform
terraform init
terraform apply
```

The first apply creates the Cloud Run service using Google's placeholder `hello` image, because CI
has not pushed a real one yet. Terraform ignores the image field from then on, so deploys and
Terraform runs do not fight over it. The remaining Google APIs (Cloud Run, Artifact Registry, Secret
Manager, STS, and so on) are enabled as part of this apply.

### 8. Populate the secrets

Terraform creates the Secret Manager entries with placeholder values and never sees the real ones.
Add a new version for each secret in the
[Google Cloud Console](https://console.cloud.google.com/security/secret-manager) (Secret Manager →
open the secret → **New version**). Cloud Run reads `latest`, so the next cold start picks the new
value up; run `gcloud run services update ampdresume --region REGION` to force it sooner.

| Secret ID                           | Environment variable     |
| ----------------------------------- | ------------------------ |
| `ampdresume-nextauth-secret`        | `NEXTAUTH_SECRET`        |
| `ampdresume-google-client-id`       | `GOOGLE_CLIENT_ID`       |
| `ampdresume-google-client-secret`   | `GOOGLE_CLIENT_SECRET`   |
| `ampdresume-linkedin-client-id`     | `LINKEDIN_CLIENT_ID`     |
| `ampdresume-linkedin-client-secret` | `LINKEDIN_CLIENT_SECRET` |
| `ampdresume-email-server-host`      | `EMAIL_SERVER_HOST`      |
| `ampdresume-email-server-user`      | `EMAIL_SERVER_USER`      |
| `ampdresume-email-server-password`  | `EMAIL_SERVER_PASSWORD`  |
| `ampdresume-openai-api-key`         | `OPENAI_API_KEY`         |
| `ampdresume-neon-api-key`           | `NEON_API_KEY`           |

Leave `ampdresume-database-url` and `ampdresume-database-url-direct` alone: Terraform writes those
from the Neon project.

`NEON_API_KEY` still needs to be in the environment on first apply, before the Secret Manager entry
exists. After the value is in the console, load secrets into the current shell with:

```bash
eval "$(./scripts/gcp-fetch-secrets.sh YOUR_PROJECT_ID)"
```

That exports the application secrets plus `NEON_API_KEY` and `DATABASE_URL`. `DATABASE_URL` will be
the production Neon connection string, not the local Docker Postgres URL.

For Google and LinkedIn OAuth to work on the live domain, register authorized redirect URIs of
`https://YOUR_DOMAIN/api/auth/callback/google` and `https://YOUR_DOMAIN/api/auth/callback/linkedin`
with those providers, and set the origin to `https://YOUR_DOMAIN`.

### 9. Wire up GitHub Actions

Set these as **repository variables** (Settings → Secrets and variables → Actions → Variables) —
none of them are secret. After auth, CI runs `scripts/gcp-fetch-secrets.sh` so `NEON_API_KEY` and
the other Secret Manager values are injected into the job environment. Terraform plan/apply read the
same variables as `TF_VAR_*` (`github.repository` supplies `github_repository`).

| Variable                         | Source                                        |
| -------------------------------- | --------------------------------------------- |
| `GCP_PROJECT_ID`                 | your project ID                               |
| `GCP_REGION`                     | your region, e.g. `us-west1`                  |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | `terraform output workload_identity_provider` |
| `GCP_DEPLOY_SERVICE_ACCOUNT`     | `terraform output deployer_service_account`   |
| `GCP_TERRAFORM_SERVICE_ACCOUNT`  | `terraform output terraform_service_account`  |
| `CLOUD_RUN_SERVICE`              | `ampdresume`                                  |
| `GCS_CI_ARTIFACTS_BUCKET`        | `terraform output ci_artifacts_bucket`        |
| `DOMAIN`                         | apex hostname, e.g. `ampdresume.com`          |
| `NEON_ORG_ID`                    | Neon organization ID                          |

If you forked this repo, point those variables at your own project.

Optional repository **secrets**:

| Secret                   | Used by                                                                    |
| ------------------------ | -------------------------------------------------------------------------- |
| `NEON_API_KEY`           | Fallback for Terraform if `ampdresume-neon-api-key` is still a placeholder |
| `SENTRY_AUTH_TOKEN`      | source map upload during the image build                                   |
| `CODECOV_TOKEN`          | coverage upload                                                            |
| `NEXT_PUBLIC_SENTRY_DSN` | optional; also accepted as a repository variable                           |

`NEON_API_KEY` is primarily `ampdresume-neon-api-key` in Secret Manager. The GitHub secret is only
needed before that entry has a real value.

Workload Identity Federation is scoped to `github_repository`. If that Terraform variable does not
match the repo these workflows run in, authentication will fail.

### 10. Deploy the application

Until CI has pushed an image, Cloud Run still serves Google's `hello` placeholder. After the Actions
variables and secrets are in place, run **CD: App** from the Actions tab (`workflow_dispatch`), or
merge a commit to `main`. That workflow builds the image, runs Prisma migrations against Neon, and
updates the Cloud Run service.

Confirm it with:

```bash
terraform output cloud_run_url
```

## Custom domain

Cloud Run always assigns a `*.run.app` URL. Mapping your own domain is a separate, optional step.

`enable_domain_mapping` is off by default. Domain mappings are only offered in some regions
(including `us-west1`) and require the domain to be verified against this Google Cloud project:

1. Add the domain as a **Domain** property in
   [Google Search Console](https://search.google.com/search-console) and complete the DNS TXT
   verification.
2. In Google Cloud Console, open **APIs & Services → Domain verification**, add the same domain, and
   select this project so Cloud Run is allowed to serve it.
3. Set `enable_domain_mapping = true` in `terraform.tfvars` and apply again:

   ```bash
   cd terraform
   terraform apply
   ```

4. Point DNS at the records Cloud Run reports (typically A/AAAA for an apex, or a CNAME for a
   subdomain):

   ```bash
   gcloud beta run domain-mappings describe --domain YOUR_DOMAIN --region us-west1
   ```

Google provisions a managed TLS certificate once those records are in place. Until they propagate,
the site remains available at the `cloud_run_url` output.

If the domain is fronted by Cloudflare or another CDN, leave `enable_domain_mapping` off and point
the CDN origin at `terraform output cloud_run_url` instead. That is the usual way to serve `www` and
the apex from the same service, or to sit in a region that does not support domain mappings.

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
