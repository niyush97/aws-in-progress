variable "aws_region" {
  description = "AWS region to deploy resources"
  type = string
  default = "ap-northeast-1"
}

variable "s3InputBucket" {
  description = "here defining the name of s3 bucket via variables"
  type = string
  default = "bucket-to-store-input-files-nb-97"
}

variable "s3OutputBucket" {
  description = "here defining the name of s3 bucket for storing outputted transcribed files"
  type = string
  default = "bucket-to-store-transcribe-files-nb-97"
}