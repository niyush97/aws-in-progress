# Application Integration & Front-End Web and Mobile

---

>⚠️ These notes were created using Anthropic's AI Models (Opus 4.5 and 4.6).

---

## SAA-C03 Exam Guide - Remaining Services

### Application Integration 
```
Services Covered:
✅ Amazon SQS (Simple Queue Service)　(Covered in Serverless ✓)
✅ Amazon SNS (Simple Notification Service) (Covered in Serverless ✓)
✅ Amazon EventBridge (event routing)　(Covered in Serverless ✓)
✅ AWS Step Functions (state machines)　(Covered in Serverless ✓)
✅ AWS AppSync (GraphQL)　(Covered in Serverless ✓)
✅ Amazon Kinesis (real-time streaming) - Covered in Analytics ✓
```
⚠️ [Amazon MQ (managed message broker)](#amazon-mq)
   - [What is Amazon MQ](#what-is-amazon-mq)
   - [Why Amazon MQ](#why-amazon-mq)
   - [Supported Protocols](#supported-protocols)
   - [Amazon MQ Architecture](#amazon-mq-architecture)
      - [Single-Instance Broker](#single-instance-broker)
      - [Active Standby (High Availability)](#active-standby-high-availability)
   - [Amazon MQ vs SQS/SNS](#amazon-mq-vs-sqssns)
   - [When to Use Amazon MQ](#when-to-use-amazon-mq)
   - [Use Amazon MQ When](#use-amazon-mq-when)
   - [Dont Use Amazon MQ When](#dont-use-amazon-mq-when)
   - [Keywords to Identify Amazon MQ](#keywords-to-identify-amazon-mq)
   - [Common Exam Scenarios For Amazon MQ](#common-exam-scenarios-for-amazon-mq)
   - [Amazon MQ Pricing](#amazon-mq-pricing)
   - [Amazon MQ Best Practices](#amazon-mq-best-practices)

---

### Front-End Web and Mobile 
⭐⭐⭐ (GOOD TO KNOW)

```
Services Covered:
✅ Amazon API Gateway (Covered in Serverless ✓)
✅ AWS AppSync (Covered in Serverless ✓)
✅ Amazon Cognito (already covered in Security ✓)
```

1. ⚠️  [AWS Amplify (full-stack web/mobile apps)](#aws-amplify)
   - [What is AWS Amplify](#what-is-aws-amplify)
   - [Amplify Components](#amplify-components)
      1. [ Amplify Studio (Visual Builder)](#1-amplify-studio-(visual-builder))
      2.  [Amplify Libraries (Client SDK)](#2-amplify-libraries-(client-sdk))
      3.  [Amplify CLI](#3-amplify-cli)
      4.  [Amplify Hosting](#4-amplify-hosting)
      5.  [Amplify Backend](#5-amplify-backend)
   - [Amplify Use Cases](#amplify-use-cases)
   - [Amplify vs Manual AWS Setup](#amplify-vs-manual-aws-setup)
   - [When to Use Amplify](#when-to-use-amplify)
   - [Use Amplify When](#use-amplify-when)
   - [Dont Use Amplify When](#dont-use-amplify-when)
   - [Keywords to Identify Amplify](#keywords-to-identify-amplify)
   - [Common Exam Scenarios for Amplify](#common-exam-scenarios-for-amplify)
   - [Amplify Pricing](#amplify-pricing)

2.  [AWS Device Farm](#aws-device-farm)
      - [What is Device Farm](#what-is-device-farm)
      - [Key Features of Device Farm](#key-features-of-device-farm)
      - [Device Farm Use Cases](#device-farm-use-cases)
      - [Device Farm Modes](#device-farm-modes)
         - [Automated Testing](#automated-testing)
         - [Remote Access (Manual Testing)](#remote-access-manual-testing)
      - [When to Use Device Farm](#when-to-use-device-farm)
         - [Use Device Farm When](#use-device-farm-when)
         - [Dont Use Device Farm When](#dont-use-device-farm-when)
      - [Keywords to Identify Device Farm](#keywords-to-identify-device-farm)
      - [Common Exam Scenarios For Device Farm](#common-exam-scenarios-for-device-farm)
      - [Device Farm Pricing](#device-farm-pricing)
---

1. [Complete Summary Application Integration & Front-End](#complete-summary-application-integration--front-end)
   - [Application Integration Quick Reference](#application-integration-quick-reference)
   - [Front-End Quick Reference](#front-end-quick-reference)
2.  [Critical Exam Scenarios](#critical-exam-scenarios)
      - [Amazon MQ Scenarios](#amazon-mq-scenarios)
      - [Amplify Scenarios](#amplify-scenarios)
      - [Device Farm Scenarios](#device-farm-scenarios)
3.  [Key Distinctions to Remember](#key-distinctions-to-remember)
      - [Amazon MQ vs SQS/SNS](#amazon-mq-vs-sqssns-1)
      - [Amplify vs Manual AWS](#amplify-vs-manual-aws)
      - [Amplify Hosting vs S3 Static Website](#amplify-hosting-vs-s3-static-website)



---

# Amazon MQ 
⭐⭐⭐⭐ (APPLICATION INTEGRATION)

## What is Amazon MQ?
```
- Managed message broker service
- Supports Apache ActiveMQ and RabbitMQ
- For migrating existing message brokers to AWS
- Industry-standard protocols
- NOT a cloud-native service (unlike SQS/SNS)
```

## Why Amazon MQ? 
⭐⭐⭐⭐⭐
[BackToTop](#application-integration)
```
The Key Question: SQS/SNS vs Amazon MQ?

Use SQS/SNS when:
✅ Building NEW applications on AWS
✅ Cloud-native messaging
✅ Unlimited scaling needed
✅ Simple setup

Use Amazon MQ when:
✅ MIGRATING existing on-premises applications
✅ Application uses standard protocols (MQTT, AMQP, STOMP, OpenWire, WSS)
✅ Cannot re-engineer to use SQS/SNS
✅ Need ActiveMQ or RabbitMQ compatibility

Key Exam Tip:
"Migrate on-premises message broker" → Amazon MQ
"New application, cloud-native" → SQS/SNS
```

## Supported Protocols 
⭐⭐⭐⭐⭐
[BackToTop](#application-integration)

```
✅ MQTT (IoT messaging)
✅ AMQP (Advanced Message Queuing Protocol)
✅ STOMP (Simple Text Oriented Messaging Protocol)
✅ OpenWire (ActiveMQ native)
✅ WSS (WebSocket Secure)

Why This Matters:
- Existing apps use these protocols
- Cannot easily switch to SQS/SNS APIs
- Amazon MQ = drop-in replacement
- No application code changes needed
```

## Amazon MQ Architecture 
⭐⭐⭐⭐⭐
[BackToTop](#application-integration)

### Single-Instance Broker
```
Architecture:
Application → Amazon MQ Broker → Application

Storage:
- EFS (for ActiveMQ)
- EBS (for RabbitMQ)

Use Cases:
✅ Development/testing
✅ Non-critical workloads
✅ Cost-sensitive

Limitation:
❌ Single point of failure
❌ Not highly available
```

### Active Standby (High Availability) 
⭐⭐⭐⭐⭐
[BackToTop](#application-integration)
```
Architecture:
                    ┌─ Active Broker (AZ-A)
Application ───────┤  (shared storage: EFS)
                    └─ Standby Broker (AZ-B)

How It Works:
- Active broker handles all traffic
- Standby broker ready to take over
- Shared storage (EFS) between both
- Automatic failover (60 seconds)
- Same endpoint (DNS failover)

Use Cases:
✅ Production workloads
✅ High availability required
✅ Minimal downtime

Key Points:
✅ Multi-AZ deployment
✅ Automatic failover
✅ Shared EFS storage
✅ Same connection URL
```

### Amazon MQ vs SQS/SNS 
⭐⭐⭐⭐⭐
[BackToTop](#application-integration)

| Feature | Amazon MQ | SQS/SNS |
|---------|-----------|---------|
| **Type** | Managed broker | Cloud-native |
| **Protocols** | MQTT, AMQP, STOMP, etc. | AWS SDK/API only |
| **Scaling** | Limited (instance-based) | Unlimited |
| **Use Case** | Migration, existing apps | New cloud apps |
| **Setup** | More complex | Simple |
| **Cost** | Instance-based | Pay per use |
| **HA** | Active/Standby | Built-in (automatic) |

## When to Use Amazon MQ 
⭐⭐⭐⭐⭐
[BackToTop](#application-integration)

###  Use Amazon MQ When
- Migrating on-premises ActiveMQ/RabbitMQ
- Application uses MQTT, AMQP, STOMP
- Cannot change application code
- Need drop-in replacement
- Existing message broker expertise

###  Don't Use Amazon MQ When
- Building new application → SQS/SNS
- Need unlimited scaling → SQS/SNS
- Simple pub/sub → SNS
- Simple queue → SQS

## Keywords to Identify Amazon MQ
[BackToTop](#application-integration)

```
"ActiveMQ"
"RabbitMQ"
"MQTT"
"AMQP"
"STOMP"
"Migrate message broker"
"Existing message broker"
"Industry-standard protocols"
"On-premises broker to AWS"
```

## Common Exam Scenarios For Amazon MQ
⭐⭐⭐⭐⭐
[BackToTop](#application-integration)

### Scenario 1: Migrate ActiveMQ
```
Question: Migrate on-premises ActiveMQ to AWS with minimal code changes

Answer: Use Amazon MQ (ActiveMQ)

Why:
- Drop-in replacement for ActiveMQ
- Same protocols (OpenWire, STOMP, etc.)
- No application code changes
- Managed service
```

### Scenario 2: MQTT IoT Migration
```
Question: Existing IoT application uses MQTT, migrate to AWS

Answer: Use Amazon MQ (MQTT support)

Why:
- MQTT protocol support
- Existing devices unchanged
- Managed broker
- High availability option

Note: For new IoT → Consider AWS IoT Core
```

### Scenario 3: High Availability Broker
```
Question: Message broker needs high availability, automatic failover

Answer: Amazon MQ Active/Standby deployment

Why:
- Multi-AZ deployment
- Automatic failover
- Shared EFS storage
- Same endpoint after failover
```

### Scenario 4: New vs Migrate Decision
```
Question: Building new microservices on AWS, need messaging

Answer: Use SQS/SNS (NOT Amazon MQ)

Why:
- New application = cloud-native
- SQS/SNS: Unlimited scaling
- SQS/SNS: Simpler, cheaper
- Amazon MQ: Only for migration
```

## Amazon MQ Pricing
[BackToTop](#application-integration)

```
Instance Hours:
- mq.m5.large: ~$0.30/hour (~$216/month)
- mq.m5.xlarge: ~$0.60/hour (~$432/month)

Storage:
- EFS: $0.30/GB/month (ActiveMQ)
- EBS: $0.10/GB/month (RabbitMQ)

Data Transfer:
- Standard AWS rates

Example (mq.m5.large, Active/Standby):
2 instances × $0.30 × 24 × 30 = $432/month
+ Storage costs

Note: More expensive than SQS/SNS for equivalent workloads
```

## Amazon MQ Best Practices 
⭐⭐⭐⭐
[BackToTop](#application-integration)

```
High Availability:
✅ Use Active/Standby (production)
✅ Deploy in multiple AZs
✅ Monitor with CloudWatch
✅ Test failover scenarios

Security:
✅ Deploy in private subnets (VPC)
✅ Use security groups
✅ Enable encryption (TLS in transit)
✅ Enable encryption at rest (KMS)
✅ Use IAM for access control

Performance:
✅ Right-size broker instance
✅ Monitor queue depth
✅ Monitor memory usage
✅ Use appropriate storage type
```

---

# Front-End Web and Mobile - Remaining Services

---

# AWS Amplify 
⭐⭐⭐⭐
[BackToTop](#front-end-web-and-mobile)

## What is AWS Amplify?
```
- Full-stack development platform
- Build and deploy web and mobile apps
- Frontend + Backend
- CI/CD built-in
- Like Netlify/Vercel but with AWS backend
```

## Amplify Components 
⭐⭐⭐⭐⭐
[BackToTop](#front-end-web-and-mobile)

### 1. Amplify Studio (Visual Builder)
```
What: Visual development environment
Features:
✅ Visual UI builder
✅ Component library
✅ Data modeling
✅ Authentication setup
✅ Generate React code

Use Cases:
✅ Rapid prototyping
✅ Non-developers building UIs
✅ Accelerate development
```

### 2. Amplify Libraries (Client SDK)
```
What: Client-side libraries
Platforms:
✅ JavaScript (React, Vue, Angular)
✅ React Native
✅ iOS (Swift)
✅ Android (Kotlin/Java)
✅ Flutter

Features:
✅ Authentication (Cognito)
✅ API calls (REST + GraphQL)
✅ Storage (S3)
✅ Analytics
✅ Push notifications
✅ Offline sync
```

### 3. Amplify CLI
```
What: Command-line toolchain
Features:
✅ Configure backend
✅ Add features (auth, API, storage)
✅ Deploy to AWS
✅ Manage environments

Commands:
amplify init          # Initialize project
amplify add auth      # Add Cognito auth
amplify add api       # Add API Gateway/AppSync
amplify add storage   # Add S3
amplify push          # Deploy to AWS
amplify publish       # Deploy frontend + backend
```

### 4. Amplify Hosting 
⭐⭐⭐⭐⭐
```
What: Web hosting for frontend apps
Features:
✅ CI/CD (auto-deploy from Git)
✅ Global CDN (CloudFront)
✅ Custom domains
✅ HTTPS (automatic)
✅ Branch deployments (dev, staging, prod)
✅ Pull request previews
✅ Password protection
✅ Redirects and rewrites

Supported Frameworks:
✅ React
✅ Vue
✅ Angular
✅ Next.js (SSR support)
✅ Gatsby
✅ Hugo
✅ Any static site

Git Integration:
✅ GitHub
✅ GitLab
✅ Bitbucket
✅ AWS CodeCommit

Workflow:
1. Connect Git repository
2. Configure build settings
3. Push code → Auto-deploy
4. Available at amplifyapp.com domain
5. Add custom domain (optional)
```

### 5. Amplify Backend 
⭐⭐⭐⭐⭐
```
What: Managed backend services
Powered by:
✅ Authentication → Cognito
✅ REST API → API Gateway + Lambda
✅ GraphQL API → AppSync
✅ Storage → S3
✅ Database → DynamoDB
✅ Functions → Lambda
✅ Analytics → Pinpoint
✅ Push Notifications → Pinpoint
✅ Predictions → AI/ML services

Benefits:
✅ No backend expertise needed
✅ Automatic provisioning
✅ CloudFormation under the hood
✅ Environment management (dev/prod)
```

## Amplify Use Cases 
⭐⭐⭐⭐⭐
[BackToTop](#front-end-web-and-mobile)

```
✅ React/Vue/Angular web apps
✅ React Native mobile apps
✅ iOS/Android apps
✅ Full-stack serverless apps
✅ Static websites
✅ JAMstack applications
✅ Rapid prototyping
✅ Startup MVPs

Example Full-Stack App:
Frontend: React (Amplify Hosting)
Auth: Cognito (Amplify Auth)
API: AppSync GraphQL (Amplify API)
Database: DynamoDB (Amplify DataStore)
Storage: S3 (Amplify Storage)
Functions: Lambda (Amplify Functions)
```

## Amplify vs Manual AWS Setup 
⭐⭐⭐⭐⭐
[BackToTop](#front-end-web-and-mobile)

| Feature | Amplify | Manual AWS |
|---------|---------|------------|
| **Setup Time** | Minutes | Hours/Days |
| **Expertise** | Low | High |
| **CI/CD** | Built-in | Manual setup |
| **Control** | Limited | Full |
| **Cost** | Slightly higher | Optimized |
| **Use Case** | Rapid development | Complex, custom |

**Key Exam Tip**:
```
"Build and deploy web/mobile app quickly" → Amplify
"Full control over infrastructure" → Manual AWS setup
"Frontend hosting with CI/CD" → Amplify Hosting
"Mobile app with auth and API" → Amplify
```

## When to Use Amplify 
⭐⭐⭐⭐⭐
[BackToTop](#front-end-web-and-mobile)

### Use Amplify When
- Rapid web/mobile development
- Frontend developers (limited AWS expertise)
- Need CI/CD for frontend
- Full-stack serverless app
- Startup/MVP
- React/Vue/Angular/React Native

### Don't Use Amplify When
- Need full infrastructure control → Manual AWS
- Complex backend requirements → Direct AWS services
- Non-standard architecture → CloudFormation/CDK
- Enterprise with existing CI/CD → CodePipeline

## Keywords to Identify Amplify
[BackToTop](#front-end-web-and-mobile)

```
"Web/mobile app development"
"Frontend hosting"
"CI/CD for frontend"
"Full-stack serverless"
"React/Vue/Angular deployment"
"Mobile app backend"
"Rapid development"
"Git-based deployment"
```

## Common Exam Scenarios for Amplify
⭐⭐⭐⭐⭐
[BackToTop](#front-end-web-and-mobile)

### Scenario 1: Deploy React App
```
Question: Deploy React app with automatic deployments from GitHub

Answer: AWS Amplify Hosting

Why:
- Git integration (GitHub)
- Auto-deploy on push
- Global CDN (CloudFront)
- HTTPS automatic
- Custom domain support
```

### Scenario 2: Full-Stack Mobile App
```
Question: Build mobile app with authentication, API, and storage

Answer: AWS Amplify

Why:
- Amplify Libraries for mobile
- Auth → Cognito
- API → AppSync/API Gateway
- Storage → S3
- All configured with Amplify CLI
```

### Scenario 3: Branch Deployments
```
Question: Need separate environments for dev, staging, prod

Answer: Amplify Hosting with branch deployments

Why:
- Each Git branch = separate environment
- Automatic deployments per branch
- PR previews
- Environment variables per branch
```

## Amplify Pricing
[BackToTop](#front-end-web-and-mobile)

```
Amplify Hosting:
- Build: $0.01 per build minute
- Hosting: $0.023 per GB served
- Storage: $0.023 per GB stored

Free Tier:
- 1,000 build minutes/month
- 15 GB served/month
- 5 GB storage/month

Backend Services:
- Charged at individual service rates
- (Cognito, AppSync, Lambda, etc.)

Example (Small App):
Build: 100 min × $0.01 = $1
Hosting: 10 GB × $0.023 = $0.23
Total: ~$1.23/month (very affordable)
```

---

# AWS Device Farm 
⭐⭐⭐
[BackToTop](#front-end-web-and-mobile)

## What is Device Farm?
```
- Mobile and web app testing service
- Real physical devices (not emulators)
- iOS and Android devices
- Web browsers (desktop)
- Automated and manual testing
```

## Key Features of Device Farm
⭐⭐⭐
```
Real Devices:
✅ Hundreds of real devices
✅ iOS (iPhone, iPad)
✅ Android (various manufacturers)
✅ Fire OS (Amazon)
✅ Desktop browsers

Testing Types:
✅ Automated testing (scripts)
✅ Manual testing (remote access)
✅ Exploratory testing

Test Frameworks:
✅ Appium (iOS + Android)
✅ XCTest (iOS)
✅ Espresso (Android)
✅ Calabash
✅ Built-in fuzz testing

Results:
✅ Screenshots
✅ Videos
✅ Logs
✅ Performance metrics
✅ Crash reports
```

## Device Farm Use Cases 
⭐⭐⭐
[BackToTop](#front-end-web-and-mobile)

```
✅ Test app on multiple devices simultaneously
✅ Regression testing before release
✅ Performance testing
✅ Compatibility testing (different OS versions)
✅ Manual testing on specific devices
✅ CI/CD integration (automated testing)
```

## Device Farm Modes 
⭐⭐⭐
[BackToTop](#front-end-web-and-mobile)

### Automated Testing
```
What: Run test scripts on multiple devices
Process:
1. Upload app (APK/IPA)
2. Upload test scripts
3. Select devices
4. Run tests
5. View results (screenshots, logs, videos)

Benefits:
✅ Test on many devices at once
✅ Consistent results
✅ CI/CD integration
✅ Detailed reports
```

### Remote Access (Manual Testing)
```
What: Interact with real device remotely
Process:
1. Select device
2. Connect via browser
3. Interact with device
4. View screen in real-time

Benefits:
✅ Test specific scenarios
✅ Debug issues
✅ Exploratory testing
✅ No physical device needed
```

## When to Use Device Farm 
⭐⭐⭐
[BackToTop](#front-end-web-and-mobile)

### Use Device Farm When
- Test mobile app on real devices
- Need to test on many devices simultaneously
- Automated mobile testing
- Manual testing without physical devices
- CI/CD pipeline for mobile apps

### Don't Use Device Farm When
- Web app testing only → Use other tools
- Don't need real devices → Use emulators
- Simple unit testing → Use local tools

## Keywords to Identify Device Farm
[BackToTop](#front-end-web-and-mobile)

```
"Test on real devices"
"Mobile app testing"
"iOS and Android testing"
"Multiple devices simultaneously"
"Remote device access"
"Mobile test automation"
```

## Common Exam Scenarios For Device Farm
⭐⭐⭐
[BackToTop](#front-end-web-and-mobile)

### Scenario 1: Test on Multiple Devices
```
Question: Test mobile app on 50 different Android devices

Answer: AWS Device Farm

Why:
- Real physical devices
- Test simultaneously
- Automated testing
- Detailed results
```

### Scenario 2: CI/CD Mobile Testing
```
Question: Automatically test mobile app on every code push

Answer: AWS Device Farm integrated with CI/CD

Why:
- Automated testing
- Real devices
- CI/CD integration
- Catch issues early
```

## Device Farm Pricing
[BackToTop](#front-end-web-and-mobile)

```
Pricing Models:

1. Pay-per-use:
   - $0.17 per device minute
   - Example: 10 devices × 10 min = $17

2. Unmetered Plan:
   - $250/month per device slot
   - Unlimited testing on that device
   - Good for heavy testing

Free Trial:
- 1,000 device minutes free
```

---

# Complete Summary: Application Integration & Front-End
[BackToTop](#front-end-web-and-mobile)
## Application Integration Quick Reference 
⭐⭐⭐⭐⭐

| Service | Type | Use Case | Key Feature |
|---------|------|----------|-------------|
| **SQS** | Queue | Decouple, buffer | Pull-based, persistence |
| **SNS** | Pub/Sub | Fan-out, notify | Push-based, multiple subscribers |
| **EventBridge** | Event Bus | Event routing, schedule | Content-based routing, SaaS |
| **Step Functions** | Orchestration | Workflows | Visual, error handling |
| **Amazon MQ** | Message Broker | Migrate ActiveMQ/RabbitMQ | Standard protocols |
| **AppSync** | GraphQL API | Real-time, offline | GraphQL, subscriptions |
| **Kinesis** | Streaming | Real-time data | Ordered, replay |

## Front-End Quick Reference 
⭐⭐⭐⭐

| Service | Use Case | Key Feature |
|---------|----------|-------------|
| **Amplify** | Full-stack web/mobile | CI/CD, hosting, backend |
| **API Gateway** | REST/HTTP/WebSocket APIs | Managed APIs |
| **AppSync** | GraphQL API | Real-time, offline |
| **Cognito** | Authentication | User pools, identity pools |
| **Device Farm** | Mobile testing | Real devices |

---

## Critical Exam Scenarios 
⭐⭐⭐⭐⭐
[BackToTop](#front-end-web-and-mobile)

### Amazon MQ Scenarios
```
"Migrate ActiveMQ to AWS" → Amazon MQ
"MQTT protocol needed" → Amazon MQ
"AMQP protocol needed" → Amazon MQ
"New messaging service" → SQS/SNS (NOT Amazon MQ)
"High availability broker" → Amazon MQ Active/Standby
```

### Amplify Scenarios
```
"Deploy React app from GitHub" → Amplify Hosting
"Full-stack mobile app" → Amplify
"Frontend CI/CD" → Amplify Hosting
"Branch deployments" → Amplify Hosting
"Mobile app with auth + API" → Amplify
```

### Device Farm Scenarios
```
"Test on real mobile devices" → Device Farm
"Test on 100 devices simultaneously" → Device Farm
"Remote access to physical device" → Device Farm
"Mobile CI/CD testing" → Device Farm
```

---

## Key Distinctions to Remember 
⭐⭐⭐⭐⭐

### Amazon MQ vs SQS/SNS
[BackToTop](#front-end-web-and-mobile)
```
Amazon MQ:
✅ Migration from on-premises
✅ Standard protocols (MQTT, AMQP, STOMP)
✅ ActiveMQ/RabbitMQ compatible
✅ No code changes needed

SQS/SNS:
✅ New cloud-native applications
✅ AWS SDK/API only
✅ Unlimited scaling
✅ Simpler, cheaper

EXAM TIP:
Keywords "ActiveMQ", "RabbitMQ", "MQTT", "AMQP" → Amazon MQ
Keywords "new application", "cloud-native" → SQS/SNS
```

### Amplify vs Manual AWS
[BackToTop](#front-end-web-and-mobile)

```
Amplify:
✅ Rapid development
✅ Frontend developers
✅ Built-in CI/CD
✅ Less control

Manual AWS:
✅ Full control
✅ Complex requirements
✅ Custom architecture
✅ More expertise needed

EXAM TIP:
"Quickly build and deploy" → Amplify
"Full control, custom" → Manual AWS services
```

### Amplify Hosting vs S3 Static Website
[BackToTop](#front-end-web-and-mobile)
```
Amplify Hosting:
✅ CI/CD (auto-deploy from Git)
✅ Branch deployments
✅ PR previews
✅ SSR support (Next.js)
✅ More features

S3 Static Website:
✅ Simple static files
✅ No CI/CD
✅ Cheaper
✅ Manual deployment

EXAM TIP:
"CI/CD for frontend" → Amplify Hosting
"Simple static website" → S3 + CloudFront
```

---

**You've completed Application Integration and Front-End Web & Mobile!** 🎉

**Key Takeaways**:
1. **Amazon MQ** = Migrate existing ActiveMQ/RabbitMQ (standard protocols)
2. **Amplify** = Rapid full-stack web/mobile development with CI/CD
3. **Device Farm** = Test on real mobile devices

**Most Tested**:
- Amazon MQ vs SQS/SNS decision (CRITICAL)
- Amplify for web/mobile deployment
- Device Farm for mobile testing

[BackToTop](#saa-c03-exam-guide---remaining-services)