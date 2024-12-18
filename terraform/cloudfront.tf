resource "aws_cloudfront_distribution" "env_distribution" {
  for_each = toset(local.s3_bucket_subdomains)

  origin {
    domain_name = "${each.key}.${local.domain}.s3-website-${local.region}.amazonaws.com"
    origin_id   = "S3-${each.key}-${local.domain}"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled = true

  default_cache_behavior {
    target_origin_id       = "S3-${each.key}-${local.domain}"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]
    compress        = true
    default_ttl     = 3600
    max_ttl         = 86400
    min_ttl         = 0

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.env_certificate[each.key].arn
    ssl_support_method  = "sni-only"
  }

  aliases = ["${each.key}.${local.domain}"]

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Environment = each.key
    Domain      = "${each.key}.${local.domain}"
  }
}
