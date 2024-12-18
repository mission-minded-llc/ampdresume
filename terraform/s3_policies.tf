# Define the policy for medialocal
data "aws_iam_policy_document" "medialocal_policy" {
  statement {
    actions   = ["s3:GetObject"]
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

# Define the policy for mediatest
data "aws_iam_policy_document" "mediatest_policy" {
  statement {
    actions   = ["s3:GetObject"]
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

# Define the policy for media
data "aws_iam_policy_document" "media_policy" {
  statement {
    actions   = ["s3:GetObject"]
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

# Apply the policy to medialocal bucket
resource "aws_s3_bucket_policy" "medialocal_policy" {
  bucket = aws_s3_bucket.medialocal.id
  policy = data.aws_iam_policy_document.medialocal_policy.json
}

# Apply the policy to mediatest bucket
resource "aws_s3_bucket_policy" "mediatest_policy" {
  bucket = aws_s3_bucket.mediatest.id
  policy = data.aws_iam_policy_document.mediatest_policy.json
}

# Apply the policy to media bucket
resource "aws_s3_bucket_policy" "media_policy" {
  bucket = aws_s3_bucket.media.id
  policy = data.aws_iam_policy_document.media_policy.json
}
