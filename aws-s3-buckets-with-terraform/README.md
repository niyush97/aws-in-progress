# 📦 Managing AWS S3 Buckets & Files with Terraform

This project demonstrates how to use Terraform to create and manage AWS S3 buckets, upload files, and configure essential settings like access control and lifecycle rules.

---

📖 **Detailed Guide**:  
[Notion Page](https://zenith-epoxy-275.notion.site/Managing-S3-Buckets-Files-with-Terraform-1fcce17158148087a3d6e794dd025243?source=copy_link)

---

## 🚀 Features

- ✅ Create S3 buckets with custom configurations  
- ✅ Upload files to S3 using `aws_s3_object`  
- ✅ Manage public access settings  
- ✅ Configure lifecycle rules for automatic transitions and deletions  

---

## 🛠️ Prerequisites

- [Terraform](https://developer.hashicorp.com/terraform/downloads)  
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) configured with your credentials  
- An AWS account with necessary permissions  

---

## 📂 Project Structure
.
├── main.tf
├── provider.tf
├── multipleFile.tf
├── upload.tf
├── file1.txt
├── file2.txt
├── file3.txt
├── newfile.txt
└── README.md

---

## 🔐 Access Control & Lifecycle Management

- **Public Access**: Configure using `aws_s3_bucket_public_access_block` to restrict public access.  
- **Lifecycle Rules**: Use `aws_s3_bucket_lifecycle_configuration` to automate object transitions and expirations.  

---

## 🧹 Cleanup

To destroy all resources created by this configuration:

```bash
terraform destroy
```