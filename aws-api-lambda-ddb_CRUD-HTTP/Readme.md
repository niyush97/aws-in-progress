In this project, we will create a serverless API that creates, reads, updates and deletes items from a DynamoDB table.

When the HTTP API is invoked, API Gateway routes the request to Lambda function. Then the lambda function interacts with DyanmoDB, and returns a response to API Gateway.

 API Gateway then returns a response to Client.