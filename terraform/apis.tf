# Google Cloud APIs the rest of this configuration depends on. Every other
# resource takes an implicit dependency on this via the `google_project_service`
# references, so a fresh project can be built with a single apply.
resource "google_project_service" "required" {
  for_each = toset([
    "artifactregistry.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "iam.googleapis.com",
    "iamcredentials.googleapis.com",
    "run.googleapis.com",
    "secretmanager.googleapis.com",
    "storage.googleapis.com",
    "sts.googleapis.com",
  ])

  project = var.project_id
  service = each.value

  # Leave the APIs enabled if the configuration is torn down; disabling them can
  # break unrelated resources that happen to share the project.
  disable_on_destroy = false
}
