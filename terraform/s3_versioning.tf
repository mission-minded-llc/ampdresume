# Enable versioning for each bucket
resource "aws_s3_bucket_versioning" "bucket_versioning" {
  for_each = aws_s3_bucket.openresume_buckets

  bucket = each.value.id
  versioning_configuration {
    status = "Enabled"
  }
}
