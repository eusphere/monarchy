resource "aws_s3_bucket" "web" {
  bucket = "monarchy1-web-930597685973"
  tags   = { Project = "monarchy1", Purpose = "web-client" }

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_public_access_block" "web" {
  bucket                  = aws_s3_bucket.web.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "web" {
  bucket = aws_s3_bucket.web.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_acm_certificate" "web" {
  domain_name       = "web.monarchy1.com"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "web_certificate" {
  for_each = {
    for option in aws_acm_certificate.web.domain_validation_options : option.domain_name => {
      name   = option.resource_record_name
      record = option.resource_record_value
      type   = option.resource_record_type
    }
  }

  zone_id = data.aws_route53_zone.monarchy.zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = 60
  records = [each.value.record]
}

resource "aws_acm_certificate_validation" "web" {
  certificate_arn         = aws_acm_certificate.web.arn
  validation_record_fqdns = [for record in aws_route53_record.web_certificate : record.fqdn]
}

resource "aws_cloudfront_origin_access_control" "web" {
  name                              = "monarchy-web"
  description                       = "Private Monarchy web bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_function" "web_routes" {
  name    = "monarchy-web-routes"
  runtime = "cloudfront-js-1.0"
  comment = "Serve the client app for extensionless routes"
  publish = true
  code    = file("${path.module}/web-routes.js")
}

resource "aws_cloudfront_distribution" "web" {
  enabled             = true
  is_ipv6_enabled     = true
  aliases             = [aws_acm_certificate.web.domain_name]
  default_root_object = "index.html"
  price_class         = "PriceClass_100"
  comment             = "Monarchy web client"

  origin {
    origin_id                = "monarchy-web-s3"
    domain_name              = aws_s3_bucket.web.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.web.id
  }

  default_cache_behavior {
    target_origin_id       = "monarchy-web-s3"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    cache_policy_id        = "658327ea-f89d-4fab-a63d-7e88639e58f6"

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.web_routes.arn
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.web.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = { Project = "monarchy1", Purpose = "web-client" }

  lifecycle {
    prevent_destroy = true
  }
}

data "aws_iam_policy_document" "web_bucket" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.web.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.web.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "web" {
  bucket = aws_s3_bucket.web.id
  policy = data.aws_iam_policy_document.web_bucket.json
}

resource "aws_route53_record" "web" {
  zone_id = data.aws_route53_zone.monarchy.zone_id
  name    = "web.monarchy1.com"
  type    = "CNAME"
  ttl     = 60
  records = [aws_cloudfront_distribution.web.domain_name]
}
