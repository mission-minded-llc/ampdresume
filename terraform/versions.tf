terraform {
  required_version = ">= 1.9.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 7.46"
    }
    neon = {
      source  = "kislerdm/neon"
      version = "~> 0.17"
    }
  }

  # The state bucket is created by scripts/gcp-bootstrap.sh before the first
  # `terraform init`, since Terraform cannot create its own backend.
  backend "gcs" {
    bucket = "ampdresume-tf-state"
    prefix = "production"
  }
}
