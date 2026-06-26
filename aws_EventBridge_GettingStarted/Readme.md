# Getting Started with EventBridge

level: `Beginner`
>`Description: `full hands-on tutorial for AWS EventBridge — from zero to intermediate, with real-world scenarios, SAA-C03 relevance and cleanup steps.

AWS Services : DynamoDB, EC2, EventBridge, Lambda, SQS

Other tools: `#N/A`

Category: `Serverless`




---

**■** ❑  ❑   ※  ⌘. ⊞ ★  ● **𒒬 ✓ ⓘ Ȋ 𝌟 ⏧**

</aside>

---

## ❑  **Step 1.  Core Concepts (Quick Map)**

Before touching the console, burn this mental model in:

```
Producer (Event Source)
     │
     ▼
[Event Bus]  ◄── Rules with Event Patterns filter events
     │
     ▼
Target (Lambda / SQS / SNS / Step Functions / API / etc.)
```

| Component | Purpose |
| --- | --- |
| Event Bus | The channel. Default bus = AWS services. Custom bus = your apps |
| Rule | Filter: "if event matches this pattern, send to target" |
| Event Pattern | JSON filter to match specific events |
| Target | Where matched events are sent (Lambda, SQS, etc.) |
| Scheduler | Cron/rate-based invocation — independent of event buses |
| Pipes | Point-to-point: Source → (Filter) → (Enrich) → Target |
| Archive & Replay | Store events and replay them later |
| Schema Registry | Auto-discover and document event schemas |
| DLQ | Dead-letter queue for failed deliveries |

## ❑  **Step 2. EventBridge vs Step Functions**

This is a **classic SAA-C03 decision question**. The core difference is:

> **EventBridge = Choreography** (services react independently to events)
> 
> 
> **Step Functions = Orchestration** (one coordinator drives a defined sequence)
> 

Choreography with EventBridge means Amazon EventBridge routes events through an event bus to loosely coupled services — no service knows about the others, and each reacts independently to what it receives. Orchestration with Step Functions means one coordinator drives the sequence with explicit state, retries, and branching.

| Dimension | EventBridge | Step Functions |
| --- | --- | --- |
| Pattern | Choreography (fire & forget) | Orchestration (sequential control) |
| State | Stateless | Stateful |
| Visibility | Low (need tracing) | High (visual workflow map) |
| Error handling | DLQ + retry on target | Built-in retries, catch, fallback states |
| Ordering | No guarantee | Explicit ordering |
| Best for | Loose coupling, fan-out, integrations | Multi-step workflows, approval flows, ETL |
| Pricing model | Per event | Per state transition |
| Debugging | Harder (need CloudWatch/X-Ray) | Built-in execution history |

AWS Step Functions excel in complex workflow orchestration scenarios, offering advanced features such as state management, error handling, and parallel execution.

**✓ Use EventBridge when:**

- You need a fully event-driven architecture with loosely coupled services, your application involves real-time event routing (e.g., triggering Lambda when an S3 file is uploaded), or you're integrating multiple AWS services and third-party applications via events.
- Fan-out: one event → many independent consumers
- You don't care about the order of execution
- SaaS integration (Datadog, Zendesk, Auth0, etc.)

**✓ Use Step Functions when:**

- You need guaranteed execution order
- You have retry logic, approval steps, or error branching
- You need full execution history and auditability
- Payment processing, onboarding workflows, ETL pipelines

**⛺︎  Power move:** Both services can work together, with EventBridge triggering workflows in Step Functions when certain events occur.

> **⚠️ Critical production warning:** EventBridge guarantees at-least-once delivery — design every EventBridge consumer for idempotency from day one, not after the first production incident.
> 

---

## ❑  **Step 3. ⁈ When to Use / When NOT to Use EventBridge**

### **✓ Use EventBridge:**

- Decoupling microservices (Order service → Inventory, Notification, Analytics independently)
- Reacting to AWS service events (EC2 state change, S3 object created, RDS snapshots)
- Scheduling periodic tasks (cron jobs, nightly reports)
- SaaS partner integrations (Zendesk ticket → Lambda)
- Cross-account event routing (centralized security/audit bus)
- Building audit trails and compliance pipelines
- Triggering Step Functions from an external event

### **𒒬 Do NOT use EventBridge:**

- You need **strict ordering** (use SQS FIFO or Kinesis instead)
- You need **high throughput** streaming (use Kinesis Data Streams)
- You need **request/response** patterns (use API Gateway + Lambda)
- You need **guaranteed exactly-once delivery** (EventBridge is at-least-once)
- Simple pub/sub within one service (SNS + SQS is simpler/cheaper)
- Long-running multi-step workflows with state (use Step Functions)

---

## ❑  **Step 4. 🖥️ PART 1 — Console Hands-On**

 >### **Prerequisites**
>- AWS Account (no free tier — budget: 800–1,000 yen/month)
>- Region: **ap-northeast-1 (Tokyo)** recommended if you're in Japan
>- IAM user with `AdministratorAccess` or scoped EventBridge + Lambda + SQS permissions

<br>

### ❑  Step 4.1 : Default Event Bus → (Lambda target)

>Creating the lambda function.

- `Lambda Console` → `Create function`
- Name : `eb-ec2-stop-handler`
- Runtime : python3.14
- Click `Create function`
- Sample Code
    
    ```python
    import json
    
    def lambda_handler(event, context):
        print("EventBridge Event Received:")
        print(json.dumps(event, indent=2))
        
        # Extract instance ID from EC2 state change event
        instance_id = event['detail'].get('instance-id', 'unknown')
        state = event['detail'].get('state', 'unknown')
        
        print(f"Instance {instance_id} changed to state: {state}")
        return {"status": "ok"}
    ```
    

---

> Create EventBridge Rule


- `EventBridge` → `Rules` → `Create Rule`
- Name : `ec2-instance-stop-rule`
- Event bus : `default`
- Rule type : `Rule with an event pattern`  → Click `Next`

> Define the Event Pattern
> 
- Event Source : **AWS events or EventBridge partner events**
- AWS service : `EC2`
- Event type: **`EC2 Instance State-change Notification`**
- Specific state: **`stopped`** → Click `Next`

> Select Target
> 
- Target type: **`AWS service`**
- Select target: **`Lambda function`**
- Function: `eb-ec2-stop-handler`
- Click **Next** → **`Create rule`**

> Test the pattern
> 
- Launch a `t3.micro` EC2 instance (cheapest possible, stop it within 1 minute)
- Stop the instance
- Go to **`Lambda`** → **`Monitor`** → **`View logs` in CloudWatch**
- You'll see the full event JSON printed in the logs
<br>

- Image :
`Creating the lambda function`
<br>

    
    ![image.png](Getting%20Started%20with%20EventBridge/image.png)
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%201.png)
    
<br>

- Image : 
`Creating EventBridge Rule`
<br>
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%202.png)
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%203.png)
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%204.png)
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%205.png)
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%206.png)
    
<br>

- Image :
`Test the pattern`
    <br>

    
    ![image.png](Getting%20Started%20with%20EventBridge/image%207.png)
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%208.png)
    

---

### ❑  **Step 4.2 :Custom Event Bus + Custom Application Events**

> Create custom event bus
> 
- EventBridge Console → Event buses →  **Create event bus**
- Name: `ecommerce-bus`Leave other settings default → **Create**

> Create SQS Queue as Target
> 
- Go to **SQS Console** → **Create queue**
- Type: **Standard**
- Name: `order-events-queue`**→ `Create queue`**

> **Create a Rule on the Custom Bus**
> 
- **EventBridge** → **Rules** → **Create rule**
- Name: `new-order-rule`
- Event bus: **ecommerce-bus** ← (switch from default!)
- Rule type: **Rule with an event pattern**

> Event pattern (custom/manual)
> 
> - Sample code
>     
>     ```json
>     {
>       "source": ["com.myapp.orders"],
>       "detail-type": ["OrderPlaced"],
>       "detail": {
>         "status": ["NEW"]
>       }
>     }
>     
>     ```
>     
>
1. Target: **SQS queue** → select `order-events-queue`
2. **Create rule**

> **Publish a Test Event**
> 
- **EventBridge** → **Event buses** → `ecommerce-bus`
- Click **Send events**
- Fill in:
    - **Event source:** `com.myapp.orders`
    - **Detail type:** `OrderPlaced`
    - **Event detail:**
    - sample code
        
        ```json
        {
          "orderId": "ORD-12345",
          "customer": "Tanaka Kenji",
          "amount": 4500,
          "currency": "JPY",
          "status": "NEW",
          "items": ["item-A", "item-B"]
        }
        
        ```
        
    - Click `Send`

> Verify the event
> 
- SQS → order-events-queue → Send and receive messages → Poll for messages
<br>

- Image :
`Create custom event bus`
  <br>
  
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%209.png)
    
<br>

- Image :
`Create SQS Queue as Target`
<br>
    
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2010.png)
    
<br>

- Image :
**Create a Rule on the Custom Bus**
 <br>
   
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2011.png)
    
<br>

- Image : 
`Event pattern (custom/manual)`
<br>
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2012.png)
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2013.png)
    
<br>

- Image : 
`Test event publish`
    <br>

    ![image.png](Getting%20Started%20with%20EventBridge/image%2014.png)
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2015.png)
    
<br>

- Image : 
`Verify the event in SQS`
  <br>
  
    ![image.png](Getting%20Started%20with%20EventBridge/image%2016.png)
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2017.png)
    

---

### Step 4.3 **EventBridge Pipes (DynamoDB Streams → SQS)**

Automatically filter and route DynamoDB item changes to SQS.



> **Create a DynamoDB Table**
> 
- DynamoDB → Create Table
- Name : `Orders` , Partition Key : orderId(String)
- Enable DynamoDB Streams → View type : New and old images

> Creae a Queue
> 
- Name : `new-order-pipe-queue`
- Type : (Standard)

> Create a pipe
> 
- EventBridge → Pipes → Create pipe
- Name : `dynamo-to-sqs-pipe`
- Source : DynamoDB Stream → select `Orders` table stream
- Filtering (optional) :
- Sample code
    
    ```json
    {
      "dynamodb": {
        "NewImage": {
          "status": {
            "S": ["NEW"]
          }
        }
      }
    }
    
    ```
    
- Enrichment : skip
- Target : SQS → new-order-pipe-queue → Create pipe

> Test
> 
- Go to DynamoDB → `Orders` → **Create item**
- Add: `orderId = "001"`, `status = "NEW"`, `amount = "5000"`
- Check SQS queue → poll for messages → you'll see the DynamoDB stream record
<br>

- Image :
`Creating DynamoDB Table`
<br>
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2018.png)
  <br>
  
    ![image.png](Getting%20Started%20with%20EventBridge/image%2019.png)
 <br>
   
    ![image.png](Getting%20Started%20with%20EventBridge/image%2020.png)
    

- Image : 
`Create a Queue`
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2021.png)
    
<br>

- Image :
`Create a pipe`
 <br>
   
    ![image.png](Getting%20Started%20with%20EventBridge/image%2022.png)
<br>
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2023.png)
 <br>
   
    ![image.png](Getting%20Started%20with%20EventBridge/image%2024.png)
<br>
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2025.png)
    
<br>

- Image : 
`TEST the pipe`
 <br>
   
    ![image.png](Getting%20Started%20with%20EventBridge/image%2026.png)
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2027.png)
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2028.png)
    
    Check the Event created
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2029.png)
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2030.png)
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2031.png)
    

---

### Step 4.4 **EventBridge Scheduler (One-Time & Recurring)**

> Schedule a one-time Lambda invocation 5 minutes from now.
> 
- **EventBridge** → **Scheduler** → **Create schedule**
- Name: `one-time-test-schedule`
- Schedule type: **One-time schedule**
- Date/time: Set to 5 minutes from now (UTC)
- Flexible time window: **Off**
- Target: **Lambda** → `daily-report-lambda`
- Action after schedule completion: **DELETE**
- **Create schedule**
<br>

- Image :
**`EventBridge Scheduler`**
 <br>
   
    ![image.png](Getting%20Started%20with%20EventBridge/image%2032.png)
 <br>
   
    ![image.png](Getting%20Started%20with%20EventBridge/image%2033.png)
 <br>
   
    ![image.png](Getting%20Started%20with%20EventBridge/image%2034.png)
<br>
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2035.png)
 <br>
   
    ![image.png](Getting%20Started%20with%20EventBridge/image%2036.png)
 <br>
   
    ![image.png](Getting%20Started%20with%20EventBridge/image%2037.png)
 <br>
   
    ![image.png](Getting%20Started%20with%20EventBridge/image%2038.png)
    
<br>

- Image : 
`Confirm the scheduler logs`
<br>
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2039.png)
 <br>
   
    ![image.png](Getting%20Started%20with%20EventBridge/image%2040.png)
 <br>
   
    ![image.png](Getting%20Started%20with%20EventBridge/image%2041.png)
    

---

## ❑  **Step 5 : Real-World Use Case Scenarios**

### **Scenario A: E-Commerce Order Pipeline (Fan-Out)**

```
OrderService publishes "OrderPlaced"
          │
    [ecommerce-bus]
    ┌─────┼─────┐
    ▼     ▼     ▼
Lambda  SQS   SNS
(inven) (ship) (email)
```

Services are fully decoupled. Adding a new consumer (e.g., analytics) requires **zero changes** to the order service.

### **Scenario B: Automated Security Response**

```
AWS CloudTrail → default bus
Rule: "IAM policy changed outside business hours"
→ Lambda (revoke change + notify Security team via SNS)
```

### **Scenario C: Multi-Account Event Routing**

```
Dev/Staging accounts → publish to central Security bus
Central account → Route to SIEM / compliance Lambda
```

### **Scenario D: SaaS Integration**

```
Zendesk ticket created (partner event)
→ ecommerce-bus
→ Rule: priority = "urgent"
→ Lambda (create PagerDuty alert + Slack notification)
```

### **Scenario E: Nightly Database Snapshot Validation**

```
Scheduler: cron(0 20 * * ? *)  [5AM JST]
→ Lambda checks RDS snapshot completion
→ On failure → SNS alert to on-call team
```

---

## **📝 SAA-C03 Exam Scenarios**

These are the patterns AWS tests you on:

| Scenario | Answer |
| --- | --- |
| "Decouple microservices with real-time event routing" | EventBridge custom bus |
| "Trigger Lambda when EC2 state changes" | EventBridge rule on default bus |
| "Run a task every Monday at 8AM" | EventBridge Scheduler (cron) |
| "Multi-step order workflow with retry/error handling" | Step Functions |
| "SaaS partner events from Zendesk" | EventBridge partner event bus |
| "Replay missed events after a bug fix" | EventBridge Archive & Replay |
| "Connect DynamoDB stream to Lambda without code" | EventBridge Pipes |
| "One event → multiple consumers independently" | EventBridge fan-out to Lambda + SQS + SNS |
| "Cross-account event sharing" | EventBridge resource policy + custom bus |
| "Audit all API calls + auto-remediate" | CloudTrail → EventBridge → Lambda |

---

# **Step 6 : Cleanup Steps**

### **1. EventBridge Scheduler**

- **EventBridge** → **Schedules** → Select all → **Delete**

---

### **2. EventBridge Pipes**

- **EventBridge** → **Pipes** → Select pipe → **Delete**

---

### **3. EventBridge Rules (custom bus first, then default)**

- **EventBridge** → **Rules** → Switch to `ecommerce-bus`
- Select rule → **Actions** → **Delete**
- Repeat for **default** bus rules

---

### **4. EventBridge Archives (Optional if it exist)**

- **EventBridge** → **Archives** → Select → **Delete**

---

### **5. Custom Event Bus**

- **EventBridge** → **Event buses** → choose the event bus you want to delete → **Delete**.

---

### **6. Lambda Functions**

- **Lambda** → Select functions → **Actions** → **Delete**

---

### **7. SQS Queues**

- **SQS** → Select queues → **Delete**

---

### **8. CloudWatch Log Groups**

- **CloudWatch** → **Log groups** → Search `/aws/lambda/eb-*` → Delete

---

### **9. DynamoDB Table**

- **DynamoDB** → **Tables** → `Orders` → **Delete**

---

- Image :
`Delete :  EventBridge Scheduler `
<br>

    ![image.png](Getting%20Started%20with%20EventBridge/image%2042.png)
    
--- 

- Image :
`Delete : **EventBridge Pipes**`
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2043.png)
    
---

- Image :
`Delete : **EventBridge Rules**`
<br>
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2044.png)
<br>
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2045.png)
    

---

- Image :
`Delete : **Custom Event Bus**`
 <br>
   
    ![image.png](Getting%20Started%20with%20EventBridge/image%2046.png)
    

---
- Image :
`Delete : **Lambda Functions**`
 <br>
   
    ![image.png](Getting%20Started%20with%20EventBridge/image%2047.png)
 <br>
   

---

- Image :
`Delete : SQS Queues`
 <br>
   
    ![image.png](Getting%20Started%20with%20EventBridge/image%2048.png)
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2049.png)
    

---

- Image :
`Delete : log groups`
  <br>  
    
    ![image.png](Getting%20Started%20with%20EventBridge/image%2050.png)
    

---

- Image :
`Delete : DynamoDB Table`
 <br>
   
    ![image.png](Getting%20Started%20with%20EventBridge/image%2051.png)
    

---

<aside>
<img src="https://app.notion.com/icons/confetti-party-popper_blue.svg" alt="https://app.notion.com/icons/confetti-party-popper_blue.svg" width="40px" /> 

And that’s a wrap!!!!!!! for the console version.

</aside>