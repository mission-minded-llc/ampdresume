# Create S3 Buckets for different environments
# It was possible to use a loop to achieve this, however the loop was
# causing issues when running the `terraform import` commands needed
# within the setup GitHub Actions workflows.

resource "aws_s3_bucket" "medialocal" {
  provider = aws.us_west_2
  bucket   = "medialocal.${local.domain}"

  tags = {
    Environment = "Local"
    Project     = "Ampd Resume"
    ManagedBy   = "Terraform"
  }

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket" "mediatest" {
  provider = aws.us_west_2
  bucket   = "mediatest.${local.domain}"

  tags = {
    Environment = "Test"
    Project     = "Ampd Resume"
    ManagedBy   = "Terraform"
  }

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket" "media" {
  provider = aws.us_west_2
  bucket   = "media.${local.domain}"

  tags = {
    Environment = "Production"
    Project     = "Ampd Resume"
    ManagedBy   = "Terraform"
  }

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket" "ci" {
  provider = aws.us_west_2
  bucket   = "ci.${local.domain}"

  tags = {
    Environment = "CI"
    Project     = "Ampd Resume"
    ManagedBy   = "Terraform"
  }

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket" "ci_theme" {
  provider = aws.us_west_2
  bucket   = "ci-theme.${local.domain}"

  tags = {
    Environment = "CI"
    Project     = "Ampd Resume"
    ManagedBy   = "Terraform"
  }

  lifecycle {
    prevent_destroy = true
  }
}
