# AWS *Database Services* - SAA-C03 Exam Guide

---
>⚠️ These notes were created using Anthropic's AI Models (Opus 4.5 and 4.6).

---

## Table of Contents
1. [Amazon RDS (Relational Database Service)](#amazon-rds-relational-database-service)
   - [Key Features](#key-features)
   - [Storage Types](#storage-types)
   - [Scaling](#scaling)
   - [Security Features](#security-features)
   - [Monitoring and Maintenance](#monitoring-and-maintenance)
   - [Backup and Recovery](#backup-and-recovery)
   - [When to Use RDS](#when-to-use-rds)
   - [Keywords to Identify RDS](#keywords-to-identify-rds)
   - [Common Exam Scenarios](#common-exam-scenarios)
   - [RDS vs Aurora vs DynamoDB](#rds-vs-aurora-vs-dynamodb)
   - [Cost Considerations](#cost-considerations)
   - [Limitations & Constraints](#limitations--constraints)
   - [Best Practices](#best-practices-)
   - [Pros & Cons](#pros--cons)
2. [Amazon Aurora](#amazon-aurora)
   - [Aurora vs RDS MySQL/PostgreSQL](#aurora-vs-rds-mysqlpostgresql)
   - [Aurora Architecture](#aurora-architecture)
   - [Aurora Endpoints ](#aurora-endpoints)
   - [Aurora Features](#aurora-features)
   - [When to Use Aurora](#when-to-use-aurora)
   - [Keywords to Identify Aurora](#keywords-to-identify-aurora)
   - [Common Exam Scenarios](#common-exam-scenarios-1)
   - [Aurora Pricing](#aurora-pricing)
   - [Aurora Limitations & Constraints](#aurora-limitations--constraints)
   - [Aurora Best Practices](#aurora-best-practices)
   - [Aurora Pros & Cons](#aurora-pros--cons)
3. [Amazon Aurora Serverless](#amazon-aurora-serverless)
   - [Aurora Serverless v1 vs v2](#aurora-serverless-v1-vs-v2)
   - [Aurora Capacity Units (ACUs)](#aurora-capacity-units-acus)
   - [How Aurora Serverless Works](#how-aurora-serverless-works)
   - [Data API](#data-api-)
   - [When to Use Aurora Serverless](#when-to-use-aurora-serverless)
   - [Keywords to Identify Aurora Serverless](#keywords-to-identify-aurora-serverless)
   - [Aurora Serverless Common Exam Scenarios](#aurora-serverless-common-exam-scenarios)
   - [Aurora Serverless Pricing](#aurora-serverless-pricing)
   - [Aurora Serverless Limitations & Constraints](#aurora-serverless-limitations--constraints)
   - [Aurora Serverless Best Practices](#aurora-serverless-best-practices)
   - [Aurora Serverless Pros & Cons](#aurora-serverless-pros--cons)
4. [Amazon DynamoDB](#amazon-dynamodb)
   - [DynamoDB vs RDS/Aurora](#dynamodb-vs-rdsaurora)
   - [Core Components](#core-components-)
   - [Capacity Modes](#capacity-modes-)
   - [Read Consistency](#read-consistency-)
   - [Secondary Indexes](#secondary-indexes-)
      - [Local Secondary Index (LSI)](#1-local-secondary-index-lsi)
      - [Global Secondary Index (GSI)](#2-global-secondary-index-gsi)
      - [LSI vs GSI Comparison](#lsi-vs-gsi-comparison)
   - [DynamoDB Streams](#dynamodb-streams-)
   - [DynamoDB Accelerator (DAX)](#dynamodb-accelerator-dax)
   - [Global Tables](#global-tables-)
   - [Point-in-Time Recovery (PITR)](#point-in-time-recovery-pitr)
   - [Time to Live (TTL) ](#time-to-live-ttl-)
   - [DynamoDB Transactions](#dynamodb-transactions-)
   - [When to Use DynamoDB](#when-to-use-dynamodb)
   - [Keywords to Identify DynamoDB](#keywords-to-identify-dynamodb)
   - [DynamoDB Common Exam Scenarios](#dynamodb-common-exam-scenarios)
   - [DynamoDB Best Practices](#dynamodb-best-practices-)
   - [DynamoDB Pricing](#dynamodb-pricing)
   - [DynamoDB Limitations & Constraints](#dynamodb-limitations--constraints)
   - [DynamoDB Pros & Cons](#dynamodb-pros--cons)
5. [Amazon ElastiCache](#amazon-elasticache)
6. [Amazon Redshift](#amazon-redshift)
7. [Amazon DocumentDB](#amazon-documentdb)
8. [Amazon Neptune](#amazon-neptune)
9. [Amazon Keyspaces](#amazon-keyspaces-for-apache-cassandra)
10. [Amazon QLDB](#amazon-qldb-quantum-ledger-database)
11. [Database Services Comparison Matrix](#database-services-comparison-matrix)
12. [Database Selection Decision Trees](#database-selection-decision-trees)
13. [Common Exam Patterns and Scenarios](#common-exam-patterns-and-scenarios)
14. [Critical Exam Tips for Database Services](#critical-exam-tips-for-database-services)
15. [Final Database Exam Checklist](#final-database-exam-checklist)
16. [Summary: Most Important Database Services for SAA-C03](#summary-most-important-database-services-for-saa-c03)



---

# Amazon RDS (Relational Database Service)
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐⭐ (MOST IMPORTANT)
- **Managed relational database** service
- Supports multiple database engines
- Automated backups, patching, and maintenance
- **Multi-AZ for high availability**
- **Read Replicas for read scaling**
- No SSH access to underlying OS

## Supported Database Engines

### 1. Amazon Aurora (MySQL/PostgreSQL compatible)
- AWS proprietary (covered separately)
- Best performance

### 2. MySQL
- Open source
- Most popular
- Community edition

### 3. PostgreSQL
- Open source
- Advanced features
- ACID compliant

### 4. MariaDB
- MySQL fork
- Open source
- Drop-in MySQL replacement

### 5. Oracle
- Commercial license
- Enterprise features
- BYOL (Bring Your Own License) or License Included

### 6. Microsoft SQL Server
- Commercial license
- Windows-based
- Enterprise features

## Key Features
[BackToTop](#table-of-contents)

### 1. Automated Backups ⭐⭐⭐⭐⭐
```
Automatic Backups:
- Daily full backup during backup window
- Transaction logs backed up every 5 minutes
- Point-in-time recovery (PITR)
- Retention: 0-35 days (default 7 days)
- Stored in S3 (free storage = DB size)
- Enabled by default

Manual Snapshots:
- User-initiated
- Retained until manually deleted
- Can copy across regions
- Can share with other accounts
```

### 2. Multi-AZ Deployment ⭐⭐⭐⭐⭐
```
Architecture:
Primary DB (AZ-1) ←→ Synchronous Replication ←→ Standby DB (AZ-2)
        ↓
   Single DNS name (automatic failover)

Features:
✅ High availability (not read scaling)
✅ Automatic failover (1-2 minutes)
✅ Synchronous replication
✅ Same region only
✅ Standby NOT accessible for reads
✅ Automatic backups from standby (no performance impact)

Use Cases:
- Production databases
- High availability required
- Disaster recovery
- Minimize downtime
```

### 3. Read Replicas ⭐⭐⭐⭐⭐
```
Architecture:
Primary DB → Asynchronous Replication → Read Replica 1
                                      → Read Replica 2
                                      → Read Replica 3

Features:
✅ Read scaling (not HA)
✅ Asynchronous replication
✅ Up to 15 read replicas (Aurora)
✅ Up to 5 read replicas (other engines)
✅ Can be in different regions (cross-region)
✅ Can be promoted to standalone DB
✅ Each replica has own DNS endpoint

Use Cases:
- Read-heavy workloads
- Reporting and analytics
- Disaster recovery (cross-region)
- Reduce load on primary
```

### Multi-AZ vs Read Replicas Comparison ⭐⭐⭐⭐⭐

| Feature | Multi-AZ | Read Replicas |
|---------|----------|---------------|
| **Purpose** | High Availability | Read Scaling |
| **Replication** | Synchronous | Asynchronous |
| **Accessible** | No (standby) | Yes (read-only) |
| **Failover** | Automatic | Manual (promote) |
| **Region** | Same region only | Cross-region supported |
| **Count** | 1 standby | Up to 5 (15 for Aurora) |
| **Use Case** | Disaster recovery | Performance |

**Can Use Both**: Multi-AZ + Read Replicas for HA + Performance

---

## Storage Types

[BackToTop](#table-of-contents)

### 1. General Purpose SSD (gp3/gp2)
```
Performance:
- Baseline: 3 IOPS per GB
- Minimum: 100 IOPS
- Maximum: 16,000 IOPS (gp3), 16,000 IOPS (gp2)
- Burstable to 3,000 IOPS

Use Cases:
- Most workloads
- Dev/test databases
- Small to medium databases

Cost: $0.115 per GB-month
```

### 2. Provisioned IOPS SSD (io1/io2)
```
Performance:
- Up to 64,000 IOPS (io2)
- Up to 256,000 IOPS (io2 Block Express)
- Consistent performance
- Low latency

Use Cases:
- I/O-intensive workloads
- Large production databases
- NoSQL databases
- Critical applications

Cost: $0.125 per GB-month + $0.10 per IOPS
```

### 3. Magnetic (Standard) - Legacy
```
- Deprecated
- Not recommended
- Use gp3 instead
```

---

## Scaling
[BackToTop](#table-of-contents)
### Vertical Scaling (Scale Up/Down)
```
Process:
1. Change instance type
2. Database goes offline during change
3. Multi-AZ: Standby upgraded first, then failover
4. Downtime: Few minutes (Multi-AZ) to 30+ minutes (Single-AZ)

Use Cases:
- Need more CPU/memory
- Predictable growth
- Scheduled maintenance windows
```

### Horizontal Scaling (Read Replicas)
```
Process:
1. Create read replicas
2. Distribute read traffic
3. No downtime

Use Cases:
- Read-heavy workloads
- Reporting queries
- Analytics
```

### Storage Auto Scaling
```
Features:
- Automatically increases storage
- Triggered when free space < 10%
- Maximum storage threshold (set by you)
- No downtime

Use Cases:
- Unpredictable growth
- Avoid manual intervention
- Prevent storage full errors
```

## Security Features 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### 1. Encryption at Rest
```
Options:
- AWS KMS encryption
- Enabled at creation (cannot enable later)
- Encrypts: DB, backups, snapshots, read replicas

To Encrypt Existing DB:
1. Create snapshot
2. Copy snapshot with encryption
3. Restore from encrypted snapshot
4. Migrate applications
```

### 2. Encryption in Transit
```
- SSL/TLS connections
- Force SSL: Set parameter group
- Certificate validation
```

### 3. Network Isolation
```
- Deploy in VPC
- Private subnets (best practice)
- Security groups (firewall rules)
- No public access (best practice)
```

### 4. IAM Database Authentication
```
- Use IAM roles instead of passwords
- Token-based (15 minutes validity)
- Supported: MySQL, PostgreSQL, Aurora
- Use case: EC2/Lambda accessing RDS
```

### 5. Secrets Manager Integration
```
- Store database credentials
- Automatic rotation
- No hardcoded passwords
```

## Monitoring and Maintenance
[BackToTop](#table-of-contents)
### CloudWatch Metrics
```
Key Metrics:
- CPUUtilization
- DatabaseConnections
- FreeableMemory
- ReadIOPS, WriteIOPS
- ReadLatency, WriteLatency
- FreeStorageSpace

Alarms:
- High CPU usage
- Low free storage
- High connection count
```

### Enhanced Monitoring
```
- Real-time OS metrics
- Process-level monitoring
- 1-second granularity
- Agent on DB instance
- Additional cost
```

### Performance Insights
```
- Database performance tuning
- Identify bottlenecks
- SQL query analysis
- Wait event analysis
- Free for 7 days retention
```

### Maintenance Windows
```
- Weekly maintenance window
- OS patches, DB engine updates
- Can be deferred
- Multi-AZ: Standby first, then failover
- Minimal downtime
```

## Backup and Recovery 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### Automated Backups
```
Features:
- Daily full backup
- Transaction logs every 5 minutes
- Point-in-time recovery (PITR)
- Retention: 0-35 days
- Backup window: Specify time

Recovery:
- Restore to any point within retention period
- Creates NEW DB instance
- Cannot restore over existing DB
```

### Manual Snapshots
```
Features:
- User-initiated
- Retained indefinitely (until deleted)
- Can copy to other regions
- Can share with other accounts
- Incremental (only changed blocks)

Use Cases:
- Before major changes
- Long-term retention
- Disaster recovery
- Compliance
```

### Restore Process
```
1. Select snapshot or PITR point
2. Specify new DB instance details
3. RDS creates new instance
4. Update application connection string
5. Delete old instance (if needed)

Note: Cannot restore in-place
```
---

## When to Use RDS
[BackToTop](#table-of-contents)

### ✅ Use RDS When
- Need relational database (SQL)
- Want managed service (no OS access)
- Need automatic backups
- Need Multi-AZ for HA
- Need Read Replicas for scaling
- Standard RDBMS workloads
- ACID compliance required

### ❌ Don't Use RDS When
- Need root/SSH access → Use EC2 with self-managed DB
- Need NoSQL → Use DynamoDB
- Need massive scale → Use Aurora or DynamoDB
- Need sub-millisecond latency → Use DynamoDB with DAX
- Need graph database → Use Neptune
- Need document database → Use DocumentDB

---

## Keywords to Identify RDS
[BackToTop](#table-of-contents)
- "Relational database"
- "SQL database"
- "MySQL/PostgreSQL/Oracle/SQL Server"
- "Managed database"
- "Multi-AZ"
- "Read Replicas"
- "Automatic backups"
- "Point-in-time recovery"
- "High availability"

---

## Common Exam Scenarios
[BackToTop](#table-of-contents)

### Scenario 1: High Availability
**Question**: Database must survive AZ failure with minimal downtime

**Answer**: Enable RDS Multi-AZ deployment

**Why**:
- Automatic failover (1-2 minutes)
- Synchronous replication
- Single DNS endpoint
- No application changes needed

================================================================

### Scenario 2: Read-Heavy Workload
**Question**: Application has heavy read traffic, primary DB is overloaded

**Answer**: Create RDS Read Replicas

**Why**:
- Offload reads from primary
- Up to 5 read replicas
- Asynchronous replication
- Each replica has own endpoint

================================================================

### Scenario 3: Disaster Recovery (Cross-Region)
**Question**: Need disaster recovery in different region

**Answer**: Create cross-region Read Replica

**Why**:
- Asynchronous replication to other region
- Can promote to standalone DB
- Minimal RPO (replication lag)
- Fast RTO (promote replica)

================================================================

### Scenario 4: Encrypt Existing Database
**Question**: Existing unencrypted RDS database needs encryption

**Answer**: Create encrypted snapshot, restore from snapshot

**Why**:
- Cannot enable encryption on existing DB
- Must create new encrypted DB
- Snapshot → Copy with encryption → Restore

**Process**:
```
1. Create snapshot of existing DB
2. Copy snapshot with encryption enabled
3. Restore from encrypted snapshot (new DB)
4. Update application connection string
5. Delete old unencrypted DB
```

================================================================

### Scenario 5: Reduce Backup Impact
**Question**: Backups causing performance issues on production database

**Answer**: Enable Multi-AZ (backups taken from standby)

**Why**:
- Backups from standby replica
- No I/O impact on primary
- No performance degradation

================================================================

### Scenario 6: Cost Optimization
**Question**: Dev/test database running 24/7, high costs

**Answer**: Use RDS with scheduled start/stop or use Aurora Serverless

**Why**:
- Stop RDS when not in use (pay only for storage)
- Start when needed
- Or use Aurora Serverless (auto-pause)

## RDS vs Aurora vs DynamoDB
[BackToTop](#table-of-contents)
| Feature | RDS | Aurora | DynamoDB |
|---------|-----|--------|----------|
| **Type** | Relational | Relational | NoSQL |
| **Management** | Managed | Fully managed | Fully managed |
| **Performance** | Good | 5x MySQL, 3x PostgreSQL | Single-digit ms |
| **Scaling** | Vertical + Read Replicas | Auto-scaling | Auto-scaling |
| **Availability** | Multi-AZ (2 AZs) | Multi-AZ (3+ AZs) | Multi-AZ (3 AZs) |
| **Read Replicas** | Up to 5 | Up to 15 | N/A |
| **Cost** | $$ | $$$ | $ to $$$ |
| **Use Case** | Standard RDBMS | High performance RDBMS | NoSQL, massive scale |

================================================================

## Cost Considerations

[BackToTop](#table-of-contents)

### Pricing Components
```
1. Instance Hours: Based on instance type
   - db.t3.micro: ~$0.017/hour (~$12/month)
   - db.m5.large: ~$0.192/hour (~$140/month)

2. Storage: Based on allocated storage
   - gp3: $0.115 per GB-month
   - io1: $0.125 per GB-month + IOPS cost

3. Backup Storage: Free up to DB size, then $0.095 per GB-month

4. Data Transfer:
   - Within same AZ: Free
   - Between AZs (Multi-AZ): Free
   - Between regions (Read Replicas): $0.02 per GB
   - To internet: $0.09 per GB

5. Multi-AZ: ~2x instance cost (double instances)

6. Read Replicas: Additional instance cost per replica
```

### Cost Optimization
```
✅ Use Reserved Instances (1 or 3 years) - up to 69% savings
✅ Right-size instances (use CloudWatch metrics)
✅ Delete unused snapshots
✅ Use gp3 instead of io1 (if sufficient)
✅ Stop dev/test databases when not in use
✅ Use Aurora Serverless for variable workloads
✅ Monitor and optimize storage
✅ Use S3 for large objects (not DB)
```

## Limitations & Constraints

[BackToTop](#table-of-contents)

### Instance Limits
- **Maximum storage**: 64 TB (SQL Server: 16 TB)
- **Maximum IOPS**: 256,000 (io2 Block Express)
- **Read Replicas**: 5 per primary (15 for Aurora)
- **Backup retention**: 35 days maximum
- **Snapshot size**: Same as DB size

### Performance Limits
- **Connection limits**: Depends on instance type
- **IOPS**: Depends on storage type and size
- **Throughput**: Depends on instance type

### Regional Limits
- **Multi-AZ**: Same region only
- **Read Replicas**: Can be cross-region
- **Snapshots**: Can copy cross-region

---

## Best Practices 
⭐⭐⭐⭐⭐

[BackToTop](#table-of-contents)

### High Availability
```
✅ Enable Multi-AZ for production
✅ Use Read Replicas for read scaling
✅ Regular backup testing
✅ Monitor failover metrics
✅ Use connection pooling
```

### Security
```
✅ Enable encryption at rest
✅ Use SSL/TLS for connections
✅ Deploy in private subnets
✅ Use IAM database authentication
✅ Rotate credentials with Secrets Manager
✅ Restrict security group rules
✅ Enable deletion protection
```

### Performance
```
✅ Use appropriate instance type
✅ Use Provisioned IOPS for I/O intensive
✅ Enable Enhanced Monitoring
✅ Use Performance Insights
✅ Optimize queries (use indexes)
✅ Use connection pooling
✅ Monitor CloudWatch metrics
```

### Backup and Recovery
```
✅ Enable automated backups
✅ Set appropriate retention period
✅ Take manual snapshots before changes
✅ Test restore procedures
✅ Copy snapshots to other regions (DR)
✅ Tag snapshots for organization
```

### Cost Optimization
```
✅ Use Reserved Instances for production
✅ Right-size instances
✅ Use gp3 storage
✅ Delete old snapshots
✅ Stop non-production databases
✅ Monitor costs with Cost Explorer
```
---

## Pros & Cons
[BackToTop](#table-of-contents)

**Pros**:
- Fully managed (no OS management)
- Automatic backups and patching
- Multi-AZ for high availability
- Read Replicas for scaling
- Multiple database engines
- Easy to set up and use
- Integration with AWS services
- Point-in-time recovery

**Cons**:
- No root/SSH access
- Limited customization
- Cannot install custom software
- Vendor lock-in (some features)
- More expensive than self-managed
- Maintenance windows required
- Scaling requires downtime (vertical)

---

# Amazon Aurora
[BackToTop](#table-of-contents)
## Core Concepts 
⭐⭐⭐⭐⭐ (CRITICAL)
- **AWS proprietary database** (cloud-native)
- **MySQL and PostgreSQL compatible**
- **5x faster than MySQL, 3x faster than PostgreSQL**
- **Up to 128 TB storage** (auto-scaling)
- **Up to 15 Read Replicas**
- **6 copies across 3 AZs** (automatic)

## Aurora vs RDS MySQL/PostgreSQL
[BackToTop](#table-of-contents)
| Feature | Aurora | RDS MySQL/PostgreSQL |
|---------|--------|---------------------|
| **Performance** | 5x MySQL, 3x PostgreSQL | Standard |
| **Storage** | Auto-scaling (10GB-128TB) | Manual (up to 64TB) |
| **Replicas** | Up to 15 | Up to 5 |
| **Replication Lag** | <10ms | Varies |
| **Failover** | <30 seconds | 1-2 minutes |
| **Copies** | 6 copies, 3 AZs | 2 copies (Multi-AZ) |
| **Cost** | ~20% more | Baseline |
| **Backtrack** | Yes (MySQL only) | No |

---

## Aurora Architecture 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### Storage Architecture
```
Shared Storage Layer (Cluster Volume):
- 6 copies across 3 AZs (automatic)
- 10GB increments (auto-scaling to 128TB)
- Self-healing (corrupt blocks repaired automatically)
- Continuous backup to S3

Compute Layer:
- Primary Instance (read/write)
- Up to 15 Read Replicas (read-only)
- All instances share same storage
```

### High Availability
```
6 Copies Across 3 AZs:
- 4 copies for writes (quorum)
- 3 copies for reads
- Can lose 2 copies without affecting writes
- Can lose 3 copies without affecting reads
- Self-healing with peer-to-peer replication

Automatic Failover:
- <30 seconds (vs 1-2 minutes for RDS)
- Promotes read replica to primary
- No data loss
```
---
## Aurora Endpoints 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### 1. Cluster Endpoint (Writer Endpoint)
```
Purpose: Write operations
Points to: Primary instance
Failover: Automatically points to new primary
Use: All write operations

Example: mydb.cluster-xxxxx.us-east-1.rds.amazonaws.com
```

### 2. Reader Endpoint
```
Purpose: Read operations
Points to: All read replicas (load balanced)
Failover: Automatically removes failed replicas
Use: Read-only queries

Example: mydb.cluster-ro-xxxxx.us-east-1.rds.amazonaws.com
```

### 3. Custom Endpoints
```
Purpose: Specific read replicas
Points to: Subset of instances
Use: Different workloads (analytics, reporting)

Example: analytics.cluster-custom-xxxxx.us-east-1.rds.amazonaws.com
```

### 4. Instance Endpoints
```
Purpose: Specific instance
Points to: Individual instance
Use: Direct connection (testing, troubleshooting)

Example: mydb-instance-1.xxxxx.us-east-1.rds.amazonaws.com
```
---
## Aurora Features
[BackToTop](#table-of-contents)
### 1. Aurora Auto Scaling ⭐⭐⭐⭐
```
Read Replica Auto Scaling:
- Automatically adds/removes read replicas
- Based on CPU, connections, or custom metrics
- Min and max replica count
- Scale out during high load
- Scale in during low load

Use Cases:
- Variable read workloads
- Unpredictable traffic
- Cost optimization
```

### 2. Aurora Global Database ⭐⭐⭐⭐
```
Architecture:
Primary Region (Read/Write) → Secondary Regions (Read-Only)
- Replication lag: <1 second
- Up to 5 secondary regions
- Up to 16 read replicas per secondary region

Use Cases:
- Global applications
- Disaster recovery (cross-region)
- Low-latency reads globally
- Business continuity

Failover:
- Promote secondary region to primary
- RTO: <1 minute
- RPO: <1 second (typical)
```

### 3. Aurora Backtrack (MySQL only) ⭐⭐⭐
```
Features:
- Rewind database to specific point in time
- No need to restore from backup
- In-place operation (seconds)
- Up to 72 hours back
- No data loss

Use Cases:
- Undo mistakes (accidental DELETE)
- Test different scenarios
- Quick recovery from errors

vs. Point-in-Time Recovery:
- Backtrack: Seconds, in-place
- PITR: Minutes, creates new instance
```

### 4. Aurora Cloning ⭐⭐⭐
```
Features:
- Create copy of database
- Copy-on-write protocol (fast)
- Uses minimal storage initially
- Independent from source

Use Cases:
- Dev/test environments
- Testing changes
- Analytics without impacting production
- Cost-effective copies
```

### 5. Aurora Machine Learning ⭐⭐
```
Integration:
- SageMaker (ML models)
- Comprehend (sentiment analysis)

Use Cases:
- Fraud detection
- Recommendations
- Sentiment analysis
- Predictions

SQL Functions:
- aws_sagemaker_invoke_endpoint()
- aws_comprehend_detect_sentiment()
```

## Aurora Serverless (Covered Separately)
See dedicated  [Amazon Aurora Serverless](#amazon-aurora-serverless) section below.

## When to Use Aurora
[BackToTop](#table-of-contents)
### ✅ Use Aurora When
- Need high performance (5x MySQL, 3x PostgreSQL)
- Need high availability (6 copies, 3 AZs)
- Need fast failover (<30 seconds)
- Need many read replicas (up to 15)
- Need auto-scaling storage (up to 128TB)
- Global applications (Aurora Global Database)
- MySQL or PostgreSQL compatible needed

### ❌ Don't Use Aurora When
- Need other database engines (Oracle, SQL Server) → Use RDS
- Cost is primary concern → Use RDS (Aurora is ~20% more)
- Simple, small database → Use RDS
- Need NoSQL → Use DynamoDB
- Variable workloads → Use Aurora Serverless
--- 
## Keywords to Identify Aurora
[BackToTop](#table-of-contents)
- "High performance"
- "5x faster than MySQL"
- "3x faster than PostgreSQL"
- "Cloud-native database"
- "15 read replicas"
- "Auto-scaling storage"
- "Global database"
- "Fast failover"
- "128 TB storage"
---
## Common Exam Scenarios
[BackToTop](#table-of-contents)
### Scenario 1: High Performance MySQL
**Question**: MySQL database needs 5x better performance

**Answer**: Migrate to Amazon Aurora MySQL

**Why**:
- 5x faster than standard MySQL
- MySQL compatible (easy migration)
- Same SQL syntax
- Better performance without code changes

================================================================
### Scenario 2: Global Application
**Question**: Application users worldwide need low-latency database access

**Answer**: Use Aurora Global Database

**Why**:
- Primary region for writes
- Secondary regions for local reads
- <1 second replication lag
- Up to 5 secondary regions

================================================================
### Scenario 3: Many Read Replicas
**Question**: Need more than 5 read replicas for read-heavy workload

**Answer**: Use Aurora (supports up to 15 read replicas)

**Why**:
- RDS limited to 5 read replicas
- Aurora supports up to 15
- Better read scaling
- Lower replication lag

================================================================
### Scenario 4: Fast Disaster Recovery
**Question**: Need cross-region DR with <1 minute RTO

**Answer**: Use Aurora Global Database

**Why**:
- <1 second replication lag
- Promote secondary region in <1 minute
- Minimal data loss (RPO <1 second)
- Automated failover

================================================================
### Scenario 5: Undo Accidental Changes
**Question**: Developer accidentally deleted data, need to recover quickly

**Answer**: Use Aurora Backtrack (MySQL only)

**Why**:
- Rewind database in seconds
- No need to restore from backup
- In-place operation
- Up to 72 hours back

---
## Aurora Pricing
[BackToTop](#table-of-contents)
### Pricing Components
```
1. Instance Hours:
   - db.r5.large: ~$0.29/hour (~$211/month)
   - db.r5.xlarge: ~$0.58/hour (~$422/month)

2. Storage:
   - $0.10 per GB-month (auto-scaling)
   - Charged for high-water mark

3. I/O Requests:
   - $0.20 per million requests

4. Backup Storage:
   - Free up to DB size
   - $0.021 per GB-month beyond

5. Data Transfer:
   - Same as RDS

6. Global Database:
   - Replication: $0.20 per million replicated write I/Os
```

### Cost Comparison
```
Aurora vs RDS MySQL:
- Aurora: ~20% more expensive
- But: Better performance, more features
- Break-even: High-performance workloads

Example (db.r5.large):
RDS MySQL: ~$175/month (instance + storage)
Aurora: ~$211/month (instance) + $10/month (100GB storage) = ~$221/month
Difference: ~26% more
```

### Cost Optimization
```
✅ Use Aurora Serverless for variable workloads
✅ Use Reserved Instances (up to 69% savings)
✅ Monitor I/O usage (optimize queries)
✅ Delete old backups
✅ Use Aurora Serverless v2 for dev/test
✅ Right-size instances
```
---
## Aurora Limitations & Constraints
[BackToTop](#table-of-contents)
- **Storage**: 128 TB maximum
- **Read Replicas**: 15 maximum
- **Global Database**: 5 secondary regions maximum
- **Backtrack**: MySQL only, 72 hours maximum
- **Engines**: MySQL and PostgreSQL only
- **Regional**: Primary in one region (Global DB for multi-region)
---
## Aurora Best Practices
[BackToTop](#table-of-contents)
### High Availability
```
✅ Use at least 2 read replicas (different AZs)
✅ Enable deletion protection
✅ Use cluster endpoint for writes
✅ Use reader endpoint for reads
✅ Monitor failover metrics
```

### Performance
```
✅ Use appropriate instance type
✅ Use reader endpoint for load balancing
✅ Enable Performance Insights
✅ Optimize queries (reduce I/O)
✅ Use custom endpoints for specific workloads
✅ Monitor I/O metrics
```

### Global Applications
```
✅ Use Aurora Global Database
✅ Place secondary regions near users
✅ Use local read replicas
✅ Test failover procedures
✅ Monitor replication lag
```
---
## Aurora Pros & Cons
[BackToTop](#table-of-contents)

**Pros**:
- Exceptional performance (5x MySQL, 3x PostgreSQL)
- High availability (6 copies, 3 AZs)
- Fast failover (<30 seconds)
- Auto-scaling storage (up to 128TB)
- Up to 15 read replicas
- Global database support
- Backtrack feature (MySQL)
- Continuous backup to S3
- Self-healing storage

**Cons**:
- More expensive than RDS (~20%)
- MySQL and PostgreSQL only
- Vendor lock-in (AWS proprietary)
- More complex than RDS
- I/O costs can add up
- Learning curve

---

# Amazon Aurora Serverless
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐
- **On-demand, auto-scaling** Aurora
- **Pay per second** for database capacity used
- Automatically starts, stops, and scales
- **No instance management**
- Two versions: v1 and v2
---
## Aurora Serverless v1 vs v2
[BackToTop](#table-of-contents)
| Feature | Aurora Serverless v1 | Aurora Serverless v2 |
|---------|---------------------|---------------------|
| **Scaling** | Incremental (doubles) | Fine-grained (0.5 ACU increments) |
| **Scaling Speed** | Minutes | Seconds (instant) |
| **Pause** | Yes (after 5 min idle) | Yes (after 1 min idle) |
| **Connections** | Proxy (can drop) | Direct (no drops) |
| **Read Replicas** | No | Yes |
| **Global Database** | No | Yes |
| **Multi-AZ** | Yes | Yes |
| **Use Case** | Infrequent, intermittent | Variable, unpredictable |

**Recommendation**: Use v2 for new applications (better in every way)

---
## Aurora Capacity Units (ACUs)
[BackToTop](#table-of-contents)
### What is an ACU?
```
1 ACU = Combination of:
- ~2 GB RAM
- CPU
- Networking

Minimum: 0.5 ACU (v2), 1 ACU (v1)
Maximum: 128 ACU (configurable)
```

### Scaling Behavior
```
Aurora Serverless v1:
- Scales in increments: 1, 2, 4, 8, 16, 32, 64, 128 ACUs
- Scaling time: 30-60 seconds
- Can pause after 5 minutes idle

Aurora Serverless v2:
- Scales in 0.5 ACU increments
- Scaling time: Instant (seconds)
- Can pause after 1 minute idle
- No connection drops during scaling
```
---
## How Aurora Serverless Works
[BackToTop](#table-of-contents)
### Architecture
```
Client → Data API / Proxy → Aurora Serverless Cluster
                                    ↓
                          Auto-scaling Compute
                                    ↓
                          Shared Storage (6 copies, 3 AZs)
```

### Auto-Pause and Resume
```
Auto-Pause:
- After idle period (5 min v1, 1 min v2)
- Stops compute (no compute charges)
- Storage still charged
- Automatic resume on connection

Auto-Resume:
- On new connection
- Takes ~25 seconds (v1), ~10 seconds (v2)
- Transparent to application
```
---
## Data API ⭐⭐⭐
[BackToTop](#table-of-contents)
### What is Data API?
```
HTTP-based API for Aurora Serverless:
- No persistent database connections
- Perfect for Lambda functions
- No connection pooling needed
- Automatic connection management

Supported:
- Aurora Serverless v1 (MySQL and PostgreSQL)
- Aurora Serverless v2 (MySQL and PostgreSQL)
```

### Use Cases
```
✅ Lambda functions accessing database
✅ Serverless applications
✅ Microservices
✅ Intermittent workloads
✅ No connection management needed
```

### Example (Lambda + Data API)
```python
import boto3

rds_data = boto3.client('rds-data')

response = rds_data.execute_statement(
    resourceArn='arn:aws:rds:us-east-1:123456789012:cluster:my-cluster',
    secretArn='arn:aws:secretsmanager:us-east-1:123456789012:secret:my-secret',
    database='mydb',
    sql='SELECT * FROM users WHERE id = :id',
    parameters=[{'name': 'id', 'value': {'longValue': 123}}]
)
```
---
## When to Use Aurora Serverless
[BackToTop](#table-of-contents)
### ✅ Use Aurora Serverless When
- **Infrequent or intermittent** workloads
- **Unpredictable** workload patterns
- **Development and testing** databases
- **New applications** with unknown capacity
- **Serverless applications** (Lambda)
- Want to **minimize costs** (pay per second)
- Don't want to manage capacity
- Variable traffic (spiky workloads)

### ❌ Don't Use Aurora Serverless When
- Need **consistent, predictable** performance → Use Aurora Provisioned
- Need **read replicas** → Use Aurora Provisioned (or v2)
- Need **custom endpoints** → Use Aurora Provisioned
- Need **maximum performance** → Use Aurora Provisioned
- 24/7 steady workload → Use Aurora Provisioned (cheaper)
---
## Keywords to Identify Aurora Serverless
[BackToTop](#table-of-contents)
- "Intermittent workload"
- "Unpredictable traffic"
- "Infrequent usage"
- "Pay per second"
- "Auto-scaling database"
- "Serverless database"
- "Variable workload"
- "Development database"
- "Lambda accessing database"
---
## Aurora Serverless Common Exam Scenarios
[BackToTop](#table-of-contents)
### Scenario 1: Infrequent Application
**Question**: Application used only during business hours, database idle at night

**Answer**: Use Aurora Serverless with auto-pause

**Why**:
- Auto-pauses when idle (no compute cost)
- Auto-resumes when needed
- Pay only for usage
- No manual start/stop

================================================================
### Scenario 2: Lambda Function Database Access
**Question**: Lambda functions need to query database without managing connections

**Answer**: Use Aurora Serverless with Data API

**Why**:
- No connection pooling needed
- HTTP-based API
- Perfect for Lambda
- Automatic connection management

================================================================
### Scenario 3: Unpredictable Startup
**Question**: New application with unknown database capacity requirements

**Answer**: Use Aurora Serverless v2

**Why**:
- Auto-scales based on demand
- No capacity planning needed
- Pay for actual usage
- Can switch to provisioned later

================================================================
### Scenario 4: Dev/Test Environment
**Question**: Development database needs to minimize costs

**Answer**: Use Aurora Serverless with auto-pause

**Why**:
- Pauses when not in use
- Resumes automatically
- Pay only for active time
- Cost-effective for dev/test
---
## Aurora Serverless Pricing
[BackToTop](#table-of-contents)
### Pricing Model
```
Aurora Serverless v1:
- $0.06 per ACU-hour (MySQL)
- $0.06 per ACU-hour (PostgreSQL)
- Storage: $0.10 per GB-month
- I/O: $0.20 per million requests
- Backup: $0.021 per GB-month

Aurora Serverless v2:
- $0.12 per ACU-hour (MySQL)
- $0.12 per ACU-hour (PostgreSQL)
- Storage: $0.10 per GB-month
- I/O: $0.20 per million requests
- Backup: $0.021 per GB-month

Note: v2 is 2x price per ACU but scales better
```

### Cost Comparison Example
```
Scenario: Database used 8 hours/day, 5 days/week

Aurora Provisioned (db.r5.large):
- $0.29/hour × 730 hours = $211/month
- Always running

Aurora Serverless v2 (average 2 ACUs):
- $0.12/ACU-hour × 2 ACUs × 160 hours = $38.40/month
- Only when active

Savings: ~82% for intermittent workloads
```

### Cost Optimization
```
✅ Enable auto-pause for idle periods
✅ Set appropriate min/max ACU limits
✅ Use v2 for better scaling efficiency
✅ Monitor ACU usage with CloudWatch
✅ Use Data API to avoid connection overhead
✅ Optimize queries to reduce I/O
```
---
## Aurora Serverless Limitations & Constraints
[BackToTop](#table-of-contents)
### Aurora Serverless v1
- **Scaling**: Incremental (doubles), can take minutes
- **Connections**: Can drop during scaling
- **No read replicas**
- **No Global Database**
- **No custom endpoints**
- **Pause time**: 5 minutes minimum

### Aurora Serverless v2
- **Minimum ACU**: 0.5 (can't go lower)
- **Maximum ACU**: 128 (configurable)
- **Pause time**: 1 minute minimum
- **Cost**: 2x per ACU vs v1

### Both Versions
- **MySQL and PostgreSQL only**
- **Same region only** (no cross-region replicas in v1)
- **VPC required**
- **Data API**: Limited SQL features
---
## Aurora Serverless Best Practices
[BackToTop](#table-of-contents)
### Configuration
```
✅ Set appropriate min/max ACU limits
✅ Enable auto-pause for cost savings
✅ Use v2 for production workloads
✅ Use Data API for Lambda integration
✅ Monitor scaling metrics
```

### Performance
```
✅ Optimize queries (reduce I/O)
✅ Use connection pooling (if not using Data API)
✅ Monitor ACU usage patterns
✅ Adjust min/max ACU based on metrics
✅ Use CloudWatch alarms for scaling issues
```

### Cost Management
```
✅ Enable auto-pause for idle periods
✅ Set max ACU to prevent runaway costs
✅ Monitor costs with Cost Explorer
✅ Use tags for cost allocation
✅ Review ACU usage regularly
```
---
## Aurora Serverless Pros & Cons
[BackToTop](#table-of-contents)

**Pros**:
- Pay per second (cost-effective for intermittent)
- Auto-scaling (no capacity planning)
- Auto-pause (zero compute cost when idle)
- No instance management
- Data API (perfect for Lambda)
- Fast scaling (v2)
- Easy to use

**Cons**:
- More expensive per ACU than provisioned (if 24/7)
- Cold start delay (pause/resume)
- Limited features vs provisioned (v1)
- Minimum ACU cost (even when idle, if not paused)
- Learning curve for capacity planning
- v2 is 2x cost per ACU vs v1

---
---
# Amazon DynamoDB
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐⭐ (CRITICAL)
- **Fully managed NoSQL database**
- **Key-value and document** database
- **Single-digit millisecond** latency
- **Serverless** - no servers to manage
- **Automatic scaling**
- **Multi-AZ** by default (3 AZs)
- **Massive scale** (trillions of requests/day)

---

## DynamoDB vs RDS/Aurora
[BackToTop](#table-of-contents)
| Feature | DynamoDB | RDS/Aurora |
|---------|----------|------------|
| **Type** | NoSQL (key-value, document) | SQL (relational) |
| **Schema** | Flexible (schemaless) | Fixed schema |
| **Scaling** | Horizontal (automatic) | Vertical + read replicas |
| **Latency** | Single-digit milliseconds | Milliseconds to seconds |
| **Queries** | Key-based, limited | Complex SQL queries |
| **Transactions** | Limited (ACID on single item) | Full ACID |
| **Joins** | No | Yes |
| **Use Case** | Massive scale, simple queries | Complex queries, relationships |
| **Cost** | Pay per request or capacity | Pay per instance |

---

## Core Components ⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### 1. Tables
- Collection of items
- No fixed schema
- Primary key required

### 2. Items
- Individual records (like rows)
- Collection of attributes
- Maximum size: 400 KB

### 3. Attributes
- Data elements (like columns)
- Name-value pairs
- Flexible types (string, number, binary, boolean, null, list, map, set)

### 4. Primary Keys ⭐⭐⭐⭐⭐

#### Partition Key (Simple Primary Key)
```
Structure: Partition Key only
Example: UserID

Use when:
- Unique identifier exists
- Simple access patterns
- No need for sorting

Example Table: Users
- Partition Key: UserID
- Query: Get user by UserID
```

#### Composite Primary Key (Partition Key + Sort Key)
```
Structure: Partition Key + Sort Key
Example: UserID (partition) + Timestamp (sort)

Use when:
- Need to query related items
- Need sorting
- One-to-many relationships

Example Table: Orders
- Partition Key: UserID
- Sort Key: OrderDate
- Query: Get all orders for user, sorted by date
```

**Key Concept**: Partition key determines which partition stores the item. Sort key determines order within partition.

---

## Capacity Modes ⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### 1. On-Demand Mode
```
Features:
- Pay per request
- No capacity planning
- Automatic scaling
- Instant scaling to any workload
- No throttling (within limits)

Pricing:
- $1.25 per million write requests
- $0.25 per million read requests
- Storage: $0.25 per GB-month

Use when:
- Unpredictable workloads
- New applications (unknown traffic)
- Spiky traffic
- Pay-as-you-go preferred
```

### 2. Provisioned Mode
```
Features:
- Specify RCU (Read Capacity Units) and WCU (Write Capacity Units)
- Auto-scaling available
- Predictable performance
- Lower cost for steady workloads

Pricing:
- $0.00065 per WCU-hour
- $0.00013 per RCU-hour
- Storage: $0.25 per GB-month

Use when:
- Predictable workloads
- Steady traffic
- Cost optimization (cheaper than on-demand for 24/7)
- Can forecast capacity
```

### Capacity Units Explained
```
1 WCU (Write Capacity Unit):
- 1 write per second
- For item up to 1 KB
- Example: 10 WCU = 10 writes/sec of 1 KB items

1 RCU (Read Capacity Unit):
- 1 strongly consistent read per second
- OR 2 eventually consistent reads per second
- For item up to 4 KB
- Example: 10 RCU = 10 strongly consistent reads/sec of 4 KB items

Calculation Example:
- Write 100 items/sec, each 2 KB
- WCU needed: 100 × (2 KB / 1 KB) = 200 WCU

- Read 100 items/sec, each 8 KB (eventually consistent)
- RCU needed: 100 × (8 KB / 4 KB) / 2 = 100 RCU
```
---
## Read Consistency ⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### Eventually Consistent Reads (Default)
```
- May not reflect recent write
- Consistency within 1 second (typically)
- Uses 0.5 RCU per 4 KB
- Cheaper (2x more reads per RCU)
- Default behavior

Use when:
- Slight delay acceptable
- Cost optimization
- Read-heavy workloads
```

### Strongly Consistent Reads
```
- Always reflects recent writes
- Returns most up-to-date data
- Uses 1 RCU per 4 KB
- More expensive
- Must explicitly request

Use when:
- Need latest data immediately
- Critical reads (financial, inventory)
- After write, immediate read
```
---
## Secondary Indexes ⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### 1. Local Secondary Index (LSI)
```
Definition:
- Same partition key as table
- Different sort key
- Created at table creation (cannot add later)
- Maximum 5 per table

Example:
Table: Orders (UserID, OrderDate)
LSI: Orders (UserID, OrderStatus)
- Query orders by user and status

Use when:
- Need alternative sort key
- Same partition key
- Query patterns known upfront

Limitations:
- Must create with table
- Cannot delete
- 10 GB per partition key limit
```

### 2. Global Secondary Index (GSI) 
⭐⭐⭐⭐⭐
```
Definition:
- Different partition key and/or sort key
- Can be created anytime
- Has own RCU/WCU (provisioned mode)
- Maximum 20 per table

Example:
Table: Orders (UserID, OrderDate)
GSI: Orders-by-Status (OrderStatus, OrderDate)
- Query all orders by status

Use when:
- Need to query by different attributes
- Flexible query patterns
- Can add after table creation

Limitations:
- Eventually consistent only
- Additional cost (own capacity)
- Projection (which attributes to include)
```

### LSI vs GSI Comparison

| Feature | LSI | GSI |
|---------|-----|-----|
| **Partition Key** | Same as table | Different |
| **Sort Key** | Different | Different |
| **Creation** | At table creation only | Anytime |
| **Consistency** | Strongly or eventually | Eventually only |
| **Capacity** | Shares table capacity | Own capacity (provisioned) |
| **Limit** | 5 per table | 20 per table |
| **Use Case** | Alternative sort, same partition | Query by different attributes |

---
## DynamoDB Streams ⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### What are Streams?
```
- Ordered flow of item-level changes
- Captures: INSERT, UPDATE, DELETE
- Retention: 24 hours
- Processed by Lambda, Kinesis, etc.

Stream Records Contain:
- Keys only
- New image (after change)
- Old image (before change)
- New and old images
```

### Use Cases
```
✅ Real-time analytics
✅ Replication to other tables/databases
✅ Trigger Lambda functions
✅ Audit trails
✅ Notifications
✅ Materialized views
✅ Cross-region replication
```

### Architecture Pattern
```
DynamoDB Table → DynamoDB Stream → Lambda Function → Action
                                                    ↓
                                          (Send SNS, update ElastiCache, etc.)
```

---

## DynamoDB Accelerator (DAX) 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### What is DAX?
```
- In-memory cache for DynamoDB
- Microsecond latency (vs milliseconds)
- Fully managed
- No application code changes (DynamoDB-compatible API)
- Write-through cache
```

### Architecture
```
Application → DAX Cluster → DynamoDB Table
              (Cache Hit: microseconds)
              (Cache Miss: milliseconds, then cached)
```

### Features
```
- Item cache: Individual items
- Query cache: Query and scan results
- TTL: Configurable (default 5 minutes)
- Multi-AZ: 3+ nodes recommended
- Encryption: At rest and in transit
```

### DAX vs ElastiCache

| Feature | DAX | ElastiCache |
|---------|-----|-------------|
| **Purpose** | DynamoDB cache only | General-purpose cache |
| **API** | DynamoDB-compatible | Redis/Memcached |
| **Integration** | Native DynamoDB | Manual integration |
| **Latency** | Microseconds | Sub-millisecond |
| **Use Case** | DynamoDB acceleration | Any caching need |
| **Code Changes** | Minimal | Significant |

### When to Use DAX
```
✅ Read-heavy workloads
✅ Need microsecond latency
✅ Repeated reads of same items
✅ Cost optimization (reduce RCU)
✅ Eventually consistent reads acceptable

❌ Don't use when:
- Write-heavy workloads
- Need strongly consistent reads
- Infrequent reads
- Cost is primary concern
```
---
## Global Tables ⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### What are Global Tables?
```
- Multi-region, multi-active replication
- Fully managed
- Automatic replication
- Sub-second replication latency
- Active-active (read/write in any region)
```

### Architecture
```
Region 1 (us-east-1): DynamoDB Table ←→ Replication ←→ Region 2 (eu-west-1): DynamoDB Table
                                                     ←→ Region 3 (ap-south-1): DynamoDB Table
```

### Features
```
- Multi-region replication
- Active-active (write to any region)
- Automatic conflict resolution (last writer wins)
- Disaster recovery
- Low-latency global access
```

### Use Cases
```
✅ Global applications
✅ Disaster recovery (multi-region)
✅ Low-latency access worldwide
✅ Business continuity
✅ Compliance (data residency)
```

### Requirements
```
- DynamoDB Streams must be enabled
- Same table name in all regions
- Same primary key structure
- On-Demand or Auto Scaling recommended
```

---
## Point-in-Time Recovery (PITR) 
⭐⭐⭐
[BackToTop](#table-of-contents)
### Features
```
- Continuous backups
- Restore to any point in last 35 days
- No performance impact
- Restore to new table
- Enabled per table

Use Cases:
- Accidental deletes
- Accidental updates
- Compliance requirements
- Disaster recovery
```

### On-Demand Backups
```
- Manual backups
- Retained until deleted
- No performance impact
- Restore to new table
- Can copy across regions
```
---
## Time to Live (TTL) ⭐⭐⭐
[BackToTop](#table-of-contents)
### What is TTL?
```
- Automatically delete expired items
- No additional cost
- Specify TTL attribute (Unix timestamp)
- Deleted within 48 hours of expiration
- DynamoDB Streams captures deletions
```

### Use Cases
```
✅ Session data (expire after timeout)
✅ Temporary data (OTPs, tokens)
✅ Event logs (delete after 90 days)
✅ Compliance (data retention policies)
✅ Cost optimization (reduce storage)
```

### Example
```
Item:
{
  "UserID": "123",
  "SessionToken": "abc",
  "ExpirationTime": 1640000000  // Unix timestamp
}

TTL Attribute: ExpirationTime
Result: Item deleted after timestamp passes
```
---
## DynamoDB Transactions ⭐⭐⭐
[BackToTop](#table-of-contents)
### What are Transactions?
```
- ACID transactions across multiple items
- All-or-nothing operations
- Up to 100 items or 4 MB
- 2x cost (consumes 2x RCU/WCU)

Operations:
- TransactWriteItems (up to 25 items)
- TransactGetItems (up to 25 items)
```

### Use Cases
```
✅ Financial transactions
✅ Order processing (inventory + order)
✅ Multi-item updates (consistency required)
✅ Atomic operations across items
```

### Example
```
Transaction: Transfer money between accounts
1. Deduct from Account A
2. Add to Account B
Result: Both succeed or both fail (atomic)
```
---
## When to Use DynamoDB
[BackToTop](#table-of-contents)
### ✅ Use DynamoDB When
- Need **massive scale** (millions of requests/sec)
- Need **single-digit millisecond** latency
- **Serverless** architecture preferred
- **Simple queries** (key-based access)
- **Flexible schema** needed
- **High availability** required (Multi-AZ default)
- **Mobile/web/gaming** applications
- **IoT** applications (high write throughput)
- **Session management**
- **Shopping carts**

### ❌ Don't Use DynamoDB When
- Need **complex queries** (joins, aggregations) → Use RDS/Aurora
- Need **ACID transactions** across multiple tables → Use RDS/Aurora
- Need **ad-hoc queries** → Use RDS/Aurora
- **Relational data** with many relationships → Use RDS/Aurora
- Need **full SQL** support → Use RDS/Aurora
- **Analytics workloads** → Use Redshift
- **Small, predictable workload** → RDS may be cheaper
---
## Keywords to Identify DynamoDB
[BackToTop](#table-of-contents)
- "NoSQL"
- "Key-value database"
- "Single-digit millisecond latency"
- "Serverless database"
- "Massive scale"
- "Millions of requests"
- "Flexible schema"
- "Mobile/web application"
- "Gaming application"
- "IoT"
- "Session data"
- "Shopping cart"

---
## DynamoDB Common Exam Scenarios
[BackToTop](#table-of-contents)

### Scenario 1: Massive Scale, Low Latency
**Question**: Application needs to handle millions of requests per second with single-digit millisecond latency

**Answer**: Use Amazon DynamoDB

**Why**:
- Designed for massive scale
- Single-digit millisecond latency
- Automatic scaling
- Serverless (no capacity limits)

### Scenario 2: Microsecond Latency
**Question**: DynamoDB application needs microsecond latency for read-heavy workload

**Answer**: Use DynamoDB with DAX

**Why**:
- DAX provides microsecond latency
- In-memory cache
- No code changes needed
- Reduces RCU costs

### Scenario 3: Global Application
**Question**: Application users worldwide need low-latency database access

**Answer**: Use DynamoDB Global Tables

**Why**:
- Multi-region replication
- Active-active (write to any region)
- Sub-second replication
- Low latency globally

### Scenario 4: Session Management
**Question**: Store user session data that expires after 1 hour

**Answer**: Use DynamoDB with TTL

**Why**:
- Automatic expiration
- No manual cleanup needed
- No additional cost
- Perfect for session data

### Scenario 5: Real-Time Processing
**Question**: Trigger Lambda function when DynamoDB item is modified

**Answer**: Enable DynamoDB Streams, configure Lambda trigger

**Why**:
- Streams capture all changes
- Lambda processes in real-time
- Event-driven architecture
- No polling needed

### Scenario 6: Unpredictable Traffic
**Question**: New application with unknown traffic patterns

**Answer**: Use DynamoDB On-Demand mode

**Why**:
- No capacity planning
- Automatic scaling
- Pay per request
- No throttling

### Scenario 7: Query by Different Attributes
**Question**: Need to query orders by UserID and also by OrderStatus

**Answer**: Create Global Secondary Index (GSI) on OrderStatus

**Why**:
- GSI allows querying by different attributes
- Can create after table creation
- Flexible query patterns

---
## DynamoDB Best Practices ⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### Design Patterns
```
✅ Use composite keys for one-to-many relationships
✅ Denormalize data (avoid joins)
✅ Use GSI for additional query patterns
✅ Keep item size < 400 KB
✅ Use sparse indexes (GSI with subset of items)
✅ Batch operations (BatchGetItem, BatchWriteItem)
```

### Performance
```
✅ Use eventually consistent reads (when possible)
✅ Use DAX for read-heavy workloads
✅ Distribute partition keys evenly (avoid hot partitions)
✅ Use burst capacity wisely
✅ Monitor throttling with CloudWatch
```

### Cost Optimization
```
✅ Use On-Demand for unpredictable workloads
✅ Use Provisioned with Auto Scaling for steady workloads
✅ Use eventually consistent reads (2x cheaper)
✅ Enable TTL to delete expired items
✅ Use S3 for large objects (store reference in DynamoDB)
✅ Monitor and optimize GSI usage
✅ Use Reserved Capacity for predictable workloads (save up to 77%)
```

### Security
```
✅ Enable encryption at rest
✅ Use VPC endpoints for private access
✅ Use IAM roles for access control
✅ Enable Point-in-Time Recovery (PITR)
✅ Use fine-grained access control
✅ Enable CloudTrail logging
```
---
## DynamoDB Pricing
[BackToTop](#table-of-contents)

### On-Demand Mode
```
Write Requests: $1.25 per million
Read Requests: $0.25 per million
Storage: $0.25 per GB-month

Example (1 million writes, 10 million reads, 10 GB):
Writes: 1 × $1.25 = $1.25
Reads: 10 × $0.25 = $2.50
Storage: 10 × $0.25 = $2.50
Total: $6.25/month
```

### Provisioned Mode
```
WCU: $0.00065 per hour ($0.47/month per WCU)
RCU: $0.00013 per hour ($0.09/month per RCU)
Storage: $0.25 per GB-month

Example (10 WCU, 50 RCU, 10 GB):
WCU: 10 × $0.47 = $4.70
RCU: 50 × $0.09 = $4.50
Storage: 10 × $0.25 = $2.50
Total: $11.70/month
```

### Additional Costs
```
DAX: $0.04 - $3.00+ per node-hour (depends on instance type)
Global Tables: Replicated write requests charged per region
Backups: $0.10 per GB-month
PITR: $0.20 per GB-month
Streams: $0.02 per 100,000 read requests
```
---
## DynamoDB Limitations & Constraints
[BackToTop](#table-of-contents)
- **Item size**: 400 KB maximum
- **Partition key**: 2048 bytes maximum
- **Sort key**: 1024 bytes maximum
- **Attribute name**: 64 KB maximum (UTF-8)
- **LSI**: 5 per table, 10 GB per partition key
- **GSI**: 20 per table
- **Batch operations**: 25 items (BatchGetItem, BatchWriteItem)
- **Transaction**: 100 items or 4 MB
- **Query result**: 1 MB maximum (pagination required)
- **Scan result**: 1 MB maximum (pagination required)

---
## DynamoDB Pros & Cons
[BackToTop](#table-of-contents)

**Pros**:
- Fully managed (serverless)
- Massive scale (trillions of requests/day)
- Single-digit millisecond latency
- Automatic scaling
- Multi-AZ by default (high availability)
- Flexible schema
- Global Tables (multi-region)
- DAX (microsecond latency)
- Streams (real-time processing)
- TTL (automatic expiration)
- No server management

**Cons**:
- Limited query capabilities (no joins)
- No complex aggregations
- Item size limit (400 KB)
- Learning curve (NoSQL design patterns)
- Can be expensive at scale (on-demand)
- Eventually consistent by default
- No ACID across multiple tables
- Vendor lock-in (AWS-specific)

---
---

# Amazon ElastiCache
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐⭐
- **Fully managed in-memory cache**
- Two engines: **Redis** and **Memcached**
- **Sub-millisecond latency**
- Reduce database load
- Session storage, caching, real-time analytics

## ElastiCache for Redis vs Memcached ⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
| Feature | Redis | Memcached |
|---------|-------|-----------|
| **Data Types** | Complex (strings, lists, sets, sorted sets, hashes) | Simple (strings only) |
| **Persistence** | Yes (snapshots, AOF) | No |
| **Replication** | Yes (Multi-AZ, read replicas) | No (multi-node) |
| **Backup/Restore** | Yes | No |
| **Transactions** | Yes | No |
| **Pub/Sub** | Yes | No |
| **Lua Scripts** | Yes | No |
| **Geospatial** | Yes | No |
| **Multi-threading** | No (single-threaded) | Yes (multi-threaded) |
| **Sharding** | Cluster mode | Client-side |
| **Use Case** | Advanced features, persistence | Simple caching, multi-threading |

**Quick Decision**:
- **Need persistence, replication, advanced features** → Redis
- **Need simple caching, multi-threading** → Memcached

---

## ElastiCache for Redis ⭐⭐⭐⭐⭐

### Key Features

#### 1. Replication and High Availability
```
Architecture:
Primary Node (Read/Write) → Replica Nodes (Read-only)
- Up to 5 read replicas
- Automatic failover (Multi-AZ)
- Asynchronous replication
- Read scaling

Multi-AZ:
- Automatic failover to replica
- Failover time: ~1 minute
- No data loss (replication lag minimal)
```

#### 2. Redis Cluster Mode ⭐⭐⭐⭐
```
Disabled (Default):
- Single shard (node group)
- 1 primary + up to 5 replicas
- All data in one shard
- Simpler, easier to manage

Enabled:
- Multiple shards (up to 500)
- Each shard: 1 primary + up to 5 replicas
- Data partitioned across shards
- Horizontal scaling
- Higher availability

Use Cluster Mode when:
✅ Need > 90 GB memory
✅ Need > 90 nodes
✅ Need horizontal scaling
✅ Need to partition data
```

#### 3. Persistence Options
```
RDB (Redis Database Backup):
- Point-in-time snapshots
- Scheduled or manual
- Good for backups
- Less frequent

AOF (Append-Only File):
- Logs every write operation
- Better durability
- Can replay to recover
- More frequent

Use:
- RDB: Backups, disaster recovery
- AOF: Maximum durability
- Both: Best durability + backups
```

#### 4. Redis Data Structures
```
Strings: Simple key-value
Lists: Ordered collections
Sets: Unordered unique collections
Sorted Sets: Ordered unique collections with scores
Hashes: Field-value pairs (like objects)
Bitmaps: Bit-level operations
HyperLogLogs: Cardinality estimation
Geospatial: Location-based data
Streams: Log data structure
```

### Redis Use Cases ⭐⭐⭐⭐
```
✅ Session store (web applications)
✅ Database query caching
✅ Leaderboards (sorted sets)
✅ Real-time analytics
✅ Pub/Sub messaging
✅ Rate limiting
✅ Geospatial applications
✅ Job queues
✅ Full-page caching
```
---
## ElastiCache for Memcached ⭐⭐⭐
[BackToTop](#table-of-contents)
### Key Features
```
- Simple key-value store
- Multi-threaded (better CPU utilization)
- Horizontal scaling (add/remove nodes)
- No persistence
- No replication
- Auto Discovery (automatic node discovery)
```

### Architecture
```
Multiple Nodes (1-40):
- Each node independent
- Data partitioned across nodes (client-side sharding)
- No replication
- If node fails, data lost
```

### Memcached Use Cases
```
✅ Simple caching
✅ Object caching
✅ Database query caching
✅ Session caching (if loss acceptable)
✅ HTML fragment caching
✅ Multi-threaded performance needed
```

## Caching Strategies ⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### 1. Lazy Loading (Cache-Aside)
```
Process:
1. Application requests data
2. Check cache
3. If cache hit: Return data
4. If cache miss:
   a. Query database
   b. Write to cache
   c. Return data

Pros:
✅ Only requested data cached
✅ Node failures not fatal
✅ Simple to implement

Cons:
❌ Cache miss penalty (3 network calls)
❌ Stale data possible
❌ Initial requests slow (cold cache)

Use when:
- Read-heavy workloads
- Can tolerate stale data
- Cache misses acceptable
```

### 2. Write-Through

```
Cons:
❌ Write penalty (2 writes)
❌ Missing data until written
❌ Cache churn (unused data cached)
❌ Wasted resources (cache data never read)

Use when:
- Write-heavy workloads
- Cannot tolerate stale data
- Data must be immediately consistent
```

### 3. Adding TTL (Time to Live)
```
Combine with Lazy Loading or Write-Through:
- Set expiration time on cached items
- Automatically removes stale data
- Balances freshness and performance

Example:
- Session data: TTL = 1 hour
- Product catalog: TTL = 24 hours
- User profile: TTL = 5 minutes

Benefits:
✅ Prevents indefinitely stale data
✅ Automatic cache cleanup
✅ Balances performance and freshness
```

### 4. Cache Eviction Policies
```
LRU (Least Recently Used): Default, removes least recently accessed
LFU (Least Frequently Used): Removes least frequently accessed
TTL: Removes expired items
Random: Removes random items
Volatile-LRU: LRU among items with TTL
Allkeys-LRU: LRU among all items

Recommendation: Use LRU or TTL for most cases
```
---
## ElastiCache Security ⭐⭐⭐⭐
[BackToTop](#table-of-contents)
### 1. Network Security
```
VPC Deployment:
- Deploy in private subnets
- Security groups control access
- No public internet access

VPC Peering:
- Access from other VPCs
- Cross-region access possible
```

### 2. Redis AUTH
```
- Password/token authentication
- Enabled at cluster creation
- Requires AUTH command
- Additional security layer

Use when:
- Need authentication
- Compliance requirements
- Multi-tenant environments
```

### 3. Encryption
```
At Rest:
- Encrypts disk data
- Encrypts backups
- Uses KMS

In Transit:
- TLS/SSL encryption
- Encrypts data in flight
- Redis only (not Memcached)

Enable both for maximum security
```

### 4. IAM Authentication (Redis 7+)
```
- Use IAM roles instead of passwords
- Token-based authentication
- Integrates with IAM policies
- More secure than Redis AUTH
```
---
## Monitoring and Maintenance
[BackToTop](#table-of-contents)

### CloudWatch Metrics
```
Key Metrics:
- CPUUtilization
- EngineCPUUtilization (Redis)
- DatabaseMemoryUsagePercentage
- CacheHits / CacheMisses
- Evictions
- CurrConnections
- NetworkBytesIn/Out
- ReplicationLag (Redis replicas)

Important Ratios:
- Cache Hit Ratio = CacheHits / (CacheHits + CacheMisses)
- Target: > 80%
```

### Maintenance Windows
```
- Weekly maintenance window
- Engine patches, OS updates
- Minimal downtime (Multi-AZ)
- Can be deferred
```
---
## Scaling ElastiCache
[BackToTop](#table-of-contents)

### Redis Scaling

#### Vertical Scaling (Scale Up/Down)
```
Process:
1. Create new cluster with larger/smaller nodes
2. Replicate data
3. Update application endpoint
4. Delete old cluster

Downtime:
- Cluster mode disabled: Yes (minutes)
- Cluster mode enabled: No (online scaling)
```

#### Horizontal Scaling (Scale Out/In)
```
Cluster Mode Disabled:
- Add read replicas (up to 5)
- Read scaling only
- No write scaling

Cluster Mode Enabled:
- Add/remove shards
- Resharding (redistribute data)
- Both read and write scaling
- Online operation (no downtime)
```

### Memcached Scaling
```
Horizontal Scaling:
- Add/remove nodes (1-40)
- Auto Discovery updates clients
- Data redistributed automatically
- No downtime

Vertical Scaling:
- Create new cluster with larger nodes
- Requires downtime
```
---
## When to Use ElastiCache
[BackToTop](#table-of-contents)

### ✅ Use ElastiCache When
- Need **sub-millisecond latency**
- **Reduce database load** (caching)
- **Session management** (web applications)
- **Real-time analytics** (leaderboards, counters)
- **Pub/Sub messaging** (Redis)
- **Rate limiting**
- **Job queues** (Redis)
- **Frequently accessed data**

### ❌ Don't Use ElastiCache When
- Need **persistent storage** → Use RDS/DynamoDB
- Need **complex queries** → Use RDS
- Need **long-term storage** → Use S3/RDS
- **Infrequently accessed data** → Not cost-effective
- Need **ACID transactions** → Use RDS
---
## Keywords to Identify ElastiCache
[BackToTop](#table-of-contents)

- "In-memory cache"
- "Sub-millisecond latency"
- "Reduce database load"
- "Session store"
- "Caching layer"
- "Redis" or "Memcached"
- "Leaderboard"
- "Real-time analytics"
- "Frequently accessed data"
---
## Common Exam Scenarios
[BackToTop](#table-of-contents)

### Scenario 1: Reduce Database Load
**Question**: RDS database overloaded with repeated read queries

**Answer**: Implement ElastiCache (Redis or Memcached) with lazy loading

**Why**:
- Cache frequently accessed data
- Reduce database queries
- Sub-millisecond response time
- Offload read traffic

### Scenario 2: Session Management
**Question**: Web application needs to store user session data across multiple servers

**Answer**: Use ElastiCache for Redis

**Why**:
- Centralized session store
- Fast access (sub-millisecond)
- Persistence (survives restarts)
- Multi-AZ for high availability

### Scenario 3: Leaderboard
**Question**: Gaming application needs real-time leaderboard with millions of users

**Answer**: Use ElastiCache for Redis with Sorted Sets

**Why**:
- Sorted Sets perfect for leaderboards
- Real-time updates
- Fast queries (top 10, user rank)
- Handles millions of entries

### Scenario 4: High Availability Cache
**Question**: Cache must survive AZ failure

**Answer**: Use ElastiCache for Redis with Multi-AZ enabled

**Why**:
- Automatic failover
- Read replicas in different AZs
- Minimal downtime (~1 minute)
- Data persistence

### Scenario 5: Simple Caching, Multi-Threading
**Question**: Need simple object caching with multi-threaded performance

**Answer**: Use ElastiCache for Memcached

**Why**:
- Multi-threaded (better CPU utilization)
- Simple key-value caching
- Horizontal scaling
- Lower cost than Redis

### Scenario 6: Pub/Sub Messaging
**Question**: Need real-time messaging between application components

**Answer**: Use ElastiCache for Redis with Pub/Sub

**Why**:
- Built-in Pub/Sub support
- Real-time message delivery
- Multiple subscribers
- Low latency
---
## ElastiCache Best Practices ⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Design Patterns
```
✅ Use lazy loading for read-heavy workloads
✅ Use write-through for write-heavy workloads
✅ Always set TTL to prevent stale data
✅ Use Redis for complex data structures
✅ Use Memcached for simple caching
✅ Monitor cache hit ratio (target > 80%)
```

### High Availability
```
✅ Enable Multi-AZ (Redis)
✅ Use read replicas (Redis)
✅ Enable automatic failover (Redis)
✅ Use cluster mode for better availability (Redis)
✅ Deploy across multiple AZs
```

### Performance
```
✅ Choose appropriate node type
✅ Use cluster mode for horizontal scaling (Redis)
✅ Use connection pooling
✅ Monitor evictions (increase memory if high)
✅ Use pipelining for batch operations (Redis)
✅ Use read replicas for read scaling (Redis)
```

### Security
```
✅ Deploy in private subnets
✅ Use security groups
✅ Enable encryption at rest and in transit
✅ Use Redis AUTH or IAM authentication
✅ Restrict access to specific IPs
✅ Enable CloudTrail logging
```

### Cost Optimization
```
✅ Use Reserved Nodes (up to 55% savings)
✅ Right-size nodes (monitor memory usage)
✅ Use Memcached for simple caching (cheaper)
✅ Delete unused clusters
✅ Use appropriate eviction policies
✅ Monitor and optimize cache hit ratio
```

## ElastiCache Pricing
[BackToTop](#table-of-contents)
### Pricing Model
```
Node Hours: Based on node type
- cache.t3.micro: ~$0.017/hour (~$12/month)
- cache.m5.large: ~$0.161/hour (~$117/month)
- cache.r5.large: ~$0.252/hour (~$184/month)

Backup Storage (Redis only):
- $0.085 per GB-month

Data Transfer:
- Within same AZ: Free
- Between AZs: $0.01 per GB
- To internet: $0.09 per GB

Reserved Nodes:
- 1-year: ~35% savings
- 3-year: ~55% savings
```

### Cost Comparison
```
Example: cache.m5.large, 3 nodes

On-Demand:
3 × $0.161/hour × 730 hours = $352/month

Reserved (3-year):
3 × $0.072/hour × 730 hours = $158/month
Savings: 55%
```
---
## Limitations & Constraints
[BackToTop](#table-of-contents)

### Redis
- **Cluster mode disabled**: 1 shard, up to 6 nodes (1 primary + 5 replicas)
- **Cluster mode enabled**: Up to 500 shards, up to 6 nodes per shard
- **Maximum data**: 6.1 TB per node (r6gd.16xlarge)
- **Replication lag**: Typically < 1 second
- **Backup retention**: 35 days maximum

### Memcached
- **Nodes**: 1-40 per cluster
- **Maximum data**: 6.1 TB per node
- **No persistence**: Data lost on node failure
- **No replication**: No automatic failover

### Both
- **VPC only**: Cannot deploy outside VPC
- **Regional**: Clusters are region-specific
- **Maintenance windows**: Required for updates

## Pros & Cons

### Redis Pros
- Advanced data structures
- Persistence (RDB, AOF)
- Replication and Multi-AZ
- Backup and restore
- Pub/Sub messaging
- Transactions
- Lua scripting
- Geospatial support

### Redis Cons
- Single-threaded (per shard)
- More expensive than Memcached
- More complex to configure
- Cluster mode adds complexity

### Memcached Pros
- Multi-threaded (better CPU utilization)
- Simple and easy to use
- Horizontal scaling
- Lower cost than Redis
- Auto Discovery

### Memcached Cons
- No persistence
- No replication
- No backup/restore
- Simple data types only
- No advanced features

---
---
# Amazon Redshift
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐ (Covered in Analytics Section)
- **Petabyte-scale data warehouse**
- **Columnar storage** for analytics
- **Massively Parallel Processing (MPP)**
- SQL-based queries
- OLAP (not OLTP)

**Note**: Redshift was covered in detail in the Analytics section. Here's a brief summary for database context.

## Redshift vs RDS/Aurora

| Feature | Redshift | RDS/Aurora |
|---------|----------|------------|
| **Purpose** | Data warehousing (OLAP) | Transactional (OLTP) |
| **Queries** | Complex analytics | Simple transactions |
| **Data Size** | Petabytes | Terabytes |
| **Performance** | Optimized for aggregations | Optimized for transactions |
| **Storage** | Columnar | Row-based |
| **Cost** | Higher for small data | Lower for small data |
| **Use Case** | Business intelligence, reporting | Applications, websites |

## When to Use Redshift (Database Context)

### ✅ Use Redshift When
- **Data warehousing** needs
- **Complex analytics** queries
- **Large datasets** (TB to PB)
- **Business intelligence** and reporting
- **Historical data** analysis
- **OLAP workloads**
- Need to **aggregate** large amounts of data

### ❌ Don't Use Redshift When
- **OLTP workloads** → Use RDS/Aurora
- **Small datasets** (< 1 TB) → Use RDS/Aurora
- **Real-time transactions** → Use RDS/Aurora/DynamoDB
- **Key-value access** → Use DynamoDB
- **Sub-second queries** on small data → Use RDS/Aurora

## Keywords to Identify Redshift
- "Data warehouse"
- "OLAP"
- "Business intelligence"
- "Analytics"
- "Reporting"
- "Petabyte-scale"
- "Complex queries"
- "Aggregations"

---

# Amazon DocumentDB
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐
- **MongoDB-compatible** document database
- Fully managed
- **JSON documents**
- Scales to millions of requests per second
- **Not actual MongoDB** (compatible API)

## DocumentDB Architecture

### Storage and Compute
```
Compute Layer:
- Primary instance (read/write)
- Up to 15 read replicas
- Automatic failover

Storage Layer:
- Shared storage (6 copies, 3 AZs)
- Auto-scaling (10 GB to 64 TB)
- Self-healing
- Continuous backup to S3
```

### Replication
```
Primary Instance → Read Replicas (up to 15)
- Asynchronous replication
- Millisecond replication lag
- Read scaling
- Automatic failover
```

## Key Features

### 1. MongoDB Compatibility
```
Compatible with MongoDB 3.6, 4.0, 5.0 APIs:
- MongoDB drivers
- MongoDB tools
- MongoDB queries
- MongoDB aggregation framework

Not Compatible:
- Some MongoDB features not supported
- Not 100% compatible (check documentation)
```

### 2. High Availability
```
- 6 copies across 3 AZs
- Automatic failover (<30 seconds)
- Continuous backup to S3
- Point-in-time recovery (35 days)
```

### 3. Scaling
```
Vertical Scaling:
- Change instance type
- Minimal downtime (failover)

Horizontal Scaling:
- Add read replicas (up to 15)
- Read scaling
- Automatic load balancing
```

### 4. Security
```
- VPC isolation
- Encryption at rest (KMS)
- Encryption in transit (TLS)
- IAM authentication
- Audit logging
```

## When to Use DocumentDB

### ✅ Use DocumentDB When
- **MongoDB workloads** on AWS
- Need **managed MongoDB-compatible** database
- **JSON documents** storage
- Need **high availability** (Multi-AZ)
- Need **automatic scaling**
- Want **AWS integration**
- **Content management** systems
- **Catalogs** (product, user profiles)
- **Mobile/web applications**

### ❌ Don't Use DocumentDB When
- Need **actual MongoDB** (100% compatibility) → Use MongoDB on EC2
- Need **relational database** → Use RDS/Aurora
- Need **key-value only** → Use DynamoDB
- Need **graph database** → Use Neptune
- **Cost is primary concern** → DynamoDB may be cheaper

## DocumentDB vs DynamoDB vs MongoDB

| Feature | DocumentDB | DynamoDB | MongoDB (EC2) |
|---------|------------|----------|---------------|
| **Type** | Document (MongoDB-compatible) | Key-value, document | Document |
| **Management** | Fully managed | Fully managed | Self-managed |
| **Compatibility** | MongoDB API | AWS API | Full MongoDB |
| **Scaling** | Vertical + read replicas | Automatic horizontal | Manual |
| **Queries** | MongoDB queries | Limited queries | Full MongoDB |
| **Cost** | $$ | $ to $$$ | $ (but operational overhead) |
| **Use Case** | MongoDB workloads | Massive scale, simple queries | Need full MongoDB features |

## Keywords to Identify DocumentDB

- "MongoDB"
- "MongoDB-compatible"
- "Document database"
- "JSON documents"
- "Content management"
- "Catalog"
- "User profiles"
- "MongoDB workload"

## Common Exam Scenarios

### Scenario 1: MongoDB Migration
**Question**: Migrate on-premises MongoDB database to AWS with minimal changes

**Answer**: Use Amazon DocumentDB

**Why**:
- MongoDB-compatible API
- Minimal code changes
- Fully managed
- High availability
- Automatic backups

### Scenario 2: Content Management System
**Question**: Build content management system storing JSON documents

**Answer**: Use Amazon DocumentDB

**Why**:
- Designed for JSON documents
- Flexible schema
- MongoDB-compatible queries
- High availability
- Automatic scaling

## DocumentDB Pricing

### Pricing Components
```
Instance Hours:
- db.r5.large: ~$0.277/hour (~$202/month)
- db.r5.xlarge: ~$0.555/hour (~$405/month)

Storage: $0.10 per GB-month (auto-scaling)

I/O Requests: $0.20 per million requests

Backup Storage:
- Free up to DB size
- $0.021 per GB-month beyond

Data Transfer: Standard AWS rates
```

## Limitations & Constraints

- **Storage**: 64 TB maximum
- **Read replicas**: 15 maximum
- **Backup retention**: 35 days maximum
- **MongoDB compatibility**: Not 100% (check docs)
- **Regional**: Single region (no global tables)

## Pros & Cons

**Pros**:
- MongoDB-compatible
- Fully managed
- High availability (6 copies, 3 AZs)
- Automatic scaling
- Up to 15 read replicas
- Continuous backup
- Fast failover

**Cons**:
- Not 100% MongoDB compatible
- More expensive than DynamoDB
- Single region only
- Vendor lock-in
- Limited to 64 TB

---

# Amazon Neptune
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐
- **Graph database** service
- Supports **Property Graph** and **RDF** models
- Query languages: **Gremlin**, **SPARQL**, **openCypher**
- Optimized for **highly connected data**
- Fully managed

## Graph Database Concepts

### What is a Graph Database?
```
Components:
- Vertices (Nodes): Entities (people, products, places)
- Edges (Relationships): Connections between entities
- Properties: Attributes of vertices and edges

Example Social Network:
Vertex: User (Alice)
Edge: FRIENDS_WITH
Vertex: User (Bob)
Properties: since=2020, closeness=high
```

### Use Cases for Graph Databases
```
✅ Social networks (friends, followers)
✅ Recommendation engines (products, content)
✅ Fraud detection (transaction patterns)
✅ Knowledge graphs (Wikipedia, Google)
✅ Network/IT operations (dependencies)
✅ Life sciences (protein interactions)
✅ Identity graphs (customer 360)
```

## Neptune Architecture

### Storage and Compute
```
Compute Layer:
- Primary instance (read/write)
- Up to 15 read replicas
- Automatic failover

Storage Layer:
- Shared storage (6 copies, 3 AZs)
- Auto-scaling (10 GB to 64 TB)
- Self-healing
- Continuous backup to S3
```

### High Availability
```
- 6 copies across 3 AZs
- Automatic failover (<30 seconds)
- Read replicas for scaling
- Point-in-time recovery (35 days)
```

## Query Languages

### 1. Gremlin (Apache TinkerPop)
```
Purpose: Property Graph queries
Example:
g.V().has('person', 'name', 'Alice')
  .out('knows')
  .values('name')

Use: Traverse relationships, pattern matching
```

### 2. SPARQL
```
Purpose: RDF graph queries
Example:
SELECT ?name
WHERE {
  ?person rdf:type :Person .
  ?person :name ?name .
}

Use: Semantic web, knowledge graphs
```

### 3. openCypher
```
Purpose: Property Graph queries (Cypher-compatible)
Example:
MATCH (a:Person {name: 'Alice'})-[:KNOWS]->(b)
RETURN b.name

Use: Neo4j-compatible queries
```

## Key Features

### 1. ACID Transactions
```
- Full ACID compliance
- Consistent reads and writes
- Isolation levels
- Rollback support
```

### 2. High Performance
```
- Optimized for graph traversals
- Billions of relationships
- Millisecond query latency
- Parallel query execution
```

### 3. ML Integration
```
Neptune ML:
- Graph neural networks
- Predictions on graph data
- Integration with SageMaker
- Node classification, link prediction
```

### 4. Streams
```
Neptune Streams:
- Change data capture
- Real-time graph updates
- Integration with Lambda
- Similar to DynamoDB Streams
```

## When to Use Neptune

### ✅ Use Neptune When
- Need **graph database**
- **Highly connected data** (relationships important)
- **Social networks** (friends, followers, connections)
- **Recommendation engines** (collaborative filtering)
- **Fraud detection** (pattern analysis)
- **Knowledge graphs** (entities and relationships)
- **Network analysis** (IT dependencies, supply chain)
- Need to **traverse relationships** efficiently

### ❌ Don't Use Neptune When
- **Simple key-value** access → Use DynamoDB
- **Relational data** with few relationships → Use RDS/Aurora
- **Document storage** → Use DocumentDB
- **Data warehouse** → Use Redshift
- **No relationships** to traverse → Use DynamoDB/RDS

## Keywords to Identify Neptune

- "Graph database"
- "Relationships"
- "Social network"
- "Recommendation engine"
- "Fraud detection"
- "Knowledge graph"
- "Highly connected data"
- "Network analysis"
- "Traverse relationships"
- "Gremlin" or "SPARQL"

## Common Exam Scenarios

### Scenario 1: Social Network
**Question**: Build social network with complex friend relationships and recommendations

**Answer**: Use Amazon Neptune

**Why**:
- Graph database optimized for relationships
- Efficient traversal (friends of friends)
- Recommendation queries
- Handles billions of relationships

### Scenario 2: Fraud Detection
**Question**: Detect fraud patterns by analyzing transaction relationships

**Answer**: Use Amazon Neptune

**Why**:
- Graph queries for pattern detection
- Traverse transaction networks
- Identify suspicious connections
- Real-time analysis

### Scenario 3: Recommendation Engine
**Question**: Build product recommendation system based on user behavior and relationships

**Answer**: Use Amazon Neptune

**Why**:
- Graph-based recommendations
- Collaborative filtering
- Traverse user-product relationships
- Complex recommendation queries

## Neptune Pricing

### Pricing Components
```
Instance Hours:
- db.r5.large: ~$0.348/hour (~$254/month)
- db.r5.xlarge: ~$0.695/hour (~$507/month)

Storage: $0.10 per GB-month (auto-scaling)

I/O Requests: $0.20 per million requests

Backup Storage:
- Free up to DB size
- $0.021 per GB-month beyond

Data Transfer: Standard AWS rates
```

## Limitations & Constraints

- **Storage**: 64 TB maximum
- **Read replicas**: 15 maximum
- **Backup retention**: 35 days maximum
- **Query timeout**: Configurable
- **Regional**: Single region

## Pros & Cons

**Pros**:
- Optimized for graph queries
- High performance for relationships
- ACID transactions
- High availability (6 copies, 3 AZs)
- Multiple query languages
- ML integration
- Fully managed

**Cons**:
- Expensive
- Learning curve (graph concepts)
- Overkill for simple data
- Limited to graph use cases
- Vendor lock-in

---

# Amazon Keyspaces (for Apache Cassandra)
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐
- **Cassandra-compatible** database
- Fully managed
- **Wide-column** NoSQL database
- Serverless (no capacity planning)
- Single-digit millisecond latency

## Cassandra Concepts

### What is Cassandra?
```
- Wide-column NoSQL database
- Distributed architecture
- High availability
- Linear scalability
- No single point of failure

Data Model:
- Keyspace (like database)
- Table (like table)
- Partition key + clustering columns
- Wide rows (many columns)
```

## Key Features

### 1. Cassandra Compatibility
```
Compatible with:
- CQL (Cassandra Query Language)
- Cassandra drivers
- Cassandra tools

Use Cases:
- Migrate Cassandra workloads to AWS
- Cassandra-compatible applications
```

### 2. Serverless
```
- No capacity planning
- Automatic scaling
- Pay per request
- On-demand or provisioned capacity
```

### 3. High Availability
```
- Multi-AZ by default (3 AZs)
- Automatic replication
- No single point of failure
- 99.99% SLA
```

### 4. Performance
```
- Single-digit millisecond latency
- Consistent performance
- Scales to thousands of requests/sec
```

## When to Use Keyspaces

### ✅ Use Keyspaces When
- **Cassandra workloads** on AWS
- Need **wide-column** database
- **IoT applications** (time-series data)
- **High write throughput** needed
- Need **Cassandra compatibility**
- Want **serverless** Cassandra
- **Time-series data** storage

### ❌ Don't Use Keyspaces When
- Need **relational database** → Use RDS/Aurora
- Need **complex queries** → Use RDS/Aurora
- Need **key-value only** → Use DynamoDB
- Need **document database** → Use DocumentDB
- **Cost is primary concern** → DynamoDB may be cheaper

## Keywords to Identify Keyspaces

- "Cassandra"
- "Cassandra-compatible"
- "Wide-column database"
- "CQL"
- "Time-series data"
- "IoT data"
- "High write throughput"

## Common Exam Scenarios

### Scenario 1: Cassandra Migration
**Question**: Migrate on-premises Cassandra database to AWS

**Answer**: Use Amazon Keyspaces

**Why**:
- Cassandra-compatible
- Minimal code changes
- Fully managed
- Serverless (no capacity planning)

### Scenario 2: IoT Time-Series Data
**Question**: Store millions of IoT sensor readings per second

**Answer**: Use Amazon Keyspaces

**Why**:
- High write throughput
- Time-series data model
- Automatic scaling
- Single-digit millisecond latency

## Keyspaces Pricing

### Pricing Model
```
On-Demand:
- Write: $1.25 per million writes
- Read: $0.25 per million reads
- Storage: $0.25 per GB-month

Provisioned:
- Write: $0.00065 per WCU-hour
- Read: $0.00013 per RCU-hour
- Storage: $0.25 per GB-month
```

## Limitations & Constraints

- **Item size**: 1 MB maximum
- **Cassandra compatibility**: Not 100%
- **Regional**: Single region
- **Query limitations**: CQL subset

## Pros & Cons

**Pros**:
- Cassandra-compatible
- Fully managed
- Serverless
- High availability (Multi-AZ)
- Automatic scaling
- Single-digit millisecond latency

**Cons**:
- Not 100% Cassandra compatible
- More expensive than self-managed
- Limited to Cassandra use cases
- Vendor lock-in

---

# Amazon QLDB (Quantum Ledger Database)
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐
- **Immutable ledger** database
- **Cryptographically verifiable** transaction log
- Centralized (not blockchain)
- Fully managed
- ACID transactions

## Ledger Database Concepts

### What is a Ledger Database?
```
- Immutable: Cannot change or delete history
- Transparent: Complete audit trail
- Cryptographically verifiable: Tamper-proof
- Append-only: Only add new records

Use Cases:
- Financial transactions
- Supply chain tracking
- Regulatory compliance
- Audit trails
- System of record
```

### QLDB vs Blockchain
```
QLDB:
- Centralized (single authority)
- Faster (no consensus needed)
- Simpler (no mining, nodes)
- Cheaper
- AWS-managed

Blockchain:
- Decentralized (multiple parties)
- Slower (consensus required)
- Complex (nodes, mining)
- Expensive
- Self-managed or Amazon Managed Blockchain
```

## Key Features

### 1. Immutability
```
- Cannot update or delete records
- Complete history preserved
- Cryptographic proof of integrity
- SHA-256 hashing
```

### 2. Cryptographic Verification
```
- Each transaction cryptographically chained
- Can verify data hasn't been tampered
- Audit trail with proof
- Journal (immutable log)
```

### 3. PartiQL Queries
```
- SQL-compatible query language
- Familiar syntax
- Query current and historical data
- Join tables
```

### 4. ACID Transactions
```
- Full ACID compliance
- Serializable isolation
- Consistent reads and writes
```

## When to Use QLDB

### ✅ Use QLDB When
- Need **immutable** transaction log
- Need **cryptographic verification**
- **Financial transactions** (banking, payments)
- **Supply chain** tracking (provenance)
- **Regulatory compliance** (audit trails)
- **System of record** (authoritative source)
- Need **complete history** (no deletions)
- **Centralized authority** acceptable

### ❌ Don't Use QLDB When
- Need **decentralized** ledger → Use Amazon Managed Blockchain
- Need **mutable** data → Use RDS/DynamoDB
- Don't need immutability → Use RDS/DynamoDB
- Need **high throughput** → Use DynamoDB
- **Multiple parties** need to verify → Use Blockchain

## Keywords to Identify QLDB

- "Immutable"
- "Ledger"
- "Audit trail"
- "Cryptographically verifiable"
- "Financial transactions"
- "Supply chain"
- "Compliance"
- "System of record"
- "Cannot delete history"
- "Tamper-proof"

## Common Exam Scenarios

### Scenario 1: Financial Audit Trail
**Question**: Banking application needs immutable audit trail of all transactions

**Answer**: Use Amazon QLDB

**Why**:
- Immutable transaction log
- Cryptographically verifiable
- Complete history
- Compliance-friendly

### Scenario 2: Supply Chain Tracking
**Question**: Track product provenance from manufacturer to customer

**Answer**: Use Amazon QLDB

**Why**:
- Immutable tracking
- Verify authenticity
- Complete history
- Centralized authority

### Scenario 3: Regulatory Compliance
**Question**: Application must maintain tamper-proof audit log for compliance

**Answer**: Use Amazon QLDB

**Why**:
- Immutable audit trail
- Cryptographic proof
- Cannot alter history
- Compliance requirements met

## QLDB Pricing

### Pricing Components
```
Write I/O: $0.3574 per million requests
Read I/O: $0.1072 per million requests
Storage: $0.1429 per GB-month
Journal Storage: $0.0714 per GB-month
Data Transfer: Standard AWS rates
```

## Limitations & Constraints

- **Throughput**: Lower than DynamoDB
- **Immutable**: Cannot delete data
- **Centralized**: Single authority
- **Regional**: Single region
- **PartiQL**: Limited SQL features

## Pros & Cons

**Pros**:
- Immutable ledger
- Cryptographically verifiable
- Complete audit trail
- ACID transactions
- SQL-compatible (PartiQL)
- Fully managed
- Simpler than blockchain
- Centralized (faster than blockchain)

**Cons**:
- Centralized (single authority)
- Cannot delete data (by design)
- Lower throughput than DynamoDB
- More expensive than standard databases
- Limited use cases
- Vendor lock-in
- Not for decentralized scenarios

---

# Database Services Comparison Matrix
[BackToTop](#table-of-contents)
## Quick Reference: When to Use Which Database ⭐⭐⭐⭐⭐

| Requirement | Database | Keywords |
|-------------|----------|----------|
| **Relational, standard workload** | RDS | "SQL", "MySQL", "PostgreSQL", "Oracle", "SQL Server" |
| **Relational, high performance** | Aurora | "5x MySQL", "3x PostgreSQL", "cloud-native" |
| **Relational, variable workload** | Aurora Serverless | "Intermittent", "unpredictable", "pay per second" |
| **NoSQL, massive scale** | DynamoDB | "Key-value", "single-digit ms", "millions of requests" |
| **In-memory cache** | ElastiCache | "Sub-millisecond", "cache", "session store", "Redis", "Memcached" |
| **Data warehouse** | Redshift | "OLAP", "analytics", "BI", "petabyte-scale" |
| **MongoDB workload** | DocumentDB | "MongoDB", "JSON documents", "content management" |
| **Graph database** | Neptune | "Relationships", "social network", "fraud detection", "graph" |
| **Cassandra workload** | Keyspaces | "Cassandra", "wide-column", "time-series", "IoT" |
| **Immutable ledger** | QLDB | "Immutable", "audit trail", "cryptographically verifiable", "ledger" |

---

# Database Selection Decision Trees
[BackToTop](#table-of-contents)
## Decision Tree 1: Database Type Selection

```
What type of data and access pattern?

├─ Relational (SQL)?
│  ├─ Standard workload? → RDS
│  ├─ High performance needed? → Aurora
│  ├─ Variable/intermittent? → Aurora Serverless
│  └─ Analytics/BI? → Redshift
│
├─ NoSQL?
│  ├─ Key-value, massive scale? → DynamoDB
│  ├─ Document (MongoDB)? → DocumentDB
│  ├─ Graph (relationships)? → Neptune
│  ├─ Wide-column (Cassandra)? → Keyspaces
│  └─ Immutable ledger? → QLDB
│
├─ Caching?
│  ├─ Advanced features? → ElastiCache Redis
│  └─ Simple caching? → ElastiCache Memcached
│
└─ Data Warehouse?
   └─ Analytics/BI? → Redshift
```

## Decision Tree 2: Relational Database Selection

```
Need relational database?

├─ What performance level?
│  ├─ Standard → RDS
│  ├─ High (5x MySQL) → Aurora
│  └─ Variable workload → Aurora Serverless
│
├─ What database engine?
│  ├─ MySQL/PostgreSQL + high performance → Aurora
│  ├─ MySQL/PostgreSQL + standard → RDS
│  ├─ Oracle → RDS Oracle
│  ├─ SQL Server → RDS SQL Server
│  └─ MariaDB → RDS MariaDB
│
└─ What availability?
   ├─ High availability → Multi-AZ (RDS/Aurora)
   ├─ Read scaling → Read Replicas
   └─ Global → Aurora Global Database
```

## Decision Tree 3: NoSQL Database Selection

```
Need NoSQL database?

├─ What data model?
│  ├─ Key-value → DynamoDB
│  ├─ Document → DynamoDB or DocumentDB
│  ├─ Graph → Neptune
│  ├─ Wide-column → Keyspaces
│  └─ Ledger → QLDB
│
├─ What scale?
│  ├─ Massive (millions/sec) → DynamoDB
│  ├─ High (thousands/sec) → DocumentDB, Keyspaces
│  └─ Moderate → Any NoSQL
│
├─ What latency?
│  ├─ Single-digit ms → DynamoDB
│  ├─ Milliseconds → DocumentDB, Neptune, Keyspaces
│  └─ Sub-millisecond → DynamoDB + DAX
│
└─ What compatibility?
   ├─ MongoDB → DocumentDB
   ├─ Cassandra → Keyspaces
   └─ None → DynamoDB
```

## Decision Tree 4: Caching Strategy

```
Need caching?

├─ What features needed?
│  ├─ Advanced (persistence, replication, pub/sub) → Redis
│  └─ Simple (key-value only) → Memcached
│
├─ What latency?
│  ├─ Microseconds → DynamoDB + DAX (DynamoDB only)
│  └─ Sub-millisecond → ElastiCache
│
├─ What availability?
│  ├─ High (Multi-AZ, replicas) → Redis
│  └─ Standard (multi-node) → Memcached
│
└─ What use case?
   ├─ Session store → Redis (persistence)
   ├─ Leaderboard → Redis (sorted sets)
   ├─ Pub/Sub → Redis
   └─ Simple caching → Memcached
```

---

# Common Exam Patterns and Scenarios
[BackToTop](#table-of-contents)
## Pattern 1: High Availability Requirements ⭐⭐⭐⭐⭐

### Scenario: Database Must Survive AZ Failure

**RDS Solution**:
```
Enable Multi-AZ:
- Synchronous replication to standby
- Automatic failover (1-2 minutes)
- Same DNS endpoint
- No application changes
```

**Aurora Solution**:
```
Default behavior:
- 6 copies across 3 AZs
- Automatic failover (<30 seconds)
- Up to 15 read replicas
- Self-healing storage
```

**DynamoDB Solution**:
```
Default behavior:
- Multi-AZ by default (3 AZs)
- Automatic replication
- No configuration needed
- 99.99% availability SLA
```

**Key Exam Tip**: Multi-AZ is for **high availability**, not read scaling.

---

## Pattern 2: Read Scaling Requirements ⭐⭐⭐⭐⭐

### Scenario: Database Overloaded with Read Traffic

**RDS/Aurora Solution**:
```
Create Read Replicas:
- RDS: Up to 5 read replicas
- Aurora: Up to 15 read replicas
- Asynchronous replication
- Each replica has own endpoint
- Distribute read traffic
```

**DynamoDB Solution**:
```
Options:
1. Increase RCU (provisioned mode)
2. Use On-Demand mode (automatic scaling)
3. Add DAX (in-memory cache)
4. Use Global Tables (regional read replicas)
```

**ElastiCache Solution**:
```
Add caching layer:
- Cache frequently accessed data
- Reduce database queries
- Sub-millisecond latency
- Offload read traffic
```

**Key Exam Tip**: Read Replicas are for **read scaling**, not high availability.

---

## Pattern 3: Global Application Requirements ⭐⭐⭐⭐

### Scenario: Users Worldwide Need Low-Latency Access

**Aurora Global Database**:
```
Architecture:
- Primary region (read/write)
- Up to 5 secondary regions (read-only)
- <1 second replication lag
- Disaster recovery

Use when:
- Need global reads
- MySQL/PostgreSQL
- Can tolerate 1-second lag
```

**DynamoDB Global Tables**:
```
Architecture:
- Multi-region, multi-active
- Read/write in any region
- Sub-second replication
- Active-active

Use when:
- Need global reads AND writes
- NoSQL acceptable
- Massive scale needed
```

**Key Exam Tip**: 
- Aurora Global = Read-only secondaries
- DynamoDB Global = Read/write everywhere

---

## Pattern 4: Cost Optimization ⭐⭐⭐⭐⭐

### Scenario: Reduce Database Costs

**Variable Workloads**:
```
Aurora Serverless:
- Pay per second
- Auto-pause when idle
- Auto-scale based on demand
- Best for: Intermittent, unpredictable

DynamoDB On-Demand:
- Pay per request
- No capacity planning
- Automatic scaling
- Best for: Unpredictable traffic
```

**Steady Workloads**:
```
RDS/Aurora Reserved Instances:
- 1-year: ~40% savings
- 3-year: ~69% savings
- Best for: Predictable, 24/7

DynamoDB Provisioned + Auto Scaling:
- Lower cost than On-Demand (if steady)
- Automatic scaling
- Best for: Predictable traffic
```

**Caching**:
```
ElastiCache:
- Reduce database queries
- Lower RCU/WCU costs (DynamoDB)
- Reduce instance load (RDS)
- Best for: Read-heavy workloads

DynamoDB + DAX:
- Microsecond latency
- Reduce RCU costs
- Best for: DynamoDB read-heavy
```

**Key Exam Tip**: 
- Variable workload = Serverless/On-Demand
- Steady workload = Reserved/Provisioned

---

## Pattern 5: Disaster Recovery ⭐⭐⭐⭐

### Scenario: Need Cross-Region DR

**RDS/Aurora**:
```
Cross-Region Read Replica:
- Asynchronous replication
- Can promote to standalone
- Manual failover
- RPO: Replication lag (seconds to minutes)
- RTO: Promotion time (minutes)

Aurora Global Database:
- <1 second replication lag
- Promote secondary region
- RPO: <1 second
- RTO: <1 minute
```

**DynamoDB**:
```
Global Tables:
- Multi-region replication
- Active-active
- Automatic failover
- RPO: Sub-second
- RTO: Automatic (no failover needed)

Backup and Restore:
- Point-in-time recovery (35 days)
- On-demand backups
- Cross-region copy
- RPO: Backup frequency
- RTO: Restore time (minutes to hours)
```

**Key Exam Tip**: 
- Best RPO/RTO = Aurora Global Database or DynamoDB Global Tables
- Cost-effective = Cross-region Read Replica

---

## Pattern 6: Migration Scenarios ⭐⭐⭐⭐

### Scenario: Migrate Database to AWS

**Relational Database Migration**:
```
Same Engine (MySQL to RDS MySQL):
1. AWS DMS (Database Migration Service)
2. Native replication (MySQL binlog)
3. Snapshot and restore

Different Engine (Oracle to Aurora PostgreSQL):
1. AWS DMS with Schema Conversion Tool (SCT)
2. Convert schema
3. Migrate data
4. Test and cutover
```

**NoSQL Migration**:
```
MongoDB to DocumentDB:
1. AWS DMS
2. Native MongoDB tools (mongodump/mongorestore)
3. Change streams for continuous sync

Cassandra to Keyspaces:
1. AWS DMS
2. Native Cassandra tools (cqlsh COPY)
3. Application-level migration
```

**Key Exam Tip**: AWS DMS for most database migrations

---

# Critical Exam Tips for Database Services
[BackToTop](#table-of-contents)
## 1. Multi-AZ vs Read Replicas (Most Tested) ⭐⭐⭐⭐⭐

### Must Remember
```
Multi-AZ:
✅ High availability (HA)
✅ Synchronous replication
✅ Automatic failover
✅ Standby NOT accessible
✅ Same region only
✅ Use for: Disaster recovery

Read Replicas:
✅ Read scaling (performance)
✅ Asynchronous replication
✅ Manual promotion
✅ Replicas ARE accessible
✅ Can be cross-region
✅ Use for: Read-heavy workloads

Can use BOTH together!
```

### Common Mistakes
```
❌ Using Multi-AZ for read scaling
❌ Using Read Replicas for HA only
❌ Thinking standby is accessible
❌ Confusing synchronous vs asynchronous
```

---

## 2. RDS vs Aurora vs DynamoDB ⭐⭐⭐⭐⭐

### Quick Decision Matrix

| Need | RDS | Aurora | DynamoDB |
|------|-----|--------|----------|
| **Standard SQL** | ✅ Best | ✅ Good | ❌ No |
| **High performance SQL** | ❌ No | ✅ Best | ❌ No |
| **Massive scale** | ❌ No | ❌ Limited | ✅ Best |
| **Single-digit ms latency** | ❌ No | ❌ No | ✅ Best |
| **NoSQL** | ❌ No | ❌ No | ✅ Best |
| **Cost-effective (small)** | ✅ Best | ❌ No | ✅ Good |
| **Serverless** | ❌ No | ✅ Yes (v2) | ✅ Yes |

### Key Exam Tip
```
"High performance" + "MySQL/PostgreSQL" = Aurora
"Massive scale" + "NoSQL" = DynamoDB
"Standard SQL" + "Cost-effective" = RDS
```

---

## 3. Caching Strategies ⭐⭐⭐⭐⭐

### When to Use Caching
```
✅ Read-heavy workloads
✅ Frequently accessed data
✅ Reduce database load
✅ Improve latency
✅ Cost optimization (reduce RCU/queries)
```

### Which Cache to Use
```
DynamoDB + DAX:
- DynamoDB only
- Microsecond latency
- No code changes
- Write-through cache

ElastiCache Redis:
- Any database
- Advanced features (persistence, pub/sub)
- Sub-millisecond latency
- Session store, leaderboards

ElastiCache Memcached:
- Any database
- Simple caching
- Multi-threaded
- Lower cost
```

### Key Exam Tip
```
"DynamoDB" + "microsecond latency" = DAX
"Session store" + "persistence" = Redis
"Simple caching" + "multi-threaded" = Memcached
```

---

## 4. Database Engine Selection ⭐⭐⭐⭐

### Relational Databases
```
MySQL:
- Most popular
- Open source
- Wide compatibility
- Use: General purpose

PostgreSQL:
- Advanced features
- Open source
- ACID compliant
- Use: Complex queries, JSON support

Oracle:
- Enterprise features
- Commercial license
- Use: Legacy Oracle apps

SQL Server:
- Microsoft ecosystem
- Windows-based
- Use: .NET applications

MariaDB:
- MySQL fork
- Drop-in replacement
- Use: MySQL alternative
```

### NoSQL Databases
```
DynamoDB:
- Key-value, document
- Massive scale
- Use: Web/mobile/gaming

DocumentDB:
- MongoDB-compatible
- JSON documents
- Use: MongoDB workloads

Neptune:
- Graph database
- Relationships
- Use: Social networks, fraud detection

Keyspaces:
- Cassandra-compatible
- Wide-column
- Use: Time-series, IoT

QLDB:
- Immutable ledger
- Cryptographically verifiable
- Use: Financial, audit trails
```

---

## 5. Backup and Recovery ⭐⭐⭐⭐

### RDS/Aurora Backups
```
Automated Backups:
- Daily full backup
- Transaction logs (5 min)
- Point-in-time recovery (PITR)
- Retention: 0-35 days
- Free storage = DB size

Manual Snapshots:
- User-initiated
- Retained until deleted
- Can copy cross-region
- Can share with accounts
```

### DynamoDB Backups
```
Point-in-Time Recovery (PITR):
- Continuous backups
- Restore to any point (35 days)
- No performance impact
- Per-table setting

On-Demand Backups:
- Manual backups
- Retained until deleted
- Can copy cross-region
- Full table backup
```

### Key Exam Tip
```
"Point-in-time recovery" = PITR (35 days max)
"Long-term retention" = Manual snapshots
"Cross-region DR" = Copy snapshots to other region
```

---

## 6. Encryption ⭐⭐⭐⭐

### Encryption at Rest
```
RDS/Aurora:
- KMS encryption
- Enable at creation only
- Encrypts: DB, backups, snapshots, replicas

To encrypt existing:
1. Create snapshot
2. Copy with encryption
3. Restore from encrypted snapshot

DynamoDB:
- Always encrypted (default)
- KMS or AWS-owned keys
- Cannot disable
```

### Encryption in Transit
```
All databases:
- SSL/TLS connections
- Force SSL via parameter groups (RDS)
- Certificate validation
```

### Key Exam Tip
```
"Encrypt existing RDS" = Snapshot → Copy with encryption → Restore
"DynamoDB encryption" = Always on (default)
```

---

## 7. Performance Optimization ⭐⭐⭐⭐

### RDS/Aurora
```
✅ Use appropriate instance type
✅ Use Provisioned IOPS (io1/io2) for I/O intensive
✅ Enable Enhanced Monitoring
✅ Use Performance Insights
✅ Create Read Replicas for read scaling
✅ Use Multi-AZ for HA (not performance)
✅ Optimize queries (indexes, explain plans)
```

### DynamoDB
```
✅ Design efficient partition keys (avoid hot partitions)
✅ Use GSI for additional query patterns
✅ Use eventually consistent reads (when possible)
✅ Use DAX for read-heavy workloads
✅ Batch operations (BatchGetItem, BatchWriteItem)
✅ Use sparse indexes
✅ Monitor throttling
```

### ElastiCache
```
✅ Choose appropriate node type
✅ Use cluster mode for scaling (Redis)
✅ Monitor cache hit ratio (target >80%)
✅ Set appropriate TTL
✅ Use connection pooling
✅ Monitor evictions
```

---

## 8. Common Exam Traps ⭐⭐⭐⭐⭐

### Trap 1: Multi-AZ for Read Scaling
```
❌ Wrong: Use Multi-AZ to scale reads
✅ Right: Use Read Replicas to scale reads
Multi-AZ is for HA, not performance
```

### Trap 2: Aurora for All Workloads
```
❌ Wrong: Always use Aurora (most expensive)
✅ Right: Use RDS for standard workloads (cheaper)
Aurora is 20% more expensive than RDS
```

### Trap 3: DynamoDB for Relational Data
```
❌ Wrong: Use DynamoDB for complex SQL queries
✅ Right: Use RDS/Aurora for relational data
DynamoDB is NoSQL (no joins, limited queries)
```

### Trap 4: Encrypting Existing RDS
```
❌ Wrong: Enable encryption on existing RDS
✅ Right: Snapshot → Copy with encryption → Restore
Cannot enable encryption after creation
```

### Trap 5: ElastiCache for Persistence
```
❌ Wrong: Use Memcached for persistent data
✅ Right: Use Redis for persistence (or RDS/DynamoDB)
Memcached has no persistence
```

### Trap 6: Read Replica for HA
```
❌ Wrong: Read Replica provides automatic failover
✅ Right: Multi-AZ provides automatic failover
Read Replicas require manual promotion
```

### Trap 7: Global Tables Confusion
```
❌ Wrong: Aurora Global Database allows writes in all regions
✅ Right: Only DynamoDB Global Tables allow multi-region writes
Aurora Global = Read-only secondaries
```

---

# Database Services Pricing Summary

## Relative Cost Comparison (Approximate)

### Relational Databases (per month, db.r5.large equivalent)
```
RDS MySQL: ~$175 (baseline)
Aurora MySQL: ~$211 (20% more than RDS)
Aurora Serverless v2: Variable (pay per ACU-hour)
```

### NoSQL Databases
```
DynamoDB On-Demand: Variable (pay per request)
DynamoDB Provisioned: ~$12-50 (depends on capacity)
DocumentDB: ~$202 (similar to Aurora)
Neptune: ~$254 (most expensive)
Keyspaces: Variable (pay per request)
QLDB: Variable (pay per I/O)
```

### Caching
```
ElastiCache (cache.m5.large): ~$117
DAX (dax.r5.large): ~$350
```

### Data Warehouse
```
Redshift (dc2.large): ~$180 (per node)
```

## Cost Optimization Strategies

### For Steady Workloads
```
✅ Use Reserved Instances (RDS/Aurora/ElastiCache)
   - 1-year: ~40% savings
   - 3-year: ~69% savings

✅ Use Provisioned Capacity (DynamoDB)
   - Cheaper than On-Demand for steady traffic
   - Enable Auto Scaling
```

### For Variable Workloads
```
✅ Use Aurora Serverless (pay per second)
✅ Use DynamoDB On-Demand (pay per request)
✅ Stop/Start RDS instances when not in use
✅ Use Auto Scaling (DynamoDB Provisioned)
```

### General Optimization
```
✅ Right-size instances (monitor CloudWatch)
✅ Delete unused snapshots/backups
✅ Use caching to reduce database load
✅ Use S3 for large objects (not database)
✅ Monitor and optimize queries
✅ Use appropriate storage types
```

---

# Final Database Exam Checklist
[BackToTop](#table-of-contents)
## Before the Exam

### ✅ Core Concepts to Master
- [ ] Multi-AZ vs Read Replicas (critical!)
- [ ] RDS vs Aurora vs DynamoDB decision matrix
- [ ] DynamoDB partition keys and GSI
- [ ] ElastiCache Redis vs Memcached
- [ ] Caching strategies (lazy loading, write-through)
- [ ] Backup and recovery (PITR, snapshots)
- [ ] Encryption (at rest, in transit)
- [ ] Global databases (Aurora Global, DynamoDB Global Tables)

### ✅ Decision Trees to Remember
- [ ] Database type selection (SQL vs NoSQL)
- [ ] Relational database selection (RDS vs Aurora)
- [ ] NoSQL database selection (DynamoDB vs others)
- [ ] Caching strategy (DAX vs ElastiCache)

### ✅ Key Numbers to Memorize
- [ ] RDS: Up to 5 read replicas, 35 days backup retention
- [ ] Aurora: Up to 15 read replicas, 128 TB storage
- [ ] DynamoDB: 400 KB item size, single-digit ms latency
- [ ] Multi-AZ failover: 1-2 minutes (RDS), <30 seconds (Aurora)
- [ ] Backup retention: 0-35 days (RDS/Aurora), 35 days (DynamoDB PITR)

### ✅ Common Patterns
- [ ] High availability → Multi-AZ
- [ ] Read scaling → Read Replicas
- [ ] Global application → Aurora Global or DynamoDB Global Tables
- [ ] Caching → ElastiCache or DAX
- [ ] Massive scale → DynamoDB
- [ ] High performance SQL → Aurora
- [ ] Graph database → Neptune
- [ ] Immutable ledger → QLDB

---

# Summary: Most Important Database Services for SAA-C03
[BackToTop](#table-of-contents)
## Must Know (⭐⭐⭐⭐⭐)
1. **RDS** - Managed relational database
2. **Aurora** - High-performance cloud-native database
3. **DynamoDB** - NoSQL, massive scale
4. **ElastiCache** - In-memory caching (Redis/Memcached)
5. **Multi-AZ vs Read Replicas** - Critical concept

## Should Know (⭐⭐⭐⭐)
6. **Aurora Serverless** - Variable workload database
7. **Redshift** - Data warehouse (covered in Analytics)
8. **DynamoDB DAX** - Microsecond latency cache
9. **DynamoDB Global Tables** - Multi-region replication
10. **Aurora Global Database** - Cross-region reads

## Good to Know (⭐⭐⭐)
11. **DocumentDB** - MongoDB-compatible
12. **Neptune** - Graph database
13. **Backup strategies** - PITR, snapshots

## Awareness Level (⭐⭐)
14. **Keyspaces** - Cassandra-compatible
15. **QLDB** - Immutable ledger

---

**You're now ready for the Database section of the SAA-C03 exam!** 🗄️🚀

**Key Takeaway**: Focus on understanding **when to use which database** based on:
- Data model (SQL vs NoSQL)
- Scale requirements
- Performance needs (latency, throughput)
- Availability requirements (Multi-AZ, Global)
- Cost considerations

Most questions test your ability to **choose the right database for the right use case**, not deep technical implementation details.

**Good luck!** 💪

---

## [BackToTop](#table-of-contents)