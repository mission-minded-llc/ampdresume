# Enable versioning for each bucket

resource "aws_s3_bucket_versioning" "medialocal_versioning" {
  bucket = aws_s3_bucket.medialocal.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_versioning" "mediatest_versioning" {
  bucket = aws_s3_bucket.mediatest.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_versioning" "media_versioning" {
  bucket = aws_s3_bucket.media.id
  versioning_configuration {
    status = "Enabled"
  }
}
