## AWS Migration and Transfer - SAA-C03 Exam Guide

---

>⚠️ These notes were created using Anthropic's AI Models (Opus 4.5 and 4.6).

---

## Table of Contents
1. [AWS DataSync](#aws-datasync)
2. [AWS Database Migration Service (DMS)](#aws-dms)
3. [AWS Server Migration Service (SMS)](#aws-sms)
4. [AWS Application Discovery Service](#aws-application-discovery-service)
5. [AWS Migration Hub](#aws-migration-hub)
6. [AWS Transfer Family](#aws-transfer-family)
7. [AWS Application Migration Service (MGN)](#aws-application-migration-service)
8. [Migration Strategies and Patterns](#migration-strategies)

---

# AWS DataSync 
⭐⭐⭐⭐⭐ (CRITICAL)
[BackToTop](#table-of-contents)

## What is DataSync?
```
- Online data transfer service
- Move large amounts of data to/from AWS
- Automated, scheduled transfers
- Data validation (integrity checks)
- Up to 10x faster than open-source tools
- Agent-based (on-premises) or agentless (AWS-to-AWS)
```

## How DataSync Works 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
On-Premises to AWS:
On-Premises Storage
    ↓
DataSync Agent (VM on-premises)
    ↓
AWS DataSync Service (cloud)
    ↓
Destination (S3, EFS, FSx)

AWS to AWS (No Agent Needed):
S3 Bucket → DataSync → EFS
EFS → DataSync → FSx
S3 → DataSync → S3 (different region/account)
```

## DataSync Sources and Destinations 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Sources
```
On-Premises:
✅ NFS (Network File System)
✅ SMB (Server Message Block)
✅ HDFS (Hadoop Distributed File System)
✅ Object storage (S3-compatible)
✅ Self-managed object storage

AWS:
✅ Amazon S3
✅ Amazon EFS
✅ Amazon FSx for Windows
✅ Amazon FSx for Lustre
✅ Amazon FSx for OpenZFS
✅ Amazon FSx for NetApp ONTAP
```

### Destinations
```
✅ Amazon S3 (all storage classes)
✅ Amazon EFS
✅ Amazon FSx for Windows
✅ Amazon FSx for Lustre
✅ Amazon FSx for OpenZFS
✅ Amazon FSx for NetApp ONTAP
```

## DataSync Key Features 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### 1. DataSync Agent
```
What is DataSync Agent?
- Software agent (VM)
- Installed on-premises
- Connects to DataSync service
- Manages data transfer

Deployment:
- VMware ESXi
- Microsoft Hyper-V
- Linux KVM
- Amazon EC2 (for AWS-to-AWS)

Note: No agent needed for AWS-to-AWS transfers
```

### 2. Scheduling 
⭐⭐⭐⭐⭐
```
Transfer Options:
- One-time transfer
- Scheduled (hourly, daily, weekly)
- Continuous (ongoing sync)

Use Cases:
✅ One-time migration
✅ Regular backups
✅ Ongoing replication
✅ Disaster recovery sync
```

### 3. Data Validation 
⭐⭐⭐⭐
```
What is Data Validation?
- Verify data integrity after transfer
- Checksum verification
- Ensure no corruption

Options:
- Verify all data (slower, thorough)
- Verify only transferred data (faster)
- No verification (fastest)
```

### 4. Bandwidth Throttling 
⭐⭐⭐⭐
```
What is Bandwidth Throttling?
- Limit bandwidth used by DataSync
- Prevent impact on other traffic
- Schedule throttling (business hours)

Example:
Business hours: 100 Mbps limit
After hours: No limit (full speed)
```

### 5. Filtering 
⭐⭐⭐⭐
```
What is Filtering?
- Include/exclude specific files
- Pattern-based filtering
- Transfer only what you need

Example:
Include: *.csv, *.json
Exclude: *.tmp, *.log
```

## DataSync Security 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
Encryption:
✅ Encryption in transit (TLS)
✅ Encryption at rest (destination encryption)
✅ KMS integration

Access Control:
✅ IAM roles
✅ VPC endpoints (private transfer)
✅ No public Internet (if using Direct Connect/VPN)

Network Options:
- Public Internet (default)
- AWS Direct Connect (private, consistent)
- AWS VPN (encrypted, over Internet)
- VPC endpoints (private AWS network)
```

## DataSync vs Other Transfer Methods 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

| Method | Use Case | Speed | Cost |
|--------|----------|-------|------|
| **DataSync** | Online transfer, automation | Fast (10x) | $0.0125/GB |
| **Snow Family** | Offline, large (>10 TB) | Physical | Device fee |
| **S3 Transfer Acceleration** | Upload to S3 only | Fast | $0.04-0.08/GB |
| **Direct Connect** | Ongoing, high bandwidth | Consistent | Port + data |
| **Internet (CLI/SDK)** | Small, simple | Variable | Data transfer |

**Key Decision**:
```
Online transfer, automation needed → DataSync
Large data (>10 TB), limited network → Snow Family
Upload to S3 from global users → S3 Transfer Acceleration
Ongoing high bandwidth → Direct Connect
```

## DataSync Pricing
[BackToTop](#table-of-contents)
```
Data Transfer:
- $0.0125 per GB transferred

Example:
Transfer 100 TB:
100,000 GB × $0.0125 = $1,250

vs Snow Family (Snowball Edge):
Device fee: $300
Shipping: ~$100
Total: ~$400 (but offline, takes longer)

DataSync better for:
✅ Ongoing transfers
✅ Automated scheduling
✅ Smaller datasets
✅ Need data validation
```

## When to Use DataSync 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### ✅ Use DataSync When
- Online data transfer needed
- Automated/scheduled transfers
- Data validation required
- NFS/SMB to S3/EFS migration
- AWS-to-AWS transfers
- Ongoing replication
- Bandwidth throttling needed

### ❌ Don't Use DataSync When
- Very large data (>10 TB) + limited network → Snow Family
- Database migration → DMS
- Server migration → MGN
- Simple one-time small transfer → AWS CLI/SDK

## Keywords to Identify DataSync
[BackToTop](#table-of-contents)
```
"Online data transfer"
"NFS to S3"
"SMB to EFS"
"Automated transfer"
"Scheduled sync"
"Data validation"
"File system migration"
"On-premises to AWS storage"
```

## DataSync Common Exam Scenarios 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Scenario 1: Migrate NFS to EFS
```
Question: Migrate on-premises NFS file server to Amazon EFS

Answer: Use AWS DataSync

Why:
- DataSync supports NFS source
- EFS as destination
- Automated transfer
- Data validation
- Minimal downtime
```

### Scenario 2: Ongoing Backup to S3
```
Question: Automatically backup on-premises files to S3 daily

Answer: Use DataSync with scheduled transfer

Why:
- Scheduled transfers (daily)
- Automated
- Data validation
- Bandwidth throttling (business hours)
```

### Scenario 3: S3 to EFS Transfer
```
Question: Copy data from S3 bucket to EFS file system

Answer: Use DataSync (no agent needed)

Why:
- AWS-to-AWS transfer
- No agent required
- Fast and reliable
- Data validation
```

### Scenario 4: Large Data Migration with Limited Bandwidth
```
Question: Migrate 50 TB from on-premises, network is slow

Answer: Use Snow Family (not DataSync)

Why:
- 50 TB over slow network = weeks/months
- Snow Family: Physical device, faster
- DataSync: Would take too long
```

---

# AWS Database Migration Service (DMS) 
⭐⭐⭐⭐⭐ (CRITICAL)
[BackToTop](#table-of-contents)

## What is DMS?
```
- Managed database migration service
- Migrate databases to AWS
- Minimal downtime
- Source database stays operational
- Supports homogeneous and heterogeneous migrations
- Continuous Data Replication (CDC)
```

## How DMS Works 
⭐⭐⭐⭐⭐
```
Architecture:
Source DB → DMS Replication Instance → Target DB

Process:
1. Create replication instance (EC2-based)
2. Define source endpoint
3. Define target endpoint
4. Create migration task
5. Run migration

Source stays operational during migration!
```

## Migration Types 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### 1. Full Load Migration
```
What: Copy all existing data
When: Initial migration
Process:
1. DMS reads all data from source
2. Writes to target
3. One-time operation

Use Cases:
✅ Initial data load
✅ Small databases
✅ Can afford downtime
```

### 2. Full Load + CDC (Change Data Capture) 
⭐⭐⭐⭐⭐
```
What: Copy all data + ongoing changes
When: Minimal downtime migration
Process:
1. Full load (copy existing data)
2. CDC captures changes during load
3. Apply changes to target
4. Cutover when in sync

Use Cases:
✅ Production databases
✅ Minimal downtime required
✅ Large databases
✅ Most common approach
```

### 3. CDC Only
```
What: Replicate ongoing changes only
When: Target already has data
Process:
1. Target already populated
2. DMS captures changes from source
3. Applies to target continuously

Use Cases:
✅ Ongoing replication
✅ Disaster recovery
✅ Read replicas in different DB engine
```

## Homogeneous vs Heterogeneous Migration 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### Homogeneous Migration (Same DB Engine)
```
What: Same source and target DB engine
Examples:
- MySQL → MySQL (on-premises to RDS)
- Oracle → Oracle (on-premises to RDS)
- SQL Server → SQL Server

Process:
1. Use DMS directly
2. No schema conversion needed
3. Simpler migration

Why Simpler:
- Same data types
- Same schema structure
- No conversion needed
```

### Heterogeneous Migration (Different DB Engine) 
⭐⭐⭐⭐⭐
```
What: Different source and target DB engine
Examples:
- Oracle → Aurora PostgreSQL
- SQL Server → MySQL
- MySQL → DynamoDB

Process:
1. Use AWS Schema Conversion Tool (SCT) FIRST
2. Convert schema and code
3. Then use DMS for data migration

Two-Step Process:
Step 1: SCT (Schema Conversion Tool)
- Convert schema
- Convert stored procedures
- Convert views, triggers
- Identify incompatibilities

Step 2: DMS
- Migrate actual data
- CDC for ongoing changes

Key Exam Tip:
Heterogeneous = SCT first, then DMS
Homogeneous = DMS only
```

## AWS Schema Conversion Tool (SCT) 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
What is SCT?
- Convert database schema
- Different DB engines
- Installed locally (not a cloud service)
- Free tool

What SCT Converts:
✅ Tables and indexes
✅ Views
✅ Stored procedures
✅ Functions
✅ Triggers
✅ Data types

What SCT Reports:
✅ Conversion complexity
✅ Manual conversion needed
✅ Incompatible features

Supported Conversions:
Oracle → Aurora, MySQL, PostgreSQL
SQL Server → Aurora, MySQL, PostgreSQL
MySQL → Aurora, PostgreSQL
PostgreSQL → Aurora, MySQL
```

## DMS Supported Sources and Targets 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Sources
```
On-Premises/EC2:
✅ Oracle
✅ SQL Server
✅ MySQL
✅ PostgreSQL
✅ MariaDB
✅ MongoDB
✅ SAP ASE
✅ IBM Db2

AWS:
✅ RDS (all engines)
✅ Aurora
✅ S3 (as source)
✅ DocumentDB
```

### Targets
```
AWS Databases:
✅ RDS (all engines)
✅ Aurora
✅ DynamoDB
✅ DocumentDB
✅ Redshift
✅ S3 (as target)
✅ OpenSearch
✅ Kinesis Data Streams
✅ Kafka
```

## DMS Replication Instance 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
What is Replication Instance?
- EC2 instance running DMS
- Performs migration
- You choose instance size

Sizing:
- Small (t3.micro): Dev/test, small DBs
- Medium (c5.large): Production, medium DBs
- Large (c5.4xlarge): Large DBs, high throughput

Multi-AZ:
- Standby replication instance
- Automatic failover
- High availability
- Use for production migrations
```

## DMS Tasks 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
Task Configuration:
- Source endpoint
- Target endpoint
- Replication instance
- Migration type (full load, CDC, both)
- Table mappings (which tables to migrate)
- Transformation rules (rename, filter)

Table Mappings:
- Include specific tables
- Exclude specific tables
- Rename tables/columns
- Filter rows

Example:
Include: schema1.table1, schema1.table2
Exclude: schema1.temp_*
Rename: old_table → new_table
```

## DMS Use Cases 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
1. On-Premises to AWS:
   Oracle (on-premises) → RDS Oracle
   MySQL (on-premises) → RDS MySQL

2. Cross-Engine Migration:
   Oracle → Aurora PostgreSQL (use SCT first)
   SQL Server → MySQL (use SCT first)

3. AWS to AWS:
   RDS MySQL → Aurora MySQL
   RDS Oracle → RDS PostgreSQL

4. Continuous Replication:
   On-premises Oracle → RDS Oracle (DR)
   Production DB → Analytics DB (Redshift)

5. Database Consolidation:
   Multiple DBs → Single DB
   Shard consolidation

6. Dev/Test Copies:
   Production DB → Dev DB (ongoing sync)
```

## DMS vs Native Tools 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
DMS Advantages:
✅ Minimal downtime (CDC)
✅ Managed service
✅ Cross-engine migration
✅ Continuous replication
✅ Monitoring and alerts

Native Tools (mysqldump, pg_dump):
✅ Free
✅ Simple for small DBs
❌ Requires downtime
❌ Manual process
❌ No ongoing replication

Use DMS When:
✅ Production database
✅ Minimal downtime required
✅ Cross-engine migration
✅ Ongoing replication needed
```

## When to Use DMS 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### ✅ Use DMS When
- Migrate database to AWS
- Minimal downtime required
- Cross-engine migration (with SCT)
- Ongoing replication needed
- Production database migration
- Database consolidation

### ❌ Don't Use DMS When
- File system migration → DataSync
- Server migration → MGN
- Simple backup/restore (small DB, can afford downtime) → Native tools

## Keywords to Identify DMS
[BackToTop](#table-of-contents)
```
"Database migration"
"Minimal downtime"
"Oracle to Aurora"
"SQL Server to MySQL"
"Continuous replication"
"CDC"
"Schema conversion"
"Heterogeneous migration"
"Homogeneous migration"
```

## DMS Common Exam Scenarios 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Scenario 1: Oracle to Aurora (Heterogeneous)
```
Question: Migrate Oracle database to Aurora PostgreSQL with minimal downtime

Answer:
1. Use SCT to convert schema
2. Use DMS with Full Load + CDC

Why:
- Heterogeneous = SCT first
- CDC = minimal downtime
- Source stays operational
```

### Scenario 2: MySQL to RDS MySQL (Homogeneous)
```
Question: Migrate on-premises MySQL to RDS MySQL

Answer: Use DMS directly (no SCT needed)

Why:
- Homogeneous = same engine
- No schema conversion needed
- DMS handles migration
```

### Scenario 3: Ongoing Replication for DR
```
Question: Replicate on-premises Oracle to RDS Oracle for disaster recovery

Answer: Use DMS with CDC only

Why:
- Ongoing replication
- CDC captures changes
- DR copy always up-to-date
```

### Scenario 4: Migrate to DynamoDB
```
Question: Migrate relational data to DynamoDB

Answer: Use DMS (supports DynamoDB as target)

Why:
- DMS supports DynamoDB target
- Transform data during migration
- Heterogeneous migration
```

---

# AWS Server Migration Service (SMS) 
⭐⭐⭐
[BackToTop](#table-of-contents)

## What is SMS?
```
- Migrate on-premises servers to AWS
- Agentless migration
- Incremental replication
- VMware, Hyper-V, Azure VMs
- Creates AMIs from server volumes

Note: SMS is being replaced by AWS MGN (Application Migration Service)
For new migrations, use MGN instead
```

## Key Points ⭐⭐⭐
```
✅ Agentless (uses connector)
✅ Incremental replication
✅ Creates AMIs
✅ Schedule migrations
✅ Multi-server migrations

Supported Sources:
✅ VMware vSphere
✅ Microsoft Hyper-V
✅ Microsoft Azure VMs

Process:
1. Install SMS Connector (on-premises)
2. Discover servers
3. Create replication jobs
4. SMS replicates server volumes
5. Creates AMIs
6. Launch EC2 from AMI
```

## SMS vs MGN 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
SMS (Legacy):
- Agentless
- Creates AMIs
- Being deprecated
- Limited features

MGN (Current - Recommended):
- Agent-based
- Continuous replication
- More features
- AWS recommended

Key Exam Tip:
SMS = legacy, agentless, creates AMIs
MGN = current, agent-based, recommended
```

---

# AWS Application Discovery Service 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## What is Application Discovery Service?
```
- Discover on-premises infrastructure
- Collect server data
- Plan migrations
- Understand dependencies
- Feed data to Migration Hub
```

## Discovery Methods 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### 1. Agentless Discovery (Connector)
```
What: VMware vCenter connector
How: Discovers VMs without installing agents

Collects:
✅ VM inventory
✅ CPU, memory, disk usage
✅ Network connections
✅ VM configuration

Limitations:
❌ No process-level data
❌ No application dependencies
❌ VMware only

Use When:
✅ Quick discovery
✅ VMware environment
✅ Don't want to install agents
```

### 2. Agent-Based Discovery 
⭐⭐⭐⭐⭐
```
What: Install agent on each server
How: Deep discovery with agent

Collects:
✅ System configuration
✅ System performance
✅ Running processes
✅ Network connections
✅ Application dependencies
✅ Detailed metrics

Supports:
✅ Windows
✅ Linux
✅ Physical servers
✅ VMs (any hypervisor)

Use When:
✅ Need detailed data
✅ Application dependency mapping
✅ Non-VMware environments
✅ Physical servers
```

## Application Discovery Service Data 
[BackToTop](#table-of-contents)
⭐⭐⭐⭐
```
Data Collected:
✅ Server inventory (hostname, IP, OS)
✅ Hardware specs (CPU, memory, disk)
✅ Performance metrics (utilization)
✅ Network connections
✅ Running processes
✅ Application dependencies

Data Storage:
- Stored in Migration Hub
- Export to S3 (CSV)
- Analyze with Athena
- Visualize with QuickSight

Use Cases:
✅ Migration planning
✅ Right-sizing EC2 instances
✅ Dependency mapping
✅ TCO analysis
```

## When to Use Application Discovery Service 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### ✅ Use When
- Planning migration (discover what you have)
- Need server inventory
- Need dependency mapping
- Right-sizing EC2 instances
- TCO analysis

### Keywords
```
"Discover on-premises servers"
"Server inventory"
"Application dependencies"
"Migration planning"
"What servers do we have?"
```

---

# AWS Migration Hub 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## What is Migration Hub?
```
- Central hub for tracking migrations
- Single dashboard
- Aggregate migration data
- Track progress
- Integrates with DMS, MGN, SMS
```

## Key Features ⭐⭐⭐⭐
```
✅ Single pane of glass
✅ Track migration status
✅ Integrates with:
   - AWS DMS
   - AWS MGN
   - AWS SMS
   - Application Discovery Service
✅ Migration grouping
✅ Progress tracking
✅ No additional cost

Migration States:
- Not Started
- In Progress
- Completed
- Failed
```

## Migration Hub Home Region 
⭐⭐⭐
[BackToTop](#table-of-contents)
```
What: Choose region for Migration Hub data
Important: Must set before starting migrations
Cannot change after setting

Recommendation: Set to region where you'll migrate to
```

## When to Use Migration Hub 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### ✅ Use When
- Multiple migrations happening simultaneously
- Need centralized tracking
- Multiple teams migrating
- Executive reporting on migration progress

### Keywords For Migration Hub
```
"Track migration progress"
"Centralized migration dashboard"
"Monitor migrations"
"Single view of migrations"
```

---

# AWS Transfer Family 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## What is Transfer Family?
```
- Managed file transfer service
- SFTP, FTPS, FTP, AS2 protocols
- Store files in S3 or EFS
- Existing clients work unchanged
- No code changes needed
```

## Supported Protocols 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### SFTP (SSH File Transfer Protocol)
```
- Encrypted (SSH)
- Most common
- Port 22
- Use: Secure file transfer
```

### FTPS (FTP over SSL)
```
- Encrypted (SSL/TLS)
- Port 990 (implicit) or 21 (explicit)
- Use: Legacy systems requiring FTP with encryption
```

### FTP (File Transfer Protocol)
```
- Unencrypted
- Port 21
- Use: Internal networks only
- Not recommended for Internet
```

### AS2 (Applicability Statement 2)
```
- Business-to-business transfers
- EDI (Electronic Data Interchange)
- Encrypted and signed
- Use: B2B file exchange, supply chain
```

## Transfer Family Architecture 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
Client (SFTP/FTP/FTPS)
    ↓
Transfer Family Endpoint
    ↓
S3 Bucket or EFS File System

Benefits:
✅ No server management
✅ Existing clients work
✅ Files stored in S3/EFS
✅ IAM access control
✅ CloudWatch monitoring
✅ Audit logging (CloudTrail)
```

## Authentication Options 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
1. Service-Managed:
   - Transfer Family manages users
   - SSH keys or passwords
   - Simple setup

2. AWS Directory Service:
   - Active Directory integration
   - Existing AD users
   - SSO experience

3. Custom Identity Provider:
   - Lambda or API Gateway
   - Custom authentication logic
   - Integrate with existing IdP
   - LDAP, Okta, etc.
```

## Transfer Family Use Cases 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
✅ Replace on-premises SFTP server
✅ Partner file exchange (B2B)
✅ Legacy application integration
✅ Regulatory compliance (SFTP required)
✅ EDI file exchange (AS2)
✅ Migrate SFTP workloads to AWS

Example:
Before: On-premises SFTP server
After: Transfer Family → S3

Benefits:
✅ No server management
✅ Existing clients unchanged
✅ Files in S3 (durable, scalable)
✅ Trigger Lambda on file upload
```

## Transfer Family + Lambda Pattern 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
Architecture:
Partner uploads file via SFTP
    ↓
Transfer Family
    ↓
S3 Bucket
    ↓
S3 Event → Lambda
    ↓
Process file (ETL, validation, etc.)
    ↓
Store results in DynamoDB/RDS

Use Cases:
✅ Automated file processing
✅ ETL pipelines
✅ Data validation
✅ Notifications
```

## When to Use Transfer Family 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### ✅ Use Transfer Family When
- Need SFTP/FTP/FTPS endpoint
- Replace on-premises SFTP server
- Partner file exchange
- Legacy applications using FTP
- Regulatory requirement for SFTP
- B2B file exchange (AS2)

### ❌ Don't Use Transfer Family When
- Need to migrate files (one-time) → DataSync
- Need database migration → DMS
- Need server migration → MGN

## Keywords to Identify Transfer Family
[BackToTop](#table-of-contents)

```
"SFTP"
"FTP"
"FTPS"
"AS2"
"File transfer"
"Replace SFTP server"
"Partner file exchange"
"EDI"
"B2B file transfer"
```

## Transfer Family Pricing
[BackToTop](#table-of-contents)
```
Endpoint Hours:
- SFTP: $0.30 per hour (~$216/month)
- FTPS: $0.30 per hour
- FTP: $0.30 per hour
- AS2: $0.30 per hour

Data Transfer:
- $0.04 per GB uploaded
- $0.08 per GB downloaded

Example:
1 SFTP endpoint, 100 GB upload, 50 GB download:
Endpoint: $216
Upload: 100 × $0.04 = $4
Download: 50 × $0.08 = $4
Total: $224/month
```

## Common Exam Scenarios 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Scenario 1: Replace SFTP Server
```
Question: Replace on-premises SFTP server, store files in S3

Answer: Use AWS Transfer Family (SFTP)

Why:
- Managed SFTP endpoint
- Files stored in S3
- Existing clients unchanged
- No server management
```

### Scenario 2: Partner File Exchange
```
Question: Exchange EDI files with business partners

Answer: Use AWS Transfer Family (AS2)

Why:
- AS2 for B2B file exchange
- EDI support
- Encrypted and signed
- Partner integration
```

### Scenario 3: Legacy FTP Application
```
Question: Legacy application uses FTP, need to store files in EFS

Answer: Use AWS Transfer Family (FTP) with EFS

Why:
- FTP protocol support
- EFS as destination
- No application changes
- Managed service
```

---

# AWS Application Migration Service (MGN) 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## What is MGN?
```
- Lift-and-shift migration service
- Formerly CloudEndure Migration
- Migrate physical, virtual, cloud servers to AWS
- Continuous replication
- Minimal downtime
- Agent-based
```

## How MGN Works 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
Process:
1. Install MGN agent on source server
2. Agent replicates data to AWS (staging area)
3. Continuous replication (CDC)
4. Test migration (non-disruptive)
5. Cutover (minimal downtime)
6. Source server decommissioned

Architecture:
Source Server (on-premises/cloud)
    ↓ (continuous replication)
MGN Replication Server (staging area in AWS)
    ↓ (cutover)
EC2 Instance (production)
```

## MGN Key Features 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
✅ Continuous block-level replication
✅ Minimal downtime (minutes)
✅ Non-disruptive testing
✅ Automatic conversion (to EC2)
✅ Supports any OS
✅ Supports any application
✅ Free (pay only for AWS resources)

Supported Sources:
✅ Physical servers
✅ VMware VMs
✅ Hyper-V VMs
✅ Azure VMs
✅ GCP VMs
✅ Other cloud providers
✅ Any x86 server
```

## MGN vs SMS 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

| Feature | MGN (Current) | SMS (Legacy) |
|---------|--------------|--------------|
| **Status** | Current (recommended) | Legacy (deprecated) |
| **Agent** | Required | Not required (agentless) |
| **Replication** | Continuous (block-level) | Incremental (snapshot) |
| **Downtime** | Minutes | Hours |
| **OS Support** | Any OS | Limited |
| **Testing** | Non-disruptive | Disruptive |
| **Cost** | Free (pay for resources) | Free |

**Key Exam Tip**: MGN = recommended, SMS = legacy

## MGN Cutover Process 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
1. Install agent → Replication starts
2. Monitor replication lag
3. Launch test instance (non-disruptive)
4. Test application
5. Ready for cutover
6. Initiate cutover
7. Final sync (minutes)
8. Launch production instance
9. Update DNS
10. Decommission source

Downtime: Minutes (final sync only)
```

## When to Use MGN 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### ✅ Use MGN When
- Lift-and-shift server migration
- Migrate physical servers to EC2
- Migrate VMs to EC2
- Minimal downtime required
- Any OS or application
- Replace SMS (legacy)

### ❌ Don't Use MGN When
- Database migration → DMS
- File system migration → DataSync
- Want to re-architect → Refactor approach

## Keywords to Identify MGN
[BackToTop](#table-of-contents)

```
"Lift and shift"
"Server migration"
"Physical to EC2"
"VM to EC2"
"Minimal downtime server migration"
"CloudEndure"
"Rehost"
```

## MGN Common Exam Scenarios 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Scenario 1: Physical Server to EC2
```
Question: Migrate 50 physical servers to EC2 with minimal downtime

Answer: Use AWS MGN

Why:
- Lift-and-shift migration
- Continuous replication
- Minimal downtime (minutes)
- Supports physical servers
```

### Scenario 2: VMware to AWS
```
Question: Migrate VMware VMs to EC2

Answer: Use AWS MGN

Why:
- Supports VMware source
- Continuous replication
- Non-disruptive testing
- Minimal downtime
```

### Scenario 3: Multi-Cloud Migration
```
Question: Migrate Azure VMs to AWS

Answer: Use AWS MGN

Why:
- Supports Azure as source
- Any cloud to AWS
- Continuous replication
- Minimal downtime
```

---

# Migration Strategies (6 Rs) 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## The 6 Rs Explained

### 1. Rehost (Lift and Shift) ⭐⭐⭐⭐⭐
```
What: Move application as-is to AWS
No changes to application

Process:
On-Premises Server → EC2 Instance (same configuration)

Tools:
✅ AWS MGN (Application Migration Service)
✅ AWS SMS (legacy)
✅ Manual (create EC2, restore backup)

Benefits:
✅ Fastest migration
✅ Minimal risk
✅ No code changes
✅ Quick wins

Drawbacks:
❌ No cloud optimization
❌ May not use cloud-native features
❌ Same costs (or higher)

Use When:
✅ Large migration (move fast)
✅ Legacy applications
✅ Time pressure
✅ First step before optimization

Example:
On-premises Apache web server → EC2 t3.large
Same OS, same config, same application
```

### 2. Replatform (Lift, Tinker, Shift) 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
What: Minor optimizations without changing core architecture
Small changes to leverage cloud benefits

Examples:
- MySQL on EC2 → RDS MySQL (managed DB)
- Tomcat on EC2 → Elastic Beanstalk
- Self-managed Redis → ElastiCache Redis

Tools:
✅ AWS DMS (database replatform)
✅ AWS Elastic Beanstalk
✅ AWS MGN + manual changes

Benefits:
✅ Some cloud benefits
✅ Reduced operational overhead
✅ Minimal code changes
✅ Better than rehost

Drawbacks:
❌ Some effort required
❌ Not fully cloud-native

Use When:
✅ Want managed services
✅ Reduce operational overhead
✅ Minimal code changes acceptable

Example:
Before: MySQL on EC2 (you manage patching, backups)
After: RDS MySQL (AWS manages patching, backups)
Same application code, different infrastructure
```

### 3. Repurchase (Drop and Shop) 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
What: Move to different product (usually SaaS)
Replace existing application with cloud product

Examples:
- On-premises CRM → Salesforce
- On-premises HR → Workday
- On-premises email → Microsoft 365
- On-premises LMS → Cornerstone

Benefits:
✅ No infrastructure management
✅ Latest features
✅ Vendor manages updates
✅ Subscription model

Drawbacks:
❌ Data migration needed
❌ User retraining
❌ Customization loss
❌ Ongoing subscription cost

Use When:
✅ Commercial off-the-shelf software
✅ SaaS alternative exists
✅ Current solution outdated
✅ Want to eliminate maintenance

Example:
Before: On-premises Exchange Server (you manage)
After: Microsoft 365 (Microsoft manages)
```

### 4. Refactor / Re-architect 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
What: Redesign application for cloud-native
Significant changes to architecture

Examples:
- Monolith → Microservices
- EC2-based → Serverless (Lambda)
- Traditional DB → DynamoDB
- Batch processing → Event-driven

Tools:
✅ Lambda, ECS, EKS
✅ DynamoDB, Aurora Serverless
✅ API Gateway
✅ EventBridge, SQS, SNS

Benefits:
✅ Maximum cloud benefits
✅ Better scalability
✅ Better performance
✅ Lower operational costs (long-term)
✅ Cloud-native features

Drawbacks:
❌ Most expensive (time and money)
❌ Highest risk
❌ Significant code changes
❌ Longest timeline

Use When:
✅ Application needs significant improvement
✅ Scalability is critical
✅ Long-term investment
✅ Business agility needed

Example:
Before: Monolithic Java app on EC2
After: Microservices on ECS Fargate + DynamoDB + Lambda
```

### 5. Retire 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
What: Decommission applications no longer needed
Turn off what you don't need

Process:
1. Discover all applications
2. Identify unused/redundant
3. Decommission
4. Reduce costs

Benefits:
✅ Reduce costs immediately
✅ Simplify portfolio
✅ Reduce security surface
✅ Focus on important apps

Use When:
✅ Application no longer used
✅ Duplicate functionality
✅ Business process changed
✅ Application end-of-life

Example:
Old reporting tool replaced by QuickSight
→ Retire old tool
→ Save licensing and infrastructure costs

Typical Result:
10-20% of applications can be retired
```

### 6. Retain (Revisit) 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
What: Keep on-premises (for now)
Not ready to migrate

Reasons to Retain:
✅ Recently upgraded (not ready to migrate)
✅ Compliance requirements (must stay on-premises)
✅ High migration complexity
✅ Dependency on on-premises hardware
✅ Business decision (not priority)

Use When:
✅ Application recently updated
✅ Regulatory requirements
✅ Too complex to migrate now
✅ Not business priority

Example:
Mainframe application:
- Complex migration
- Business-critical
- Retain for now
- Revisit in 2 years

Note: "Retain" doesn't mean "never migrate"
It means "not now"
```

## 6 Rs Comparison 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

| Strategy | Effort | Risk | Cloud Benefit | Time | Cost |
|----------|--------|------|---------------|------|------|
| **Retire** | None | None | N/A | Immediate | Saves money |
| **Retain** | None | None | None | N/A | Same |
| **Rehost** | Low | Low | Low | Fast | Same/slightly higher |
| **Replatform** | Medium | Medium | Medium | Medium | Lower (managed services) |
| **Repurchase** | Medium | Medium | High | Medium | Subscription |
| **Refactor** | High | High | Highest | Long | Lower (long-term) |

---

## 6 Rs Decision Tree 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
Application Assessment:
    ↓
Still needed?
├─ No → RETIRE
└─ Yes → Continue
    ↓
Ready to migrate?
├─ No → RETAIN
└─ Yes → Continue
    ↓
SaaS alternative available?
├─ Yes → REPURCHASE
└─ No → Continue
    ↓
Need significant improvement?
├─ Yes → REFACTOR
└─ No → Continue
    ↓
Want managed services?
├─ Yes → REPLATFORM
└─ No → REHOST
```

---

# Migration Phases 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## Phase 1: Assess
```
Goal: Understand current state

Activities:
✅ Discover on-premises infrastructure
✅ Assess application portfolio
✅ Identify dependencies
✅ Estimate costs
✅ Choose migration strategy (6 Rs)

Tools:
✅ Application Discovery Service
✅ Migration Evaluator
✅ AWS Migration Hub

Output:
- Server inventory
- Application dependencies
- Migration plan
- TCO analysis
```

## Phase 2: Mobilize
[BackToTop](#table-of-contents)
```
Goal: Create migration plan and build skills

Activities:
✅ Create detailed migration plan
✅ Build AWS skills (training)
✅ Set up AWS environment (Landing Zone)
✅ Establish governance
✅ Pilot migration (small batch)

Tools:
✅ AWS Control Tower (Landing Zone)
✅ AWS Organizations
✅ Migration Hub

Output:
- Detailed migration plan
- Trained team
- AWS environment ready
- Pilot migration complete
```

## Phase 3: Migrate and Modernize
[BackToTop](#table-of-contents)

```
Goal: Execute migration

Activities:
✅ Migrate applications (waves)
✅ Test migrated applications
✅ Optimize (right-sizing, cost)
✅ Decommission on-premises

Tools:
✅ AWS MGN (servers)
✅ AWS DMS (databases)
✅ AWS DataSync (files)
✅ AWS Transfer Family (SFTP)
✅ Migration Hub (tracking)

Output:
- Applications running on AWS
- On-premises decommissioned
- Costs optimized
```

---

# Migration Tools Summary 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## Complete Tool Selection Guide

| Migration Need | Tool | Key Feature |
|----------------|------|-------------|
| **Discover servers** | Application Discovery Service | Inventory + dependencies |
| **Track migrations** | Migration Hub | Central dashboard |
| **Migrate servers** | MGN (Application Migration Service) | Lift-and-shift, minimal downtime |
| **Migrate databases** | DMS | Minimal downtime, CDC |
| **Convert DB schema** | SCT (Schema Conversion Tool) | Heterogeneous DB migration |
| **Migrate files online** | DataSync | NFS/SMB to S3/EFS |
| **Migrate files offline** | Snow Family | Large data, limited network |
| **SFTP/FTP endpoint** | Transfer Family | Managed file transfer |
| **Legacy server migration** | SMS | Agentless (VMware) - legacy |

---

# Critical Exam Scenarios - Migration 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
## Scenario Matrix

| Question | Answer | Why |
|----------|--------|-----|
| "Migrate Oracle to Aurora PostgreSQL" | SCT + DMS | Heterogeneous = SCT first |
| "Migrate MySQL to RDS MySQL" | DMS only | Homogeneous = no SCT |
| "Migrate physical servers to EC2" | MGN | Lift-and-shift |
| "Migrate NFS to EFS" | DataSync | File system migration |
| "Replace SFTP server" | Transfer Family | Managed SFTP |
| "Discover on-premises servers" | Application Discovery Service | Inventory |
| "Track migration progress" | Migration Hub | Central tracking |
| "Migrate 100 TB, slow network" | Snow Family | Offline migration |
| "Migrate files online, automated" | DataSync | Online, scheduled |
| "B2B file exchange" | Transfer Family (AS2) | EDI/B2B |
| "Minimal downtime DB migration" | DMS + CDC | Continuous replication |
| "Ongoing DB replication for DR" | DMS (CDC only) | Continuous replication |
| "Move to SaaS" | Repurchase | 6 Rs strategy |
| "Redesign as microservices" | Refactor | 6 Rs strategy |
| "Move as-is to EC2" | Rehost | 6 Rs strategy |

---

# Common Exam Traps - Migration 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Trap 1: Heterogeneous Migration
```
❌ Wrong: Use DMS directly for Oracle → Aurora PostgreSQL
✅ Right: Use SCT first, then DMS

Why: Different DB engines need schema conversion first
```

### Trap 2: DataSync vs Snow Family
```
❌ Wrong: Use DataSync for 500 TB with 10 Mbps connection
✅ Right: Use Snow Family (offline)

Why: 500 TB over 10 Mbps = 463 days
Snow Family: Physical device, days not months
```

### Trap 3: MGN vs DMS
```
❌ Wrong: Use DMS to migrate web servers
✅ Right: Use MGN for server migration

Why: DMS = databases only, MGN = servers
```

### Trap 4: SMS vs MGN
```
❌ Wrong: Use SMS for new server migrations
✅ Right: Use MGN (SMS is legacy/deprecated)

Why: MGN is the current recommended service
```

### Trap 5: Transfer Family vs DataSync
```
❌ Wrong: Use Transfer Family to migrate files to S3
✅ Right: Use DataSync for migration

Why:
Transfer Family = ongoing SFTP endpoint
DataSync = data migration/transfer
```

### Trap 6: DMS Replication Instance
```
❌ Wrong: DMS is fully serverless
✅ Right: DMS uses replication instance (EC2-based)

Why: You choose instance size for DMS
Larger instance = faster migration
```

---

# Migration Best Practices 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## Planning
```
✅ Discover before migrating (Application Discovery Service)
✅ Map dependencies (agent-based discovery)
✅ Choose right strategy (6 Rs)
✅ Start with easy applications (build confidence)
✅ Migrate in waves (not all at once)
✅ Test before cutover
✅ Have rollback plan
```

## Database Migration
```
✅ Use SCT for heterogeneous migrations
✅ Use Full Load + CDC for minimal downtime
✅ Test migration in dev first
✅ Validate data after migration
✅ Monitor replication lag
✅ Size replication instance appropriately
✅ Use Multi-AZ replication instance (production)
```

## Server Migration
```
✅ Use MGN for lift-and-shift
✅ Test before cutover (non-disruptive)
✅ Monitor replication lag
✅ Right-size EC2 instances
✅ Update DNS after cutover
✅ Keep source running briefly (rollback)
```

## File Migration
```
✅ Use DataSync for online transfers
✅ Use Snow Family for large offline transfers
✅ Validate data after transfer
✅ Use bandwidth throttling (business hours)
✅ Schedule transfers (off-peak hours)
```

## Security
```
✅ Encrypt data in transit (TLS)
✅ Encrypt data at rest (KMS)
✅ Use VPC endpoints (private transfer)
✅ Use Direct Connect (private network)
✅ Least privilege IAM roles
✅ Audit with CloudTrail
```

---

# Migration Pricing Summary 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)
## Cost Overview

| Service | Pricing Model | Approximate Cost |
|---------|--------------|------------------|
| **DataSync** | Per GB transferred | $0.0125/GB |
| **DMS** | Replication instance + storage | t3.medium ~$0.068/hr |
| **MGN** | Free (pay for resources) | EC2 + EBS costs |
| **Transfer Family** | Per hour + per GB | $0.30/hr + $0.04/GB |
| **Application Discovery** | Free | Free |
| **Migration Hub** | Free | Free |
| **SMS** | Free (pay for resources) | EC2 + EBS costs |
| **SCT** | Free | Free |

---

# Final Migration Summary 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## Must Know for SAA-C03

### Priority 1 (Most Tested)
```
DMS:
✅ Database migration
✅ Minimal downtime (CDC)
✅ Homogeneous vs heterogeneous
✅ SCT for heterogeneous
✅ Continuous replication

DataSync:
✅ Online file transfer
✅ NFS/SMB to S3/EFS
✅ Automated/scheduled
✅ Data validation
✅ vs Snow Family (online vs offline)
```

### Priority 2 (Important)
```
MGN:
✅ Server lift-and-shift
✅ Replaces SMS
✅ Minimal downtime
✅ Any OS/application

Transfer Family:
✅ SFTP/FTP/FTPS/AS2
✅ Replace SFTP server
✅ Files to S3/EFS
✅ B2B file exchange

6 Rs:
✅ Know all 6 strategies
✅ When to use each
✅ Rehost vs Replatform vs Refactor
```

### Priority 3 (Awareness)
```
Application Discovery Service:
✅ Discover on-premises
✅ Agentless vs agent-based
✅ Migration planning

Migration Hub:
✅ Central tracking
✅ Single dashboard
✅ Integrates with DMS, MGN

SMS:
✅ Legacy (know it's deprecated)
✅ Replaced by MGN
```

---

## Quick Reference Card 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
WHAT TO MIGRATE → WHICH TOOL

Files (online) → DataSync
Files (offline, large) → Snow Family
Database → DMS (+ SCT if heterogeneous)
Servers → MGN
SFTP/FTP → Transfer Family
Discover → Application Discovery Service
Track → Migration Hub

MIGRATION STRATEGY → 6 Rs

Move as-is → Rehost (MGN)
Minor optimization → Replatform (DMS, Beanstalk)
Replace with SaaS → Repurchase
Redesign → Refactor
Not needed → Retire
Not ready → Retain

DATABASE MIGRATION → KEY RULES

Same engine → DMS only
Different engine → SCT first, then DMS
Minimal downtime → Full Load + CDC
Ongoing replication → CDC only
```

---

**You've completed the Migration and Transfer section!** 🚀

---
### [BackToTop](#table-of-contents)

