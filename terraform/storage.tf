locals {
  ci_bucket_name = "${var.project_id}-ci-artifacts"
}

# Cypress screenshots and videos uploaded from CI when an integration test
# fails. Private, and expired automatically so the bucket does not grow without
# bound. This is the only bucket the application stack needs; resumes are
# text-only and there are no user uploads.
resource "google_storage_bucket" "ci_artifacts" {
  name                        = local.ci_bucket_name
  location                    = var.region
  storage_class               = "STANDARD"
  project                     = var.project_id
  uniform_bucket_level_access = true
  public_access_prevention    = "enforced"

  lifecycle_rule {
    condition {
      age = 30
    }
    action {
      type = "Delete"
    }
  }

  depends_on = [google_project_service.required]
}
