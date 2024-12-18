# Configure AWS Provider
provider "aws" {
  region = "us-west-2" # Change this to your preferred region
}

# Define local variables for bucket names and environments
locals {
  region               = "us-west-2"
  domain               = "openresume.org"
  environments         = ["local", "test", "production"]
  s3_bucket_subdomains = ["medialocal", "mediatest", "media"]
}
