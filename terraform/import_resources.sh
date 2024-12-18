#!/bin/bash

# Import existing S3 buckets
terraform import 'aws_s3_bucket.medialocal' medialocal.openresume.org
terraform import 'aws_s3_bucket.mediatest' mediatest.openresume.org
terraform import 'aws_s3_bucket.media' media.openresume.org

# Get the distribution IDs using AWS CLI
distribution_id_medialocal=$(aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[?contains(@, 'medialocal.openresume.org')]].Id" --output text)
distribution_id_mediatest=$(aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[?contains(@, 'mediatest.openresume.org')]].Id" --output text)
distribution_id_media=$(aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[?contains(@, 'media.openresume.org')]].Id" --output text)

# Import existing CloudFront distributions
terraform import 'aws_cloudfront_distribution.medialocal_distribution' $distribution_id_medialocal
terraform import 'aws_cloudfront_distribution.mediatest_distribution' $distribution_id_mediatest
terraform import 'aws_cloudfront_distribution.media_distribution' $distribution_id_media