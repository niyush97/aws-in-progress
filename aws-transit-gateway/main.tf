# ─────────────────────────────────────────
# DATA SOURCE — Get latest Amazon Linux 2023
# ─────────────────────────────────────────
data "aws_ami" "amazon_linux_2023" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# ─────────────────────────────────────────
# IAM ROLE FOR SSM
# ─────────────────────────────────────────
resource "aws_iam_role" "ssm_role" {
  name = "${var.project_name}-ec2-ssm-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })

  tags = { Name = "${var.project_name}-ssm-role" }
}

resource "aws_iam_role_policy_attachment" "ssm_policy" {
  role       = aws_iam_role.ssm_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "ssm_profile" {
  name = "${var.project_name}-ssm-instance-profile"
  role = aws_iam_role.ssm_role.name
}

# ─────────────────────────────────────────
# VPCs
# ─────────────────────────────────────────
resource "aws_vpc" "vpcs" {
  for_each = var.vpc_configs

  cidr_block           = each.value.cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = { Name = "${var.project_name}-${each.key}" }
}

# ─────────────────────────────────────────
# SUBNETS
# ─────────────────────────────────────────
resource "aws_subnet" "subnets" {
  for_each = var.vpc_configs

  vpc_id            = aws_vpc.vpcs[each.key].id
  cidr_block        = each.value.subnet_cidr
  availability_zone = each.value.az

  tags = { Name = "${var.project_name}-subnet-${each.key}" }
}

# ─────────────────────────────────────────
# SECURITY GROUPS
# ─────────────────────────────────────────
resource "aws_security_group" "sgs" {
  for_each = var.vpc_configs

  name        = "${var.project_name}-sg-${each.key}"
  description = "Security group for ${each.key}"
  vpc_id      = aws_vpc.vpcs[each.key].id

  ingress {
    description = "Allow ICMP from RFC1918"
    from_port   = -1
    to_port     = -1
    protocol    = "icmp"
    cidr_blocks = ["10.0.0.0/8"]
  }

  ingress {
    description = "Allow HTTPS for SSM endpoints"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [each.value.cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "${var.project_name}-sg-${each.key}" }
}

# ─────────────────────────────────────────
# TRANSIT GATEWAY
# ─────────────────────────────────────────
resource "aws_ec2_transit_gateway" "tgw" {
  description                     = "Lab Transit Gateway"
  amazon_side_asn                 = 64512
  dns_support                     = "enable"
  vpn_ecmp_support                = "enable"
  default_route_table_association = "enable"
  default_route_table_propagation = "enable"
  multicast_support               = "disable"

  tags = { Name = "${var.project_name}-tgw" }
}

# ─────────────────────────────────────────
# TGW ATTACHMENTS
# ─────────────────────────────────────────
resource "aws_ec2_transit_gateway_vpc_attachment" "attachments" {
  for_each = var.vpc_configs

  transit_gateway_id = aws_ec2_transit_gateway.tgw.id
  vpc_id             = aws_vpc.vpcs[each.key].id
  subnet_ids         = [aws_subnet.subnets[each.key].id]

  tags = { Name = "${var.project_name}-attach-${each.key}" }
}

# ─────────────────────────────────────────
# VPC ROUTE TABLES — Add TGW Routes
# ─────────────────────────────────────────
resource "aws_route" "tgw_routes" {
  for_each = {
    "vpc_a_to_b" = { rt = "vpc_a", dest = "10.1.0.0/16" }
    "vpc_a_to_c" = { rt = "vpc_a", dest = "10.2.0.0/16" }
    "vpc_b_to_a" = { rt = "vpc_b", dest = "10.0.0.0/16" }
    "vpc_b_to_c" = { rt = "vpc_b", dest = "10.2.0.0/16" }
    "vpc_c_to_a" = { rt = "vpc_c", dest = "10.0.0.0/16" }
    "vpc_c_to_b" = { rt = "vpc_c", dest = "10.1.0.0/16" }
  }

  route_table_id         = aws_vpc.vpcs[each.value.rt].default_route_table_id
  destination_cidr_block = each.value.dest
  transit_gateway_id     = aws_ec2_transit_gateway.tgw.id

  depends_on = [aws_ec2_transit_gateway_vpc_attachment.attachments]
}

# ─────────────────────────────────────────
# SSM VPC ENDPOINTS (3 per VPC = 9 total)
# ─────────────────────────────────────────
locals {
  ssm_services = ["ssm", "ssmmessages", "ec2messages"]

  endpoint_configs = {
    for pair in setproduct(keys(var.vpc_configs), local.ssm_services) :
    "${pair[0]}_${pair[1]}" => {
      vpc_key = pair[0]
      service = pair[1]
    }
  }
}

resource "aws_vpc_endpoint" "ssm_endpoints" {
  for_each = local.endpoint_configs

  vpc_id              = aws_vpc.vpcs[each.value.vpc_key].id
  service_name        = "com.amazonaws.${var.aws_region}.${each.value.service}"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [aws_subnet.subnets[each.value.vpc_key].id]
  security_group_ids  = [aws_security_group.sgs[each.value.vpc_key].id]
  private_dns_enabled = true

  tags = {
    Name = "${var.project_name}-endpoint-${each.value.vpc_key}-${each.value.service}"
  }
}

# ─────────────────────────────────────────
# EC2 INSTANCES
# ─────────────────────────────────────────

resource "aws_instance" "ec2_instances" {
  for_each = var.vpc_configs

  ami                    = data.aws_ami.amazon_linux_2023.id
  instance_type          = "t3.micro"
  subnet_id              = aws_subnet.subnets[each.key].id
  vpc_security_group_ids = [aws_security_group.sgs[each.key].id]
  iam_instance_profile   = aws_iam_instance_profile.ssm_profile.name

  associate_public_ip_address = false

  tags = { Name = "${var.project_name}-ec2-${each.key}" }

  depends_on = [aws_vpc_endpoint.ssm_endpoints]
}