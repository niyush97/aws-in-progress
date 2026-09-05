# Advanced Serverless, Event-Driven Data, Analytics

---


### What You'll Learn

1. **Architect** a fully serverless, event-driven ingestion pipeline using API Gateway, Lambda, and DynamoDB.
2. **Implement** advanced DynamoDB features: Point-in-Time Recovery (PITR), Time-to-Live (TTL), and DynamoDB Streams for CDC (Change Data Capture).
3. **Build** a near-real-time Data Lake pipeline using Kinesis Data Firehose and S3, querying it instantly with Amazon Athena.
4. **Harden** the architecture against DDoS and Layer 7 attacks using AWS WAF and understanding AWS Shield Standard vs. Advanced.
5. **Protect sensitive data** using KMS Customer Managed Keys (CMKs) and detect PII automatically using Amazon Macie.


---

### **💴 Cost Overview**
    
All prices are **ap-northeast-1 (Tokyo)**. Tax excluded.
| **Resource** | **Pricing Model** | **Estimated Lab Cost (2 hrs)** |
| --- | --- | --- |
| API Gateway (HTTP API) | $1.00 / 1M reqs | < $0.01 |
| AWS Lambda | $0.0000166667 / GB-sec | < $0.05 |
| DynamoDB (On-Demand) | $1.25 / 1M writes | < $0.10 |
| DynamoDB Streams | Included (DDB cost) | $0.00 |
| Kinesis Firehose | $0.048 / GB ingested | < $0.01 |
| S3 Standard | $0.025 / GB-mo | < $0.01 |
| Amazon Athena | $5.00 / TB scanned | < $0.10 (small scans) |
| AWS WAF | $5.00 / Web ACL / mo + $0.60 / 1M reqs | ~$0.01 (pro-rated) |
| KMS CMK | $1.00 / key / mo | ~$0.03 (pro-rated) |
| Amazon Macie | $1.25 / GB evaluated | < $0.10 (only scan few objects) |
| **TOTAL (2-hour lab session)** |  | **~$0.30** |

---

### ⚠️ Critical cost warnings:

- **Macie**: Do not run Macie continuously on a bucket with GBs of data. We will only scan a few specific objects to keep costs at $0.10.
- **Athena**: Always use **`LIMIT`** in your queries or partition your data. Scanning 1 TB of data costs $5.00 instantly.
- **WAF**: The Web ACL costs $5.00/month if left running. Pro-rated for 2 hours, it's pennies, but you MUST delete it.


---

## ⚖️ Service Decision Framework

### API Gateway (HTTP vs REST) vs AppSync vs ALB

| **Feature** | **HTTP API** | **REST API** | **AppSync** | **ALB (Lambda Target)** |
| --- | --- | --- | --- | --- |
| Cost | Cheapest ($1/1M) | Moderate ($3/1M) | GraphQL focus | Higher ($16/1M LCU-hr) |
| Auth | JWT, IAM | Cognito, Lambda, IAM | API Keys, JWT, Cognito | None (passes through) |
| Use Case | Internal microservices, simple webhooks | Public APIs needing API keys, usage plans, mock integrations | Mobile/Web GraphQL frontends | Lambdas behind existing web infrastructure |

---

### **Analytics: Athena vs Redshift vs QuickSight**

- **Athena**: Serverless query engine for S3. Use for ad-hoc, infrequent queries. Pay per TB scanned.
- **Redshift**: Provisioned data warehouse. Use for complex joins, BI dashboards, frequent queries. Higher baseline cost.
- **QuickSight**: BI dashboarding tool. Connects to Athena/Redshift/JDBC.

### **DDoS Protection: Shield Standard vs Advanced**

- **Shield Standard**: Free, automatic on Route 53, CloudFront, ALB, API Gateway. Protects against Layer 3/4 (network/transport) attacks.
- **Shield Advanced**: $3,000/month. Protects against sophisticated DDoS, provides 24/7 DDoS response team (DRT), and covers ELB/CloudFront scaling costs. **Exam Trap**: Use Shield Advanced ONLY for public-facing, mission-critical, internet-exposed applications.


---

- Lab 1: Idempotent API Gateway -> Lambda -> Advanced DynamoDB