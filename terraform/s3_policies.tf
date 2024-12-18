# Define the policy for each subdomain
data "aws_iam_policy_document" "env_policy" {
  for_each = toset(local.s3_bucket_subdomains)

  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.openresume_buckets[each.key].arn}/assets/user/*"]

    condition {
      test     = "StringEquals"
      variable = "aws:Referer"
      values = [
        "http://*.${local.domain}/*",
        "https://*.${local.domain}/*",
        "http://localhost:3000/*"
      ]
    }

    # Add the Principal field in the IAM policy document
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

# Apply the policy to each bucket
resource "aws_s3_bucket_policy" "public_read_policy" {
  for_each = aws_s3_bucket.openresume_buckets

  bucket = each.value.id

  # Use the policy from the policy document
  policy = data.aws_iam_policy_document.env_policy[each.key].json
}
