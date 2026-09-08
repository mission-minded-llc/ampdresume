locals {
  # Secrets whose values Terraform does not know. Terraform owns the container
  # and the IAM binding; the values are written out of band with
  # `scripts/gcp-set-secrets.sh` so they never land in Terraform state.
  managed_secrets = {
    "nextauth-secret"        = "NEXTAUTH_SECRET"
    "google-client-id"       = "GOOGLE_CLIENT_ID"
    "google-client-secret"   = "GOOGLE_CLIENT_SECRET"
    "linkedin-client-id"     = "LINKEDIN_CLIENT_ID"
    "linkedin-client-secret" = "LINKEDIN_CLIENT_SECRET"
    "email-server-host"      = "EMAIL_SERVER_HOST"
    "email-server-user"      = "EMAIL_SERVER_USER"
    "email-server-password"  = "EMAIL_SERVER_PASSWORD"
    "openai-api-key"         = "OPENAI_API_KEY"
  }

  # Secrets Terraform can derive itself, so their values are managed here.
  derived_secrets = {
    "database-url"        = local.database_url
    "database-url-direct" = local.database_url_direct
  }

  all_secret_ids = concat(keys(local.managed_secrets), keys(local.derived_secrets))
}

resource "google_secret_manager_secret" "app" {
  for_each = toset(local.all_secret_ids)

  project   = var.project_id
  secret_id = "${var.service_name}-${each.value}"

  replication {
    auto {}
  }

  depends_on = [google_project_service.required]
}

# A placeholder version so that Cloud Run can resolve `latest` on the very first
# apply. Real values are added afterwards as new versions; `ignore_changes`
# keeps Terraform from reverting them.
resource "google_secret_manager_secret_version" "placeholder" {
  for_each = local.managed_secrets

  secret      = google_secret_manager_secret.app[each.key].id
  secret_data = "PLACEHOLDER_SET_ME_WITH_scripts/gcp-set-secrets.sh"

  lifecycle {
    ignore_changes = [secret_data]
  }
}

resource "google_secret_manager_secret_version" "derived" {
  for_each = local.derived_secrets

  secret      = google_secret_manager_secret.app[each.key].id
  secret_data = each.value
}

resource "google_secret_manager_secret_iam_member" "run_accessor" {
  for_each = toset(local.all_secret_ids)

  project   = var.project_id
  secret_id = google_secret_manager_secret.app[each.value].secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.run.email}"
}
