# ACM certificate for medialocal
resource "aws_acm_certificate" "medialocal_certificate" {
  provider = aws.us_east_1

  domain_name       = "medialocal.${local.domain}"
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "OpenResume Wildcard Certificate"
  }
}

# ACM certificate for mediatest
resource "aws_acm_certificate" "mediatest_certificate" {
  provider = aws.us_east_1

  domain_name       = "mediatest.${local.domain}"
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "OpenResume Wildcard Certificate"
  }
}

# ACM certificate for media
resource "aws_acm_certificate" "media_certificate" {
  provider = aws.us_east_1

  domain_name       = "media.${local.domain}"
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "OpenResume Wildcard Certificate"
  }
}
