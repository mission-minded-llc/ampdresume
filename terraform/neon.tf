# Neon is used instead of Cloud SQL because it is the only Postgres option that
# suspends compute while idle. Google Cloud SQL and AlloyDB both bill for an
# always-on instance, which dominates the cost of a low-traffic service.
resource "neon_project" "main" {
  name       = var.service_name
  org_id     = var.neon_org_id
  region_id  = var.neon_region_id
  pg_version = var.neon_pg_version

  history_retention_seconds = var.neon_history_retention_seconds

  branch {
    name          = "production"
    database_name = var.service_name
    role_name     = "${var.service_name}_app"
  }

  primary_compute {
    autoscaling_limit_min_cu = var.neon_autoscaling_min_cu
    autoscaling_limit_max_cu = var.neon_autoscaling_max_cu
    suspend_timeout_seconds  = var.neon_suspend_timeout_seconds
  }
}

locals {
  neon_credentials = format(
    "%s:%s",
    neon_project.main.database_user,
    urlencode(neon_project.main.database_password),
  )

  # The application runs behind Neon's PgBouncer endpoint. Cloud Run can start
  # many short-lived instances, and the pooler keeps them from exhausting the
  # database's connection limit.
  database_url = format(
    "postgresql://%s@%s/%s?sslmode=require&schema=%s",
    local.neon_credentials,
    neon_project.main.database_host_pooler,
    neon_project.main.database_name,
    var.database_schema,
  )

  # Prisma Migrate takes session-level advisory locks, which a transaction-mode
  # pooler does not support, so migrations use the direct endpoint instead.
  database_url_direct = format(
    "postgresql://%s@%s/%s?sslmode=require&schema=%s",
    local.neon_credentials,
    neon_project.main.database_host,
    neon_project.main.database_name,
    var.database_schema,
  )
}
