provider "google" {
  project = var.project_id
  region  = var.region
}

# Authenticates with the NEON_API_KEY environment variable.
provider "neon" {}
