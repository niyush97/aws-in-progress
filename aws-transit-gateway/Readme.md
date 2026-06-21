#  AWS Transit Gateway — Hands-On Tutorial

## Terraform Prerequisites

### Install Terraform

**macOS (Homebrew):**
```bash
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
terraform --version
```

**Windows (Chocolatey):**
```powershell
choco install terraform
terraform --version
```

**Linux:**
```bash
sudo apt-get update && sudo apt-get install -y gnupg software-properties-common
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | \
  sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
  https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
  sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
```

### Configure AWS CLI Credentials

```bash
aws configure
# Enter:
# AWS Access Key ID: YOUR_KEY
# AWS Secret Access Key: YOUR_SECRET
# Default region: ap-northeast-1
# Default output format: json
```

---

## Project Structure

Create this folder structure on your local machine:

```
tgw-lab/
├── main.tf          # Core resources
├── variables.tf     # Input variables
├── outputs.tf       # Output values
├── providers.tf     # AWS provider config
└── terraform.tfvars # Your variable values
```

```bash
mkdir tgw-lab && cd tgw-lab
touch main.tf variables.tf outputs.tf providers.tf terraform.tfvars
```

---

## Deploy & Verify

### Initialize Terraform

```bash
cd tgw-lab
terraform init
```

Expected output:
```
Initializing the backend...
Initializing provider plugins...
- Finding hashicorp/aws versions matching "~> 5.0"...
- Installing hashicorp/aws v5.x.x...
-  Terraform has been successfully initialized!
```

---

### Plan — Preview What Will Be Created

```bash
terraform plan
```

You should see a summary like:
```
Plan: 38 to add, 0 to change, 0 to destroy.
```

Review the plan carefully — confirm no unexpected resources.

---

### Apply — Build the Infrastructure

```bash
terraform apply
```

Type `yes` when prompted.

> This takes **8–12 minutes** — the TGW and VPC endpoints take the longest to provision.

When complete, you'll see the outputs:
```
Outputs:

ec2_instance_ids = {
  "vpc_a" = "i-0abc123..."
  "vpc_b" = "i-0def456..."
  "vpc_c" = "i-0ghi789..."
}

ec2_private_ips = {
  "vpc_a" = "10.0.1.x"
  "vpc_b" = "10.1.1.x"
  "vpc_c" = "10.2.1.x"
}

transit_gateway_id = "tgw-0abc123..."
```

---

### Test Connectivity

```bash
# Get instance IDs from output
terraform output ec2_instance_ids

# Start SSM session to EC2-A (use the instance ID from output)
aws ssm start-session --target i-0abc123... --region ap-northeast-1
```

In the session:
```bash
# Ping EC2-B (use IP from terraform output)
ping 10.1.1.x -c 4

# Ping EC2-C
ping 10.2.1.x -c 4
```

---

### Verify State

```bash
# List all managed resources
terraform state list

# Show details of the TGW
terraform state show aws_ec2_transit_gateway.tgw

# Show all outputs
terraform output
```

---

## Terraform Destroy 

If you deployed via Terraform:

```bash
cd tgw-lab
terraform destroy
```

Type `yes` when prompted.

>  Takes ~8–10 minutes. Terraform destroys resources in the correct dependency order automatically.

Verify:
```bash
terraform state list
# Should return empty — no resources remaining
```

---