# Create S3 Buckets for different environments
# It was possible to use a loop to achieve this, however the loop was
# causing issues when running the `terraform import` commands needed
# within the setup GitHub Actions workflows.

resource "aws_s3_bucket" "medialocal" {
  provider = aws.us_west_2
  bucket   = "medialocal.${local.domain}"

  tags = {
    Environment = "Local"
    Project     = "OpenResume"
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
    Project     = "OpenResume"
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
    Project     = "OpenResume"
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
    Project     = "OpenResume"
    ManagedBy   = "Terraform"
  }

  lifecycle {
    prevent_destroy = true
  }
}

# Create an /assets/user folder in the buckets if it doesn't exist and set Cache-Control headers
resource "aws_s3_object" "medialocal_assets_user" {
  bucket        = aws_s3_bucket.medialocal.bucket
  key           = "assets/user/"
  cache_control = "public, max-age=2592000"
}

resource "aws_s3_object" "mediatest_assets_user" {
  bucket        = aws_s3_bucket.mediatest.bucket
  key           = "assets/user/"
  cache_control = "public, max-age=2592000"
}

resource "aws_s3_object" "media_assets_user" {
  bucket        = aws_s3_bucket.media.bucket
  key           = "assets/user/"
  cache_control = "public, max-age=2592000"
}
