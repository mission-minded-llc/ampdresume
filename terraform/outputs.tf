# Outputs to display bucket details

output "medialocal_bucket_name" {
  value = aws_s3_bucket.medialocal.bucket
}

output "medialocal_bucket_arn" {
  value = aws_s3_bucket.medialocal.arn
}

output "mediatest_bucket_name" {
  value = aws_s3_bucket.mediatest.bucket
}

output "mediatest_bucket_arn" {
  value = aws_s3_bucket.mediatest.arn
}

output "media_bucket_name" {
  value = aws_s3_bucket.media.bucket
}

output "media_bucket_arn" {
  value = aws_s3_bucket.media.arn
}
