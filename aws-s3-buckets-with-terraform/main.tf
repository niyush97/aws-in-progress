#> Creating S3 buckets here
resource "aws_s3_bucket" "SuperBucket" {
  bucket = "nb-superbucket-tf-testbucket-for-s3"

  tags = {
    project  = "Creating a S3 Bucket using Terraform"
  }
  }

  #> Blocking public access to the bucket
  resource "aws_s3_bucket_public_access_block" "SuperBucket" {
    bucket = aws_s3_bucket.SuperBucket.id

    block_public_acls = true
    block_public_policy = true
    ignore_public_acls = true
    restrict_public_buckets = true
  }

  