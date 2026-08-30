import json

def lambda_handler(event, _):
    # >> event to CloudWatch logs for troubleshooting
    print("Raw Event:", json.dumps(event))
    
    try:
        #? Navigate safely through the HTTP API JWT path
        jwt = event.get('requestContext', {}).get('authorizer', {}).get('jwt', {})
        claims = jwt.get('claims', {})
        scopes = jwt.get('scopes', [])

        #>>? Fallback for REST API payload structure
        if not claims:
            claims = event.get('requestContext', {}).get('authorizer', {}).get('claims', {})
            
        authenticated_user = claims.get('cognito:username') \
            or claims.get('email') \
            or claims.get('sub', 'Unknown User')
        token_scopes = ", ".join(scopes) if scopes else "None"
        
        #!! Cognito automatically includes groups in claim
        raw_groups = claims.get('cognito:groups', [])
        
        # --- SAFE COGNITO GROUPS NORMALIZATION ---
        # Handle whether API Gateway passes groups as a list, a flat string, or a stringified JSON array
        if isinstance(raw_groups, str):
            # Strip out formatting symbols: [ ] " '
            clean_str = raw_groups.replace('[', '').replace(']', '').replace('"', '').replace("'", "")
            # Split by commas or spaces into a proper list
            parsed_groups = clean_str.replace(',', ' ').split()
        elif isinstance(raw_groups, list):
            parsed_groups = raw_groups
        else:
            parsed_groups = []
            
        # Normalize all strings to lowercase to prevent human casing mistakes (e.g., 'StandardUsers' vs 'standardusers')
        normalized_groups = [group.lower().strip() for group in parsed_groups]
        
        # --- AUTHORIZATION LOGIC ---
        if 'admin' in normalized_groups:
            response_data = {
                "message": "Admin Access Granted",
                "data": {"secret_key": "xyz-123", "users": [authenticated_user]},
                "role": "Admin"
            }
        elif 'standardusers' in normalized_groups or 'standarduser' in normalized_groups:
            response_data = {
                "message": "Standard Access Granted",
                "data": {"public_info": "visible"},
                "role": "StandardUser"
            }
        else:
            return {
                "statusCode": 403,
                "body": json.dumps({
                    "error": "Insufficient permissions. No valid group found.",
                    "debug_received_groups": raw_groups,
                    "debug_parsed_groups": normalized_groups
                })
            }
            
        # Creating the base payload
        payload = {
            "message": "Access Granted!",
            "authenticated_user": authenticated_user,
            "user_email" : authenticated_user,
            "token_scopes": token_scopes
        }
        
        # Merging the role-specific response_data to final payload
        payload.update(response_data)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps(payload)
        }
        
    except Exception as e:
        # If anything goes wrong inside the logic, printing the error to CloudWatch
        print("Error processing event:", str(e))
        return {
            'statusCode': 500,
            'body': json.dumps({"message": "Internal processing error", "error": str(e)})
        }