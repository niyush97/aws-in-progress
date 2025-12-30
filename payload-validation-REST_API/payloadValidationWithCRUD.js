import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  ScanCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "customers";

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    // Get HTTP method and resource path
    const httpMethod = event.httpMethod;
    const resource = event.resource;
    const routeKey = `${httpMethod} ${resource}`;

    console.log("Route Key:", routeKey);
    console.log("Event:", JSON.stringify(event));

    switch (routeKey) {
      // CREATE - POST /customers
      case "POST /customers":
        let requestJSON = JSON.parse(event.body);
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              customer_id: requestJSON.customer_id,
              first_name: requestJSON.first_name,
              last_name: requestJSON.last_name,
              communication_preference: requestJSON.communication_preference,
              created_at: new Date().toISOString(),
            },
          })
        );
        body = `Customer ${requestJSON.customer_id} created successfully`;
        break;

      // READ ALL - GET /customers
      case "GET /customers":
        body = await dynamo.send(
          new ScanCommand({ TableName: tableName })
        );
        body = body.Items ?? [];
        break;

      // READ ONE - GET /customers/{id}
      case "GET /customers/{id}":
        body = await dynamo.send(
          new GetCommand({
            TableName: tableName,
            Key: {
              customer_id: parseInt(event.pathParameters.id),
            },
          })
        );
        body = body.Item;
        break;

      // UPDATE - PUT /customers/{id}
        case "PUT /customers/{id}":
        let updateJSON = JSON.parse(event.body);
        
        // First, get existing customer to preserve created_at
        const existing = await dynamo.send(
            new GetCommand({
            TableName: tableName,
            Key: { customer_id: parseInt(event.pathParameters.id) }
            })
        );
        
        await dynamo.send(
            new PutCommand({
            TableName: tableName,
            Item: {
                customer_id: parseInt(event.pathParameters.id),
                first_name: updateJSON.first_name,
                last_name: updateJSON.last_name,
                communication_preference: updateJSON.communication_preference,
                created_at: existing.Item.created_at,  // Keep original
                updated_at: new Date().toISOString(),  // New timestamp
            },
            })
        );
        break;

      // DELETE - DELETE /customers/{id}
      case "DELETE /customers/{id}":
        await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              customer_id: parseInt(event.pathParameters.id),
            },
          })
        );
        body = `Customer ${event.pathParameters.id} deleted successfully`;
        break;

      default:
        throw new Error(`Unsupported route: "${routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};