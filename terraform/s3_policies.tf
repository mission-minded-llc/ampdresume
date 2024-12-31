# CORS configurations remain the same for all buckets
resource "aws_s3_bucket_cors_configuration" "medialocal_cors" {
  bucket = aws_s3_bucket.medialocal.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "POST", "PUT"]
    allowed_origins = [
      "http://*.${local.domain}",
      "https://*.${local.domain}",
      "http://localhost:3000"
    ]
    expose_headers  = []
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_cors_configuration" "mediatest_cors" {
  bucket = aws_s3_bucket.mediatest.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "POST", "PUT"]
    allowed_origins = [
      "http://*.${local.domain}",
      "https://*.${local.domain}",
      "http://localhost:3000"
    ]
    expose_headers  = []
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_cors_configuration" "media_cors" {
  bucket = aws_s3_bucket.media.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "POST", "PUT"]
    allowed_origins = [
      "http://*.${local.domain}",
      "https://*.${local.domain}",
      "http://localhost:3000"
    ]
    expose_headers  = []
    max_age_seconds = 3000
  }
}

# Bucket policies reverted to only allow GetObject
data "aws_iam_policy_document" "medialocal_policy" {
  statement {
    actions   = ["s3:GetObject"] # Only GetObject
    resources = ["${aws_s3_bucket.medialocal.arn}/assets/user/*"]

    condition {
      test     = "StringEquals"
      variable = "aws:Referer"
      values = [
        "http://*.${local.domain}/*",
        "https://*.${local.domain}/*",
        "http://localhost:3000/*"
      ]
    }

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

data "aws_iam_policy_document" "mediatest_policy" {
  statement {
    actions   = ["s3:GetObject"] # Only GetObject
    resources = ["${aws_s3_bucket.mediatest.arn}/assets/user/*"]

    condition {
      test     = "StringEquals"
      variable = "aws:Referer"
      values = [
        "http://*.${local.domain}/*",
        "https://*.${local.domain}/*",
        "http://localhost:3000/*"
      ]
    }

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

data "aws_iam_policy_document" "media_policy" {
  statement {
    actions   = ["s3:GetObject"] # Only GetObject
    resources = ["${aws_s3_bucket.media.arn}/assets/user/*"]

    condition {
      test     = "StringEquals"
      variable = "aws:Referer"
      values = [
        "http://*.${local.domain}/*",
        "https://*.${local.domain}/*",
        "http://localhost:3000/*"
      ]
    }

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

# Apply the policies
resource "aws_s3_bucket_policy" "medialocal_policy" {
  bucket = aws_s3_bucket.medialocal.id
  policy = data.aws_iam_policy_document.medialocal_policy.json
}

resource "aws_s3_bucket_policy" "mediatest_policy" {
  bucket = aws_s3_bucket.mediatest.id
  policy = data.aws_iam_policy_document.mediatest_policy.json
}

resource "aws_s3_bucket_policy" "media_policy" {
  bucket = aws_s3_bucket.media.id
  policy = data.aws_iam_policy_document.media_policy.json
}

# IAM user and policy for uploads
resource "aws_iam_user" "upload_user" {
  name = "s3-upload-user"
}

resource "aws_iam_user_policy" "upload_policy" {
  name = "s3-upload-policy"
  user = aws_iam_user.upload_user.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:PutObject"
        ]
        Resource = [
          "${aws_s3_bucket.medialocal.arn}/assets/user/*",
          "${aws_s3_bucket.mediatest.arn}/assets/user/*",
          "${aws_s3_bucket.media.arn}/assets/user/*"
        ]
      }
    ]
  })
}