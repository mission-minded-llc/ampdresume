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
