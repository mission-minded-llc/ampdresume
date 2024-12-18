data "aws_iam_policy_document" "env_policy" {
  for_each = toset(local.static_environments)

  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.openresume_buckets[each.key].arn}/assets/user/*"]

    condition {
      test     = "StringEquals"
      variable = "aws:Referer"
      values   = ["http://${each.key}.${local.domain}/*"]
    }
  }
}

resource "aws_s3_bucket_policy" "public_read_policy" {
  for_each = aws_s3_bucket.openresume_buckets

  bucket = each.value.id

  policy = data.aws_iam_policy_document.env_policy[each.key].json
}
