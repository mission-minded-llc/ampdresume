# Create S3 Buckets for different environments

resource "aws_s3_bucket" "medialocal" {
  provider = aws.us_west_2
  bucket   = "medialocal.${local.domain}"

  # Create an /assets/user folder in the bucket if it doesn't exist.
  provisioner "local-exec" {
    command = "aws s3api put-object --bucket medialocal.${local.domain} --key assets/user/ --acl public-read"
  }

  tags = {
    Environment = "medialocal"
    Project     = "OpenResume"
    ManagedBy   = "Terraform"
  }
}

resource "aws_s3_bucket" "mediatest" {
  provider = aws.us_west_2
  bucket   = "mediatest.${local.domain}"

  # Create an /assets/user folder in the bucket if it doesn't exist.
  provisioner "local-exec" {
    command = "aws s3api put-object --bucket mediatest.${local.domain} --key assets/user/ --acl public-read"
  }

  tags = {
    Environment = "mediatest"
    Project     = "OpenResume"
    ManagedBy   = "Terraform"
  }
}

resource "aws_s3_bucket" "media" {
  provider = aws.us_west_2
  bucket   = "media.${local.domain}"

  # Create an /assets/user folder in the bucket if it doesn't exist.
  provisioner "local-exec" {
    command = "aws s3api put-object --bucket media.${local.domain} --key assets/user/ --acl public-read"
  }

  tags = {
    Environment = "media"
    Project     = "OpenResume"
    ManagedBy   = "Terraform"
  }
}
