# Configure AWS Provider
provider "aws" {
  region = "us-east-1" # Change this to your preferred region
}

# Define local variables for bucket names and environments
locals {
  domain = "openresume.org"
  # Bucket names. local, test, and www are the environments
  # Local is for local dev, test is for staging, and www is for production.
  environments = ["local", "test", "www"]
}
