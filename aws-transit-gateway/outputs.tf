output "transit_gateway_id" {
  description = "Transit Gateway ID"
  value       = aws_ec2_transit_gateway.tgw.id
}

output "vpc_ids" {
  description = "VPC IDs"
  value = {
    for k, v in aws_vpc.vpcs : k => v.id
  }
}

output "ec2_private_ips" {
  description = "Private IPs of EC2 instances for ping testing"
  value = {
    for k, v in aws_instance.ec2_instances : k => v.private_ip
  }
}

output "ec2_instance_ids" {
  description = "EC2 Instance IDs for SSM Session Manager"
  value = {
    for k, v in aws_instance.ec2_instances : k => v.id
  }
}

output "tgw_attachment_ids" {
  description = "TGW Attachment IDs"
  value = {
    for k, v in aws_ec2_transit_gateway_vpc_attachment.attachments : k => v.id
  }
}