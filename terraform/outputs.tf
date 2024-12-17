# Outputs to display bucket details
output "bucket_names" {
  value = { for env, bucket in aws_s3_bucket.openresume_buckets :
    env => bucket.bucket
  }
}

output "bucket_arns" {
  value = { for env, bucket in aws_s3_bucket.openresume_buckets :
    env => bucket.arn
  }
}
