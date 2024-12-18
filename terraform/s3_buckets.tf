# Create S3 Buckets for different environments
resource "aws_s3_bucket" "openresume_buckets" {
  for_each = toset(local.s3_bucket_subdomains)

  bucket = "${each.key}.${local.domain}"

  tags = {
    Environment = each.key
    Project     = "OpenResume"
    ManagedBy   = "Terraform"
  }
}
