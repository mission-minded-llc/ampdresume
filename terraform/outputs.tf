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

output "secret_arns" {
  value = {
    for env, secret in aws_secretsmanager_secret.db_secrets :
    env => secret.arn
  }
}

output "endpoints" {
  value = {
    for env, instance in aws_db_instance.postgresql :
    env => instance.endpoint
  }
}
