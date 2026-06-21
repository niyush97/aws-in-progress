variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "ap-northeast-1"
}

variable "project_name" {
  description = "Prefix for all resource name"
  type        = string
  default     = "tgw-lab"
}

variable "vpc_configs" {
  description = "Configuration for each VPC"
  type = map(object({
    cidr        = string
    subnet_cidr = string
    az          = string
  }))
  default = {
    vpc_a = {
      cidr        = "10.0.0.0/16"
      subnet_cidr = "10.0.0.0/24"
      az          = "ap-northeast-1a"
    }
    vpc_b = {
      cidr        = "10.1.0.0/16"
      subnet_cidr = "10.1.0.0/24"
      az          = "ap-northeast-1a"
    }
    vpc_c = {
      cidr        = "10.2.0.0/16"
      subnet_cidr = "10.2.1.0/24"
      az          = "ap-northeast-1a"
    }
  }
}