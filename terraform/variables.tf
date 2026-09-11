variable "project_id" {
  description = "The Google Cloud project that hosts every resource in this configuration."
  type        = string
}

variable "region" {
  description = "The Google Cloud region for Cloud Run, Artifact Registry, and Cloud Storage."
  type        = string
  default     = "us-west1"
}

variable "service_name" {
  description = "Name of the Cloud Run service. Also used as a prefix for related resources."
  type        = string
  default     = "ampdresume"
}

variable "domain" {
  description = "Apex domain the production site is served from."
  type        = string
  default     = "ampdresume.com"
}

variable "github_repository" {
  description = "The owner/name of the GitHub repository allowed to deploy via Workload Identity Federation."
  type        = string
  default     = "mission-minded-llc/ampdresume"
}

variable "enable_domain_mapping" {
  description = <<-EOT
    Map the apex and www hostnames directly to Cloud Run. Domain mappings are only
    available in a subset of regions and require the domain to be verified in Google
    Search Console first. On Cloudflare Free, grey-cloud the records Cloud Run
    reports; a Host-header Origin Rule is a paid feature.
  EOT
  type        = bool
  default     = false
}

# --- Cloud Run sizing -------------------------------------------------------
#
# Cloud Run bills for CPU and memory only while a request is being handled (because
# cpu_idle is enabled and the minimum instance count is zero), so an idle service
# costs nothing beyond storage.

variable "cpu_limit" {
  description = "vCPU allocated to each Cloud Run instance."
  type        = string
  default     = "1"
}

variable "memory_limit" {
  description = "Memory allocated to each Cloud Run instance. Next.js needs at least 512Mi."
  type        = string
  default     = "512Mi"
}

variable "max_instances" {
  description = "Upper bound on concurrent Cloud Run instances, which caps worst-case spend."
  type        = number
  default     = 4
}

variable "request_concurrency" {
  description = "Requests handled simultaneously by one instance. Higher values mean fewer instances."
  type        = number
  default     = 80
}

# --- Neon -------------------------------------------------------------------

variable "neon_org_id" {
  description = "Neon organization ID that owns the project, found under Account Settings > Organization."
  type        = string
}

variable "neon_region_id" {
  description = "Neon deployment region. aws-us-west-2 is co-located with the us-west1 Google Cloud region."
  type        = string
  default     = "aws-us-west-2"
}

variable "neon_pg_version" {
  description = "Major PostgreSQL version for the Neon project."
  type        = number
  default     = 17
}

variable "neon_autoscaling_min_cu" {
  description = "Minimum Neon compute units. 0.25 is the smallest billable size."
  type        = number
  default     = 0.25
}

variable "neon_autoscaling_max_cu" {
  description = "Maximum Neon compute units, which caps worst-case database spend."
  type        = number
  default     = 1
}

variable "neon_suspend_timeout_seconds" {
  description = <<-EOT
    Idle seconds before Neon suspends compute. 0 leaves Neon's plan default (5
    minutes on Free). Free-plan accounts reject any other value.
  EOT
  type        = number
  default     = 0
}

variable "neon_history_retention_seconds" {
  description = "Point-in-time restore window. The free plan caps this at 21600 seconds (6 hours)."
  type        = number
  default     = 21600
}

variable "database_schema" {
  description = "PostgreSQL schema the Prisma models live in. Must match `schemas` in prisma/schema.prisma."
  type        = string
  default     = "ampdresume"
}

# --- Application configuration ---------------------------------------------
#
# Non-sensitive values only. Anything secret belongs in Secret Manager; see
# secrets.tf.

variable "container_image" {
  description = <<-EOT
    Image the Cloud Run service is created with. The default is Google's hello
    container so the service can be provisioned before CI has pushed anything.
    Subsequent images are deployed by the CD workflow and ignored by Terraform.
  EOT
  type        = string
  default     = "us-docker.pkg.dev/cloudrun/container/hello"
}

variable "deletion_protection" {
  description = "Blocks `terraform destroy` from removing the production Cloud Run service."
  type        = bool
  default     = true
}

variable "sentry_dsn" {
  description = "Sentry DSN. Public by design, since it is inlined into the browser bundle."
  type        = string
  default     = ""
}

variable "gtm_id" {
  description = "Google Tag Manager container ID. Leave empty to disable analytics."
  type        = string
  default     = ""
}

variable "email_from" {
  description = "From header used for magic-link sign-in emails."
  type        = string
  default     = "Amp'd Resume <mail@ampdresume.com>"
}

variable "email_server_port" {
  description = "SMTP port for magic-link sign-in emails."
  type        = string
  default     = "587"
}
