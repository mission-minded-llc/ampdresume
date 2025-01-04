# CloudFront distribution for medialocal
resource "aws_cloudfront_distribution" "medialocal_distribution" {
  origin {
    domain_name = "medialocal.${local.domain}.s3-website-${local.region}.amazonaws.com"
    origin_id   = "S3-medialocal-${local.domain}"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled = true

  default_cache_behavior {
    target_origin_id       = "S3-medialocal-${local.domain}"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]
    compress        = true
    default_ttl     = 86400
    max_ttl         = 31536000
    min_ttl         = 0

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }

      headers = ["Cache-Control"]
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.medialocal_certificate.arn
    ssl_support_method  = "sni-only"
  }

  aliases = ["medialocal.${local.domain}"]

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Environment = "Local"
    Domain      = "medialocal.${local.domain}"
  }
}

# CloudFront distribution for mediatest
resource "aws_cloudfront_distribution" "mediatest_distribution" {
  origin {
    domain_name = "mediatest.${local.domain}.s3-website-${local.region}.amazonaws.com"
    origin_id   = "S3-mediatest-${local.domain}"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled = true

  default_cache_behavior {
    target_origin_id       = "S3-mediatest-${local.domain}"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]
    compress        = true
    default_ttl     = 86400
    max_ttl         = 31536000
    min_ttl         = 0

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }

      headers = ["Cache-Control"]
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.mediatest_certificate.arn
    ssl_support_method  = "sni-only"
  }

  aliases = ["mediatest.${local.domain}"]

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Environment = "Test"
    Domain      = "mediatest.${local.domain}"
  }
}

# CloudFront distribution for media
resource "aws_cloudfront_distribution" "media_distribution" {
  origin {
    domain_name = "media.${local.domain}.s3-website-${local.region}.amazonaws.com"
    origin_id   = "S3-media-${local.domain}"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled = true

  default_cache_behavior {
    target_origin_id       = "S3-media-${local.domain}"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]
    compress        = true
    default_ttl     = 86400
    max_ttl         = 31536000
    min_ttl         = 0

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }

      headers = ["Cache-Control"]
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.media_certificate.arn
    ssl_support_method  = "sni-only"
  }

  aliases = ["media.${local.domain}"]

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Environment = "Production"
    Domain      = "media.${local.domain}"
  }
}
