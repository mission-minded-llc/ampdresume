resource "aws_acm_certificate" "env_certificate" {
  for_each = toset(local.s3_bucket_subdomains)

  domain_name       = "${each.key}.${local.domain}"
  validation_method = "DNS"

  tags = {
    Name = "OpenResume Wildcard Certificate"
  }
}
