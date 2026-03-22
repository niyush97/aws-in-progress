# AWS Serverless - SAA-C03 Exam Guide

---

>⚠️ These notes were created using Anthropic's AI Models (Opus 4.5 and 4.6).

---

## Table of Contents
1. [AWS Lambda](#aws-lambda)
    - [What is Lambda](#what-is-lambda)
    - [Lambda Core Concepts](#lambda-core-concepts)
        - [Function](#function)
        - [Execution Environment](#execution-environment)
    - [Lambda Limits](#lambda-limits)
    - [Lambda Invocation Types](#lambda-invocation-types)
        - [1. Synchronous Invocation](#1-synchronous-invocation)
        - [2. Asynchronous Invocation](#2-asynchronous-invocation)
        - [3. Event Source Mapping](#3-event-source-mapping)
    - [Lambda Concurrency](#lambda-concurrency)
        - [Concurrency Types](#concurrency-types)
    - [Throttling](#throttling)
    - [Lambda Versions and Aliases](#lambda-versions-and-aliases)
        - [Versions](#versions)
        - [Aliases](#aliases)
    - [Lambda Layers](#lambda-layers)
    - [Lambda with VPC](#lambda-with-vpc)
    - [Lambda Environment Variables](#lambda-environment-variables)
    - [Lambda Destinations](#lambda-destinations)
    - [Lambda Performance Optimization](#lambda-performance-optimization)
    - [Lambda Security](#lambda-security)
        - [Execution Role](#execution-role)
        - [Resource-Based Policy](#resource-based-policy)
    - [Lambda Monitoring](#lambda-monitoring)
    - [Lambda Common Exam Scenarios](#lambda-common-exam-scenarios)

2. [Amazon API Gateway](#amazon-api-gateway)
    - [What is API Gateway](#what-is-api-gateway)
        - [API Types](#api-types)
        - [REST API](#rest-api)
        - [HTTP API](#http-api)
        - [WebSocket API](#websocket-api)
    - [API Gateway Integrations](#api-gateway-integrations)
        - [Lambda Proxy Integration](#lambda-proxy-integration)
        - [Lambda Custom Integration](#lambda-custom-integration)
        - [HTTP Integration](#http-integration)
        - [AWS Service Integration](#aws-service-integration)
    - [API Gateway Security](#api-gateway-security)
        - [1. IAM Authorization](#1-iam-authorization)
        - [2. Lambda Authorizer](#2-lambda-authorizer)
        - [3. Cognito User Pool](#3-cognito-user-pools)
        - [4. API Keys and Usage Plans](#4-api-keys-and-usage-plans)
    - [API Gateway Caching](#api-gateway-caching)
    - [API Gateway Throttling](#api-gateway-throttling)
    - [API Gateway Stages and Deployments](#api-gateway-stages-and-deployments)
    - [API Gateway CORS](#api-gateway-cors)
    - [API Gateway Common Exam Scenarios](#api-gateway-common-exam-scenarios)

3. [Amazon SQS](#amazon-sqs)
    - [What is SQS?](#what-is-sqs?)
    - [SQS Queue Types](#sqs-queue-types)
        - [Standard Queue](#standard-queue)
        - [FIFO Queue](#fifo-queue)
    - [SQS Key Concepts](#sqs-key-concepts)
        - [Visibility Timeout](#visibility-timeout)
        - [Message Retention](#message-retention)
        - [Dead Letter Queue (DLQ)](#dead-letter-queue-dlq)
        - [Long Polling vs Short Polling](#long-polling-vs-short-polling)
        - [Message Batching](#message-batching)
    - [SQS Message Size](#sqs-message-size)
    - [SQS with Lambda](#sqs-with-lambda)
    - [SQS Security](#sqs-security)
    - [When to Use SQS](#when-to-use-sqs)
    - [Keywords to Identify SQS](#keywords-to-identify-sqs)
    - [SQS Common Exam Scenarios](#sqs-common-exam-scenarios)

4. [Amazon SNS](#amazon-sns)
    - [What is SNS](#what-is-sns)
    - [SNS Core Concepts](#sns-core-concepts)
        - [Topics](#topics)
        - [Subscribers](#subscribers)
        - [Message Filtering](#message-filtering)
    - [SNS + SQS Fan-Out Pattern](#sns--sqs-fan-out-pattern)
    - [SNS Message Delivery](#sns-message-delivery)
    - [SNS Security](#sns-security)
    - [SNS vs SQS](#sns-vs-sqs)
    - [SNS Common Exam Scenarios](#sns-common-exam-scenarios)


5. [Amazon EventBridge](#amazon-eventbridge)
    - [What is EventBridge](#what-is-eventbridge)
    - [EventBridge Components](#eventbridge-components)
        - [Event Buses](#event-buses)
        - [Rules](#rules)
        - [Targets](#targets)
    - [EventBridge Advanced Features](#eventbridge-advanced-features)
        - [Schema Registry](#schema-registry)
        - [Event Archive and Replay](#event-archive-and-replay)
        - [Cross-Account Events](#cross-account-events)
        - [Pipes](#pipes)
    - [EventBridge vs SNS vs SQS](#eventbridge-vs-sns-vs-sqs)
    - [EventBridge Common Exam Scenarios](#eventbridge-common-exam-scenarios)


6. [AWS Step Functions](#aws-step-functions)
    - [What is Step Functions](#what-is-step-functions)
    - [Step Functions Concepts](#step-functions-concepts)
        - [State Machine](#state-machine)
        - [State Types](#state-types)
    - [Workflow Types](#workflow-types)
        - [Standard Workflows](#standard-workflows)
        - [Express Workflows](#express-workflows)
    - [Standard vs Express](#standard-vs-express)
    - [Step Functions Integrations](#step-functions-integrations)
        - [Service Integrations](#service-integrations)
    - [Wait for Task Token](#wait-for-task-token)
    - [Error Handling](#error-handling)
    - [Step Functions Common Exam Scenarios](#step-functions-common-exam-scenarios)

7. [AWS AppSync](#aws-appSync)
    - [What is AppSync](#what-is-appsync)
    - [GraphQL Basics](#graphql-basics)
    - [AppSync Features](#appsync-features)
        - [Data Sources](#data-sources)
        - [Real-Time Subscriptions](#real-time-subscriptions)
        - [Offline Support](#offline-support)
    - [AppSync Security](#appsync-security)
    - [AppSync vs API Gateway](#appsync-vs-api-gateway)
    - [AppSync Common Exam Scenarios](#appsync-common-exam-scenarios)
8. [Serverless Patterns and Architectures](#serverless-patterns-and-architectures)
    - [Serverless Services Comparison](#serverless-services-comparison)
    - [Critical Decision Points](#critical-decision-points)
    - [When to Use What](#when-to-use-what)
        - [Lambda Decision](#lambda-decision)
        - [API Gateway Decision](#api-gateway-decision)
        - [Messaging Decision](#messaging-decision)
        - [Real-Time Decision](#real-time-decision)
9.  [Common Exam Traps - Serverless](#common-exam-traps---serverless)
10.  [Serverless Exam Scenarios](#serverless-exam-scenarios)
11. [Serverless Best Practices](#serverless-best-practices)
    - [Lambda Best Practices](#lambda-best-practices)
    - [API Gateway Best Practices](#api-gateway-best-practices)
    - [SQS Best Practices](#sqs-best-practices)
    - [SNS Best Practices](#sns-best-practices)
    - [Step Functions Best Practices](#step-functions-best-practices)

12.  [Serverless Pricing Summary](#serverless-pricing-summary)
        - [Cost Overview](#cost-overview)
        - [Cost Optimization Tips](#cost-optimization-tips)
13. [Final Serverless Summary](#final-serverless-summary)
14.  [Quick Reference Card](#quick-reference-card)


---

# AWS Lambda 
⭐⭐⭐⭐⭐ (MOST CRITICAL)

## What is Lambda?
[BackToTop](#table-of-contents)
```
- Run code without provisioning servers
- Event-driven execution
- Automatic scaling
- Pay only for what you use
- Supports multiple runtimes
- Fully managed by AWS
```

## Lambda Core Concepts 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Function
```
What is a Lambda Function?
- Your code + configuration
- Stateless (no persistent state)
- Single purpose (best practice)
- Versioned and aliased

Components:
- Handler: Entry point (function.handler)
- Runtime: Language (Python 3.11, Node.js 18, Java 17, etc.)
- Memory: 128 MB - 10,240 MB
- Timeout: 1 second - 15 minutes
- Environment variables
- IAM execution role
- VPC configuration (optional)
```

### Execution Environment 
⭐⭐⭐⭐⭐
```
What happens when Lambda runs?

Cold Start:
1. AWS provisions execution environment
2. Downloads code
3. Initializes runtime
4. Runs initialization code (outside handler)
5. Runs handler

Warm Start:
1. Reuses existing environment
2. Runs handler only (faster)

Cold Start Latency:
- Python/Node.js: ~100ms
- Java/.NET: ~500ms - 1s
- VPC Lambda: Additional ~500ms (ENI creation)

Solutions for Cold Starts:
✅ Provisioned Concurrency (pre-warm)
✅ Keep functions warm (scheduled ping)
✅ Use lighter runtimes (Python vs Java)
✅ Minimize deployment package size
✅ Minimize initialization code
```

## Lambda Limits 
⭐⭐⭐⭐⭐ (MUST MEMORIZE)
[BackToTop](#table-of-contents)

```
Execution:
- Timeout: 15 minutes (MAX)
- Memory: 128 MB - 10,240 MB (10 GB)
- CPU: Proportional to memory (no direct control)
- /tmp storage: 512 MB - 10,240 MB (10 GB)
- Concurrent executions: 1,000 (default, soft limit)
- Burst limit: 500-3,000 (varies by region)

Deployment:
- Package size (zip): 50 MB (compressed)
- Package size (unzipped): 250 MB
- Container image: 10 GB
- Environment variables: 4 KB total
- Layers: 5 per function, 250 MB total

Invocation:
- Payload (sync): 6 MB
- Payload (async): 256 KB
- Response payload: 6 MB

Key Exam Numbers:
✅ Max timeout: 15 minutes
✅ Max memory: 10 GB
✅ Default concurrency: 1,000
✅ /tmp: up to 10 GB
```

## Lambda Invocation Types 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### 1. Synchronous Invocation ⭐⭐⭐⭐⭐

```
What: Wait for response
Who: Caller waits for result

Sources:
✅ API Gateway
✅ Application Load Balancer
✅ Lambda (invoke another Lambda)
✅ AWS SDK/CLI
✅ Cognito
✅ Lex
✅ Alexa

Error Handling:
- Caller receives error
- Caller must handle retry
- No automatic retry by Lambda

Example:
API Gateway → Lambda → Returns response to API Gateway
User waits for response
```

### 2. Asynchronous Invocation 
⭐⭐⭐⭐⭐
```
What: Don't wait for response
Who: Lambda processes in background

Sources:
✅ S3 (object events)
✅ SNS (notifications)
✅ EventBridge (events)
✅ CloudWatch Events
✅ CodeCommit
✅ CloudFormation
✅ SES

Error Handling:
- Lambda retries automatically (2 times)
- Total attempts: 3 (original + 2 retries)
- Dead Letter Queue (DLQ) for failed events
- Event destination (success/failure)

Retry Behavior:
Attempt 1: Immediate
Attempt 2: 1 minute later
Attempt 3: 2 minutes later
After 3 failures: Send to DLQ (if configured)

Dead Letter Queue (DLQ):
- SQS queue or SNS topic
- Receives failed events
- For analysis and reprocessing
```

### 3. Event Source Mapping 
⭐⭐⭐⭐⭐
```
What: Lambda polls source for records
Who: Lambda reads from stream/queue

Sources:
✅ SQS (standard and FIFO)
✅ Kinesis Data Streams
✅ DynamoDB Streams
✅ MSK (Managed Streaming for Kafka)
✅ Self-managed Kafka
✅ MQ (ActiveMQ, RabbitMQ)

How It Works:
1. Lambda polls source
2. Reads records in batches
3. Invokes function with batch
4. Processes records
5. Deletes from source (if success)

Key Settings:
- Batch size: 1-10,000 (SQS), 1-10,000 (Kinesis)
- Batch window: Wait to fill batch (0-300 seconds)
- Concurrency: Limit parallel invocations
- Error handling: Bisect batch, retry, DLQ

SQS Specific:
- Lambda scales based on queue depth
- 1 Lambda per 5 SQS messages (initially)
- Scales up to 1,000 concurrent
- Visibility timeout > Lambda timeout (important!)

Kinesis/DynamoDB Streams:
- 1 Lambda per shard
- Process in order (per shard)
- Iterator position (TRIM_HORIZON or LATEST)
```

## Lambda Concurrency 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Concurrency Types
```
1. Unreserved Concurrency:
   - Shared pool (1,000 default)
   - All functions share
   - No guarantee

2. Reserved Concurrency:
   - Dedicated to specific function
   - Guarantees availability
   - Limits maximum concurrency
   - Prevents throttling other functions

3. Provisioned Concurrency:
   - Pre-initialized environments
   - Eliminates cold starts
   - Additional cost
   - Use for latency-sensitive apps

Example:
Account limit: 1,000 concurrent
Function A: Reserved 200 (guaranteed 200, max 200)
Function B: Reserved 300 (guaranteed 300, max 300)
Remaining: 500 (shared by all other functions)
```

### Throttling 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
What is Throttling?
- Lambda rejects invocations
- Concurrency limit reached
- Returns 429 (TooManyRequestsException)

Throttling Behavior:
Synchronous: Returns 429 error to caller
Asynchronous: Retries for up to 6 hours
Event Source Mapping: Retries until success or expiry

Solutions:
✅ Increase concurrency limit (request AWS)
✅ Use reserved concurrency (protect critical functions)
✅ Use SQS (buffer requests)
✅ Optimize function (reduce duration)
✅ Use exponential backoff (caller)
```

## Lambda Versions and Aliases 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Versions
```
What are Versions?
- Immutable snapshot of function
- Code + configuration
- Numbered (1, 2, 3...)
- $LATEST = current version

Example:
my-function:$LATEST (mutable, current)
my-function:1 (immutable, version 1)
my-function:2 (immutable, version 2)

Use Cases:
✅ Rollback to previous version
✅ Test new version safely
✅ Audit trail
```

### Aliases 
⭐⭐⭐⭐⭐
```
What are Aliases?
- Pointer to specific version
- Named (dev, staging, prod)
- Can split traffic (canary)
- Mutable (can update)

Example:
my-function:prod → Version 5
my-function:staging → Version 6
my-function:dev → $LATEST

Traffic Splitting (Canary):
my-function:prod → 90% Version 5, 10% Version 6

Use Cases:
✅ Blue/green deployments
✅ Canary releases
✅ Environment separation
✅ Stable API endpoints
```

## Lambda Layers 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
What are Layers?
- Shared code/libraries
- Separate from function code
- Reusable across functions
- Up to 5 layers per function

Contents:
✅ Libraries (numpy, pandas, etc.)
✅ Custom runtimes
✅ Configuration files
✅ Shared utilities

Benefits:
✅ Reduce deployment package size
✅ Share code across functions
✅ Separate concerns
✅ Faster deployments

Example:
Layer: common-utils (shared utilities)
Layer: numpy-layer (numpy library)

Function A: Uses common-utils + numpy-layer
Function B: Uses common-utils
Function C: Uses numpy-layer

Without layers: Each function includes all libraries
With layers: Libraries shared, smaller packages
```

## Lambda with VPC 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)


```
Why VPC?
- Access private resources
- RDS in private subnet
- ElastiCache in private subnet
- Internal services

Configuration:
- Select VPC
- Select subnets (private)
- Select security group

Important Considerations:
1. Internet Access:
   - Lambda in VPC loses Internet by default
   - Add NAT Gateway for Internet
   - Or use VPC endpoints for AWS services

2. Cold Start Impact:
   - VPC Lambda: Additional latency (ENI creation)
   - Improved with Hyperplane ENI (AWS managed)
   - Less of an issue now (AWS improved)

3. Security Group:
   - Lambda gets security group
   - Control outbound access
   - Target resources allow Lambda SG

Architecture:
Lambda (private subnet, SG: lambda-sg)
    ↓ (port 3306)
RDS (private subnet, SG: rds-sg allows lambda-sg)

Lambda (private subnet)
    ↓
NAT Gateway (public subnet)
    ↓
Internet Gateway
    ↓
Internet (for external APIs)
```

## Lambda Environment Variables 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
What are Environment Variables?
- Key-value pairs
- Available to function code
- Configuration without code changes
- Can be encrypted (KMS)

Example:
DB_HOST = db.example.com
DB_PORT = 3306
ENVIRONMENT = production
LOG_LEVEL = INFO

Encryption:
- Default: Encrypted at rest (Lambda managed key)
- Custom: Encrypt with KMS key
- Sensitive values: Use Secrets Manager instead

Best Practice:
✅ Use for non-sensitive config
✅ Use Secrets Manager for passwords
✅ Use Parameter Store for config
✅ Don't hardcode values in code
```

## Lambda Destinations 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
What are Destinations?
- Route invocation results
- Success or failure destinations
- For asynchronous invocations

Destinations:
✅ SQS queue
✅ SNS topic
✅ Lambda function
✅ EventBridge event bus

Example:
Lambda (async)
├─ Success → SQS (process results)
└─ Failure → SNS (alert team)

vs DLQ:
DLQ: Only for failures
Destinations: Success AND failure
Destinations: More routing options
Recommendation: Use Destinations over DLQ
```

## Lambda Performance Optimization 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
1. Memory Optimization:
   - More memory = more CPU
   - Find optimal memory (cost vs performance)
   - Use AWS Lambda Power Tuning tool

2. Initialization Code:
   - Move outside handler (runs once)
   - DB connections, SDK clients
   - Reused across invocations

Example:
# BAD: Creates connection every invocation
def handler(event, context):
    conn = create_db_connection()  # Every time!
    result = conn.query(...)
    return result

# GOOD: Creates connection once (reused)
conn = create_db_connection()  # Once per container

def handler(event, context):
    result = conn.query(...)  # Reuses connection
    return result

3. Package Size:
   - Smaller = faster cold start
   - Use layers for shared libraries
   - Remove unused dependencies
   - Use container images for large packages

4. Provisioned Concurrency:
   - Pre-warm for latency-sensitive
   - Eliminates cold starts
   - Additional cost

5. /tmp Storage:
   - Cache files between invocations
   - Download once, reuse
   - Up to 10 GB
```

## Lambda Security 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Execution Role 
⭐⭐⭐⭐⭐
```
What is Execution Role?
- IAM role for Lambda function
- Permissions to access AWS services
- Assumed by Lambda during execution

Example:
Lambda needs to:
- Read from S3
- Write to DynamoDB
- Send to SQS

Execution Role Policy:
{
  "Effect": "Allow",
  "Action": [
    "s3:GetObject",
    "dynamodb:PutItem",
    "sqs:SendMessage"
  ],
  "Resource": [...]
}

Best Practice:
✅ One role per function (least privilege)
✅ Don't share roles between functions
✅ Use managed policies when appropriate
```

### Resource-Based Policy 
⭐⭐⭐⭐⭐
```
What is Resource-Based Policy?
- Who can invoke Lambda
- Attached to Lambda function
- Cross-account access

Example:
Allow API Gateway to invoke Lambda:
{
  "Effect": "Allow",
  "Principal": {
    "Service": "apigateway.amazonaws.com"
  },
  "Action": "lambda:InvokeFunction",
  "Resource": "arn:aws:lambda:..."
}

Allow another account to invoke:
{
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::123456789012:root"
  },
  "Action": "lambda:InvokeFunction"
}
```

## Lambda Monitoring 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
CloudWatch Metrics (automatic):
✅ Invocations (count)
✅ Duration (ms)
✅ Errors (count)
✅ Throttles (count)
✅ ConcurrentExecutions
✅ UnreservedConcurrentExecutions

CloudWatch Logs (automatic):
✅ Function logs (print/console.log)
✅ START, END, REPORT logs
✅ Duration, billed duration, memory used

Lambda Insights:
✅ System-level metrics
✅ CPU time, memory, network
✅ Cold starts
✅ Requires Lambda Insights extension

X-Ray Tracing:
✅ Distributed tracing
✅ Identify bottlenecks
✅ Service map
✅ Enable in function configuration
```

## Lambda Common Exam Scenarios 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Scenario 1: Process S3 Uploads
```
Question: Process images when uploaded to S3

Answer: S3 Event → Lambda (async)

Configuration:
- S3 event notification → Lambda
- Lambda processes image
- Stores result in DynamoDB/S3
- DLQ for failed processing
```

### Scenario 2: API Backend
```
Question: Serverless REST API

Answer: API Gateway → Lambda → DynamoDB

Configuration:
- API Gateway: HTTP endpoints
- Lambda: Business logic
- DynamoDB: Data storage
- Cognito: Authentication
```

### Scenario 3: Database Access
```
Question: Lambda needs to access RDS in private subnet

Answer: Lambda in VPC + NAT Gateway for Internet

Configuration:
- Lambda: VPC, private subnet, security group
- RDS: Private subnet, security group (allow Lambda SG)
- NAT Gateway: For Internet access (if needed)
```

### Scenario 4: Handle Traffic Spikes
```
Question: API receives sudden traffic spikes, Lambda throttling

Answer: API Gateway → SQS → Lambda (event source mapping)

Why:
- SQS buffers requests
- Lambda processes at own pace
- No throttling
- Reliable processing
```

### Scenario 5: Eliminate Cold Starts
```
Question: Lambda function needs consistent low latency

Answer: Enable Provisioned Concurrency

Why:
- Pre-initialized environments
- No cold start latency
- Consistent performance
- Additional cost
```

### Scenario 6: Long-Running Process
```
Question: Process takes 20 minutes, Lambda not suitable

Answer: Use ECS Fargate or AWS Batch

Why:
- Lambda max timeout: 15 minutes
- 20 minutes exceeds limit
- Use ECS/Batch for long-running
```

---

# Amazon API Gateway 
⭐⭐⭐⭐⭐ (CRITICAL)
[BackToTop](#table-of-contents)

## What is API Gateway?
```
- Fully managed API service
- Create, publish, maintain, monitor APIs
- Handle traffic management
- Authorization and access control
- API versioning
- Monitoring
```

## API Types 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### REST API 
⭐⭐⭐⭐⭐
```
What: Full-featured REST API
Protocol: HTTP/HTTPS

Features:
✅ Request/response transformation
✅ Caching (0.5 GB - 237 GB)
✅ Usage plans and API keys
✅ Custom domain names
✅ WAF integration
✅ Private API (VPC only)
✅ Mock integrations
✅ Request validation
✅ SDK generation

Integrations:
✅ Lambda (proxy or custom)
✅ HTTP endpoints
✅ AWS services (direct)
✅ VPC Link (private resources)
✅ Mock (return static response)

Use When:
✅ Need caching
✅ Need usage plans/API keys
✅ Need request transformation
✅ Need WAF
✅ Full feature set needed
```

### HTTP API 
⭐⭐⭐⭐⭐
```
What: Simplified REST API (newer)
Protocol: HTTP/HTTPS

Features:
✅ Lower latency (~60% faster than REST)
✅ Lower cost (~70% cheaper than REST)
✅ JWT authorization (native)
✅ CORS support
✅ Automatic deployments
✅ Private integrations (VPC Link)

Limitations vs REST API:
❌ No caching
❌ No usage plans
❌ No request transformation
❌ No WAF (direct)
❌ No API keys

Use When:
✅ Simple Lambda proxy
✅ Cost-sensitive
✅ Lower latency needed
✅ JWT authentication
✅ Don't need REST API features

REST API vs HTTP API:
Feature needed → REST API
Simple + cheap → HTTP API
```

### WebSocket API 
⭐⭐⭐⭐⭐
```
What: Real-time bidirectional communication
Protocol: WebSocket

Features:
✅ Persistent connections
✅ Two-way communication
✅ Connection management
✅ Route based on message content
✅ Lambda integration

Routes:
- $connect: Client connects
- $disconnect: Client disconnects
- $default: Default route
- Custom routes (based on message)

Use Cases:
✅ Real-time chat
✅ Live dashboards
✅ Gaming
✅ Collaborative apps
✅ Financial tickers

Architecture:
Client ←→ WebSocket API ←→ Lambda
                              ↓
                          DynamoDB (store connections)
                              ↓
                          Lambda (send to connections)
```

## API Gateway Integrations 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Lambda Proxy Integration 
⭐⭐⭐⭐⭐
```
What: Pass entire request to Lambda
Lambda handles everything

Request to Lambda:
{
  "httpMethod": "GET",
  "path": "/users/123",
  "headers": {...},
  "queryStringParameters": {...},
  "body": "...",
  "requestContext": {...}
}

Response from Lambda:
{
  "statusCode": 200,
  "headers": {...},
  "body": "{\"user\": \"John\"}"
}

Benefits:
✅ Simple setup
✅ Lambda has full control
✅ No transformation needed
✅ Most common pattern
```

### Lambda Custom Integration
```
What: Transform request/response
API Gateway handles transformation

Use When:
✅ Need to transform request before Lambda
✅ Need to transform response after Lambda
✅ Complex mapping templates
✅ Velocity Template Language (VTL)
```

### HTTP Integration
```
What: Forward to HTTP endpoint
Backend: Any HTTP server

Use Cases:
✅ Proxy to existing HTTP API
✅ Migrate to AWS gradually
✅ Hybrid architectures
```

### AWS Service Integration 
⭐⭐⭐⭐
```
What: Directly call AWS services
No Lambda needed

Examples:
- API Gateway → SQS (send message)
- API Gateway → DynamoDB (put item)
- API Gateway → SNS (publish)
- API Gateway → Step Functions (start execution)

Benefits:
✅ No Lambda (lower cost)
✅ Lower latency
✅ Simpler architecture

Example:
POST /orders → API Gateway → SQS (directly)
No Lambda needed for simple queuing
```

## API Gateway Security 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### 1. IAM Authorization 
⭐⭐⭐⭐⭐
```
What: AWS IAM for API access
Who: AWS users, roles, services

How:
- Client signs request with AWS credentials
- API Gateway validates signature
- Checks IAM permissions

Use Cases:
✅ AWS services calling API
✅ Internal AWS applications
✅ Cross-account access

Example:
EC2 instance (IAM role) → API Gateway (IAM auth) → Lambda
```

### 2. Lambda Authorizer 
⭐⭐⭐⭐⭐
```
What: Custom authentication with Lambda
Who: Any identity provider

Types:
1. Token-based: JWT, OAuth token
2. Request-based: Headers, query params

How:
1. Client sends request with token
2. API Gateway calls authorizer Lambda
3. Lambda validates token
4. Returns IAM policy (allow/deny)
5. API Gateway caches policy (TTL)

Use Cases:
✅ Custom authentication
✅ Third-party identity providers
✅ OAuth 2.0
✅ JWT validation
✅ Legacy auth systems

Example:
Client (JWT token) → API Gateway → Lambda Authorizer
Lambda validates JWT → Returns allow policy
API Gateway → Lambda (backend)
```

### 3. Cognito User Pools 
⭐⭐⭐⭐⭐
```
What: Cognito for authentication
Who: End users (web/mobile)

How:
1. User authenticates with Cognito
2. Cognito returns JWT token
3. Client sends request with JWT
4. API Gateway validates JWT with Cognito
5. No Lambda authorizer needed

Use Cases:
✅ Web/mobile applications
✅ User authentication
✅ Social login (Google, Facebook)
✅ MFA

Example:
User → Cognito (login) → JWT token
Client (JWT) → API Gateway (Cognito auth) → Lambda
```

### 4. API Keys and Usage Plans 
⭐⭐⭐⭐
```
What: API keys for access control
Who: External developers, partners

Usage Plans:
- Throttling (requests/second)
- Quota (requests/day, week, month)
- Associate with API stages

Example:
Free Plan: 100 req/day, 10 req/sec
Pro Plan: 10,000 req/day, 100 req/sec
Enterprise: Unlimited

Use Cases:
✅ Monetize API
✅ Rate limiting per client
✅ Partner access control
✅ Developer portals
```

## API Gateway Caching 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
What: Cache API responses
Where: API Gateway level (not Lambda)

Configuration:
- Cache size: 0.5 GB - 237 GB
- TTL: 0-3600 seconds (default 300)
- Per-method caching
- Cache key: URL, headers, query params

Benefits:
✅ Reduce backend calls
✅ Lower latency
✅ Reduce Lambda costs
✅ Handle traffic spikes

Cache Invalidation:
- TTL expires
- Manual invalidation
- Client sends Cache-Control: max-age=0

Use Cases:
✅ Read-heavy APIs
✅ Expensive backend calls
✅ Reduce costs
✅ Improve performance

Note: REST API only (not HTTP API)
```

## API Gateway Throttling 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
Throttling Levels:
1. Account level: 10,000 req/sec (default)
2. Stage level: Per API stage
3. Method level: Per API method
4. Usage plan: Per API key

Throttling Response:
- 429 Too Many Requests

Burst Limit:
- 5,000 requests (burst)
- Then steady-state rate

Example:
Account limit: 10,000 req/sec
Stage limit: 5,000 req/sec
Method limit: 1,000 req/sec (GET /users)
Usage plan: 100 req/sec (per API key)
```

## API Gateway Stages and Deployments 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
What are Stages?
- Named references to deployments
- dev, staging, prod
- Different configurations per stage
- Stage variables (like env variables)

Stage Variables:
- Key-value pairs per stage
- Reference in integration (Lambda alias)
- Different Lambda per stage

Example:
Stage: prod
  Stage variable: lambdaAlias = prod
  Lambda: my-function:prod

Stage: dev
  Stage variable: lambdaAlias = dev
  Lambda: my-function:dev

Canary Deployments:
- Route % of traffic to new deployment
- Test new version safely
- Promote or rollback

Example:
Prod stage: 90% → v1, 10% → v2 (canary)
If v2 works: Promote to 100%
If v2 fails: Rollback to 100% v1
```

## API Gateway CORS 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
What is CORS?
- Cross-Origin Resource Sharing
- Browser security policy
- Allow/deny cross-origin requests

When Needed:
- Web app on different domain calls API
- Example: app.example.com → api.example.com

Configuration:
- Enable CORS on API Gateway
- Set allowed origins, methods, headers
- API Gateway handles OPTIONS preflight

Common Issue:
"CORS error" in browser
→ Enable CORS on API Gateway
→ Lambda must return CORS headers too (proxy integration)
```

## API Gateway Common Exam Scenarios 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Scenario 1: Serverless REST API
```
Question: Build serverless REST API with authentication

Answer: API Gateway + Lambda + Cognito + DynamoDB

Architecture:
Client → API Gateway (Cognito auth) → Lambda → DynamoDB
```

### Scenario 2: Rate Limiting per Customer
```
Question: Limit API usage per customer (100 req/day)

Answer: API Gateway with usage plans and API keys

Configuration:
- Create usage plan (100 req/day)
- Create API key per customer
- Associate key with usage plan
```

### Scenario 3: Real-Time Chat
```
Question: Build real-time chat application

Answer: API Gateway WebSocket API + Lambda + DynamoDB

Architecture:
Client ←→ WebSocket API ←→ Lambda
                              ↓
                          DynamoDB (connections)
```

### Scenario 4: Reduce Lambda Costs
```
Question: API has many repeated identical requests

Answer: Enable API Gateway caching

Why:
- Cache responses
- Reduce Lambda invocations
- Lower cost
- Better performance
```

### Scenario 5: Custom Authentication
```
Question: API needs to validate custom JWT tokens

Answer: API Gateway with Lambda Authorizer

Why:
- Custom validation logic
- Any token format
- Cache authorization result
- Flexible
```

---

# Amazon SQS 
⭐⭐⭐⭐⭐ (CRITICAL)
[BackToTop](#table-of-contents)
## What is SQS?
```
- Fully managed message queue
- Decouple application components
- Asynchronous communication
- Durable (messages stored redundantly)
- Pull-based (consumers poll)
- Scales automatically
```

## SQS Queue Types 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Standard Queue 
⭐⭐⭐⭐⭐
```
Characteristics:
- Unlimited throughput
- At-least-once delivery (duplicates possible)
- Best-effort ordering (not guaranteed)
- Nearly unlimited messages

Use When:
✅ High throughput needed
✅ Order not critical
✅ Duplicates acceptable (idempotent processing)
✅ Most use cases

Example:
Image processing queue:
- Upload image → SQS Standard
- Multiple workers process
- Order doesn't matter
- Duplicates handled (check if already processed)
```

### FIFO Queue 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
Characteristics:
- First-In-First-Out ordering (guaranteed)
- Exactly-once processing (no duplicates)
- 300 TPS (3,000 with batching)
- Message groups (parallel processing within FIFO)
- Name must end with .fifo

Use When:
✅ Order matters
✅ No duplicates allowed
✅ Financial transactions
✅ Sequential processing

Example:
Order processing:
- Order 1 → SQS FIFO
- Order 2 → SQS FIFO
- Order 3 → SQS FIFO
Processed in exact order: 1, 2, 3

Message Group ID:
- Group messages by customer
- Each group processed in order
- Different groups processed in parallel

Example:
Customer A orders: 1, 2, 3 (processed in order)
Customer B orders: 4, 5, 6 (processed in order, parallel to A)
```

## SQS Key Concepts 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Visibility Timeout 
⭐⭐⭐⭐⭐
```
What: Time message is hidden after received
Default: 30 seconds
Range: 0 seconds - 12 hours

How It Works:
1. Consumer receives message
2. Message hidden (visibility timeout)
3. Consumer processes message
4. Consumer deletes message (success)
5. If not deleted: Message reappears (retry)

Important:
- Visibility timeout > Processing time
- If Lambda: Visibility timeout > Lambda timeout
- Too short: Duplicate processing
- Too long: Slow retry on failure

Example:
Lambda timeout: 5 minutes
Visibility timeout: 6 minutes (must be longer)
```

### Message Retention 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
Default: 4 days
Range: 1 minute - 14 days

After retention period: Message deleted automatically

Use Cases:
- Short retention: High-volume, process quickly
- Long retention: Important messages, slow processing
```

### Dead Letter Queue (DLQ) 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
What is DLQ?
- Separate queue for failed messages
- Messages that couldn't be processed
- For analysis and debugging
- Prevent message loss

How It Works:
1. Message received by consumer
2. Processing fails
3. Message returns to queue
4. After maxReceiveCount: Moved to DLQ

Configuration:
- maxReceiveCount: How many retries before DLQ
- DLQ must be same type (Standard → Standard, FIFO → FIFO)
- Set retention period longer than source queue

Example:
maxReceiveCount: 3
Attempt 1: Fails → Returns to queue
Attempt 2: Fails → Returns to queue
Attempt 3: Fails → Moved to DLQ

DLQ Actions:
✅ Analyze failed messages
✅ Fix bug
✅ Redrive to source queue (reprocess)
✅ Alert team (CloudWatch alarm on DLQ depth)

DLQ Redrive:
- Move messages from DLQ back to source
- After fixing the bug
- Reprocess failed messages
```

### Long Polling vs Short Polling 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
Short Polling (Default):
- Returns immediately (even if empty)
- May return empty response
- More API calls = higher cost
- Higher CPU usage

Long Polling (Recommended):
- Waits for messages (up to 20 seconds)
- Returns when message available
- Fewer API calls = lower cost
- More efficient

Configuration:
- ReceiveMessageWaitTimeSeconds: 1-20 seconds
- 0 = short polling
- 1-20 = long polling

Benefits of Long Polling:
✅ Reduce empty responses
✅ Lower cost
✅ Lower latency (message arrives immediately)
✅ Reduce CPU usage

Key Exam Tip:
"Reduce SQS costs" → Enable long polling
"Reduce empty responses" → Enable long polling
```

### Message Batching 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
Send Batch:
- Up to 10 messages per batch
- Reduce API calls
- Lower cost

Receive Batch:
- Up to 10 messages per receive
- Process multiple at once
- More efficient

Delete Batch:
- Delete up to 10 messages
- After successful processing

Benefits:
✅ Reduce API calls (lower cost)
✅ Higher throughput
✅ More efficient processing
```

### SQS Message Size 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
Standard: Up to 256 KB
FIFO: Up to 256 KB

For Larger Messages:
- Store in S3
- Send S3 reference in SQS
- Consumer reads from S3

Extended Client Library:
- Java library
- Automatically stores large messages in S3
- Transparent to application

Example:
Large message (1 MB):
1. Store in S3: s3://bucket/message-123.json
2. SQS message: {"s3Key": "message-123.json"}
3. Consumer reads SQS
4. Consumer fetches from S3
```

## SQS with Lambda 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

```
Architecture:
Producer → SQS → Lambda (event source mapping)

How It Works:
1. Lambda polls SQS automatically
2. Reads messages in batches
3. Invokes Lambda with batch
4. Lambda processes messages
5. Deletes successful messages
6. Failed messages return to queue

Key Settings:
- Batch size: 1-10,000 messages
- Batch window: 0-300 seconds (wait to fill batch)
- Max concurrency: Limit parallel Lambdas
- Report batch item failures: Partial success

Scaling:
- Lambda scales based on queue depth
- 1 Lambda per 5 messages initially
- Scales up to 1,000 concurrent (standard)
- FIFO: 1 Lambda per message group

Important:
Visibility timeout > Lambda timeout
(Prevent duplicate processing)

Partial Batch Failure:
- Some messages succeed, some fail
- Report failed message IDs
- Only failed messages return to queue
- Successful messages deleted
```

## SQS Security 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
Encryption:
- In transit: HTTPS (default)
- At rest: SSE-SQS (AWS managed) or SSE-KMS (customer managed)

Access Control:
- IAM policies (who can send/receive)
- SQS resource policies (cross-account)

Example IAM Policy:
{
  "Effect": "Allow",
  "Action": [
    "sqs:SendMessage",
    "sqs:ReceiveMessage",
    "sqs:DeleteMessage"
  ],
  "Resource": "arn:aws:sqs:us-east-1:123456789012:my-queue"
}

Cross-Account Access:
- SQS resource policy
- Allow specific account to send/receive
```

## When to Use SQS 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### ✅ Use SQS When
- Decouple application components
- Handle traffic spikes (buffer)
- Async processing
- Retry failed processing (DLQ)
- Order matters (FIFO)
- No duplicate processing (FIFO)

### ❌ Don't Use SQS When
- Need fan-out (one to many) → SNS
- Need real-time event routing → EventBridge
- Need workflow orchestration → Step Functions

## Keywords to Identify SQS
[BackToTop](#table-of-contents)

```
"Message queue"
"Decouple"
"Buffer"
"Async processing"
"FIFO"
"Dead letter queue"
"Retry"
"At-least-once delivery"
"Exactly-once processing"
```

## SQS Common Exam Scenarios 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Scenario 1: Decouple Web and Worker
```
Question: Web tier should not wait for slow processing

Answer: Web tier → SQS → Worker (Lambda/EC2)

Why:
- Web tier returns immediately
- SQS buffers requests
- Worker processes asynchronously
- Independent scaling
```

### Scenario 2: Handle Traffic Spikes
```
Question: API receives sudden spikes, backend can't handle

Answer: API → SQS → Lambda (process at own pace)

Why:
- SQS absorbs spike
- Lambda processes steadily
- No dropped requests
- Reliable processing
```

### Scenario 3: Order Processing (No Duplicates)
```
Question: Process financial transactions in order, no duplicates

Answer: SQS FIFO queue

Why:
- FIFO: Guaranteed order
- Exactly-once: No duplicates
- Financial transactions need both
```

### Scenario 4: Failed Message Handling
```
Question: Handle messages that fail processing

Answer: Configure DLQ on SQS queue

Why:
- Failed messages go to DLQ
- Analyze and fix
- Redrive to reprocess
- No message loss
```

---

# Amazon SNS 
⭐⭐⭐⭐⭐ (CRITICAL)
[BackToTop](#table-of-contents)
## What is SNS?
```
- Fully managed pub/sub messaging
- Push-based (not pull)
- One message → Multiple subscribers
- Fan-out pattern
- Durable (messages stored across AZs)
- Scales automatically
```

## SNS Core Concepts 
⭐⭐⭐⭐⭐

### Topics 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
What is a Topic?
- Communication channel
- Publishers send messages to topic
- Subscribers receive from topic
- Decouples publishers from subscribers

Types:
1. Standard Topic:
   - High throughput
   - At-least-once delivery
   - Best-effort ordering
   - Multiple subscriber types

2. FIFO Topic:
   - Ordered delivery
   - Exactly-once delivery
   - Only SQS FIFO subscribers
   - Lower throughput
   - Name ends with .fifo
```

### Subscribers 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
Supported Subscribers:
✅ SQS queues (most common)
✅ Lambda functions
✅ HTTP/HTTPS endpoints
✅ Email (plain text or JSON)
✅ SMS (text messages)
✅ Mobile push (iOS, Android, etc.)
✅ Kinesis Data Firehose

Subscriber Limits:
- Up to 12.5 million subscriptions per topic
- Up to 100,000 topics per account
```

### Message Filtering 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
What is Message Filtering?
- Filter messages per subscriber
- JSON filter policy
- Subscribers only receive relevant messages
- Reduce unnecessary processing

Without Filtering:
All subscribers receive ALL messages
→ Each subscriber must filter themselves

With Filtering:
Each subscriber receives ONLY relevant messages
→ More efficient, less processing

Example:
SNS Topic: orders

Subscriber 1 (SQS - Order Service):
Filter: {"type": ["new_order"]}
Receives: Only new orders

Subscriber 2 (SQS - Refund Service):
Filter: {"type": ["refund"]}
Receives: Only refunds

Subscriber 3 (Lambda - Analytics):
No filter
Receives: All messages

Filter Policy:
{
  "type": ["new_order", "update_order"],
  "amount": [{"numeric": [">=", 100]}]
}
Receives: new_order or update_order with amount >= 100
```

## SNS + SQS Fan-Out Pattern 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
What is Fan-Out?
- One message → Multiple SQS queues
- Each queue → Independent processing
- Reliable (SQS persistence)
- Decoupled

Architecture:
Producer
    ↓
SNS Topic
    ↓
┌───────────┼───────────┐
↓           ↓           ↓
SQS Queue 1 SQS Queue 2 SQS Queue 3
    ↓           ↓           ↓
Consumer 1  Consumer 2  Consumer 3

Benefits:
✅ One message → Multiple consumers
✅ SQS provides persistence
✅ Independent processing
✅ Independent scaling
✅ Failure isolation

Example:
Order placed → SNS
├─ SQS → Email service (send confirmation)
├─ SQS → Inventory service (update stock)
├─ SQS → Analytics service (track metrics)
└─ SQS → Fraud service (check fraud)

Each service processes independently
If one fails, others continue
```

## SNS Message Delivery 
⭐⭐⭐⭐⭐
```
Delivery Attempts:
- HTTP/HTTPS: 3 retries (immediate, 20s, 1min)
- Lambda: 3 retries
- SQS: Delivered once (SQS handles retry)
- Email/SMS: Best effort

Dead Letter Queue (DLQ):
- For failed deliveries
- SQS queue
- Analyze failed messages

Message Attributes:
- Metadata about message
- Used for filtering
- Key-value pairs

Example:
Message: {"orderId": "123", "amount": 150}
Attributes:
  type: "new_order"
  priority: "high"
  region: "us-east"
```

## SNS Security 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
Encryption:
- In transit: HTTPS
- At rest: SSE-SNS or SSE-KMS

Access Control:
- IAM policies
- SNS resource policies (cross-account)

Example:
Allow S3 to publish to SNS:
{
  "Effect": "Allow",
  "Principal": {
    "Service": "s3.amazonaws.com"
  },
  "Action": "sns:Publish",
  "Resource": "arn:aws:sns:..."
}
```

## SNS vs SQS 
⭐⭐⭐⭐⭐ (CRITICAL)
[BackToTop](#table-of-contents)

| Feature | SNS | SQS |
|---------|-----|-----|
| **Type** | Pub/Sub | Queue |
| **Direction** | Push | Pull |
| **Consumers** | Multiple (fan-out) | Single (competing) |
| **Persistence** | No (fire and forget) | Yes (up to 14 days) |
| **Retry** | Limited | Yes (visibility timeout) |
| **Ordering** | No (Standard) / Yes (FIFO) | No (Standard) / Yes (FIFO) |
| **Use Case** | Notifications, fan-out | Decoupling, buffering |

**Key Decision**:
```
One message → Multiple consumers → SNS (fan-out)
One message → One consumer (reliable) → SQS
One message → Multiple consumers (reliable) → SNS + SQS
```

## SNS Common Exam Scenarios 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Scenario 1: Fan-Out to Multiple Services
```
Question: S3 upload should trigger multiple services

Answer: S3 → SNS → Multiple SQS queues

Why:
- S3 can only send to one destination
- SNS fans out to multiple SQS
- Each service processes independently
- Reliable (SQS persistence)
```

### Scenario 2: Alert Multiple Teams
```
Question: CloudWatch alarm should notify multiple teams

Answer: CloudWatch → SNS → Email (team1), Email (team2), SMS (oncall)

Why:
- SNS supports multiple subscribers
- Different notification types
- Single alarm → Multiple notifications
```

### Scenario 3: Filter Messages per Service
```
Question: Different services need different order types

Answer: SNS with message filtering

Why:
- Each subscriber gets only relevant messages
- Reduce unnecessary processing
- Efficient routing
```

---

# Amazon EventBridge 
⭐⭐⭐⭐⭐ (CRITICAL)
[BackToTop](#table-of-contents)

## What is EventBridge?
```
- Serverless event bus
- Route events between services
- Schedule events (cron/rate)
- React to state changes
- Content-based routing
- Formerly CloudWatch Events
- SaaS integration
```

## EventBridge Components 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Event Buses 
⭐⭐⭐⭐⭐
```
Types:

1. Default Event Bus:
   - AWS service events
   - Automatic (always exists)
   - EC2 state changes, S3 events, etc.

2. Custom Event Bus:
   - Your application events
   - Create for each application
   - Cross-account events

3. Partner Event Bus:
   - SaaS partner events
   - Zendesk, Datadog, PagerDuty
   - Stripe, GitHub, etc.

Example:
Default: EC2 instance terminated
Custom: Order placed (your app)
Partner: Zendesk ticket created
```

### Rules 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
What are Rules?
- Match events
- Route to targets
- Two types: Event pattern or Schedule

1. Event Pattern Rules:
   - Match specific events
   - JSON pattern matching
   - Content-based filtering

Example Pattern:
{
  "source": ["aws.ec2"],
  "detail-type": ["EC2 Instance State-change Notification"],
  "detail": {
    "state": ["terminated"]
  }
}
Matches: EC2 instance terminated events

2. Schedule Rules:
   - Cron expression
   - Rate expression
   - Trigger on schedule

Cron: cron(0 12 * * ? *)  # Every day at noon
Rate: rate(5 minutes)      # Every 5 minutes
```

### Targets 
⭐⭐⭐⭐⭐
```
Supported Targets:
✅ Lambda (most common)
✅ SQS
✅ SNS
✅ Step Functions
✅ ECS tasks
✅ API Gateway
✅ Kinesis Data Streams
✅ Kinesis Firehose
✅ CodePipeline
✅ CodeBuild
✅ Systems Manager
✅ EC2 actions
✅ Another event bus (cross-account)

Multiple Targets:
- Up to 5 targets per rule
- All targets receive event
- Fan-out capability
```

## EventBridge Advanced Features 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Schema Registry 
⭐⭐⭐⭐
```
What: Discover and store event schemas
Benefits:
✅ Auto-discover event structure
✅ Generate code bindings
✅ Type-safe event handling
✅ Documentation

Use Cases:
✅ Understand event structure
✅ Generate SDK code
✅ API documentation
```

### Event Archive and Replay 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
What: Archive events for replay
Benefits:
✅ Replay past events
✅ Debug issues
✅ Test new consumers
✅ Disaster recovery

Configuration:
- Archive: Store events (indefinitely or with retention)
- Replay: Replay archived events to event bus

Use Cases:
✅ Debug production issues
✅ Test new Lambda with real events
✅ Replay after bug fix
```

### Cross-Account Events 
⭐⭐⭐⭐⭐
```
Architecture:
Account A (source)
    ↓ (event)
Account A Default Bus
    ↓ (rule: forward to Account B)
Account B Custom Bus
    ↓ (rule: route to target)
Account B Lambda

Use Cases:
✅ Centralized event processing
✅ Multi-account architectures
✅ Security account receives all events
✅ Audit and compliance
```

### Pipes 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
What: Point-to-point integration
Source → Filter → Enrich → Target

Sources:
✅ SQS
✅ Kinesis
✅ DynamoDB Streams
✅ Kafka

Targets:
✅ Lambda
✅ Step Functions
✅ API Gateway
✅ SQS, SNS

Benefits:
✅ Simplified integration
✅ Built-in filtering
✅ Enrichment (Lambda)
✅ No custom code needed
```

## EventBridge vs SNS vs SQS 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

| Feature | EventBridge | SNS | SQS |
|---------|-------------|-----|-----|
| **Type** | Event bus | Pub/Sub | Queue |
| **Routing** | Content-based (JSON) | Topic-based | N/A |
| **Sources** | AWS, custom, SaaS | AWS, custom | Custom |
| **Filtering** | Advanced JSON | Basic | N/A |
| **Scheduling** | Yes (cron/rate) | No | No |
| **Persistence** | No | No | Yes |
| **Use Case** | Event routing, scheduling | Notifications | Decoupling |

**Key Decision**:
```
Schedule tasks → EventBridge
React to AWS events → EventBridge
SaaS integration → EventBridge
Fan-out notifications → SNS
Decouple + buffer → SQS
```

## EventBridge Common Exam Scenarios 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Scenario 1: Scheduled Lambda
```
Question: Run Lambda every day at midnight

Answer: EventBridge rule (cron) → Lambda

Configuration:
Rule: cron(0 0 * * ? *)
Target: Lambda function
```

### Scenario 2: React to EC2 Termination
```
Question: Notify team when EC2 instance terminated

Answer: EventBridge rule (EC2 state change) → SNS → Email

Pattern:
{
  "source": ["aws.ec2"],
  "detail": {"state": ["terminated"]}
}
```

### Scenario 3: Automated Compliance
```
Question: Automatically remediate non-compliant resources

Answer: Config → EventBridge → Lambda (remediate)

Flow:
Config detects non-compliance
→ EventBridge rule matches
→ Lambda remediates
→ SNS notifies team
```

### Scenario 4: SaaS Integration
```
Question: Process Zendesk tickets in AWS

Answer: Zendesk → EventBridge (partner bus) → Lambda

Why:
- EventBridge supports SaaS partners
- No custom integration needed
- Serverless processing
```

---

# AWS Step Functions 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## What is Step Functions?
```
- Serverless workflow orchestration
- Coordinate multiple AWS services
- Visual workflow (state machine)
- Built-in error handling and retry
- Audit trail (execution history)
- Long-running workflows (up to 1 year)
```

## Step Functions Concepts 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### State Machine 
⭐⭐⭐⭐⭐
```
What: Workflow definition
Format: Amazon States Language (JSON)
Visual: Graphical representation

Components:
- States: Individual steps
- Transitions: Move between states
- Input/Output: Data flow
- Error handling: Catch and retry
```

### State Types 
⭐⭐⭐⭐⭐
```
1. Task State:
   - Do work
   - Call Lambda, ECS, DynamoDB, etc.
   - Most common state

2. Choice State:
   - Conditional branching
   - If/else logic
   - Route based on data

3. Wait State:
   - Pause execution
   - Fixed time or timestamp
   - Wait for external event

4. Parallel State:
   - Run branches simultaneously
   - Wait for all to complete
   - Combine results

5. Map State:
   - Iterate over array
   - Process each item
   - Parallel or sequential

6. Pass State:
   - Pass data through
   - No work done
   - Transform data

7. Succeed State:
   - End successfully
   - Terminal state

8. Fail State:
   - End with failure
   - Terminal state
```

## Workflow Types 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Standard Workflows 
⭐⭐⭐⭐⭐
```
Characteristics:
- Duration: Up to 1 year
- Execution: Exactly-once
- Execution history: Full audit trail
- Pricing: Per state transition

Use Cases:
✅ Long-running workflows
✅ Human approval workflows
✅ Audit required
✅ Complex business processes
✅ Order processing

Example:
Order workflow (takes days):
1. Validate order
2. Wait for payment (up to 24 hours)
3. Process payment
4. Ship order
5. Wait for delivery confirmation
6. Complete order
```

### Express Workflows 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
Characteristics:
- Duration: Up to 5 minutes
- Execution: At-least-once
- Execution history: CloudWatch Logs
- Pricing: Per execution + duration

Types:
1. Synchronous Express:
   - Wait for completion
   - Return result
   - API Gateway integration

2. Asynchronous Express:
   - Don't wait
   - Fire and forget
   - High volume

Use Cases:
✅ High-volume workflows
✅ Short-duration
✅ IoT data processing
✅ Streaming data
✅ Mobile backends

Cost:
- Cheaper than Standard
- Better for high-volume
```

### Standard vs Express 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

| Feature | Standard | Express |
|---------|----------|---------|
| **Duration** | Up to 1 year | Up to 5 minutes |
| **Execution** | Exactly-once | At-least-once |
| **History** | Full audit trail | CloudWatch Logs |
| **Pricing** | Per state transition | Per execution + duration |
| **Use Case** | Long-running, audit | High-volume, short |

## Step Functions Integrations 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Service Integrations
```
Optimized Integrations:
✅ Lambda (invoke)
✅ DynamoDB (put, get, update)
✅ ECS (run task)
✅ SNS (publish)
✅ SQS (send message)
✅ Glue (start job)
✅ SageMaker (training, inference)
✅ Athena (start query)
✅ EMR (run job)
✅ API Gateway (invoke)
✅ EventBridge (put events)

Integration Patterns:
1. Request-Response:
   - Call service
   - Continue immediately
   - Don't wait for completion

2. Sync (Wait for completion):
   - Call service
   - Wait for completion
   - Get result

3. Wait for Task Token:
   - Send task token to service
   - Wait for callback
   - Human approval pattern
```

### Wait for Task Token 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
What: Pause workflow until callback received
Use: Human approval, external systems

How It Works:
1. Step Functions sends task token to service
2. Workflow pauses (waits)
3. External system processes
4. External system calls SendTaskSuccess/Failure
5. Workflow resumes

Example: Human Approval
1. Step Functions → SQS (with task token)
2. Worker picks up message
3. Sends email to approver
4. Approver clicks approve/reject
5. Lambda calls SendTaskSuccess/Failure
6. Workflow continues

Use Cases:
✅ Human approval workflows
✅ External system integration
✅ Long-running external processes
✅ Manual review steps
```

## Error Handling 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
Retry:
- Automatic retry on failure
- Configurable:
  - MaxAttempts: How many retries
  - IntervalSeconds: Wait between retries
  - BackoffRate: Multiply interval each retry
  - MaxDelaySeconds: Maximum wait

Example:
"Retry": [
  {
    "ErrorEquals": ["Lambda.ServiceException"],
    "IntervalSeconds": 2,
    "MaxAttempts": 3,
    "BackoffRate": 2
  }
]
Attempt 1: Fails → Wait 2s
Attempt 2: Fails → Wait 4s
Attempt 3: Fails → Wait 8s
After 3 attempts: Catch or Fail

Catch:
- Handle specific errors
- Route to different state
- Graceful error handling

Example:
"Catch": [
  {
    "ErrorEquals": ["PaymentFailed"],
    "Next": "NotifyCustomer"
  },
  {
    "ErrorEquals": ["States.ALL"],
    "Next": "HandleError"
  }
]
```

## Step Functions Common Exam Scenarios 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Scenario 1: Order Processing Workflow
```
Question: Coordinate multiple services for order processing

Answer: Step Functions Standard Workflow

States:
1. ValidateOrder (Lambda)
2. CheckInventory (Lambda)
3. ProcessPayment (Lambda)
4. Choice: Payment success?
   - Yes → ShipOrder (ECS)
   - No → NotifyFailure (SNS)
5. SendConfirmation (SNS)
6. Succeed
```

### Scenario 2: Human Approval Workflow
```
Question: Require manager approval before processing

Answer: Step Functions with Wait for Task Token

Flow:
1. Submit request
2. Send to SQS (with task token)
3. Worker sends approval email
4. Manager approves/rejects
5. Lambda calls SendTaskSuccess/Failure
6. Workflow continues
```

### Scenario 3: Parallel Processing
```
Question: Process multiple tasks simultaneously

Answer: Step Functions Parallel state

Example:
Parallel state:
├─ Branch 1: Send email
├─ Branch 2: Update database
└─ Branch 3: Generate report
All run simultaneously
Wait for all to complete
```

### Scenario 4: Replace Complex Lambda Chain
```
Question: Multiple Lambda functions calling each other

Answer: Replace with Step Functions

Why:
- Visual workflow
- Built-in error handling
- Retry logic
- Audit trail
- Easier to maintain
```

---

# AWS AppSync 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## What is AppSync?
```
- Managed GraphQL API service
- Real-time data synchronization
- Offline support (mobile)
- Multiple data sources
- Subscriptions (real-time)
```

## GraphQL Basics 
⭐⭐⭐⭐
```
What is GraphQL?
- Query language for APIs
- Get exactly what you need
- Single endpoint
- Strongly typed

vs REST:
REST: Multiple endpoints, fixed response
GraphQL: Single endpoint, flexible response

Example:
REST:
GET /users/123 → Returns ALL user fields
GET /users/123/orders → Separate request

GraphQL:
query {
  user(id: "123") {
    name
    email
    orders {
      id
      total
    }
  }
}
→ Returns ONLY requested fields in ONE request
```

## AppSync Features 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Data Sources 
⭐⭐⭐⭐⭐
```
Supported:
✅ DynamoDB
✅ Lambda
✅ RDS (Aurora Serverless)
✅ OpenSearch
✅ HTTP endpoints
✅ EventBridge

Multiple Sources:
- Single GraphQL query
- Fetch from multiple sources
- Combine results
```

### Real-Time Subscriptions 
⭐⭐⭐⭐⭐
```
What: Real-time data updates
How: WebSocket connections

Example:
Client subscribes to order updates
Order status changes in DynamoDB
AppSync pushes update to client immediately

Use Cases:
✅ Real-time chat
✅ Live dashboards
✅ Collaborative editing
✅ Live notifications
✅ Gaming
```

### Offline Support 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
What: Work offline, sync when online
How: Client-side caching + conflict resolution

Use Cases:
✅ Mobile apps
✅ Poor connectivity
✅ Field workers
✅ Offline-first apps

Conflict Resolution:
- Optimistic concurrency
- Last write wins
- Custom Lambda resolver
```

## AppSync Security 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)
```
Authorization Modes:
✅ API Key (simple, dev/test)
✅ IAM (AWS services)
✅ Cognito User Pools (end users)
✅ OpenID Connect (OIDC)
✅ Lambda (custom auth)

Multiple Auth Modes:
- Different modes per operation
- Mix and match
```

## AppSync vs API Gateway 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

| Feature | AppSync | API Gateway |
|---------|---------|-------------|
| **Protocol** | GraphQL | REST/HTTP/WebSocket |
| **Real-time** | Built-in (subscriptions) | WebSocket API |
| **Offline** | Built-in | No |
| **Data Sources** | Multiple (built-in) | Lambda/HTTP |
| **Use Case** | GraphQL, real-time, mobile | REST APIs |

**Key Exam Tip**:
```
"GraphQL" → AppSync
"Real-time sync" → AppSync
"Offline mobile" → AppSync
"REST API" → API Gateway
```

## AppSync Common Exam Scenarios 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Scenario 1: GraphQL API
```
Question: Build GraphQL API for mobile app

Answer: AWS AppSync

Why:
- Managed GraphQL
- Mobile-friendly
- Offline support
- Real-time subscriptions
```

### Scenario 2: Real-Time Dashboard
```
Question: Dashboard updates in real-time as data changes

Answer: AppSync with subscriptions

Why:
- Real-time subscriptions
- Push updates to clients
- WebSocket connections
- DynamoDB as data source
```

---

# Serverless Patterns and Architectures 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## Pattern 1: REST API (Most Common) 
⭐⭐⭐⭐⭐
```
Full Architecture:
Client
    ↓
Route 53 (DNS)
    ↓
CloudFront (CDN + caching)
    ↓
API Gateway (REST API)
    ↓ (Cognito auth)
Lambda (business logic)
    ↓
DynamoDB (data storage)

Additional Components:
- Cognito: User authentication
- CloudFront: Cache API responses
- WAF: Protect against attacks
- X-Ray: Distributed tracing
- CloudWatch: Monitoring

Benefits:
✅ No servers to manage
✅ Auto-scaling
✅ Pay per request
✅ High availability
✅ Global distribution
```

## Pattern 2: Event-Driven Processing 

⭐⭐⭐⭐⭐
```
Architecture:
S3 (file upload)
    ↓ (event notification)
SNS Topic
    ↓ (fan-out)
┌───────────┼───────────┐
↓           ↓           ↓
SQS Queue 1 SQS Queue 2 Lambda
    ↓           ↓       (direct processing)
Lambda      Lambda
(resize)    (metadata)

Use Cases:
✅ Image/video processing
✅ Document processing
✅ ETL pipelines
✅ Data transformation

Benefits:
✅ Decoupled components
✅ Independent scaling
✅ Fault tolerant
✅ Retry on failure
```

## Pattern 3: Async Processing with SQS 
⭐⭐⭐⭐⭐
```
Architecture:
Client Request
    ↓
API Gateway
    ↓ (sync response: 202 Accepted)
Lambda (producer)
    ↓
SQS Queue
    ↓ (event source mapping)
Lambda (consumer)
    ↓
DynamoDB / S3

Benefits:
✅ Fast response to client (202)
✅ Reliable processing
✅ Handle traffic spikes
✅ Retry on failure
✅ DLQ for failed messages

Use Cases:
✅ Order processing
✅ Email sending
✅ Report generation
✅ Any slow operation
```

## Pattern 4: Scheduled Tasks 
⭐⭐⭐⭐⭐
```
Architecture:
EventBridge (cron/rate)
    ↓
Lambda
    ↓
┌───────────┼───────────┐
↓           ↓           ↓
DynamoDB    S3          SNS
(cleanup)   (backup)    (report)

Common Scheduled Tasks:
✅ Daily database cleanup
✅ Weekly reports
✅ Hourly data sync
✅ Nightly backups
✅ Regular health checks

Examples:
rate(1 day) → Lambda → Delete old records
cron(0 9 ? * MON-FRI *) → Lambda → Send daily report
rate(5 minutes) → Lambda → Health check
```

## Pattern 5: Workflow Orchestration 
⭐⭐⭐⭐⭐
```
Architecture:
API Gateway
    ↓
Lambda (trigger)
    ↓
Step Functions
    ↓
┌───────────┼───────────┐
↓           ↓           ↓
Lambda 1    Lambda 2    Lambda 3
(validate)  (process)   (notify)
    ↓           ↓           ↓
DynamoDB    RDS         SNS

Benefits:
✅ Visual workflow
✅ Error handling
✅ Retry logic
✅ Audit trail
✅ Long-running support

Use Cases:
✅ Order processing
✅ Approval workflows
✅ Data pipelines
✅ Multi-step transactions
```

## Pattern 6: Real-Time Streaming 
⭐⭐⭐⭐⭐
```
Architecture:
Data Sources (IoT, apps, logs)
    ↓
Kinesis Data Streams
    ↓ (event source mapping)
Lambda (process records)
    ↓
┌───────────┼───────────┐
↓           ↓           ↓
DynamoDB    S3          OpenSearch
(real-time) (archive)   (analytics)

Benefits:
✅ Real-time processing
✅ Ordered processing (per shard)
✅ Replay capability
✅ Multiple consumers

Use Cases:
✅ IoT data processing
✅ Log analysis
✅ Real-time analytics
✅ Fraud detection
```

## Pattern 7: Microservices Communication 
⭐⭐⭐⭐⭐
```
Synchronous (direct):
Service A → API Gateway → Lambda (Service B)
Use: Real-time response needed

Asynchronous (via SQS):
Service A → SQS → Lambda (Service B)
Use: Decoupled, reliable

Event-driven (via EventBridge):
Service A → EventBridge → Lambda (Service B, C, D)
Use: Fan-out, loose coupling

Recommendation:
✅ Prefer async (SQS/EventBridge)
✅ Avoid direct Lambda-to-Lambda
✅ Use SQS for reliability
✅ Use EventBridge for routing
```

---

# Serverless Services Comparison 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
## Complete Comparison Matrix

| Service | Type | Direction | Persistence | Ordering | Use Case |
|---------|------|-----------|-------------|----------|----------|
| **Lambda** | Compute | N/A | No | N/A | Serverless code |
| **API Gateway** | API | Sync/Async | No | N/A | HTTP APIs |
| **SQS Standard** | Queue | Pull | Yes (14 days) | Best-effort | Decouple, buffer |
| **SQS FIFO** | Queue | Pull | Yes (14 days) | Guaranteed | Ordered, no duplicates |
| **SNS Standard** | Pub/Sub | Push | No | No | Fan-out, notify |
| **SNS FIFO** | Pub/Sub | Push | No | Yes | Ordered fan-out |
| **EventBridge** | Event Bus | Push | No | No | Event routing, schedule |
| **Step Functions** | Orchestration | N/A | Yes (history) | Yes | Workflows |
| **AppSync** | GraphQL API | Sync/Real-time | No | N/A | GraphQL, real-time |

---

# Critical Decision Points 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## When to Use What

### Lambda Decision
```
Need serverless compute?
├─ < 15 minutes → Lambda ✅
├─ > 15 minutes → ECS Fargate / AWS Batch
├─ Need consistent low latency → Provisioned Concurrency
├─ Variable traffic → Lambda (auto-scale)
└─ 24/7 high traffic → Consider EC2 (cost)
```

### API Gateway Decision
```
Need API?
├─ REST API, full features → REST API
├─ Simple, cheap, fast → HTTP API
├─ Real-time, bidirectional → WebSocket API
├─ GraphQL → AppSync
└─ Internal only → VPC Link + NLB
```

### Messaging Decision
```
Need messaging?
├─ Decouple + buffer → SQS
│  ├─ Order matters, no duplicates → FIFO
│  └─ High throughput → Standard
├─ Fan-out (one to many) → SNS
├─ Fan-out + reliable → SNS + SQS
├─ Event routing + scheduling → EventBridge
├─ SaaS integration → EventBridge
└─ Workflow orchestration → Step Functions
```

### Real-Time Decision
```
Need real-time?
├─ WebSocket API → API Gateway WebSocket
├─ GraphQL subscriptions → AppSync
├─ Stream processing → Kinesis + Lambda
└─ Push notifications → SNS (mobile push)
```

---

# Common Exam Traps - Serverless 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

### Trap 1: Lambda Timeout
```
❌ Wrong: Use Lambda for 20-minute video processing
✅ Right: Use ECS Fargate or AWS Batch

Why: Lambda max timeout = 15 minutes
```

### Trap 2: Lambda in VPC Internet Access
```
❌ Wrong: Lambda in VPC can access Internet by default
✅ Right: Lambda in VPC needs NAT Gateway for Internet

Why: VPC Lambda loses Internet access
```

### Trap 3: SQS Visibility Timeout
```
❌ Wrong: Visibility timeout shorter than Lambda timeout
✅ Right: Visibility timeout > Lambda timeout

Why: If Lambda takes longer than visibility timeout,
message reappears → duplicate processing
```

### Trap 4: SNS Persistence
```
❌ Wrong: SNS stores messages for retry
✅ Right: SNS is fire-and-forget (no persistence)

Why: Use SNS + SQS for reliable fan-out
```

### Trap 5: SQS Standard Duplicates
```
❌ Wrong: SQS Standard guarantees no duplicates
✅ Right: SQS Standard may deliver duplicates

Why: At-least-once delivery
Use FIFO for exactly-once
```

### Trap 6: API Gateway Caching
```
❌ Wrong: HTTP API supports caching
✅ Right: Only REST API supports caching

Why: HTTP API is simplified version
```

### Trap 7: Step Functions Duration
```
❌ Wrong: Express Workflows for 2-hour process
✅ Right: Standard Workflows for > 5 minutes

Why: Express max = 5 minutes
Standard max = 1 year
```

### Trap 8: Lambda Cold Starts
```
❌ Wrong: Reserved Concurrency eliminates cold starts
✅ Right: Provisioned Concurrency eliminates cold starts

Why:
Reserved = limits max concurrency (doesn't pre-warm)
Provisioned = pre-warms environments (eliminates cold starts)
```

### Trap 9: EventBridge vs CloudWatch Events
```
Not a trap, but know:
EventBridge = CloudWatch Events (same service, rebranded)
EventBridge has more features (SaaS, schema registry, etc.)
```

### Trap 10: Direct Lambda-to-Lambda
```
❌ Wrong: Lambda A directly invokes Lambda B (tight coupling)
✅ Right: Lambda A → SQS → Lambda B (loose coupling)

Why:
Direct: Tight coupling, no retry, cascading failures
SQS: Decoupled, retry, fault tolerant
```

---

# Serverless Exam Scenarios 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## Scenario Matrix

| Question | Answer | Key Reason |
|----------|--------|------------|
| "Serverless REST API" | API Gateway + Lambda + DynamoDB | Fully serverless |
| "Real-time chat" | API Gateway WebSocket + Lambda + DynamoDB | WebSocket |
| "GraphQL API" | AppSync | GraphQL |
| "Process S3 uploads" | S3 → Lambda (async) | Event-driven |
| "Decouple services" | SQS | Queue |
| "Fan-out to multiple services" | SNS → SQS (multiple) | Fan-out |
| "Schedule daily task" | EventBridge (cron) → Lambda | Scheduling |
| "React to EC2 events" | EventBridge → Lambda | Event routing |
| "Order processing workflow" | Step Functions | Orchestration |
| "Human approval" | Step Functions (task token) | Wait for callback |
| "Handle traffic spikes" | SQS buffer | Absorb spikes |
| "No duplicate processing" | SQS FIFO | Exactly-once |
| "Ordered processing" | SQS FIFO | FIFO ordering |
| "Eliminate cold starts" | Provisioned Concurrency | Pre-warm |
| "Lambda > 15 min" | ECS Fargate / Batch | Timeout limit |
| "Rate limit per customer" | API Gateway usage plans | Per-key throttling |
| "Custom authentication" | Lambda Authorizer | Custom auth |
| "User authentication" | Cognito + API Gateway | User pools |
| "SaaS events in AWS" | EventBridge partner bus | SaaS integration |
| "Replay past events" | EventBridge archive/replay | Event replay |
| "Parallel Lambda execution" | Step Functions Parallel | Parallel state |
| "Iterate over array" | Step Functions Map | Map state |
| "Long-running workflow" | Step Functions Standard | Up to 1 year |
| "High-volume short workflow" | Step Functions Express | High volume |
| "Mobile offline sync" | AppSync | Offline support |
| "Failed message handling" | SQS DLQ | Dead letter queue |
| "Reduce SQS costs" | Long polling | Fewer API calls |
| "Large SQS messages" | S3 + SQS reference | 256 KB limit |

---

# Serverless Best Practices 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## Lambda Best Practices
```
Code:
✅ Single responsibility (one function, one task)
✅ Initialize outside handler (DB connections, SDK clients)
✅ Use environment variables (not hardcoded config)
✅ Use Secrets Manager for sensitive data
✅ Minimize package size (faster cold starts)
✅ Use layers for shared code

Performance:
✅ Right-size memory (use Power Tuning tool)
✅ Provisioned Concurrency (latency-sensitive)
✅ Optimize initialization code
✅ Use /tmp for caching (up to 10 GB)
✅ Reuse connections (outside handler)

Security:
✅ Least privilege execution role
✅ One role per function
✅ Use VPC for private resources
✅ Encrypt environment variables
✅ Enable X-Ray tracing

Cost:
✅ Right-size memory
✅ Minimize duration
✅ Use Graviton2 (arm64) - 20% cheaper
✅ Use Spot for batch workloads
✅ Monitor with Cost Explorer
```

## API Gateway Best Practices
```
Performance:
✅ Enable caching (REST API)
✅ Use HTTP API (simpler, cheaper)
✅ Use CloudFront in front (global)
✅ Enable compression

Security:
✅ Use HTTPS only
✅ Enable WAF (REST API)
✅ Use Cognito or Lambda Authorizer
✅ Enable access logging
✅ Use resource policies

Cost:
✅ Use HTTP API (70% cheaper)
✅ Enable caching (reduce Lambda calls)
✅ Use usage plans (control costs)
✅ Monitor with CloudWatch
```

## SQS Best Practices
```
Configuration:
✅ Enable long polling (reduce costs)
✅ Set appropriate visibility timeout
✅ Configure DLQ (handle failures)
✅ Use batch operations (reduce API calls)
✅ Set appropriate retention period

Processing:
✅ Idempotent consumers (handle duplicates)
✅ Delete after successful processing
✅ Monitor queue depth (CloudWatch)
✅ Alert on DLQ messages
✅ Redrive from DLQ after fixing bugs

Security:
✅ Encrypt with KMS
✅ Use IAM policies (least privilege)
✅ Use VPC endpoints (private access)
```

## SNS Best Practices
```
✅ Use message filtering (reduce processing)
✅ Use SNS + SQS for reliability
✅ Configure DLQ for failed deliveries
✅ Use FIFO for ordered delivery
✅ Monitor with CloudWatch
✅ Encrypt with KMS
```

## Step Functions Best Practices
```
✅ Use Standard for long-running (audit trail)
✅ Use Express for high-volume (cost)
✅ Implement retry with backoff
✅ Use Catch for error handling
✅ Keep state machines simple
✅ Use task tokens for human approval
✅ Monitor with CloudWatch
✅ Use X-Ray for tracing
```

---

# Serverless Pricing Summary 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## Cost Overview

| Service | Free Tier | Pricing |
|---------|-----------|---------|
| **Lambda** | 1M requests, 400K GB-sec | $0.20/1M requests + $0.0000166667/GB-sec |
| **API Gateway REST** | 1M calls/month | $3.50/1M calls |
| **API Gateway HTTP** | 1M calls/month | $1.00/1M calls |
| **API Gateway WebSocket** | 1M messages | $1.00/1M messages |
| **SQS Standard** | 1M requests | $0.40/1M requests |
| **SQS FIFO** | None | $0.50/1M requests |
| **SNS** | 1M publishes | $0.50/1M publishes |
| **EventBridge** | None | $1.00/1M events |
| **Step Functions Standard** | None | $0.025/1K state transitions |
| **Step Functions Express** | None | $1.00/1M executions + duration |
| **AppSync** | 250K queries | $4.00/1M queries |

## Cost Optimization Tips
[BackToTop](#table-of-contents)
```
✅ Lambda: Use Graviton2 (arm64) - 20% cheaper
✅ Lambda: Right-size memory
✅ API Gateway: Use HTTP API (70% cheaper than REST)
✅ API Gateway: Enable caching (reduce Lambda calls)
✅ SQS: Use long polling (reduce API calls)
✅ SQS: Use batch operations
✅ Step Functions: Use Express for high-volume
✅ EventBridge: Filter events (reduce targets)
```

---

# Final Serverless Summary 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## Must Know for SAA-C03

### Priority 1 (Most Tested)
```
Lambda:
✅ Max timeout: 15 minutes
✅ Invocation types (sync, async, event source mapping)
✅ Concurrency (reserved vs provisioned)
✅ Cold starts and solutions
✅ VPC configuration (NAT for Internet)
✅ Execution role vs resource policy
✅ Versions and aliases
✅ Event source mapping (SQS, Kinesis, DynamoDB)

API Gateway:
✅ REST vs HTTP vs WebSocket
✅ Lambda proxy integration
✅ Caching (REST only)
✅ Authorization (IAM, Lambda, Cognito)
✅ Usage plans and API keys
✅ Throttling

SQS:
✅ Standard vs FIFO
✅ Visibility timeout
✅ DLQ
✅ Long polling
✅ Lambda integration
✅ Fan-out with SNS

SNS:
✅ Pub/Sub, push-based
✅ Fan-out pattern
✅ Message filtering
✅ SNS + SQS pattern
```

### Priority 2 (Important)
```
EventBridge:
✅ Event buses (default, custom, partner)
✅ Rules (event pattern, schedule)
✅ Cron/rate expressions
✅ Cross-account events
✅ SaaS integration

Step Functions:
✅ Standard vs Express
✅ State types (Task, Choice, Wait, Parallel, Map)
✅ Error handling (Retry, Catch)
✅ Wait for task token (human approval)
✅ Service integrations
```

### Priority 3 (Good to Know)
```
AppSync:
✅ GraphQL API
✅ Real-time subscriptions
✅ Offline support
✅ Multiple data sources
✅ vs API Gateway
```

---

## Quick Reference Card 
⭐⭐⭐⭐⭐

```
SERVERLESS COMPUTE
Lambda: < 15 min, event-driven, auto-scale
Fargate: Containers, serverless, any duration

API TYPES
REST API: Full features, caching, WAF
HTTP API: Simple, cheap (70% less), fast
WebSocket: Real-time, bidirectional
AppSync: GraphQL, real-time, offline

MESSAGING
SQS Standard: Decouple, buffer, at-least-once
SQS FIFO: Ordered, exactly-once, 300 TPS
SNS: Fan-out, push, fire-and-forget
EventBridge: Event routing, scheduling, SaaS

WORKFLOW
Step Functions Standard: Long-running, audit, 1 year
Step Functions Express: High-volume, 5 minutes

KEY NUMBERS
Lambda timeout: 15 minutes (MAX)
Lambda memory: 128 MB - 10 GB
Lambda concurrency: 1,000 (default)
SQS retention: 1 min - 14 days (default 4 days)
SQS visibility: 0 sec - 12 hours (default 30 sec)
SQS message size: 256 KB
Step Functions Standard: 1 year max
Step Functions Express: 5 minutes max
API Gateway throttle: 10,000 req/sec (default)
```

---



**Most Tested Services**:
1. **Lambda** - CRITICAL (most tested)
2. **API Gateway** - CRITICAL
3. **SQS** - CRITICAL
4. **SNS** - CRITICAL
5. **EventBridge** - IMPORTANT
6. **Step Functions** - IMPORTANT
7. **AppSync** - GOOD TO KNOW

**Key Takeaways**:
- Lambda = serverless compute (max 15 min)
- API Gateway = managed APIs (REST/HTTP/WebSocket)
- SQS = decouple + buffer (pull-based)
- SNS = fan-out + notify (push-based)
- EventBridge = event routing + scheduling
- Step Functions = workflow orchestration
- AppSync = GraphQL + real-time

---
**You've completed the Serverless section!** 🚀⚡


[BackToTop](#table-of-contents)
