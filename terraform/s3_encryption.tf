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
