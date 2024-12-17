# Configure AWS Provider
provider "aws" {
  region = "us-east-1" # Change this to your preferred region
}

# Define local variables for bucket names and environments
locals {
  domain       = "openresume.org"
  environments = ["dev", "test", "www"]
}

# Create S3 Buckets for different environments
resource "aws_s3_bucket" "openresume_buckets" {
  for_each = toset(local.environments)

  bucket = "${each.key}.${local.domain}"

  # Optional: Add tags for better resource management
  tags = {
    Environment = each.key
    Project     = "OpenResume"
    ManagedBy   = "Terraform"
  }
}

# Enable versioning for each bucket
resource "aws_s3_bucket_versioning" "bucket_versioning" {
  for_each = aws_s3_bucket.openresume_buckets

  bucket = each.value.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Create public access policy for static website hosting
resource "aws_s3_bucket_policy" "public_read_policy" {
  for_each = aws_s3_bucket.openresume_buckets

  bucket = each.value.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${each.value.arn}/*"
      }
    ]
  })
}

# Configure bucket for static website hosting
resource "aws_s3_bucket_website_configuration" "website_config" {
  for_each = aws_s3_bucket.openresume_buckets

  bucket = each.value.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

# Remove public access block to allow public website hosting
resource "aws_s3_bucket_public_access_block" "public_access" {
  for_each = aws_s3_bucket.openresume_buckets

  bucket = each.value.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Optional: Server-side encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "bucket_encryption" {
  for_each = aws_s3_bucket.openresume_buckets

  bucket = each.value.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Outputs to display bucket details
output "bucket_names" {
  value = { for env, bucket in aws_s3_bucket.openresume_buckets :
    env => bucket.bucket
  }
}

output "bucket_website_endpoints" {
  value = { for env, bucket in aws_s3_bucket.openresume_buckets :
    env => aws_s3_bucket_website_configuration[env].website_endpoint
  }
}

output "bucket_arns" {
  value = { for env, bucket in aws_s3_bucket.openresume_buckets :
    env => bucket.arn
  }
} 