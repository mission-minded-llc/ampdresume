# --- Cloud Run runtime identity --------------------------------------------
#
# The container runs as this account. It holds no project-level roles: the only
# Google Cloud resources the app touches are its own secrets, granted in
# secrets.tf.

resource "google_service_account" "run" {
  project      = var.project_id
  account_id   = "${var.service_name}-run"
  display_name = "Cloud Run runtime for ${var.service_name}"

  depends_on = [google_project_service.required]
}

# --- GitHub Actions deploy identity ----------------------------------------
#
# Scoped to building an image and rolling out a new Cloud Run revision. It
# deliberately cannot create or modify infrastructure.

resource "google_service_account" "deployer" {
  project      = var.project_id
  account_id   = "${var.service_name}-deployer"
  display_name = "GitHub Actions application deploys for ${var.service_name}"

  depends_on = [google_project_service.required]
}

resource "google_project_iam_member" "deployer" {
  for_each = toset([
    "roles/artifactregistry.writer",
    "roles/run.admin",
  ])

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.deployer.email}"
}

# Required to deploy a revision that runs as the runtime service account.
resource "google_service_account_iam_member" "deployer_acts_as_run" {
  service_account_id = google_service_account.run.name
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${google_service_account.deployer.email}"
}

# Database migrations run from CI against the direct (non-pooled) endpoint.
resource "google_secret_manager_secret_iam_member" "deployer_reads_direct_url" {
  project   = var.project_id
  secret_id = google_secret_manager_secret.app["database-url-direct"].secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.deployer.email}"
}

# The Neon provider authenticates with this key. Terraform workflows can read
# it from Secret Manager after the value has been set in the Cloud Console.
resource "google_secret_manager_secret_iam_member" "terraform_reads_neon_api_key" {
  project   = var.project_id
  secret_id = google_secret_manager_secret.app["neon-api-key"].secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.terraform.email}"
}

# Cypress screenshots and videos from failed integration test runs.
resource "google_storage_bucket_iam_member" "deployer_ci_artifacts" {
  bucket = google_storage_bucket.ci_artifacts.name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${google_service_account.deployer.email}"
}

# --- GitHub Actions infrastructure identity --------------------------------
#
# Used only by the Terraform workflow. Kept separate from the deploy account so
# an application deploy cannot change infrastructure or IAM.

resource "google_service_account" "terraform" {
  project      = var.project_id
  account_id   = "${var.service_name}-terraform"
  display_name = "GitHub Actions Terraform runs for ${var.service_name}"

  depends_on = [google_project_service.required]
}

resource "google_project_iam_member" "terraform" {
  for_each = toset([
    "roles/artifactregistry.admin",
    "roles/iam.serviceAccountAdmin",
    "roles/iam.serviceAccountUser",
    "roles/iam.workloadIdentityPoolAdmin",
    "roles/resourcemanager.projectIamAdmin",
    "roles/run.admin",
    "roles/secretmanager.admin",
    "roles/serviceusage.serviceUsageAdmin",
    "roles/storage.admin",
  ])

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.terraform.email}"
}
