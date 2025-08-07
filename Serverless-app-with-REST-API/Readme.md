# Serverless AWS Application

A full-stack serverless application built on AWS using REST API architecture with Python backend and vanilla JavaScript frontend.

## Architecture Overview

```
Frontend (Vanilla JS) 
    ↓ (HTTPS/REST API)
API Gateway 
    ↓ (Invoke)
Lambda Functions (Python)
    ↓ (Read/Write)
DynamoDB & S3
    ↓ (Queue Processing)
SQS → Lambda (Background Processing)
```

## Tech Stack

### Backend
- **AWS Lambda**: Serverless compute functions (Python 3.9+)
- **API Gateway**: REST API endpoints and routing
- **DynamoDB**: NoSQL database for application data
- **S3**: Object storage for files and static assets
- **SQS**: Message queuing for asynchronous processing

### Frontend
- **Vanilla JavaScript**: Client-side application
- **Fetch API**: HTTP requests to backend
- **HTML5/CSS3**: User interface

## Prerequisites

- AWS Account with appropriate permissions
- AWS CLI configured
- Python 3.9 or higher
- Node.js (for development tools, optional)
- Serverless Framework or AWS SAM (recommended)


## AWS Services Configuration

### API Gateway
- **Type**: REST API
- **Authentication**: API Key / Cognito (configure as needed)
- **CORS**: Enabled for frontend domain
- **Throttling**: Configured per endpoint

### Lambda Functions
- **Runtime**: Python 3.9
- **Memory**: 128-512 MB (adjust based on function needs)
- **Timeout**: 30 seconds (API functions), 5 minutes (SQS processors)
- **Environment Variables**: Database names, S3 buckets, SQS queues

### DynamoDB
- **Billing Mode**: On-demand or Provisioned
- **Tables**: Configure with appropriate indexes
- **Backup**: Point-in-time recovery enabled

### S3 Buckets
- **Frontend Hosting**: Static website hosting enabled
- **File Storage**: Versioning and lifecycle policies configured
- **Security**: Bucket policies and CORS configured

### SQS Queues
- **Standard Queue**: For most background processing
- **DLQ**: Dead letter queue for failed messages
- **Visibility Timeout**: 30 seconds (adjust based on processing time)