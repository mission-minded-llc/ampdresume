output "cloud_run_url" {
  description = "URL of the Cloud Run service. Use this until DNS points at the custom domain."
  value       = google_cloud_run_v2_service.app.uri
}

output "artifact_registry_repository" {
  description = "Docker repository path that the CD workflow pushes images to."
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.app.repository_id}"
}

output "ci_artifacts_bucket" {
  description = "Cloud Storage bucket for Cypress screenshots and videos from failed CI runs."
  value       = google_storage_bucket.ci_artifacts.name
}

# --- Values to configure in GitHub -----------------------------------------
#
# Copy these into the repository's Actions variables. None of them are secret.

output "workload_identity_provider" {
  description = "Set as the GCP_WORKLOAD_IDENTITY_PROVIDER Actions variable."
  value       = google_iam_workload_identity_pool_provider.github.name
}

output "deployer_service_account" {
  description = "Set as the GCP_DEPLOY_SERVICE_ACCOUNT Actions variable."
  value       = google_service_account.deployer.email
}

output "terraform_service_account" {
  description = "Set as the GCP_TERRAFORM_SERVICE_ACCOUNT Actions variable."
  value       = google_service_account.terraform.email
}

output "run_service_account" {
  description = "Identity the Cloud Run container runs as."
  value       = google_service_account.run.email
}

output "database_url" {
  description = "Pooled Neon connection string used by the application."
  value       = local.database_url
  sensitive   = true
}

output "database_url_direct" {
  description = "Direct Neon connection string used for Prisma migrations."
  value       = local.database_url_direct
  sensitive   = true
}
