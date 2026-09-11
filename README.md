# Amp'd Resume

[![codecov](https://codecov.io/gh/mission-minded-llc/ampdresume/graph/badge.svg?token=MHMQ1EHZO1)](https://codecov.io/gh/mission-minded-llc/ampdresume)

Amp'd Resume is an interactive resume platform where job-seekers can manager their own public resume
presence with interactive features to showcase their skills, work history, and education.

## Environments

There are two environments: local development and production at https://www.ampdresume.com.

## GraphQL API

[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/ampdresume/amp-d-resume/overview)

Explore the GraphQL and REST API endpoints on
[Postman](https://www.postman.com/ampdresume/amp-d-resume/overview)!

## The Stack

This product is a Next.js full stack web application, hosted on Google Cloud Run.

- Application: Next.js with TypeScript
- Authentication: NextAuth (Auth.js), OAuth, Email magic links
- Database: Neon serverless PostgreSQL
- Data Fetching: Tanstack Query, Apollo, GraphQL
- Testing: Jest, Cypress
- Hosting: Google Cloud Run
- Infrastructure as Code: Terraform

## Local Setup

Running the app locally requires a few steps and local environment variable values.

### Environment Variables

To start, copy `.env.example` to `.env` and update the "Required" variable values. These are
documented in the file comments.

### Development Environment

This project uses Docker Compose for local development. The development environment expects Node.js
(see `.nvmrc` for version), and includes containers for:

- PostgreSQL 16

#### Starting the Development Environment

1. **Start the containers:**

   ```bash
   docker-compose up -d
   ```

2. **Setup Dependencies and Database**

   ```bash
   npm run init
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The app will be available at http://localhost:3000/

#### Local Sign-in

Most of this application is behind authentication. The current authentication providers include:

- Email Magic Link
- Google OAuth
- LinkedIn OAuth

You are welcome to set up your own credentials for an SMTP email server or OAuth provider.
**However**, it is possible to sign in locally _without_ doing this!

To sign in locally without using a provider, you'll need to use the `test@ampdresume.com` email.
This email is specific to testing and is used by Cypress integration tests. When you use this email
address within the email input and sign in, you should be able to find the magic link in your local
`./.cypress-temp/magic-link-test_ampdresume_com.txt` file. If you open that URL in the browser, you
should be signed in as the `test` user.

#### VS Code Integration

This project includes recommended VS Code extensions and settings. When you open the project in VS
Code, you'll be prompted to install the recommended extensions for the best development experience.

#### Database Access

The PostgreSQL database is accessible on port 5432 with the following credentials:

- Username: `postgres`
- Password: `postgres`
- Database: `ampdresume`

## Infrastructure

Amp'd Resume runs on Google Cloud Run, with the database on Neon. All of it is defined in Terraform
under `terraform/`. There is a single production environment. Merging a pull request to `main`
builds a container image, runs any pending database migrations, and rolls out a new Cloud Run
revision.

Local development needs no cloud resources: `docker compose up -d` provides Postgres, and the app
runs against it directly.

### Publishing to Cloud Run

To stand up a live environment on a domain you own, create a Google Cloud project, link billing,
bootstrap Terraform state, apply the configuration, then point DNS at Cloud Run. The full
walkthrough is in [terraform/README.md](terraform/README.md). In short:

1. Install the [gcloud CLI](https://cloud.google.com/sdk/docs/install) and
   [Terraform](https://developer.hashicorp.com/terraform/install) (>= 1.9).
2. Create a Google Cloud project, attach a billing account, and authenticate.
3. Run `./scripts/gcp-bootstrap.sh YOUR_PROJECT_ID us-west1` to enable APIs and create the Terraform
   state bucket.
4. Copy `terraform/terraform.tfvars.example` to `terraform/terraform.tfvars`, fill in the project
   ID, domain, Neon org ID, and GitHub repository, then `terraform init` and `terraform apply`.
5. Add application secret versions in the
   [Secret Manager console](https://console.cloud.google.com/security/secret-manager). To load them
   into the current shell afterwards: `eval "$(./scripts/gcp-fetch-secrets.sh YOUR_PROJECT_ID)"`.
6. Update the GCP `env:` values in the GitHub Actions workflows if they differ from this project's
   defaults. CI authenticates with Workload Identity Federation, then loads secrets from Secret
   Manager. Optional GitHub secrets: `NEON_API_KEY` (fallback), `SENTRY_AUTH_TOKEN`,
   `CODECOV_TOKEN`.
7. Verify the domain in Google Search Console, enable `enable_domain_mapping`, and add the DNS
   records Cloud Run reports — or skip the mapping and front Cloud Run with a CDN such as
   Cloudflare.

Until the first CD run, Cloud Run serves Google's placeholder image. The first merge to `main` (or a
manual run of **CD: App**) builds and deploys the real application.

## 📄 License

This project is licensed under the **Amp’d Community License 1.0**.

- ✅ You can view, fork, and modify the source code for non-commercial, personal, and educational
  use.
- ❌ You **may not** use this project or its derivatives in a commercial product or service.
- ❌ You **may not** host it in a production environment or monetize it in any way.

To inquire about commercial use or extended rights, please contact: contact@missionminded.net

See the full license in [LICENSE.md](./LICENSE.md).
