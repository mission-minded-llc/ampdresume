# Optional: Server-side encryption for medialocal bucket
resource "aws_s3_bucket_server_side_encryption_configuration" "medialocal_encryption" {
  bucket = aws_s3_bucket.medialocal.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Optional: Server-side encryption for mediatest bucket
resource "aws_s3_bucket_server_side_encryption_configuration" "mediatest_encryption" {
  bucket = aws_s3_bucket.mediatest.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Optional: Server-side encryption for media bucket
resource "aws_s3_bucket_server_side_encryption_configuration" "media_encryption" {
  bucket = aws_s3_bucket.media.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
