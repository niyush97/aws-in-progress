import json

def lambda_handler(event, context):
    # Extract the JWT claims passed by API Gateway
    claims = event.get('requestContext', {}).get('authorizer', {}).get('claims', {})
    user_email = claims.get('email', 'Unknown User')
    
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({
            "message": "Access Granted!",
            "authenticated_user": user_email,
            "token_scopes": claims.get('scope', 'None')
        })
    }