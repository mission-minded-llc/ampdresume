# Create public access policy for static website hosting
resource "aws_s3_bucket_policy" "public_read_policy" {
  for_each = aws_s3_bucket.openresume_buckets

  bucket = each.value.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${each.value.arn}/*"
      }
    ]
  })
}
