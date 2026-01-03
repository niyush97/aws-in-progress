locals {
  files = {
    "file1.txt" = "${path.module}/file1.txt"
    "file2.txt" = "${path.module}/file2.txt"
    "file3.txt" = "${path.module}/file3.txt"
  }
}

resource "aws_s3_object" "files" {
  for_each = local.files

  bucket = aws_s3_bucket.SuperBucket.id
  key    = each.key
  source = each.value
}