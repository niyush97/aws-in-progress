# REST API Payload Validation with AWS

[![Skill Level](https://img.shields.io/badge/Level-Intermediate-yellow)](https://github.com/yourusername/rest-api-validation)
[![AWS](https://img.shields.io/badge/AWS-API%20Gateway%20%7C%20Lambda%20%7C%20DynamoDB-orange)](https://aws.amazon.com)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org)

A comprehensive implementation of request payload validation for REST APIs using AWS services. This project demonstrates how to validate API requests at the API Gateway level before they reach backend systems, improving security, performance, and cost efficiency.

## 🎯 Project Overview

This project showcases how to implement robust payload validation in API Gateway, ensuring that only valid requests reach your Lambda functions and DynamoDB tables. By validating requests early in the request lifecycle, you can reduce costs, improve security, and maintain cleaner code.

## 🏗️ Architecture

```
Client Request
    ↓
API Gateway (Validation Layer)
    ↓ (Valid Requests Only)
Lambda Function
    ↓
DynamoDB Table
```

## ✨ Key Features

- **Request payload validation** at API Gateway level
- **JSON Schema** validation for structured data
- **CRUD operations** (Create, Read, Update, Delete) for customer records
- **Cost optimization** by rejecting invalid requests before Lambda execution
- **Clear error messages** for validation failures
- **RESTful API design** with proper HTTP methods

## 🛠️ AWS Services Used

- **API Gateway**: REST API endpoint with request validation
- **Lambda**: Serverless compute for business logic (Node.js)
- **DynamoDB**: NoSQL database for customer data storage
- **IAM**: Role and permission management
- **CloudWatch**: Logging and monitoring

## 📋 Prerequisites

- AWS Account with appropriate permissions
- AWS CLI configured (optional, for CLI-based deployment)
- Postman or similar API testing tool
- Basic knowledge of REST APIs and AWS services

## 🚀 Getting Started

### Step 1: Create DynamoDB Table

1. Navigate to DynamoDB in AWS Console
2. Click **Create Table**
3. Configure:
   - Table Name: `customers`
   - Partition key: `customer_id` (Number)
4. Leave other settings as default
5. Click **Create table**

### Step 2: Create Lambda Function

1. Navigate to Lambda → **Create Function**
2. Configure:
   - Function name: `customerProcessor`
   - Runtime: Node.js (latest version)
   - Architecture: arm64
3. Click **Create function**

#### Step 2a: Add DynamoDB Permissions

1. Go to **Configuration** → **Permissions**
2. Click on the execution role name
3. Click **Add permissions** → **Attach policies**
4. Search and attach: `AmazonDynamoDBFullAccess`

#### Step 2b: Deploy Lambda Code

Copy the Lambda function code from the `lambda/customerProcessor.js` file in this repository and paste it into the Lambda code editor. Click **Deploy**.

### Step 3: Set Up API Gateway

1. Navigate to **API Gateway**
2. Select **REST API** → **Build**
3. Configure:
   - Protocol: REST
   - Create new API
   - API Name: `myTestAPIForValidation`
   - Endpoint Type: Regional
4. Click **Create API**

### Step 4: Create Validation Model

1. Go to **Models** → **Create Model**
2. Configure:
   - Model name: `mySampleModel`
   - Content type: `application/json`
3. Add the JSON Schema (see `schema/customer-schema.json`)
4. Click **Create**

### Step 5: Create Resources and Methods

#### Create Resource
1. Select root resource `/`
2. Click **Create Resource**
3. Resource name: `customers`
4. Enable CORS
5. Click **Create Resource**

#### Create Methods
Create the following methods for `/customers` and `/customers/{id}`:

| Resource | Method | Integration | Validator Required | Request Body Required |
|----------|--------|-------------|-------------------|---------------------|
| /customers | POST | Lambda (customerProcessor) | ✅ | ✅ |
| /customers | GET | Lambda (customerProcessor) | ❌ | ❌ |
| /customers/{id} | GET | Lambda (customerProcessor) | ❌ | ❌ |
| /customers/{id} | PUT | Lambda (customerProcessor) | ✅ | ✅ |
| /customers/{id} | DELETE | Lambda (customerProcessor) | ❌ | ❌ |

**Important**: Enable **Lambda Proxy Integration** for all methods.

#### Set Up Request Validator

1. Click **Request Validators** → **Create Request Validator**
2. Name: `ValidateCustomerBody`
3. Check: ✓ Validate request body
4. Click **Create**

#### Apply Validator to POST/PUT Methods

1. Go to Resources → `/customers` → **POST**
2. Click **Method Request** → **Edit**
3. Request Validator: Select `ValidateCustomerBody`
4. Request Body section:
   - Content-Type: `application/json`
   - Model: `mySampleModel`
5. Repeat for PUT method on `/customers/{id}`

### Step 6: Deploy API

1. Select root resource `/`
2. **Actions** → **Deploy API**
3. Deployment stage: `[New Stage]`
4. Stage name: `test`
5. Click **Deploy**
6. Copy the **Invoke URL** from the Stages section

## 🧪 Testing the API

### Test 1: No Request Body (Expected: 400 Bad Request)

```bash
POST {{invoke_url}}/customers
Body: (empty)
```

**Response:**
```json
{
  "message": "Invalid request body"
}
```

### Test 2: Wrong Schema Parameters (Expected: 400 Bad Request)

```bash
POST {{invoke_url}}/customers
Content-Type: application/json

{
  "customer_id": 122,
  "first_name": "John",
  "last_name": "Doe",
  "communication_preference": "Phone_Call"
}
```

**Response:**
```json
{
  "message": "Invalid request body",
  "errors": ["Invalid enum value. Must be one of: email, sms, voice_call"]
}
```

### Test 3: Valid Request (Expected: 200 OK)

```bash
POST {{invoke_url}}/customers
Content-Type: application/json

{
  "customer_id": 123,
  "first_name": "John",
  "last_name": "Doe",
  "communication_preference": "email"
}
```

**Response:**
```json
"Customer 123 created successfully"
```

### Test 4: Missing Required Field (Expected: 400 Bad Request)

```bash
POST {{invoke_url}}/customers
Content-Type: application/json

{
  "customer_id": 123,
  "first_name": "John",
  "last_name": "Doe"
}
```

### Test 5: Wrong Data Type (Expected: 400 Bad Request)

```bash
POST {{invoke_url}}/customers
Content-Type: application/json

{
  "customer_id": "123",
  "first_name": "John",
  "last_name": "Doe",
  "communication_preference": "email"
}
```

## 📊 API Endpoints

### Create Customer
```
POST /customers
```

### Get All Customers
```
GET /customers
```

### Get Single Customer
```
GET /customers/{id}
```

### Update Customer
```
PUT /customers/{id}
```

### Delete Customer
```
DELETE /customers/{id}
```

## 🐛 Troubleshooting

### Issue: 403 Forbidden
**Solution**: Verify you're using the correct Invoke URL from the Stages section.

### Issue: 404 Not Found
**Solution**: 
- Verify the API is deployed
- Check the stage name matches (`test`)
- Ensure you're using the correct HTTP method

### Issue: Validation Not Working
**Solution**:
- Verify "Validate request body" is enabled in Request Validator
- Confirm the model `mySampleModel` is selected
- Redeploy the API after making changes

## 🧹 Cleanup

To avoid AWS charges, delete all resources after testing:

### Using AWS Console

1. **API Gateway**: Actions → Delete API
2. **Lambda Function**: Actions → Delete
3. **DynamoDB Table**: Actions → Delete table
4. **IAM Role**: Delete the Lambda execution role
5. **CloudWatch Logs**: Delete log groups

### Using AWS CLI

```bash
# Delete API Gateway
aws apigateway delete-rest-api --rest-api-id YOUR_API_ID

# Delete DynamoDB Table
aws dynamodb delete-table --table-name customers

# Delete Lambda Function
aws lambda delete-function --function-name customerProcessor

# Delete CloudWatch Log Group
aws logs delete-log-group --log-group-name /aws/lambda/customerProcessor
```

## 📚 What You'll Learn

- Creating JSON Schema models in API Gateway
- Implementing request validation before backend processing
- Building serverless CRUD applications with AWS
- Optimizing costs by validating early in the request lifecycle
- Implementing proper error handling and user feedback
- Best practices for REST API design

## 🎯 Benefits of Payload Validation

- **Cost Optimization**: Reject invalid requests before Lambda execution
- **Security**: First line of defense against malformed or malicious requests
- **Code Quality**: Eliminate repetitive validation logic in backend functions
- **Performance**: Filter out invalid requests early in the lifecycle
- **User Experience**: Provide clear, immediate feedback on validation errors

## 📝 JSON Schema Example

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Customer Schema",
  "type": "object",
  "properties": {
    "customer_id": {
      "type": "integer"
    },
    "first_name": {
      "type": "string"
    },
    "last_name": {
      "type": "string"
    },
    "communication_preference": {
      "enum": ["email", "sms", "voice_call"]
    }
  },
  "required": ["customer_id", "first_name", "last_name", "communication_preference"]
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Created by Niyush Bjr

☕ [Buy Me a Coffee](http://buymeacoffee.com/niyushbjr1L)

## 🔗 Additional Resources

- [AWS API Gateway Documentation](https://docs.aws.amazon.com/apigateway/)
- [JSON Schema Specification](https://json-schema.org/)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [DynamoDB Developer Guide](https://docs.aws.amazon.com/dynamodb/)

---

⭐ If you found this project helpful, please consider giving it a star!