# FastAPI with Cognito JWT Authentication on AWS Lambda

---


### What you’ll Learn :

How to build a Python FastAPI application that natively validates Amazon Cognito JWT using industry standard libraries python jose , fastapi. You will learn how to structure code for serverless, handles JWKS caching and deploy it to AWS Lambda using Mangum (ASGI adapter) without relying on API gateway authorizers. This shifts validation to the application layer, giving you full control over error handling, logging and custom business logics.

---

### Architecture Diagram:

```markdown
[Client] ──(Bearer Token)──> [API Gateway HTTP API]
                                    |
                              (Raw Proxy)
                                    v
                          [AWS Lambda + Mangum]
                                    |
                              [FastAPI App]
                                    |
                    ┌───────────────┴───────────────┐
                    v                               v
          [JWT Middleware]                  [Business Logic]
           (Fetches JWKS,                   (Protected Routes)
            Validates Sig,                  
            Extracts Claims)                
                    ^
                    | (Cached)
            [Cognito JWKS Endpoint]
```

---

### Cost alert

- **Lambda:** 128MB RAM, ~200ms avg duration = <$0.01 for lab testing.
- **API Gateway HTTP API:** $1.00/million requests.
- **Total Lab Cost:** < $0.05.
- ⚠️ **Warning:** Do NOT set Lambda memory >256MB for this lab. FastAPI + crypto libraries have a cold start penalty; 128MB–256MB is the sweet spot for cost vs. performance in ap-northeast-1.

---

## Step 1 : Setting up Python environments.

1. Open macOS Terminal. Create a project directory:

```bash
mkdir cognito-fastapi-lab && cd cognito-fastapi-lab
python3 -m venv .venv
source .venv/bin/activate
```

2. Install dependencies
```bash
pip install fastapi mangum python-jose[cryptography] httpx boto3
```
- `mangum`: Adapts ASGI (FastAPI) to AWS Lambda events.
- `python-jose`: Handles JWT validation and JWKS fetching.
- `httpx`: Async HTTP client for fetching JWKS keys.


---

## **Step 2: Create the FastAPI Application with Cognito Auth**





















































































