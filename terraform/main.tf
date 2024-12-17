# Configure AWS Provider
provider "aws" {
  region = "us-east-1" # Change this to your preferred region
}

# Define local variables for bucket names and environments
locals {
  domain       = "openresume.org"
  environments = ["local", "test", "www"]
}
