# Define local variables for bucket names and environments
locals {
  region       = "us-west-2"
  domain       = "ampdresume.com"
  environments = ["local", "test", "production"]
}

terraform {
  backend "s3" {
    bucket         = "openresume-terraform-state"
    key            = "state/terraform.tfstate"
    region         = "us-west-2"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}

variable "region" {
  default = "us-west-2"
}