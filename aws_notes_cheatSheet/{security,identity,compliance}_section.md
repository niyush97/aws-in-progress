# AWS Security, Identity, and Compliance - SAA-C03 Exam Guide
---
>⚠️ These notes were created using Anthropic's AI Models (Opus 4.5 and 4.6).

---

## Table of Contents
1. [AWS IAM (Identity and Access Management)](#aws-iam-identity-and-access-management)
2. [AWS Organizations](#aws-organizations)
3. [Amazon Cognito](#amazon-cognito)
4. [AWS Directory Service](#aws-directory-service)
5. [AWS IAM Identity Center (SSO)](#aws-iam-identity-center-aws-sso)
6. [AWS KMS (Key Management Service)](#aws-kms-key-management-service)
7. [AWS CloudHSM](#aws-cloudhsm)
8. [AWS Certificate Manager (ACM)](#aws-certificate-manager-acm)
9. [AWS Secrets Manager](#aws-secrets-manager)
10. [Amazon GuardDuty](#amazon-guardduty)
11. [Amazon Inspector](#amazon-inspector)
12. [Amazon Macie](#amazon-macie)
13. [AWS Security Hub](#aws-security-hub)
14. [Amazon Detective](#amazon-detective)
15. [AWS WAF (Web Application Firewall)](#aws-waf-web-application-firewall)
16. [AWS Shield](#aws-shield)
17. [AWS Firewall Manager](#aws-firewall-manager)
18. [AWS Network Firewall](#aws-network-firewall)
19. [AWS Artifact](#aws-artifact)
20. [AWS Audit Manager](#aws-audit-manager)
21. [AWS Resource Access Manager (RAM)](#aws-resource-access-manager-ram)
22. [Security Services Comparision Matrix](#security-services-comparison-matrix)
23. [Common Exam Patterns and Decision Trees](#common-exam-patterns-and-decision-trees)
24. [Critical Exam Tips for Security Services](#critical-exam-tips-for-security-services)
25. [Final Security Exam Checklist](#final-security-exam-checklist)
26. [Summary: Most Important Services for SAA-C03](#summary-most-important-services-for-saa-c03)

---

# AWS IAM (Identity and Access Management)
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐⭐ (MOST IMPORTANT)
- **Global service** - not region-specific
- **Free service** - no charge for IAM
- Controls **who** can do **what** in your AWS account
- Foundation of AWS security
- **Identity-based** and **resource-based** policies

## Key Components

### 1. Users
- **Individual identities** for people or applications
- Long-term credentials (password, access keys)
- **Best Practice**: One user per person (no sharing)
- Can belong to multiple groups
- Maximum 5,000 users per account

### 2. Groups
- **Collection of users**
- Apply policies to multiple users at once
- Users inherit group permissions
- **Cannot nest groups** (no groups within groups)
- User can be in up to 10 groups

### 3. Roles
- **Temporary credentials** for AWS services or users
- No long-term credentials (no password/access keys)
- **Assumed** by entities (EC2, Lambda, users)
- **Trust policy** defines who can assume role
- **Permission policy** defines what role can do

### 4. Policies
- **JSON documents** defining permissions
- Two types: Identity-based and Resource-based

#### Identity-Based Policies
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```

#### Resource-Based Policies
- Attached to resources (S3 buckets, SQS queues)
- Specify **who** can access the resource
- Example: S3 bucket policy

## Policy Types

### 1. AWS Managed Policies
- Created and managed by AWS
- Cannot be modified
- Examples: `AdministratorAccess`, `ReadOnlyAccess`
- **Use when**: Standard permissions needed

### 2. Customer Managed Policies
- Created and managed by you
- Reusable across users/groups/roles
- Version controlled
- **Use when**: Custom permissions needed

### 3. Inline Policies
- Embedded directly in user/group/role
- 1:1 relationship
- Deleted when entity is deleted
- **Use when**: Strict 1:1 relationship needed

## Policy Evaluation Logic

### Decision Flow
```
1. By default, all requests are DENIED (implicit deny)
2. Explicit ALLOW overrides implicit deny
3. Explicit DENY overrides any allows
4. Final decision: DENY or ALLOW
```

### Evaluation Order
```
1. Explicit DENY → Immediate deny
2. Explicit ALLOW → Check for deny
3. No explicit allow → Implicit deny
```

**Key Rule**: **Explicit DENY always wins**

## IAM Roles - Deep Dive

### Common Use Cases

#### 1. EC2 Instance Role
```
EC2 Instance → Assumes Role → Access AWS Services
- No hardcoded credentials
- Automatic credential rotation
- Best practice for EC2
```

#### 2. Cross-Account Access
```
Account A (User) → Assumes Role → Account B (Resources)
- Secure cross-account access
- No need to create users in Account B
```

#### 3. Service Role
```
Lambda Function → Assumes Role → Access DynamoDB
- Services assume roles to access other services
```

### Trust Policy Example
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

## IAM Best Practices ⭐⭐⭐⭐⭐

### 1. Root Account
- ✅ Enable MFA
- ✅ Create admin user, don't use root
- ✅ Delete root access keys
- ❌ Never use for daily tasks
- ❌ Never share root credentials

### 2. Least Privilege Principle
- Grant minimum permissions needed
- Start with minimal permissions, add as needed
- Review permissions regularly
- Use IAM Access Analyzer

### 3. Use Roles, Not Users
- EC2 instances → Use IAM roles
- Lambda functions → Use IAM roles
- Applications → Use IAM roles
- **Never hardcode credentials**

### 4. Enable MFA
- Root account (mandatory)
- Privileged users (highly recommended)
- Types: Virtual MFA, U2F, Hardware

### 5. Password Policy
- Minimum length
- Require specific character types
- Password expiration
- Prevent password reuse

### 6. Credential Rotation
- Rotate access keys regularly
- Use IAM credential report
- Automate rotation with Secrets Manager

## IAM Security Features

### 1. MFA (Multi-Factor Authentication)
**Types**:
- **Virtual MFA**: Google Authenticator, Authy
- **U2F Security Key**: YubiKey
- **Hardware MFA**: Gemalto token

**Use Cases**:
- Root account (required)
- Admin users (highly recommended)
- Sensitive operations

### 2. IAM Access Analyzer
- **Identifies resources** shared with external entities
- **Analyzes policies** for unintended access
- **Generates findings** for review
- **Use when**: Audit external access

### 3. IAM Credential Report
- **Account-level report** of all users
- Shows credential status
- Password age, access key age
- MFA status
- **Use when**: Security audit

### 4. IAM Access Advisor
- **Shows service permissions** granted to user
- **Shows last accessed** time
- **Use when**: Implement least privilege

## IAM Conditions

### Common Condition Keys
```json
{
  "Condition": {
    "IpAddress": {
      "aws:SourceIp": "203.0.113.0/24"
    },
    "DateGreaterThan": {
      "aws:CurrentTime": "2024-01-01T00:00:00Z"
    },
    "StringEquals": {
      "aws:RequestedRegion": "us-east-1"
    }
  }
}
```

### Use Cases
- **IP-based access**: Restrict to corporate network
- **Time-based access**: Business hours only
- **Region restriction**: Specific regions only
- **MFA requirement**: Require MFA for sensitive actions

## When to Use IAM

### ✅ Use IAM When
- Managing AWS account access
- Controlling permissions for AWS services
- Federating with corporate directory
- Temporary access needed (roles)
- Service-to-service authentication

### ❌ Don't Use IAM When
- Application user authentication → Use Cognito
- Web/mobile app users → Use Cognito
- Active Directory integration → Use Directory Service
- SSO across multiple accounts → Use IAM Identity Center

## Keywords to Identify IAM

- "Permissions"
- "Access control"
- "Who can access"
- "Least privilege"
- "Temporary credentials"
- "Cross-account access"
- "Service permissions"
- "Policy"
- "Role"

## Common Exam Scenarios

### Scenario 1: EC2 Access to S3
**Question**: EC2 instance needs to access S3. What's the best approach?

**Answer**: Create IAM role with S3 permissions, attach to EC2 instance

**Why**:
- No hardcoded credentials
- Automatic credential rotation
- Follows best practices

### Scenario 2: Cross-Account Access
**Question**: Users in Account A need access to resources in Account B

**Answer**: Create IAM role in Account B, allow Account A to assume it

**Why**:
- No need to create users in Account B
- Centralized user management
- Temporary credentials

### Scenario 3: Least Privilege
**Question**: Developer needs S3 access but currently has full admin

**Answer**: Use IAM Access Advisor to see what's used, create custom policy with only needed permissions

**Why**:
- Implements least privilege
- Reduces security risk
- Based on actual usage

## Limitations & Constraints

- **5,000 users** per account (can request increase)
- **10 groups** per user maximum
- **10 managed policies** per user/group/role
- **2,048 characters** for inline policy
- **6,144 characters** for managed policy
- **Policy size**: 2 KB (inline), 6 KB (managed)

## Pros & Cons

**Pros**:
- Free service
- Fine-grained access control
- Temporary credentials (roles)
- Integration with all AWS services
- Supports federation

**Cons**:
- Complex policy language
- Learning curve
- No built-in user authentication for apps
- Global service (eventual consistency)

## Cost Considerations
- **IAM is FREE**
- No charge for users, groups, roles, policies
- Pay only for AWS services accessed

---

# Amazon Cognito
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐
- **User authentication and authorization** for web/mobile apps
- **Managed service** - no infrastructure to manage
- Two main components: User Pools and Identity Pools
- Supports **millions of users**
- **Social identity providers** (Google, Facebook, Amazon)

## Key Components

### 1. Cognito User Pools
- **User directory** for your application
- Sign-up and sign-in functionality
- User profile management
- MFA, password policies
- Email/phone verification
- **Returns JWT tokens**

#### Features
```
- User registration and login
- Password reset
- Email/SMS verification
- MFA (SMS, TOTP)
- Social identity providers
- SAML/OIDC federation
- Custom authentication flows
- Lambda triggers
```

#### Use Cases
- Mobile app user authentication
- Web app user authentication
- User profile management
- Social login (Facebook, Google)

### 2. Cognito Identity Pools (Federated Identities)
- **Provides AWS credentials** to users
- Access AWS services directly from app
- Supports authenticated and unauthenticated users
- **Returns temporary AWS credentials**

#### Features
```
- Temporary AWS credentials
- Fine-grained access control (IAM)
- Support for guest users
- Integration with User Pools
- Social identity providers
- SAML providers
```

#### Use Cases
- Mobile app accessing S3 directly
- Web app accessing DynamoDB
- Guest user access
- Federated access to AWS resources

## Architecture Patterns

### Pattern 1: User Pool Only
```
Mobile/Web App → Cognito User Pool → JWT Token → API Gateway → Lambda
```
**Use when**: Need user authentication, API access control

### Pattern 2: Identity Pool Only
```
Mobile App → Cognito Identity Pool → Temporary AWS Credentials → S3/DynamoDB
```
**Use when**: Direct AWS service access from app

### Pattern 3: User Pool + Identity Pool
```
Mobile App → User Pool (Authentication) → Identity Pool (AWS Credentials) → AWS Services
```
**Use when**: Need both authentication and AWS service access

## Cognito User Pools - Deep Dive

### Authentication Flow
```
1. User signs up/signs in
2. Cognito validates credentials
3. Returns JWT tokens:
   - ID Token (user identity)
   - Access Token (API access)
   - Refresh Token (get new tokens)
```

### JWT Tokens
```
ID Token: Contains user attributes (name, email)
Access Token: Used for API authorization
Refresh Token: Get new ID/Access tokens
```

### Customization with Lambda Triggers
```
Pre-signup: Validate user data
Post-confirmation: Send welcome email
Pre-authentication: Custom validation
Post-authentication: Log user activity
Pre-token generation: Modify claims
```

### MFA Options
- **SMS-based MFA**: Text message codes
- **TOTP-based MFA**: Authenticator apps
- **Optional or Required**: Configure per user pool

## Cognito Identity Pools - Deep Dive

### Authentication Providers
```
- Cognito User Pools
- Social (Facebook, Google, Amazon, Apple)
- SAML providers
- OpenID Connect providers
- Developer authenticated identities
- Unauthenticated (guest) access
```

### IAM Role Mapping
```
Authenticated Users → IAM Role A (more permissions)
Unauthenticated Users → IAM Role B (limited permissions)
```

### Example: Mobile App Accessing S3
```
1. User authenticates with User Pool
2. App exchanges token for AWS credentials (Identity Pool)
3. App uses credentials to access S3
4. Credentials expire after 1 hour (automatic refresh)
```

## When to Use Cognito

### ✅ Use Cognito When
- Web/mobile app user authentication
- Need user directory for your app
- Social login required
- Mobile app needs AWS service access
- Millions of users expected
- Want managed authentication

### ❌ Don't Use Cognito When
- AWS account access control → Use IAM
- Corporate employee access → Use IAM Identity Center
- Active Directory integration → Use Directory Service
- Simple API key authentication → Use API Gateway API keys

## Keywords to Identify Cognito

- "Mobile app users"
- "Web app authentication"
- "User sign-up/sign-in"
- "Social login"
- "Facebook/Google login"
- "User directory"
- "JWT tokens"
- "Millions of users"
- "App user authentication"

## Common Exam Scenarios

### Scenario 1: Mobile App Authentication
**Question**: Mobile app needs user authentication with social login

**Answer**: Cognito User Pool with social identity providers

**Why**:
- Managed user directory
- Built-in social login
- Scales to millions of users
- Returns JWT tokens for API access

### Scenario 2: Mobile App Accessing S3
**Question**: Mobile app users need to upload photos to S3

**Answer**: Cognito User Pool + Identity Pool

**Why**:
- User Pool: Authenticate users
- Identity Pool: Provide temporary AWS credentials
- Direct S3 access from mobile app
- Fine-grained permissions per user

### Scenario 3: Guest Access
**Question**: App needs to allow unauthenticated users limited access

**Answer**: Cognito Identity Pool with unauthenticated access enabled

**Why**:
- Supports guest users
- Provides temporary credentials
- Different IAM role for guests (limited permissions)

## Cognito vs IAM vs Directory Service

| Feature | Cognito | IAM | Directory Service |
|---------|---------|-----|-------------------|
| **Use Case** | App users | AWS access | Corporate users |
| **Scale** | Millions | Thousands | Thousands |
| **Authentication** | Username/password, social | Access keys, roles | AD credentials |
| **Target** | End users | AWS services | Employees |
| **Cost** | Pay per MAU | Free | Pay per directory |

## Security Features

### 1. Advanced Security Features
- **Compromised credentials detection**
- **Adaptive authentication**: Risk-based MFA
- **Account takeover protection**
- **Integration with AWS WAF**

### 2. Encryption
- Data encrypted at rest
- Data encrypted in transit (TLS)
- Token signing with RSA keys

### 3. Compliance
- HIPAA eligible
- PCI DSS compliant
- SOC compliant
- GDPR compliant

## Cost Considerations

### User Pool Pricing
```
Free Tier: 50,000 MAUs (Monthly Active Users)
Beyond free tier: $0.0055 per MAU

Advanced Security Features:
$0.05 per MAU (additional)
```

### Identity Pool Pricing
```
Free for AWS credential vending
Pay for AWS services accessed
```

**MAU**: User who performs an action (login, token refresh) in a month

## Limitations & Constraints

- **User Pool limits**: 40 million users per pool
- **Token expiration**: ID/Access tokens (1 hour default), Refresh token (30 days default)
- **MFA**: SMS or TOTP only
- **Custom attributes**: 50 per user pool
- **Lambda trigger timeout**: 5 seconds

## Pros & Cons

**Pros**:
- Fully managed
- Scales automatically
- Built-in security features
- Social identity providers
- Generous free tier
- JWT token support

**Cons**:
- Limited customization
- AWS-specific (vendor lock-in)
- SMS costs for MFA
- Learning curve for Identity Pools
- Token size limits

---

# AWS KMS (Key Management Service)
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐⭐
- **Managed encryption key service**
- Create and control encryption keys
- Integrated with most AWS services
- **FIPS 140-2 Level 2** validated (Level 3 for CloudHSM)
- **Regional service** - keys are region-specific

## Key Types

### 1. Customer Managed Keys (CMK)
- **You create and manage**
- Full control over key policies
- Can enable/disable
- Can schedule deletion
- Rotation: Optional (automatic yearly)
- **Cost**: $1/month per key + usage

### 2. AWS Managed Keys
- **AWS creates and manages**
- Used by AWS services (S3, EBS, RDS)
- Automatic rotation (every 3 years)
- Cannot delete or manage
- **Cost**: Free (pay for usage only)
- Key alias: `aws/service-name` (e.g., `aws/s3`)

### 3. AWS Owned Keys
- **AWS owns and manages**
- Used across multiple accounts
- No visibility or control
- **Cost**: Free
- Example: DynamoDB default encryption

## Key Material Origin

### 1. KMS (Default)
- KMS generates key material
- Most common option
- Key material never leaves KMS

### 2. External
- Import your own key material
- You manage key material lifecycle
- Can set expiration
- **Use when**: Compliance requires external keys

### 3. Custom Key Store (CloudHSM)
- Key material in CloudHSM cluster
- FIPS 140-2 Level 3
- **Use when**: Highest security required

## KMS Operations

### Encryption Operations
```
Encrypt: Encrypt data (up to 4 KB)
Decrypt: Decrypt data
GenerateDataKey: Generate data key for envelope encryption
GenerateDataKeyWithoutPlaintext: Generate encrypted data key only
```

### Key Management Operations
```
CreateKey: Create new CMK
DescribeKey: Get key metadata
EnableKey: Enable disabled key
DisableKey: Disable key
ScheduleKeyDeletion: Schedule key deletion (7-30 days)
```

## Envelope Encryption ⭐⭐⭐⭐⭐

### Concept
- **Don't encrypt data directly with CMK**
- Generate Data Encryption Key (DEK) from CMK
- Encrypt data with DEK
- Store encrypted DEK with encrypted data

### Why Envelope Encryption?
- **Performance**: Encrypt large data locally
- **Network efficiency**: Don't send large data to KMS
- **KMS limit**: Can only encrypt 4 KB directly

### Process
```
1. Call GenerateDataKey API
   → Returns: Plaintext DEK + Encrypted DEK

2. Encrypt data with Plaintext DEK (locally)

3. Store: Encrypted Data + Encrypted DEK

4. Delete Plaintext DEK from memory

Decryption:
1. Call Decrypt API with Encrypted DEK
   → Returns: Plaintext DEK

2. Decrypt data with Plaintext DEK

3. Delete Plaintext DEK from memory
```

## Key Policies ⭐⭐⭐⭐

### Default Key Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Enable IAM User Permissions",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789012:root"
      },
      "Action": "kms:*",
      "Resource": "*"
    }
  ]
}
```

### Key Policy vs IAM Policy
- **Key Policy**: Required (every key must have one)
- **IAM Policy**: Optional (additional permissions)
- **Both needed**: Key policy allows + IAM policy allows

### Grant Access to Another Account
```json
{
  "Sid": "Allow external account",
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::999999999999:root"
  },
  "Action": [
    "kms:Decrypt",
    "kms:DescribeKey"
  ],
  "Resource": "*"
}
```

## KMS Integration with AWS Services

### Automatic Integration
```
S3: Server-side encryption (SSE-KMS)
EBS: Encrypted volumes
RDS: Encrypted databases
Lambda: Encrypted environment variables
Systems Manager: Parameter Store (SecureString)
Secrets Manager: Encrypted secrets
CloudTrail: Encrypted logs
```

### Encryption at Rest
```
S3: SSE-KMS (S3 encrypts with KMS key)
EBS: Encrypted volumes (EC2 encrypts with KMS key)
RDS: Encrypted database (RDS encrypts with KMS key)
```

## Key Rotation ⭐⭐⭐

### Automatic Rotation
- **Customer Managed Keys**: Optional, every 365 days
- **AWS Managed Keys**: Automatic, every 1095 days (3 years)
- **Old key material retained**: For decrypting old data
- **Key ID unchanged**: Same key ARN

### Manual Rotation
- Create new key
- Update applications to use new key
- Keep old key for decrypting old data
- **Use when**: Need to rotate more frequently

## When to Use KMS

### ✅ Use KMS When
- Encrypt data at rest
- Centralized key management
- Audit key usage (CloudTrail)
- Compliance requirements (FIPS 140-2)
- Integrate with AWS services
- Envelope encryption for large data

### ❌ Don't Use KMS When
- Need FIPS 140-2 Level 3 → Use CloudHSM
- Need to manage keys in hardware → Use CloudHSM
- Client-side encryption with full control → Use CloudHSM
- SSL/TLS certificates → Use ACM

## Keywords to Identify KMS

- "Encryption keys"
- "Encrypt data at rest"
- "Key management"
- "Centralized encryption"
- "Audit key usage"
- "Envelope encryption"
- "Customer managed keys"
- "Compliance" (FIPS 140-2 Level 2)

## Common Exam Scenarios

### Scenario 1: S3 Encryption with Audit
**Question**: Encrypt S3 data and audit who accesses encryption keys

**Answer**: Use S3 with SSE-KMS, enable CloudTrail

**Why**:
- KMS integrates with S3
- CloudTrail logs all KMS API calls
- Can audit key usage
- Centralized key management

### Scenario 2: Cross-Account S3 Access
**Question**: Account A's S3 bucket encrypted with KMS, Account B needs access

**Answer**: Update KMS key policy to allow Account B, update S3 bucket policy

**Why**:
- Key policy must allow Account B
- S3 bucket policy must allow Account B
- Both policies required

### Scenario 3: Large File Encryption
**Question**: Encrypt 10 GB file efficiently

**Answer**: Use envelope encryption (GenerateDataKey)

**Why**:
- KMS can only encrypt 4 KB directly
- Envelope encryption for large data
- Encrypt locally (performance)
- Store encrypted DEK with data

## KMS vs CloudHSM

| Feature | KMS | CloudHSM |
|---------|-----|----------|
| **Management** | Fully managed | You manage HSM |
| **FIPS Level** | Level 2 | Level 3 |
| **Multi-tenancy** | Yes | Single tenant |
| **Key Control** | AWS has access | You have exclusive access |
| **Integration** | Native AWS integration | Manual integration |
| **Cost** | $1/month + usage | $1.45/hour per HSM |
| **Use Case** | Most scenarios | Highest security, compliance |

## Security Features

### 1. Key Policies
- Control who can use keys
- Control who can manage keys
- Grant cross-account access

### 2. CloudTrail Integration
- Log all KMS API calls
- Audit key usage
- Compliance reporting

### 3. VPC Endpoint
- Private connectivity to KMS
- No internet gateway needed
- Enhanced security

### 4. Key Deletion Protection
- Minimum 7-day waiting period
- Maximum 30-day waiting period
- Prevents accidental deletion

## Cost Considerations

### Pricing
```
Customer Managed Keys: $1/month per key
AWS Managed Keys: Free

API Requests:
- First 20,000 requests/month: Free
- Beyond: $0.03 per 10,000 requests

Automatic Key Rotation: Free
```

### Cost Optimization
- Use AWS Managed Keys when possible
- Minimize API calls (cache data keys)
- Delete unused keys
- Use grants for temporary access

## Limitations & Constraints

- **4 KB limit**: Direct encryption
- **Regional**: Keys are region-specific
- **Request rate**: 5,500 (shared), 10,000 (dedicated) requests/sec
- **Key deletion**: 7-30 day waiting period
- **Imported key material**: Can expire

## Pros & Cons

**Pros**:
- Fully managed
- Integrated with AWS services
- CloudTrail audit logging
- Automatic key rotation
- FIPS 140-2 Level 2
- Cost-effective

**Cons**:
- Regional (not global)
- 4 KB encryption limit
- AWS has access to keys
- Not FIPS Level 3
- Eventual consistency

---

# AWS Secrets Manager
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐
- **Managed service** for storing secrets
- **Automatic rotation** of secrets
- Encrypted with KMS
- Integration with RDS, Redshift, DocumentDB
- **Versioning** of secrets

## What are Secrets?
```
- Database credentials
- API keys
- OAuth tokens
- SSH keys
- Any sensitive configuration
```

## Key Features

### 1. Automatic Rotation
- **Built-in rotation** for RDS, Redshift, DocumentDB
- **Custom rotation** with Lambda
- Rotation schedules (days)
- **Zero downtime** rotation

### 2. Encryption
- Encrypted at rest with KMS
- Encrypted in transit with TLS
- Choose your own KMS key

### 3. Versioning
- Multiple versions of secrets
- Staging labels (AWSCURRENT, AWSPENDING, AWSPREVIOUS)
- Rollback capability

### 4. Fine-Grained Access Control
- IAM policies
- Resource-based policies
- VPC endpoint support

## Automatic Rotation Process

### RDS Rotation (Built-in)
```
1. Secrets Manager creates new password
2. Lambda function updates RDS password
3. Lambda tests new password
4. Secrets Manager marks new version as AWSCURRENT
5. Old version marked as AWSPREVIOUS
```

### Rotation Strategies
```
Single User: Rotate password for one user
Alternating Users: Switch between two users
```

## Secrets Manager vs Parameter Store

| Feature | Secrets Manager | Parameter Store |
|---------|----------------|-----------------|
| **Purpose** | Secrets (credentials) | Configuration + secrets |
| **Rotation** | Automatic | Manual |
| **Cost** | $0.40/secret/month | Free (Standard), $0.05/param (Advanced) |
| **Encryption** | Always encrypted | Optional |
| **Size Limit** | 64 KB | 4 KB (Standard), 8 KB (Advanced) |
| **Versioning** | Automatic | Manual |
| **RDS Integration** | Native | Manual |
| **Use Case** | Database credentials | App configuration |

## When to Use Secrets Manager

### ✅ Use Secrets Manager When
- Store database credentials
- Need automatic rotation
- RDS/Redshift/DocumentDB secrets
- Compliance requires rotation
- Need audit trail
- Secrets change frequently

### ❌ Don't Use Secrets Manager When
- Simple configuration values → Parameter Store
- Cost is primary concern → Parameter Store
- Don't need rotation → Parameter Store
- Non-sensitive data → Parameter Store

## Keywords to Identify Secrets Manager

- "Database credentials"
- "Automatic rotation"
- "Rotate secrets"
- "RDS password"
- "API keys"
- "Secret management"
- "Credential rotation"

## Common Exam Scenarios

### Scenario 1: RDS Password Rotation
**Question**: Automatically rotate RDS database password every 30 days

**Answer**: Store RDS credentials in Secrets Manager, enable automatic rotation

**Why**:
- Built-in RDS rotation
- Zero downtime
- Automatic password updates
- Audit trail with CloudTrail

### Scenario 2: Lambda Accessing Database
**Question**: Lambda function needs database credentials

**Answer**: Store credentials in Secrets Manager, Lambda retrieves at runtime

**Why**:
- No hardcoded credentials
- Automatic rotation support
- Encrypted storage
- IAM-based access control

### Scenario 3: Cost Optimization
**Question**: Store application configuration and database passwords cost-effectively

**Answer**: Use Parameter Store for configuration, Secrets Manager for database passwords

**Why**:
- Parameter Store is free for standard parameters
- Secrets Manager for credentials needing rotation
- Optimize cost based on use case

## Integration with AWS Services

### Native Integration
```
RDS: Automatic rotation
Redshift: Automatic rotation
DocumentDB: Automatic rotation
Lambda: Retrieve secrets
ECS: Inject secrets as environment variables
CloudFormation: Dynamic references
```

### Retrieval Methods
```
AWS CLI: aws secretsmanager get-secret-value
SDK: boto3.client('secretsmanager').get_secret_value()
Lambda: Environment variable or runtime retrieval
```

## Security Features

### 1. Encryption
- KMS encryption at rest
- TLS encryption in transit
- Customer managed KMS keys

### 2. Access Control
- IAM policies
- Resource-based policies
- VPC endpoints (private access)

### 3. Audit
- CloudTrail logging
- Track secret access
- Rotation history

### 4. Compliance
- HIPAA eligible
- PCI DSS compliant
- SOC compliant

## Cost Considerations

### Pricing
```
Secret Storage: $0.40 per secret per month
API Calls: $0.05 per 10,000 API calls

Example:
10 secrets × $0.40 = $4/month
100,000 API calls × $0.05/10,000 = $0.50/month
Total: $4.50/month
```

### Cost Optimization
- Use Parameter Store for non-rotating secrets
- Cache secrets in application (reduce API calls)
- Delete unused secrets
- Use Parameter Store for configuration

## Limitations & Constraints

- **Secret size**: 64 KB maximum
- **Rotation**: Minimum 4 hours between rotations
- **Versions**: Up to 100 versions per secret
- **API rate**: 5,000 requests/second (can increase)

## Pros & Cons

**Pros**:
- Automatic rotation
- Native RDS integration
- Encrypted by default
- Versioning
- Audit trail
- Zero downtime rotation

**Cons**:
- Cost ($0.40/secret/month)
- More expensive than Parameter Store
- Overkill for simple configuration
- Regional service

---

# Amazon GuardDuty 
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐
- **Intelligent threat detection** service
- **Machine learning** based
- Continuous monitoring for malicious activity
- **No agents or software** to deploy
- Analyzes multiple data sources automatically

## Data Sources Analyzed

### 1. VPC Flow Logs
- Unusual network traffic patterns
- Port scanning
- Compromised instances
- **No need to enable** - GuardDuty accesses automatically

### 2. CloudTrail Event Logs
- Unusual API calls
- Unauthorized deployments
- Compromised credentials
- **Management and data events**

### 3. DNS Logs
- Compromised instances querying malicious domains
- DNS exfiltration attempts
- Command and control activity

### 4. Kubernetes Audit Logs (EKS)
- Suspicious EKS cluster activity
- Unauthorized access attempts
- Privilege escalation

### 5. S3 Data Events (Optional)
- Suspicious S3 access patterns
- Data exfiltration attempts
- Unusual API calls to S3

## How GuardDuty Works

### Process Flow
```
1. Enable GuardDuty (one click)
   ↓
2. GuardDuty analyzes data sources
   ↓
3. Machine learning detects threats
   ↓
4. Generates findings (severity: Low, Medium, High)
   ↓
5. Send findings to EventBridge
   ↓
6. Trigger automated responses (Lambda, SNS)
```

### Finding Types
```
Reconnaissance: Port scanning, unusual API calls
Instance Compromise: Malware, backdoor, cryptocurrency mining
Account Compromise: Credential theft, unusual behavior
Bucket Compromise: Suspicious S3 access
```

## Severity Levels

### Low (0.1 - 3.9)
- Informational
- May not require immediate action
- Example: Unusual API call pattern

### Medium (4.0 - 6.9)
- Suspicious activity
- Should investigate
- Example: Unusual network traffic

### High (7.0 - 8.9)
- Likely malicious
- Immediate action required
- Example: Compromised instance communicating with known malicious IP

## Integration and Response

### EventBridge Integration
```
GuardDuty Finding → EventBridge → Target
                                    ↓
                          Lambda (automated response)
                          SNS (notification)
                          Step Functions (workflow)
                          Security Hub (centralized)
```

### Automated Response Example
```
Finding: Compromised EC2 instance
   ↓
EventBridge Rule
   ↓
Lambda Function
   ↓
Actions:
- Isolate instance (change security group)
- Create snapshot (forensics)
- Notify security team (SNS)
- Create ticket (ServiceNow)
```

## Multi-Account Strategy

### With AWS Organizations
```
Master Account (GuardDuty Administrator)
   ↓
Automatically enable for all member accounts
   ↓
Centralized findings
   ↓
Centralized management
```

### Benefits
- Single pane of glass
- Consistent security posture
- Centralized findings
- Simplified management

## When to Use GuardDuty

### ✅ Use GuardDuty When
- Need threat detection
- Want continuous monitoring
- Compliance requires threat detection
- Want automated security monitoring
- Need to detect compromised instances
- Want ML-based threat detection

### ❌ Don't Use GuardDuty When
- Need vulnerability scanning → Use Inspector
- Need compliance scanning → Use Security Hub
- Need DDoS protection → Use Shield
- Need WAF → Use AWS WAF

## Keywords to Identify GuardDuty

- "Threat detection"
- "Malicious activity"
- "Compromised instance"
- "Unusual behavior"
- "Machine learning detection"
- "Continuous monitoring"
- "Suspicious activity"
- "Intrusion detection"

## Common Exam Scenarios

### Scenario 1: Detect Compromised Instances
**Question**: Detect if EC2 instances are compromised or communicating with malicious IPs

**Answer**: Enable GuardDuty

**Why**:
- Analyzes VPC Flow Logs automatically
- ML-based threat detection
- No agents required
- Continuous monitoring

### Scenario 2: Automated Response
**Question**: Automatically isolate compromised instances

**Answer**: GuardDuty → EventBridge → Lambda (change security group)

**Why**:
- GuardDuty detects compromise
- EventBridge triggers automation
- Lambda isolates instance
- Fast response time

### Scenario 3: Multi-Account Monitoring
**Question**: Monitor security across 50 AWS accounts

**Answer**: Enable GuardDuty with AWS Organizations

**Why**:
- Centralized management
- Automatic enrollment of new accounts
- Consolidated findings
- Single administrator account

## GuardDuty vs Other Security Services

| Service | Purpose | Detection Method | Use Case |
|---------|---------|------------------|----------|
| **GuardDuty** | Threat detection | ML-based, behavioral | Compromised instances, malicious activity |
| **Inspector** | Vulnerability scanning | Agent-based, CVE database | Software vulnerabilities, network exposure |
| **Macie** | Data protection | ML-based, pattern matching | Sensitive data discovery, PII |
| **Security Hub** | Security posture | Aggregation, compliance checks | Centralized security view |
| **Detective** | Investigation | Graph analysis | Root cause analysis, forensics |

## Trusted IP Lists and Threat Lists

### Trusted IP Lists
- **Whitelist** of IP addresses
- GuardDuty won't generate findings for these IPs
- **Use case**: Known good IPs (corporate network, partners)

### Threat Lists
- **Blacklist** of known malicious IPs
- GuardDuty generates findings for these IPs
- **Use case**: Custom threat intelligence

## Suppression Rules

### Purpose
- Automatically archive findings matching criteria
- Reduce noise
- Focus on relevant findings

### Example
```
Suppress findings:
- From specific IP addresses (known scanners)
- For specific finding types (false positives)
- During maintenance windows
```

## Cost Considerations

### Pricing
```
VPC Flow Logs Analysis: $1.00 per GB
CloudTrail Events: $4.50 per million events
DNS Logs: $0.40 per million events
S3 Data Events: $0.80 per million events
EKS Audit Logs: $0.40 per million events

30-day free trial available
```

### Cost Optimization
- Start with VPC Flow Logs and CloudTrail (most valuable)
- Add S3 protection only for sensitive buckets
- Use suppression rules to reduce noise
- Monitor costs in Cost Explorer

## Limitations & Constraints

- **Regional service**: Enable per region
- **30-day free trial**: Then charges apply
- **Finding retention**: 90 days
- **No real-time blocking**: Detection only (use with automated response)
- **False positives**: May occur (use suppression rules)

## Pros & Cons

**Pros**:
- No agents or infrastructure
- Continuous monitoring
- ML-based detection
- Easy to enable (one click)
- Integrates with EventBridge
- Multi-account support
- 30-day free trial

**Cons**:
- Detection only (not prevention)
- Can generate false positives
- Costs can add up at scale
- Regional (must enable per region)
- 90-day finding retention

---

# Amazon Inspector
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐
- **Automated vulnerability scanning** service
- Scans EC2 instances and container images
- **Agent-based** (EC2) or **agentless** (ECR)
- Continuous scanning
- Prioritized findings based on risk

## What Inspector Scans

### 1. EC2 Instances
- **Software vulnerabilities** (CVEs)
- **Network reachability** issues
- **Operating system** vulnerabilities
- **Application vulnerabilities**

### 2. Container Images (ECR)
- **Image vulnerabilities** (CVEs)
- **Package vulnerabilities**
- Scans on push to ECR
- Continuous monitoring

### 3. Lambda Functions
- **Code vulnerabilities**
- **Package dependencies**
- Scans on deployment

## Inspector Types (Classic vs New)

### Amazon Inspector Classic (Legacy)
- **Agent-based** only
- Manual assessment runs
- Rules packages
- **Being replaced** by new Inspector

### Amazon Inspector (New - Current)
- **Automated continuous scanning**
- EC2, ECR, Lambda
- No assessment runs needed
- Better integration
- **Use this version**

## How Inspector Works

### EC2 Scanning Process
```
1. Install SSM Agent (usually pre-installed)
2. Enable Inspector
3. Inspector automatically scans instances
4. Generates findings (vulnerabilities)
5. Prioritized by risk score
6. Remediation recommendations provided
```

### ECR Scanning Process
```
1. Enable Inspector for ECR
2. Push image to ECR
3. Inspector automatically scans image
4. Generates findings
5. View in Inspector console or ECR
```

## Finding Types

### 1. Package Vulnerabilities
- CVE (Common Vulnerabilities and Exposures)
- Severity: Critical, High, Medium, Low, Informational
- CVSS score (0-10)

### 2. Network Reachability
- Unintended network exposure
- Open ports
- Security group misconfigurations

### 3. Code Vulnerabilities (Lambda)
- Insecure code patterns
- Vulnerable dependencies

## Risk Scoring

### Inspector Risk Score
```
Calculated based on:
- CVSS score (vulnerability severity)
- Network exposure
- Exploitability
- Age of vulnerability

Range: 0-10 (10 = highest risk)
```

### Prioritization
```
Critical: Immediate action required
High: Address soon
Medium: Address when possible
Low: Monitor
Informational: Awareness only
```

## Integration and Remediation

### EventBridge Integration
```
Inspector Finding → EventBridge → Target
                                    ↓
                          Lambda (automated patching)
                          SNS (notification)
                          Security Hub (centralized)
                          Jira (ticket creation)
```

### Automated Remediation Example
```
Finding: Critical CVE in EC2 instance
   ↓
EventBridge Rule
   ↓
Lambda Function
   ↓
Actions:
- Run Systems Manager patch automation
- Notify security team
- Create remediation ticket
```

## When to Use Inspector

### ✅ Use Inspector When
- Need vulnerability scanning
- Scan EC2 instances for CVEs
- Scan container images
- Compliance requires vulnerability management
- Want continuous scanning
- Need prioritized findings

### ❌ Don't Use Inspector When
- Need threat detection → Use GuardDuty
- Need compliance checks → Use Security Hub
- Need configuration auditing → Use Config
- Need DDoS protection → Use Shield

## Keywords to Identify Inspector

- "Vulnerability scanning"
- "CVE detection"
- "Software vulnerabilities"
- "Container image scanning"
- "Security assessment"
- "Patch management"
- "Network exposure"

## Common Exam Scenarios

### Scenario 1: EC2 Vulnerability Scanning
**Question**: Continuously scan EC2 instances for software vulnerabilities

**Answer**: Enable Amazon Inspector

**Why**:
- Automated continuous scanning
- Detects CVEs
- Prioritized findings
- Remediation recommendations

### Scenario 2: Container Security
**Question**: Scan container images for vulnerabilities before deployment

**Answer**: Enable Inspector for ECR, scan on push

**Why**:
- Automatic scanning on push
- Detects vulnerabilities before deployment
- Integrated with ECR
- Continuous monitoring

### Scenario 3: Compliance Requirement
**Question**: Compliance requires regular vulnerability assessments

**Answer**: Enable Inspector for continuous scanning, export findings for audit

**Why**:
- Continuous automated scanning
- Audit trail of findings
- Compliance reporting
- Prioritized remediation

## Inspector vs GuardDuty vs Macie

| Service | Purpose | What It Scans | Detection Method |
|---------|---------|---------------|------------------|
| **Inspector** | Vulnerability scanning | EC2, ECR, Lambda | CVE database, agent-based |
| **GuardDuty** | Threat detection | VPC, CloudTrail, DNS | ML-based, behavioral |
| **Macie** | Data protection | S3 | ML-based, pattern matching |

**Key Difference**:
- **Inspector**: "Is my software vulnerable?" (Vulnerabilities)
- **GuardDuty**: "Am I under attack?" (Threats)
- **Macie**: "Where is my sensitive data?" (Data discovery)

## Multi-Account Strategy

### With AWS Organizations
```
Delegated Administrator Account
   ↓
Automatically enable for member accounts
   ↓
Centralized findings
   ↓
Aggregated reporting
```

## Cost Considerations

### Pricing
```
EC2 Scanning: $0.09 per instance per month
ECR Scanning: $0.09 per image scan (first scan free)
Lambda Scanning: $0.30 per function per month

15-day free trial available
```

### Cost Optimization
- Scan only production instances
- Use tags to exclude dev/test
- Delete unused container images
- Monitor costs in Cost Explorer

## Limitations & Constraints

- **Regional service**: Enable per region
- **SSM Agent required**: For EC2 scanning
- **Supported OS**: Amazon Linux, Ubuntu, Windows, RHEL, etc.
- **Finding retention**: 13 months
- **Scan frequency**: Continuous (automatic)

## Pros & Cons

**Pros**:
- Automated continuous scanning
- No manual assessment runs
- Prioritized findings
- Remediation recommendations
- Multi-account support
- ECR integration
- 15-day free trial

**Cons**:
- Requires SSM Agent (EC2)
- Costs per instance/image
- Regional service
- Limited to supported OS
- Detection only (not remediation)

---

# Amazon Macie

[BackToTop](#table-of-contents)

## Core Concepts ⭐⭐⭐
- **Data security and privacy** service
- **Discovers sensitive data** in S3
- **Machine learning** based
- Classifies and protects data
- PII, PHI, financial data detection

## What Macie Does

### 1. Data Discovery
- Scans S3 buckets
- Identifies sensitive data
- Classifies data types
- Creates inventory

### 2. Data Classification
```
Personally Identifiable Information (PII):
- Names, addresses, SSN
- Email addresses, phone numbers
- Credit card numbers, passport numbers

Protected Health Information (PHI):
- Medical records
- Health insurance information

Financial Data:
- Bank account numbers
- Credit card numbers

Credentials:
- API keys, passwords
- Private keys
```

### 3. Security Monitoring
- Detects unencrypted buckets
- Detects publicly accessible buckets
- Monitors access patterns
- Alerts on policy changes

## How Macie Works

### Process Flow
```
1. Enable Macie
   ↓
2. Select S3 buckets to scan
   ↓
3. Create discovery job (one-time or scheduled)
   ↓
4. Macie scans objects in buckets
   ↓
5. ML classifies data
   ↓
6. Generates findings
   ↓
7. View in Macie console or send to EventBridge
```

## Discovery Jobs

### Job Types
```
One-Time Job: Scan once
Scheduled Job: Daily, weekly, monthly
```

### Job Scope
```
All buckets: Scan entire account
Specific buckets: Select buckets to scan
Bucket criteria: Use tags, prefixes
```

### Sampling Depth
```
Automated: Macie determines sample size
Custom: Specify percentage (1-100%)
```

## Finding Types

### 1. Sensitive Data Findings
- PII detected
- Financial data detected
- Credentials detected
- Custom data identifiers matched

### 2. Policy Findings
- Bucket encryption disabled
- Bucket publicly accessible
- Bucket shared externally
- Bucket policy allows public access

## Managed Data Identifiers

### Built-in Identifiers
```
- Credit card numbers (Visa, Mastercard, Amex)
- Bank account numbers
- Social Security Numbers (SSN)
- Driver's license numbers
- Passport numbers
- Email addresses
- IP addresses
- AWS secret keys
```

### Custom Data Identifiers
- Define your own patterns (regex)
- Keywords and proximity rules
- Example: Internal employee IDs, custom formats

## When to Use Macie

### ✅ Use Macie When
- Need to discover sensitive data in S3
- Compliance requires data classification
- Want to find PII/PHI
- Need to identify unencrypted buckets
- Want to detect publicly accessible data
- GDPR, HIPAA, PCI DSS compliance

### ❌ Don't Use Macie When
- Need threat detection → Use GuardDuty
- Need vulnerability scanning → Use Inspector
- Data not in S3 → Macie is S3-only
- Need real-time blocking → Use S3 Block Public Access

## Keywords to Identify Macie

- "Sensitive data"
- "PII" (Personally Identifiable Information)
- "PHI" (Protected Health Information)
- "Data discovery"
- "Data classification"
- "Find sensitive data in S3"
- "GDPR compliance"
- "Data privacy"

## Common Exam Scenarios

### Scenario 1: Find PII in S3
**Question**: Company needs to identify which S3 buckets contain PII for GDPR compliance

**Answer**: Enable Amazon Macie, run discovery job on all buckets

**Why**:
- Macie automatically discovers PII
- ML-based classification
- Generates inventory of sensitive data
- Compliance reporting

### Scenario 2: Detect Unencrypted Sensitive Data
**Question**: Ensure all buckets with sensitive data are encrypted

**Answer**: Use Macie to discover sensitive data and detect unencrypted buckets

**Why**:
- Macie identifies sensitive data
- Detects encryption status
- Generates policy findings
- Automated monitoring

### Scenario 3: Continuous Monitoring
**Question**: Continuously monitor S3 for new sensitive data

**Answer**: Create scheduled Macie discovery job (daily/weekly)

**Why**:
- Scheduled jobs for continuous monitoring
- Detects new sensitive data
- Alerts on policy changes
- Compliance maintenance

## Macie vs GuardDuty vs Inspector

| Service | Purpose | Target | Detection Method |
|---------|---------|--------|------------------|
| **Macie** | Data discovery | S3 (sensitive data) | ML-based, pattern matching |
| **GuardDuty** | Threat detection | Account-wide | ML-based, behavioral |
| **Inspector** | Vulnerability scanning | EC2, ECR, Lambda | CVE database, agent-based |

**Key Difference**:
- **Macie**: "Where is my sensitive data?" (Data classification)
- **GuardDuty**: "Am I under attack?" (Threat detection)
- **Inspector**: "Is my software vulnerable?" (Vulnerabilities)

## Integration and Response

### EventBridge Integration
```
Macie Finding → EventBridge → Target
                                ↓
                      Lambda (automated response)
                      SNS (notification)
                      Security Hub (centralized)
```

### Automated Response Example
```
Finding: Unencrypted bucket with PII
   ↓
EventBridge Rule
   ↓
Lambda Function
   ↓
Actions:
- Enable bucket encryption
- Notify security team
- Create remediation ticket
- Update compliance dashboard
```

## Multi-Account Strategy

### With AWS Organizations
```
Delegated Administrator Account
   ↓
Manage Macie for all member accounts
   ↓
Centralized findings
   ↓
Consolidated reporting
```

## Cost Considerations

### Pricing
```
Bucket Inventory: $0.10 per bucket per month
Object Monitoring: $0.10 per GB per month
Sensitive Data Discovery: $1.00 per GB scanned

30-day free trial available
```

### Cost Optimization
- Scan only necessary buckets
- Use sampling (not 100%)
- Schedule jobs during off-peak
- Exclude non-sensitive buckets
- Use bucket tags to filter

## Limitations & Constraints

- **S3 only**: Cannot scan other storage services
- **Regional service**: Enable per region
- **Object size**: Up to 20 MB per object (sampling for larger)
- **Supported formats**: Text, CSV, JSON, Parquet, etc.
- **Finding retention**: 90 days

## Pros & Cons

**Pros**:
- Automated data discovery
- ML-based classification
- Built-in data identifiers
- Custom identifiers support
- Multi-account support
- EventBridge integration
- 30-day free trial

**Cons**:
- S3 only (no EBS, RDS, etc.)
- Can be expensive at scale
- Sampling may miss data
- Regional service
- 90-day finding retention

---

# AWS Security Hub
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐
- **Centralized security view** across AWS accounts
- **Aggregates findings** from multiple services
- **Compliance checks** (CIS, PCI DSS, AWS Best Practices)
- **Security score** for your environment
- **Automated remediation** with EventBridge

## What Security Hub Does

### 1. Aggregates Findings
```
Sources:
- GuardDuty (threat detection)
- Inspector (vulnerabilities)
- Macie (sensitive data)
- IAM Access Analyzer
- Firewall Manager
- Systems Manager
- Third-party tools (Palo Alto, Splunk, etc.)
```

### 2. Compliance Checks
```
Standards:
- CIS AWS Foundations Benchmark
- PCI DSS
- AWS Foundational Security Best Practices
- NIST
- Custom standards
```

### 3. Security Score
- Overall security posture score
- Based on passed/failed checks
- Trend over time
- Per-standard scores

## How Security Hub Works

### Process Flow
```
1. Enable Security Hub
   ↓
2. Enable security standards
   ↓
3. Integrate security services (GuardDuty, Inspector, etc.)
   ↓
4. Security Hub aggregates findings
   ↓
5. Runs compliance checks
   ↓
6. Generates security score
   ↓
7. View in console or send to EventBridge
```

## Security Standards

### 1. AWS Foundational Security Best Practices
- AWS-recommended security controls
- Covers multiple services
- Continuously updated
- **Most comprehensive**

### 2. CIS AWS Foundations Benchmark
- Industry-standard security framework
- Level 1 and Level 2 controls
- Widely recognized

### 3. PCI DSS
- Payment Card Industry Data Security Standard
- For organizations handling credit cards
- Compliance requirement

### 4. NIST
- National Institute of Standards and Technology
- Government and enterprise standard

## Finding Aggregation

### Consolidated View
```
All Findings → Security Hub → Single Dashboard
                                    ↓
                          Filter by:
                          - Severity
                          - Service
                          - Compliance status
                          - Resource type
```

### Finding Format (ASFF)
- AWS Security Finding Format
- Standardized JSON format
- Consistent across all sources
- Enables automation

## Insights

### Pre-built Insights
```
- Resources with the most findings
- Top resources by failed compliance checks
- S3 buckets with public access
- EC2 instances with vulnerabilities
- IAM users with suspicious activity
```

### Custom Insights
- Create your own queries
- Filter findings by criteria
- Track specific security metrics

## When to Use Security Hub

### ✅ Use Security Hub When
- Need centralized security view
- Multiple security services enabled
- Compliance requirements (CIS, PCI DSS)
- Want security posture score
- Multi-account security management
- Need automated remediation

### ❌ Don't Use Security Hub When
- Only using one security service
- Don't need compliance checks
- Cost is primary concern
- Simple security requirements

## Keywords to Identify Security Hub

- "Centralized security"
- "Aggregate findings"
- "Compliance checks"
- "Security posture"
- "CIS benchmark"
- "PCI DSS compliance"
- "Unified security view"
- "Security score"

## Common Exam Scenarios

### Scenario 1: Centralized Security Management
**Question**: Manage security across 100 AWS accounts with GuardDuty, Inspector, and Macie

**Answer**: Enable Security Hub with AWS Organizations

**Why**:
- Aggregates findings from all services
- Centralized view across accounts
- Single dashboard
- Automated compliance checks

### Scenario 2: Compliance Reporting
**Question**: Generate compliance reports for CIS AWS Foundations Benchmark

**Answer**: Enable Security Hub, enable CIS standard, export findings

**Why**:
- Built-in CIS compliance checks
- Automated continuous assessment
- Exportable reports
- Security score tracking

### Scenario 3: Automated Remediation
**Question**: Automatically remediate security findings

**Answer**: Security Hub → EventBridge → Lambda (remediation)

**Why**:
- EventBridge integration
- Automated response
- Consistent remediation
- Reduced manual effort

## Multi-Account Strategy

### With AWS Organizations
```
Delegated Administrator Account (Security Hub)
   ↓
Automatically enable for member accounts
   ↓
Aggregate findings from all accounts
   ↓
Centralized compliance view
   ↓
Cross-region aggregation (optional)
```

### Cross-Region Aggregation
- Aggregate findings from multiple regions
- Single region view
- Simplifies management

## Integration and Automation

### EventBridge Integration
```
Security Hub Finding → EventBridge → Target
                                       ↓
                             Lambda (remediation)
                             SNS (notification)
                             Step Functions (workflow)
                             ServiceNow (ticketing)
```

### Automated Remediation Examples
```
Finding: S3 bucket publicly accessible
→ Lambda: Enable S3 Block Public Access

Finding: Security group allows 0.0.0.0/0
→ Lambda: Remove overly permissive rule

Finding: IAM user without MFA
→ Lambda: Send notification, disable access keys
```

## Cost Considerations

### Pricing
```
Security Checks: $0.0010 per check per month
Finding Ingestion: $0.00003 per finding

Example:
- 100 security checks × $0.0010 = $0.10/month
- 10,000 findings × $0.00003 = $0.30/month
Total: $0.40/month

30-day free trial available
```

### Cost Optimization
- Enable only needed standards
- Use suppression rules
- Archive resolved findings
- Disable unused integrations

## Limitations & Constraints

- **Regional service**: Enable per region
- **Finding retention**: 90 days
- **Standards**: Limited to supported standards
- **Remediation**: Manual or custom automation
- **Real-time**: Near real-time (not instant)

## Pros & Cons

**Pros**:
- Centralized security view
- Multi-service aggregation
- Compliance automation
- Security score
- Multi-account support
- EventBridge integration
- Third-party integrations

**Cons**:
- Costs can add up
- Requires other services (GuardDuty, etc.)
- Regional (must enable per region)
- 90-day finding retention
- Learning curve

---

# Amazon Detective
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐
- **Security investigation** and **root cause analysis**
- **Graph-based analysis** of security data
- Analyzes GuardDuty, VPC Flow Logs, CloudTrail
- **Visualizes relationships** between resources
- Helps answer "what happened and why?"

## What Detective Does

### 1. Data Collection
```
Automatically collects and processes:
- VPC Flow Logs
- CloudTrail logs
- GuardDuty findings
- EKS audit logs
```

### 2. Graph Analysis
- Creates behavior graph
- Shows relationships between:
  - Users
  - Resources
  - IP addresses
  - AWS services

### 3. Investigation
- Visualize security incidents
- Identify root cause
- Understand scope of compromise
- Timeline analysis

## How Detective Works

### Process Flow
```
1. Enable Detective (requires GuardDuty)
   ↓
2. Detective collects data automatically
   ↓
3. Builds behavior graph (ML-based)
   ↓
4. GuardDuty finding occurs
   ↓
5. Investigate in Detective
   ↓
6. Visualize relationships and timeline
   ↓
7. Identify root cause
```

## Key Features

### 1. Behavior Graph
- Visual representation of activity
- Shows normal vs. abnormal behavior
- Identifies patterns
- Historical context (up to 1 year)

### 2. Finding Groups
- Related findings grouped together
- Shows scope of incident
- Identifies affected resources

### 3. Entity Profiles
```
Profiles for:
- IP addresses
- AWS accounts
- EC2 instances
- IAM users/roles
- S3 buckets
```

### 4. Timeline Analysis
- Chronological view of events
- Before, during, after incident
- Identify attack progression

## When to Use Detective

### ✅ Use Detective When
- Investigating GuardDuty findings
- Need root cause analysis
- Want to understand security incidents
- Need to visualize attack patterns
- Forensic investigation required
- Compliance requires incident analysis

### ❌ Don't Use Detective When
- Need threat detection → Use GuardDuty
- Need vulnerability scanning → Use Inspector
- Need compliance checks → Use Security Hub
- Don't have GuardDuty enabled

## Keywords to Identify Detective

- "Root cause analysis"
- "Security investigation"
- "Forensics"
- "Incident analysis"
- "Visualize security events"
- "Understand attack"
- "Investigation"
- "What happened and why"

## Common Exam Scenarios

### Scenario 1: GuardDuty Finding Investigation
**Question**: GuardDuty detected compromised instance, need to understand how it happened

**Answer**: Use Amazon Detective to investigate

**Why**:
- Visualizes attack timeline
- Shows related events
- Identifies root cause
- Historical context

### Scenario 2: Incident Response
**Question**: Security incident occurred, need to determine scope and impact

**Answer**: Use Detective to analyze behavior graph and identify affected resources

**Why**:
- Shows relationships between resources
- Identifies scope of compromise
- Timeline of events
- Forensic analysis

### Scenario 3: Compliance Investigation
**Question**: Compliance requires detailed incident analysis and reporting

**Answer**: Use Detective for investigation, export findings for report

**Why**:
- Detailed analysis
- Visual evidence
- Timeline documentation
- Root cause identification

## Detective vs GuardDuty vs Security Hub

| Service | Purpose | When to Use | Output |
|---------|---------|-------------|--------|
| **GuardDuty** | Threat detection | Detect threats | Findings (alerts) |
| **Detective** | Investigation | Investigate findings | Analysis, root cause |
| **Security Hub** | Aggregation | Centralize findings | Consolidated view |

**Workflow**:
```
GuardDuty (Detect) → Security Hub (Aggregate) → Detective (Investigate)
```

## Multi-Account Strategy

### With AWS Organizations
```
Delegated Administrator Account
   ↓
Manage Detective for member accounts
   ↓
Unified behavior graph across accounts
   ↓
Cross-account investigation
```

## Cost Considerations

### Pricing
```
Based on data ingested:
- VPC Flow Logs: $2.00 per GB
- CloudTrail: $2.00 per GB
- GuardDuty findings: Included

Example:
10 GB VPC Flow Logs × $2.00 = $20/month
5 GB CloudTrail × $2.00 = $10/month
Total: $30/month

30-day free trial available
```

### Cost Optimization
- Monitor data ingestion
- Disable if not actively investigating
- Use only in security account
- Review costs regularly

## Limitations & Constraints

- **Requires GuardDuty**: Must be enabled
- **Regional service**: Enable per region
- **Data retention**: Up to 1 year
- **Behavior graph**: Takes 24-48 hours to build initially
- **Investigation only**: Not for detection or prevention

## Pros & Cons

**Pros**:
- Visual investigation
- Root cause analysis
- Historical context (1 year)
- Multi-account support
- Automated data collection
- Graph-based analysis

**Cons**:
- Requires GuardDuty
- Can be expensive
- 24-48 hour initial setup
- Investigation only (not detection)
- Regional service
- Learning curve

---

# AWS Certificate Manager (ACM)
[BackToTop](#table-of-contents)

## Core Concepts ⭐⭐⭐⭐
- **Managed SSL/TLS certificate** service
- **Free public certificates**
- Automatic certificate renewal
- Integration with AWS services
- **No certificate management overhead**

## Certificate Types

### 1. Public Certificates (ACM-Issued)
- **Free** - no charge
- Issued by Amazon Certificate Authority
- Automatic renewal
- Domain validation required
- **Use with**: CloudFront, ALB, API Gateway, Elastic Beanstalk

### 2. Private Certificates (ACM Private CA)
- **Paid** - $400/month per CA + certificate fees
- For internal/private use
- Your own Certificate Authority
- **Use with**: Internal applications, microservices

### 3. Imported Certificates
- Bring your own certificate
- From third-party CA (DigiCert, Let's Encrypt, etc.)
- **Manual renewal** required
- **Use when**: Existing certificates, specific CA required

## Domain Validation Methods

### 1. DNS Validation (Recommended)
```
Process:
1. Request certificate
2. ACM provides CNAME record
3. Add CNAME to DNS (Route 53 or external)
4. ACM validates domain ownership
5. Certificate issued

Advantages:
- Automatic renewal works
- No email required
- Can validate wildcards
- Recommended by AWS
```

### 2. Email Validation
```
Process:
1. Request certificate
2. ACM sends email to domain contacts
3. Click validation link in email
4. Certificate issued

Disadvantages:
- Requires email access
- Manual process
- Renewal requires re-validation
- Not recommended
```

## Automatic Renewal

### How It Works
```
ACM-issued certificates:
- Automatically renewed before expiration
- No action required
- Renewal starts 60 days before expiration
- Uses DNS validation records

Imported certificates:
- Manual renewal required
- ACM sends expiration notifications
- Must re-import new certificate
```

## Supported Services

### Native Integration
```
✅ CloudFront (global)
✅ Application Load Balancer (ALB)
✅ Network Load Balancer (NLB)
✅ API Gateway
✅ Elastic Beanstalk
✅ CloudFormation
✅ Cognito
```

### Not Supported
```
❌ EC2 instances directly
❌ Classic Load Balancer (use ALB/NLB)
❌ On-premises servers
❌ Route 53 (DNS only, not HTTPS)
```

**For EC2**: Export certificate or use imported certificate

## Regional Considerations ⭐⭐⭐⭐⭐

### Important Rules
```
CloudFront: Certificate must be in us-east-1
ALB/NLB: Certificate must be in same region as load balancer
API Gateway: Certificate must be in same region as API
```

### Multi-Region Strategy
```
Scenario: ALB in us-west-2 and eu-west-1

Solution:
1. Request certificate in us-west-2 for us-west-2 ALB
2. Request certificate in eu-west-1 for eu-west-1 ALB
3. Use same domain validation (DNS records)

Note: Same domain, different regions = separate certificates
```

## Wildcard Certificates

### Syntax
```
*.example.com

Covers:
✅ www.example.com
✅ api.example.com
✅ app.example.com

Does NOT cover:
❌ example.com (apex domain)
❌ sub.api.example.com (nested subdomain)
```

### Best Practice
```
Request certificate with both:
- *.example.com (wildcard)
- example.com (apex)

Covers all subdomains + apex domain
```

## When to Use ACM

### ✅ Use ACM When
- Need SSL/TLS certificates for AWS services
- Want automatic renewal
- Using CloudFront, ALB, API Gateway
- Want free certificates
- Don't want to manage certificates

### ❌ Don't Use ACM When
- Need certificate on EC2 (use imported or export)
- Need certificate on-premises
- Require specific third-party CA
- Need certificate portability

## Keywords to Identify ACM

- "SSL/TLS certificate"
- "HTTPS"
- "Secure connection"
- "Certificate management"
- "Automatic renewal"
- "CloudFront certificate"
- "Load balancer certificate"
- "Free certificate"

## Common Exam Scenarios

### Scenario 1: CloudFront with HTTPS
**Question**: Enable HTTPS for CloudFront distribution

**Answer**: Request ACM certificate in us-east-1, attach to CloudFront

**Why**:
- ACM provides free certificates
- Automatic renewal
- CloudFront requires certificate in us-east-1
- Easy integration

### Scenario 2: Multi-Region ALB
**Question**: ALBs in multiple regions need HTTPS

**Answer**: Request ACM certificate in each region where ALB exists

**Why**:
- Certificates are regional
- Each region needs separate certificate
- Same domain validation can be reused
- Automatic renewal per region

### Scenario 3: Wildcard Certificate
**Question**: Secure multiple subdomains (www, api, app)

**Answer**: Request wildcard certificate (*.example.com) + apex (example.com)

**Why**:
- Single certificate for all subdomains
- Easier management
- Cost-effective (free)
- Automatic renewal

### Scenario 4: EC2 Web Server
**Question**: Enable HTTPS on EC2 instance

**Answer**: Use imported certificate or third-party certificate (not ACM-issued)

**Why**:
- ACM certificates cannot be exported to EC2
- Must use imported certificate
- Or use ALB in front of EC2 with ACM certificate

## ACM vs Third-Party Certificates

| Feature | ACM | Third-Party |
|---------|-----|-------------|
| **Cost** | Free (public) | Paid |
| **Renewal** | Automatic | Manual |
| **Integration** | Native AWS | Manual setup |
| **Portability** | AWS only | Portable |
| **Management** | AWS managed | Self-managed |
| **Use Case** | AWS services | Any server |

## Certificate Transparency Logging

### What It Is
- Public log of all issued certificates
- Helps detect mis-issued certificates
- Industry standard
- **Cannot be disabled** for ACM certificates

### Privacy Consideration
- Domain names are public
- Anyone can see certificates issued
- Not a security risk (normal practice)

## Cost Considerations

### Pricing
```
Public Certificates (ACM-issued): FREE
Private CA: $400/month per CA
Private Certificates: $0.75/month per certificate
Imported Certificates: FREE (no ACM charge)

Data Transfer: Standard AWS rates apply
```

### Cost Optimization
- Use ACM public certificates (free)
- Wildcard certificates reduce count
- Delete unused certificates
- Use single certificate for multiple services

## Limitations & Constraints

- **Cannot export** ACM-issued certificates (except private CA)
- **Regional**: Certificates are region-specific
- **CloudFront**: Must be in us-east-1
- **Domain validation**: Must control domain
- **Certificate limit**: 2,048 per account per region (can increase)
- **Renewal**: Requires valid DNS validation records

## Pros & Cons

**Pros**:
- Free public certificates
- Automatic renewal
- Easy integration with AWS services
- No certificate management
- Wildcard support
- Multi-domain support (SAN)

**Cons**:
- AWS services only
- Cannot export (public certificates)
- Regional (must request per region)
- CloudFront requires us-east-1
- Cannot use on EC2 directly

---

# AWS CloudHSM
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐
- **Hardware Security Module** in AWS cloud
- **FIPS 140-2 Level 3** validated
- **Single-tenant** hardware
- **You manage keys** (AWS has no access)
- Dedicated hardware for cryptographic operations

## CloudHSM vs KMS

| Feature | CloudHSM | KMS |
|---------|----------|-----|
| **FIPS Level** | Level 3 | Level 2 |
| **Tenancy** | Single-tenant | Multi-tenant |
| **Key Control** | You control | AWS has access |
| **Management** | You manage | AWS manages |
| **Integration** | Manual | Native AWS |
| **Cost** | $1.45/hour per HSM | $1/month per key |
| **Use Case** | Highest security, compliance | Most scenarios |

## Key Features

### 1. FIPS 140-2 Level 3
- Highest level of security
- Tamper-evident hardware
- Physical security requirements
- **Use when**: Compliance requires Level 3

### 2. Single-Tenant
- Dedicated hardware
- No sharing with other customers
- Complete isolation
- **Use when**: Regulatory requirements

### 3. You Control Keys
- AWS cannot access keys
- You manage key lifecycle
- You are responsible for backups
- **Use when**: Need exclusive key control

### 4. High Availability
- Deploy in multiple AZs
- Automatic synchronization
- Cluster architecture
- Minimum 2 HSMs recommended

## CloudHSM Cluster

### Architecture
```
CloudHSM Cluster (VPC)
   ↓
HSM 1 (AZ-1) ←→ HSM 2 (AZ-2) ←→ HSM 3 (AZ-3)
   ↓              ↓              ↓
Automatic key synchronization
```

### Cluster Benefits
- High availability
- Load balancing
- Automatic failover
- Key synchronization

## Use Cases

### 1. Regulatory Compliance
- FIPS 140-2 Level 3 required
- PCI DSS compliance
- HIPAA requirements
- Government workloads

### 2. Contractual Requirements
- Customer requires Level 3
- Exclusive key control
- Single-tenant hardware

### 3. Custom Key Management
- Specific cryptographic algorithms
- Custom key management policies
- Integration with on-premises HSM

### 4. Database Encryption
- Oracle TDE (Transparent Data Encryption)
- SQL Server TDE
- Custom database encryption

## When to Use CloudHSM

### ✅ Use CloudHSM When
- Need FIPS 140-2 Level 3
- Compliance requires single-tenant
- Need exclusive key control
- Regulatory requirements
- Custom cryptographic operations
- Oracle/SQL Server TDE

### ❌ Don't Use CloudHSM When
- KMS meets requirements (most cases)
- Cost is primary concern
- Want AWS-managed solution
- Don't need Level 3 compliance
- Simple encryption needs

## Keywords to Identify CloudHSM

- "FIPS 140-2 Level 3"
- "Single-tenant"
- "Exclusive key control"
- "Hardware security module"
- "Highest security"
- "Regulatory compliance"
- "Oracle TDE"
- "Custom cryptographic"

## Common Exam Scenarios

### Scenario 1: FIPS Level 3 Requirement
**Question**: Compliance requires FIPS 140-2 Level 3 for encryption keys

**Answer**: Use AWS CloudHSM

**Why**:
- CloudHSM is Level 3 validated
- KMS is only Level 2
- Meets compliance requirement

### Scenario 2: Exclusive Key Control
**Question**: Customer requires that AWS cannot access encryption keys

**Answer**: Use AWS CloudHSM

**Why**:
- Single-tenant hardware
- You control keys exclusively
- AWS has no access
- Meets customer requirement

### Scenario 3: Oracle TDE
**Question**: Oracle database needs Transparent Data Encryption

**Answer**: Use AWS CloudHSM with Oracle TDE integration

**Why**:
- CloudHSM supports Oracle TDE
- Native integration
- Meets Oracle requirements

### Scenario 4: Cost-Effective Encryption
**Question**: Encrypt S3 data cost-effectively

**Answer**: Use AWS KMS (not CloudHSM)

**Why**:
- KMS is sufficient for S3
- Much cheaper ($1/month vs $1.45/hour)
- Native S3 integration
- CloudHSM is overkill

## CloudHSM Integration

### AWS Services
```
Limited native integration:
- RDS (Oracle, SQL Server TDE)
- Redshift
- Custom applications via SDK
```

### Custom Applications
```
Use CloudHSM client:
- PKCS#11 library
- Java Cryptography Extensions (JCE)
- Microsoft CryptoNG (CNG)
```

## High Availability Setup

### Best Practice
```
Minimum Configuration:
- 2 HSMs in different AZs
- Automatic synchronization
- Load balancing

Production Configuration:
- 3+ HSMs across 3 AZs
- Better fault tolerance
- Higher throughput
```

## Key Management

### Your Responsibilities
```
✅ Create and manage keys
✅ Backup keys
✅ Key rotation
✅ Access control
✅ Audit logging
✅ HSM user management
```

### AWS Responsibilities
```
✅ Hardware maintenance
✅ Physical security
✅ Network connectivity
✅ HSM software updates
```

## Cost Considerations

### Pricing
```
CloudHSM: $1.45 per hour per HSM
         = ~$1,044 per month per HSM

Minimum HA setup (2 HSMs):
$2.90/hour = ~$2,088/month

vs. KMS:
$1/month per key + usage
```

### Cost Optimization
- Use KMS unless CloudHSM required
- Right-size cluster (minimum 2 for HA)
- Delete unused HSMs
- Consider workload requirements

## Limitations & Constraints

- **Expensive**: $1.45/hour per HSM
- **Complex**: Requires HSM expertise
- **Management overhead**: You manage keys
- **Limited AWS integration**: Manual setup
- **VPC-based**: Must be in VPC
- **Regional**: Deploy per region

## Pros & Cons

**Pros**:
- FIPS 140-2 Level 3
- Single-tenant hardware
- Exclusive key control
- High security
- Compliance-friendly
- Custom cryptographic operations

**Cons**:
- Very expensive
- Complex management
- Limited AWS integration
- Requires HSM expertise
- You manage backups
- Operational overhead

---

# AWS Directory Service
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐
- **Managed Microsoft Active Directory** in AWS
- Multiple deployment options
- Integration with on-premises AD
- SSO for AWS applications
- User and group management

## Directory Service Types

### 1. AWS Managed Microsoft AD ⭐⭐⭐⭐
**Full Microsoft Active Directory**

#### Features
```
- Actual Microsoft AD (not compatible layer)
- Runs on Windows Server
- Multi-AZ deployment (HA)
- Automated backups
- Automated patching
- Trust relationships with on-premises AD
```

#### Use Cases
```
- Need actual Microsoft AD in AWS
- Migrate AD-aware applications
- Trust relationship with on-premises
- .NET applications requiring AD
- SharePoint, SQL Server Always On
```

#### Architecture
```
On-Premises AD ←→ Trust Relationship ←→ AWS Managed Microsoft AD
                                              ↓
                                    AWS Applications (EC2, RDS, WorkSpaces)
```

### 2. AD Connector ⭐⭐⭐
**Proxy to on-premises AD**

#### Features
```
- Directory proxy (not actual AD)
- Redirects requests to on-premises AD
- No caching
- Requires VPN or Direct Connect
- No data stored in AWS
```

#### Use Cases
```
- Keep users in on-premises AD
- Don't want to replicate AD to AWS
- Need AWS SSO with on-premises AD
- Temporary AWS access for on-premises users
```

#### Architecture
```
AWS Applications → AD Connector → VPN/Direct Connect → On-Premises AD
```

### 3. Simple AD ⭐⭐
**Standalone directory (Samba-based)**

#### Features
```
- Samba 4 (not Microsoft AD)
- AD-compatible (not full AD)
- Small: 500 users, Large: 5,000 users
- No trust relationships
- Basic AD features only
```

#### Use Cases
```
- Small business
- Simple user directory
- Don't need full AD features
- Cost-effective option
- No on-premises AD
```

## Comparison Matrix

| Feature | Managed Microsoft AD | AD Connector | Simple AD |
|---------|---------------------|--------------|-----------|
| **Type** | Actual AD | Proxy | Samba-based |
| **Users** | Up to 500,000 | Unlimited (on-prem) | Up to 5,000 |
| **Trust** | Yes | No | No |
| **On-Prem Required** | No | Yes | No |
| **Multi-AZ** | Yes | Yes | Yes |
| **Cost** | $$$ | $$ | $ |
| **Use Case** | Full AD in AWS | Proxy to on-prem | Simple directory |

## When to Use Each Type

### Use AWS Managed Microsoft AD When:
```
✅ Need actual Microsoft AD in AWS
✅ Migrating AD-aware applications
✅ Need trust with on-premises AD
✅ Running .NET applications
✅ Need full AD features (GPO, schema extensions)
✅ More than 5,000 users
```

### Use AD Connector When:
```
✅ Users must stay in on-premises AD
✅ Don't want to replicate AD to AWS
✅ Need AWS SSO with on-premises users
✅ Temporary AWS access
✅ Compliance requires on-premises authentication
```

### Use Simple AD When:
```
✅ Small business (<5,000 users)
✅ Don't need full AD features
✅ No on-premises AD
✅ Cost-effective solution
✅ Basic user directory needed
```

## Integration with AWS Services

### Native Integration
```
✅ Amazon WorkSpaces (virtual desktops)
✅ Amazon WorkDocs (document collaboration)
✅ Amazon WorkMail (email)
✅ Amazon QuickSight (BI)
✅ AWS SSO (Single Sign-On)
✅ Amazon RDS (SQL Server, Oracle)
✅ Amazon FSx for Windows File Server
✅ AWS Management Console (federated access)
```

### EC2 Domain Join
```
EC2 Windows Instances → Join to Directory Service
                      → Use AD credentials
                      → Apply Group Policies
```

## Trust Relationships (Managed Microsoft AD Only)

### One-Way Trust
```
AWS Managed AD trusts On-Premises AD
- On-premises users can access AWS resources
- AWS users cannot access on-premises resources
```

### Two-Way Trust
```
AWS Managed AD ←→ On-Premises AD
- Users in both directories can access resources in both
- Bidirectional authentication
```

### Forest Trust
```
AWS Managed AD Forest ←→ On-Premises AD Forest
- Trust between entire forests
- Multiple domains supported
```

## When to Use Directory Service

### ✅ Use Directory Service When
- Need Active Directory in AWS
- Migrating Windows applications
- Need SSO for AWS applications
- Running WorkSpaces, WorkDocs
- EC2 instances need domain join
- RDS SQL Server with Windows Authentication

### ❌ Don't Use Directory Service When
- Web/mobile app users → Use Cognito
- AWS account access → Use IAM Identity Center
- Simple user management → Use IAM
- Linux-only environment → May not need

## Keywords to Identify Directory Service

- "Active Directory"
- "Microsoft AD"
- "Domain join"
- "Windows authentication"
- "On-premises AD integration"
- "LDAP"
- "Group Policy"
- "WorkSpaces"
- ".NET applications"

## Common Exam Scenarios

### Scenario 1: Migrate Windows Apps
**Question**: Migrate Windows applications requiring Active Directory to AWS

**Answer**: Use AWS Managed Microsoft AD

**Why**:
- Actual Microsoft AD
- Full AD features
- Applications work without modification
- Multi-AZ for HA

### Scenario 2: On-Premises AD Integration
**Question**: AWS users need to authenticate against on-premises AD

**Answer**: Use AD Connector

**Why**:
- Proxy to on-premises AD
- No data replication
- Users stay in on-premises AD
- Cost-effective

### Scenario 3: Small Business Directory
**Question**: Small business (100 users) needs simple user directory for AWS

**Answer**: Use Simple AD

**Why**:
- Cost-effective
- Sufficient for small user base
- No on-premises AD needed
- Easy to set up

### Scenario 4: WorkSpaces Deployment
**Question**: Deploy Amazon WorkSpaces for 1,000 employees

**Answer**: Use AWS Managed Microsoft AD or AD Connector

**Why**:
- WorkSpaces requires directory
- Managed Microsoft AD for AWS-only users
- AD Connector if users in on-premises AD

## Multi-Region Considerations

### Managed Microsoft AD
```
Regional service:
- Deploy per region
- Can establish trust between regions
- Separate directories per region
```

### Global Architecture
```
Region 1: AWS Managed AD ←→ Trust ←→ On-Premises AD
Region 2: AWS Managed AD ←→ Trust ←→ On-Premises AD
```

## Security Features

### 1. Multi-AZ Deployment
- Automatic replication
- High availability
- Fault tolerance

### 2. Automated Backups
- Daily automated snapshots
- Point-in-time recovery
- Retained for 30 days

### 3. Encryption
- Data encrypted at rest
- Data encrypted in transit (LDAPS)
- KMS integration

### 4. Monitoring
- CloudWatch metrics
- CloudTrail logging
- SNS notifications

## Cost Considerations

### Pricing
```
AWS Managed Microsoft AD:
- Standard: $0.05/hour (~$36/month)
- Enterprise: $0.11/hour (~$80/month)

AD Connector:
- Small: $0.05/hour (~$36/month)
- Large: $0.11/hour (~$80/month)

Simple AD:
- Small: $0.05/hour (~$36/month)
- Large: $0.11/hour (~$80/month)

Plus data transfer costs
```

### Cost Optimization
- Choose appropriate size
- Use Simple AD for small deployments
- Use AD Connector if on-premises AD exists
- Delete unused directories

## Limitations & Constraints

### Managed Microsoft AD
- **Users**: Up to 500,000
- **Regional**: Per region deployment
- **Schema**: Limited schema extensions
- **Trusts**: Up to 5 trusts per directory

### AD Connector
- **Requires**: VPN or Direct Connect
- **No caching**: All requests go to on-premises
- **Latency**: Dependent on network
- **No trust**: Cannot establish trusts

### Simple AD
- **Users**: Maximum 5,000
- **No trust**: Cannot establish trusts
- **Limited features**: Basic AD only
- **No schema extensions**

## Pros & Cons

### AWS Managed Microsoft AD
**Pros**:
- Actual Microsoft AD
- Full AD features
- Multi-AZ HA
- Automated management
- Trust relationships

**Cons**:
- More expensive
- Regional deployment
- Limited schema extensions

### AD Connector
**Pros**:
- No data replication
- Users stay on-premises
- Cost-effective
- Simple setup

**Cons**:
- Requires VPN/Direct Connect
- Network latency
- No caching
- On-premises dependency

### Simple AD
**Pros**:
- Cost-effective
- Easy setup
- No on-premises required
- Sufficient for small deployments

**Cons**:
- Limited to 5,000 users
- No trust relationships
- Limited AD features
- Samba-based (not Microsoft)

---

# AWS IAM Identity Center (AWS SSO)
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐
- **Centralized access management** for multiple AWS accounts
- **Single Sign-On** (SSO) to AWS and business applications
- Successor to AWS Single Sign-On
- Integration with AWS Organizations
- **Free service**

## Key Features

### 1. Multi-Account Access
```
Single login → Access multiple AWS accounts
- Centralized user management
- Consistent permissions
- Simplified access control
```

### 2. SSO to Business Applications
```
Supported applications:
- Salesforce
- Microsoft 365
- Slack
- Dropbox
- Custom SAML 2.0 applications
```

### 3. Identity Sources
```
Options:
- IAM Identity Center directory (built-in)
- Active Directory (AWS Managed Microsoft AD)
- External Identity Provider (Okta, Azure AD, etc.)
```

## How IAM Identity Center Works

### Architecture
```
Users → IAM Identity Center → AWS Accounts (via Organizations)
                           → Business Applications (SAML)
```

### Process Flow
```
1. User logs in to IAM Identity Center portal
2. Sees list of accessible AWS accounts and applications
3. Clicks on account/application
4. Automatically signed in (SSO)
5. Temporary credentials provided (AWS accounts)
```

## Permission Sets

### What Are Permission Sets?
- **Templates** for IAM permissions
- Assigned to users/groups for specific accounts
- Automatically create IAM roles in accounts
- Centrally managed

### Example
```
Permission Set: "Developer"
- Policies: PowerUserAccess
- Assigned to: Dev Group
- For accounts: Dev Account, Test Account

Result:
- Dev Group members can access Dev and Test accounts
- With PowerUserAccess permissions
- Via SSO portal
```

## Identity Sources

### 1. IAM Identity Center Directory (Default)
```
- Built-in user directory
- Create users and groups in IAM Identity Center
- Simple setup
- Use when: No existing identity provider
```

### 2. AWS Managed Microsoft AD
```
- Integrate with Directory Service
- Use existing AD users and groups
- Sync to IAM Identity Center
- Use when: Have AWS Managed Microsoft AD
```

### 3. External Identity Provider
```
- SAML 2.0 integration
- Okta, Azure AD, OneLogin, etc.
- Users managed in external IdP
- Use when: Have existing IdP
```

## When to Use IAM Identity Center

### ✅ Use IAM Identity Center When
- Multiple AWS accounts (Organizations)
- Need centralized access management
- Want SSO to AWS accounts
- Need SSO to business applications
- Employees accessing AWS
- Want to simplify access management

### ❌ Don't Use IAM Identity Center When
- Single AWS account → Use IAM
- Application users → Use Cognito
- Programmatic access only → Use IAM
- Simple use case → Use IAM

## Keywords to Identify IAM Identity Center

- "Single Sign-On"
- "SSO"
- "Multiple AWS accounts"
- "Centralized access"
- "Employee access"
- "AWS Organizations"
- "SAML"
- "Federation"

## Common Exam Scenarios

### Scenario 1: Multi-Account Access
**Question**: Company has 50 AWS accounts, employees need access to multiple accounts

**Answer**: Use IAM Identity Center with AWS Organizations

**Why**:
- Centralized access management
- Single login for all accounts
- Permission sets for consistent permissions
- Simplified user management

### Scenario 2: Active Directory Integration
**Question**: Company uses on-premises AD, employees need AWS access

**Answer**: Use IAM Identity Center with AD Connector or AWS Managed Microsoft AD

**Why**:
- Integrate with existing AD
- Use existing user credentials
- SSO experience
- Centralized management

### Scenario 3: Third-Party SSO
**Question**: Company uses Okta for SSO, need to add AWS access

**Answer**: Configure IAM Identity Center with Okta as external IdP

**Why**:
- Integrate with existing IdP
- Consistent SSO experience
- Users managed in Okta
- SAML 2.0 integration

## IAM Identity Center vs IAM vs Cognito

| Feature | IAM Identity Center | IAM | Cognito |
|---------|-------------------|-----|---------|
| **Use Case** | Employee AWS access | AWS service access | App user authentication |
| **Accounts** | Multi-account | Single account | N/A |
| **SSO** | Yes | No | Yes (social) |
| **Identity Source** | AD, External IdP | AWS only | Social, SAML |
| **Target Users** | Employees | Services, admins | End users |
| **Cost** | Free | Free | Pay per MAU |

## Integration with AWS Organizations

### Automatic Setup
```
1. Enable IAM Identity Center
2. Automatically integrates with Organizations
3. All accounts in organization available
4. Assign permission sets to accounts
5. Users access via SSO portal
```

### Benefits
```
- Centralized management
- Consistent permissions
- Automatic account enrollment
- Simplified access control
```

## Multi-Factor Authentication (MFA)

### Supported MFA Types
```
- TOTP (Time-based One-Time Password)
- SMS (text message)
- Security keys (U2F)
- Authenticator apps
```

### MFA Configuration
```
- Enforce MFA for all users
- Per-user MFA settings
- MFA during sign-in
- Remember device option
```

## Cost Considerations

### Pricing
```
IAM Identity Center: FREE
- No charge for the service
- No charge for users
- No charge for permission sets

Pay only for:
- Underlying services (Directory Service if used)
- Data transfer
```

## Limitations & Constraints

- **Requires AWS Organizations**: Must be enabled
- **Regional**: Deployed in one region (global access)
- **Permission sets**: Up to 500 per account
- **Users**: Depends on identity source
- **Applications**: SAML 2.0 only

## Pros & Cons

**Pros**:
- Free service
- Centralized access management
- SSO to AWS and applications
- Multi-account support
- Integration with AD and external IdPs
- Simplified user management

**Cons**:
- Requires AWS Organizations
- SAML 2.0 only for applications
- Learning curve
- Regional deployment
- Limited customization

---

# AWS WAF (Web Application Firewall)
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐
- **Layer 7 (application layer) firewall**
- Protects web applications from common attacks
- **Rule-based filtering** of HTTP/HTTPS requests
- Integration with CloudFront, ALB, API Gateway
- Real-time metrics and logging

## What WAF Protects Against

### Common Web Attacks
```
✅ SQL Injection
✅ Cross-Site Scripting (XSS)
✅ Cross-Site Request Forgery (CSRF)
✅ DDoS attacks (Layer 7)
✅ Bot attacks
✅ IP-based attacks
✅ Geographic restrictions
✅ Rate limiting
```

## Key Components

### 1. Web ACLs (Access Control Lists)
- Container for rules
- Attached to resources (CloudFront, ALB, API Gateway)
- Default action: Allow or Block
- Processes rules in order

### 2. Rules
- Conditions to match requests
- Action: Allow, Block, Count
- Can be grouped in rule groups

### 3. Rule Groups
- Reusable set of rules
- AWS Managed Rules (pre-configured)
- Custom rule groups
- Marketplace rule groups (third-party)

## Rule Types

### 1. AWS Managed Rules ⭐⭐⭐⭐
```
Pre-configured rule groups:
- Core Rule Set (CRS): Common vulnerabilities
- Known Bad Inputs: Known malicious patterns
- SQL Database: SQL injection protection
- Linux/Windows OS: OS-specific attacks
- PHP/WordPress: Application-specific
- IP Reputation: Known malicious IPs
```

### 2. Custom Rules
```
Match conditions:
- IP addresses (allow/block specific IPs)
- Geographic location (country-based)
- HTTP headers
- HTTP body
- URI path
- Query strings
- Request size
- Rate-based (requests per 5 minutes)
```

### 3. Rate-Based Rules
```
Example:
Block IP if > 2,000 requests in 5 minutes
- Protects against DDoS
- Prevents brute force
- Automatic blocking
```

## Supported Services

### Integration
```
✅ Amazon CloudFront (global)
✅ Application Load Balancer (ALB)
✅ API Gateway (REST API)
✅ AWS AppSync (GraphQL)
```

## Regional Considerations 
```
CloudFront: WAF must be in us-east-1 (global)
ALB: WAF must be in same region as ALB
API Gateway: WAF must be in same region as API
AppSync: WAF must be in same region as AppSync
```

## Rule Actions

### 1. Allow
- Request passes through
- Continue to next rule or default action
- **Use when**: Whitelist known good traffic

### 2. Block
- Request blocked immediately
- Returns 403 Forbidden
- **Use when**: Known malicious patterns

### 3. Count
- Count matching requests but don't block
- **Use when**: Testing rules before enforcement
- Monitor without impact

### 4. CAPTCHA
- Challenge user with CAPTCHA
- Verify human vs bot
- **Use when**: Suspicious but not definitively malicious

## Rule Priority and Evaluation

### Evaluation Order
```
1. Rules evaluated in priority order (0 = highest)
2. First matching rule action is taken
3. If no rules match, default action applies

Example:
Priority 0: Block SQL injection → Blocks
Priority 1: Allow specific IP → Not evaluated (already blocked)
Default: Allow → Only if no rules match
```

### Best Practice
```
1. Specific block rules (high priority)
2. Allow rules (medium priority)
3. General block rules (low priority)
4. Default action (last resort)
```

## Rate-Based Rules ⭐⭐⭐⭐

### Configuration
```
Rate limit: 2,000 requests per 5 minutes (per IP)
Action: Block for 10 minutes
Scope: Per IP address

Use cases:
- DDoS protection
- Brute force prevention
- API rate limiting
- Scraping prevention
```

### Example
```
Rule: Block if IP sends > 2,000 requests in 5 minutes
Result: IP blocked for 10 minutes
After 10 minutes: IP unblocked automatically
```

## Geo-Blocking

### Geographic Match
```
Allow/Block based on country:
- Block: North Korea, Iran (sanctions)
- Allow: Only US, Canada, UK
- Use case: Compliance, licensing, fraud prevention
```

### Example
```
Rule: Block all traffic except from US
Action: Block
Geographic match: NOT United States
Result: Only US traffic allowed
```

## Logging and Monitoring

### WAF Logs
```
Destinations:
- S3 bucket (for analysis)
- CloudWatch Logs (real-time monitoring)
- Kinesis Data Firehose (streaming)

Log contents:
- Timestamp
- Request details
- Rule that matched
- Action taken
- Client IP
```

### CloudWatch Metrics
```
Metrics:
- AllowedRequests
- BlockedRequests
- CountedRequests
- PassedRequests

Use for:
- Monitoring attack patterns
- Alerting on spikes
- Capacity planning
```

### Real-Time Visibility
```
WAF Dashboard:
- Requests per minute
- Top IPs
- Top countries
- Top URIs
- Rule matches
```

## When to Use WAF

### ✅ Use WAF When
- Protect web applications from attacks
- Need Layer 7 protection
- SQL injection/XSS protection needed
- Rate limiting required
- Geographic restrictions needed
- Bot protection required
- Compliance requires WAF

### ❌ Don't Use WAF When
- Need Layer 3/4 protection → Use Shield, Security Groups
- Need DDoS protection only → Use Shield
- Simple IP blocking → Use Security Groups, NACLs
- Cost is primary concern → Consider alternatives

## Keywords to Identify WAF

- "Web application firewall"
- "SQL injection"
- "XSS" (Cross-Site Scripting)
- "Layer 7 protection"
- "HTTP/HTTPS filtering"
- "Rate limiting"
- "Bot protection"
- "Geographic blocking"
- "CloudFront protection"
- "ALB protection"

## Common Exam Scenarios

### Scenario 1: SQL Injection Protection
**Question**: Protect web application from SQL injection attacks

**Answer**: Use AWS WAF with SQL injection rule group

**Why**:
- WAF inspects HTTP requests
- Detects SQL injection patterns
- Blocks malicious requests
- Layer 7 protection

### Scenario 2: Rate Limiting
**Question**: Prevent DDoS attacks by limiting requests per IP

**Answer**: Use AWS WAF rate-based rule (e.g., 2,000 requests per 5 minutes)

**Why**:
- Automatic rate limiting
- Per-IP blocking
- Protects against Layer 7 DDoS
- Automatic unblocking

### Scenario 3: Geographic Restrictions
**Question**: Block traffic from specific countries due to compliance

**Answer**: Use AWS WAF geo-match rule to block countries

**Why**:
- Country-level blocking
- Compliance requirement
- Easy to configure
- No application changes

### Scenario 4: Bot Protection
**Question**: Prevent bots from scraping website content

**Answer**: Use AWS WAF with Bot Control managed rule group + rate limiting

**Why**:
- Detects bot patterns
- Rate limits suspicious IPs
- CAPTCHA challenges
- Protects content

## WAF vs Shield vs Security Groups

| Feature | WAF | Shield | Security Groups |
|---------|-----|--------|-----------------|
| **Layer** | Layer 7 (Application) | Layer 3/4 (Network) | Layer 3/4 (Network) |
| **Protection** | SQL injection, XSS, bots | DDoS | IP/port filtering |
| **Scope** | CloudFront, ALB, API Gateway | All AWS resources | EC2, RDS, etc. |
| **Cost** | Pay per rule + requests | Standard: Free, Advanced: $3,000/month | Free |
| **Use Case** | Web app attacks | DDoS protection | Basic network filtering |

**Combined Strategy**:
```
Shield (DDoS) + WAF (Application attacks) + Security Groups (Network)
= Comprehensive protection
```

## AWS Managed Rules vs Custom Rules

### AWS Managed Rules (Recommended)
```
Pros:
✅ Pre-configured by AWS security experts
✅ Regularly updated
✅ Cover common vulnerabilities
✅ Easy to enable
✅ Cost-effective

Cons:
❌ Less customization
❌ May have false positives
❌ Additional cost per rule group
```

### Custom Rules
```
Pros:
✅ Tailored to your application
✅ Specific use cases
✅ Full control

Cons:
❌ Requires security expertise
❌ Manual maintenance
❌ Time-consuming
```

**Best Practice**: Start with AWS Managed Rules, add custom rules as needed

## Cost Considerations

### Pricing
```
Web ACL: $5.00 per month
Rule: $1.00 per month per rule
Requests: $0.60 per million requests

AWS Managed Rule Groups: $10-$30 per month per rule group

Example:
1 Web ACL: $5
5 Custom Rules: $5
2 Managed Rule Groups: $20
10 million requests: $6
Total: $36/month
```

### Cost Optimization
```
- Use AWS Managed Rules (cost-effective)
- Consolidate rules where possible
- Use Count mode to test before blocking
- Monitor and remove unused rules
- Use sampling for logging (reduce storage)
```

## Integration with Other Services

### CloudFront + WAF
```
CloudFront Distribution → WAF (us-east-1)
- Global protection
- Edge location filtering
- Reduced latency
- Best for: Global applications
```

### ALB + WAF
```
ALB → WAF (same region)
- Regional protection
- Protects backend directly
- Best for: Regional applications
```

### API Gateway + WAF
```
API Gateway → WAF (same region)
- API protection
- Rate limiting
- Authentication bypass prevention
- Best for: REST APIs
```

## Advanced Features

### 1. Custom Responses
```
Instead of default 403:
- Custom HTML page
- Custom status code
- Custom headers
- Branded error pages
```

### 2. Labels
```
Tag requests with labels:
- Pass labels between rules
- Complex logic
- Conditional actions
```

### 3. Regex Pattern Sets
```
Define regex patterns:
- Match complex patterns
- Reusable across rules
- Example: Email patterns, phone numbers
```

### 4. IP Sets
```
Manage IP lists:
- Whitelist/blacklist IPs
- CIDR ranges
- Reusable across rules
- Update without changing rules
```

## Testing and Validation

### Count Mode
```
1. Create rule with Count action
2. Monitor matched requests
3. Analyze false positives
4. Adjust rule
5. Change to Block action

Benefits:
- No impact on users
- Safe testing
- Data-driven decisions
```

### Sampled Requests
```
View sample of requests:
- Last 3 hours
- Matched rules
- Request details
- Troubleshooting
```

## Limitations & Constraints

- **Request size**: 8 KB for inspection (body)
- **Rules per Web ACL**: 1,500
- **Web ACLs per account**: 100 per region
- **Rate limit**: Minimum 100 requests per 5 minutes
- **Regex**: Limited complexity
- **Logging**: 5 MB/second per Web ACL

## Pros & Cons

**Pros**:
- Layer 7 protection
- Flexible rule engine
- AWS Managed Rules
- Real-time monitoring
- Integration with CloudFront, ALB, API Gateway
- Pay-as-you-go pricing
- No infrastructure to manage

**Cons**:
- Can be complex to configure
- Costs can add up
- False positives possible
- Regional deployment (except CloudFront)
- Learning curve
- Request size limits

---

# AWS Shield
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐
- **DDoS (Distributed Denial of Service) protection**
- Two tiers: Standard (free) and Advanced (paid)
- **Layer 3/4 protection** (network/transport)
- Automatic protection for all AWS customers
- Integration with CloudFront, Route 53, ALB

## Shield Standard ⭐⭐⭐⭐⭐

### Features
```
✅ FREE for all AWS customers
✅ Automatic protection
✅ Always-on detection
✅ Layer 3/4 DDoS protection
✅ Protects against common attacks:
   - SYN/ACK floods
   - UDP reflection attacks
   - DNS query floods
```

### Protected Services
```
- Amazon CloudFront
- Amazon Route 53
- AWS Global Accelerator
- Elastic Load Balancing (ALB, NLB, CLB)
- Amazon EC2 Elastic IP addresses
```

### How It Works
```
1. Enabled automatically (no action required)
2. Monitors traffic patterns
3. Detects DDoS attacks
4. Automatically mitigates attacks
5. No performance impact
```

## Shield Advanced ⭐⭐⭐

### Features
```
💰 $3,000 per month per organization
✅ Enhanced DDoS protection
✅ 24/7 DDoS Response Team (DRT)
✅ Advanced attack diagnostics
✅ DDoS cost protection (credits for scaling costs)
✅ Layer 7 protection (with WAF)
✅ Real-time attack notifications
✅ Attack forensics and reports
```

### Additional Protections
```
- Larger attacks (volumetric)
- More sophisticated attacks
- Application layer attacks (with WAF)
- Proactive engagement
- Cost protection
```

### DDoS Response Team (DRT)
```
24/7 access to AWS experts:
- Attack analysis
- Mitigation assistance
- Custom rule creation
- Proactive engagement
- Post-attack analysis
```

### DDoS Cost Protection
```
Scenario: DDoS attack causes auto-scaling
Result: Increased AWS costs
Shield Advanced: Credits for scaling costs
Benefit: No financial impact from attacks
```

## Shield Standard vs Advanced

| Feature | Standard | Advanced |
|---------|----------|----------|
| **Cost** | FREE | $3,000/month |
| **Protection Level** | Basic | Enhanced |
| **DRT Access** | No | 24/7 |
| **Cost Protection** | No | Yes |
| **Layer 7** | No | Yes (with WAF) |
| **Attack Visibility** | Limited | Detailed |
| **Notifications** | No | Yes |
| **Use Case** | All customers | High-value applications |

## When to Use Shield

### Shield Standard (Automatic)
```
✅ All AWS customers (free)
✅ Basic DDoS protection
✅ CloudFront, Route 53, ELB
✅ No action required
```

### Shield Advanced
```
✅ High-value applications
✅ Need 24/7 DRT support
✅ Require cost protection
✅ Need detailed attack visibility
✅ Compliance requires enhanced DDoS protection
✅ Frequent DDoS targets
```

## Keywords to Identify Shield

- "DDoS protection"
- "Distributed Denial of Service"
- "Layer 3/4 protection"
- "Network flood"
- "Volumetric attack"
- "SYN flood"
- "UDP reflection"
- "Always-on protection"

## Common Exam Scenarios

### Scenario 1: Basic DDoS Protection
**Question**: Protect CloudFront distribution from DDoS attacks

**Answer**: Shield Standard (automatic, no action needed)

**Why**:
- Free and automatic
- CloudFront has Shield Standard by default
- Protects against common DDoS attacks
- No configuration required

### Scenario 2: Enhanced DDoS Protection
**Question**: Mission-critical application needs 24/7 DDoS support and cost protection

**Answer**: Enable Shield Advanced

**Why**:
- 24/7 DRT access
- DDoS cost protection
- Enhanced protection
- Detailed attack visibility

### Scenario 3: Layer 7 DDoS
**Question**: Protect against application-layer DDoS attacks

**Answer**: Shield Advanced + AWS WAF

**Why**:
- Shield protects Layer 3/4
- WAF protects Layer 7
- Combined protection
- DRT can help configure WAF rules

### Scenario 4: Cost Concern
**Question**: Small startup needs DDoS protection but has limited budget

**Answer**: Use Shield Standard (free)

**Why**:
- Free for all customers
- Automatic protection
- Sufficient for most use cases
- Shield Advanced is expensive ($3,000/month)

## Shield + WAF + CloudFront Architecture

### Comprehensive Protection
```
Internet → CloudFront (Shield Standard) → WAF → ALB (Shield Standard) → EC2
           ↓                              ↓
    Layer 3/4 DDoS Protection    Layer 7 Attack Protection
```

### Benefits
```
- Multi-layer protection
- DDoS + application attacks
- Global edge protection
- Reduced latency
- Automatic mitigation
```

## Attack Types Protected

### Layer 3 (Network Layer)
```
- IP floods
- ICMP floods
- Fragmentation attacks
```

### Layer 4 (Transport Layer)
```
- SYN floods
- UDP floods
- TCP connection exhaustion
- Reflection attacks
```

### Layer 7 (Application Layer) - Shield Advanced + WAF
```
- HTTP floods
- Slowloris attacks
- DNS query floods
- Application-specific attacks
```

## Integration with Other Services

### CloudFront
```
- Automatic Shield Standard
- Global edge protection
- Absorbs attacks at edge
- Best for: Global applications
```

### Route 53
```
- Automatic Shield Standard
- DNS-level protection
- Query flood protection
- Best for: DNS availability
```

### Elastic Load Balancing
```
- Automatic Shield Standard
- Protects load balancers
- Regional protection
- Best for: Regional applications
```

### Global Accelerator
```
- Automatic Shield Standard
- Anycast IP protection
- Global network protection
- Best for: Global TCP/UDP applications
```

## Monitoring and Alerts

### CloudWatch Metrics (Shield Advanced)
```
Metrics:
- DDoSDetected
- DDoSAttackBitsPerSecond
- DDoSAttackPacketsPerSecond
- DDoSAttackRequestsPerSecond

Use for:
- Real-time monitoring
- Alerting
- Attack analysis
```

### SNS Notifications (Shield Advanced)
```
Alerts for:
- Attack detected
- Attack mitigated
- DRT engagement
- Custom thresholds
```

## Cost Considerations

### Shield Standard
```
Cost: FREE
Included: All AWS customers
No action required
```

### Shield Advanced
```
Cost: $3,000 per month per organization
Plus: Data transfer fees (first 1 TB free)

Additional costs:
- WAF rules (if used)
- CloudWatch metrics
- Data transfer

DDoS Cost Protection:
- Credits for scaling costs during attacks
- Can offset Shield Advanced cost
```

### When Shield Advanced is Worth It
```
✅ High-value applications (>$3,000/month revenue)
✅ Frequent DDoS targets
✅ Compliance requirements
✅ Need 24/7 support
✅ Cost of downtime > $3,000/month
```

## Limitations & Constraints

### Shield Standard
- **Basic protection only**: Common attacks
- **No DRT access**: Self-service only
- **Limited visibility**: Basic metrics
- **No cost protection**: Pay for scaling

### Shield Advanced
- **Expensive**: $3,000/month
- **1-year commitment**: Cannot cancel early
- **Limited to specific services**: CloudFront, Route 53, ELB, EC2 EIP, Global Accelerator
- **Requires WAF for Layer 7**: Additional cost

## Pros & Cons

### Shield Standard
**Pros**:
- Free
- Automatic
- No configuration
- Protects all customers
- Layer 3/4 protection

**Cons**:
- Basic protection only
- No DRT access
- Limited visibility
- No cost protection

### Shield Advanced
**Pros**:
- Enhanced protection
- 24/7 DRT access
- DDoS cost protection
- Detailed visibility
- Proactive engagement
- Attack forensics

**Cons**:
- Very expensive ($3,000/month)
- 1-year commitment
- Requires WAF for Layer 7
- Limited to specific services

---

# AWS Firewall Manager
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐
- **Centralized firewall management** across accounts
- Manages WAF, Shield Advanced, Security Groups, Network Firewall
- **Requires AWS Organizations**
- Enforces security policies across organization
- Automatic policy application to new accounts

## What Firewall Manager Does

### 1. Centralized Management
```
Single console to manage:
- AWS WAF rules
- AWS Shield Advanced protections
- VPC Security Groups
- AWS Network Firewall rules
- Route 53 Resolver DNS Firewall
```

### 2. Policy Enforcement
```
Create policies:
- Apply to all accounts
- Apply to specific OUs
- Apply to tagged resources
- Automatic compliance
```

### 3. Automatic Remediation
```
Non-compliant resources:
- Automatically detected
- Automatically remediated (optional)
- Notifications sent
- Compliance reporting
```

## Policy Types

### 1. WAF Policy
```
Centrally manage WAF rules:
- Apply to CloudFront distributions
- Apply to ALBs
- Apply to API Gateways
- Consistent protection across accounts
```

### 2. Shield Advanced Policy
```
Centrally manage Shield Advanced:
- Automatic enrollment of resources
- Consistent DDoS protection
- Centralized billing
```

### 3. Security Group Policy
```
Manage security groups:
- Common security group rules
- Audit security group rules
- Remediate non-compliant rules
- Prevent overly permissive rules
```

### 4. Network Firewall Policy
```
Manage Network Firewall:
- Centralized firewall rules
- Apply to VPCs
- Consistent network protection
```

### 5. DNS Firewall Policy
```
Manage Route 53 Resolver DNS Firewall:
- Block malicious domains
- Centralized DNS filtering
- Apply to VPCs
```

## How Firewall Manager Works

### Process Flow
```
1. Enable Firewall Manager (requires Organizations)
2. Designate Firewall Manager administrator account
3. Create security policies
4. Define policy scope (accounts, OUs, tags)
5. Firewall Manager applies policies automatically
6. Monitors compliance
7. Remediates non-compliance (optional)
```

### Policy Scope
```
Apply policies to:
- All accounts in organization
- Specific organizational units (OUs)
- Accounts with specific tags
- Resources with specific tags
```

## When to Use Firewall Manager

### ✅ Use Firewall Manager When
- Multiple AWS accounts (Organizations)
- Need centralized security management
- Want consistent security policies
- Automatic policy enforcement needed
- Compliance requires centralized control
- New accounts need automatic protection

### ❌ Don't Use Firewall Manager When
- Single AWS account → Manage directly
- Don't have AWS Organizations
- Simple security requirements
- Cost is primary concern

## Keywords to Identify Firewall Manager

- "Centralized firewall management"
- "Multiple accounts"
- "AWS Organizations"
- "Consistent security policies"
- "Automatic policy enforcement"
- "Centralized WAF management"
- "Security policy compliance"

## Common Exam Scenarios

### Scenario 1: Multi-Account WAF Management
**Question**: Manage WAF rules consistently across 100 AWS accounts

**Answer**: Use AWS Firewall Manager with WAF policy

**Why**:
- Centralized WAF management
- Automatic application to all accounts
- Consistent protection
- Simplified management

### Scenario 2: Automatic Security Group Compliance
**Question**: Ensure all security groups across accounts don't allow 0.0.0.0/0 on port 22

**Answer**: Use Firewall Manager with Security Group policy

**Why**:
- Centralized security group management
- Automatic compliance checking
- Automatic remediation
- Continuous monitoring

### Scenario 3: New Account Protection
**Question**: Automatically protect new AWS accounts with WAF and Shield Advanced

**Answer**: Use Firewall Manager policies for WAF and Shield Advanced

**Why**:
- Automatic policy application
- New accounts protected immediately
- Consistent security posture
- No manual configuration

## Firewall Manager vs Security Hub vs Config

| Service | Purpose | Scope | Remediation |
|---------|---------|-------|-------------|
| **Firewall Manager** | Centralized firewall management | Firewall rules, WAF, Shield | Automatic |
| **Security Hub** | Security posture management | All security findings | Manual/Custom |
| **Config** | Resource configuration compliance | All AWS resources | Manual/Custom |

**Use Together**:
```
Firewall Manager: Enforce firewall policies
Security Hub: Aggregate security findings
Config: Track configuration changes
```

## Integration with AWS Organizations

### Organizational Units (OUs)
```
Organization
├── Production OU
│   ├── Account A (WAF policy applied)
│   └── Account B (WAF policy applied)
├── Development OU
│   ├── Account C (Different policy)
│   └── Account D (Different policy)
└── Sandbox OU
    └── Account E (No policy)
```

### Policy Inheritance
```
- Policies applied at OU level
- All accounts in OU inherit policy
- New accounts automatically inherit
- Simplifies management
```

## Compliance and Reporting

### Compliance Dashboard
```
View:
- Compliant resources
- Non-compliant resources
- Policy violations
- Remediation status
```

### Notifications
```
SNS notifications for:
- Policy violations
- Remediation actions
- New non-compliant resources
```

### Reports
```
Generate reports:
- Compliance status
- Policy coverage
- Resource inventory
- Violation history
```

## Cost Considerations

### Pricing
```
Policy Fees:
- WAF Policy: $100 per policy per region per month
- Shield Advanced Policy: Included with Shield Advanced
- Security Group Policy: $100 per policy per region per month
- Network Firewall Policy: $100 per policy per region per month
- DNS Firewall Policy: $100 per policy per region per month

Plus underlying service costs (WAF, Shield, etc.)
```

### Cost Optimization
```
- Consolidate policies where possible
- Use OU-level policies (not account-level)
- Monitor and remove unused policies
- Consider cost vs. benefit
```

## Limitations & Constraints

- **Requires AWS Organizations**: Must be enabled
- **Regional**: Policies are region-specific
- **Administrator account**: One per organization
- **Policy limit**: 20 policies per account per region
- **Remediation**: Limited to supported actions

## Pros & Cons

**Pros**:
- Centralized management
- Automatic policy enforcement
- Multi-account support
- Automatic remediation
- Compliance monitoring
- New account protection

**Cons**:
- Requires AWS Organizations
- Can be expensive
- Regional policies
- Learning curve
- Limited to supported services

---

# AWS Network Firewall
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐
- **Managed network firewall** for VPCs
- **Stateful and stateless** filtering
- **Layer 3-7 protection**
- Intrusion prevention system (IPS)
- Deep packet inspection

## Key Features

### 1. Stateful Inspection
```
- Track connection state
- Allow return traffic automatically
- Protocol detection
- Application-layer filtering
```

### 2. Stateless Inspection
```
- Fast packet filtering
- No connection tracking
- Based on packet headers
- Lower latency
```

### 3. Intrusion Prevention (IPS)
```
- Signature-based detection
- Anomaly detection
- Block malicious traffic
- Suricata-compatible rules
```

### 4. Deep Packet Inspection
```
- Inspect packet payload
- Detect malware
- Block specific content
- Protocol validation
```

## Rule Types

### 1. Stateless Rules
```
Match criteria:
- Source/destination IP
- Source/destination port
- Protocol
- TCP flags

Actions:
- Pass
- Drop
- Forward to stateful engine
```

### 2. Stateful Rules
```
Types:
- 5-tuple rules (IP, port, protocol)
- Suricata-compatible rules
- Domain list rules

Actions:
- Pass
- Drop
- Alert
```

### 3. Domain List Rules
```
Allow/block based on domain names:
- example.com
- *.malicious.com
- Wildcard support
- HTTPS inspection
```

## Architecture

### Deployment Model
```
VPC
├── Firewall Subnet (AZ-1)
│   └── Network Firewall Endpoint
├── Firewall Subnet (AZ-2)
│   └── Network Firewall Endpoint
├── Application Subnet
│   └── EC2 Instances
└── Route Tables
    └── Routes to Firewall Endpoints
```

### Traffic Flow
```
Internet → IGW → Network Firewall → Application Subnet
Application Subnet → Network Firewall → IGW → Internet
```

## When to Use Network Firewall

### ✅ Use Network Firewall When
- Need VPC-level firewall
- Require IPS/IDS capabilities
- Need deep packet inspection
- Want to filter outbound traffic
- Require domain-based filtering
- Compliance requires network firewall

### ❌ Don't Use Network Firewall When
- Simple IP filtering → Use Security Groups, NACLs
- Web application protection → Use WAF
- DDoS protection → Use Shield
- Cost is primary concern → Use Security Groups

## Keywords to Identify Network Firewall

- "VPC firewall"
- "Network-level firewall"
- "Intrusion prevention"
- "IPS/IDS"
- "Deep packet inspection"
- "Outbound filtering"
- "Domain filtering"
- "Stateful firewall"

## Common Exam Scenarios

### Scenario 1: Outbound Traffic Filtering
**Question**: Block EC2 instances from accessing specific domains

**Answer**: Use AWS Network Firewall with domain list rules

**Why**:
- Domain-based filtering
- Outbound traffic control
- Deep packet inspection
- Centralized management

### Scenario 2: Intrusion Prevention
**Question**: Detect and block malicious traffic patterns in VPC

**Answer**: Use AWS Network Firewall with IPS rules

**Why**:
- Intrusion prevention system
- Signature-based detection
- Automatic blocking
- Layer 3-7 protection

### Scenario 3: Compliance Requirement
**Question**: Compliance requires network-level firewall with deep packet inspection

**Answer**: Deploy AWS Network Firewall in VPC

**Why**:
- Meets compliance requirements
- Deep packet inspection
- Centralized logging
- Audit trail

## Network Firewall vs Security Groups vs NACLs

| Feature | Network Firewall | Security Groups | NACLs |
|---------|------------------|-----------------|-------|
| **Layer** | 3-7 | 3-4 | 3-4 |
| **State** | Stateful + Stateless | Stateful | Stateless |
| **IPS** | Yes | No | No |
| **DPI** | Yes | No | No |
| **Domain Filtering** | Yes | No | No |
| **Cost** | $$$ | Free | Free |
| **Use Case** | Advanced filtering | Basic filtering | Subnet-level filtering |

**Combined Strategy**:
```
Network Firewall (VPC-level, advanced) +
Security Groups (Instance-level, basic) +
NACLs (Subnet-level, basic)
= Defense in depth
```

## Integration with Firewall Manager

### Centralized Management
```
Firewall Manager → Network Firewall Policies
                → Apply to multiple VPCs
                → Across multiple accounts
                → Automatic compliance
```

## Cost Considerations

### Pricing
```
Firewall Endpoint: $0.395 per hour per AZ
Data Processed: $0.065 per GB

Example (2 AZs):
Endpoints: 2 × $0.395 × 730 hours = $577/month
Data: 1000 GB × $0.065 = $65/month
Total: $642/month
```

### Cost Optimization
```
- Deploy only in required AZs
- Use stateless rules (faster, cheaper)
- Monitor data processing costs
- Consider Security Groups for simple rules
```

## Limitations & Constraints

- **VPC-based**: One firewall per VPC
- **Regional**: Deploy per region
- **Endpoint per AZ**: Required for HA
- **Performance**: Depends on rules complexity
- **Cost**: Can be expensive at scale

## Pros & Cons

**Pros**:
- Managed service
- Stateful and stateless
- IPS/IDS capabilities
- Deep packet inspection
- Domain filtering
- Multi-AZ support
- Centralized logging

**Cons**:
- Expensive
- Complex setup
- Performance overhead
- VPC-specific
- Learning curve

---

# AWS Artifact
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐
- **Compliance reports and agreements** portal
- Self-service access to AWS compliance documentation
- **No cost** - free service
- On-demand access to security and compliance reports

## What Artifact Provides

### 1. Compliance Reports
```
Available reports:
- SOC 1, 2, 3
- PCI DSS
- ISO 27001, 27017, 27018
- FedRAMP
- HIPAA BAA
- GDPR
- And many more...
```

### 2. Agreements
```
- AWS Business Associate Addendum (BAA)
- Non-Disclosure Agreement (NDA)
- Other compliance agreements
```

## How Artifact Works

### Process
```
1. Log in to AWS Console
2. Navigate to AWS Artifact
3. Browse available reports
4. Accept terms (if required)
4. Download reports
5. Use for compliance audits
```

## When to Use Artifact

### ✅ Use Artifact When
- Need compliance documentation
- Preparing for audit
- Customer requests compliance proof
- Due diligence requirements
- Compliance certification needed

### ❌ Don't Use Artifact When
- Need actual security services → Use GuardDuty, etc.
- Need compliance scanning → Use Security Hub
- Need configuration compliance → Use Config

## Keywords to Identify Artifact

- "Compliance reports"
- "Audit documentation"
- "SOC reports"
- "PCI DSS documentation"
- "ISO certification"
- "Compliance documentation"
- "Download compliance reports"

## Common Exam Scenarios

### Scenario 1: Audit Preparation
**Question**: Auditor requests AWS SOC 2 report
**Answer**: Download SOC 2 report from AWS Artifact

**Why**:
- Self-service access
- Official AWS compliance reports
- No cost
- Immediate availability

### Scenario 2: HIPAA Compliance
**Question**: Healthcare company needs to sign BAA (Business Associate Agreement) with AWS

**Answer**: Sign BAA through AWS Artifact

**Why**:
- HIPAA BAA available in Artifact
- Electronic signature
- Required for HIPAA compliance
- No manual process needed

### Scenario 3: Customer Due Diligence
**Question**: Customer requests proof of AWS PCI DSS compliance

**Answer**: Download PCI DSS Attestation of Compliance (AOC) from AWS Artifact

**Why**:
- Official compliance documentation
- Self-service download
- Shareable with customers
- Up-to-date reports

## Artifact Reports vs Artifact Agreements

### Artifact Reports
```
Purpose: Compliance documentation
Content: Third-party audit reports
Examples: SOC, PCI DSS, ISO
Use: Provide to auditors, customers
Access: Download anytime
```

### Artifact Agreements
```
Purpose: Legal agreements
Content: Contracts, BAAs, NDAs
Examples: HIPAA BAA, NDA
Use: Sign to enable compliance features
Access: Review and accept
```

## Cost Considerations

### Pricing
```
AWS Artifact: FREE
- No charge for access
- No charge for downloads
- No charge for agreements
- Unlimited access
```

## Limitations & Constraints

- **AWS compliance only**: Not for your application compliance
- **Documentation only**: Not a security service
- **Self-service**: No AWS assistance in interpretation
- **NDA required**: Some reports require NDA acceptance

## Pros & Cons

**Pros**:
- Free service
- Self-service access
- Official compliance reports
- On-demand availability
- Electronic agreements
- No waiting for AWS

**Cons**:
- Documentation only (not a service)
- Requires understanding of compliance
- Some reports require NDA
- AWS compliance, not yours

---

# AWS Audit Manager
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐
- **Automated audit preparation** service
- Continuous compliance assessment
- Pre-built frameworks (PCI DSS, HIPAA, GDPR, etc.)
- Evidence collection automation
- Audit-ready reports

## What Audit Manager Does

### 1. Continuous Assessment
```
Automatically collects evidence:
- AWS Config rules
- CloudTrail logs
- Security Hub findings
- AWS API calls
- Manual evidence uploads
```

### 2. Pre-built Frameworks
```
Available frameworks:
- PCI DSS
- HIPAA
- GDPR
- SOC 2
- ISO 27001
- CIS AWS Foundations Benchmark
- Custom frameworks
```

### 3. Evidence Collection
```
Automated evidence from:
- AWS Config (configuration compliance)
- CloudTrail (API activity)
- Security Hub (security findings)
- CloudWatch (logs and metrics)
- Manual uploads (screenshots, documents)
```

### 4. Audit Reports
```
Generate reports:
- Evidence summary
- Compliance status
- Control assessments
- Audit-ready format
- Shareable with auditors
```

## How Audit Manager Works

### Process Flow
```
1. Enable Audit Manager
2. Select compliance framework (e.g., PCI DSS)
3. Create assessment
4. Audit Manager collects evidence automatically
5. Review evidence and controls
6. Add manual evidence (if needed)
7. Generate audit report
8. Share with auditors
```

## Key Components

### 1. Frameworks
- Pre-built compliance frameworks
- Industry standards (PCI DSS, HIPAA)
- Custom frameworks (create your own)

### 2. Controls
- Individual compliance requirements
- Mapped to AWS services
- Evidence collection rules

### 3. Assessments
- Instance of a framework
- Specific to your environment
- Tracks compliance over time

### 4. Evidence
- Proof of compliance
- Automatically collected
- Manually uploaded
- Timestamped and immutable

## When to Use Audit Manager

### ✅ Use Audit Manager When
- Preparing for compliance audits
- Need continuous compliance monitoring
- Want automated evidence collection
- Multiple compliance frameworks required
- Reduce audit preparation time
- Need audit-ready reports

### ❌ Don't Use Audit Manager When
- Don't have compliance requirements
- Simple compliance needs → Use Config
- Cost is primary concern
- Not preparing for audits

## Keywords to Identify Audit Manager

- "Audit preparation"
- "Compliance assessment"
- "Evidence collection"
- "PCI DSS audit"
- "HIPAA audit"
- "Automated compliance"
- "Audit-ready reports"
- "Continuous compliance"

## Common Exam Scenarios

### Scenario 1: PCI DSS Audit Preparation
**Question**: Automate evidence collection for PCI DSS audit

**Answer**: Use AWS Audit Manager with PCI DSS framework

**Why**:
- Pre-built PCI DSS framework
- Automated evidence collection
- Continuous monitoring
- Audit-ready reports

### Scenario 2: Multiple Compliance Frameworks
**Question**: Company must comply with HIPAA, PCI DSS, and SOC 2

**Answer**: Create multiple assessments in Audit Manager (one per framework)

**Why**:
- Supports multiple frameworks
- Centralized evidence collection
- Single service for all audits
- Reduces manual effort

### Scenario 3: Continuous Compliance Monitoring
**Question**: Monitor compliance status continuously, not just during audits

**Answer**: Use Audit Manager with continuous assessments

**Why**:
- Continuous evidence collection
- Real-time compliance status
- Proactive issue identification
- Always audit-ready

## Audit Manager vs Security Hub vs Config

| Service | Purpose | Focus | Output |
|---------|---------|-------|--------|
| **Audit Manager** | Audit preparation | Compliance frameworks | Audit reports |
| **Security Hub** | Security posture | Security findings | Security score |
| **Config** | Configuration compliance | Resource configuration | Compliance status |

**Use Together**:
```
Config: Track resource configurations
Security Hub: Aggregate security findings
Audit Manager: Prepare for audits (uses Config + Security Hub data)
```

## Integration with AWS Services

### Data Sources
```
Audit Manager collects from:
- AWS Config (configuration compliance)
- CloudTrail (API activity)
- Security Hub (security findings)
- CloudWatch Logs (application logs)
- Manual uploads (documents, screenshots)
```

### Evidence Types
```
Automated:
- Config rule compliance
- CloudTrail events
- Security Hub findings
- API calls

Manual:
- Policy documents
- Screenshots
- Third-party reports
- Signed attestations
```

## Custom Frameworks

### Create Custom Framework
```
1. Define controls
2. Map to AWS services
3. Specify evidence collection
4. Set assessment frequency
5. Deploy to organization
```

### Use Cases
```
- Internal compliance requirements
- Industry-specific regulations
- Custom security standards
- Vendor requirements
```

## Delegation and Collaboration

### Roles
```
Assessment Owner: Creates and manages assessments
Reviewer: Reviews evidence
Contributor: Uploads manual evidence
Auditor: Read-only access to reports
```

### Multi-Account
```
With AWS Organizations:
- Delegate Audit Manager administrator
- Collect evidence across accounts
- Centralized compliance view
- Organization-wide assessments
```

## Cost Considerations

### Pricing
```
Evidence Collection: $1.25 per evidence per month
Manual Evidence: Free

Example:
1,000 automated evidence items × $1.25 = $1,250/month
100 manual evidence items × $0 = $0
Total: $1,250/month
```

### Cost Optimization
```
- Use only needed frameworks
- Archive completed assessments
- Leverage manual evidence (free)
- Monitor evidence collection
- Delete unused assessments
```

## Limitations & Constraints

- **Regional service**: Enable per region
- **Evidence retention**: 7 years
- **Frameworks**: Limited to supported frameworks
- **Evidence sources**: Limited to AWS services + manual
- **Assessment limit**: 100 per account per region

## Pros & Cons

**Pros**:
- Automated evidence collection
- Pre-built frameworks
- Continuous compliance monitoring
- Audit-ready reports
- Multi-account support
- Reduces manual effort
- Immutable evidence

**Cons**:
- Can be expensive
- Limited to AWS services
- Requires understanding of frameworks
- Regional service
- Learning curve

---

# AWS Resource Access Manager (RAM)
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐
- **Share AWS resources** across accounts
- No need to duplicate resources
- **Free service** (pay only for resources)
- Integration with AWS Organizations
- Secure resource sharing

## What Can Be Shared

### Commonly Shared Resources
```
✅ VPC Subnets (most common)
✅ Transit Gateway
✅ Route 53 Resolver Rules
✅ License Manager Configurations
✅ Aurora DB Clusters
✅ CodeBuild Projects
✅ EC2 Dedicated Hosts
✅ Resource Groups
✅ Systems Manager Documents
✅ And many more...
```

### Most Important for Exam
```
1. VPC Subnets (share subnets across accounts)
2. Transit Gateway (centralized network hub)
3. Route 53 Resolver Rules (DNS forwarding)
```

## How RAM Works

### Sharing Process
```
1. Resource owner creates resource share
2. Specify resources to share
3. Specify principals (accounts, OUs, organization)
4. Principals accept share (if outside organization)
5. Principals can use shared resources
```

### Resource Share Components
```
- Name and description
- Resources (what to share)
- Principals (who to share with)
- Permissions (what they can do)
```

## VPC Subnet Sharing (Most Common Use Case) ⭐⭐⭐⭐⭐

### Architecture
```
Account A (Owner):
- VPC (10.0.0.0/16)
- Subnet 1 (10.0.1.0/24) - Shared with Account B
- Subnet 2 (10.0.2.0/24) - Shared with Account C

Account B (Participant):
- Can launch EC2 in Subnet 1
- Cannot modify subnet
- Cannot see other subnets

Account C (Participant):
- Can launch EC2 in Subnet 2
- Cannot modify subnet
- Cannot see other subnets
```

### Benefits
```
✅ Centralized VPC management
✅ Shared networking infrastructure
✅ Reduced complexity
✅ Cost optimization (single NAT Gateway, etc.)
✅ Simplified network architecture
```

### Use Cases
```
- Multi-account applications in same VPC
- Centralized networking
- Shared services (Active Directory, monitoring)
- Microservices across accounts
```

## Transit Gateway Sharing

### Architecture
```
Account A (Owner):
- Transit Gateway (central hub)
- Shared with all accounts in organization

Account B, C, D (Participants):
- Attach VPCs to shared Transit Gateway
- Inter-VPC communication
- Centralized routing
```

### Benefits
```
✅ Centralized network hub
✅ Simplified network topology
✅ Reduced Transit Gateway costs
✅ Consistent routing policies
```

## Route 53 Resolver Rules Sharing

### Use Case
```
Account A (Owner):
- Route 53 Resolver Rules (forward DNS to on-premises)
- Shared with organization

Account B, C, D (Participants):
- Use shared resolver rules
- Consistent DNS resolution
- No duplicate configuration
```

## When to Use RAM

### ✅ Use RAM When
- Need to share resources across accounts
- Want centralized resource management
- Multiple accounts need same resource
- Cost optimization (avoid duplication)
- Simplified management
- Multi-account architecture

### ❌ Don't Use RAM When
- Single AWS account
- Resources don't support sharing
- Need complete isolation
- Simple use case

## Keywords to Identify RAM

- "Share resources"
- "Cross-account access"
- "Shared VPC"
- "Shared subnet"
- "Centralized resources"
- "Multi-account"
- "Resource sharing"
- "Avoid duplication"

## Common Exam Scenarios

### Scenario 1: Shared VPC Subnets
**Question**: Multiple AWS accounts need to launch EC2 instances in same VPC

**Answer**: Use AWS RAM to share VPC subnets

**Why**:
- Centralized VPC management
- Accounts can launch resources in shared subnets
- No VPC peering needed
- Simplified networking

### Scenario 2: Centralized Transit Gateway
**Question**: 20 AWS accounts need to communicate via Transit Gateway

**Answer**: Create Transit Gateway in one account, share via RAM

**Why**:
- Single Transit Gateway (cost optimization)
- All accounts can attach VPCs
- Centralized routing
- Simplified management

### Scenario 3: Shared DNS Resolution
**Question**: All accounts need to resolve on-premises DNS names

**Answer**: Create Route 53 Resolver Rules in one account, share via RAM

**Why**:
- Centralized DNS configuration
- Consistent resolution across accounts
- No duplicate rules
- Simplified management

### Scenario 4: Multi-Account Application
**Question**: Application spans multiple accounts but needs to be in same subnet

**Answer**: Share VPC subnet via RAM

**Why**:
- Application components in same subnet
- Simplified networking
- No cross-account networking complexity
- Centralized security groups

## RAM with AWS Organizations

### Automatic Sharing
```
With Organizations:
- No acceptance required
- Automatic trust
- Share with entire organization
- Share with specific OUs
- Share with specific accounts
```

### Without Organizations
```
- Manual acceptance required
- Share with specific accounts only
- Less automated
```

## Permissions and Security

### Owner Permissions
```
Resource owner can:
✅ Create and delete resources
✅ Modify resources
✅ Share resources
✅ Revoke shares
✅ Full control
```

### Participant Permissions
```
Participants can:
✅ Use shared resources
✅ Launch resources (e.g., EC2 in shared subnet)
❌ Cannot modify shared resources
❌ Cannot delete shared resources
❌ Cannot share with others
```

### Security Considerations
```
- Participants cannot see other participants' resources
- Network isolation maintained
- Security groups are account-specific
- IAM policies still apply
```

## Monitoring and Auditing

### CloudTrail Integration
```
Logs:
- Resource share creation
- Resource share acceptance
- Resource share deletion
- Principal associations
```

### CloudWatch Events
```
Events for:
- Share created
- Share accepted
- Share rejected
- Share deleted
```

## Cost Considerations

### Pricing
```
AWS RAM: FREE
- No charge for RAM service
- Pay only for shared resources
- No data transfer charges for sharing

Example:
Shared NAT Gateway: $0.045/hour (single cost)
vs.
NAT Gateway per account: $0.045/hour × 10 accounts = $0.45/hour
Savings: 90%
```

### Cost Optimization
```
✅ Share expensive resources (NAT Gateway, Transit Gateway)
✅ Avoid resource duplication
✅ Centralized management reduces operational costs
✅ Shared networking infrastructure
```

## Limitations & Constraints

- **Supported resources only**: Not all resources can be shared
- **Regional**: Shares are region-specific
- **Same region**: Can only share within same region
- **Ownership**: Owner retains full control
- **Deletion**: Owner can delete shared resources (impacts participants)

## Pros & Cons

**Pros**:
- Free service
- Reduces resource duplication
- Centralized management
- Cost optimization
- Simplified architecture
- Integration with Organizations
- Secure sharing

**Cons**:
- Limited to supported resources
- Regional (not global)
- Owner dependency
- Learning curve
- Requires Organizations for best experience

---

# Security Services Comparison Matrix
[BackToTop](#table-of-contents)
## Quick Reference: When to Use Which Service

| Requirement | Service | Keywords |
|-------------|---------|----------|
| **User authentication (AWS)** | IAM | "AWS access", "permissions", "roles" |
| **User authentication (apps)** | Cognito | "Mobile app", "web app users", "social login" |
| **Employee SSO** | IAM Identity Center | "Single sign-on", "multiple accounts", "employees" |
| **Active Directory** | Directory Service | "Microsoft AD", "domain join", "Windows" |
| **Encryption keys** | KMS | "Encrypt data", "key management", "FIPS 140-2 Level 2" |
| **Highest security keys** | CloudHSM | "FIPS 140-2 Level 3", "single-tenant", "exclusive control" |
| **SSL/TLS certificates** | ACM | "HTTPS", "SSL certificate", "CloudFront certificate" |
| **Secrets management** | Secrets Manager | "Database credentials", "automatic rotation", "API keys" |
| **Threat detection** | GuardDuty | "Malicious activity", "compromised instance", "threat detection" |
| **Vulnerability scanning** | Inspector | "CVE", "software vulnerabilities", "container scanning" |
| **Sensitive data discovery** | Macie | "PII", "sensitive data in S3", "data classification" |
| **Security aggregation** | Security Hub | "Centralized security", "compliance checks", "security score" |
| **Security investigation** | Detective | "Root cause", "forensics", "investigate findings" |
| **Web application firewall** | WAF | "SQL injection", "XSS", "Layer 7", "rate limiting" |
| **DDoS protection** | Shield | "DDoS", "volumetric attack", "Layer 3/4 protection" |
| **Centralized firewall** | Firewall Manager | "Multi-account firewall", "centralized WAF", "Organizations" |
| **VPC firewall** | Network Firewall | "VPC firewall", "IPS", "deep packet inspection", "domain filtering" |
| **Compliance reports** | Artifact | "SOC report", "PCI DSS documentation", "audit reports" |
| **Audit preparation** | Audit Manager | "Audit preparation", "evidence collection", "compliance assessment" |
| **Resource sharing** | RAM | "Share resources", "shared VPC", "cross-account" |

---

# Common Exam Patterns and Decision Trees
[BackToTop](#table-of-contents)
## Authentication Decision Tree

```
Who needs access?
├─ AWS services/resources? → IAM Roles
├─ AWS account users (employees)?
│  ├─ Single account? → IAM Users
│  └─ Multiple accounts? → IAM Identity Center
├─ Application end users?
│  ├─ Web/mobile app? → Cognito
│  └─ Internal employees? → Directory Service + IAM Identity Center
└─ On-premises Active Directory? → Directory Service
```

## Encryption Decision Tree

```
What needs encryption?
├─ Data at rest?
│  ├─ Standard encryption? → KMS
│  ├─ Highest security (Level 3)? → CloudHSM
│  └─ Database credentials? → Secrets Manager
├─ Data in transit?
│  ├─ HTTPS/SSL? → ACM
│  └─ Custom encryption? → KMS or CloudHSM
└─ Encryption keys?
   ├─ AWS managed? → KMS
   └─ You manage exclusively? → CloudHSM
```

## Threat Detection Decision Tree

```
What do you need to detect?
├─ Malicious activity/threats? → GuardDuty
├─ Software vulnerabilities? → Inspector
├─ Sensitive data (PII)? → Macie
├─ All security findings? → Security Hub
└─ Investigate incidents? → Detective
```

## Firewall Decision Tree

```
What layer needs protection?
├─ Layer 7 (Application)?
│  ├─ Web application? → WAF
│  └─ API? → WAF
├─ Layer 3/4 (Network)?
│  ├─ DDoS? → Shield
│  ├─ VPC-level? → Network Firewall
│  └─ Instance-level? → Security Groups
└─ Multi-account management? → Firewall Manager
```

## Compliance Decision Tree

```
What compliance need?
├─ Download compliance reports? → Artifact
├─ Prepare for audit? → Audit Manager
├─ Continuous compliance monitoring?
│  ├─ Security compliance? → Security Hub
│  └─ Configuration compliance? → Config
└─ Evidence collection? → Audit Manager
```

---

# Critical Exam Tips for Security Services
[BackToTop](#table-of-contents)
## 1. IAM Best Practices (Always Tested) ⭐⭐⭐⭐⭐

### Must Remember
```
✅ Enable MFA on root account (mandatory)
✅ Don't use root account for daily tasks
✅ Use roles for EC2, not access keys
✅ Least privilege principle
✅ One user per person (no sharing)
✅ Use groups for permissions
✅ Rotate credentials regularly
✅ Use IAM Access Analyzer
```

### Common Mistakes
```
❌ Hardcoding credentials in code
❌ Using root account
❌ Overly permissive policies
❌ Sharing credentials
❌ Not enabling MFA
```

## 2. Cognito vs IAM vs Directory Service

### Quick Decision
```
End users (millions)? → Cognito
AWS account access? → IAM
Employees (thousands)? → IAM Identity Center
Active Directory? → Directory Service
```

## 3. KMS vs CloudHSM vs Secrets Manager

### Quick Decision
```
Encryption keys (most cases)? → KMS
FIPS Level 3 required? → CloudHSM
Database credentials? → Secrets Manager
SSL/TLS certificates? → ACM
```

### Key Points
```
KMS:
- FIPS 140-2 Level 2
- Multi-tenant
- $1/month per key
- Most common choice

CloudHSM:
- FIPS 140-2 Level 3
- Single-tenant
- $1.45/hour per HSM
- Highest security

Secrets Manager:
- Automatic rotation
- $0.40/month per secret
- RDS integration
```

## 4. GuardDuty vs Inspector vs Macie

### Quick Decision
```
Threat detection? → GuardDuty
Vulnerability scanning? → Inspector
Sensitive data discovery? → Macie
```

### Remember
```
GuardDuty: "Am I under attack?"
Inspector: "Is my software vulnerable?"
Macie: "Where is my sensitive data?"
Detective: "What happened and why?"
Security Hub: "Overall security posture"
```

## 5. WAF vs Shield vs Network Firewall

### Layer Protection
```
Layer 7 (Application): WAF
Layer 3/4 (Network): Shield
Layer 3-7 (VPC): Network Firewall
```

### Cost Consideration
```
Shield Standard: FREE (automatic)
Shield Advanced: $3,000/month (only if needed)
WAF: ~$5-50/month (depends on rules)
Network Firewall: ~$600+/month (expensive)
```

## 6. Multi-Account Patterns

### Centralized Management
```
Security Hub: Aggregate findings
Firewall Manager: Centralized firewall policies
IAM Identity Center: SSO across accounts
RAM: Share resources
Audit Manager: Organization-wide audits
```

### Requires AWS Organizations
```
✅ IAM Identity Center
✅ Firewall Manager
✅ Security Hub (multi-account)
✅ GuardDuty (multi-account)
✅ RAM (best experience)
```

## 7. Regional vs Global Services

### Global Services
```
- IAM (global)
- CloudFront (global, but WAF in us-east-1)
- Route 53 (global)
- WAF for CloudFront (must be us-east-1)
```

### Regional Services
```
- KMS (regional)
- Secrets Manager (regional)
- GuardDuty (regional)
- Inspector (regional)
- Macie (regional)
- Security Hub (regional)
- WAF for ALB/API Gateway (regional)
```

## 8. Cost Optimization Patterns

### Free Services
```
✅ IAM
✅ IAM Identity Center
✅ Shield Standard
✅ Artifact
✅ RAM
```

### Expensive Services (Use Only When Needed)
```
💰 Shield Advanced ($3,000/month)
💰 CloudHSM ($1.45/hour per HSM)
💰 Network Firewall ($600+/month)
💰 Macie (can add up at scale)
```

### Cost-Effective Alternatives
```
Instead of Shield Advanced → Use Shield Standard + WAF
Instead of CloudHSM → Use KMS (unless Level 3 required)
Instead of Network Firewall → Use Security Groups + NACLs (if sufficient)
Instead of Secrets Manager → Use Parameter Store (if no rotation needed)
```

## 9. Compliance Scenarios

### Common Compliance Requirements
```
HIPAA:
- Sign BAA (Artifact)
- Encrypt data (KMS)
- Audit logs (CloudTrail)
- Evidence collection (Audit Manager)

PCI DSS:
- WAF (protect web apps)
- Encryption (KMS)
- Audit preparation (Audit Manager)
- Compliance reports (Artifact)

GDPR:
- Data discovery (Macie)
- Encryption (KMS)
- Access control (IAM)
- Data residency (Outposts if needed)
```

## 10. Common Exam Traps

### Trap 1: Cognito vs IAM
```
❌ Wrong: Use IAM for mobile app users
✅ Right: Use Cognito for mobile app users
```

### Trap 2: KMS vs CloudHSM
```
❌ Wrong: Use CloudHSM for standard encryption
✅ Right: Use KMS (CloudHSM only if Level 3 required)
```

### Trap 3: GuardDuty vs Inspector
```
❌ Wrong: Use Inspector for threat detection
✅ Right: Use GuardDuty for threats, Inspector for vulnerabilities
```

### Trap 4: WAF vs Shield
```
❌ Wrong: Use Shield for SQL injection
✅ Right: Use WAF for Layer 7 attacks, Shield for DDoS
```

### Trap 5: Secrets Manager vs Parameter Store
```
❌ Wrong: Use Secrets Manager for all configuration
✅ Right: Secrets Manager for secrets with rotation, Parameter Store for config
```

---

# Final Security Exam Checklist
[BackToTop](#table-of-contents)
## Before the Exam

### ✅ Core Concepts to Master
- [ ] IAM (users, groups, roles, policies)
- [ ] IAM policy evaluation logic (explicit deny wins)
- [ ] Cognito (User Pools vs Identity Pools)
- [ ] KMS (envelope encryption, key policies)
- [ ] GuardDuty, Inspector, Macie differences
- [ ] WAF, Shield, Network Firewall layers
- [ ] Multi-account security (Organizations integration)

### ✅ Decision Trees to Remember
- [ ] Authentication (IAM vs Cognito vs Directory Service)
- [ ] Encryption (KMS vs CloudHSM vs Secrets Manager)
- [ ] Threat detection (GuardDuty vs Inspector vs Macie)
- [ ] Firewall (WAF vs Shield vs Network Firewall)

### ✅ Key Numbers to Memorize
- [ ] KMS: FIPS 140-2 Level 2, $1/month per key
- [ ] CloudHSM: FIPS 140-2 Level 3, $1.45/hour per HSM
- [ ] Shield Advanced: $3,000/month
- [ ] Secrets Manager: $0.40/month per secret
- [ ] GuardDuty: 30-day free trial
- [ ] Inspector: 15-day free trial

### ✅ Common Patterns
- [ ] EC2 accessing S3 → IAM Role
- [ ] Mobile app users → Cognito
- [ ] Multiple AWS accounts → IAM Identity Center
- [ ] Encrypt S3 data → KMS (SSE-KMS)
- [ ] Detect compromised instance → GuardDuty
- [ ] Scan for vulnerabilities → Inspector
- [ ] Find PII in S3 → Macie
- [ ] Protect web app → WAF
- [ ] DDoS protection → Shield

---

# Summary: Most Important Services for SAA-C03
[BackToTop](#table-of-contents)
## Must Know (⭐⭐⭐⭐⭐)
1. **IAM** - Foundation of AWS security
2. **KMS** - Encryption key management
3. **Cognito** - Application user authentication
4. **GuardDuty** - Threat detection
5. **WAF** - Web application firewall
6. **Shield** - DDoS protection

## Should Know (⭐⭐⭐⭐)
7. **Secrets Manager** - Credential management
8. **ACM** - SSL/TLS certificates
9. **Inspector** - Vulnerability scanning
10. **Security Hub** - Centralized security
11. **IAM Identity Center** - Multi-account SSO
12. **Directory Service** - Active Directory

## Good to Know (⭐⭐⭐)
13. **Macie** - Sensitive data discovery
14. **Detective** - Security investigation
15. **CloudHSM** - Highest security encryption
16. **Firewall Manager** - Centralized firewall management
17. **Network Firewall** - VPC-level firewall
18. **RAM** - Resource sharing

## Awareness Level (⭐⭐)
19. **Artifact** - Compliance reports
20. **Audit Manager** - Audit preparation

---


**Key Takeaway**: Focus on understanding **when to use which service** based on the scenario. Most questions will test your ability to choose the right service for the right use case, not deep technical implementation details.

**Good luck!** 💪

[BackToTop](#table-of-contents)