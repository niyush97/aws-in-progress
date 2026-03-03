# AWS Storage Services - SAA-C03 Exam Guide

>⚠️ These notes were created using Anthropic's AI Models (Opus 4.5 and 4.6).

---

## Table of Contents
1. [Amazon S3 (Simple Storage Service)](#amazon-s3-simple-storage-service)
    - [1.1 Core Concepts of S3](#core-concepts-of-s3)
    - [1.2 S3 Basic](#s3-basics)
    - [1.3 S3 Storage Classes ](#s3-storage-classes)
        - [S3 Standard (General Purpose)](#1-s3-standard-general-purpose)
        - [S3 Intelligent-Tiering](#2-s3-intelligent-tiering)
        - [ S3 Standard-IA (Infrequent Access)](#3-s3-standard-ia-infrequent-access)
        - [S3 One Zone-IA](#4-s3-one-zone-ia)
        - [S3 Glacier Instant Retrieval](#5-s3-glacier-instant-retrieval)
        - [S3 Glacier Flexible Retrieval (formerly Glacier)](#6-s3-glacier-flexible-retrieval-formerly-glacier)
        - [S3 Glacier Deep Archive](#7-s3-glacier-deep-archive)
    - [1.4 Storage Class Comparison Table](#14-storage-class-comparison-table)
    - [1.5 S3 Lifecycle Policies](#15-s3-lifecycle-policies)
    - [1.6 S3 Versioning](#16-s3-versioning)
    - [1.7 S3 Replication](#17-s3-replication)
    - [1.8 S3 Encryption](#18-s3-encryption)
        - [1.8.1 Encryption at Rest (Server-Side Encryption)](#181-encryption-at-rest-server-side-encryption)
        - [1.8.2 Encryption in Transit](#182-encryption-in-transit)
        - [1.8.3 Default Encryption](#183-default-encryption)
    - [1.9 S3 Security](#19-s3-security)
    - [1.10 S3 Block Public Access](#110-s3-block-public-access)
    - [1.11 S3 Access Points](#111-s3-access-points)
    - [1.12 S3 Object Lock](#112-s3-object-lock)
    - [1.13 S3 Performance Optimization](#113-s3-performance-optimization)
    - [1.14 S3 Event Notifications](#114-s3-event-notifications)
    - [1.15 S3 Static Website Hosting](#115-s3-static-website-hosting)
    - [1.16 S3 Cross-Origin Resource Sharing (CORS)](#116-s3-cross-origin-resource-sharing-cors)
    - [1.17 S3 Consistency Model](#117-s3-consistency-model)
    - [When to Use S3](#when-to-use-s3)
    - [Keywords to Identify S3](#keywords-to-identify-s3)
    - [Common Exam Scenarios For S3](#common-exam-scenarios-for-s3)
    - [S3 Best Practices](#s3-best-practices)
    - [S3 Pricing](#s3-pricing)
    - [S3 Limitations & Constraints](#s3-limitations--constraints)
    - [S3 Pros & Cons](#s3-pros--cons)
2. [Amazon EBS (Elastic Block Store)](#amazon-ebs-elastic-block-store)
    - [2.1 Core Concepts of Amazon EBS](#21-core-concepts-of-amazon-ebs)
    - [2.2 EBS vs Instance Store](#22-ebs-vs-instance-store)
    - [2.3 EBS Volume Types](#23-ebs-volume-types)
      - [2.3.1 General Purpose SSD (gp3)](#231-general-purpose-ssd-gp3)
      - [2.3.2 General Purpose SSD (gp2)](#232-general-purpose-ssd-gp2)
      - [2.3.3 Provisioned IOPS SSD (io2 Block Express)](#233-provisioned-iops-ssd-io2-block-express)
      - [2.3.4 Provisioned IOPS SSD (io2)](#234-provisioned-iops-ssd-io2)
      - [2.3.5 Provisioned IOPS SSD (io1)](#235-provisioned-iops-ssd-io1)
      - [2.3.6 Throughput Optimized HDD (st1)](#236-throughput-optimized-hdd-st1)
      - [2.3.7 Cold HDD (sc1)](#237-cold-hdd-sc1)
   - [2.4 EBS Volume Type Comparison Table](#24-ebs-volume-type-comparison-table)
   - [2.5 EBS Snapshots](#25-ebs-snapshots)
      - [2.5.1 Snapshot Features](#251-snapshot-features)
      - [2.5.2 Snapshot Operations](#252-snapshot-operations)
   - [2.6 EBS Encryption](#26-ebs-encryption)
   - [2.7 EBS Multi-Attach (io2 only)](#27-ebs-multi-attach-io2-only)
   - [2.8 EBS Performance](#28-ebs-performance)
   - [2.9 EBS Monitoring ](#29-ebs-monitoring)
   - [2.10 When to Use EBS](#210-when-to-use-ebs)
   - [2.11 Keywords to Identify EBS](#211-keywords-to-identify-ebs)
   - [2.12 EBS Common Exam Scenarios](#212-ebs-common-exam-scenarios)
   - [2.13 EBS Best Practices](#213-ebs-best-practices)
   - [2.14 EBS Pricing](#214-ebs-pricing)
   - [2.15 EBS Limitations & Constraints](#215-ebs-limitations--constraints)
   - [2.16 EBS Pros & Cons](#216-ebs-pros--cons)
3. [Amazon EFS (Elastic File System)](#amazon-efs-elastic-file-system)
    - [EFS architecture](#efs-architecture)
    - [EFS Performance Modes ](#efs-performance-modes)
    - [EFS Throughput Modes ](#efs-throughput-modes )
    - [EFS Storage Classes](#efs-storage-classes)
    - [EFS Storage Class Comparison](#efs-storage-class-comparison )
    - [EFS Lifecycle Management](#efs-lifecycle-management)
    - [EFS Security](#efs-security)
    - [EFS Performance](#efs-performance)
    - [When to Use EFS](#when-to-use-efs)
    - [Keywords to Identify EFS](#keywords-to-identify-efs)
    - [EFS Common Exam Scenarios](#efs-common-exam-scenarios)
    - [EFS Best Practices](#efs-best-practices)
    - [EFS Pricing](#efs-pricing)
    - [EFS Limitations & Constraints](#efs-limitations--constraints)
    - [EFS Pros & Cons](#efs-pros--cons)
4. [AWS Storage Gateway](#aws-storage-gateway)
   - [Storage Gateway Core Concepts](#storage-gateway-core-concepts)
   - [Storage Gateway Types](#storage-gateway-types)
   - [Storage Gateway Comparison](#storage-gateway-comparison)
   - [When to Use Storage Gateway](#when-to-use-storage-gateway)
   - [Keywords to Identify Storage Gateway](#keywords-to-identify-storage-gateway)
   - [Storage Gateway Common Exam Scenarios](#storage-gateway-common-exam-scenarios)
   - [Storage Gateway Best Practices](#storage-gateway-best-practices)
   - [Storage Gateway Pricing](#storage-gateway-pricing)
   - [Storage Gateway Limitations](#storage-gateway-limitations)
   - [Storage Gateway Pros & Cons](#storage-gateway-pros--cons)
5. [Amazon FSx](#amazon-fsx)
   - [FSx Core Concepts](#fsx-core-concepts)
   - [FSx Types](#fsx-types-)
   - [FSx Comparison Table](#fsx-comparison-table)
   - [FSx vs EFS vs EBS](#fsx-vs-efs-vs-ebs)
   - [When to Use FSx](#when-to-use-fsx)
   - [Keywords to Identify FSx](#keywords-to-identify-fsx)
   - [FSx Common Exam Scenarios ](#fsx-common-exam-scenarios)
   - [FSx Best Practices](#fsx-best-practices)
   - [FSx Pricing](#fsx-pricing)
   - [FSx Limitations](#fsx-limitations)
   - [FSx Pros & Cons](#fsx-pros--cons)
6. [AWS Snow Family](#aws-snow-family)
   - [Snow Family Core Concepts](#snow-family-core-concepts)
   - [Snow Family Devices](#snow-family-devices-)
   - [Snow Family Comparison](#snow-family-comparison)
   - [When to Use Snow Family](#when-to-use-snow-family)
   - [Snow Family Process](#snow-family-process)
   - [Snow Family Security](#snow-family-security)
   - [Keywords to Identify Snow Family](#keywords-to-identify-snow-family)
   - [Snow Family Common Exam Scenarios](#snow-family-common-exam-scenarios)
   - [Snow Family Best Practices](#snow-family-best-practices)
   - [Snow Family Pricing](#snow-family-pricing)
   - [Snow Family Limitations](#snow-family-limitations)
   - [Snow Family Pros & Cons](#snow-family-pros--cons)
7. [Storage Services Decision Matrix](#storage-services-decision-matrix-)
   - [Storage Decision Trees](#storage-decision-trees)
8. [Critical Exam Tips for Storage Services](#critical-exam-tips-for-storage-services-)
   - [S3 Storage Classes (Most Tested)](#1-s3-storage-classes-most-tested)
   - [EBS vs EFS vs Instance Store](#2-ebs-vs-efs-vs-instance-store)
   - [S3 Lifecycle Policies](#3-s3-lifecycle-policies)
   - [EBS Volume Types](#4-ebs-volume-types)
   - [S3 Replication](#5-s3-replication)
   - [Snow Family Selection](#6-snow-family-selection)
   - [Storage Gateway Types](#7-storage-gateway-types)
   - [FSx Selection](#8-fsx-selection)
   - [Common Exam Traps](#9-common-exam-traps)
9. [Final Storage Exam Checklist](#final-storage-exam-checklist)
10. [Storage Services Summary Tables](#storage-services-summary-tables)
11. [Final Summary: Most Important Storage Concepts](#final-summary-most-important-storage-concepts)

---

# Amazon S3 (Simple Storage Service)

[BackToTop](#table-of-contents)

## Core Concepts of S3
⭐⭐⭐⭐⭐ (MOST CRITICAL)
- **Object storage** service (not block or file)
- **Unlimited storage** capacity
- **11 9's durability** (99.999999999%)
- **Regional service** (data stored in specific region)
- **Bucket names globally unique**
- Objects up to **5 TB** in size

## S3 Basics 

⭐⭐⭐⭐⭐

### Buckets
```
- Container for objects
- Globally unique name (across all AWS accounts)
- Regional (created in specific region)
- Naming rules:
  - 3-63 characters
  - Lowercase letters, numbers, hyphens
  - No uppercase, no underscores
  - Must start with letter or number
  - Cannot be IP address format

Example: my-app-bucket-us-east-1-2024
```

### Objects
```
Components:
- Key: Full path to object (e.g., folder1/folder2/file.txt)
- Value: Content/data (up to 5 TB)
- Metadata: Key-value pairs (system and user-defined)
- Version ID: If versioning enabled
- Tags: Key-value pairs for organization

Key Concepts:
- No actual "folders" (flat structure with prefixes)
- Key is the full path
- Maximum object size: 5 TB
- Multipart upload required for > 5 GB (recommended for > 100 MB)
```

### S3 URLs
```
Path-style (deprecated):
https://s3.amazonaws.com/bucket-name/object-key

Virtual-hosted-style (current):
https://bucket-name.s3.amazonaws.com/object-key
https://bucket-name.s3.region.amazonaws.com/object-key
```

## S3 Storage Classes 

### 1. S3 Standard (General Purpose)
⭐⭐⭐⭐⭐ (CRITICAL FOR EXAM)

[BackToTop](#table-of-contents)
```
Characteristics:
- 99.99% availability
- 11 9's durability
- Low latency, high throughput
- Sustains 2 concurrent facility failures
- No retrieval fees
- No minimum storage duration

Use Cases:
✅ Frequently accessed data
✅ Big data analytics
✅ Content distribution
✅ Mobile/gaming applications
✅ Dynamic websites

Cost: Highest storage cost, no retrieval cost
```

### 2. S3 Intelligent-Tiering 

⭐⭐⭐⭐

[BackToTop](#table-of-contents)
```
Characteristics:
- Automatic cost optimization
- Moves objects between tiers based on access patterns
- 99.9% availability
- No retrieval fees
- Small monthly monitoring fee ($0.0025 per 1,000 objects)

Tiers:
- Frequent Access: Same as S3 Standard
- Infrequent Access: After 30 days no access
- Archive Instant Access: After 90 days no access
- Archive Access: Optional, after 90-730 days (configurable)
- Deep Archive Access: Optional, after 180-730 days (configurable)

Use Cases:
✅ Unknown or changing access patterns
✅ Unpredictable workloads
✅ Long-lived data with varying access
✅ Automatic cost optimization

Cost: Same as Standard + monitoring fee, automatic savings
```

### 3. S3 Standard-IA (Infrequent Access) 

⭐⭐⭐⭐⭐

[BackToTop](#table-of-contents)

```
Characteristics:
- 99.9% availability
- 11 9's durability
- Lower storage cost than Standard
- Retrieval fee per GB
- Minimum storage duration: 30 days
- Minimum object size: 128 KB

Use Cases:
✅ Disaster recovery
✅ Backups
✅ Long-term storage (accessed infrequently)
✅ Data accessed once a month or less

Cost: ~50% cheaper storage than Standard, but retrieval fees
```

### 4. S3 One Zone-IA 

⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
Characteristics:
- 99.5% availability (lower than Standard-IA)
- 11 9's durability (within single AZ)
- Single AZ (data lost if AZ destroyed)
- 20% cheaper than Standard-IA
- Retrieval fee per GB
- Minimum storage duration: 30 days
- Minimum object size: 128 KB

Use Cases:
✅ Secondary backup copies
✅ Recreatable data
✅ Data that can tolerate AZ failure
✅ Cost optimization for infrequent access

Cost: Cheapest IA option, but single AZ risk
```

### 5. S3 Glacier Instant Retrieval 

⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
Characteristics:
- Millisecond retrieval (same as Standard)
- 99.9% availability
- 11 9's durability
- Minimum storage duration: 90 days
- Retrieval fee per GB
- 68% cheaper than Standard-IA

Use Cases:
✅ Archive data needing instant access
✅ Medical images
✅ News media assets
✅ User-generated content archives

Cost: Very low storage, instant retrieval, 90-day minimum
```

### 6. S3 Glacier Flexible Retrieval (formerly Glacier) 

⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
Characteristics:
- 99.99% availability
- 11 9's durability
- Minimum storage duration: 90 days
- Retrieval options:
  - Expedited: 1-5 minutes ($0.03/GB)
  - Standard: 3-5 hours ($0.01/GB)
  - Bulk: 5-12 hours ($0.0025/GB)

Use Cases:
✅ Long-term backups
✅ Archive data (accessed 1-2 times/year)
✅ Regulatory archives
✅ Disaster recovery archives

Cost: Very low storage, retrieval time varies by option
```

### 7. S3 Glacier Deep Archive 

⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
Characteristics:
- 99.99% availability
- 11 9's durability
- Lowest cost storage class
- Minimum storage duration: 180 days
- Retrieval options:
  - Standard: 12 hours
  - Bulk: 48 hours

Use Cases:
✅ Long-term retention (7-10 years)
✅ Regulatory compliance archives
✅ Data accessed once or twice a year
✅ Magnetic tape replacement

Cost: Cheapest storage (~$1/TB/month), longest retrieval
```

## 1.4 Storage Class Comparison Table 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

| Storage Class | Availability | Durability | AZs | Min Duration | Min Size | Retrieval Time | Use Case |
|---------------|--------------|------------|-----|--------------|----------|----------------|----------|
| **Standard** | 99.99% | 11 9's | ≥3 | None | None | Milliseconds | Frequent access |
| **Intelligent-Tiering** | 99.9% | 11 9's | ≥3 | None | None | Milliseconds | Unknown patterns |
| **Standard-IA** | 99.9% | 11 9's | ≥3 | 30 days | 128 KB | Milliseconds | Infrequent access |
| **One Zone-IA** | 99.5% | 11 9's | 1 | 30 days | 128 KB | Milliseconds | Recreatable data |
| **Glacier Instant** | 99.9% | 11 9's | ≥3 | 90 days | 128 KB | Milliseconds | Archive + instant |
| **Glacier Flexible** | 99.99% | 11 9's | ≥3 | 90 days | None | Minutes to hours | Long-term archive |
| **Glacier Deep Archive** | 99.99% | 11 9's | ≥3 | 180 days | None | 12-48 hours | Compliance archive |

---

## 1.5 S3 Lifecycle Policies 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### What are Lifecycle Policies?
```
- Automate moving objects between storage classes
- Automate object expiration/deletion
- Rules based on object age or prefix
- Cost optimization without manual intervention
```

### Transition Actions
```
Move objects between storage classes:

Standard → Intelligent-Tiering (any time)
Standard → Standard-IA (after 30 days)
Standard → One Zone-IA (after 30 days)
Standard → Glacier Instant (after 30 days)
Standard → Glacier Flexible (after 30 days)
Standard → Glacier Deep Archive (after 30 days)

Standard-IA → Glacier Instant (after 30 days from IA)
Standard-IA → Glacier Flexible (after 30 days from IA)
Standard-IA → Glacier Deep Archive (after 30 days from IA)

Glacier Instant → Glacier Flexible (after 90 days)
Glacier Instant → Glacier Deep Archive (after 90 days)

Glacier Flexible → Glacier Deep Archive (after 90 days)

Note: Cannot move back to warmer tiers automatically
```

### Expiration Actions
```
Delete objects after specified time:
- Delete current versions
- Delete previous versions (if versioning enabled)
- Delete incomplete multipart uploads
- Delete expired object delete markers
```

### Example Lifecycle Policy
```json
{
  "Rules": [
    {
      "Id": "Move to IA after 30 days",
      "Status": "Enabled",
      "Transitions": [
        {
          "Days": 30,
          "StorageClass": "STANDARD_IA"
        },
        {
          "Days": 90,
          "StorageClass": "GLACIER"
        },
        {
          "Days": 365,
          "StorageClass": "DEEP_ARCHIVE"
        }
      ],
      "Expiration": {
        "Days": 3650
      }
    }
  ]
}
```

### Common Lifecycle Scenarios
```
Scenario 1: Log Files
- Day 0-30: S3 Standard (frequent access)
- Day 31-90: S3 Standard-IA (occasional access)
- Day 91-365: Glacier Flexible (archive)
- Day 366+: Delete (no longer needed)

Scenario 2: Backups
- Day 0-30: S3 Standard (recent backups)
- Day 31-90: S3 Standard-IA (older backups)
- Day 91+: Glacier Deep Archive (long-term retention)

Scenario 3: Compliance Data
- Day 0-90: S3 Standard (active)
- Day 91-2555: Glacier Deep Archive (7-year retention)
- Day 2556: Delete (compliance period ended)
```

## 1.6 S3 Versioning 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### What is Versioning?
```
- Keep multiple versions of an object
- Protect against accidental deletes
- Protect against overwrites
- Enabled at bucket level
- Once enabled, can only suspend (not disable)
```

### How Versioning Works
```
Without Versioning:
- Upload file.txt → Overwrites existing file.txt
- Delete file.txt → Permanently deleted

With Versioning:
- Upload file.txt → Creates version 1
- Upload file.txt again → Creates version 2 (version 1 still exists)
- Delete file.txt → Adds delete marker (versions still exist)
- Can restore by removing delete marker
```

### Version IDs
```
- Each version has unique version ID
- Latest version is "current"
- Previous versions are "non-current"
- Delete marker is a version with no data
```

### Versioning States
```
Unversioned (default):
- No versioning
- Objects have null version ID

Enabled:
- All new objects get version IDs
- Previous objects get version IDs on update

Suspended:
- New objects get null version ID
- Existing versions retained
- Can re-enable later
```

### Versioning + Lifecycle
```
Can apply lifecycle rules to:
- Current versions
- Non-current versions (previous versions)

Example:
- Move non-current versions to Glacier after 30 days
- Delete non-current versions after 90 days
- Keep current version in Standard
```

## 1.7 S3 Replication 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Types of Replication

#### 1. Cross-Region Replication (CRR) 
⭐⭐⭐⭐⭐
```
Purpose: Replicate objects to different AWS region

Use Cases:
✅ Compliance (data must be in specific regions)
✅ Lower latency access (users in different regions)
✅ Disaster recovery (cross-region backup)
✅ Replication across accounts

Requirements:
- Versioning enabled on both buckets
- IAM role with replication permissions
- Can be different AWS accounts
```

#### 2. Same-Region Replication (SRR) 
⭐⭐⭐⭐
```
Purpose: Replicate objects within same region

Use Cases:
✅ Log aggregation (multiple buckets to one)
✅ Live replication between prod and test
✅ Compliance (data redundancy in same region)
✅ Replication between accounts (same region)

Requirements:
- Versioning enabled on both buckets
- IAM role with replication permissions
- Can be different AWS accounts
```

### Replication Features
```
What is Replicated:
✅ New objects (after replication enabled)
✅ Metadata and tags
✅ Object ACLs
✅ Object Lock information

What is NOT Replicated:
❌ Existing objects (before replication enabled)
❌ Objects encrypted with SSE-C
❌ Delete markers (optional)
❌ Deletions with version ID (optional)

Replication Options:
- Replicate all objects or subset (prefix/tags)
- Change storage class in destination
- Change ownership to destination account
- Replication Time Control (RTC): 15-minute SLA
```

### Replication Configuration
```
Source Bucket → Destination Bucket
- Must enable versioning on both
- Create IAM role for replication
- Configure replication rule
- Optionally enable RTC (guaranteed 15 min)

Batch Replication:
- Replicate existing objects
- One-time operation
- Use S3 Batch Operations
```

## 1.8 S3 Encryption 

### 1.8.1 Encryption at Rest (Server-Side Encryption)
[BackToTop](#table-of-contents)
#### 1. SSE-S3 (S3-Managed Keys) 
⭐⭐⭐⭐⭐
```
- Encryption using keys managed by S3
- AES-256 encryption
- Default encryption (as of Jan 2023)
- No additional cost
- Header: x-amz-server-side-encryption: AES256

Use when:
✅ Default encryption sufficient
✅ Don't need key control
✅ Simplest option
```

#### 2. SSE-KMS (KMS-Managed Keys) 
⭐⭐⭐⭐⭐
```
- Encryption using AWS KMS keys
- Control over key rotation
- Audit trail (CloudTrail logs KMS usage)
- Can use customer managed keys (CMK)
- Additional cost (KMS API calls)
- Header: x-amz-server-side-encryption: aws:kms

Use when:
✅ Need audit trail of key usage
✅ Need key rotation control
✅ Compliance requires KMS
✅ Need to control who can decrypt

Limitations:
- KMS quota limits (5,500 or 10,000 requests/sec)
- Each upload/download counts toward quota
- Can request quota increase
```

#### 3. SSE-C (Customer-Provided Keys) 
⭐⭐⭐
```
- Encryption using keys you provide
- AWS encrypts/decrypts but doesn't store key
- You manage keys outside AWS
- HTTPS required
- Key must be provided with every request

Use when:
✅ Must manage keys outside AWS
✅ Compliance requires external key management
✅ Need full control over keys

Limitations:
- Cannot use S3 console (API/CLI only)
- More complex to manage
- Cannot use with replication
```

#### 4. Client-Side Encryption 
⭐⭐
```
- Encrypt data before uploading to S3
- You manage encryption/decryption
- You manage keys
- AWS stores encrypted data (doesn't know key)

Use when:
✅ Need end-to-end encryption
✅ Don't trust AWS with unencrypted data
✅ Compliance requires client-side encryption
```

### 1.8.2 Encryption in Transit
[BackToTop](#table-of-contents)

```
- SSL/TLS (HTTPS)
- Encryption during upload/download
- Recommended for all transfers
- Required for SSE-C

Enforce HTTPS:
- Use bucket policy to deny non-HTTPS requests
- Condition: aws:SecureTransport = false
```

### 1.8.3 Default Encryption
[BackToTop](#table-of-contents)

```
- Bucket-level setting
- Applies to all new objects (if not specified)
- Options: SSE-S3 or SSE-KMS
- Does not encrypt existing objects
- Can be overridden per object
```
---

## 1.9 S3 Security 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Access Control Methods

#### 1. IAM Policies 
⭐⭐⭐⭐⭐
```
- Attached to IAM users/roles/groups
- Controls what IAM principals can do
- JSON-based policies

Example:
{
  "Effect": "Allow",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::my-bucket/*"
}

Use when:
✅ Control access for IAM users/roles
✅ Centralized policy management
✅ Cross-service permissions
```

#### 2. Bucket Policies 
⭐⭐⭐⭐⭐
```
- Attached to S3 buckets
- Resource-based policy
- Can grant cross-account access
- Can grant public access
- JSON-based policies

Example:
{
  "Effect": "Allow",
  "Principal": "*",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::my-bucket/*"
}

Use when:
✅ Grant cross-account access
✅ Grant public access
✅ Bucket-level permissions
✅ Simple access control
```

#### 3. Access Control Lists (ACLs) - Legacy 
⭐⭐
```
- Object-level or bucket-level
- Legacy access control
- Limited permissions (READ, WRITE, etc.)
- AWS recommends using IAM/bucket policies instead

Use when:
❌ Generally not recommended (use policies instead)
✅ Only for legacy applications
```

#### 4. Pre-Signed URLs 
⭐⭐⭐⭐⭐
```
- Temporary URL with embedded credentials
- Grant temporary access to private objects
- Expiration time (seconds to days)
- Generated using SDK/CLI

Use when:
✅ Temporary access to private objects
✅ Allow users to upload/download without AWS credentials
✅ Time-limited access
✅ Share private files

Example:
aws s3 presign s3://bucket/object --expires-in 3600
```

---

### 1.10 S3 Block Public Access 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
Settings (4 levels):
1. Block public access granted through NEW ACLs
2. Block public access granted through ANY ACLs
3. Block public access granted through NEW bucket policies
4. Block public access granted through ANY bucket policies

Levels:
- Account level (all buckets)
- Bucket level (specific bucket)

Use when:
✅ Prevent accidental public exposure
✅ Compliance requires private data
✅ Security best practice (enable by default)

Note: Enabled by default for new buckets (as of 2023)
```

### 1.11 S3 Access Points 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
- Simplify access to shared datasets
- Each access point has own policy
- Each access point has own DNS name
- Can restrict to VPC

Use Cases:
✅ Different teams need different access to same bucket
✅ Simplify complex bucket policies
✅ Separate access for different applications

Example:
Bucket: shared-data
Access Point 1: finance-ap (finance team access)
Access Point 2: analytics-ap (analytics team access)
```

### 1.12 S3 Object Lock 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
- Write-once-read-many (WORM) model
- Prevent object deletion/modification
- Compliance and governance modes
- Versioning required

Modes:
1. Governance Mode:
   - Users with special permissions can override
   - Can delete with s3:BypassGovernanceRetention permission
   
2. Compliance Mode:
   - No one can override (including root)
   - Cannot be deleted until retention period expires
   - For regulatory compliance

Retention Period:
- Fixed period (days/years)
- Cannot shorten in compliance mode
- Can extend in both modes

Legal Hold:
- Indefinite retention
- No expiration date
- Can be removed by users with permission
- Independent of retention period

Use when:
✅ Regulatory compliance (SEC, FINRA)
✅ Prevent accidental deletion
✅ Audit requirements
```

## 1.13 S3 Performance Optimization 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)


### Request Rate Performance
```
Baseline Performance:
- 3,500 PUT/COPY/POST/DELETE requests per second per prefix
- 5,500 GET/HEAD requests per second per prefix

Prefix Examples:
bucket/folder1/file.txt → prefix: folder1/
bucket/folder2/file.txt → prefix: folder2/
(Each prefix gets its own 3,500/5,500 limit)

Optimization:
✅ Spread objects across multiple prefixes
✅ Use random prefix for high request rates
✅ Parallelize requests
```

### Transfer Acceleration 
⭐⭐⭐⭐
```
- Upload to CloudFront edge location
- Edge location transfers to S3 over AWS network
- Faster for long-distance uploads
- Additional cost
- Uses distinct URL: bucket.s3-accelerate.amazonaws.com

Use when:
✅ Uploading from far away (different continent)
✅ Large files
✅ Need faster uploads
✅ Global user base

Speed Improvement:
- 50-500% faster (depends on distance)
- Test tool available: s3-accelerate-speedtest
```

### Multipart Upload 
⭐⭐⭐⭐⭐
```
- Split large files into parts
- Upload parts in parallel
- Required for files > 5 GB
- Recommended for files > 100 MB

Benefits:
✅ Faster uploads (parallel)
✅ Resume failed uploads
✅ Upload while creating file

Process:
1. Initiate multipart upload
2. Upload parts (5 MB to 5 GB each)
3. Complete multipart upload (S3 assembles)

Lifecycle:
- Incomplete uploads consume storage
- Use lifecycle policy to delete incomplete uploads
- Example: Delete after 7 days
```

### Byte-Range Fetches 
⭐⭐⭐⭐
```
- Download specific byte range of object
- Parallelize downloads
- Resume failed downloads
- Download only needed portions

Use Cases:
✅ Faster downloads (parallel)
✅ Partial file retrieval (e.g., first 50 bytes for header)
✅ Resume failed downloads
✅ Download specific sections

Example:
GET /object HTTP/1.1
Range: bytes=0-1023
(Downloads first 1024 bytes)
```

### S3 Select & Glacier Select 
⭐⭐⭐⭐
```
- Retrieve subset of data using SQL
- Filter at S3 (not application)
- Reduce data transfer
- Reduce cost (less data transferred)
- Faster (less data to process)

Supported Formats:
- CSV, JSON, Parquet

Example:
SELECT * FROM S3Object WHERE age > 30

Use when:
✅ Need subset of data
✅ Reduce data transfer costs
✅ Faster query response
✅ Simple filtering (not complex analytics)
```

## 1.14 S3 Event Notifications 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)


### What are Event Notifications?
```
- Trigger actions when events occur in S3
- Near real-time (typically seconds)
- Filter by prefix/suffix

Events:
- Object created (PUT, POST, COPY, CompleteMultipartUpload)
- Object removed (DELETE, DeleteMarkerCreated)
- Object restored (from Glacier)
- Replication events
- Lifecycle events
```

### Destinations
```
1. SNS Topic:
   - Send notifications
   - Fan-out to multiple subscribers
   
2. SQS Queue:
   - Queue for processing
   - Decouple producers/consumers
   
3. Lambda Function:
   - Execute code
   - Process objects automatically
   
4. EventBridge:
   - Advanced filtering
   - Multiple destinations
   - Archive events
   - Replay events
```

### Common Use Cases
```
✅ Generate thumbnails when image uploaded
✅ Process logs when uploaded
✅ Trigger workflow on file upload
✅ Send notification on object deletion
✅ Replicate to another system
```

### EventBridge vs SNS/SQS/Lambda
```
EventBridge (Recommended):
✅ Advanced filtering (JSON rules)
✅ Multiple destinations
✅ Archive and replay
✅ Cross-account delivery
✅ 18+ AWS service destinations

SNS/SQS/Lambda (Legacy):
✅ Simple use cases
✅ Direct integration
✅ Lower latency
```

## 1.15 S3 Static Website Hosting 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### What is Static Website Hosting?
```
- Host static websites on S3
- HTML, CSS, JavaScript, images
- No server-side processing
- Scalable and cost-effective

URL Format:
http://bucket-name.s3-website-region.amazonaws.com
or
http://bucket-name.s3-website.region.amazonaws.com
```

### Configuration
```
Requirements:
1. Enable static website hosting
2. Specify index document (e.g., index.html)
3. Optionally specify error document (e.g., error.html)
4. Make objects public (or use bucket policy)

Bucket Policy for Public Access:
{
  "Effect": "Allow",
  "Principal": "*",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::bucket-name/*"
}
```

### Use Cases
```
✅ Static websites (blogs, portfolios)
✅ Single-page applications (React, Angular, Vue)
✅ Documentation sites
✅ Landing pages
✅ Redirect websites
```

### S3 + CloudFront (Recommended) 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
Benefits:
✅ HTTPS support (S3 website endpoint doesn't support HTTPS)
✅ Custom domain with SSL certificate
✅ Global CDN (lower latency)
✅ DDoS protection (Shield)
✅ WAF integration
✅ Caching at edge locations

Architecture:
Users → CloudFront → S3 Bucket (Origin)
```

---

## 1.16 S3 Cross-Origin Resource Sharing (CORS) 
⭐⭐⭐
[BackToTop](#table-of-contents)

### What is CORS?
```
- Web browser security feature
- Allows/blocks requests from different origins
- Origin = protocol + domain + port

Example:
Website: https://www.example.com
S3 Bucket: https://my-bucket.s3.amazonaws.com
(Different origins → CORS needed)
```

### When CORS is Needed
```
Scenario:
- Website hosted on example.com
- Website loads images from S3 bucket
- Browser blocks request (different origin)
- Solution: Enable CORS on S3 bucket
```

### CORS Configuration
```xml
<CORSConfiguration>
  <CORSRule>
    <AllowedOrigin>https://www.example.com</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
  </CORSRule>
</CORSConfiguration>
```

---

## 1.17 S3 Consistency Model 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Strong Consistency (Current)
```
As of December 2020:
- Strong read-after-write consistency
- Strong read-after-update consistency
- Strong read-after-delete consistency
- No eventual consistency

What this means:
- PUT new object → Immediately readable
- UPDATE object → Immediately see new version
- DELETE object → Immediately returns 404
- LIST objects → Immediately reflects changes

No performance trade-off
```
---

## When to Use S3 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### ✅ Use S3 When
- **Object storage** needed (files, images, videos)
- **Backup and archive** (lifecycle policies)
- **Static website hosting**
- **Data lakes** (big data analytics)
- **Content distribution** (with CloudFront)
- **Disaster recovery** (cross-region replication)
- **Application data** (user uploads, logs)
- **Unlimited storage** needed
- **Durability** critical (11 9's)

### ❌ Don't Use S3 When
- Need **block storage** → Use EBS
- Need **file system** (NFS/SMB) → Use EFS or FSx
- Need **database** → Use RDS/DynamoDB
- Need **low-latency random I/O** → Use EBS
- Need to **mount as drive** → Use EFS/FSx
- **Frequently changing data** → Use EBS/EFS

---

## Keywords to Identify S3
[BackToTop](#table-of-contents)

- "Object storage"
- "Unlimited storage"
- "Static website"
- "Backup and archive"
- "Data lake"
- "11 9's durability"
- "Lifecycle policies"
- "Storage classes"
- "Infrequent access"
- "Glacier"

---

## Common Exam Scenarios For S3
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Scenario 1: Cost Optimization for Infrequent Access
**Question**: Application stores user uploads. Files accessed frequently for 30 days, then rarely. Minimize cost.

**Answer**: Use S3 Lifecycle policy to transition to Standard-IA after 30 days

**Why**:
- Standard for first 30 days (frequent access)
- Standard-IA after 30 days (50% cheaper storage)
- Automatic transition (no manual work)
- Retrieval fees acceptable for rare access

### Scenario 2: Long-Term Archive
**Question**: Company must retain compliance data for 7 years. Data accessed once per year for audit.

**Answer**: Use S3 Glacier Deep Archive

**Why**:
- Lowest cost storage (~$1/TB/month)
- 7-year retention supported
- 12-hour retrieval acceptable for annual audit
- 11 9's durability for compliance

### Scenario 3: Global Content Distribution
**Question**: Website serves static content to users worldwide. Need low latency and HTTPS.

**Answer**: S3 + CloudFront

**Why**:
- S3 for storage
- CloudFront for global CDN (low latency)
- HTTPS support with ACM certificate
- Caching at edge locations

### Scenario 4: Cross-Region Disaster Recovery
**Question**: Critical data must be replicated to another region for disaster recovery.

**Answer**: Enable S3 Cross-Region Replication (CRR)

**Why**:
- Automatic replication to different region
- Near real-time replication
- Disaster recovery in different region
- Compliance with geographic requirements
- Versioning provides additional protection

### Scenario 5: Prevent Accidental Deletion
**Question**: Protect critical data from accidental deletion or modification.

**Answer**: Enable S3 Versioning + S3 Object Lock (Compliance Mode)

**Why**:
- Versioning keeps all versions (can restore)
- Object Lock prevents deletion/modification
- Compliance mode = even root can't delete
- Meets regulatory requirements

### Scenario 6: Secure File Sharing
**Question**: Share private files with external users temporarily (24 hours).

**Answer**: Generate S3 Pre-Signed URLs with 24-hour expiration

**Why**:
- Temporary access (expires after 24 hours)
- No AWS credentials needed for users
- Secure (embedded credentials)
- Granular control (specific objects)

### Scenario 7: Large File Upload
**Question**: Upload 10 GB video files from users worldwide.

**Answer**: Use S3 Transfer Acceleration + Multipart Upload

**Why**:
- Transfer Acceleration for faster uploads (global users)
- Multipart Upload for large files (>100 MB)
- Parallel uploads (faster)
- Resume capability

### Scenario 8: Audit Key Usage
**Question**: Track who accesses encryption keys for compliance.

**Answer**: Use SSE-KMS encryption

**Why**:
- KMS logs all key usage to CloudTrail
- Audit trail for compliance
- Control over key rotation
- Can restrict who can decrypt

### Scenario 9: Unknown Access Patterns
**Question**: New application with unpredictable data access patterns.

**Answer**: Use S3 Intelligent-Tiering

**Why**:
- Automatic cost optimization
- Moves objects between tiers based on access
- No retrieval fees
- No operational overhead

### Scenario 10: Process Files on Upload
**Question**: Automatically generate thumbnails when images are uploaded.

**Answer**: S3 Event Notification → Lambda Function

**Why**:
- Automatic trigger on upload
- Lambda processes image
- Serverless (no infrastructure)
- Near real-time processing

---

## S3 Best Practices 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Security Best Practices
```
✅ Enable S3 Block Public Access (default)
✅ Use IAM roles (not access keys)
✅ Enable versioning for critical data
✅ Enable MFA Delete for extra protection
✅ Use encryption (SSE-S3 or SSE-KMS)
✅ Enable CloudTrail logging
✅ Use VPC Endpoints for private access
✅ Implement least privilege access
✅ Use bucket policies for cross-account access
✅ Regular access reviews
```

### Performance Best Practices
```
✅ Use multipart upload for files > 100 MB
✅ Use Transfer Acceleration for global uploads
✅ Distribute objects across prefixes (high request rate)
✅ Use byte-range fetches for large downloads
✅ Use CloudFront for content distribution
✅ Use S3 Select for filtering data
✅ Enable caching headers
```

### Cost Optimization Best Practices
```
✅ Use lifecycle policies (automate transitions)
✅ Use Intelligent-Tiering for unknown patterns
✅ Delete incomplete multipart uploads
✅ Use S3 Storage Lens for visibility
✅ Use S3 Analytics for access patterns
✅ Compress data before upload
✅ Use appropriate storage class
✅ Delete old versions (if versioning enabled)
✅ Use S3 Inventory for large-scale analysis
```

### Durability and Availability Best Practices
```
✅ Enable versioning for critical data
✅ Use Cross-Region Replication for DR
✅ Use lifecycle policies for backups
✅ Test restore procedures regularly
✅ Use Object Lock for compliance
✅ Monitor with CloudWatch metrics
✅ Set up CloudWatch alarms
```

---

## S3 Pricing 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Pricing Components
```
1. Storage Cost (per GB-month):
   - Standard: $0.023/GB
   - Intelligent-Tiering: $0.023/GB + $0.0025 per 1,000 objects
   - Standard-IA: $0.0125/GB
   - One Zone-IA: $0.01/GB
   - Glacier Instant: $0.004/GB
   - Glacier Flexible: $0.0036/GB
   - Glacier Deep Archive: $0.00099/GB

2. Request Costs:
   - PUT/COPY/POST/LIST: $0.005 per 1,000 requests
   - GET/SELECT: $0.0004 per 1,000 requests
   - Lifecycle transitions: $0.01 per 1,000 transitions

3. Data Transfer:
   - IN: Free
   - OUT to Internet: $0.09/GB (first 10 TB/month)
   - OUT to CloudFront: Free
   - OUT to same region: Free
   - OUT to different region: $0.02/GB

4. Retrieval Costs (IA and Glacier):
   - Standard-IA: $0.01/GB
   - One Zone-IA: $0.01/GB
   - Glacier Instant: $0.03/GB
   - Glacier Flexible: $0.01-0.03/GB (depends on speed)
   - Glacier Deep Archive: $0.02/GB

5. Additional Features:
   - Transfer Acceleration: $0.04-0.08/GB
   - Replication: Storage + requests in destination
   - Object Lock: No additional cost
   - Versioning: Storage for each version
```

### Cost Optimization Examples
```
Example 1: 1 TB data, accessed frequently
Standard: 1,000 GB × $0.023 = $23/month

Example 2: 1 TB data, accessed monthly
Standard-IA: 1,000 GB × $0.0125 = $12.50/month
Savings: 46%

Example 3: 1 TB archive, accessed yearly
Glacier Deep Archive: 1,000 GB × $0.00099 = $0.99/month
Savings: 96%

Example 4: 1 TB with lifecycle (30 days Standard, then IA)
Month 1: $23 (Standard)
Month 2+: $12.50 (Standard-IA)
Annual: $23 + ($12.50 × 11) = $160.50
vs. Standard all year: $276
Savings: 42%
```

---

## S3 Limitations & Constraints
[BackToTop](#table-of-contents)

### Bucket Limits
- **100 buckets** per account (soft limit, can increase to 1,000)
- **Bucket names globally unique** (across all AWS accounts)
- **Cannot rename** bucket (must create new and copy)
- **Cannot move** bucket to different region

### Object Limits
- **Maximum object size**: 5 TB
- **Single PUT**: 5 GB maximum
- **Multipart upload**: Required for > 5 GB
- **Maximum parts**: 10,000 per multipart upload
- **Part size**: 5 MB to 5 GB (last part can be < 5 MB)

### Performance Limits
- **3,500 PUT/COPY/POST/DELETE** per second per prefix
- **5,500 GET/HEAD** per second per prefix
- **No limit** on number of prefixes

### Other Limits
- **Bucket policies**: 20 KB maximum
- **Object tags**: 10 tags per object
- **Lifecycle rules**: 1,000 per bucket
- **Event notifications**: 100 configurations per bucket
- **Replication rules**: 1,000 per bucket

---

## S3 Pros & Cons
[BackToTop](#table-of-contents)

**Pros**:
- Unlimited storage capacity
- 11 9's durability (99.999999999%)
- Multiple storage classes (cost optimization)
- Lifecycle policies (automation)
- Versioning (data protection)
- Replication (DR and compliance)
- Strong consistency
- Highly scalable
- Pay-as-you-go pricing
- Integration with AWS services
- Static website hosting
- Event notifications

**Cons**:
- Not a file system (no mounting)
- Not for block storage
- Eventual consistency for some operations (legacy)
- Costs can add up (requests, data transfer)
- Learning curve (many features)
- Bucket names globally unique (naming conflicts)
- Cannot rename buckets
- Object size limit (5 TB)

---

# Amazon EBS (Elastic Block Store)
[BackToTop](#table-of-contents)

## 2.1 Core Concepts of Amazon EBS
⭐⭐⭐⭐⭐ (CRITICAL)
[BackToTop](#table-of-contents)

- **Block storage** for EC2 instances
- **Network-attached** storage (not physically attached)
- **Persistent** storage (survives instance termination)
- **Single AZ** (cannot span AZs)
- **Snapshots** for backup (stored in S3)
- Can attach to **one instance at a time** (except io2 Multi-Attach)

## 2.2 EBS vs Instance Store 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

| Feature | EBS | Instance Store |
|---------|-----|----------------|
| **Persistence** | Persistent (survives stop/terminate) | Ephemeral (lost on stop/terminate) |
| **Performance** | Good (up to 256,000 IOPS) | Excellent (millions of IOPS) |
| **Attachment** | Network-attached | Physically attached |
| **Availability** | Single AZ | Instance-specific |
| **Snapshots** | Yes (to S3) | No |
| **Size** | Up to 64 TB per volume | Fixed (depends on instance type) |
| **Cost** | Pay for provisioned storage | Included with instance |
| **Use Case** | Databases, persistent data | Cache, buffers, temporary data |

**Key Exam Tip**: 
- **Persistent data** → EBS
- **Temporary data, highest IOPS** → Instance Store

---

## 2.3 EBS Volume Types 
⭐⭐⭐⭐⭐ (CRITICAL FOR EXAM)
[BackToTop](#table-of-contents)

### 2.3.1 General Purpose SSD (gp3)
⭐⭐⭐⭐⭐
```
Characteristics:
- Latest generation (recommended)
- Baseline: 3,000 IOPS (any size)
- Baseline: 125 MB/s throughput
- Can provision up to 16,000 IOPS
- Can provision up to 1,000 MB/s throughput
- Size: 1 GB - 16 TB
- Independent IOPS and throughput provisioning

Use Cases:
✅ Boot volumes
✅ Virtual desktops
✅ Development and test environments
✅ Low-latency interactive apps
✅ Most workloads (default choice)

Cost: $0.08/GB-month + $0.005/provisioned IOPS (above 3,000)
```

### 2.3.2 General Purpose SSD (gp2)
⭐⭐⭐⭐
```
Characteristics:
- Previous generation
- IOPS scales with size: 3 IOPS per GB
- Minimum: 100 IOPS (33 GB or less)
- Maximum: 16,000 IOPS (5,334 GB or more)
- Burst to 3,000 IOPS (volumes < 1 TB)
- Size: 1 GB - 16 TB
- IOPS and throughput linked to size

Use Cases:
✅ Same as gp3 (but gp3 is better)
✅ Legacy applications

Cost: $0.10/GB-month

Note: gp3 is better and cheaper than gp2 (use gp3 for new volumes)
```

### 2.3.3. Provisioned IOPS SSD (io2 Block Express) 
⭐⭐⭐⭐
```
Characteristics:
- Highest performance SSD
- Up to 256,000 IOPS per volume
- Up to 4,000 MB/s throughput
- Sub-millisecond latency
- Size: 4 GB - 64 TB
- 1,000 IOPS per GB (max)
- 99.999% durability (vs 99.9% for other EBS)

Use Cases:
✅ Largest, most critical, I/O-intensive workloads
✅ SAP HANA
✅ Oracle databases
✅ Microsoft SQL Server

Cost: $0.125/GB-month + $0.065/provisioned IOPS
```

### 2.3.4. Provisioned IOPS SSD (io2) 
⭐⭐⭐⭐⭐
```
Characteristics:
- High performance SSD
- Up to 64,000 IOPS per volume (256,000 with io2 Block Express)
- Up to 1,000 MB/s throughput
- Sub-millisecond latency
- Size: 4 GB - 16 TB (64 TB for Block Express)
- 500 IOPS per GB (max)
- 99.999% durability
- Supports Multi-Attach (up to 16 instances)

Use Cases:
✅ Critical business applications
✅ Large databases (Oracle, SQL Server, MySQL, PostgreSQL)
✅ I/O-intensive workloads
✅ Applications requiring sustained IOPS

Cost: $0.125/GB-month + $0.065/provisioned IOPS
```

### 2.3.5. Provisioned IOPS SSD (io1) 
⭐⭐⭐⭐
```
Characteristics:
- Previous generation (io2 is better)
- Up to 64,000 IOPS per volume
- Up to 1,000 MB/s throughput
- Size: 4 GB - 16 TB
- 50 IOPS per GB (max)
- 99.9% durability
- Supports Multi-Attach

Use Cases:
✅ Same as io2 (but io2 is better)
✅ Legacy applications

Cost: $0.125/GB-month + $0.065/provisioned IOPS

Note: io2 is better than io1 (same price, better durability)
```

### 2.3.6. Throughput Optimized HDD (st1) 
⭐⭐⭐⭐
```
Characteristics:
- Low-cost HDD
- Throughput-optimized (not IOPS)
- Baseline: 40 MB/s per TB
- Burst: 250 MB/s per TB
- Maximum: 500 MB/s per volume
- Size: 125 GB - 16 TB
- Cannot be boot volume

Use Cases:
✅ Big data
✅ Data warehouses
✅ Log processing
✅ Streaming workloads
✅ Sequential I/O

Cost: $0.045/GB-month
```

### 2.3.7. Cold HDD (sc1) 
⭐⭐⭐⭐
```
Characteristics:
- Lowest cost HDD
- Infrequent access
- Baseline: 12 MB/s per TB
- Burst: 80 MB/s per TB
- Maximum: 250 MB/s per volume
- Size: 125 GB - 16 TB
- Cannot be boot volume

Use Cases:
✅ Infrequently accessed data
✅ Lowest cost storage
✅ Archive storage
✅ Scenarios where cost is most important

Cost: $0.015/GB-month
```

[BackToTop](#table-of-contents)

---


## 2.4 EBS Volume Type Comparison Table 
⭐⭐⭐⭐⭐

| Type | Use Case | Size | Max IOPS | Max Throughput | Boot Volume | Cost |
|------|----------|------|----------|----------------|-------------|------|
| **gp3** | General purpose | 1 GB - 16 TB | 16,000 | 1,000 MB/s | ✅ Yes | $ |
| **gp2** | General purpose (legacy) | 1 GB - 16 TB | 16,000 | 250 MB/s | ✅ Yes | $ |
| **io2 Block Express** | Highest performance | 4 GB - 64 TB | 256,000 | 4,000 MB/s | ✅ Yes | $$$$ |
| **io2** | High performance | 4 GB - 16 TB | 64,000 | 1,000 MB/s | ✅ Yes | $$$ |
| **io1** | High performance (legacy) | 4 GB - 16 TB | 64,000 | 1,000 MB/s | ✅ Yes | $$$ |
| **st1** | Throughput optimized | 125 GB - 16 TB | 500 | 500 MB/s | ❌ No | $$ |
| **sc1** | Cold storage | 125 GB - 16 TB | 250 | 250 MB/s | ❌ No | $ |

[BackToTop](#table-of-contents)

---

## 2.5 EBS Snapshots 
⭐⭐⭐⭐⭐

[BackToTop](#table-of-contents)

### What are Snapshots?
```
- Point-in-time backup of EBS volume
- Stored in S3 (managed by AWS, not visible)
- Incremental (only changed blocks)
- Can create volume from snapshot
- Can copy across regions
- Can share with other accounts
```

### How Snapshots Work
```
First Snapshot:
- Full copy of volume
- Takes time (depends on size)

Subsequent Snapshots:
- Only changed blocks since last snapshot
- Faster and smaller
- Incremental forever

Example:
Volume: 100 GB
Snapshot 1: 100 GB (full)
Change 10 GB
Snapshot 2: 10 GB (incremental)
Change 5 GB
Snapshot 3: 5 GB (incremental)

Total storage: 115 GB (not 315 GB)
```

### 2.5.1 Snapshot Features
[BackToTop](#table-of-contents)
#### 1. EBS Snapshot Archive 
⭐⭐⭐⭐
```
- Move snapshots to archive tier
- 75% cheaper than standard snapshots
- Restore takes 24-72 hours
- For long-term retention

Use when:
✅ Rarely accessed snapshots
✅ Long-term retention (compliance)
✅ Cost optimization

Cost:
- Standard: $0.05/GB-month
- Archive: $0.0125/GB-month (75% cheaper)
```

#### 2. Recycle Bin 
⭐⭐⭐⭐
```
- Recover deleted snapshots
- Retention period: 1 day to 1 year
- Protect against accidental deletion
- No additional cost (pay for storage)

Use when:
✅ Prevent accidental deletion
✅ Compliance requirements
✅ Safety net for operations
```

#### 3. Fast Snapshot Restore (FSR) 
⭐⭐⭐
```
- Eliminate latency on first use
- Instant volume initialization
- Expensive ($0.75/hour per AZ)
- Enable per snapshot per AZ

Use when:
✅ Need instant performance
✅ Critical applications
✅ Cannot tolerate initialization latency

Without FSR:
- First access to each block is slow (lazy loading)
- Performance improves over time

With FSR:
- Full performance immediately
- No lazy loading
```

### 2.5.2 Snapshot Operations
[BackToTop](#table-of-contents)
#### Create Snapshot
```
- Can create while volume in use
- Recommended: Stop I/O or detach volume
- Consistent snapshot: Pause writes
- Application-consistent: Use VSS (Windows) or fsfreeze (Linux)
```

#### Restore from Snapshot
```
- Creates new EBS volume
- Can change volume type (e.g., gp2 to gp3)
- Can change size (increase only)
- Can change AZ (snapshot is regional)
```

#### Copy Snapshot
```
- Copy to different region (DR)
- Copy to different account (sharing)
- Can encrypt during copy
- Incremental copy (only changed blocks)
```

#### Share Snapshot
```
- Share with specific AWS accounts
- Can make public (not recommended)
- Cannot share encrypted snapshots (use copy instead)
```

---

## 2.6 EBS Encryption 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Encryption Features
```
- Encryption at rest (AES-256)
- Encryption in transit (between instance and volume)
- Uses AWS KMS keys
- Minimal performance impact
- Transparent to applications

What's Encrypted:
✅ Data at rest
✅ Data in transit
✅ Snapshots
✅ Volumes created from snapshots
```

### Encryption Process
```
New Volume:
- Enable encryption at creation
- Choose KMS key (default or custom)
- Cannot disable encryption later

Existing Unencrypted Volume:
Cannot encrypt directly. Process:
1. Create snapshot
2. Copy snapshot with encryption
3. Create volume from encrypted snapshot
4. Attach new volume to instance
```

### Encryption and Snapshots
```
Encrypted Volume → Encrypted Snapshot (automatic)
Encrypted Snapshot → Encrypted Volume (automatic)
Unencrypted Snapshot → Can create encrypted volume (specify at creation)
```

### Default Encryption 
⭐⭐⭐⭐
```
- Account-level setting (per region)
- All new volumes encrypted by default
- Uses default KMS key (or specify custom)
- Applies to: EBS volumes, snapshots, AMIs

Enable:
EC2 Console → Account Attributes → EBS Encryption → Enable
```

---

## 2.7 EBS Multi-Attach (io2 only) 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### What is Multi-Attach?
```
- Attach single io2 volume to multiple EC2 instances
- Up to 16 instances (same AZ)
- All instances have read/write access
- Higher availability for clustered applications
```

### Use Cases
```
✅ Clustered Linux applications (GFS2, OCFS2)
✅ Applications requiring concurrent writes
✅ High availability applications

Requirements:
- io2 or io2 Block Express only
- Same AZ
- Cluster-aware file system (not ext4, xfs)
```

### Limitations
```
❌ Only io2 volumes
❌ Same AZ only
❌ Requires cluster-aware file system
❌ Not for all applications
```

---

## 2.8 EBS Performance 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### IOPS vs Throughput
```
IOPS (Input/Output Operations Per Second):
- Number of read/write operations
- Important for: Databases, transactional workloads
- Small, random I/O

Throughput (MB/s):
- Amount of data transferred
- Important for: Big data, streaming, sequential I/O
- Large, sequential I/O

Example:
Database: Needs high IOPS (many small transactions)
Data warehouse: Needs high throughput (large scans)
```

### EBS-Optimized Instances 
⭐⭐⭐⭐
```
- Dedicated bandwidth for EBS
- Prevents network contention
- Better and more consistent performance
- Enabled by default on most instance types
- No additional cost (most instances)

Use when:
✅ Production workloads
✅ Consistent performance needed
✅ High I/O workloads
```

### EBS Performance Factors
```
Factors affecting performance:
1. Volume type (gp3, io2, etc.)
2. Volume size (gp2 scales with size)
3. Instance type (EBS-optimized)
4. I/O size (larger = better throughput)
5. I/O pattern (sequential vs random)
6. Snapshot initialization (FSR helps)
```

---

## 2.9 EBS Monitoring 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### CloudWatch Metrics
```
Key Metrics:
- VolumeReadBytes / VolumeWriteBytes
- VolumeReadOps / VolumeWriteOps (IOPS)
- VolumeThroughputPercentage
- VolumeConsumedReadWriteOps
- BurstBalance (gp2, st1, sc1)

Alarms:
- Low burst balance (gp2)
- High IOPS usage
- High throughput usage
```

### Volume Status Checks
```
Status:
- ok: Normal
- warning: Degraded or severely degraded
- impaired: Stalled or not available
- insufficient-data: Insufficient data

Actions:
- warning: Monitor, may need action
- impaired: Stop I/O, create snapshot, replace volume
```

---

## 2.10 When to Use EBS 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### ✅ Use EBS When
- Need **persistent block storage**
- **Database storage** (MySQL, PostgreSQL, Oracle)
- **Boot volumes** for EC2
- **File systems** (ext4, xfs, NTFS)
- Need **snapshots** for backup
- **Single instance** access (or io2 Multi-Attach)
- Need to **resize** volumes
- Need **encryption**

### ❌ Don't Use EBS When
- Need **shared file system** → Use EFS or FSx
- Need **object storage** → Use S3
- Need **highest IOPS** (millions) → Use Instance Store
- **Temporary data** → Use Instance Store
- Need **multi-AZ** storage → Use EFS
- Need **cross-region** access → Use S3

---

## 2.11 Keywords to Identify EBS
[BackToTop](#table-of-contents)

- "Block storage"
- "Persistent storage"
- "Database storage"
- "Boot volume"
- "Snapshots"
- "IOPS"
- "Throughput"
- "Single AZ"
- "Attach to EC2"

---

## 2.12 EBS Common Exam Scenarios 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)


### Scenario 1: Database with High IOPS
**Question**: MySQL database needs 50,000 IOPS with sub-millisecond latency

**Answer**: Use io2 EBS volume

**Why**:
- Provisioned IOPS (up to 64,000)
- Sub-millisecond latency
- Consistent performance
- 99.999% durability

===================================================================

### Scenario 2: Boot Volume
**Question**: Need cost-effective boot volume for EC2 instance

**Answer**: Use gp3 EBS volume

**Why**:
- Can be boot volume
- Good performance (3,000 IOPS baseline)
- Cost-effective
- Most common choice

===================================================================

### Scenario 3: Big Data Sequential I/O
**Question**: Process large datasets with sequential reads (500 MB/s throughput)

**Answer**: Use st1 (Throughput Optimized HDD)

**Why**:
- Optimized for throughput (not IOPS)
- Up to 500 MB/s
- Cost-effective for sequential I/O
- Perfect for big data

===================================================================

### Scenario 4: Infrequent Access, Lowest Cost
**Question**: Archive data, accessed rarely, minimize cost

**Answer**: Use sc1 (Cold HDD)

**Why**:
- Lowest cost EBS ($0.015/GB-month)
- Suitable for infrequent access
- Still block storage (vs S3)

===================================================================

### Scenario 5: Encrypt Existing Volume
**Question**: Encrypt existing unencrypted EBS volume

**Answer**: Snapshot → Copy with encryption → Create volume from encrypted snapshot

**Why**:
- Cannot encrypt existing volume directly
- Must create new encrypted volume
- Snapshot preserves data

===================================================================

### Scenario 6: Cross-Region Backup
**Question**: Backup EBS volume to different region for disaster recovery

**Answer**: Create snapshot, copy snapshot to target region

**Why**:
- Snapshots can be copied across regions
- Incremental copy (efficient)
- Can restore in target region

===================================================================

### Scenario 7: Instant Performance After Restore
**Question**: Restore from snapshot with full performance immediately

**Answer**: Enable Fast Snapshot Restore (FSR)

**Why**:
- Eliminates lazy loading
- Full performance immediately
- Critical for production

===================================================================

### Scenario 8: Temporary High-Performance Storage
**Question**: Need highest IOPS for temporary data (cache)

**Answer**: Use EC2 Instance Store

**Why**:
- Highest IOPS (millions)
- Physically attached (lowest latency)
- Included with instance (no extra cost)
- Ephemeral (acceptable for temporary data)

---

## 2.13 EBS Best Practices 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Performance Best Practices
```
✅ Use EBS-optimized instances
✅ Use gp3 for most workloads (better than gp2)
✅ Use io2 for I/O-intensive workloads
✅ Use appropriate volume size (gp2 scales with size)
✅ Use RAID 0 for higher throughput (stripe)
✅ Pre-warm volumes (read all blocks) or use FSR
✅ Monitor CloudWatch metrics
✅ Use larger I/O sizes for better throughput
```

### Backup Best Practices
```
✅ Regular snapshots (automated with DLM)
✅ Test restore procedures
✅ Copy snapshots to different region (DR)
✅ Use Recycle Bin (prevent accidental deletion)
✅ Tag snapshots for organization
✅ Delete old snapshots (cost optimization)
✅ Use Snapshot Archive for long-term retention
```

### Security Best Practices
```
✅ Enable encryption by default
✅ Use customer managed KMS keys (audit trail)
✅ Encrypt snapshots
✅ Use IAM policies for access control
✅ Enable CloudTrail logging
✅ Use VPC endpoints for private access
✅ Regular security audits
```

### Cost Optimization Best Practices
```
✅ Use gp3 instead of gp2 (cheaper, better)
✅ Use io2 instead of io1 (same price, better)
✅ Delete unused volumes
✅ Delete old snapshots
✅ Use Snapshot Archive for long-term retention
✅ Right-size volumes (don't over-provision)
✅ Use st1/sc1 for appropriate workloads
✅ Monitor with Cost Explorer
```

---

## 2.14 EBS Pricing
[BackToTop](#table-of-contents)

### Volume Pricing (per GB-month)
```
gp3: $0.08
gp2: $0.10
io2: $0.125 + $0.065 per provisioned IOPS
io1: $0.125 + $0.065 per provisioned IOPS
st1: $0.045
sc1: $0.015
```

### Snapshot Pricing
```
Standard: $0.05/GB-month
Archive: $0.0125/GB-month (75% cheaper)
Fast Snapshot Restore: $0.75/hour per snapshot per AZ
```

### Example Costs
```
Example 1: 100 GB gp3 volume
100 GB × $0.08 = $8/month

Example 2: 100 GB io2 with 10,000 IOPS
Storage: 100 GB × $0.125 = $12.50
IOPS: 10,000 × $0.065 = $650
Total: $662.50/month

Example 3: 1 TB st1 volume
1,000 GB × $0.045 = $45/month

Example 4: 100 GB snapshot
100 GB × $0.05 = $5/month
```

---

## 2.15 EBS Limitations & Constraints
[BackToTop](#table-of-contents)

- **Single AZ**: Volume in one AZ only
- **One instance**: Attach to one instance (except io2 Multi-Attach)
- **Maximum size**: 64 TB per volume
- **Maximum IOPS**: 256,000 (io2 Block Express)
- **Maximum throughput**: 4,000 MB/s (io2 Block Express)
- **Snapshot limit**: 100,000 per account per region
- **Volume limit**: 5,000 per account per region

---

## 2.16 EBS Pros & Cons
[BackToTop](#table-of-contents)

**Pros**:
- Persistent storage
- High performance (up to 256,000 IOPS)
- Snapshots for backup
- Encryption support
- Resizable (increase size)
- Multiple volume types (cost/performance trade-offs)
- 99.999% durability (io2)
- Can change volume type
- Fast Snapshot Restore

**Cons**:
- Single AZ (not multi-AZ)
- Network-attached (latency vs Instance Store)
- One instance attachment (except io2 Multi-Attach)
- Cannot span AZs
- Costs for provisioned storage (even if unused)
- Snapshot initialization latency (without FSR)
- More expensive than S3 for archival

---

# Amazon EFS (Elastic File System)
[BackToTop](#table-of-contents)
## Core Concepts of EFS
⭐⭐⭐⭐⭐ (CRITICAL)
- **Managed NFS (Network File System)** v4.1
- **Shared file system** (multiple instances simultaneously)
- **Multi-AZ** by default (regional service)
- **Elastic** (automatically grows/shrinks)
- **Linux only** (POSIX-compliant)
- Pay for what you use (no pre-provisioning)

---

## EFS vs EBS vs S3 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

| Feature | EFS | EBS | S3 |
|---------|-----|-----|-----|
| **Type** | File system (NFS) | Block storage | Object storage |
| **Access** | Multiple instances | Single instance (except io2) | Unlimited |
| **Protocol** | NFS | Block device | HTTP/S |
| **Availability** | Multi-AZ (regional) | Single AZ | Multi-AZ (regional) |
| **Durability** | 99.999999999% (11 9's) | 99.999% (io2: 99.999%) | 99.999999999% (11 9's) |
| **Scaling** | Automatic (elastic) | Manual (resize) | Automatic (unlimited) |
| **Performance** | Good | Excellent | Good |
| **Cost** | $$$ (per GB used) | $$ (per GB provisioned) | $ (per GB stored) |
| **Use Case** | Shared files, content management | Databases, boot volumes | Backups, archives, static content |

**Key Exam Tip**:
- **Shared file system** → EFS
- **Single instance, high IOPS** → EBS
- **Object storage, unlimited** → S3

---

## EFS Architecture
⭐⭐⭐⭐

[BackToTop](#table-of-contents)

### How EFS Works
```
EFS File System (Regional)
    ↓
Mount Targets (one per AZ)
    ↓
EC2 Instances (multiple AZs)

Example:
EFS File System: fs-12345678
├─ Mount Target (us-east-1a): 10.0.1.100
├─ Mount Target (us-east-1b): 10.0.2.100
└─ Mount Target (us-east-1c): 10.0.3.100

EC2 in any AZ can mount via local mount target
```

### Mount Targets
```
- One mount target per AZ
- In specific subnet
- Has security group (control access)
- Has IP address (for mounting)
- Provides access to EFS from that AZ

Mount Command:
sudo mount -t nfs4 -o nfsvers=4.1 fs-12345678.efs.us-east-1.amazonaws.com:/ /mnt/efs
```

### Multi-AZ Access
```
Instance in AZ-A → Mount Target in AZ-A → EFS
Instance in AZ-B → Mount Target in AZ-B → EFS (same data)
Instance in AZ-C → Mount Target in AZ-C → EFS (same data)

All instances see same file system
Changes visible to all instances immediately
```

---

## EFS Performance Modes 
⭐⭐⭐⭐⭐

[BackToTop](#table-of-contents)

### 1. General Purpose (Default) ⭐⭐⭐⭐⭐
```
Characteristics:
- Lowest latency (sub-millisecond)
- Up to 7,000 file operations per second
- Default and recommended for most workloads

Use Cases:
✅ Web serving
✅ Content management
✅ Home directories
✅ General file sharing
✅ Most applications (default choice)

Latency: Sub-millisecond
```

### 2. Max I/O ⭐⭐⭐⭐
```
Characteristics:
- Higher latency (low milliseconds)
- Virtually unlimited file operations per second
- Higher aggregate throughput
- Cannot change after creation

Use Cases:
✅ Big data analytics
✅ Media processing
✅ Genomics analysis
✅ Thousands of instances accessing

Latency: Low milliseconds (higher than General Purpose)

Note: Choose at creation, cannot change later
```

**Key Exam Tip**: 
- **Most workloads** → General Purpose
- **Thousands of instances, big data** → Max I/O

---

## EFS Throughput Modes 
⭐⭐⭐⭐⭐

[BackToTop](#table-of-contents)

### 1. Bursting Throughput (Default) ⭐⭐⭐⭐⭐
```
How it works:
- Throughput scales with file system size
- Baseline: 50 MB/s per TB of storage
- Burst: Up to 100 MB/s (all file systems)
- Burst credits accumulate when below baseline

Example:
1 TB file system:
- Baseline: 50 MB/s
- Burst: 100 MB/s (with credits)

10 TB file system:
- Baseline: 500 MB/s
- Burst: Not needed (baseline is high)

Use Cases:
✅ Variable workloads
✅ Spiky traffic
✅ Most applications (default)

Cost: Included (no additional charge)
```

### 2. Provisioned Throughput ⭐⭐⭐⭐
```
How it works:
- Specify throughput independent of size
- Pay for provisioned throughput
- Can provision up to 1 GB/s (1,024 MB/s)
- Can change anytime

Example:
100 GB file system with 200 MB/s throughput:
- Baseline (bursting): 5 MB/s (100 GB × 50 MB/s per TB)
- Provisioned: 200 MB/s
- Pay extra for 195 MB/s (200 - 5)

Use Cases:
✅ Small file system, high throughput needed
✅ Consistent high throughput
✅ Performance requirements known

Cost: $6.00 per MB/s per month (above baseline)
```

### 3. Elastic Throughput (Recommended) ⭐⭐⭐⭐⭐
```
How it works:
- Automatically scales throughput up/down
- Up to 3 GB/s for reads, 1 GB/s for writes
- Pay for actual throughput used
- No need to provision

Use Cases:
✅ Unpredictable workloads
✅ Spiky traffic
✅ Don't want to manage throughput
✅ Recommended for most workloads

Cost: Pay for actual throughput used (higher per GB than bursting)

Note: Newest mode, recommended for new file systems
```

**Key Exam Tip**:
- **Variable workload, don't want to manage** → Elastic Throughput
- **Small file system, high throughput** → Provisioned Throughput
- **Large file system, variable** → Bursting Throughput

---

## EFS Storage Classes 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### 1. EFS Standard ⭐⭐⭐⭐⭐
```
Characteristics:
- Multi-AZ storage
- Highest availability and durability
- Frequently accessed files
- 11 9's durability

Use Cases:
✅ Active file systems
✅ Frequently accessed data
✅ Production workloads

Cost: $0.30/GB-month
```

### 2. EFS Standard-IA (Infrequent Access) ⭐⭐⭐⭐⭐
```
Characteristics:
- Multi-AZ storage
- Lower storage cost
- Retrieval fee per GB
- Automatically moved by lifecycle policy
- 11 9's durability

Use Cases:
✅ Infrequently accessed files
✅ Cost optimization
✅ Files accessed few times per quarter

Cost: $0.025/GB-month (92% cheaper than Standard)
Retrieval: $0.01/GB
```

### 3. EFS One Zone ⭐⭐⭐⭐
```
Characteristics:
- Single AZ storage
- Lower cost than Standard
- 99.999999999% durability (within single AZ)
- Data lost if AZ destroyed

Use Cases:
✅ Development and testing
✅ Backups
✅ Data that can be recreated

Cost: $0.16/GB-month (47% cheaper than Standard)
```

### 4. EFS One Zone-IA ⭐⭐⭐⭐
```
Characteristics:
- Single AZ storage
- Lowest cost
- Infrequent access
- Retrieval fee per GB

Use Cases:
✅ Infrequently accessed, non-critical data
✅ Maximum cost savings
✅ Backups, archives

Cost: $0.0133/GB-month (96% cheaper than Standard)
Retrieval: $0.01/GB
```

---

## EFS Storage Class Comparison 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
| Storage Class | Availability | Cost (GB-month) | Retrieval Fee | Use Case |
|---------------|--------------|-----------------|---------------|----------|
| **Standard** | Multi-AZ | $0.30 | None | Frequent access, production |
| **Standard-IA** | Multi-AZ | $0.025 | $0.01/GB | Infrequent access, production |
| **One Zone** | Single AZ | $0.16 | None | Dev/test, non-critical |
| **One Zone-IA** | Single AZ | $0.0133 | $0.01/GB | Infrequent, non-critical |

**Cost Savings**:
- Standard-IA: 92% cheaper than Standard
- One Zone: 47% cheaper than Standard
- One Zone-IA: 96% cheaper than Standard

---

## EFS Lifecycle Management 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### What is Lifecycle Management?
```
- Automatically move files between storage classes
- Based on last access time
- Cost optimization without manual intervention
- Transparent to applications
```

### Lifecycle Policies
```
Move to IA after:
- 7 days since last access
- 14 days since last access
- 30 days since last access
- 60 days since last access
- 90 days since last access

Move back to Standard:
- On first access (automatic)
- No configuration needed
```

### Example
```
Day 0: File created in Standard
Day 1-30: File accessed frequently (stays in Standard)
Day 31-60: File not accessed (moved to Standard-IA after 30 days)
Day 61: File accessed (moved back to Standard automatically)
```

**Key Exam Tip**: Lifecycle policies automatically optimize costs based on access patterns

---

## EFS Security 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### Network Security
```
Mount Target Security Groups:
- Control which instances can mount
- NFS port 2049
- Inbound rule: Allow NFS from EC2 security group

Example:
Mount Target SG: Allow port 2049 from EC2-SG
EC2 SG: Allow outbound to Mount Target SG
```

### IAM Policies
```
- Control who can manage EFS (create, delete)
- Control who can mount file systems
- Use IAM roles for EC2 instances

Example:
{
  "Effect": "Allow",
  "Action": "elasticfilesystem:ClientMount",
  "Resource": "arn:aws:elasticfilesystem:region:account:file-system/fs-id"
}
```

### EFS Access Points ⭐⭐⭐⭐
```
- Application-specific entry points
- Enforce user identity (POSIX)
- Enforce root directory
- Simplify access management

Use Cases:
✅ Multi-tenant applications
✅ Enforce directory structure
✅ Different applications, same file system

Example:
Access Point 1: /app1 (user 1001, group 1001)
Access Point 2: /app2 (user 1002, group 1002)
```

### Encryption ⭐⭐⭐⭐⭐

#### Encryption at Rest
```
- Uses AWS KMS
- Enable at file system creation
- Cannot enable after creation
- Transparent to applications
- No performance impact

To encrypt existing:
1. Create new encrypted file system
2. Copy data (rsync, AWS DataSync)
3. Update mount points
```

#### Encryption in Transit
```
- TLS encryption
- Enable with mount helper (amazon-efs-utils)
- Recommended for all mounts

Mount with encryption:
sudo mount -t efs -o tls fs-12345678:/ /mnt/efs
```

---

## EFS Performance 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### Performance Characteristics
```
Throughput:
- Bursting: 50 MB/s per TB (baseline)
- Provisioned: Up to 1 GB/s
- Elastic: Up to 3 GB/s (reads), 1 GB/s (writes)

IOPS:
- General Purpose: 7,000 ops/sec
- Max I/O: Unlimited ops/sec

Latency:
- General Purpose: Sub-millisecond
- Max I/O: Low milliseconds

Concurrent Connections:
- Thousands of instances simultaneously
```

### Performance Best Practices
```
✅ Use General Purpose mode (lower latency)
✅ Use Elastic Throughput (automatic scaling)
✅ Distribute load across multiple mount targets
✅ Use larger I/O sizes (better throughput)
✅ Use parallel operations
✅ Enable encryption in transit
✅ Use EFS mount helper (amazon-efs-utils)
```

---

## When to Use EFS 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### ✅ Use EFS When
- Need **shared file system** (multiple instances)
- **Linux workloads** (NFS)
- **Content management** systems
- **Web serving** (shared content)
- **Home directories** (shared across instances)
- **Application data** (shared state)
- **Container storage** (ECS, EKS)
- Need **multi-AZ** file system
- **Elastic storage** (grows/shrinks automatically)
- **POSIX-compliant** file system needed

### ❌ Don't Use EFS When
- **Windows workloads** → Use FSx for Windows File Server
- **Single instance** access → Use EBS (cheaper)
- **Object storage** → Use S3
- **Database storage** → Use EBS or RDS
- **Highest IOPS** → Use EBS io2
- **Cost is primary concern** → Use EBS or S3
- **Need SMB protocol** → Use FSx for Windows

---

## Keywords to Identify EFS
[BackToTop](#table-of-contents)
- "Shared file system"
- "NFS"
- "Multiple instances"
- "Linux file system"
- "Content management"
- "Web serving"
- "Multi-AZ file system"
- "Elastic file system"
- "POSIX"
- "Concurrent access"

---

## EFS Common Exam Scenarios 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### Scenario 1: Shared Web Content
**Question**: Multiple EC2 instances need to share web content files across AZs

**Answer**: Use Amazon EFS

**Why**:
- Shared file system (multiple instances)
- Multi-AZ (high availability)
- NFS protocol (Linux)
- Elastic (grows automatically)

### Scenario 2: Container Storage
**Question**: ECS containers need shared persistent storage

**Answer**: Use Amazon EFS with ECS

**Why**:
- Shared across containers
- Persistent (survives container restarts)
- Multi-AZ (high availability)
- Native ECS integration

### Scenario 3: Cost Optimization for Infrequent Access
**Question**: File system with files accessed infrequently, minimize cost

**Answer**: Enable EFS Lifecycle Management to Standard-IA

**Why**:
- Automatically moves infrequently accessed files
- 92% cost savings
- Transparent to applications
- Moves back on access

### Scenario 4: Development Environment
**Question**: Shared file system for dev/test, cost-effective, single AZ acceptable

**Answer**: Use EFS One Zone

**Why**:
- 47% cheaper than Standard
- Shared file system
- Single AZ acceptable for dev/test
- Still elastic and managed

### Scenario 5: High Throughput, Small File System
**Question**: 100 GB file system needs 500 MB/s throughput

**Answer**: Use EFS with Provisioned Throughput

**Why**:
- Bursting baseline: 5 MB/s (100 GB × 50 MB/s per TB)
- Need 500 MB/s (much higher than baseline)
- Provision 495 MB/s additional throughput

### Scenario 6: Big Data with Thousands of Instances
**Question**: Big data processing with 5,000 EC2 instances accessing file system

**Answer**: Use EFS with Max I/O performance mode

**Why**:
- Virtually unlimited operations per second
- Thousands of concurrent connections
- Higher aggregate throughput
- Designed for big data

---

## EFS Best Practices 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### Performance Best Practices
```
✅ Use General Purpose mode (most workloads)
✅ Use Elastic Throughput (automatic scaling)
✅ Use EFS mount helper (amazon-efs-utils)
✅ Enable encryption in transit
✅ Use multiple mount targets (one per AZ)
✅ Distribute load across mount targets
✅ Use larger I/O sizes
✅ Monitor CloudWatch metrics
```

### Cost Optimization Best Practices
```
✅ Enable Lifecycle Management (move to IA)
✅ Use One Zone for dev/test
✅ Use One Zone-IA for maximum savings
✅ Delete unused file systems
✅ Monitor storage usage
✅ Use Elastic Throughput (pay for what you use)
```

### Security Best Practices
```
✅ Enable encryption at rest
✅ Enable encryption in transit
✅ Use security groups (restrict access)
✅ Use IAM policies (control management)
✅ Use EFS Access Points (multi-tenant)
✅ Use VPC (private access)
✅ Enable CloudTrail logging
```

### Availability Best Practices
```
✅ Use Standard storage class (Multi-AZ)
✅ Create mount targets in multiple AZs
✅ Use Auto Scaling groups across AZs
✅ Monitor file system health
✅ Test failover scenarios
```

---

## EFS Pricing
[BackToTop](#table-of-contents)

### Storage Pricing (per GB-month)
```
Standard: $0.30
Standard-IA: $0.025
One Zone: $0.16
One Zone-IA: $0.0133

Retrieval (IA classes): $0.01/GB
```

### Throughput Pricing
```
Bursting: Included (no additional cost)
Provisioned: $6.00 per MB/s per month (above baseline)
Elastic: $0.03 per GB read, $0.06 per GB write
```

### Example Costs
```
Example 1: 100 GB Standard, Bursting
100 GB × $0.30 = $30/month

Example 2: 100 GB Standard-IA, Bursting
100 GB × $0.025 = $2.50/month
Savings: 92%

Example 3: 100 GB One Zone-IA, Bursting
100 GB × $0.0133 = $1.33/month
Savings: 96%

Example 4: 100 GB Standard, Provisioned 200 MB/s
Storage: 100 GB × $0.30 = $30
Baseline: 5 MB/s (100 GB × 50 MB/s per TB)
Additional: 195 MB/s × $6.00 = $1,170
Total: $1,200/month
```

---

## EFS Limitations & Constraints
[BackToTop](#table-of-contents)

- **Linux only**: No Windows support
- **NFS only**: No SMB protocol
- **Regional**: File system in one region
- **Performance mode**: Cannot change after creation
- **Encryption**: Cannot enable after creation
- **Maximum throughput**: 3 GB/s (reads), 1 GB/s (writes)
- **File size**: 52.6 TB maximum per file
- **File system size**: Unlimited (petabytes)

---

## EFS Pros & Cons
[BackToTop](#table-of-contents)

**Pros**:
- Shared file system (multiple instances)
- Multi-AZ (high availability)
- Elastic (automatic scaling)
- Pay for what you use
- POSIX-compliant
- Lifecycle management (cost optimization)
- Multiple storage classes
- Encryption support
- No capacity planning
- Thousands of concurrent connections

**Cons**:
- Linux only (no Windows)
- More expensive than EBS
- More expensive than S3
- NFS only (no SMB)
- Lower performance than EBS (for single instance)
- Cannot change performance mode after creation
- Regional (not global)

---

# AWS Storage Gateway
[BackToTop](#table-of-contents)

## Storage Gateway Core Concepts 
⭐⭐⭐⭐
- **Hybrid cloud storage** service
- Bridge between on-premises and AWS
- **Virtual appliance** (VM or hardware)
- Integrates with S3, EBS, Glacier
- Low-latency access to cloud storage

## Storage Gateway Types 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### 1. File Gateway (S3 File Gateway) ⭐⭐⭐⭐⭐
```
What it does:
- Presents S3 as NFS/SMB file share
- Files stored as objects in S3
- Local cache for frequently accessed files
- Supports S3 Standard, S3-IA, S3 One Zone-IA, S3 Glacier

Architecture:
On-Premises Servers → File Gateway (NFS/SMB) → S3 Bucket

Use Cases:
✅ Migrate file shares to S3
✅ Backup and archive to S3
✅ Tiering to S3 (on-premises + cloud)
✅ Disaster recovery
✅ Cloud-native application access to on-premises files

Features:
- Local cache (low-latency access)
- S3 lifecycle policies
- S3 versioning
- S3 replication
- Active Directory integration (SMB)

Protocols: NFS v3/v4.1, SMB v2/v3
```

### 2. Volume Gateway ⭐⭐⭐⭐

#### Stored Volumes
```
What it does:
- Entire dataset stored on-premises
- Asynchronous backup to S3 (EBS snapshots)
- Low-latency access to all data
- 1 GB - 16 TB per volume

Architecture:
On-Premises Servers → Volume Gateway (iSCSI) → Local Storage
                                              → S3 (Snapshots)

Use Cases:
✅ Need low-latency access to entire dataset
✅ Backup to AWS
✅ Disaster recovery
✅ On-premises primary storage

Features:
- Point-in-time snapshots (EBS snapshots in S3)
- Can restore to EBS volume
- Can create EBS volume from snapshot
```

#### Cached Volumes
```
What it does:
- Primary data stored in S3
- Frequently accessed data cached on-premises
- Low-latency access to hot data
- 1 GB - 32 TB per volume

Architecture:
On-Premises Servers → Volume Gateway (iSCSI) → Local Cache
                                              → S3 (Primary Storage)

Use Cases:
✅ Minimize on-premises storage
✅ Expand storage to cloud
✅ Disaster recovery
✅ Cost optimization

Features:
- S3 as primary storage
- Local cache for hot data
- EBS snapshots for backup
- Can restore to EBS volume
```

### 3. Tape Gateway (VTL - Virtual Tape Library) ⭐⭐⭐⭐
```
What it does:
- Virtual tape library in cloud
- Replace physical tape infrastructure
- Integrates with existing backup software
- Tapes stored in S3 and Glacier

Architecture:
Backup Software → Tape Gateway (iSCSI VTL) → S3 (Virtual Tapes)
                                           → Glacier (Archived Tapes)

Use Cases:
✅ Replace physical tapes
✅ Backup and archive
✅ Long-term retention
✅ Compliance

Features:
- Virtual tapes (100 GB - 5 TB each)
- Virtual tape library (VTL)
- Archive to Glacier (cost savings)
- Compatible with major backup software (Veeam, Veritas, etc.)

Tape States:
- Active: In VTL (S3)
- Archived: In Virtual Tape Shelf (Glacier)
- Retrieved: Restored from Glacier (3-5 hours)
```

---

## Storage Gateway Comparison 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
| Type | Protocol | Primary Storage | Cache | Use Case |
|------|----------|----------------|-------|----------|
| **File Gateway** | NFS/SMB | S3 | Local | File shares, backup to S3 |
| **Volume Gateway (Stored)** | iSCSI | On-premises | N/A | Low-latency, backup to S3 |
| **Volume Gateway (Cached)** | iSCSI | S3 | Local | Minimize on-premises storage |
| **Tape Gateway** | iSCSI VTL | S3/Glacier | Local | Replace physical tapes |

---

## When to Use Storage Gateway 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### ✅ Use Storage Gateway When
- **Hybrid cloud** storage needed
- **Migrate on-premises** data to AWS
- **Backup and archive** to AWS
- **Disaster recovery** (on-premises to cloud)
- **Extend on-premises** storage to cloud
- **Replace physical tapes**
- Need **low-latency access** to cloud data
- **Gradual migration** to cloud

### ❌ Don't Use Storage Gateway When
- **Fully cloud-native** → Use S3, EBS, EFS directly
- **No on-premises** infrastructure → Use native AWS storage
- **Real-time sync** needed → Use DataSync
- **Large initial migration** → Use Snow Family

---

## Keywords to Identify Storage Gateway
[BackToTop](#table-of-contents)

- "Hybrid storage"
- "On-premises to cloud"
- "Backup to AWS"
- "File shares to S3"
- "Replace tapes"
- "Virtual tape library"
- "iSCSI"
- "NFS/SMB to S3"
- "Gradual migration"

---

## Storage Gateway Common Exam Scenarios 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Scenario 1: File Shares to S3
**Question**: Migrate on-premises file shares to S3, maintain NFS access

**Answer**: Use File Gateway

**Why**:
- Presents S3 as NFS share
- Files stored as objects in S3
- Local cache for performance
- Transparent to applications

### Scenario 2: Replace Physical Tapes
**Question**: Replace physical tape backup infrastructure with cloud

**Answer**: Use Tape Gateway

**Why**:
- Virtual tape library
- Compatible with existing backup software
- Archive to Glacier (cost-effective)
- No physical tape management

### Scenario 3: Backup with Low-Latency Access
**Question**: Backup on-premises data to AWS, need low-latency access to all data

**Answer**: Use Volume Gateway (Stored Volumes)

**Why**:
- Entire dataset on-premises (low latency)
- Asynchronous backup to S3
- EBS snapshots for recovery
- Can restore to EC2

### Scenario 4: Minimize On-Premises Storage
**Question**: Minimize on-premises storage, move primary data to cloud

**Answer**: Use Volume Gateway (Cached Volumes)

**Why**:
- Primary data in S3
- Local cache for hot data
- Minimize on-premises storage
- Cost optimization

---

## Storage Gateway Best Practices
[BackToTop](#table-of-contents)

### Performance
```
✅ Adequate cache size (frequently accessed data)
✅ High-bandwidth connection to AWS
✅ Use AWS Direct Connect (consistent performance)
✅ Monitor cache hit ratio
✅ Use multiple gateways (distribute load)
```

### Security
```
✅ Enable encryption in transit (TLS)
✅ Enable encryption at rest (S3/KMS)
✅ Use VPC endpoints (private connectivity)
✅ Use IAM roles (access control)
✅ Enable CloudWatch logging
```

### Cost Optimization
```
✅ Right-size cache
✅ Use S3 lifecycle policies
✅ Archive to Glacier (Tape Gateway)
✅ Monitor data transfer costs
✅ Use Direct Connect (reduce data transfer costs)
```

---

## Storage Gateway Pricing
[BackToTop](#table-of-contents)

### Pricing Components
```
1. Gateway Usage:
   - File Gateway: $125/month per gateway
   - Volume Gateway: $125/month per gateway
   - Tape Gateway: $125/month per gateway

2. Storage:
   - S3 storage costs (standard S3 pricing)
   - Glacier storage costs (for archived tapes)

3. Data Transfer:
   - Data transfer OUT from AWS (standard rates)
   - Data transfer IN to AWS (free)

4. Requests:
   - S3 request costs (PUT, GET, etc.)
```

---

## Storage Gateway Limitations
[BackToTop](#table-of-contents)

- **Bandwidth**: Depends on network connection
- **Cache size**: Limited by local storage
- **File size**: 5 TB maximum (File Gateway)
- **Volume size**: 32 TB maximum (Cached Volumes)
- **Tape size**: 5 TB maximum per tape
- **Latency**: Network latency to AWS

---

## Storage Gateway Pros & Cons
[BackToTop](#table-of-contents)

**Pros**:
- Hybrid cloud storage
- Low-latency local cache
- Integrates with existing applications
- Multiple protocols (NFS, SMB, iSCSI)
- Backup and DR to AWS
- Cost-effective (vs on-premises expansion)
- Managed service

**Cons**:
- Requires on-premises infrastructure (VM or hardware)
- Network dependency
- Cache management complexity
- Additional cost (gateway + storage)
- Not for fully cloud-native

---
---
# Amazon FSx
[BackToTop](#table-of-contents)

## FSx Core Concepts 
⭐⭐⭐⭐
- **Fully managed** third-party file systems
- Multiple file system types
- High performance
- Native compatibility with existing applications

---

## FSx Types 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### 1. FSx for Windows File Server ⭐⭐⭐⭐⭐
```
What it is:
- Fully managed Windows file system
- SMB protocol
- Windows Server-based
- Active Directory integration

Features:
- SMB protocol (Windows native)
- NTFS file system
- Active Directory integration
- DFS (Distributed File System)
- Data deduplication
- Shadow copies (user-initiated restore)
- Multi-AZ deployment
- Automatic backups

Use Cases:
✅ Windows applications
✅ Home directories (Windows users)
✅ Content management (Windows)
✅ Web serving (IIS)
✅ SQL Server (shared storage)
✅ .NET applications

Performance:
- Up to 2 GB/s throughput
- Hundreds of thousands of IOPS
- Sub-millisecond latency

Storage Options:
- SSD: High performance
- HDD: Cost-optimized

Deployment:
- Single-AZ: Lower cost
- Multi-AZ: High availability
```

### 2. FSx for Lustre ⭐⭐⭐⭐⭐
```
What it is:
- High-performance file system
- For compute-intensive workloads
- Integrates with S3
- POSIX-compliant

Features:
- Parallel file system
- Hundreds of GB/s throughput
- Millions of IOPS
- Sub-millisecond latency
- S3 integration (data repository)
- Scratch and persistent deployment
```
```
Use Cases:
✅ High-performance computing (HPC)
✅ Machine learning training
✅ Video processing and rendering
✅ Financial modeling
✅ Genomics analysis
✅ Electronic design automation (EDA)

Performance:
- Up to 1 TB/s throughput
- Millions of IOPS
- Sub-millisecond latency

Deployment Types:

1. Scratch File System:
   - Temporary storage
   - No replication
   - Lower cost
   - Data lost if file server fails
   - Use: Short-term processing, cost-sensitive

2. Persistent File System:
   - Long-term storage
   - Automatic replication within AZ
   - Higher cost
   - Data persists if file server fails
   - Use: Long-term storage, production workloads

S3 Integration:
- Link to S3 bucket (data repository)
- Lazy load from S3 (on first access)
- Write back to S3 (on demand or automatic)
- Transparent to applications
```

### 3. FSx for NetApp ONTAP ⭐⭐⭐
```
What it is:
- Managed NetApp ONTAP file system
- Multi-protocol (NFS, SMB, iSCSI)
- NetApp features in AWS

Features:
- Multi-protocol access (NFS, SMB, iSCSI)
- Snapshots and cloning
- Data deduplication and compression
- Replication (SnapMirror)
- Multi-AZ deployment
- Point-in-time restore

Use Cases:
✅ Migrate NetApp workloads to AWS
✅ Multi-protocol access needed
✅ Advanced data management features
✅ Hybrid cloud (on-premises NetApp + AWS)

Protocols:
- NFS (Linux)
- SMB (Windows)
- iSCSI (block storage)
```

### 4. FSx for OpenZFS ⭐⭐⭐
```
What it is:
- Managed OpenZFS file system
- Linux workloads
- High performance

Features:
- Up to 1 million IOPS
- Sub-millisecond latency
- Snapshots and cloning
- Data compression
- Point-in-time restore
- NFS protocol

Use Cases:
✅ Linux applications
✅ Migrate ZFS workloads to AWS
✅ High-performance Linux workloads
✅ Development and testing (fast cloning)

Protocol: NFS v3/v4
```

---

## FSx Comparison Table 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

| FSx Type | Protocol | OS | Use Case | Performance | Cost |
|----------|----------|----|-----------| ------------|------|
| **Windows File Server** | SMB | Windows | Windows apps, home directories | High | $$ |
| **Lustre** | POSIX | Linux | HPC, ML, video processing | Highest | $$$ |
| **NetApp ONTAP** | NFS, SMB, iSCSI | Both | Multi-protocol, NetApp migration | High | $$$ |
| **OpenZFS** | NFS | Linux | Linux apps, ZFS migration | High | $$ |

---

## FSx vs EFS vs EBS 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

| Feature | FSx Windows | FSx Lustre | EFS | EBS |
|---------|-------------|------------|-----|-----|
| **Protocol** | SMB | POSIX | NFS | Block |
| **OS** | Windows | Linux | Linux | Any |
| **Performance** | High | Highest | Good | Excellent |
| **Use Case** | Windows apps | HPC, ML | Shared Linux files | Single instance |
| **Multi-AZ** | Yes | No | Yes | No |
| **Shared** | Yes | Yes | Yes | No (except io2) |

**Key Exam Tip**:
- **Windows** → FSx for Windows File Server
- **HPC, ML, highest performance** → FSx for Lustre
- **Linux shared files** → EFS
- **Single instance, database** → EBS

---

## When to Use FSx 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### FSx for Windows File Server
```
✅ Windows applications
✅ SMB protocol required
✅ Active Directory integration
✅ Home directories (Windows)
✅ SQL Server shared storage
✅ IIS web serving
✅ .NET applications
```

### FSx for Lustre
```
✅ High-performance computing (HPC)
✅ Machine learning training
✅ Video processing
✅ Financial modeling
✅ Genomics
✅ Need S3 integration
✅ Millions of IOPS required
```

### FSx for NetApp ONTAP
```
✅ Migrate NetApp workloads
✅ Multi-protocol access (NFS + SMB)
✅ Advanced data management
✅ Hybrid cloud with NetApp
```

### FSx for OpenZFS
```
✅ Migrate ZFS workloads
✅ Linux high-performance workloads
✅ Need fast cloning
✅ Development environments
```

---

## Keywords to Identify FSx
[BackToTop](#table-of-contents)

### FSx for Windows
- "Windows file server"
- "SMB"
- "Active Directory"
- "Windows applications"
- "Home directories"
- ".NET"

### FSx for Lustre
- "HPC"
- "High-performance computing"
- "Machine learning"
- "Video processing"
- "Millions of IOPS"
- "S3 integration"
- "Lustre"

### FSx for NetApp ONTAP
- "NetApp"
- "Multi-protocol"
- "NFS and SMB"
- "ONTAP"

### FSx for OpenZFS
- "OpenZFS"
- "ZFS"
- "Linux high performance"

---

## FSx Common Exam Scenarios 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Scenario 1: Windows Home Directories
**Question**: Provide shared home directories for Windows users with Active Directory integration

**Answer**: Use FSx for Windows File Server

**Why**:
- SMB protocol (Windows native)
- Active Directory integration
- Multi-AZ for high availability
- Fully managed

### Scenario 2: Machine Learning Training
**Question**: Train ML models with datasets in S3, need high-performance file system

**Answer**: Use FSx for Lustre with S3 integration

**Why**:
- Highest performance (millions of IOPS)
- S3 integration (lazy load data)
- Parallel file system
- Optimized for ML workloads

### Scenario 3: Video Rendering
**Question**: Render videos requiring hundreds of GB/s throughput

**Answer**: Use FSx for Lustre

**Why**:
- Up to 1 TB/s throughput
- Sub-millisecond latency
- Parallel processing
- Designed for media workloads

### Scenario 4: Migrate NetApp to AWS
**Question**: Migrate on-premises NetApp storage to AWS, need NFS and SMB

**Answer**: Use FSx for NetApp ONTAP

**Why**:
- NetApp compatibility
- Multi-protocol (NFS + SMB)
- NetApp features (SnapMirror, etc.)
- Hybrid cloud support

### Scenario 5: SQL Server Shared Storage
**Question**: SQL Server Always On Failover Cluster needs shared storage

**Answer**: Use FSx for Windows File Server

**Why**:
- SMB protocol (SQL Server compatible)
- Multi-AZ (high availability)
- Windows Server-based
- Supports SQL Server clustering

---

## FSx Best Practices
[BackToTop](#table-of-contents)

### Performance
```
✅ Choose appropriate deployment type
✅ Use Multi-AZ for production (Windows)
✅ Use persistent deployment for long-term (Lustre)
✅ Right-size throughput capacity
✅ Monitor CloudWatch metrics
✅ Use Direct Connect for on-premises access
```

### Security
```
✅ Enable encryption at rest
✅ Enable encryption in transit
✅ Use VPC (private access)
✅ Integrate with Active Directory (Windows)
✅ Use security groups
✅ Enable CloudTrail logging
```

### Cost Optimization
```
✅ Use HDD for cost-optimized workloads (Windows)
✅ Use scratch deployment for temporary workloads (Lustre)
✅ Delete unused file systems
✅ Use data deduplication (Windows, ONTAP)
✅ Monitor storage usage
```

---

## FSx Pricing
[BackToTop](#table-of-contents)

### FSx for Windows File Server
```
Storage:
- SSD: $0.13/GB-month
- HDD: $0.013/GB-month

Throughput: $2.20 per MB/s per month

Backups: $0.05/GB-month

Example (1 TB SSD, 16 MB/s):
Storage: 1,000 GB × $0.13 = $130
Throughput: 16 MB/s × $2.20 = $35.20
Total: $165.20/month
```

### FSx for Lustre
```
Scratch:
- $0.14/GB-month (no replication)

Persistent:
- SSD: $0.145/GB-month
- HDD: $0.015/GB-month

Example (10 TB persistent SSD):
10,000 GB × $0.145 = $1,450/month
```

### FSx for NetApp ONTAP
```
Storage: $0.165/GB-month (SSD)
Throughput: $2.20 per MB/s per month
Backups: $0.05/GB-month
```

### FSx for OpenZFS
```
Storage: $0.165/GB-month (SSD)
Throughput: $2.20 per MB/s per month
Backups: $0.05/GB-month
```

---

## FSx Limitations
[BackToTop](#table-of-contents)

### FSx for Windows
- **Maximum size**: 64 TB per file system
- **Maximum throughput**: 2 GB/s
- **Protocols**: SMB only

### FSx for Lustre
- **Maximum size**: Hundreds of PB
- **Maximum throughput**: 1 TB/s
- **Protocols**: POSIX only
- **Single AZ**: No Multi-AZ option

### FSx for NetApp ONTAP
- **Maximum size**: 192 TB per file system
- **Protocols**: NFS, SMB, iSCSI

### FSx for OpenZFS
- **Maximum size**: 512 TB per file system
- **Protocols**: NFS only

---

## FSx Pros & Cons
[BackToTop](#table-of-contents)

### FSx for Windows File Server
**Pros**:
- Native Windows compatibility
- Active Directory integration
- Multi-AZ (high availability)
- Fully managed
- DFS support

**Cons**:
- Windows only
- More expensive than EFS
- SMB protocol only

### FSx for Lustre
**Pros**:
- Highest performance
- S3 integration
- Parallel file system
- Optimized for HPC/ML

**Cons**:
- Linux only
- Single AZ
- More expensive
- Complex for simple workloads

---
---

# AWS Snow Family
[BackToTop](#table-of-contents)

## Snow Family Core Concepts 
⭐⭐⭐⭐
- **Physical devices** for data transfer
- **Offline data migration** (when network impractical)
- **Edge computing** capabilities
- Secure and rugged devices

## Snow Family Devices 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### 1. AWS Snowcone ⭐⭐⭐⭐
```
Specifications:
- Smallest device
- 8 TB HDD or 14 TB SSD storage
- 2 CPUs, 4 GB RAM
- Weighs 4.5 lbs (2.1 kg)
- Battery-powered option
- Rugged and portable

Use Cases:
✅ Small data transfers (< 14 TB)
✅ Edge computing (IoT, remote locations)
✅ Drone data collection
✅ Tactical edge computing
✅ Space-constrained environments

Data Transfer:
- Offline: Ship device to AWS
- Online: AWS DataSync agent (network transfer)

Edge Computing:
- Run EC2 instances
- AWS IoT Greengrass
```

### 2. AWS Snowball Edge ⭐⭐⭐⭐⭐
```
Two Variants:

A. Snowball Edge Storage Optimized:
   - 80 TB usable storage (HDD)
   - 40 vCPUs, 80 GB RAM
   - 1 TB SSD for block volumes
   - 40 Gb network

B. Snowball Edge Compute Optimized:
   - 42 TB usable storage (HDD + NVMe SSD)
   - 52 vCPUs, 208 GB RAM
   - Optional GPU
   - 100 Gb network

Use Cases:
✅ Large data migrations (10 TB - 10 PB)
✅ Disaster recovery
✅ Data center migration
✅ Edge computing (ML inference)
✅ Remote locations (oil rigs, ships)

Data Transfer:
- Offline: Ship device to AWS
- Can cluster multiple devices

Edge Computing:
- Run EC2 instances (AMIs)
- AWS Lambda functions
- AWS IoT Greengrass
- S3-compatible storage
```

### 3. AWS Snowmobile ⭐⭐⭐
```
Specifications:
- 45-foot shipping container
- 100 PB storage capacity
- Truck-pulled
- GPS tracking
- 24/7 video surveillance
- Dedicated security personnel

Use Cases:
✅ Exabyte-scale data transfers
✅ Data center shutdown/migration
✅ Massive datasets (> 10 PB)
✅ Video libraries
✅ Satellite data

Data Transfer:
- Offline only (ship to AWS)
- AWS team manages deployment

Note: For extremely large migrations only
```

---

## Snow Family Comparison ⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

| Device | Storage | Use Case | Transfer Method | Edge Computing |
|--------|---------|----------|-----------------|----------------|
| **Snowcone** | 8-14 TB | Small transfers, IoT | Offline or Online (DataSync) | Yes (limited) |
| **Snowball Edge Storage** | 80 TB | Large migrations | Offline | Yes |
| **Snowball Edge Compute** | 42 TB | Edge computing, ML | Offline | Yes (powerful) |
| **Snowmobile** | 100 PB | Exabyte-scale | Offline | No |

---

## When to Use Snow Family 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Use Snow Family When
```
✅ Large data transfer (> 10 TB)
✅ Limited bandwidth (slow network)
✅ High network costs
✅ Network transfer takes > 1 week
✅ Offline data migration required
✅ Edge computing in remote locations
✅ Data center migration
✅ Disaster recovery (offline backup)
```

### Don't Use Snow Family When
```
❌ Small data (< 10 TB) → Use DataSync or S3 Transfer Acceleration
❌ Good network bandwidth → Use DataSync or Direct Connect
❌ Real-time sync needed → Use DataSync or Storage Gateway
❌ Continuous data transfer → Use DataSync or Direct Connect
```

### Decision Tree
```
Data Size?
├─ < 10 TB → DataSync or S3 Transfer Acceleration
├─ 10 TB - 10 PB → Snowball Edge
├─ > 10 PB → Snowmobile
└─ Edge computing needed → Snowcone or Snowball Edge Compute
```

---

## Snow Family Process 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Data Migration Process
```
1. Order Device:
   - AWS Console
   - Specify storage capacity
   - Provide shipping address

2. Receive Device:
   - AWS ships device
   - Arrives in 4-6 days (US)

3. Connect and Copy:
   - Power on device
   - Connect to network
   - Use Snowball client or S3 adapter
   - Copy data to device

4. Ship Back:
   - Power off device
   - Use prepaid shipping label
   - Ship to AWS facility

5. Data Import:
   - AWS imports data to S3
   - Receive notification when complete
   - AWS wipes device (NIST standards)

Total Time: ~1 week (depends on location)
```

### Edge Computing Process
```
1. Order Device with edge computing
2. Deploy device at edge location
3. Run applications (EC2, Lambda, IoT Greengrass)
4. Process data locally
5. Optionally sync to AWS (Snowcone with DataSync)
6. Return device when done
```

---

## Snow Family Security 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Security Features
```
✅ 256-bit encryption (keys managed by KMS)
✅ Tamper-resistant enclosure
✅ Trusted Platform Module (TPM)
✅ E-ink shipping label (auto-updates)
✅ GPS tracking (Snowmobile)
✅ Video surveillance (Snowmobile)
✅ Data wiped after import (NIST 800-88 standards)
✅ Chain of custody tracking
```

---

## Keywords to Identify Snow Family
[BackToTop](#table-of-contents)

- "Large data transfer"
- "Offline migration"
- "Limited bandwidth"
- "Petabyte-scale"
- "Physical device"
- "Ship data to AWS"
- "Edge computing"
- "Remote location"
- "Data center migration"
- "Exabyte-scale" (Snowmobile)

---

## Snow Family Common Exam Scenarios 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Scenario 1: Large Data Migration, Limited Bandwidth
**Question**: Migrate 50 TB data to AWS, network transfer would take 2 months

**Answer**: Use AWS Snowball Edge

**Why**:
- 80 TB capacity (sufficient)
- Offline transfer (no network dependency)
- ~1 week total time
- Cost-effective vs network transfer

### Scenario 2: Data Center Shutdown
**Question**: Migrate 500 TB from data center being shut down

**Answer**: Use multiple AWS Snowball Edge devices (clustered)

**Why**:
- 500 TB / 80 TB = ~7 devices
- Parallel transfer (faster)
- Offline migration
- Cost-effective

### Scenario 3: Exabyte-Scale Migration
**Question**: Migrate 50 PB video library to AWS

**Answer**: Use AWS Snowmobile

**Why**:
- 100 PB capacity (sufficient)
- Designed for exabyte-scale
- More cost-effective than multiple Snowballs
- Managed by AWS team

### Scenario 4: Edge Computing in Remote Location
**Question**: Process IoT data at oil rig, limited connectivity

**Answer**: Use AWS Snowball Edge Compute Optimized

**Why**:
- Edge computing capabilities
- Run EC2 instances locally
- Process data at edge
- Sync to AWS when connected

### Scenario 5: Small Remote Site
**Question**: Collect drone data at remote site, 5 TB per day

**Answer**: Use AWS Snowcone

**Why**:
- Portable and lightweight
- Battery-powered option
- 14 TB SSD capacity
- Can use DataSync for online transfer

---

## Snow Family Best Practices
[BackToTop](#table-of-contents)

### Planning
```
✅ Calculate data size accurately
✅ Choose appropriate device
✅ Plan for multiple devices (large migrations)
✅ Test with small dataset first
✅ Consider network transfer time vs Snow
```

### Data Transfer
```
✅ Use multiple devices in parallel
✅ Compress data before transfer
✅ Use Snowball client or S3 adapter
✅ Verify data integrity
✅ Keep device in secure location
```

### Security
```
✅ Use KMS encryption
✅ Secure physical access to device
✅ Track device location
✅ Verify data import completion
✅ Confirm device wipe
```

---

## Snow Family Pricing
[BackToTop](#table-of-contents)

### Pricing Model
```
Snowcone:
- Service fee: $60 per job
- Shipping: Included (one way)
- Data transfer IN: Free
- Storage: First 5 days free, then $15/day

Snowball Edge:
- Service fee: $300 per job (10 days)
- Shipping: Included (one way)
- Data transfer IN: Free
- Storage: First 10 days free, then $15/day

Snowmobile:
- Custom pricing (contact AWS)
- Typically $0.005/GB/month
- Minimum 6-month commitment

Additional Costs:
- Extended storage: $15/day (beyond free period)
- Data transfer OUT: Standard S3 rates
- S3 storage: Standard S3 rates
```

### Cost Comparison Example
```
Scenario: Transfer 100 TB to AWS

Option 1: Network Transfer
- 100 TB × $0.09/GB = $9,000 (data transfer OUT from on-premises)
- Time: 2 months (with 1 Gbps)

Option 2: Snowball Edge (2 devices)
- 2 × $300 = $600 (service fee)
- Time: ~1 week

Savings: $8,400 + faster transfer
```

---

## Snow Family Limitations
[BackToTop](#table-of-contents)

### Snowcone
- **Storage**: 8-14 TB maximum
- **Performance**: Limited compute
- **Use case**: Small transfers only

### Snowball Edge
- **Storage**: 42-80 TB per device
- **Shipping time**: 4-6 days (US)
- **Import time**: ~1 week after receipt
- **Availability**: Not all regions

### Snowmobile
- **Minimum**: 10 PB (not for smaller transfers)
- **Availability**: Limited (contact AWS)
- **Deployment**: Requires planning and coordination

---

## Snow Family Pros & Cons
[BackToTop](#table-of-contents)

**Pros**:
- Fast for large data (vs network)
- Cost-effective (vs network transfer)
- Secure (encryption, tamper-resistant)
- No network dependency
- Edge computing capabilities
- Rugged and portable

**Cons**:
- Physical device (shipping time)
- Not real-time (offline)
- Limited to specific regions
- Requires planning
- Device management overhead
- Not for continuous sync

---

# Storage Services Decision Matrix 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## Quick Reference: When to Use Which Storage

| Requirement | Service | Keywords |
|-------------|---------|----------|
| **Object storage, unlimited** | S3 | "Backup", "archive", "static website", "data lake" |
| **Block storage, single instance** | EBS | "Database", "boot volume", "high IOPS" |
| **Shared file system, Linux** | EFS | "Shared files", "NFS", "multiple instances", "content management" |
| **Shared file system, Windows** | FSx for Windows | "SMB", "Active Directory", "Windows apps" |
| **HPC, ML, highest performance** | FSx for Lustre | "HPC", "machine learning", "video processing", "millions of IOPS" |
| **Hybrid storage, on-premises** | Storage Gateway | "Hybrid", "on-premises to cloud", "backup to AWS" |
| **Large offline migration** | Snow Family | "Petabyte-scale", "limited bandwidth", "offline transfer" |
| **Temporary, highest IOPS** | Instance Store | "Cache", "temporary", "ephemeral", "millions of IOPS" |

---

# Storage Decision Trees
[BackToTop](#table-of-contents)

## Decision Tree 1: Storage Type Selection

```
What type of storage needed?

├─ Object Storage?
│  └─ S3 (unlimited, durable, cost-effective)
│
├─ Block Storage?
│  ├─ Single instance? → EBS
│  ├─ Temporary data? → Instance Store
│  └─ Shared (io2)? → EBS Multi-Attach
│
├─ File System?
│  ├─ Linux shared? → EFS
│  ├─ Windows shared? → FSx for Windows
│  ├─ HPC/ML? → FSx for Lustre
│  ├─ NetApp? → FSx for NetApp ONTAP
│  └─ ZFS? → FSx for OpenZFS
│
├─ Hybrid (On-Premises + Cloud)?
│  └─ Storage Gateway
│
└─ Large Offline Migration?
   └─ Snow Family
```

## Decision Tree 2: S3 Storage Class Selection

```
What access pattern?

├─ Frequent access?
│  └─ S3 Standard
│
├─ Unknown/changing pattern?
│  └─ S3 Intelligent-Tiering
│
├─ Infrequent access (monthly)?
│  ├─ Multi-AZ required? → S3 Standard-IA
│  └─ Single AZ acceptable? → S3 One Zone-IA
│
├─ Archive, instant retrieval?
│  └─ S3 Glacier Instant Retrieval
│
├─ Archive, retrieval in hours?
│  └─ S3 Glacier Flexible Retrieval
│
└─ Archive, retrieval in 12-48 hours?
   └─ S3 Glacier Deep Archive
```

## Decision Tree 3: EBS Volume Type Selection

```
What workload type?

├─ Boot volume or general purpose?
│  └─ gp3 (default choice)
│
├─ High IOPS database?
│  ├─ Need > 16,000 IOPS? → io2 or io2 Block Express
│  └─ Need ≤ 16,000 IOPS? → gp3
│
├─ Throughput-optimized (big data)?
│  └─ st1 (HDD)
│
└─ Infrequent access, lowest cost?
   └─ sc1 (HDD)
```

## Decision Tree 4: File System Selection

```
What OS and requirements?

├─ Windows?
│  └─ FSx for Windows File Server
│
├─ Linux?
│  ├─ Shared across instances? → EFS
│  ├─ HPC/ML workload? → FSx for Lustre
│  ├─ ZFS migration? → FSx for OpenZFS
│  └─ Single instance? → EBS
│
├─ Both Windows and Linux?
│  └─ FSx for NetApp ONTAP
│
└─ Highest performance?
   └─ FSx for Lustre
```

---

# Critical Exam Tips for Storage Services 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## 1. S3 Storage Classes (Most Tested)

### Must Remember
```
Standard: Frequent access, highest cost
Intelligent-Tiering: Unknown patterns, automatic optimization
Standard-IA: Infrequent access, Multi-AZ
One Zone-IA: Infrequent access, Single AZ (cheaper)
Glacier Instant: Archive, instant retrieval
Glacier Flexible: Archive, hours retrieval
Glacier Deep Archive: Archive, 12-48 hours retrieval (cheapest)

Key Numbers:
- Standard-IA: 30-day minimum, 128 KB minimum
- Glacier Instant: 90-day minimum
- Glacier Flexible: 90-day minimum
- Glacier Deep Archive: 180-day minimum
```

### Common Mistakes
```
❌ Using Standard for infrequent access (expensive)
❌ Using Glacier for frequently accessed data (retrieval fees)
❌ Forgetting minimum storage duration charges
❌ Not using Intelligent-Tiering for unknown patterns
```

---

## 2. EBS vs EFS vs Instance Store

### Quick Decision
```
Single instance + persistent → EBS
Multiple instances + shared → EFS
Temporary + highest IOPS → Instance Store
Windows shared → FSx for Windows
HPC/ML → FSx for Lustre
```

### Key Differences
```
EBS:
✅ Persistent
✅ Single AZ
✅ One instance (except io2 Multi-Attach)
✅ Snapshots to S3
✅ Up to 256,000 IOPS

EFS:
✅ Persistent
✅ Multi-AZ (regional)
✅ Multiple instances
✅ NFS protocol
✅ Elastic (auto-scaling)

Instance Store:
✅ Ephemeral (lost on stop/terminate)
✅ Physically attached
✅ Millions of IOPS
✅ Included with instance
✅ No snapshots
```

---

## 3. S3 Lifecycle Policies

### Must Remember
```
Transition Rules:
- Can move to colder tiers
- Cannot move to warmer tiers automatically
- Minimum days between transitions

Common Pattern:
Day 0-30: Standard
Day 31-90: Standard-IA
Day 91-365: Glacier Flexible
Day 366+: Glacier Deep Archive or Delete
```

---

## 4. EBS Volume Types

### Quick Decision
```
Boot volume / general → gp3
High IOPS database → io2
Big data / sequential → st1
Lowest cost / infrequent → sc1
```

### Key Numbers
```
gp3: 3,000 IOPS baseline, up to 16,000 IOPS
io2: Up to 64,000 IOPS (256,000 for Block Express)
st1: Up to 500 MB/s throughput
sc1: Up to 250 MB/s throughput
```

---

## 5. S3 Replication

### CRR vs SRR
```
Cross-Region Replication (CRR):
✅ Different regions
✅ Compliance, DR, lower latency
✅ Cross-account supported

Same-Region Replication (SRR):
✅ Same region
✅ Log aggregation, prod/test replication
✅ Cross-account supported

Both require:
- Versioning enabled (source and destination)
- IAM role with permissions
- Only new objects replicated (unless batch replication)
```

---

## 6. Snow Family Selection

### Decision Matrix
```
< 10 TB + good network → DataSync or S3 Transfer Acceleration
< 10 TB + limited network → Snowcone
10 TB - 10 PB → Snowball Edge
> 10 PB → Snowmobile
Edge computing → Snowcone or Snowball Edge Compute
```

---

## 7. Storage Gateway Types

### Quick Decision
```
File shares to S3 → File Gateway (NFS/SMB)
Block storage backup → Volume Gateway
Replace tapes → Tape Gateway (VTL)
```

---

## 8. FSx Selection

### Quick Decision
```
Windows apps → FSx for Windows File Server
HPC/ML → FSx for Lustre
NetApp migration → FSx for NetApp ONTAP
ZFS migration → FSx for OpenZFS
```

---

## 9. Common Exam Traps

### Trap 1: S3 for Block Storage
```
❌ Wrong: Use S3 for database storage
✅ Right: Use EBS for database storage
S3 is object storage, not block storage
```

### Trap 2: EBS for Shared Storage
```
❌ Wrong: Use EBS for multiple instances
✅ Right: Use EFS for shared file system
EBS is single instance (except io2 Multi-Attach)
```

### Trap 3: EFS for Windows
```
❌ Wrong: Use EFS for Windows applications
✅ Right: Use FSx for Windows File Server
EFS is Linux only (NFS)
```

### Trap 4: Instance Store for Persistent Data
```
❌ Wrong: Use Instance Store for database
✅ Right: Use EBS for persistent data
Instance Store is ephemeral (lost on stop)
```

### Trap 5: Glacier for Frequent Access
```
❌ Wrong: Use Glacier for daily access
✅ Right: Use S3 Standard or Standard-IA
Glacier has retrieval time and fees
```

### Trap 6: Network Transfer for Large Data
```
❌ Wrong: Transfer 100 TB over network (slow, expensive)
✅ Right: Use Snow Family for large offline migration
Snow is faster and cheaper for > 10 TB
```

---

# Final Storage Exam Checklist
[BackToTop](#table-of-contents)

## Before the Exam

### ✅ Core Concepts to Master
- [ ] S3 storage classes (all 7 classes, use cases, costs)
- [ ] S3 lifecycle policies (transition rules, minimum durations)
- [ ] S3 replication (CRR vs SRR)
- [ ] S3 encryption (SSE-S3, SSE-KMS, SSE-C)
- [ ] EBS volume types (gp3, io2, st1, sc1)
- [ ] EBS snapshots (incremental, cross-region copy)
- [ ] EBS vs EFS vs Instance Store
- [ ] EFS storage classes and lifecycle
- [ ] FSx types (Windows, Lustre, NetApp, OpenZFS)
- [ ] Storage Gateway types (File, Volume, Tape)
- [ ] Snow Family devices (Snowcone, Snowball, Snowmobile)

### ✅ Decision Trees to Remember
- [ ] Storage type selection (S3 vs EBS vs EFS vs FSx)
- [ ] S3 storage class selection
- [ ] EBS volume type selection
- [ ] File system selection (EFS vs FSx)
- [ ] Snow Family device selection

### ✅ Key Numbers to Memorize
- [ ] S3 durability: 11 9's (99.999999999%)
- [ ] S3 Standard availability: 99.99%
- [ ] S3 Standard-IA minimum: 30 days, 128 KB
- [ ] S3 Glacier Instant minimum: 90 days
- [ ] S3 Glacier Deep Archive minimum: 180 days
- [ ] EBS maximum size: 64 TB
- [ ] EBS io2 maximum IOPS: 64,000 (256,000 Block Express)
- [ ] EFS throughput: 50 MB/s per TB (bursting)
- [ ] Snowcone: 8-14 TB
- [ ] Snowball Edge: 42-80 TB
- [ ] Snowmobile: 100 PB

### ✅ Common Patterns
- [ ] Backup and archive → S3 with lifecycle to Glacier
- [ ] Shared Linux files → EFS
- [ ] Shared Windows files → FSx for Windows
- [ ] Database storage → EBS
- [ ] Static website → S3 + CloudFront
- [ ] Large offline migration → Snow Family
- [ ] HPC/ML → FSx for Lustre
- [ ] Hybrid storage → Storage Gateway

---

# Storage Services Summary Tables
[BackToTop](#table-of-contents)

## Storage Service Comparison 
⭐⭐⭐⭐⭐

| Service | Type | Durability | Availability | Shared | Protocol | Use Case |
|---------|------|------------|--------------|--------|----------|----------|
| **S3** | Object | 11 9's | 99.99% | Yes | HTTP/S | Backup, archive, static content |
| **EBS** | Block | 99.999% (io2) | 99.999% (io2) | No* | Block | Database, boot volume |
| **EFS** | File | 11 9's | 99.99% | Yes | NFS | Shared Linux files |
| **FSx Windows** | File | High | 99.9%+ | Yes | SMB | Windows apps |
| **FSx Lustre** | File | High | 99.9%+ | Yes | POSIX | HPC, ML |
| **Instance Store** | Block | None | N/A | No | Block | Temporary, cache |

*Except io2 Multi-Attach

---

## S3 Storage Classes Cost Comparison 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

| Storage Class | Cost (GB-month) | Retrieval Fee | Min Duration | Min Size | Availability |
|---------------|-----------------|---------------|--------------|----------|--------------|
| **Standard** | $0.023 | None | None | None | 99.99% |
| **Intelligent-Tiering** | $0.023 + monitoring | None | None | None | 99.9% |
| **Standard-IA** | $0.0125 | $0.01/GB | 30 days | 128 KB | 99.9% |
| **One Zone-IA** | $0.01 | $0.01/GB | 30 days | 128 KB | 99.5% |
| **Glacier Instant** | $0.004 | $0.03/GB | 90 days | 128 KB | 99.9% |
| **Glacier Flexible** | $0.0036 | $0.01-0.03/GB | 90 days | None | 99.99% |
| **Glacier Deep Archive** | $0.00099 | $0.02/GB | 180 days | None | 99.99% |

**Cost Savings vs Standard**:
- Standard-IA: 46% cheaper
- One Zone-IA: 57% cheaper
- Glacier Instant: 83% cheaper
- Glacier Flexible: 84% cheaper
- Glacier Deep Archive: 96% cheaper

---

## EBS Volume Types Comparison 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

| Type | IOPS | Throughput | Size | Cost (GB-month) | Use Case |
|------|------|------------|------|-----------------|----------|
| **gp3** | 3,000-16,000 | 125-1,000 MB/s | 1 GB - 16 TB | $0.08 | General purpose |
| **gp2** | 100-16,000 | Up to 250 MB/s | 1 GB - 16 TB | $0.10 | General purpose (legacy) |
| **io2** | Up to 64,000 | Up to 1,000 MB/s | 4 GB - 16 TB | $0.125 + IOPS | High performance |
| **io2 Block Express** | Up to 256,000 | Up to 4,000 MB/s | 4 GB - 64 TB | $0.125 + IOPS | Highest performance |
| **st1** | Up to 500 | Up to 500 MB/s | 125 GB - 16 TB | $0.045 | Throughput optimized |
| **sc1** | Up to 250 | Up to 250 MB/s | 125 GB - 16 TB | $0.015 | Cold storage |

---

## File System Comparison 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

| Feature | EFS | FSx Windows | FSx Lustre | FSx NetApp | FSx OpenZFS |
|---------|-----|-------------|------------|------------|-------------|
| **Protocol** | NFS | SMB | POSIX | NFS/SMB/iSCSI | NFS |
| **OS** | Linux | Windows | Linux | Both | Linux |
| **Multi-AZ** | Yes | Yes | No | Yes | Yes |
| **Performance** | Good | High | Highest | High | High |
| **Max Throughput** | 3 GB/s | 2 GB/s | 1 TB/s | High | High |
| **Use Case** | Shared Linux | Windows apps | HPC, ML | Multi-protocol | ZFS workloads |
| **Cost** | $$ | $$ | $$$ | $$$ | $$ |

---

## Snow Family Comparison 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

| Device | Storage | Compute | Weight | Use Case | Cost |
|--------|---------|---------|--------|----------|------|
| **Snowcone** | 8-14 TB | 2 CPU, 4 GB RAM | 4.5 lbs | Small transfers, IoT | $60/job |
| **Snowball Edge Storage** | 80 TB | 40 vCPU, 80 GB RAM | ~50 lbs | Large migrations | $300/job |
| **Snowball Edge Compute** | 42 TB | 52 vCPU, 208 GB RAM | ~50 lbs | Edge computing | $300/job |
| **Snowmobile** | 100 PB | None | 45-ft container | Exabyte-scale | Custom |

---

# Advanced Storage Concepts

## S3 Performance Optimization 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Request Rate Optimization
```
Baseline:
- 3,500 PUT/COPY/POST/DELETE per second per prefix
- 5,500 GET/HEAD per second per prefix

Optimization Strategies:
1. Use multiple prefixes:
   bucket/prefix1/ → 3,500 writes/sec
   bucket/prefix2/ → 3,500 writes/sec
   Total: 7,000 writes/sec

2. Use random prefixes for high request rates:
   bucket/a1b2c3d4/object
   bucket/e5f6g7h8/object
   (Each gets own 3,500/5,500 limit)

3. Use CloudFront for read-heavy workloads:
   - Caching at edge locations
   - Reduces requests to S3
   - Lower latency for users
```

### Transfer Optimization
```
Multipart Upload:
- Required: Files > 5 GB
- Recommended: Files > 100 MB
- Benefits:
  ✅ Parallel uploads (faster)
  ✅ Resume failed uploads
  ✅ Upload while creating file

Transfer Acceleration:
- Upload to CloudFront edge location
- Edge transfers to S3 over AWS network
- 50-500% faster (long distances)
- Additional cost
- Use when: Global users, large files

Byte-Range Fetches:
- Download specific byte ranges
- Parallel downloads (faster)
- Resume failed downloads
- Partial file retrieval
```

---

## EBS Performance Optimization 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### IOPS Optimization
```
1. Choose appropriate volume type:
   - gp3: Up to 16,000 IOPS
   - io2: Up to 64,000 IOPS
   - io2 Block Express: Up to 256,000 IOPS

2. Use EBS-optimized instances:
   - Dedicated bandwidth for EBS
   - No network contention
   - Enabled by default (most instances)

3. Use larger I/O sizes:
   - Larger I/O = better throughput
   - Example: 256 KB I/O vs 16 KB I/O

4. Pre-warm volumes:
   - Read all blocks before use
   - Or use Fast Snapshot Restore (FSR)
   - Eliminates lazy loading penalty

5. Use RAID 0 for higher throughput:
   - Stripe across multiple volumes
   - Aggregate IOPS and throughput
   - No redundancy (use for temp data)
```

### Snapshot Optimization
```
1. Use incremental snapshots:
   - Only changed blocks
   - Faster and cheaper

2. Use Fast Snapshot Restore (FSR):
   - Instant volume initialization
   - No lazy loading
   - $0.75/hour per snapshot per AZ

3. Copy snapshots to other regions:
   - Disaster recovery
   - Incremental copy (efficient)

4. Use lifecycle policies:
   - Delete old snapshots
   - Archive to Snapshot Archive (75% cheaper)
   - Automate with DLM (Data Lifecycle Manager)
```

---

## EFS Performance Optimization 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Throughput Optimization
```
1. Choose appropriate throughput mode:
   - Bursting: Scales with size (50 MB/s per TB)
   - Provisioned: Fixed throughput (up to 1 GB/s)
   - Elastic: Auto-scales (up to 3 GB/s reads, 1 GB/s writes)

2. Increase file system size:
   - Bursting mode scales with size
   - Larger file system = higher baseline throughput

3. Use multiple mount targets:
   - One per AZ
   - Distribute load across AZs

4. Use larger I/O sizes:
   - Better throughput
   - Reduce metadata operations

5. Use parallel operations:
   - Multiple threads/processes
   - Aggregate throughput
```

### Cost Optimization
```
1. Enable Lifecycle Management:
   - Move to Standard-IA after 30 days
   - 92% cost savings
   - Automatic and transparent

2. Use One Zone for dev/test:
   - 47% cheaper than Standard
   - Single AZ acceptable for non-production

3. Use One Zone-IA for maximum savings:
   - 96% cheaper than Standard
   - Infrequent access + single AZ

4. Use Elastic Throughput:
   - Pay for what you use
   - No over-provisioning
   - Automatic scaling
```

---

## S3 Security Best Practices 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Access Control
```
1. Enable S3 Block Public Access:
   - Account level (all buckets)
   - Bucket level (specific bucket)
   - Prevents accidental public exposure
   - Enable by default

2. Use IAM policies for users/roles:
   - Centralized management
   - Fine-grained control
   - Cross-service permissions

3. Use bucket policies for resources:
   - Resource-based control
   - Cross-account access
   - Public access (if needed)

4. Use S3 Access Points:
   - Simplify complex policies
   - Per-application access
   - VPC-restricted access

5. Use Pre-Signed URLs:
   - Temporary access
   - Time-limited
   - No AWS credentials needed
```

### Encryption
```
1. Enable default encryption:
   - Bucket-level setting
   - SSE-S3 or SSE-KMS
   - Applies to all new objects

2. Use SSE-KMS for audit trail:
   - CloudTrail logs key usage
   - Control over key rotation
   - Compliance requirements

3. Enforce encryption in transit:
   - Bucket policy: Deny non-HTTPS
   - Condition: aws:SecureTransport = false

4. Use Object Lock for compliance:
   - WORM (Write-Once-Read-Many)
   - Prevent deletion/modification
   - Governance or Compliance mode
```

### Monitoring and Logging
```
1. Enable S3 Server Access Logging:
   - Log all requests
   - Store in separate bucket
   - Analyze access patterns

2. Enable CloudTrail:
   - Log API calls
   - Who, what, when
   - Compliance and audit

3. Use S3 Storage Lens:
   - Organization-wide visibility
   - Usage metrics
   - Cost optimization insights

4. Set up CloudWatch alarms:
   - Unusual access patterns
   - High request rates
   - Large data transfers
```

---

## Hybrid Storage Patterns 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Pattern 1: Tiered Storage (On-Premises + Cloud)
```
Architecture:
On-Premises (Hot Data) → Storage Gateway → S3 (Warm/Cold Data)

Use Case:
- Keep frequently accessed data on-premises
- Tier infrequently accessed data to S3
- Transparent to applications

Implementation:
- File Gateway: NFS/SMB to S3
- Local cache for hot data
- S3 lifecycle policies for cold data
```

### Pattern 2: Backup and Archive
```
Architecture:
On-Premises Backup Software → Tape Gateway → S3/Glacier

Use Case:
- Replace physical tapes
- Long-term retention
- Compliance archives

Implementation:
- Tape Gateway (VTL)
- Active tapes in S3
- Archived tapes in Glacier
```

### Pattern 3: Disaster Recovery
```
Architecture:
On-Premises Primary → Volume Gateway → S3 (Snapshots)
                                     → EBS (Restore)

Use Case:
- Backup on-premises volumes
- Quick recovery to EC2
- Cross-region DR

Implementation:
- Volume Gateway (Stored or Cached)
- EBS snapshots in S3
- Restore to EC2 in any region
```

### Pattern 4: Cloud Bursting
```
Architecture:
On-Premises (Baseline) → File Gateway → S3
                                      → EC2 (Burst Compute)

Use Case:
- Handle peak workloads in cloud
- Keep baseline on-premises
- Cost optimization

Implementation:
- File Gateway for shared storage
- EC2 Auto Scaling for burst compute
- Access same data from on-premises and cloud
```

---

## Data Migration Strategies 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Small Data (< 10 TB)

#### Option 1: AWS DataSync
```
Use when:
- Good network bandwidth
- Need continuous sync
- Automated scheduling

Features:
- Up to 10 Gbps per task
- Incremental transfers
- Data validation
- Scheduling
- Bandwidth throttling

Cost: $0.0125 per GB transferred
```

#### Option 2: S3 Transfer Acceleration
```
Use when:
- Uploading to S3
- Global users
- Large files

Features:
- Upload to CloudFront edge
- 50-500% faster
- Simple to enable

Cost: $0.04-0.08 per GB
```

#### Option 3: AWS CLI/SDK
```
Use when:
- One-time transfer
- Small datasets
- Scripting needed

Features:
- Free (except data transfer)
- Flexible
- Scriptable

Cost: Standard data transfer rates
```

### Medium Data (10 TB - 10 PB)

#### Option 1: AWS Snowball Edge
```
Use when:
- Limited bandwidth
- Network transfer > 1 week
- Cost-effective needed

Process:
1. Order device ($300)
2. Copy data (80 TB per device)
3. Ship back to AWS
4. AWS imports to S3

Time: ~1 week total
Cost: $300 per device + shipping
```

#### Option 2: AWS Direct Connect + DataSync
```
Use when:
- Need ongoing transfers
- Consistent bandwidth needed
- Hybrid architecture

Features:
- Dedicated 1-100 Gbps connection
- Consistent performance
- Lower data transfer costs

Cost: Port hours + data transfer
```

### Large Data (> 10 PB)

#### AWS Snowmobile
```
Use when:
- Exabyte-scale migration
- Data center shutdown
- Fastest option for massive data

Process:
1. Contact AWS
2. AWS deploys 100 PB container
3. Copy data
4. AWS transports to facility
5. Import to S3

Time: Weeks to months (depends on data size)
Cost: Custom pricing (~$0.005/GB/month)
```

---

## Storage Cost Optimization Strategies 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### S3 Cost Optimization
```
1. Use appropriate storage class:
   - Frequent access: Standard
   - Infrequent access: Standard-IA or One Zone-IA
   - Archive: Glacier or Glacier Deep Archive
   - Unknown: Intelligent-Tiering

2. Enable lifecycle policies:
   - Automatic transitions
   - Delete old versions
   - Delete incomplete multipart uploads

3. Use S3 Analytics:
   - Analyze access patterns
   - Optimize storage class selection
   - Identify optimization opportunities

4. Compress data:
   - Reduce storage costs
   - Reduce data transfer costs
   - Application-level compression

5. Delete unnecessary data:
   - Old versions (if versioning enabled)
   - Incomplete multipart uploads
   - Unused objects

6. Use S3 Inventory:
   - Identify large objects
   - Find old objects
   - Analyze storage usage

7. Monitor with S3 Storage Lens:
   - Organization-wide visibility
   - Cost optimization recommendations
   - Usage trends
```

### EBS Cost Optimization
```
1. Delete unused volumes:
   - Unattached volumes still cost money
   - Identify with AWS Config or scripts

2. Delete old snapshots:
   - Incremental, but still cost money
   - Keep only necessary snapshots
   - Use lifecycle policies

3. Use appropriate volume type:
   - gp3 instead of gp2 (cheaper, better)
   - io2 instead of io1 (same price, better)
   - st1/sc1 for appropriate workloads

4. Right-size volumes:
   - Don't over-provision
   - Monitor usage with CloudWatch
   - Resize as needed

5. Use Snapshot Archive:
   - 75% cheaper than standard snapshots
   - For long-term retention
   - 24-72 hour restore time

6. Stop instances when not in use:
   - EBS volumes still charged when instance stopped
   - But cheaper than running instance
   - Good for dev/test
```

### EFS Cost Optimization
```
1. Enable Lifecycle Management:
   - Move to IA after 30 days
   - 92% cost savings
   - Automatic and transparent

2. Use One Zone for dev/test:
   - 47% cheaper than Standard
   - Acceptable for non-production

3. Use One Zone-IA for maximum savings:
   - 96% cheaper than Standard
   - Infrequent access + single AZ

4. Use Elastic Throughput:
   - Pay for what you use
   - No over-provisioning
   - Automatic scaling

5. Delete unused file systems:
   - Pay for storage used
   - Remove when no longer needed
```

---

## Storage Monitoring and Troubleshooting 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### S3 Monitoring
```
CloudWatch Metrics:
- BucketSizeBytes
- NumberOfObjects
- AllRequests
- GetRequests
- PutRequests
- 4xxErrors, 5xxErrors

S3 Storage Lens:
- Organization-wide visibility
- Usage metrics
- Cost optimization insights
- Anomaly detection

S3 Server Access Logs:
- Detailed request logs
- Access patterns
- Security analysis

CloudTrail:
- API call logging
- Who, what, when
- Compliance and audit
```

### EBS Monitoring
```
CloudWatch Metrics:
- VolumeReadBytes / VolumeWriteBytes
- VolumeReadOps / VolumeWriteOps (IOPS)
- VolumeThroughputPercentage
- VolumeConsumedReadWriteOps
- BurstBalance (gp2, st1, sc1)

Volume Status Checks:
- ok: Normal
- warning: Degraded
- impaired: Stalled or unavailable

Common Issues:
- Low burst balance (gp2): Upgrade to gp3 or increase size
- High IOPS usage: Upgrade volume type
- Impaired status: Create snapshot, replace volume
```

### EFS Monitoring
```
CloudWatch Metrics:
- DataReadIOBytes / DataWriteIOBytes
- MetadataIOBytes
- TotalIOBytes
- PercentIOLimit
- BurstCreditBalance (bursting mode)
- ClientConnections

Common Issues:
- High PercentIOLimit: Increase size or use provisioned throughput
- Low burst balance: Increase size or use elastic throughput
- High latency: Check network, use General Purpose mode
```

---

# Final Summary: Most Important Storage Concepts 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## Must Know (Critical for Exam)

### 1. S3 Storage Classes
```
Know:
- All 7 storage classes
- Use cases for each
- Cost differences
- Minimum durations
- Retrieval times
```

### 2. S3 Lifecycle Policies
```
Know:
- Transition rules
- Minimum days between transitions
- Cannot move to warmer tiers automatically
- Common patterns (Standard → IA → Glacier)
```

### 3. EBS Volume Types
```
Know:
- gp3 (default), io2 (high IOPS), st1 (throughput), sc1 (cold)
- IOPS and throughput limits
- Use cases for each
- Boot volume options
```

### 4. EBS vs EFS vs Instance Store
```
Know:
- Persistence (EBS/EFS persistent, Instance Store ephemeral)
- Sharing (EFS shared, EBS single instance)
- Performance (Instance Store highest IOPS)
- Use cases for each
```

### 5. FSx Types
```
Know:
- Windows (SMB, Active Directory)
- Lustre (HPC, ML, S3 integration)
- NetApp ONTAP (multi-protocol)
- OpenZFS (ZFS workloads)
```

### 6. Storage Gateway Types
```
Know:
- File Gateway (NFS/SMB to S3)
- Volume Gateway (iSCSI, stored/cached)
- Tape Gateway (VTL, replace tapes)
```

### 7. Snow Family
```
Know:
- Snowcone (< 14 TB)
- Snowball Edge (10 TB - 10 PB)
- Snowmobile (> 10 PB)
- When to use vs network transfer
```

---

**You're now ready for the Storage section of the SAA-C03 exam!** 💾🚀

**Key Takeaway**: Focus on understanding **when to use which storage service** based on:
- Data type (object, block, file)
- Access pattern (frequent, infrequent, archive)
- Sharing requirements (single instance, multiple instances)
- Performance needs (IOPS, throughput, latency)
- Cost considerations
- Durability and availability requirements

Most questions test your ability to **choose the right storage for the right use case**, not deep technical implementation details.

**Good luck!** 💪

---

### [BackToTop](#table-of-contents)