locals {
  base_url = "https://${var.domain}"

  # Secret Manager entries the running container needs, keyed by secret suffix
  # and mapped to the environment variable the app reads. The direct database
  # URL is deliberately absent: only CI uses it, to run migrations.
  runtime_secret_env = merge(
    local.managed_secrets,
    { "database-url" = "DATABASE_URL" },
  )

  runtime_plain_env = {
    NEXT_PUBLIC_ENVIRONMENT_NAME = "production"
    NEXT_PUBLIC_BASE_URL         = local.base_url
    NEXT_PUBLIC_GRAPHQL_ENDPOINT = "${local.base_url}/api/graphql"

    # Server-rendered pages query the GraphQL route in their own container, so
    # they skip the round trip out through the load balancer and stay available
    # even before the domain mapping finishes provisioning.
    INTERNAL_GRAPHQL_ENDPOINT = "http://127.0.0.1:8080/api/graphql"

    NEXT_PUBLIC_SENTRY_DSN = var.sentry_dsn
    NEXTAUTH_URL           = local.base_url
    EMAIL_FROM             = var.email_from
    EMAIL_SERVER_PORT      = var.email_server_port
    GTM_ID                 = var.gtm_id
    ALLOWED_USER_EMAILS    = var.allowed_user_emails
  }
}

resource "google_cloud_run_v2_service" "app" {
  name     = var.service_name
  location = var.region
  project  = var.project_id

  ingress             = "INGRESS_TRAFFIC_ALL"
  deletion_protection = var.deletion_protection

  template {
    service_account                  = google_service_account.run.email
    max_instance_request_concurrency = var.request_concurrency
    timeout                          = "300s"

    scaling {
      # Scaling to zero is what keeps an idle service free. The trade-off is a
      # cold start on the first request after a quiet period.
      min_instance_count = 0
      max_instance_count = var.max_instances
    }

    containers {
      image = var.container_image

      ports {
        container_port = 8080
      }

      resources {
        limits = {
          cpu    = var.cpu_limit
          memory = var.memory_limit
        }

        # Bill only for CPU used while handling a request.
        cpu_idle = true

        # Full CPU during startup, which materially shortens Next.js cold starts
        # and costs nothing extra once the instance is warm.
        startup_cpu_boost = true
      }

      dynamic "env" {
        for_each = local.runtime_plain_env
        content {
          name  = env.key
          value = env.value
        }
      }

      dynamic "env" {
        for_each = local.runtime_secret_env
        content {
          name = env.value
          value_source {
            secret_key_ref {
              secret  = google_secret_manager_secret.app[env.key].secret_id
              version = "latest"
            }
          }
        }
      }

      startup_probe {
        tcp_socket {
          port = 8080
        }
        initial_delay_seconds = 5
        period_seconds        = 5
        timeout_seconds       = 3
        failure_threshold     = 12
      }
    }
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }

  lifecycle {
    # The CD workflow deploys new images, so Terraform must not roll the service
    # back to whatever image it last recorded.
    ignore_changes = [
      template[0].containers[0].image,
      client,
      client_version,
    ]
  }

  depends_on = [
    google_project_service.required,
    google_secret_manager_secret_iam_member.run_accessor,
  ]
}

# The site is public, so unauthenticated invocations are allowed.
resource "google_cloud_run_v2_service_iam_member" "public" {
  project  = var.project_id
  location = google_cloud_run_v2_service.app.location
  name     = google_cloud_run_v2_service.app.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Optional: serve the apex domain straight from Cloud Run, with a
# Google-managed certificate and no load balancer to pay for. Requires the
# domain to be verified in Google Search Console and a region that supports
# domain mappings.
resource "google_cloud_run_domain_mapping" "apex" {
  count = var.enable_domain_mapping ? 1 : 0

  project  = var.project_id
  location = var.region
  name     = var.domain

  metadata {
    namespace = var.project_id
  }

  spec {
    route_name = google_cloud_run_v2_service.app.name
  }
}
