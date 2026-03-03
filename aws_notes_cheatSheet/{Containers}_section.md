# AWS Containers - SAA-C03 Exam Guide
---
>⚠️ These notes were created using Anthropic's AI Models (Opus 4.5 and 4.6).
---
## Table of Contents
1. [Container Fundamentals](#container-fundamentals)
2. [Amazon ECS (Elastic Container Service)](#amazon-ecs-elastic-container-service)
3. [Amazon EKS (Elastic Kubernetes Service)](#amazon-eks-elastic-kubernetes-service)
4. [AWS Fargate](#aws-fargate)
5. [Amazon ECR (Elastic Container Registry)](#amazon-ecr-elastic-container-registry)
6. [AWS App Runner](#aws-app-runner)
7. [Container Services Comparison](#container-services-comparison)
    - [Decision Tree: Which Container Service?](#decision-tree-which-container-service)
    - [Use Case Matrix](#use-case-matrix)
    - [Critical Exam Scenarios - Containers](#critical-exam-scenarios---containers)
    - [Advanced Container Patterns](#advanced-container-patterns)
    - [Container Security Best Practices](#container-security-best-practices)
    - [Container Monitoring and Logging](#container-monitoring-and-logging)
8. [Final Summary: Containers](#final-summary-containers)
9. [Quick Reference Card](#quick-reference-card)

---

# Container Fundamentals
[BackToTop](#table-of-contents)
## What are Containers? ⭐⭐⭐⭐⭐

### Containers vs Virtual Machines
```
Virtual Machines:
- Full OS per application
- Heavy (GBs)
- Slow to start (minutes)
- Resource intensive

Containers:
- Share host OS kernel
- Lightweight (MBs)
- Fast to start (seconds)
- Resource efficient

Example:
VM: 3 apps = 3 full OS copies (30 GB)
Containers: 3 apps = 1 OS, 3 containers (5 GB)
```

### Docker Basics ⭐⭐⭐⭐⭐
```
Key Concepts:

1. Docker Image:
   - Blueprint for container
   - Read-only template
   - Contains app + dependencies
   - Stored in registry (ECR, Docker Hub)

2. Docker Container:
   - Running instance of image
   - Isolated process
   - Ephemeral (stateless)

3. Dockerfile:
   - Instructions to build image
   - Text file

Example Dockerfile:
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

4. Docker Registry:
   - Store and distribute images
   - Docker Hub (public)
   - Amazon ECR (private, AWS)
```

### Why Containers? ⭐⭐⭐⭐⭐
```
Benefits:
✅ Consistency (works everywhere)
✅ Portability (dev = prod)
✅ Efficiency (lightweight)
✅ Fast deployment (seconds)
✅ Microservices (one service per container)
✅ Scalability (easy to scale)
✅ Isolation (security)

Use Cases:
✅ Microservices architecture
✅ CI/CD pipelines
✅ Batch processing
✅ Machine learning
✅ Web applications
```

---

# Amazon ECS (Elastic Container Service)
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐⭐ (CRITICAL)

### What is ECS?
```
- AWS container orchestration service
- Run and manage Docker containers
- Highly scalable
- Integrated with AWS services
- Two launch types: EC2 and Fargate
```

---

## ECS Components ⭐⭐⭐⭐⭐

### 1. Cluster ⭐⭐⭐⭐⭐
```
What is a Cluster?
- Logical grouping of tasks/services
- Regional resource
- Can span multiple AZs
- Contains EC2 instances or Fargate tasks

Example:
Cluster: production-cluster
├─ EC2 instances (10)
├─ Tasks (50)
└─ Services (5)
```

### 2. Task Definition ⭐⭐⭐⭐⭐
```
What is a Task Definition?
- Blueprint for your application
- JSON format
- Defines containers, resources, networking
- Versioned (immutable)

Key Components:
- Container definitions (image, CPU, memory)
- Task role (IAM permissions)
- Network mode
- Volumes
- Logging

Example Task Definition:
{
  "family": "web-app",
  "taskRoleArn": "arn:aws:iam::123456789012:role/ecsTaskRole",
  "networkMode": "awsvpc",
  "containerDefinitions": [
    {
      "name": "web",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/web:latest",
      "cpu": 256,
      "memory": 512,
      "essential": true,
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "ENV",
          "value": "production"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/web-app",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "web"
        }
      }
    }
  ],
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512"
}
```

### 3. Task ⭐⭐⭐⭐⭐
```
What is a Task?
- Running instance of task definition
- One or more containers
- Ephemeral (can be stopped/started)
- Scheduled or long-running

Types:
1. Standalone Task:
   - Run once and stop
   - Batch jobs
   - Example: Data processing

2. Service Task:
   - Long-running
   - Maintained by service
   - Auto-restart if fails
```

### 4. Service ⭐⭐⭐⭐⭐
```
What is a Service?
- Maintains desired number of tasks
- Load balancing
- Auto-restart failed tasks
- Rolling updates
- Integration with ALB/NLB

Configuration:
- Task definition
- Desired count (number of tasks)
- Launch type (EC2 or Fargate)
- Load balancer (optional)
- Auto Scaling (optional)

Example:
Service: web-service
├─ Task Definition: web-app:5
├─ Desired Count: 10 tasks
├─ Launch Type: Fargate
├─ Load Balancer: ALB
└─ Auto Scaling: Target tracking (CPU 70%)

Service ensures:
✅ 10 tasks always running
✅ Failed tasks automatically replaced
✅ Traffic distributed via ALB
✅ Scales based on CPU
```

---

## ECS Launch Types ⭐⭐⭐⭐⭐ (CRITICAL)

### 1. EC2 Launch Type ⭐⭐⭐⭐⭐
```
What is EC2 Launch Type?
- Containers run on EC2 instances you manage
- You provision and manage EC2 instances
- More control
- Lower cost (if you have Reserved Instances)

Architecture:
ECS Cluster
├─ EC2 Instance 1 (ECS Agent)
│  ├─ Task 1 (2 containers)
│  └─ Task 2 (1 container)
├─ EC2 Instance 2 (ECS Agent)
│  ├─ Task 3 (2 containers)
│  └─ Task 4 (1 container)

Responsibilities:
You manage:
❌ EC2 instances (patching, scaling)
❌ ECS Agent
❌ Instance types
❌ Capacity planning

AWS manages:
✅ Container orchestration
✅ Task placement
✅ Service scheduling

Use Cases:
✅ Need control over instances
✅ Have Reserved Instances
✅ Specific instance requirements
✅ Cost optimization (long-running)
✅ GPU workloads (specific instance types)

Cost:
- EC2 instance costs
- EBS storage costs
- Data transfer costs
```

### 2. Fargate Launch Type ⭐⭐⭐⭐⭐
```
What is Fargate Launch Type?
- Serverless containers
- AWS manages infrastructure
- No EC2 instances to manage
- Pay per task (vCPU and memory)

Architecture:
ECS Cluster (Fargate)
├─ Task 1 (serverless)
├─ Task 2 (serverless)
├─ Task 3 (serverless)
└─ Task 4 (serverless)

Responsibilities:
You manage:
✅ Task definitions
✅ Container images
✅ Application code

AWS manages:
✅ Infrastructure
✅ Patching
✅ Scaling
✅ Capacity

Use Cases:
✅ Don't want to manage servers
✅ Variable workloads
✅ Microservices
✅ Batch jobs
✅ Quick deployments

Cost:
- Per task (vCPU-hour + GB-hour)
- More expensive per hour than EC2
- But no idle capacity costs

Example Pricing:
Task: 0.25 vCPU, 0.5 GB memory
Cost: ~$0.01 per hour
```

### EC2 vs Fargate Comparison ⭐⭐⭐⭐⭐

| Feature | EC2 Launch Type | Fargate Launch Type |
|---------|----------------|---------------------|
| **Management** | You manage instances | AWS manages infrastructure |
| **Control** | Full control | Limited control |
| **Pricing** | EC2 instance pricing | Per task (vCPU + memory) |
| **Scaling** | Manual (Auto Scaling Group) | Automatic |
| **Startup Time** | Slower (provision instances) | Faster (no instances) |
| **Cost (long-running)** | Lower (with RIs) | Higher |
| **Cost (variable)** | Higher (idle capacity) | Lower (pay per use) |
| **Use Case** | Predictable, long-running | Variable, serverless |

**Key Exam Tip**:
- **Manage infrastructure, cost optimization** → EC2 Launch Type
- **Serverless, no management** → Fargate Launch Type

---

## ECS Networking ⭐⭐⭐⭐⭐

### Network Modes ⭐⭐⭐⭐⭐

#### 1. awsvpc (Recommended) ⭐⭐⭐⭐⭐
```
What is awsvpc?
- Each task gets own ENI (Elastic Network Interface)
- Each task has own private IP
- Each task has own security group
- Required for Fargate

Benefits:
✅ Task-level security groups
✅ Task-level network isolation
✅ VPC Flow Logs per task
✅ Better security

Use Cases:
✅ Fargate (required)
✅ Enhanced security
✅ Microservices

Example:
Task 1: ENI (10.0.1.50), Security Group A
Task 2: ENI (10.0.1.51), Security Group B
Task 3: ENI (10.0.1.52), Security Group A
```

#### 2. bridge (Default for EC2)
```
What is bridge?
- Docker's default network
- Containers share host network
- Port mapping required

Use Cases:
✅ Simple deployments
✅ Legacy applications
```

#### 3. host
```
What is host?
- Container uses host network directly
- No network isolation
- Better performance

Use Cases:
✅ High network performance needed
✅ Specific networking requirements
```

#### 4. none
```
What is none?
- No network connectivity
- Completely isolated

Use Cases:
✅ Batch processing (no network needed)
```

---

## ECS with Load Balancers ⭐⭐⭐⭐⭐

### Application Load Balancer (ALB) ⭐⭐⭐⭐⭐
```
Integration:
ECS Service → ALB → Target Group → Tasks

Features:
✅ Dynamic port mapping (EC2 launch type)
✅ Path-based routing
✅ Host-based routing
✅ Health checks
✅ SSL termination

Example:
ALB: myapp-alb.us-east-1.elb.amazonaws.com
├─ Listener: Port 80 (HTTP)
│  └─ Rule: /api/* → API Target Group → API Tasks
│  └─ Rule: /web/* → Web Target Group → Web Tasks
└─ Listener: Port 443 (HTTPS)
   └─ Default → Web Target Group → Web Tasks

Dynamic Port Mapping (EC2):
- Container port: 80
- Host port: 0 (random)
- ALB automatically discovers port
- Multiple tasks per instance possible

Example:
EC2 Instance:
├─ Task 1: Container port 80 → Host port 32768
├─ Task 2: Container port 80 → Host port 32769
└─ Task 3: Container port 80 → Host port 32770

ALB routes to correct host port automatically
```

### Network Load Balancer (NLB) ⭐⭐⭐⭐
```
Integration:
ECS Service → NLB → Target Group → Tasks

Use Cases:
✅ High performance (millions of requests/sec)
✅ TCP/UDP traffic
✅ Static IP required
✅ Preserve source IP

Example:
NLB: myapp-nlb.us-east-1.elb.amazonaws.com
└─ Listener: Port 80 (TCP)
   └─ Target Group → Tasks
```

---

## ECS Auto Scaling ⭐⭐⭐⭐⭐

### Service Auto Scaling ⭐⭐⭐⭐⭐
```
What is Service Auto Scaling?
- Automatically adjust desired task count
- Based on metrics
- Target tracking, step scaling, scheduled

Metrics:
✅ ECS Service Average CPU
✅ ECS Service Average Memory
✅ ALB Request Count per Target
✅ Custom CloudWatch metrics

Example:
Service: web-service
├─ Min tasks: 2
├─ Max tasks: 10
├─ Desired tasks: 5
└─ Scaling policy: Target tracking (CPU 70%)

Behavior:
- CPU > 70%: Scale out (add tasks)
- CPU < 70%: Scale in (remove tasks)
- Always between 2-10 tasks
```

### Cluster Auto Scaling (EC2 Launch Type) ⭐⭐⭐⭐
```
What is Cluster Auto Scaling?
- Automatically adjust EC2 instance count
- Based on task requirements
- Uses Capacity Provider

Capacity Provider:
- Links Auto Scaling Group to ECS cluster
- Manages EC2 instance scaling

Example:
Cluster: production-cluster
├─ Capacity Provider: production-capacity-provider
│  └─ Auto Scaling Group: production-asg
│     ├─ Min: 2 instances
│     ├─ Max: 10 instances
│     └─ Desired: 5 instances
└─ Service: web-service
   └─ Desired tasks: 20

Behavior:
1. Service needs 20 tasks
2. Current capacity: 5 instances (can run 15 tasks)
3. Capacity Provider scales ASG to 7 instances
4. Now can run 21 tasks (sufficient)

Note: Fargate doesn't need cluster auto scaling (serverless)
```

---

## ECS Task Placement ⭐⭐⭐⭐ (EC2 Launch Type)

### Task Placement Strategies ⭐⭐⭐⭐
```
1. Binpack:
   - Place tasks on least available CPU/memory
   - Minimize number of instances
   - Cost optimization

Example:
Instance 1: 2 tasks (80% CPU)
Instance 2: 1 task (40% CPU)
Instance 3: 0 tasks (0% CPU)
New task → Instance 1 (binpack, minimize instances)

2. Random:
   - Place tasks randomly
   - Simple, no optimization

3. Spread:
   - Distribute tasks evenly
   - Based on attribute (AZ, instance ID)
   - High availability

Example (spread by AZ):
AZ-A: 3 tasks
AZ-B: 3 tasks
AZ-C: 3 tasks
New task → AZ with fewest tasks

Can combine strategies:
1. Spread by AZ (high availability)
2. Binpack by memory (cost optimization)
```

### Task Placement Constraints ⭐⭐⭐⭐
```
1. distinctInstance:
   - Each task on different instance
   - Maximum availability

2. memberOf:
   - Place tasks on instances matching expression
   - Example: Only t3.large instances

Example:
Constraint: memberOf(instance-type == t3.large)
Result: Tasks only on t3.large instances
```

---

## ECS IAM Roles ⭐⭐⭐⭐⭐

### 1. ECS Instance Role (EC2 Launch Type) ⭐⭐⭐⭐⭐
```
What is it?
- IAM role for EC2 instances
- Allows ECS agent to communicate with ECS service
- Attached to EC2 instances

Permissions:
✅ Pull images from ECR
✅ Send logs to CloudWatch
✅ Register/deregister with ECS

Managed Policy: AmazonEC2ContainerServiceforEC2Role
```

### 2. ECS Task Role ⭐⭐⭐⭐⭐
```
What is it?
- IAM role for tasks
- Allows containers to access AWS services
- Defined in task definition

Example:
Task needs to:
- Read from S3 bucket
- Write to DynamoDB table

Task Role Policy:
{
  "Effect": "Allow",
  "Action": [
    "s3:GetObject",
    "dynamodb:PutItem"
  ],
  "Resource": [
    "arn:aws:s3:::my-bucket/*",
    "arn:aws:dynamodb:us-east-1:123456789012:table/my-table"
  ]
}

Best Practice: One task role per task definition (least privilege)
```

### 3. ECS Task Execution Role ⭐⭐⭐⭐⭐
```
What is it?
- IAM role for ECS agent
- Allows ECS to perform actions on your behalf
- Pull images, send logs, etc.

Permissions:
✅ Pull images from ECR
✅ Send logs to CloudWatch Logs
✅ Get secrets from Secrets Manager/Parameter Store

Managed Policy: AmazonECSTaskExecutionRolePolicy

Difference from Task Role:
- Task Execution Role: ECS agent actions (pull image, logs)
- Task Role: Container application actions (S3, DynamoDB)
```

---

## ECS Data Volumes ⭐⭐⭐⭐

### 1. Bind Mounts (EC2 Launch Type)
```
What are Bind Mounts?
- Mount host directory to container
- Share data between containers on same instance
- Ephemeral (lost when instance terminates)

Use Cases:
✅ Share data between containers
✅ Temporary storage
✅ Logs

Example:
Host: /var/log/app
Container 1: /logs (read/write)
Container 2: /logs (read-only)
```

### 2. Docker Volumes
```
What are Docker Volumes?
- Managed by Docker
- Persist beyond container lifecycle
- Can be shared

Use Cases:
✅ Persistent data
✅ Share between containers
```

### 3. EFS Volumes ⭐⭐⭐⭐⭐
```
What are EFS Volumes?
- Mount EFS file system to containers
- Persistent, shared storage
- Works with both EC2 and Fargate
- Multi-AZ

Use Cases:
✅ Persistent storage (survives task restarts)
✅ Share data between tasks
✅ Multi-AZ availability
✅ Fargate persistent storage

Example:
EFS File System: fs-12345678
├─ Task 1 (AZ-A): /mnt/efs
├─ Task 2 (AZ-B): /mnt/efs
└─ Task 3 (AZ-C): /mnt/efs

All tasks access same data

Configuration in Task Definition:
{
  "volumes": [
    {
      "name": "efs-volume",
      "efsVolumeConfiguration": {
        "fileSystemId": "fs-12345678",
        "transitEncryption": "ENABLED"
      }
    }
  ],
  "containerDefinitions": [
    {
      "name": "app",
      "mountPoints": [
        {
          "sourceVolume": "efs-volume",
          "containerPath": "/mnt/efs"
        }
      ]
    }
  ]
}
```

---

## When to Use ECS ⭐⭐⭐⭐⭐

### ✅ Use ECS When
- Run Docker containers on AWS
- AWS-native solution preferred
- Tight AWS integration needed
- Simpler than Kubernetes
- Cost-effective container orchestration
- Microservices architecture
- Batch processing
- CI/CD pipelines

### ❌ Don't Use ECS When
- Need Kubernetes (use EKS)
- Multi-cloud portability required (use Kubernetes)
- Existing Kubernetes expertise (use EKS)

---

## Keywords to Identify ECS

- "Docker containers"
- "Container orchestration"
- "Microservices"
- "Task definition"
- "ECS cluster"
- "Fargate" (serverless containers)
- "Container management"

---

## Common Exam Scenarios ⭐⭐⭐⭐⭐

### Scenario 1: Serverless Containers
**Question**: Run containers without managing servers

**Answer**: Use ECS with Fargate launch type

**Why**:
- Serverless (no EC2 management)
- AWS manages infrastructure
- Pay per task
- Quick deployment

### Scenario 2: Persistent Storage for Containers
**Question**: Containers need shared persistent storage across AZs

**Answer**: Use ECS with EFS volumes

**Why**:
- EFS provides persistent storage
- Multi-AZ (high availability)
- Shared across tasks
- Works with Fargate

### Scenario 3: Cost Optimization for Long-Running Containers
**Question**: Reduce costs for 24/7 container workloads

**Answer**: Use ECS with EC2 launch type and Reserved Instances

**Why**:
- EC2 cheaper for long-running (with RIs)
- More control over instances
- Cost optimization

### Scenario 4: Microservices with Load Balancing
**Question**: Deploy microservices with automatic load balancing

**Answer**: Use ECS Service with Application Load Balancer

**Why**:
- ECS Service maintains desired count
- ALB distributes traffic
- Path-based routing for microservices
- Auto-restart failed tasks

### Scenario 5: Auto Scaling Based on CPU
**Question**: Automatically scale containers based on CPU utilization

**Answer**: Use ECS Service Auto Scaling with target tracking

**Why**:
- Automatic scaling
- Based on CPU metric
- Maintains desired performance
- Cost optimization

---

## ECS Best Practices ⭐⭐⭐⭐⭐

### Design
```
✅ Use Fargate for serverless (unless specific EC2 needs)
✅ One service per microservice
✅ Use task roles (least privilege)
✅ Use awsvpc network mode
✅ Store images in ECR
✅ Use task definition revisions (versioning)
```

### Security
```
✅ Use task roles (not hardcoded credentials)
✅ Use Secrets Manager/Parameter Store for secrets
✅ Enable encryption in transit (TLS)
✅ Use private subnets for tasks
✅ Scan images for vulnerabilities (ECR scanning)
✅ Use security groups per task (awsvpc)
```

### High Availability
```
✅ Deploy across multiple AZs
✅ Use Application Load Balancer
✅ Set appropriate health check grace period
✅ Use EFS for persistent storage (multi-AZ)
✅ Set min tasks ≥ 2
```

### Performance
```
✅ Right-size task CPU/memory
✅ Use CloudWatch Container Insights
✅ Monitor task metrics
✅ Use appropriate launch type (EC2 vs Fargate)
✅ Optimize container images (smaller = faster)
```

### Cost Optimization
```
✅ Use Fargate for variable workloads
✅ Use EC2 with RIs for predictable workloads
✅ Use Fargate Spot for fault-tolerant workloads
✅ Right-size tasks (don't over-provision)
✅ Use binpack placement strategy (EC2)
✅ Delete unused task definitions
```

---

## ECS Pricing

### Fargate Pricing
```
Charged per task:
- vCPU-hour: $0.04048 per vCPU per hour
- GB-hour: $0.004445 per GB per hour

Example:
Task: 0.25 vCPU, 0.5 GB memory, 1 hour
vCPU: 0.25 × $0.04048 = $0.01012
Memory: 0.5 × $0.004445 = $0.002223
Total: $0.012343 per hour

10 tasks, 24/7, 30 days:
10 × $0.012343 × 24 × 30 = $88.87/month
```

### EC2 Launch Type Pricing
```
Charged for:
- EC2 instances (standard EC2 pricing)
- EBS volumes
- Data transfer

No additional ECS charges

Example:
3 × t3.medium instances, 24/7, 30 days:
3 × $0.0416 × 24 × 30 = $89.86/month

Can run many tasks on these instances
```

---

# Amazon EKS (Elastic Kubernetes Service)
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐

### What is EKS?
```
- Managed Kubernetes service
- Run Kubernetes on AWS
- Highly available control plane
- Integrated with AWS services
- Kubernetes-native
```

### Kubernetes Basics ⭐⭐⭐⭐
```
Key Concepts:

1. Pod:
   - Smallest deployable unit
   - One or more containers
   - Shared network and storage

2. Node:
   - Worker machine (EC2 instance or Fargate)
   - Runs pods

3. Cluster:
   - Set of nodes
   - Control plane + worker nodes

4. Service:
   - Expose pods to network
   - Load balancing

5. Deployment:
   - Desired state for pods
   - Rolling updates
   - Rollback

6. Namespace:
   - Virtual cluster
   - Isolation
```

---

## EKS Architecture ⭐⭐⭐⭐

### Control Plane ⭐⭐⭐⭐
```
What is Control Plane?
- Managed by AWS
- Kubernetes API server
- etcd (key-value store)
- Scheduler
- Controller manager
- Multi-AZ (high availability)

You don't manage:
✅ Control plane infrastructure
✅ Control plane patching
✅ Control plane scaling
✅ Control plane availability

AWS manages everything
```

### Worker Nodes ⭐⭐⭐⭐
```
What are Worker Nodes?
- Run your pods
- Two options: EC2 or Fargate

1. Managed Node Groups (EC2):
   - AWS manages EC2 instances
   - Auto Scaling
   - Automated updates
   - Easier management

2. Self-Managed Nodes (EC2):
   - You manage EC2 instances
   - Full control
   - More complex

3. Fargate:
   - Serverless
   - No node management
   - Pay per pod
```

---

## EKS Node Types ⭐⭐⭐⭐⭐

### 1. Managed Node Groups ⭐⭐⭐⭐⭐
```
What are Managed Node Groups?
- AWS manages EC2 instances
- Automated provisioning
- Automated updates
- Auto Scaling integration

Benefits:
✅ Easier management
✅ Automated updates
✅ Auto Scaling
✅ Spot instance support

Use Cases:
✅ Standard workloads
✅ Want AWS to manage nodes
✅ Need Auto Scaling
```

### 2. Self-Managed Nodes ⭐⭐⭐
```
What are Self-Managed Nodes?
- You provision and manage EC2 instances
- Full control
- More complex

Use Cases:
✅ Need specific configurations
✅ Custom AMIs
✅ Advanced networking
```

### 3. Fargate ⭐⭐⭐⭐⭐
```
What is EKS on Fargate?
- Serverless pods
- No node management
- Pay per pod

Benefits:
✅ No node management
✅ Automatic scaling
✅ Pay per pod

Use Cases:
✅ Serverless workloads
✅ Variable workloads
✅ Don't want to manage nodes

Limitations:
❌ No DaemonSets
❌ No privileged containers
❌ No host networking
```

---

## EKS vs ECS ⭐⭐⭐⭐⭐ (CRITICAL)

| Feature | EKS | ECS |
|---------|-----|-----|
| **Orchestrator** | Kubernetes | AWS proprietary |
| **Complexity** | Higher (Kubernetes) | Lower (simpler) |
| **Portability** | High (standard Kubernetes) | Low (AWS-only) |
| **Learning Curve** | Steep | Moderate |
| **Community** | Large (Kubernetes) | AWS-specific |
| **Control Plane Cost** | $0.10/hour (~$73/month) | Free |
| **Use Case** | Kubernetes expertise, multi-cloud | AWS-native, simpler |
| **Ecosystem** | Kubernetes ecosystem | AWS ecosystem |

**Key Exam Tip**:
- **Need Kubernetes, multi-cloud portability** → EKS
- **AWS-native, simpler, cost-effective** → ECS

---

## When to Use EKS ⭐⭐⭐⭐

### ✅ Use EKS When
- Need Kubernetes
- Existing Kubernetes expertise
- Multi-cloud portability required
- Kubernetes ecosystem tools needed
- Complex orchestration requirements
- Hybrid cloud (on-premises + AWS)

### ❌ Don't Use EKS When
- Don't need Kubernetes → Use ECS (simpler, cheaper)
- Simple container workloads → Use ECS or Fargate
- Cost-sensitive (control plane cost) → Use ECS

---

## Keywords to Identify EKS

- "Kubernetes"
- "K8s"
- "Kubernetes on AWS"
- "Portable containers"
- "Multi-cloud"
- "Kubernetes expertise"
- "Helm charts"

---

## Common Exam Scenarios ⭐⭐⭐⭐

### Scenario 1: Kubernetes on AWS
**Question**: Run existing Kubernetes workloads on AWS

**Answer**: Use Amazon EKS

**Why**:
- Managed Kubernetes
- Compatible with standard Kubernetes
- Migrate existing workloads
- AWS integration

### Scenario 2: Multi-Cloud Portability
**Question**: Run containers that can move between AWS and other clouds

**Answer**: Use Amazon EKS (Kubernetes)

**Why**:
- Kubernetes is portable
- Standard across clouds
- Not locked to AWS

### Scenario 3: Serverless Kubernetes
**Question**: Run Kubernetes pods without managing nodes

**Answer**: Use EKS with Fargate

**Why**:
- Serverless pods
- No node management
- Kubernetes compatibility

---

## EKS Best Practices ⭐⭐⭐⭐

### Design
```
✅ Use Managed Node Groups (easier)
✅ Use Fargate for serverless workloads
✅ Deploy across multiple AZs
✅ Use namespaces for isolation
✅ Use Helm for package management
```

### Security
```
✅ Use IAM roles for service accounts (IRSA)
✅ Enable pod security policies
✅ Use network policies
✅ Scan images for vulnerabilities
✅ Use private subnets for nodes
✅ Enable control plane logging
```

### High Availability
```
✅ Multi-AZ control plane (automatic)
✅ Multi-AZ worker nodes
✅ Use pod disruption budgets
✅ Use horizontal pod autoscaling
✅ Use cluster autoscaler
```

### Cost Optimization
```
✅ Use Fargate for variable workloads
✅ Use Spot instances for fault-tolerant workloads
✅ Right-size pods (resource requests/limits)
✅ Use cluster autoscaler (scale down unused nodes)
✅ Monitor with Container Insights
```

---

## EKS Pricing

### Pricing Components
```
Control Plane:
- $0.10 per hour per cluster
- ~$73 per month per cluster

Worker Nodes:
- EC2 instances (standard EC2 pricing)
- Fargate (per pod pricing, same as ECS Fargate)

Example:
1 EKS cluster: $73/month
3 × t3.medium nodes: 3 × $0.0416 × 24 × 30 = $89.86/month
Total: $162.86/month

Note: Control plane cost is additional (unlike ECS which is free)
```

---

## EKS Limitations

- **Control plane cost**: $0.10/hour (ECS is free)
- **Complexity**: Kubernetes learning curve
- **Setup time**: More complex than ECS
- **Minimum nodes**: Need at least 2 nodes for HA

---

## EKS Pros & Cons

**Pros**:
- Standard Kubernetes (portable)
- Large ecosystem (Helm, operators, etc.)
- Multi-cloud compatible
- Managed control plane
- AWS integration
- Kubernetes expertise transferable

**Cons**:
- More complex than ECS
- Control plane cost ($73/month)
- Steeper learning curve
- More operational overhead
- Longer setup time

---

# AWS Fargate
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐⭐ (CRITICAL)

### What is Fargate?
```
- Serverless compute engine for containers
- Works with both ECS and EKS
- No servers to manage
- Pay per task/pod
- Automatic scaling
```

### Fargate Architecture ⭐⭐⭐⭐⭐
```
Traditional (EC2):
You → Manage EC2 Instances → Run Containers

Fargate:
You → Define Task/Pod → AWS Runs It (serverless)

No infrastructure management:
❌ No EC2 instances to provision
❌ No patching
❌ No scaling infrastructure
❌ No capacity planning

Just define:
✅ Container image
✅ CPU and memory requirements
✅ Networking
✅ IAM roles
```

---

## Fargate with ECS ⭐⭐⭐⭐⭐

### Task Definition for Fargate ⭐⭐⭐⭐⭐
```json
{
  "family": "fargate-task",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "app",
      "image": "nginx:latest",
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp"
        }
      ]
    }
  ]
}

Key Points:
✅ networkMode must be "awsvpc"
✅ requiresCompatibilities: ["FARGATE"]
✅ cpu and memory at task level (not container level)
✅ Supported CPU/memory combinations only
```

### Fargate CPU and Memory Combinations ⭐⭐⭐⭐⭐
```
CPU (vCPU) | Memory (GB)
-----------|-------------
0.25       | 0.5, 1, 2
0.5        | 1, 2, 3, 4
1          | 2, 3, 4, 5, 6, 7, 8
2          | 4-16 (1 GB increments)
4          | 8-30 (1 GB increments)
8          | 16-60 (4 GB increments)
16         | 32-120 (8 GB increments)

Example Valid Combinations:
✅ 0.25 vCPU, 0.5 GB
✅ 1 vCPU, 4 GB
✅ 4 vCPU, 16 GB

Example Invalid Combinations:
❌ 0.25 vCPU, 4 GB (not supported)
❌ 1 vCPU, 10 GB (not supported)
```

### Fargate Networking ⭐⭐⭐⭐⭐
```
Network Mode: awsvpc (required)

Each task gets:
✅ Own ENI (Elastic Network Interface)
✅ Own private IP address
✅ Own security group
✅ VPC integration

Configuration:
- Subnet (public or private)
- Security group
- Public IP (optional, for public subnet)

Example:
Task 1:
├─ ENI: eni-12345678
├─ Private IP: 10.0.1.50
├─ Security Group: sg-web
└─ Public IP: 54.123.45.67 (if enabled)

Task 2:
├─ ENI: eni-87654321
├─ Private IP: 10.0.1.51
├─ Security Group: sg-api
└─ No public IP (private subnet)
```

---

## Fargate with EKS ⭐⭐⭐⭐

### Fargate Profile ⭐⭐⭐⭐
```
What is a Fargate Profile?
- Defines which pods run on Fargate
- Based on namespace and labels
- Multiple profiles per cluster

Example Fargate Profile:
Name: fargate-profile-1
Namespace: default
Labels:
  - fargate: "true"

Result: Pods in "default" namespace with label "fargate=true" run on Fargate

Pod Example:
apiVersion: v1
kind: Pod
metadata:
  name: my-app
  namespace: default
  labels:
    fargate: "true"
spec:
  containers:
  - name: app
    image: nginx:latest

This pod runs on Fargate (matches profile)
```

---

## Fargate Spot ⭐⭐⭐⭐

### What is Fargate Spot?
```
- Run Fargate tasks on spare capacity
- Up to 70% discount
- Can be interrupted (2-minute warning)
- Best for fault-tolerant workloads

Use Cases:
✅ Batch processing
✅ CI/CD pipelines
✅ Data processing
✅ Fault-tolerant applications

Not Suitable For:
❌ Long-running critical applications
❌ Stateful applications
❌ Applications that can't handle interruptions

Configuration:
Capacity Provider Strategy:
- Base: 2 (always 2 on-demand)
- Weight: 1 (Fargate), 4 (Fargate Spot)

Result: 80% on Spot, 20% on-demand (after base)
```

---

## Fargate Storage ⭐⭐⭐⭐⭐

### Ephemeral Storage ⭐⭐⭐⭐
```
What is Ephemeral Storage?
- Temporary storage
- 20 GB default
- Up to 200 GB configurable
- Lost when task stops

Use Cases:
✅ Temporary files
✅ Cache
✅ Scratch space

Configuration:
{
  "ephemeralStorage": {
    "sizeInGiB": 100
  }
}
```

### EFS Integration ⭐⭐⭐⭐⭐
```
What is EFS Integration?
- Mount EFS file system to Fargate tasks
- Persistent storage
- Shared across tasks
- Multi-AZ

Use Cases:
✅ Persistent data
✅ Shared storage
✅ Content management
✅ Machine learning models

Example Task Definition:
{
  "volumes": [
    {
      "name": "efs-volume",
      "efsVolumeConfiguration": {
        "fileSystemId": "fs-12345678",
        "transitEncryption": "ENABLED",
        "authorizationConfig": {
          "accessPointId": "fsap-12345678",
          "iam": "ENABLED"
        }
      }
    }
  ],
  "containerDefinitions": [
    {
      "name": "app",
      "mountPoints": [
        {
          "sourceVolume": "efs-volume",
          "containerPath": "/mnt/efs",
          "readOnly": false
        }
      ]
    }
  ]
}

Benefits:
✅ Persistent across task restarts
✅ Shared between tasks
✅ Multi-AZ availability
✅ Automatic backups (EFS)
```

---

## When to Use Fargate ⭐⭐⭐⭐⭐

### ✅ Use Fargate When
- Don't want to manage servers
- Variable workloads (scale to zero)
- Microservices
- Batch jobs
- CI/CD pipelines
- Quick deployments
- Serverless architecture
- Small to medium workloads

### ❌ Don't Use Fargate When
- Need specific instance types (GPU, etc.) → Use EC2
- Very large workloads (cost) → Use EC2 with RIs
- Need host-level access → Use EC2
- Need DaemonSets (EKS) → Use EC2 nodes
- Cost-sensitive long-running (24/7) → Use EC2 with RIs

---

## Fargate vs EC2 Launch Type ⭐⭐⭐⭐⭐ (CRITICAL)

| Factor | Fargate | EC2 Launch Type |
|--------|---------|-----------------|
| **Management** | Serverless (no servers) | Manage EC2 instances |
| **Pricing** | Per task (vCPU + memory) | Per instance (EC2 pricing) |
| **Scaling** | Automatic (per task) | Manual (Auto Scaling Group) |
| **Startup** | Faster (no instance provisioning) | Slower (provision instances) |
| **Cost (variable)** | Lower (pay per use) | Higher (idle capacity) |
| **Cost (24/7)** | Higher | Lower (with RIs) |
| **Control** | Limited | Full control |
| **Use Case** | Variable, serverless | Predictable, long-running |

**Decision Matrix**:
```
Workload Type          | Recommendation
-----------------------|------------------
Variable/Unpredictable | Fargate
Batch jobs             | Fargate (or Fargate Spot)
24/7 production        | EC2 (with RIs)
Need GPU               | EC2
Microservices          | Fargate
Cost-sensitive (long)  | EC2 (with RIs)
Quick deployment       | Fargate
No ops team            | Fargate
```

---

## Keywords to Identify Fargate

- "Serverless containers"
- "No server management"
- "Pay per task"
- "Variable workloads"
- "Microservices"
- "Quick deployment"
- "No infrastructure management"

---

## Common Exam Scenarios ⭐⭐⭐⭐⭐

### Scenario 1: Serverless Containers
**Question**: Run containers without managing any infrastructure

**Answer**: Use AWS Fargate (with ECS or EKS)

**Why**:
- Serverless (no EC2 management)
- AWS manages everything
- Pay per task
- Quick deployment

### Scenario 2: Variable Workload
**Question**: Container workload varies from 0 to 100 tasks throughout the day

**Answer**: Use Fargate

**Why**:
- Pay per task (no idle capacity)
- Automatic scaling
- Scale to zero (no cost when idle)
- Cost-effective for variable workloads

### Scenario 3: Persistent Storage for Fargate
**Question**: Fargate tasks need persistent shared storage

**Answer**: Use Fargate with EFS

**Why**:
- EFS provides persistent storage
- Shared across tasks
- Multi-AZ
- Survives task restarts

### Scenario 4: Cost Optimization for Batch Jobs
**Question**: Run fault-tolerant batch processing jobs cost-effectively

**Answer**: Use Fargate Spot

**Why**:
- Up to 70% discount
- Suitable for fault-tolerant workloads
- Batch jobs can handle interruptions
- Cost optimization

---

## Fargate Best Practices ⭐⭐⭐⭐⭐

### Design
```
✅ Right-size tasks (CPU and memory)
✅ Use EFS for persistent storage
✅ Use private subnets (security)
✅ Use task roles (IAM)
✅ Design for stateless (ephemeral storage)
```

### Security
```
✅ Use private subnets
✅ Use security groups per task
✅ Use task roles (not hardcoded credentials)
✅ Use Secrets Manager for secrets
✅ Enable encryption in transit (EFS)
✅ Scan images for vulnerabilities
```

### Performance
```
✅ Right-size CPU and memory
✅ Use CloudWatch Container Insights
✅ Monitor task metrics
✅ Optimize container images (smaller = faster startup)
✅ Use EFS with provisioned throughput (if needed)
```

### Cost Optimization
```
✅ Right-size tasks (don't over-provision)
✅ Use Fargate Spot for fault-tolerant workloads
✅ Scale to zero when not in use
✅ Monitor with Cost Explorer
✅ Use appropriate CPU/memory combinations
✅ Consider EC2 for 24/7 workloads
```

---

## Fargate Pricing

### Pricing Model
```
Charged per task:
- vCPU-hour: $0.04048 per vCPU per hour
- GB-hour: $0.004445 per GB per hour

Fargate Spot (up to 70% discount):
- vCPU-hour: ~$0.01214 per vCPU per hour
- GB-hour: ~$0.001334 per GB per hour

Example 1: Small Task (0.25 vCPU, 0.5 GB)
vCPU: 0.25 × $0.04048 = $0.01012
Memory: 0.5 × $0.004445 = $0.002223
Total: $0.012343 per hour

Running 24/7 for 30 days:
$0.012343 × 24 × 30 = $8.89/month

Example 2: Medium Task (1 vCPU, 2 GB)
vCPU: 1 × $0.04048 = $0.04048
Memory: 2 × $0.004445 = $0.00889
Total: $0.04937 per hour

Running 24/7 for 30 days:
$0.04937 × 24 × 30 = $35.55/month

Example 3: Batch Job (1 vCPU, 2 GB, 2 hours/day)
$0.04937 × 2 × 30 = $2.96/month

Comparison with EC2:
t3.small (2 vCPU, 2 GB): $0.0208/hour = $14.98/month (24/7)
Fargate (1 vCPU, 2 GB): $0.04937/hour = $35.55/month (24/7)

Fargate more expensive for 24/7, but:
✅ No management overhead
✅ No idle capacity
✅ Better for variable workloads
```

---

## Fargate Limitations

- **CPU/Memory combinations**: Limited to specific combinations
- **Ephemeral storage**: Max 200 GB
- **Task startup**: Slightly slower than EC2 (cold start)
- **No host access**: Can't access underlying host
- **No privileged containers**: Security restriction
- **No DaemonSets**: (EKS) Can't run on every node

---

## Fargate Pros & Cons

**Pros**:
- Serverless (no infrastructure management)
- Automatic scaling
- Pay per task (no idle capacity)
- Fast deployment
- Integrated with ECS and EKS
- Secure (isolated tasks)
- No patching required

**Cons**:
- More expensive than EC2 (for 24/7 workloads)
- Limited CPU/memory combinations
- Cold start latency
- No host-level access
- Limited to specific use cases

---

# Amazon ECR (Elastic Container Registry)
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐⭐ (CRITICAL)

### What is ECR?
```
- Managed Docker container registry
- Store, manage, and deploy container images
- Integrated with ECS and EKS
- Private and public repositories
- Secure (encryption, IAM)
```

---

## ECR Features ⭐⭐⭐⭐⭐

### 1. Private Repositories ⭐⭐⭐⭐⭐
```
What are Private Repositories?
- Private container image storage
- IAM-based access control
- Encrypted at rest and in transit
- Lifecycle policies

Use Cases:
✅ Store proprietary images
✅ Internal applications
✅ Secure image storage

Example:
Repository: my-app
URI: 123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app
Images:
├─ my-app:latest
├─ my-app:v1.0.0
└─ my-app:v1.0.1
```

### 2. Public Repositories (ECR Public) ⭐⭐⭐
```
What are Public Repositories?
- Publicly accessible images
- Share with community
- No AWS account needed to pull

Use Cases:
✅ Open source projects
✅ Public tools
✅ Community sharing

Example:
Repository: public.ecr.aws/myorg/my-app
Anyone can pull: docker pull public.ecr.aws/myorg/my-app:latest
```

### 3. Image Scanning ⭐⭐⭐⭐⭐
```
What is Image Scanning?
- Scan images for vulnerabilities
- Identify security issues
- CVE (Common Vulnerabilities and Exposures) database

Types:
1. Basic Scanning (Free):
   - On push or on-demand
   - Common vulnerabilities

2. Enhanced Scanning (Paid):
   - Continuous scanning
   - OS and programming language vulnerabilities
   - Integration with Amazon Inspector

Configuration:
- Scan on push (automatic)
- Manual scan (on-demand)

Example:
Image: my-app:v1.0.0
Scan Results:
├─ Critical: 2 vulnerabilities
├─ High: 5 vulnerabilities
├─ Medium: 10 vulnerabilities
└─ Low: 15 vulnerabilities

Action: Fix critical vulnerabilities before deployment
```

### 4. Lifecycle Policies ⭐⭐⭐⭐⭐
```
What are Lifecycle Policies?
- Automatically clean up old images
- Reduce storage costs
- Rule-based

Example Policy:
{
  "rules": [
    {
      "rulePriority": 1,
      "description": "Keep last 10 images",
      "selection": {
        "tagStatus": "any",
        "countType": "imageCountMoreThan",
        "countNumber": 10
      },
      "action": {
        "type": "expire"
      }
    }
  ]
}

Result: Only keep 10 most recent images, delete older ones

Common Policies:
✅ Keep last N images
✅ Delete images older than X days
✅ Keep only tagged images
✅ Delete untagged images after X days
```

### 5. Image Replication ⭐⭐⭐⭐
```
What is Image Replication?
- Replicate images across regions
- Replicate images across accounts
- Automatic or manual

Use Cases:
✅ Multi-region deployments
✅ Disaster recovery
✅ Reduce latency (regional copies)
✅ Cross-account sharing

Example:
Source: us-east-1 (123456789012)
Destinations:
├─ us-west-2 (same account)
├─ eu-west-1 (same account)
└─ us-east-1 (different account: 987654321098)

Configuration:
- Replication rules
- Filters (repository prefix, tags)
- Automatic replication on push
```

---

## ECR Integration ⭐⭐⭐⭐⭐

### ECR with ECS ⭐⭐⭐⭐⭐
```
Integration:
1. Store images in ECR
2. Task definition references ECR image
3. ECS pulls image from ECR
4. ECS runs container

Task Definition:
{
  "containerDefinitions": [
    {
      "name": "app",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:latest",
      "cpu": 256,
      "memory": 512
    }
  ]
}

IAM Permissions:
- Task execution role needs ECR permissions
- ecr:GetAuthorizationToken
- ecr:BatchCheckLayerAvailability
- ecr:GetDownloadUrlForLayer
- ecr:BatchGetImage
```

### ECR with EKS ⭐⭐⭐⭐
```
Integration:
1. Store images in ECR
2. Kubernetes deployment references ECR image
3. EKS pulls image from ECR
4. EKS runs pod

Kubernetes Deployment:
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: app
        image: 123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:latest

IAM Permissions:
- Node IAM role needs ECR permissions
- Or use IAM roles for service accounts (IRSA)
```

---

## ECR Security ⭐⭐⭐⭐⭐

### Encryption ⭐⭐⭐⭐
```
Encryption at Rest:
- AES-256 encryption
- AWS managed keys (default)
- Customer managed keys (KMS)

Encryption in Transit:
- HTTPS/TLS
- Automatic
```

### Access Control ⭐⭐⭐⭐⭐
```
IAM Policies:
- Control who can push/pull images
- Repository-level permissions
- Tag-based permissions

Example IAM Policy:
{
  "Effect": "Allow",
  "Action": [
    "ecr:GetDownloadUrlForLayer",
    "ecr:BatchGetImage",
    "ecr:BatchCheckLayerAvailability"
  ],
  "Resource": "arn:aws:ecr:us-east-1:123456789012:repository/my-app"
}

Repository Policies:
- Resource-based policies
- Cross-account access
- Fine-grained control

Example Repository Policy:
{
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::987654321098:root"
  },
  "Action": [
    "ecr:GetDownloadUrlForLayer",
    "ecr:BatchGetImage"
  ]
}

Result: Account 987654321098 can pull images
```

---

## When to Use ECR ⭐⭐⭐⭐⭐

### ✅ Use ECR When
- Store Docker images on AWS
- Integrate with ECS/EKS
- Need private registry
- Need image scanning
- Need lifecycle management
- AWS-native solution preferred

### ❌ Don't Use ECR When
- Need public registry only → Use Docker Hub
- Multi-cloud registry → Use Docker Hub or other

---

## Keywords to Identify ECR

- "Container registry"
- "Docker images"
- "Store container images"
- "Private registry"
- "Image scanning"
- "Container image storage"

---

## Common Exam Scenarios ⭐⭐⭐⭐⭐

### Scenario 1: Store Private Container Images
**Question**: Store proprietary Docker images securely for ECS

**Answer**: Use Amazon ECR

**Why**:
- Private registry
- Integrated with ECS
- Encrypted
- IAM access control

### Scenario 2: Scan Images for Vulnerabilities
**Question**: Automatically scan container images for security vulnerabilities

**Answer**: Enable ECR image scanning

**Why**:
- Automatic scanning on push
- Identifies vulnerabilities
- Security best practice
- Integrated with ECR

### Scenario 3: Clean Up Old Images
**Question**: Automatically delete old container images to reduce costs

**Answer**: Use ECR lifecycle policies

**Why**:
- Automatic cleanup
- Rule-based
- Reduce storage costs
- No manual intervention

### Scenario 4: Multi-Region Deployment
**Question**: Deploy containers in multiple regions with low latency

**Answer**: Use ECR image replication

**Why**:
- Replicate images to multiple regions
- Reduce pull latency
- Automatic replication
- Regional availability

---

## ECR Best Practices ⭐⭐⭐⭐⭐

### Security
```
✅ Enable image scanning (on push)
✅ Use IAM policies (least privilege)
✅ Enable encryption with KMS
✅ Use private repositories
✅ Scan images before deployment
✅ Use repository policies for cross-account
```

### Operations
```
✅ Use lifecycle policies (clean up old images)
✅ Tag images properly (versioning)
✅ Use image replication (multi-region)
✅ Monitor with CloudWatch
✅ Use immutable tags (prevent overwrites)
```

### Cost Optimization
```
✅ Use lifecycle policies (delete old images)
✅ Delete unused repositories
✅ Monitor storage usage
✅ Use image compression
```

---

## ECR Pricing

### Pricing Components
```
Storage:
- $0.10 per GB per month

Data Transfer:
- IN: Free
- OUT to Internet: Standard rates ($0.09/GB)
- OUT to EC2 (same region): Free
- OUT to other regions: $0.02/GB

Example:
100 GB images stored: 100 × $0.10 = $10/month
1 TB data transfer OUT: 1,000 × $0.09 = $90

Image Scanning:
- Basic: Free
- Enhanced: $0.09 per image scan
```

---

## ECR Limitations

- **Repository limit**: 10,000 per account per region (soft limit)
- **Image size**: 10 GB maximum per layer
- **Lifecycle policy rules**: 50 per repository
- **Replication rules**: 25 per registry

---

## ECR Pros & Cons

**Pros**:
- Fully managed
- Integrated with ECS/EKS
- Secure (encryption, IAM)
- Image scanning
- Lifecycle policies
- Image replication
- High availability

**Cons**:
- AWS-only (not multi-cloud)
- Cost (storage + data transfer)
- Learning curve (policies)

---

# AWS App Runner
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐

### What is App Runner?
```
- Fully managed service for containerized web apps
- Deploy from source code or container image
- Automatic scaling
- Load balancing
- HTTPS
- Simplest way to run containers
```

### Key Features ⭐⭐⭐
```
✅ Deploy from source code (GitHub) or container image (ECR)
✅ Automatic builds (from source code)
✅ Automatic scaling (0 to N)
✅ Load balancing (built-in)
✅ HTTPS (automatic certificate)
✅ Custom domains
✅ VPC integration
✅ Health checks

Use Cases:
✅ Web applications
✅ APIs
✅ Microservices
✅ Quick deployments
```

---

## App Runner vs ECS/EKS ⭐⭐⭐⭐

| Feature | App Runner | ECS/EKS |
|---------|-----------|---------|
| **Complexity** | Simplest | More complex |
| **Control** | Limited | Full control |
| **Use Case** | Web apps, APIs | Any containerized workload |
| **Scaling** | Automatic | Configure Auto Scaling |
| **Load Balancing** | Built-in | Configure ALB/NLB |
| **HTTPS** | Automatic | Configure ACM + ALB |
| **Pricing** | Simple (per vCPU + memory) | Complex (multiple components) |

**Key Exam Tip**:
- **Simple web app/API, quick deployment** → App Runner
- **Complex workloads, full control** → ECS/EKS

---

## When to Use App Runner ⭐⭐⭐

### ✅ Use App Runner When
- Simple web application or API
- Want quickest deployment
- Don't need complex orchestration
- Automatic scaling needed
- Don't want to manage infrastructure

### ❌ Don't Use App Runner When
- Need complex orchestration → Use ECS/EKS
- Need full control → Use ECS/EKS
- Batch processing → Use ECS/Fargate
- Non-web workloads → Use ECS/EKS

---

## App Runner Pricing

```
Compute:
- $0.064 per vCPU-hour
- $0.007 per GB-hour

Example (1 vCPU, 2 GB, 24/7):
vCPU: 1 × $0.064 × 24 × 30 = $46.08
Memory: 2 × $0.007 × 24 × 30 = $10.08
Total: $56.16/month

Note: Simpler pricing than ECS/EKS (all-in-one)
```

---

# Container Services Comparison 

>⭐⭐⭐⭐⭐ (CRITICAL)

[BackToTop](#table-of-contents)
## Complete Comparison Matrix

| Feature | ECS (EC2) | ECS (Fargate) | EKS (EC2) | EKS (Fargate) | App Runner |
|---------|-----------|---------------|-----------|---------------|------------|
| **Management** | Manage instances | Serverless | Manage instances | Serverless | Fully managed |
| **Orchestrator** | AWS proprietary | AWS proprietary | Kubernetes | Kubernetes | AWS proprietary |
| **Complexity** | Moderate | Low | High | Moderate | Very low |
| **Control** | High | Medium | High | Medium | Low |
| **Portability** | Low | Low | High | High | Low |
| **Control Plane Cost** | Free | Free | $73/month | $73/month | Included |
| **Use Case** | Long-running, control | Variable, serverless | Kubernetes, portable | Kubernetes, serverless | Simple web apps |
| **Learning Curve** | Moderate | Low | Steep | Moderate | Very low |

---

## Decision Tree: Which Container Service? 
>⭐⭐⭐⭐⭐

[BackToTop](#table-of-contents)


```
Need containers on AWS?

├─ Need Kubernetes?
│  ├─ Yes → EKS
│  │  ├─ Want to manage nodes? → EKS with EC2
│  │  └─ Serverless? → EKS with Fargate
│  │
│  └─ No → Continue
│
├─ Simple web app/API?
│  └─ Yes → App Runner
│
├─ Want serverless?
│  └─ Yes → ECS with Fargate
│
├─ Need full control?
│  └─ Yes → ECS with EC2
│
└─ Cost-sensitive (24/7)?
   └─ Yes → ECS with EC2 (use Reserved Instances)
```

---

## Use Case Matrix 

⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

| Use Case | Recommended Service | Why |
|----------|-------------------|-----|
| **Microservices (AWS-native)** | ECS with Fargate | Serverless, simple, AWS-integrated |
| **Microservices (portable)** | EKS | Kubernetes standard, portable |
| **Batch processing** | ECS with Fargate | Serverless, pay per job |
| **Long-running (24/7)** | ECS with EC2 | Cost-effective with RIs |
| **Simple web app** | App Runner | Simplest, fastest deployment |
| **Machine learning** | ECS with EC2 (GPU) | GPU instance support |
| **CI/CD pipelines** | ECS with Fargate | Serverless, variable workload |
| **Existing Kubernetes** | EKS | Kubernetes compatibility |
| **Multi-cloud** | EKS | Kubernetes portability |
| **Variable workload** | ECS with Fargate | Pay per use, scale to zero |
| **High control needed** | ECS with EC2 | Full instance control |
| **Quick prototype** | App Runner | Fastest deployment |

---

# Critical Exam Scenarios - Containers 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
## Scenario Matrix

| Question Type | Answer | Why |
|---------------|--------|-----|
| "Run containers without managing servers" | ECS with Fargate or EKS with Fargate | Serverless |
| "Need Kubernetes on AWS" | EKS | Managed Kubernetes |
| "Portable containers (multi-cloud)" | EKS | Kubernetes standard |
| "Simple web app, fastest deployment" | App Runner | Simplest service |
| "Cost-effective 24/7 containers" | ECS with EC2 + Reserved Instances | Lower cost for long-running |
| "Variable workload, scale to zero" | ECS with Fargate | Pay per use |
| "Batch processing jobs" | ECS with Fargate (or Fargate Spot) | Serverless, cost-effective |
| "Persistent storage for containers" | ECS/EKS with EFS | Shared persistent storage |
| "Store Docker images privately" | Amazon ECR | Private registry |
| "Scan images for vulnerabilities" | ECR image scanning | Security |
| "GPU workloads" | ECS with EC2 (GPU instances) | Specific instance types |
| "Existing Kubernetes workloads" | EKS | Kubernetes compatibility |
| "Microservices with load balancing" | ECS Service with ALB | Automatic load balancing |
| "Auto-scale containers based on CPU" | ECS Service Auto Scaling | Automatic scaling |
| "Serverless Kubernetes pods" | EKS with Fargate | Serverless K8s |

---

# Advanced Container Patterns 
⭐⭐⭐⭐
[BackToTop](#table-of-contents)
## Pattern 1: Microservices Architecture ⭐⭐⭐⭐⭐

### Architecture
```
Internet
    ↓
Application Load Balancer
    ↓
┌─────────────┼─────────────┐
↓             ↓             ↓
User Service  Order Service  Payment Service
(ECS Fargate) (ECS Fargate)  (ECS Fargate)
    ↓             ↓             ↓
User DB       Order DB       Payment DB
(RDS)         (RDS)          (RDS)

Configuration:
- Each service: Separate ECS service
- Each service: Own task definition
- Each service: Own database
- ALB: Path-based routing
  - /users/* → User Service
  - /orders/* → Order Service
  - /payments/* → Payment Service

Benefits:
✅ Independent scaling
✅ Independent deployment
✅ Fault isolation
✅ Technology flexibility
```

## Pattern 2: Batch Processing ⭐⭐⭐⭐

### Architecture
```
S3 Bucket (data uploaded)
    ↓
EventBridge (S3 event)
    ↓
ECS Task (Fargate)
    ↓
Process data
    ↓
Store results in S3/DynamoDB

Configuration:
- Fargate task: Runs on-demand
- Auto-scaling: Not needed (one task per job)
- Cost: Pay only when processing

Use Cases:
✅ Data transformation
✅ Image processing
✅ Video transcoding
✅ ETL jobs
```

## Pattern 3: CI/CD Pipeline ⭐⭐⭐⭐

### Architecture
```
Code Commit (GitHub)
    ↓
CodePipeline
    ↓
CodeBuild (build Docker image)
    ↓
Push to ECR
    ↓
ECS Service (rolling update)
    ↓
New tasks deployed

Configuration:
- CodeBuild: Build and push image to ECR
- ECS Service: Rolling update strategy
- Blue/Green deployment (optional)

Benefits:
✅ Automated deployment
✅ Zero-downtime updates
✅ Rollback capability
```

## Pattern 4: Hybrid Architecture (ECS + Lambda) ⭐⭐⭐⭐

### Architecture
```
API Gateway
    ↓
┌───────────┼───────────┐
↓                       ↓
Lambda                  ALB → ECS Fargate
(lightweight APIs)      (heavy processing)

Use Cases:
- Lambda: Simple, quick APIs
- ECS: Complex, long-running processes

Benefits:
✅ Cost optimization (Lambda for simple tasks)
✅ Flexibility (right tool for right job)
✅ Scalability
```

## Pattern 5: Multi-Region Deployment ⭐⭐⭐⭐

### Architecture
```
Route 53 (latency-based routing)
    ↓
┌───────────┼───────────┐
↓                       ↓
us-east-1               eu-west-1
├─ ECS Cluster          ├─ ECS Cluster
├─ ECR (replicated)     ├─ ECR (replicated)
├─ RDS (primary)        └─ RDS (read replica)

Configuration:
- ECR replication: Automatic image replication
- Route 53: Route to nearest region
- RDS: Cross-region read replicas

Benefits:
✅ Low latency globally
✅ High availability
✅ Disaster recovery
```

---

# Container Security Best Practices 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
## Image Security ⭐⭐⭐⭐⭐
```
✅ Scan images for vulnerabilities (ECR scanning)
✅ Use minimal base images (Alpine, distroless)
✅ Don't run as root user
✅ Use specific image tags (not :latest)
✅ Sign images (Docker Content Trust)
✅ Regularly update base images
✅ Remove unnecessary packages
✅ Use multi-stage builds (smaller images)

Example Dockerfile (secure):
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
WORKDIR /app
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs . .
USER nodejs
EXPOSE 3000
CMD ["node", "server.js"]

Security features:
✅ Multi-stage build (smaller final image)
✅ Alpine base (minimal)
✅ Non-root user
✅ Specific ownership
```

## Runtime Security ⭐⭐⭐⭐⭐
```
✅ Use IAM roles (not hardcoded credentials)
✅ Use Secrets Manager/Parameter Store for secrets
✅ Use private subnets
✅ Use security groups (least privilege)
✅ Enable encryption in transit (TLS)
✅ Use VPC endpoints (private AWS service access)
✅ Enable CloudWatch Logs (audit trail)
✅ Use read-only root filesystem (when possible)
✅ Limit container capabilities

Task Definition Security:
{
  "containerDefinitions": [
    {
      "name": "app",
      "image": "my-app:v1.0.0",
      "readonlyRootFilesystem": true,
      "user": "1001:1001",
      "linuxParameters": {
        "capabilities": {
          "drop": ["ALL"]
        }
      },
      "secrets": [
        {
          "name": "DB_PASSWORD",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:123456789012:secret:db-password"
        }
      ]
    }
  ]
}
```

## Network Security ⭐⭐⭐⭐⭐
```
✅ Use private subnets for containers
✅ Use security groups (task-level with awsvpc)
✅ Use NACLs (subnet-level)
✅ Use VPC endpoints (no Internet for AWS services)
✅ Enable VPC Flow Logs
✅ Use AWS WAF (with ALB)
✅ Use Shield (DDoS protection)

Example Security Group:
Inbound:
- Port 80 from ALB security group only
- No direct Internet access

Outbound:
- Port 443 to VPC endpoints (S3, DynamoDB, etc.)
- Port 3306 to RDS security group
- No direct Internet access (use VPC endpoints)
```

---

# Container Monitoring and Logging 

⭐⭐⭐⭐⭐

[BackToTop](#table-of-contents)
## CloudWatch Container Insights ⭐⭐⭐⭐⭐
```
What is Container Insights?
- Enhanced monitoring for containers
- Metrics and logs
- Performance monitoring
- Troubleshooting

Metrics Collected:
✅ CPU utilization (cluster, service, task)
✅ Memory utilization
✅ Network (bytes in/out)
✅ Disk I/O
✅ Task count
✅ Service count

Enable for ECS:
aws ecs update-cluster-settings \
  --cluster my-cluster \
  --settings name=containerInsights,value=enabled

Enable for EKS:
- Install CloudWatch agent as DaemonSet
- Configure with Helm or kubectl

Benefits:
✅ Unified view (cluster → service → task)
✅ Performance monitoring
✅ Troubleshooting
✅ Capacity planning
✅ Cost optimization
```

## Application Logging ⭐⭐⭐⭐⭐
```
Log Drivers:

1. awslogs (Recommended):
   - Send logs to CloudWatch Logs
   - Centralized logging
   - Query with Logs Insights

Configuration:
{
  "logConfiguration": {
    "logDriver": "awslogs",
    "options": {
      "awslogs-group": "/ecs/my-app",
      "awslogs-region": "us-east-1",
      "awslogs-stream-prefix": "ecs"
    }
  }
}

2. splunk:
   - Send logs to Splunk
   - Enterprise logging

3. fluentd:
   - Flexible log routing
   - Multiple destinations

4. awsfirelens:
   - Route logs to multiple destinations
   - Based on Fluent Bit/Fluentd

Best Practice: Use awslogs for simplicity
```

## Distributed Tracing ⭐⭐⭐⭐
```
AWS X-Ray:
- Trace requests across microservices
- Identify bottlenecks
- Visualize service map

Integration:
1. Add X-Ray daemon as sidecar container
2. Instrument application code
3. View traces in X-Ray console

Example Task Definition:
{
  "containerDefinitions": [
    {
      "name": "app",
      "image": "my-app:latest"
    },
    {
      "name": "xray-daemon",
      "image": "amazon/aws-xray-daemon",
      "cpu": 32,
      "memoryReservation": 256,
      "portMappings": [
        {
          "containerPort": 2000,
          "protocol": "udp"
        }
      ]
    }
  ]
}

Benefits:
✅ End-to-end request tracing
✅ Performance analysis
✅ Identify errors
✅ Service dependencies
```

---

# Container Cost Optimization ⭐⭐⭐⭐⭐

## Cost Optimization Strategies ⭐⭐⭐⭐⭐

### 1. Right-Sizing ⭐⭐⭐⭐⭐
```
Problem: Over-provisioned resources

Solution:
✅ Monitor actual CPU/memory usage
✅ Adjust task CPU/memory
✅ Use CloudWatch Container Insights
✅ Start small, scale up as needed

Example:
Current: 2 vCPU, 4 GB memory
Actual usage: 0.5 vCPU, 1 GB memory
Optimized: 1 vCPU, 2 GB memory
Savings: 50% cost reduction
```

### 2. Fargate Spot ⭐⭐⭐⭐⭐
```
What is Fargate Spot?
- Up to 70% discount
- Spare capacity
- Can be interrupted

Use Cases:
✅ Batch processing
✅ CI/CD pipelines
✅ Fault-tolerant workloads
✅ Development/testing

Configuration:
Capacity Provider Strategy:
- Base: 2 (on-demand)
- Weight: 1 (Fargate), 4 (Fargate Spot)

Result: 80% on Spot, 20% on-demand

Savings: ~56% overall (0.8 × 70% + 0.2 × 0%)
```

### 3. EC2 with Reserved Instances ⭐⭐⭐⭐⭐
```
For 24/7 workloads:
- Use ECS with EC2 launch type
- Purchase Reserved Instances
- Up to 72% discount (3-year RI)

Example:
Fargate (1 vCPU, 2 GB, 24/7): $35.55/month
EC2 t3.small (2 vCPU, 2 GB, 24/7): $14.98/month
EC2 t3.small (3-year RI): $4.20/month

Savings: 88% with RI vs Fargate
```

### 4. Scale to Zero ⭐⭐⭐⭐
```
For variable workloads:
- Use Fargate (pay per task)
- Scale to zero when idle
- No idle capacity costs

Example:
Workload: 8 hours/day, 5 days/week
Fargate: 8 × 5 × 4 = 160 hours/month
EC2: 24 × 30 = 720 hours/month

Fargate cost: 160 hours × $0.04937 = $7.90
EC2 cost: 720 hours × $0.0208 = $14.98

Savings: 47% with Fargate (variable workload)
```

### 5. Image Optimization ⭐⭐⭐⭐
```
Optimize container images:
✅ Use minimal base images (Alpine)
✅ Multi-stage builds
✅ Remove unnecessary files
✅ Compress layers

Benefits:
✅ Faster startup (smaller images)
✅ Lower storage costs (ECR)
✅ Lower data transfer costs
✅ Better performance

Example:
Before: 1 GB image
After: 100 MB image (10x smaller)

Savings:
- ECR storage: 90% reduction
- Pull time: 10x faster
- Data transfer: 90% reduction
```

### 6. Lifecycle Policies (ECR) ⭐⭐⭐⭐
```
Clean up old images:
✅ Keep only last N images
✅ Delete images older than X days
✅ Delete untagged images

Example:
Before: 1,000 images (100 GB)
After: 50 images (5 GB)

Savings: 95% ECR storage cost
```

---

# Container Troubleshooting Guide ⭐⭐⭐⭐

## Common Issues and Solutions

### Issue 1: Task Fails to Start
```
Symptoms:
- Task stuck in PENDING
- Task fails immediately

Troubleshooting:
1. ✅ Check task definition (valid CPU/memory)
2. ✅ Check IAM roles (task execution role)
3. ✅ Check ECR permissions (can pull image?)
4. ✅ Check image exists in ECR
5. ✅ Check subnet has available IPs
6. ✅ Check security group allows outbound (pull image)
7. ✅ Check CloudWatch Logs for errors

Common Causes:
❌ Invalid CPU/memory combination (Fargate)
❌ Missing IAM permissions
❌ Image not found in ECR
❌ No available IPs in subnet
❌ Security group blocks outbound
```

### Issue 2: Task Fails Health Check
```
Symptoms:
- Task starts but marked unhealthy
- Task repeatedly restarted

Troubleshooting:
1. ✅ Check health check configuration
2. ✅ Check application is listening on correct port
3. ✅ Check health check path returns 200
4. ✅ Check grace period (enough time to start?)
5. ✅ Check security group allows health check
6. ✅ Check application logs

Common Causes:
❌ Health check path incorrect
❌ Application not ready (increase grace period)
❌ Application listening on wrong port
❌ Security group blocks health check
```

### Issue 3: Cannot Pull Image from ECR
```
Symptoms:
- "CannotPullContainerError"
- Task fails to start

Troubleshooting:
1. ✅ Check task execution role has ECR permissions
2. ✅ Check image URI is correct
3. ✅ Check image exists in ECR
4. ✅ Check region matches
5. ✅ Check VPC has route to Internet or VPC endpoint

Common Causes:
❌ Missing ECR permissions
❌ Incorrect image URI
❌ Image doesn't exist
❌ No Internet access (private subnet without NAT)
```

### Issue 4: High CPU/Memory Usage
```
Symptoms:
- Tasks throttled
- Poor performance
- Tasks OOM killed

Troubleshooting:
1. ✅ Check CloudWatch metrics
2. ✅ Check application logs
3. ✅ Check for memory leaks
4. ✅ Check for inefficient code
5. ✅ Right-size task resources

Solutions:
✅ Increase task CPU/memory
✅ Optimize application code
✅ Fix memory leaks
✅ Use caching
✅ Scale horizontally (more tasks)
```

### Issue 5: Cannot Connect to Task
```
Symptoms:
- Cannot reach application
- Timeout errors

Troubleshooting:
1. ✅ Check task is running
2. ✅ Check security group allows inbound
3. ✅ Check NACL allows traffic
4. ✅ Check route table
5. ✅ Check application is listening
6. ✅ Check load balancer health checks

Common Causes:
❌ Security group blocks traffic
❌ NACL blocks traffic
❌ Application not listening on correct port
❌ Load balancer misconfigured
```

---

# Final Summary: Containers 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)

## Must Know for SAA-C03

### 1. Service Selection ⭐⭐⭐⭐⭐
```
ECS with Fargate:
✅ Serverless containers
✅ AWS-native
✅ Variable workloads
✅ No server management

ECS with EC2:
✅ Full control
✅ Cost-effective (24/7 with RIs)
✅ Specific instance types (GPU)
✅ Long-running workloads

EKS:
✅ Kubernetes
✅ Portable
✅ Multi-cloud
✅ Kubernetes expertise

App Runner:
✅ Simplest
✅ Web apps/APIs
✅ Quick deployment
✅ Fully managed

ECR:
✅ Private registry
✅ Image scanning
✅ Lifecycle policies
✅ AWS integration
```

### 2. Key Concepts ⭐⭐⭐⭐⭐
```
✅ Task Definition: Blueprint for containers
✅ Task: Running instance
✅ Service: Maintains desired count
✅ Cluster: Logical grouping
✅ Launch Type: EC2 or Fargate
✅ Network Mode: awsvpc (recommended)
✅ Task Role: IAM for containers
✅ Task Execution Role: IAM for ECS agent
```

### 3. Common Patterns ⭐⭐⭐⭐⭐
```
✅ Microservices: ECS/EKS with ALB
✅ Batch processing: Fargate (or Fargate Spot)
✅ 24/7 workloads: EC2 with RIs
✅ Variable workloads: Fargate
✅ Persistent storage: EFS
✅ Load balancing: ALB/NLB
✅ Auto scaling: Service Auto Scaling
```

### 4. Security ⭐⭐⭐⭐⭐
```
✅ Scan images (ECR)
✅ Use IAM roles (not credentials)
✅ Use Secrets Manager
✅ Private subnets
✅ Security groups per task
✅ VPC endpoints
✅ Encryption in transit
```

### 5. Cost Optimization ⭐⭐⭐⭐⭐
```
✅ Right-size tasks
✅ Fargate Spot (fault-tolerant)
✅ EC2 with RIs (24/7)
✅ Scale to zero (Fargate)
✅ Optimize images
✅ Lifecycle policies (ECR)
```

---

# Quick Reference Card 
⭐⭐⭐⭐⭐
[BackToTop](#table-of-contents)
## When to Use What

| Scenario | Service | Key Reason |
|----------|---------|------------|
| Serverless containers | ECS Fargate | No server management |
| Kubernetes needed | EKS | Kubernetes standard |
| 24/7 cost optimization | ECS EC2 + RIs | Lower cost |
| Simple web app | App Runner | Simplest deployment |
| Batch processing | ECS Fargate | Pay per job |
| Persistent storage | EFS | Shared, multi-AZ |
| Store images | ECR | Private registry |
| Scan vulnerabilities | ECR scanning | Security |
| Multi-cloud portable | EKS | Kubernetes portable |
| Variable workload | ECS Fargate | Scale to zero |

---

**You've completed the Containers section!** 🐳🚀

**Key Takeaways**:
1. **ECS with Fargate** = Serverless, simple, AWS-native
2. **ECS with EC2** = Control, cost-effective for 24/7
3. **EKS** = Kubernetes, portable, complex
4. **App Runner** = Simplest, web apps only
5. **ECR** = Private registry, scanning, lifecycle

**Most Tested**:
- ECS vs EKS decision
- Fargate vs EC2 launch type
- Task definitions and services
- IAM roles (task role vs execution role)
- Persistent storage (EFS)
- ECR integration

---
### [BackToTop](#table-of-contents)