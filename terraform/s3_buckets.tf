# Create S3 Buckets for different environments
resource "aws_s3_bucket" "openresume_buckets" {
  provider = aws.us_west_2
  for_each = toset(local.s3_bucket_subdomains)

  bucket = "${each.key}.${local.domain}"

  # Create an /assets/user folder in each bucket if it doesn't exist.
  provisioner "local-exec" {
    command = "aws s3api put-object --bucket ${each.key}.${local.domain} --key assets/user/ --acl public-read"
  }

  tags = {
    Environment = each.key
    Project     = "OpenResume"
    ManagedBy   = "Terraform"
  }
}
