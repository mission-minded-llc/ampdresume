resource "aws_acm_certificate" "env_certificate" {
  domain_name       = "*.openresume.org"
  validation_method = "DNS"

  tags = {
    Name = "OpenResume Wildcard Certificate"
  }
}
