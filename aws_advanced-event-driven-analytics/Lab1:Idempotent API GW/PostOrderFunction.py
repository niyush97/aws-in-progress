import json
import boto3
import time
import uuid
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('OrdersTable')

def lambda_handler(event, context):
    print("Received event: " + json.dumps(event))
    
    try:
        headers = event.get('headers', {})
        # Normalize headers (the fix from last time)
        headers_lower = {k.lower(): v for k, v in headers.items()} if headers else {}
        idempotency_key = headers_lower.get('idempotency-key')
        
        if not idempotency_key:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Idempotency-Key header is required'})
            }
            
        body = json.loads(event.get('body', '{}'))
        customer_id = body.get('customerId', 'unknown')
        item = body.get('item', 'unknown')
        
        # We still generate an order_id for business logic/display
        order_id = str(uuid.uuid4())
        expire_at = int(time.time()) + (7 * 24 * 60 * 60)
        
        # THE SPICE FIX: Use idempotency_key in the SK!
        pk = f"CUSTOMER#{customer_id}"
        sk = f"ORDER#{idempotency_key}" 
        
        try:
            table.put_item(
                Item={
                    'PK': pk,
                    'SK': sk,
                    'customerId': customer_id,
                    'orderId': order_id,
                    'item': item,
                    'idempotencyKey': idempotency_key,
                    'expireAt': expire_at,
                    'createdAt': int(time.time())
                },
                # Now this condition will fail on the second request
                # because an item with this exact PK+SK already exists!
                ConditionExpression='attribute_not_exists(SK)'
            )
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'message': 'Order placed', 'orderId': order_id})
            }
            
        except ClientError as e:
            if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
                print(f"Duplicate request detected for key: {idempotency_key}")
                return {
                    'statusCode': 200,
                    'body': json.dumps({'message': 'Duplicate request ignored. Order already processed.'})
                }
            else:
                raise e
                
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }