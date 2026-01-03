#file name `upload.tf` 
resource "aws_s3_object" "SampleFile"{
bucket = aws_s3_bucket.SuperBucket.id 
key = "newfile.txt"
source = "${path.module}/newfile.txt" #works only if the file is in the same directory
}