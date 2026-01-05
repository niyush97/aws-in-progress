#===================
#? Creating S3 buckets for audio files storage
#===================

resource "aws_s3_bucket" "mySuperBucketForInput" {
  bucket = var.s3InputBucket
  force_destroy = true
}

#===================
#? Block public access for input bucket
#===================

resource "aws_s3_bucket_public_access_block" "inputbucketBlockAccess" {
    bucket = aws_s3_bucket.mySuperBucketForInput

    block_public_acls = true
    block_public_policy = true
    ignore_public_acls = true
    restrict_public_buckets = true
}

#===================
#? Creating S3 buckets for storing transcribed files.
#===================

resource "aws_s3_bucket" "mySuperBucketForOutput" {
  bucket = var.s3OutputBucket
  force_destroy = true
}

#===================
#? Block public access for output bucket
#===================

resource "aws_s3_bucket_public_access_block" "outputBucketBlockAccess" {
  bucket = aws_s3_bucket.mySuperBucketForOutput

  block_public_acls = true
  block_public_policy = true
  ignore_public_acls = true
  restrict_public_buckets = true
}




