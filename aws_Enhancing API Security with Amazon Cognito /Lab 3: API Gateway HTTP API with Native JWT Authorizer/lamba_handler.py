import json

def lambda_handler(event, context):
    # This will print the raw event to CloudWatch logs for troubleshooting
    print("Raw Event:", json.dumps(event))
    
    try:
        # Navigate safely through the HTTP API JWT path
        request_context = event.get('requestContext', {})
        authorizer = request_context.get('authorizer', {})
        jwt = authorizer.get('jwt', {})
        claims = jwt.get('claims', {})
        scopes = jwt.get('scopes', [])
        
        # Pull the identity data out of your Cognito claims
        # Cognito populates 'cognito:username' or 'email' inside the ID token
        authenticated_user = claims.get('cognito:username') or claims.get('email') or claims.get('sub', 'Unknown User')
        token_scopes = ", ".join(scopes) if scopes else "None"
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                "message": "Access Granted!",
                "authenticated_user": authenticated_user,
                "token_scopes": token_scopes
            })
        }
        
    except Exception as e:
        # If anything goes wrong inside the logic, print the error to CloudWatch
        print("Error processing event:", str(e))
        return {
            'statusCode': 500,
            'body': json.dumps({"message": "Internal processing error", "error": str(e)})
        }