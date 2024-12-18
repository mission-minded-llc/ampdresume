# Define local variables for bucket names and environments
locals {
  region       = "us-west-2"
  domain       = "openresume.org"
  environments = ["local", "test", "production"]
}
