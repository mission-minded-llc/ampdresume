resource "aws_acm_certificate" "env_certificate" {
  provider = aws.us_east_1

  for_each          = toset(local.s3_bucket_subdomains)
  domain_name       = "${each.key}.${local.domain}"
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "OpenResume Wildcard Certificate"
  }
}
