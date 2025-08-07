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

![Architecture](https://github.com/niyush97/aws-in-progress/blob/main/Serverless-app-with-REST-API/Sereverless%20App%20with%20REST%20API.jpg)

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


