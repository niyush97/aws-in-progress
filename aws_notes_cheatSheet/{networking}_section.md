# AWS Networking and Content Delivery - SAA-C03 Exam Guide
---
>⚠️ These notes were created using Anthropic's AI Models (Opus 4.5 and 4.6).
---
## Table of Contents
1. [Amazon VPC (Virtual Private Cloud)](#amazon-vpc-virtual-private-cloud)
2. [Subnets, Route Tables, and Internet Gateway](#subnets-route-tables-and-internet-gateway)
3. [NAT Gateway and NAT Instance](#nat-gateway-and-nat-instance)
4. [Security Groups and NACLs](#security-groups-and-nacls)
5. [VPC Peering](#vpc-peering)
6. [VPC Endpoints](#vpc-endpoints)
7. [AWS PrivateLink](#aws-privatelink)
8. [Elastic Load Balancing (ELB)](#elastic-load-balancing-elb)
9. [Amazon Route 53](#amazon-route-53)
10. [Amazon CloudFront](#amazon-cloudfront)
11. [AWS Global Accelerator](#aws-global-accelerator)
12. [AWS Direct Connect](#aws-direct-connect)
13. [AWS Site-to-Site VPN](#aws-site-to-site-vpn)
14. [AWS Client VPN](#aws-client-vpn)
15. [AWS Transit Gateway](#aws-transit-gateway)
16. [Networking Services Summary](#networking-services-summary)
17. [Networking Decision Trees](#networking-decision-trees)
18. [Critical Exam Tips for Networking](#critical-exam-tips-for-networking)
19. [Networking Services Detailed Comparison](#networking-services-detailed-comparison)
20. [Networking Troubleshooting Guide](#networking-troubleshooting-guide)
21. [Networking Best Practices Summary](#networking-best-practices-summary)
22. [Summary: Most Important Networking Concepts](#summary-most-important-networking-concepts)

---

# Amazon VPC (Virtual Private Cloud)

## Core Concepts ⭐⭐⭐⭐⭐ (MOST CRITICAL)
- **Logically isolated network** in AWS cloud
- **Regional resource** (spans all AZs in region)
- **Private IP address range** (CIDR block)
- **Full control** over network configuration
- **Default VPC** provided in each region

## VPC Basics ⭐⭐⭐⭐⭐

### What is a VPC?
```
- Virtual network dedicated to your AWS account
- Logically isolated from other VPCs
- Launch AWS resources (EC2, RDS, etc.) in VPC
- Complete control over:
  - IP address range
  - Subnets
  - Route tables
  - Network gateways
  - Security settings
```

### CIDR Blocks (IP Address Ranges) ⭐⭐⭐⭐⭐
```
VPC CIDR Block:
- IPv4: /16 to /28 (65,536 to 16 IPs)
- IPv6: /56 (fixed size)
- Cannot overlap with other VPCs (if peering)
- Cannot be changed after creation (but can add secondary)

Common Private IP Ranges (RFC 1918):
- 10.0.0.0/8 (10.0.0.0 - 10.255.255.255)
- 172.16.0.0/12 (172.16.0.0 - 172.31.255.255)
- 192.168.0.0/16 (192.168.0.0 - 192.168.255.255)

Example VPC CIDR:
- 10.0.0.0/16 (65,536 IPs)
- 172.31.0.0/16 (65,536 IPs)
- 192.168.0.0/16 (65,536 IPs)
```

### CIDR Notation Quick Reference ⭐⭐⭐⭐⭐
```
/32 = 1 IP (single host)
/28 = 16 IPs
/24 = 256 IPs (common for subnets)
/20 = 4,096 IPs
/16 = 65,536 IPs (common for VPCs)
/8 = 16,777,216 IPs

Formula: 2^(32 - prefix) = number of IPs
Example: /24 = 2^(32-24) = 2^8 = 256 IPs
```

### Default VPC ⭐⭐⭐⭐
```
Characteristics:
- Created automatically in each region
- CIDR: 172.31.0.0/16
- Default subnet in each AZ
- Internet Gateway attached
- Default route to Internet
- Default security group
- Default NACL (allows all traffic)

Use Cases:
✅ Quick testing
✅ Learning AWS
✅ Simple deployments

Production:
❌ Not recommended (use custom VPC)
```

### Custom VPC ⭐⭐⭐⭐⭐
```
Characteristics:
- You define CIDR block
- You create subnets
- You configure routing
- You configure security
- Full control

Use Cases:
✅ Production workloads
✅ Complex architectures
✅ Security requirements
✅ Compliance needs
```

---

## VPC Components ⭐⭐⭐⭐⭐

### 1. Subnets
```
- Subdivision of VPC
- Associated with single AZ
- Public or private
- CIDR block (subset of VPC CIDR)

Example:
VPC: 10.0.0.0/16
├─ Public Subnet (AZ-A): 10.0.1.0/24
├─ Private Subnet (AZ-A): 10.0.2.0/24
├─ Public Subnet (AZ-B): 10.0.3.0/24
└─ Private Subnet (AZ-B): 10.0.4.0/24
```

### 2. Route Tables
```
- Control traffic routing
- Associated with subnets
- Contains routes (destination → target)

Example Routes:
10.0.0.0/16 → local (VPC traffic)
0.0.0.0/0 → igw-xxx (Internet traffic)
```

### 3. Internet Gateway (IGW)
```
- Allows Internet access
- Horizontally scaled, redundant, HA
- One IGW per VPC
- Attached to VPC
```

### 4. NAT Gateway/Instance
```
- Allows private subnets to access Internet
- Outbound only (no inbound from Internet)
- Placed in public subnet
```

### 5. Security Groups
```
- Virtual firewall for instances
- Stateful (return traffic allowed)
- Allow rules only
- Instance level
```

### 6. Network ACLs (NACLs)
```
- Firewall for subnets
- Stateless (must allow return traffic)
- Allow and deny rules
- Subnet level
```

---

# Subnets, Route Tables, and Internet Gateway

[BackToTop](#table-of-contents)

## Subnets ⭐⭐⭐⭐⭐

### Public Subnet ⭐⭐⭐⭐⭐
```
Characteristics:
- Has route to Internet Gateway
- Instances can have public IPs
- Can access Internet directly
- Internet can access instances (if allowed by security)

Route Table:
Destination         Target
10.0.0.0/16        local
0.0.0.0/0          igw-xxx (Internet Gateway)

Use Cases:
✅ Web servers
✅ Load balancers
✅ Bastion hosts
✅ NAT Gateways
```

### Private Subnet ⭐⭐⭐⭐⭐
```
Characteristics:
- No direct route to Internet Gateway
- Instances have private IPs only
- Access Internet via NAT Gateway (if needed)
- Internet cannot access instances directly

Route Table:
Destination         Target
10.0.0.0/16        local
0.0.0.0/0          nat-xxx (NAT Gateway)

Use Cases:
✅ Application servers
✅ Databases
✅ Internal services
✅ Backend systems
```

### Reserved IP Addresses ⭐⭐⭐⭐⭐
```
In every subnet, AWS reserves 5 IPs:

Example: 10.0.1.0/24 (256 IPs)
- 10.0.1.0: Network address
- 10.0.1.1: VPC router
- 10.0.1.2: DNS server
- 10.0.1.3: Reserved for future use
- 10.0.1.255: Network broadcast

Available IPs: 256 - 5 = 251 IPs

Key Exam Tip: Always subtract 5 from total IPs
```

---

## Route Tables ⭐⭐⭐⭐⭐

### How Route Tables Work
```
- Each subnet must be associated with route table
- Route table contains routes (rules)
- Most specific route wins (longest prefix match)
- Local route always present (VPC CIDR)

Route Evaluation:
1. Most specific match (longest prefix)
2. If tie, prefer local route
3. If no match, drop packet
```

### Main Route Table
```
- Default route table for VPC
- Automatically created with VPC
- Subnets without explicit association use main
- Best practice: Don't modify main, create custom
```

### Custom Route Tables
```
- Create for specific routing needs
- Associate with subnets
- Can have multiple custom route tables

Example:
Public Route Table → Public Subnets
Private Route Table → Private Subnets
Database Route Table → Database Subnets
```

### Route Priority Example ⭐⭐⭐⭐
```
Routes in table:
10.0.0.0/16 → local
10.0.1.0/24 → vgw-xxx
0.0.0.0/0 → igw-xxx

Traffic to 10.0.1.50:
- Matches 10.0.0.0/16 (local)
- Matches 10.0.1.0/24 (vgw-xxx) ← Most specific, wins
- Matches 0.0.0.0/0 (igw-xxx)

Result: Traffic goes to vgw-xxx
```

---

## Internet Gateway (IGW) ⭐⭐⭐⭐⭐

### What is an Internet Gateway?
```
- Allows communication between VPC and Internet
- Horizontally scaled, redundant, highly available
- No bandwidth constraints
- No availability risk
- Performs NAT for instances with public IPs
```

### How IGW Works
```
Outbound (Instance → Internet):
1. Instance sends packet with private IP
2. IGW translates private IP → public IP (NAT)
3. Packet sent to Internet with public IP

Inbound (Internet → Instance):
1. Packet arrives with public IP
2. IGW translates public IP → private IP
3. Packet delivered to instance with private IP
```

### IGW Requirements ⭐⭐⭐⭐⭐
```
For instance to access Internet via IGW:
1. ✅ IGW attached to VPC
2. ✅ Route table has route to IGW (0.0.0.0/0 → igw-xxx)
3. ✅ Instance has public IP or Elastic IP
4. ✅ Security group allows outbound traffic
5. ✅ NACL allows outbound traffic

Missing any = No Internet access
```

### IGW vs NAT Gateway ⭐⭐⭐⭐⭐
```
Internet Gateway:
- Bidirectional (inbound + outbound)
- For instances with public IPs
- Free
- Managed by AWS

NAT Gateway:
- Outbound only (no inbound from Internet)
- For instances with private IPs only
- Paid ($0.045/hour + data)
- Managed by AWS
```

---

# NAT Gateway and NAT Instance
[BackToTop](#table-of-contents)
## NAT Gateway ⭐⭐⭐⭐⭐ (RECOMMENDED)

### What is NAT Gateway?
```
- Network Address Translation service
- Allows private subnet instances to access Internet
- Outbound only (no inbound from Internet)
- Managed by AWS (highly available)
- Placed in public subnet
```

### How NAT Gateway Works
```
Architecture:
Private Instance → NAT Gateway (public subnet) → Internet Gateway → Internet

Process:
1. Private instance sends packet to NAT Gateway
2. NAT Gateway translates private IP → NAT Gateway IP
3. NAT Gateway sends to Internet via IGW
4. Response comes back to NAT Gateway
5. NAT Gateway translates back to private IP
6. Response delivered to private instance
```

### NAT Gateway Characteristics ⭐⭐⭐⭐⭐
```
Availability:
- Redundant within AZ
- Not redundant across AZs
- Best practice: One NAT Gateway per AZ

Performance:
- Up to 45 Gbps bandwidth
- Automatically scales
- No management needed

Cost:
- $0.045 per hour
- $0.045 per GB processed
- ~$33/month + data transfer

Limitations:
- Cannot be used by instances in same subnet
- Cannot span AZs
- Cannot associate security group (use NACL)
```

### High Availability NAT Gateway ⭐⭐⭐⭐⭐
```
Architecture:
VPC (10.0.0.0/16)
├─ AZ-A
│  ├─ Public Subnet: NAT Gateway A
│  └─ Private Subnet → Route to NAT Gateway A
└─ AZ-B
   ├─ Public Subnet: NAT Gateway B
   └─ Private Subnet → Route to NAT Gateway B

Benefits:
✅ Survives AZ failure
✅ Better performance (local NAT)
✅ No cross-AZ data transfer charges

Cost: 2x NAT Gateway cost
```

---

## NAT Instance ⭐⭐⭐ (LEGACY)

### What is NAT Instance?
```
- EC2 instance configured as NAT
- You manage (not AWS)
- Must disable source/destination check
- Use NAT AMI or configure manually
```

### NAT Instance Characteristics
```
Availability:
- Single instance (single point of failure)
- You manage failover
- Can use Auto Scaling + scripts

Performance:
- Depends on instance type
- Can be bottleneck
- You manage scaling

Cost:
- EC2 instance cost
- Cheaper than NAT Gateway (small workloads)
- More operational overhead

Limitations:
- You manage everything
- Single point of failure
- Performance bottleneck
- Security group management
```

---

## NAT Gateway vs NAT Instance ⭐⭐⭐⭐⭐

| Feature | NAT Gateway | NAT Instance |
|---------|-------------|--------------|
| **Management** | AWS managed | You manage |
| **Availability** | Highly available (within AZ) | Single instance |
| **Bandwidth** | Up to 45 Gbps | Depends on instance type |
| **Maintenance** | None | You patch and maintain |
| **Cost** | $0.045/hour + data | Instance cost |
| **Security Group** | Cannot associate | Can associate |
| **Bastion** | Cannot use | Can use as bastion |
| **Port Forwarding** | Not supported | Supported |
| **Use Case** | Production (recommended) | Cost optimization, special needs |

**Key Exam Tip**: Always choose NAT Gateway unless question specifically requires NAT Instance features (bastion, port forwarding, cost optimization)

---

# Security Groups and NACLs

[BackToTop](#table-of-contents)

## Security Groups ⭐⭐⭐⭐⭐ (CRITICAL)

### What are Security Groups?
```
- Virtual firewall for EC2 instances
- Instance level (not subnet level)
- Stateful (return traffic automatically allowed)
- Allow rules only (no deny rules)
- All rules evaluated (not in order)
```

### Security Group Characteristics ⭐⭐⭐⭐⭐
```
Stateful:
- Outbound request → Inbound response automatically allowed
- Inbound request → Outbound response automatically allowed
- No need to create return traffic rules

Example:
Outbound rule: Allow HTTPS (443) to 0.0.0.0/0
Result: Response traffic automatically allowed (no inbound rule needed)

Default Behavior:
- All inbound traffic DENIED by default
- All outbound traffic ALLOWED by default
- No rules = No inbound access, all outbound allowed
```

### Security Group Rules ⭐⭐⭐⭐⭐
```
Rule Components:
- Type: Protocol (SSH, HTTP, HTTPS, Custom)
- Protocol: TCP, UDP, ICMP
- Port Range: 22, 80, 443, 1024-65535
- Source/Destination: IP, CIDR, Security Group

Example Inbound Rules:
Type        Protocol    Port    Source
SSH         TCP         22      203.0.113.0/24
HTTP        TCP         80      0.0.0.0/0
HTTPS       TCP         443     0.0.0.0/0
MySQL       TCP         3306    sg-12345678 (app server SG)

Example Outbound Rules:
Type        Protocol    Port    Destination
All traffic All         All     0.0.0.0/0 (default)
```

### Security Group Best Practices ⭐⭐⭐⭐⭐
```
1. Least Privilege:
   - Only allow necessary ports
   - Restrict source IPs
   - Use specific protocols

2. Reference Other Security Groups:
   - Instead of IP addresses
   - Automatically updates when instances change
   - More maintainable

Example:
Web Server SG:
- Inbound: Allow 80/443 from 0.0.0.0/0
- Outbound: Allow 3306 to Database SG

Database SG:
- Inbound: Allow 3306 from Web Server SG
- Outbound: Allow all (default)

3. Separate Security Groups by Tier:
   - Web tier SG
   - App tier SG
   - Database tier SG

4. Use Descriptive Names:
   - web-server-sg
   - app-server-sg
   - database-sg
```

---

## Network ACLs (NACLs) ⭐⭐⭐⭐⭐

### What are NACLs?
```
- Firewall for subnets
- Subnet level (not instance level)
- Stateless (must allow return traffic explicitly)
- Allow and deny rules
- Rules evaluated in order (lowest number first)
```

### NACL Characteristics ⭐⭐⭐⭐⭐
```
Stateless:
- Outbound request → Must create inbound rule for response
- Inbound request → Must create outbound rule for response
- Must explicitly allow return traffic

Example:
Outbound rule: Allow HTTPS (443) to 0.0.0.0/0
Inbound rule: Allow ephemeral ports (1024-65535) from 0.0.0.0/0
(Both needed for HTTPS to work)

Default NACL:
- Allows all inbound traffic
- Allows all outbound traffic
- Associated with all subnets by default

Custom NACL:
- Denies all inbound traffic by default
- Denies all outbound traffic by default
- Must explicitly allow traffic
```

### NACL Rules ⭐⭐⭐⭐⭐
```
Rule Components:
- Rule Number: 1-32766 (lower = higher priority)
- Type: Protocol
- Protocol: TCP, UDP, ICMP, All
- Port Range: 22, 80, 443, 1024-65535
- Source/Destination: IP or CIDR
- Allow/Deny: Allow or Deny

Rule Evaluation:
- Rules evaluated in order (lowest number first)
- First match wins (stops evaluation)
- If no match, default deny (implicit)

Example Inbound Rules:
Rule #  Type        Protocol    Port        Source          Allow/Deny
100     HTTP        TCP         80          0.0.0.0/0       ALLOW
200     HTTPS       TCP         443         0.0.0.0/0       ALLOW
300     SSH         TCP         22          203.0.113.0/24  ALLOW
*       All         All         All         0.0.0.0/0       DENY (implicit)

Example Outbound Rules:
Rule #  Type        Protocol    Port        Destination     Allow/Deny
100     HTTP        TCP         80          0.0.0.0/0       ALLOW
200     HTTPS       TCP         443         0.0.0.0/0       ALLOW
300     Ephemeral   TCP         1024-65535  0.0.0.0/0       ALLOW
*       All         All         All         0.0.0.0/0       DENY (implicit)
```

### Ephemeral Ports ⭐⭐⭐⭐⭐
```
What are Ephemeral Ports?
- Temporary ports used for return traffic
- Client chooses random port from range
- Must allow in NACL for return traffic

Port Ranges by OS:
- Linux: 32768-60999
- Windows: 49152-65535
- NAT Gateway: 1024-65535

Best Practice: Allow 1024-65535 (covers all)

Example:
Client (10.0.1.50:54321) → Server (10.0.2.50:80)
Response: Server (10.0.2.50:80) → Client (10.0.1.50:54321)

NACL must allow:
Outbound: Port 80 to server
Inbound: Ports 1024-65535 from server (ephemeral)
```

---

## Security Groups vs NACLs ⭐⭐⭐⭐⭐ (CRITICAL)

| Feature | Security Group | NACL |
|---------|----------------|------|
| **Level** | Instance | Subnet |
| **State** | Stateful | Stateless |
| **Rules** | Allow only | Allow and Deny |
| **Rule Evaluation** | All rules | Order (lowest first) |
| **Return Traffic** | Automatic | Must explicitly allow |
| **Default** | Deny inbound, allow outbound | Allow all (default NACL) |
| **Association** | Instance (multiple SGs) | Subnet (one NACL) |
| **Use Case** | Primary defense | Additional layer, deny specific IPs |

### Defense in Depth ⭐⭐⭐⭐⭐
```
Best Practice: Use both Security Groups and NACLs

Architecture:
Internet → NACL (Subnet level) → Security Group (Instance level) → Instance

Example:
NACL: Deny known malicious IPs
Security Group: Allow only necessary ports from specific sources

Benefits:
✅ Multiple layers of security
✅ NACL can deny (SG cannot)
✅ SG is stateful (easier to manage)
✅ Defense in depth
```

---

## Common Exam Scenarios ⭐⭐⭐⭐⭐

### Scenario 1: Instance Cannot Access Internet
**Question**: EC2 instance in private subnet cannot access Internet

**Troubleshooting Checklist**:
```
1. ✅ NAT Gateway in public subnet?
2. ✅ Route table has route to NAT Gateway (0.0.0.0/0 → nat-xxx)?
3. ✅ NAT Gateway has route to IGW?
4. ✅ Security group allows outbound traffic?
5. ✅ NACL allows outbound traffic?
6. ✅ NACL allows inbound ephemeral ports (1024-65535)?
```

### Scenario 2: Cannot SSH to Instance
**Question**: Cannot SSH to EC2 instance in public subnet

**Troubleshooting Checklist**:
```
1. ✅ Instance has public IP or Elastic IP?
2. ✅ IGW attached to VPC?
3. ✅ Route table has route to IGW (0.0.0.0/0 → igw-xxx)?
4. ✅ Security group allows inbound SSH (port 22) from your IP?
5. ✅ NACL allows inbound SSH (port 22)?
6. ✅ NACL allows outbound ephemeral ports (1024-65535)?
7. ✅ Instance is running?
8. ✅ Correct key pair?
```

### Scenario 3: Block Specific IP Address
**Question**: Block traffic from specific malicious IP address

**Answer**: Use NACL with deny rule

**Why**:
- Security groups cannot deny (allow only)
- NACL can have deny rules
- Place deny rule before allow rules (lower rule number)

**Example**:
```
NACL Inbound Rules:
Rule #  Type    Protocol    Port    Source              Allow/Deny
50      All     All         All     203.0.113.50/32     DENY
100     HTTP    TCP         80      0.0.0.0/0           ALLOW
200     HTTPS   TCP         443     0.0.0.0/0           ALLOW
```

### Scenario 4: Database Access from App Servers Only
**Question**: Database should only accept connections from application servers

**Answer**: Database security group allows inbound from app server security group

**Example**:
```
Database SG Inbound Rules:
Type        Protocol    Port    Source
MySQL       TCP         3306    sg-app-servers

Benefits:
✅ No IP management (instances can change)
✅ Automatic updates
✅ More secure (specific source)
```

---

## VPC Flow Logs ⭐⭐⭐⭐

### What are VPC Flow Logs?
```
- Capture IP traffic information
- For VPC, subnet, or network interface
- Logs to CloudWatch Logs or S3
- Troubleshooting and security analysis
```

### Flow Log Levels
```
1. VPC Level: All ENIs in VPC
2. Subnet Level: All ENIs in subnet
3. ENI Level: Specific network interface

Can create multiple flow logs (different levels)
```

### Flow Log Format
```
Fields:
- version
- account-id
- interface-id
- srcaddr (source IP)
- dstaddr (destination IP)
- srcport (source port)
- dstport (destination port)
- protocol (6=TCP, 17=UDP, 1=ICMP)
- packets
- bytes
- start (timestamp)
- end (timestamp)
- action (ACCEPT or REJECT)
- log-status

Example:
2 123456789012 eni-abc123 10.0.1.5 10.0.2.10 54321 80 6 10 5000 1234567890 1234567900 ACCEPT OK
```

### Use Cases
```
✅ Troubleshoot connectivity issues
✅ Security analysis (detect attacks)
✅ Compliance and audit
✅ Monitor traffic patterns
✅ Identify rejected traffic (security group/NACL)
```

### Flow Logs Limitations
```
❌ Not real-time (delayed)
❌ Cannot capture all traffic:
   - DHCP traffic
   - DNS traffic to Amazon DNS
   - Metadata service (169.254.169.254)
   - Windows license activation
   - Traffic to/from reserved IPs
```

---

# VPC Peering
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐⭐

### What is VPC Peering?
```
- Network connection between two VPCs
- Private connectivity (no Internet)
- Route traffic using private IPs
- Can be in different regions (inter-region)
- Can be in different accounts (cross-account)
```

### VPC Peering Characteristics ⭐⭐⭐⭐⭐
```
Architecture:
VPC A (10.0.0.0/16) ←→ Peering Connection ←→ VPC B (172.31.0.0/16)

Requirements:
✅ Non-overlapping CIDR blocks
✅ Peering connection created
✅ Route tables updated (both VPCs)
✅ Security groups/NACLs allow traffic

Limitations:
❌ Not transitive (no daisy-chaining)
❌ No edge-to-edge routing
❌ One peering connection between two VPCs
```

### Non-Transitive Peering ⭐⭐⭐⭐⭐
```
Scenario:
VPC A ←→ VPC B ←→ VPC C

VPC A can talk to VPC B: ✅
VPC B can talk to VPC C: ✅
VPC A can talk to VPC C: ❌ (not transitive)

Solution:
Create direct peering: VPC A ←→ VPC C
```

### No Edge-to-Edge Routing ⭐⭐⭐⭐
```
Cannot route through peered VPC to:
❌ Internet Gateway
❌ NAT Gateway
❌ VPN connection
❌ Direct Connect

Example:
VPC A (no IGW) ←→ VPC B (has IGW)
VPC A cannot use VPC B's IGW to access Internet
```

---

## VPC Peering Configuration ⭐⭐⭐⭐

### Setup Process
```
1. Create Peering Connection:
   - Requester VPC
   - Accepter VPC
   - Can be same or different account/region

2. Accept Peering Connection:
   - Accepter must accept request
   - Both sides must agree

3. Update Route Tables:
   - VPC A: Add route to VPC B CIDR → pcx-xxx
   - VPC B: Add route to VPC A CIDR → pcx-xxx

4. Update Security Groups:
   - Allow traffic from peer VPC CIDR
   - Or reference peer VPC security group (same region only)

5. Update NACLs (if needed):
   - Allow traffic from peer VPC CIDR
```

### Example Configuration
```
VPC A: 10.0.0.0/16
VPC B: 172.31.0.0/16
Peering Connection: pcx-12345678

VPC A Route Table:
Destination         Target
10.0.0.0/16        local
172.31.0.0/16      pcx-12345678

VPC B Route Table:
Destination         Target
172.31.0.0/16      local
10.0.0.0/16        pcx-12345678

VPC A Security Group:
Inbound: Allow from 172.31.0.0/16

VPC B Security Group:
Inbound: Allow from 10.0.0.0/16
```

---

## When to Use VPC Peering ⭐⭐⭐⭐⭐

### ✅ Use VPC Peering When
- Connect **two VPCs** (simple topology)
- **Private connectivity** needed
- **Low latency** required (same region)
- **Cross-account** connectivity
- **Cross-region** connectivity
- **Cost-effective** (no data transfer charges within same region)

### ❌ Don't Use VPC Peering When
- Need to connect **many VPCs** (>10) → Use Transit Gateway
- Need **transitive routing** → Use Transit Gateway
- Need **centralized management** → Use Transit Gateway
- Need **edge-to-edge routing** → Use Transit Gateway

---

## VPC Peering vs Transit Gateway ⭐⭐⭐⭐⭐

| Feature | VPC Peering | Transit Gateway |
|---------|-------------|-----------------|
| **Topology** | Mesh (point-to-point) | Hub-and-spoke |
| **Scalability** | Low (n*(n-1)/2 connections) | High (n connections) |
| **Transitive** | No | Yes |
| **Management** | Complex (many connections) | Simple (centralized) |
| **Cost** | Lower (no gateway cost) | Higher (gateway + data) |
| **Use Case** | Few VPCs (2-10) | Many VPCs (>10) |

**Example**:
```
5 VPCs with VPC Peering:
- Connections needed: 5*(5-1)/2 = 10 peering connections
- Route table entries: 4 per VPC = 20 total

5 VPCs with Transit Gateway:
- Connections needed: 5 (one per VPC)
- Route table entries: 1 per VPC = 5 total
- Centralized management
```

---

## Keywords to Identify VPC Peering

- "Connect two VPCs"
- "Private connectivity"
- "Cross-account VPC"
- "Cross-region VPC"
- "VPC to VPC"
- "Non-overlapping CIDR"

---

## Common Exam Scenarios

### Scenario 1: Connect Two VPCs 
**Question**: Connect VPC A and VPC B for private communication

**Answer**: Create VPC Peering connection

**Why**:
- Private connectivity (no Internet)
- Low latency
- Cost-effective
- Simple for two VPCs

**Configuration**:
```
1. Create peering connection
2. Accept connection
3. Update route tables in both VPCs
4. Update security groups
```

### Scenario 2: Transitive Routing Needed
**Question**: VPC A needs to access VPC C through VPC B

**Answer**: Cannot use VPC Peering (not transitive). Use Transit Gateway or create direct peering A ↔ C

**Why**:
- VPC Peering is not transitive
- Must create direct connection
- Or use Transit Gateway for hub-and-spoke

### Scenario 3: Access Internet Through Peered VPC
**Question**: VPC A (no IGW) wants to use VPC B's Internet Gateway

**Answer**: Cannot do this with VPC Peering (no edge-to-edge routing)

**Why**:
- VPC Peering doesn't support edge-to-edge routing
- Each VPC needs own IGW or NAT Gateway
- Alternative: Use Transit Gateway with centralized egress

---

# VPC Endpoints
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐⭐ (CRITICAL)

### What are VPC Endpoints?
```
- Private connection to AWS services
- Traffic stays within AWS network (no Internet)
- No Internet Gateway or NAT Gateway needed
- Enhanced security and performance
- Two types: Gateway Endpoints and Interface Endpoints
```

### Why Use VPC Endpoints? ⭐⭐⭐⭐⭐
```
Without VPC Endpoint:
Private Instance → NAT Gateway → IGW → Internet → AWS Service (S3, DynamoDB)
- Goes through Internet
- Requires NAT Gateway ($$$)
- Higher latency
- Less secure

With VPC Endpoint:
Private Instance → VPC Endpoint → AWS Service (S3, DynamoDB)
- Stays within AWS network
- No NAT Gateway needed
- Lower latency
- More secure
- Cost savings
```

---

## Gateway Endpoints ⭐⭐⭐⭐⭐

### What are Gateway Endpoints?
```
- For S3 and DynamoDB only
- Free (no additional charge)
- Target in route table
- Highly available (AWS managed)
- Regional (cannot span regions)
```

### Supported Services
```
✅ Amazon S3
✅ Amazon DynamoDB

That's it! Only these two services.
```

### How Gateway Endpoints Work ⭐⭐⭐⭐⭐
```
Architecture:
Private Instance → Route Table → Gateway Endpoint → S3/DynamoDB

Configuration:
1. Create Gateway Endpoint
2. Select VPC
3. Select service (S3 or DynamoDB)
4. Select route tables
5. AWS automatically adds route

Route Table Entry:
Destination                 Target
pl-12345678 (S3 prefix)    vpce-xxx (Gateway Endpoint)

Result:
- Traffic to S3/DynamoDB goes through endpoint
- No Internet Gateway needed
- No NAT Gateway needed
- Free
```

### Gateway Endpoint Policies ⭐⭐⭐⭐
```
- Control access to service through endpoint
- JSON policy document
- Can restrict to specific buckets/tables
- Can restrict actions

Example S3 Gateway Endpoint Policy:
{
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
      ]
    }
  ]
}

Result: Only access to my-bucket allowed through endpoint
```

---

## Interface Endpoints (AWS PrivateLink) ⭐⭐⭐⭐⭐

### What are Interface Endpoints?
```
- Elastic Network Interface (ENI) with private IP
- For most AWS services (not S3/DynamoDB)
- Powered by AWS PrivateLink
- Charged per hour + data processed
- Can be accessed from on-premises (via VPN/Direct Connect)
```

### Supported Services (Examples)
```
✅ EC2 API
✅ CloudWatch
✅ SNS
✅ SQS
✅ Kinesis
✅ Lambda
✅ ECS
✅ Secrets Manager
✅ Systems Manager
✅ And many more (100+ services)

❌ S3 (use Gateway Endpoint)
❌ DynamoDB (use Gateway Endpoint)
```

### How Interface Endpoints Work ⭐⭐⭐⭐⭐
```
Architecture:
Private Instance → ENI (Interface Endpoint) → AWS Service

Configuration:
1. Create Interface Endpoint
2. Select VPC
3. Select service (e.g., com.amazonaws.us-east-1.ec2)
4. Select subnets (one ENI per subnet/AZ)
5. Select security group
6. Enable private DNS (recommended)

Result:
- ENI created in subnet with private IP
- Traffic to service goes through ENI
- Stays within AWS network
- Can use private DNS names
```

### Private DNS ⭐⭐⭐⭐⭐
```
Without Private DNS:
- Must use endpoint-specific DNS name
- Example: vpce-12345-abcde.ec2.us-east-1.vpce.amazonaws.com
- Application code changes needed

With Private DNS (Enabled):
- Use standard service DNS name
- Example: ec2.us-east-1.amazonaws.com
- No application code changes
- DNS resolves to endpoint private IP

Recommendation: Always enable Private DNS
```

### Interface Endpoint Security ⭐⭐⭐⭐
```
Security Group:
- Attached to ENI
- Controls access to endpoint
- Must allow inbound from instances

Example:
Inbound Rules:
Type        Protocol    Port    Source
HTTPS       TCP         443     10.0.0.0/16 (VPC CIDR)

Endpoint Policy:
- Controls what can be done through endpoint
- Similar to IAM policy

Example:
{
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "ec2:DescribeInstances",
      "Resource": "*"
    }
  ]
}
```

---

## Gateway Endpoints vs Interface Endpoints ⭐⭐⭐⭐⭐

| Feature | Gateway Endpoint | Interface Endpoint |
|---------|------------------|-------------------|
| **Services** | S3, DynamoDB only | Most AWS services |
| **Implementation** | Route table target | ENI with private IP |
| **Cost** | Free | $0.01/hour per AZ + data |
| **Availability** | Highly available (AWS managed) | Per AZ (create in multiple AZs) |
| **On-Premises Access** | No | Yes (via VPN/Direct Connect) |
| **Security Group** | No | Yes |
| **Private DNS** | No | Yes |
| **Use Case** | S3/DynamoDB access | Other AWS services |

**Key Exam Tip**:
- **S3 or DynamoDB** → Gateway Endpoint (free)
- **Other AWS services** → Interface Endpoint (paid)

---

## When to Use VPC Endpoints ⭐⭐⭐⭐⭐

### ✅ Use VPC Endpoints When
- Private instances need to access AWS services
- Want to avoid Internet Gateway/NAT Gateway
- Security requirement (no Internet traffic)
- Cost optimization (avoid NAT Gateway charges)
- Compliance requires private connectivity
- Need to access S3/DynamoDB from private subnet

### ❌ Don't Use VPC Endpoints When
- Instances already have Internet access (not needed)
- Cost is primary concern (Interface Endpoints cost money)
- Service not supported (rare)

---

## Keywords to Identify VPC Endpoints

- "Private access to AWS services"
- "No Internet Gateway"
- "No NAT Gateway"
- "Private connectivity to S3"
- "Private connectivity to DynamoDB"
- "PrivateLink"
- "Stay within AWS network"

---

## Common Exam Scenarios ⭐⭐⭐⭐⭐

### Scenario 1: Private S3 Access
**Question**: Private subnet instances need to access S3 without Internet

**Answer**: Create S3 Gateway Endpoint

**Why**:
- Free
- No NAT Gateway needed
- Traffic stays within AWS network
- Automatic route table update

### Scenario 2: Private CloudWatch Access
**Question**: Private instances need to send logs to CloudWatch without Internet

**Answer**: Create CloudWatch Interface Endpoint

**Why**:
- CloudWatch not supported by Gateway Endpoint
- Interface Endpoint provides private access
- No NAT Gateway needed

### Scenario 3: Cost Optimization
**Question**: Reduce NAT Gateway costs for S3 access

**Answer**: Create S3 Gateway Endpoint

**Why**:
- Gateway Endpoint is free
- Eliminates NAT Gateway data processing charges
- Traffic doesn't go through NAT Gateway

### Scenario 4: On-Premises Access to AWS Service
**Question**: On-premises servers need private access to AWS Secrets Manager

**Answer**: Create Secrets Manager Interface Endpoint, access via VPN/Direct Connect

**Why**:
- Interface Endpoints accessible from on-premises
- Private connectivity
- No Internet required

---

# AWS PrivateLink
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐

### What is AWS PrivateLink?
```
- Technology behind Interface Endpoints
- Private connectivity between VPCs and services
- Expose services to other VPCs/accounts
- No VPC Peering, Internet Gateway, NAT, or VPN needed
- Scalable and secure
```

### PrivateLink Architecture ⭐⭐⭐⭐
```
Service Provider VPC:
- Application running on EC2/ECS/EKS
- Network Load Balancer (NLB)
- VPC Endpoint Service

Service Consumer VPC:
- Interface Endpoint (ENI)
- Private IP address
- Access service via private IP

Flow:
Consumer VPC → Interface Endpoint → NLB → Service Provider VPC
```

### Use Cases ⭐⭐⭐⭐
```
✅ Expose SaaS application to customers
✅ Share services across VPCs/accounts
✅ Marketplace services
✅ Third-party integrations
✅ Multi-tenant architectures
✅ Secure service exposure
```

---

## PrivateLink vs VPC Peering ⭐⭐⭐⭐

| Feature | PrivateLink | VPC Peering |
|---------|-------------|-------------|
| **Exposure** | Specific service only | Entire VPC |
| **Scalability** | Highly scalable (many consumers) | Limited (mesh topology) |
| **Management** | Service provider controls | Both sides configure |
| **Security** | Service-level access | Network-level access |
| **Use Case** | Expose service to many VPCs | Connect two VPCs |

**Key Exam Tip**: 
- **Expose service to many customers** → PrivateLink
- **Connect two VPCs** → VPC Peering

---

## When to Use PrivateLink ⭐⭐⭐⭐

### ✅ Use PrivateLink When
- Expose service to multiple VPCs/accounts
- SaaS application
- Need to scale to many consumers
- Want to control service exposure
- Security requirement (no full VPC access)

### ❌ Don't Use PrivateLink When
- Simple VPC-to-VPC connectivity → Use VPC Peering
- Need full VPC access → Use VPC Peering
- Cost is primary concern → VPC Peering is cheaper

---

# Elastic Load Balancing (ELB)
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐⭐ (CRITICAL)

### What is Elastic Load Balancing?
```
- Distribute traffic across multiple targets
- Targets: EC2 instances, containers, IP addresses, Lambda
- Automatic scaling
- Health checks
- High availability (Multi-AZ)
- Managed by AWS
```

### Why Use Load Balancers? ⭐⭐⭐⭐⭐
```
Benefits:
✅ Distribute load (prevent overload)
✅ High availability (Multi-AZ)
✅ Health checks (route to healthy targets)
✅ SSL/TLS termination
✅ Sticky sessions
✅ Automatic scaling
✅ Security (single point of access)
✅ Decouple application tiers
```

---

## Load Balancer Types ⭐⭐⭐⭐⭐ (CRITICAL)

### 1. Application Load Balancer (ALB) ⭐⭐⭐⭐⭐

#### What is ALB?
```
- Layer 7 (HTTP/HTTPS)
- Advanced routing (path, host, headers, query strings)
- WebSocket support
- HTTP/2 support
- Target groups
- Most feature-rich
```

#### ALB Features ⭐⭐⭐⭐⭐
```
Routing:
- Path-based: /api → Target Group A, /images → Target Group B
- Host-based: api.example.com → TG A, www.example.com → TG B
- Query string: ?user=premium → TG A, ?user=free → TG B
- Header-based: X-Custom-Header → TG A
- Source IP: 10.0.0.0/24 → TG A

Target Types:
- EC2 instances
- IP addresses (private IPs)
- Lambda functions
- Containers (ECS)

Health Checks:
- HTTP/HTTPS
- Path-based (/health)
- Success codes (200, 200-299)
- Interval, timeout, thresholds

SSL/TLS:
- SSL termination
- Multiple certificates (SNI)
- Certificate from ACM or IAM

Other Features:
- Sticky sessions (cookie-based)
- Cross-zone load balancing (enabled by default)
- Connection draining (deregistration delay)
- Access logs to S3
- Request tracing (X-Amzn-Trace-Id)
- Fixed response (return custom response)
- Redirects (HTTP → HTTPS)
- Authentication (Cognito, OIDC)
```

#### ALB Target Groups ⭐⭐⭐⭐⭐
```
What is a Target Group?
- Logical grouping of targets
- Health check configuration
- Routing destination

Example:
ALB
├─ Listener (Port 80)
│  └─ Rule: /api/* → API Target Group
│  └─ Rule: /web/* → Web Target Group
└─ Listener (Port 443)
   └─ Rule: Default → Web Target Group

API Target Group:
- EC2 instances running API
- Health check: GET /api/health

Web Target Group:
- EC2 instances running web app
- Health check: GET /health
```

#### ALB Use Cases ⭐⭐⭐⭐⭐
```
✅ Microservices (route to different services)
✅ Container-based applications (ECS, EKS)
✅ HTTP/HTTPS applications
✅ WebSocket applications
✅ Need advanced routing
✅ Lambda functions (serverless)
✅ Multiple domains/subdomains
```

---

### 2. Network Load Balancer (NLB) ⭐⭐⭐⭐⭐

#### What is NLB?
```
- Layer 4 (TCP/UDP/TLS)
- Ultra-high performance (millions of requests/sec)
- Low latency (~100 microseconds)
- Static IP per AZ
- Preserve source IP
- Extreme performance
```

#### NLB Features ⭐⭐⭐⭐⭐
```
Performance:
- Millions of requests per second
- Ultra-low latency (~100 microseconds)
- Handles sudden traffic spikes

Static IP:
- One static IP per AZ
- Can assign Elastic IP
- Good for whitelisting

Source IP Preservation:
- Client IP visible to targets
- No X-Forwarded-For needed

Protocols:
- TCP
- UDP
- TLS

Target Types:
- EC2 instances
- IP addresses (private IPs, on-premises)
- Application Load Balancer (chain NLB → ALB)

Health Checks:
- TCP
- HTTP/HTTPS

Other Features:
- Cross-zone load balancing (disabled by default, charged)
- Connection draining
- Zonal isolation (failure in one AZ doesn't affect others)
```

#### NLB Use Cases ⭐⭐⭐⭐⭐
```
✅ Extreme performance needed (millions of requests/sec)
✅ Low latency required
✅ TCP/UDP applications
✅ Static IP required
✅ Preserve source IP
✅ Gaming applications
✅ IoT applications
✅ Financial applications
✅ PrivateLink (expose service)
```

---

### 3. Gateway Load Balancer (GWLB) ⭐⭐⭐

#### What is GWLB?
```
- Layer 3 (Network Layer) - IP packets
- Deploy, scale, and manage third-party appliances
- Firewalls, IDS/IPS, deep packet inspection
- GENEVE protocol (port 6081)
- Transparent to applications
```

#### GWLB Architecture ⭐⭐⭐
```
Flow:
Internet → GWLB → Security Appliances (inspect) → GWLB → Application

Use Cases:
✅ Firewalls (Palo Alto, Fortinet, Check Point)
✅ Intrusion Detection/Prevention Systems (IDS/IPS)
✅ Deep packet inspection
✅ Payload manipulation
```

#### GWLB Use Cases ⭐⭐⭐
```
✅ Third-party security appliances
✅ Centralized security inspection
✅ Inline traffic inspection
✅ Compliance requirements (specific appliances)
```

---

### 4. Classic Load Balancer (CLB) ⭐⭐ (LEGACY)

#### What is CLB?
```
- Previous generation (deprecated)
- Layer 4 and Layer 7
- Limited features
- Not recommended for new applications
```

#### CLB Characteristics
```
Features:
- Basic load balancing
- TCP, SSL, HTTP, HTTPS
- Sticky sessions
- Health checks

Limitations:
- No advanced routing
- No target groups
- No WebSocket
- No HTTP/2
- Less flexible

Recommendation: Use ALB or NLB instead
```

---

## Load Balancer Comparison ⭐⭐⭐⭐⭐ (CRITICAL)

| Feature | ALB | NLB | GWLB | CLB |
|---------|-----|-----|------|-----|
| **Layer** | 7 (HTTP/HTTPS) | 4 (TCP/UDP/TLS) | 3 (IP) | 4 & 7 |
| **Performance** | High | Extreme | High | Moderate |
| **Latency** | Milliseconds | Microseconds | Low | Milliseconds |
| **Static IP** | No | Yes | Yes | No |
| **Preserve Source IP** | No (X-Forwarded-For) | Yes | Yes | No |
| **Advanced Routing** | Yes | No | No | No |
| **Target Types** | Instance, IP, Lambda | Instance, IP, ALB | Instance, IP | Instance |
| **WebSocket** | Yes | Yes | No | No |
| **HTTP/2** | Yes | No | No | No |
| **Use Case** | Web apps, microservices | Extreme performance, TCP/UDP | Security appliances | Legacy |
| **Cost** | $$ | $$$ | $$$ | $ |

**Key Exam Tips**:
- **HTTP/HTTPS, advanced routing** → ALB
- **Extreme performance, TCP/UDP, static IP** → NLB
- **Security appliances** → GWLB
- **Legacy** → CLB (avoid for new apps)

---

## Load Balancer Features ⭐⭐⭐⭐⭐

### Health Checks ⭐⭐⭐⭐⭐
```
Purpose:
- Determine if target is healthy
- Route traffic only to healthy targets
- Automatic failover

Configuration:
- Protocol: HTTP, HTTPS, TCP
- Port: 80, 443, custom
- Path: /health, /api/health (HTTP/HTTPS)
- Interval: 5-300 seconds (default 30)
- Timeout: 2-120 seconds (default 5)
- Healthy threshold: 2-10 (default 5)
- Unhealthy threshold: 2-10 (default 2)

Health States:
- Initial: Target being registered
- Healthy: Passing health checks
- Unhealthy: Failing health checks
- Unused: Target not registered
- Draining: Deregistering (connection draining)

Example:
Protocol: HTTP
Port: 80
Path: /health
Interval: 30 seconds
Timeout: 5 seconds
Healthy threshold: 2 (2 consecutive successes = healthy)
Unhealthy threshold: 2 (2 consecutive failures = unhealthy)
```

### Cross-Zone Load Balancing ⭐⭐⭐⭐⭐
```
Without Cross-Zone:
- Traffic distributed evenly across AZs
- Uneven distribution if different number of instances per AZ

Example:
AZ-A: 2 instances (each gets 25% of traffic)
AZ-B: 8 instances (each gets 6.25% of traffic)
Uneven load!

With Cross-Zone:
- Traffic distributed evenly across all instances
- Regardless of AZ

Example:
AZ-A: 2 instances (each gets 10% of traffic)
AZ-B: 8 instances (each gets 10% of traffic)
Even load!

Settings:
- ALB: Enabled by default, no charge
- NLB: Disabled by default, charged if enabled
- CLB: Disabled by default, no charge if enabled

Recommendation: Enable for even distribution
```

### Connection Draining / Deregistration Delay ⭐⭐⭐⭐
```
Purpose:
- Complete in-flight requests before deregistering target
- Graceful shutdown
- No dropped connections

How it works:
1. Target marked for deregistration
2. Load balancer stops sending new requests
3. Existing connections allowed to complete
4. After timeout, target fully deregistered

Configuration:
- Timeout: 0-3600 seconds (default 300)
- 0 = disabled (immediate deregistration)

Use Cases:
✅ Application updates
✅ Instance termination
✅ Auto Scaling scale-in
✅ Graceful shutdown
```

### Sticky Sessions (Session Affinity) ⭐⭐⭐⭐
```
Purpose:
- Route requests from same client to same target
- Maintain session state

How it works:
- Load balancer sets cookie
- Client includes cookie in subsequent requests
- Load balancer routes to same target

Cookie Types:
1. Application-based:
   - Custom cookie (application generates)
   - Application cookie (load balancer generates)
   - Cookie name specified by application

2. Duration-based:
   - Load balancer generates cookie (AWSALB)
   - Duration: 1 second to 7 days

Use Cases:
✅ Session state stored locally on instance
✅ Shopping carts
✅ User sessions

Considerations:
❌ Can cause uneven load distribution
❌ If target fails, session lost
✅ Better: Use ElastiCache or DynamoDB for sessions
```

### SSL/TLS Termination ⭐⭐⭐⭐⭐
```
What is SSL Termination?
- Load balancer handles SSL/TLS encryption/decryption
- Backend communication can be HTTP (unencrypted)
- Reduces CPU load on targets

Architecture:
Client (HTTPS) → Load Balancer (SSL termination) → Target (HTTP)

Benefits:
✅ Centralized certificate management
✅ Reduced target CPU usage
✅ Simplified certificate updates
✅ Support for multiple certificates (SNI)

Certificates:
- From AWS Certificate Manager (ACM) - recommended
- From IAM certificate store
- Upload your own

SNI (Server Name Indication):
- Multiple SSL certificates on single load balancer
- Client indicates hostname in SSL handshake
- Load balancer selects appropriate certificate
- Supported: ALB, NLB, CloudFront
- Not supported: CLB
```

### X-Forwarded Headers ⭐⭐⭐⭐
```
Purpose:
- Preserve client information when using load balancer
- ALB/CLB add these headers automatically

Headers:
- X-Forwarded-For: Client IP address
- X-Forwarded-Proto: Protocol (HTTP or HTTPS)
- X-Forwarded-Port: Port (80 or 443)

Example:
Client (203.0.113.50) → ALB (10.0.1.100) → Target

Without X-Forwarded-For:
- Target sees source IP: 10.0.1.100 (ALB IP)

With X-Forwarded-For:
- Target sees X-Forwarded-For: 203.0.113.50 (Client IP)

Use Cases:
✅ Logging client IPs
✅ Geolocation
✅ Security (IP-based access control)
✅ Analytics
```

---

## Load Balancer Security ⭐⭐⭐⭐

### Security Groups ⭐⭐⭐⭐⭐
```
Load Balancer Security Group:
- Allow inbound from Internet (0.0.0.0/0)
- Ports: 80 (HTTP), 443 (HTTPS)

Example:
Type        Protocol    Port    Source
HTTP        TCP         80      0.0.0.0/0
HTTPS       TCP         443     0.0.0.0/0

Target Security Group:
- Allow inbound from Load Balancer Security Group
- More secure than allowing 0.0.0.0/0

Example:
Type        Protocol    Port    Source
HTTP        TCP         80      sg-lb-12345 (LB security group)

Benefits:
✅ Only load balancer can access targets
✅ Targets not directly accessible from Internet
✅ More secure
```

### SSL/TLS Policies ⭐⭐⭐⭐
```
Purpose:
- Define SSL/TLS protocols and ciphers
- Security vs compatibility trade-off

Predefined Policies:
- ELBSecurityPolicy-2016-08 (default, balanced)
- ELBSecurityPolicy-TLS-1-2-2017-01 (TLS 1.2 only, more secure)
- ELBSecurityPolicy-TLS-1-1-2017-01 (TLS 1.1+)
- ELBSecurityPolicy-FS-1-2-2019-08 (forward secrecy)

Recommendation:
- Use latest policy for best security
- Consider client compatibility
```

---

## When to Use Each Load Balancer ⭐⭐⭐⭐⭐

### Use ALB When:
```
✅ HTTP/HTTPS applications
✅ Microservices architecture
✅ Container-based applications (ECS, EKS)
✅ Need advanced routing (path, host, headers)
✅ Multiple domains/subdomains
✅ Lambda functions
✅ WebSocket applications
✅ Need authentication (Cognito, OIDC)
```

### Use NLB When:
```
✅ Extreme performance needed (millions of requests/sec)
✅ Ultra-low latency required
✅ TCP/UDP applications
✅ Static IP required (whitelisting)
✅ Preserve source IP
✅ PrivateLink (expose service)
✅ Gaming applications
✅ IoT applications
```

### Use GWLB When:
```
✅ Third-party security appliances
✅ Firewalls (Palo Alto, Fortinet)
✅ IDS/IPS systems
✅ Deep packet inspection
✅ Inline traffic inspection
```

### Use CLB When:
```
❌ Don't use for new applications
✅ Only for legacy applications (already using CLB)
```

---

## Keywords to Identify Load Balancers

### ALB Keywords:
- "HTTP/HTTPS"
- "Microservices"
- "Path-based routing"
- "Host-based routing"
- "Containers"
- "Lambda"
- "WebSocket"

### NLB Keywords:
- "Extreme performance"
- "Millions of requests"
- "Low latency"
- "Static IP"
- "TCP/UDP"
- "Preserve source IP"
- "PrivateLink"

### GWLB Keywords:
- "Security appliances"
- "Firewall"
- "IDS/IPS"
- "Deep packet inspection"
- "Third-party appliances"

---

## Common Exam Scenarios ⭐⭐⭐⭐⭐

### Scenario 1: Microservices Routing
**Question**: Route /api to API servers, /web to web servers

**Answer**: Use Application Load Balancer with path-based routing

**Why**:
- ALB supports path-based routing
- Create two target groups (API, Web)
- Configure rules based on path
- Single load balancer for multiple services

### Scenario 2: Static IP Requirement
**Question**: Load balancer needs static IP for firewall whitelisting

**Answer**: Use Network Load Balancer

**Why**:
- NLB provides static IP per AZ
- Can assign Elastic IP
- ALB doesn't support static IP

### Scenario 3: Extreme Performance
**Question**: Application needs to handle millions of requests per second with ultra-low latency

**Answer**: Use Network Load Balancer

**Why**:
- NLB handles millions of requests/sec
- Ultra-low latency (~100 microseconds)
- Layer 4 (faster than Layer 7)

### Scenario 4: WebSocket Application
**Question**: Real-time chat application using WebSocket

**Answer**: Use Application Load Balancer

**Why**:
- ALB supports WebSocket
- HTTP/HTTPS support
- Advanced routing if needed

### Scenario 5: Preserve Client IP
**Question**: Application needs to see actual client IP address

**Answer**: Use Network Load Balancer

**Why**:
- NLB preserves source IP
- ALB uses X-Forwarded-For header (requires application changes)
- NLB is transparent

### Scenario 6: Multiple SSL Certificates
**Question**: Host multiple domains (example.com, api.example.com) on single load balancer

**Answer**: Use Application Load Balancer with SNI

**Why**:
- ALB supports SNI (multiple certificates)
- Host-based routing to different target groups
- Single load balancer for multiple domains

### Scenario 7: Deploy Firewall Appliance
**Question**: Deploy Palo Alto firewall to inspect all traffic

**Answer**: Use Gateway Load Balancer

**Why**:
- GWLB designed for third-party appliances
- Transparent inline inspection
- Scales firewall appliances

---

## Load Balancer Best Practices ⭐⭐⭐⭐

### High Availability
```
✅ Deploy in multiple AZs (minimum 2)
✅ Enable cross-zone load balancing
✅ Use health checks
✅ Set appropriate health check thresholds
✅ Monitor with CloudWatch
```

### Security
```
✅ Use HTTPS (SSL/TLS)
✅ Use latest SSL policy
✅ Restrict load balancer security group (if internal)
✅ Restrict target security group (allow only from LB)
✅ Enable access logs
✅ Use WAF (for ALB)
```

### Performance
```
✅ Choose appropriate load balancer type
✅ Enable connection draining
✅ Use appropriate health check interval
✅ Monitor target response times
✅ Use Auto Scaling with load balancer
✅ Right-size targets
✅ Use caching (CloudFront for ALB)
```

### Cost Optimization
```
✅ Delete unused load balancers
✅ Use ALB for multiple services (path-based routing)
✅ Consider cross-zone load balancing costs (NLB)
✅ Use appropriate instance types for targets
✅ Monitor and optimize target count
```

---

## Load Balancer Pricing

### Pricing Model
```
ALB:
- $0.0225 per hour
- $0.008 per LCU-hour (Load Balancer Capacity Unit)
- LCU based on: new connections, active connections, processed bytes, rule evaluations

NLB:
- $0.0225 per hour
- $0.006 per NLCU-hour
- NLCU based on: new connections, active connections, processed bytes

GWLB:
- $0.0125 per hour
- $0.004 per GLCU-hour

CLB:
- $0.025 per hour
- $0.008 per GB processed

Data Transfer:
- Standard AWS data transfer rates apply
```

---

# Amazon Route 53
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐⭐ (CRITICAL)

### What is Route 53?
```
- Managed DNS (Domain Name System) service
- Highly available and scalable
- Domain registration
- DNS routing
- Health checking
- Traffic management
- 100% SLA (only AWS service with 100% SLA)
```

### Why "Route 53"?
```
- DNS uses port 53
- Route traffic to resources
- Hence: Route 53
```

---

## DNS Basics ⭐⭐⭐⭐⭐

### What is DNS?
```
- Translates domain names to IP addresses
- example.com → 93.184.216.34
- Hierarchical system
- Distributed database
```

### DNS Record Types ⭐⭐⭐⭐⭐

#### A Record (Address Record)
```
- Maps hostname to IPv4 address
- Example: example.com → 93.184.216.34
- Most common record type
```

#### AAAA Record
```
- Maps hostname to IPv6 address
- Example: example.com → 2606:2800:220:1:248:1893:25c8:1946
```

#### CNAME Record (Canonical Name)
```
- Maps hostname to another hostname
- Example: www.example.com → example.com
- Cannot be used for root domain (zone apex)
- Can create chains (not recommended)

Limitations:
❌ Cannot use for example.com (root domain)
✅ Can use for www.example.com (subdomain)
```

#### Alias Record (AWS-specific) ⭐⭐⭐⭐⭐
```
- Maps hostname to AWS resource
- Example: example.com → ALB DNS name
- Can be used for root domain (zone apex)
- Free (no charge for Alias queries)
- Automatic IP updates

Supported Targets:
✅ Elastic Load Balancers (ALB, NLB, CLB)
✅ CloudFront distributions
✅ API Gateway
✅ Elastic Beanstalk
✅ S3 website endpoints
✅ VPC interface endpoints
✅ Global Accelerator
✅ Another Route 53 record (same hosted zone)

Not Supported:
❌ EC2 instance (use A record)

Key Exam Tip: Use Alias for AWS resources, especially for root domain
```

#### MX Record (Mail Exchange)
```
- Mail server for domain
- Example: example.com → mail.example.com
- Priority value (lower = higher priority)
```

#### TXT Record (Text)
```
- Arbitrary text
- Used for verification, SPF, DKIM
- Example: example.com → "v=spf1 include:_spf.google.com ~all"
```

#### NS Record (Name Server)
```
- Name servers for hosted zone
- Example: example.com → ns-123.awsdns-12.com
- Automatically created by Route 53
```

#### SOA Record (Start of Authority)
```
- Information about DNS zone
- Automatically created by Route 53
- Contains: primary name server, email, serial number, timers
```

---

## Route 53 Hosted Zones ⭐⭐⭐⭐⭐

### What is a Hosted Zone?
```
- Container for DNS records
- Defines how to route traffic for domain
- Two types: Public and Private
```

### Public Hosted Zone ⭐⭐⭐⭐⭐
```
- Routes traffic on the Internet
- Anyone can query
- Example: example.com

Use Cases:
✅ Public websites
✅ Public APIs
✅ Email servers
✅ Any Internet-facing service

Cost: $0.50 per hosted zone per month
```

### Private Hosted Zone ⭐⭐⭐⭐⭐
```
- Routes traffic within VPC(s)
- Only instances in associated VPCs can query
- Example: internal.example.com

Use Cases:
✅ Internal applications
✅ Databases
✅ Internal APIs
✅ Microservices communication

Requirements:
- Associate with one or more VPCs
- Enable DNS resolution in VPC
- Enable DNS hostnames in VPC

Cost: $0.50 per hosted zone per month
```

---

## Route 53 Routing Policies ⭐⭐⭐⭐⭐ (CRITICAL FOR EXAM)

### 1. Simple Routing ⭐⭐⭐⭐
```
What it does:
- Route to single resource
- Can specify multiple IPs (random selection)
- No health checks

Use Cases:
✅ Single resource
✅ Simple setup
✅ No failover needed

Example:
example.com → 93.184.216.34

Or multiple IPs (random):
example.com → 93.184.216.34, 93.184.216.35, 93.184.216.36
```

### 2. Weighted Routing ⭐⭐⭐⭐⭐
```
What it does:
- Distribute traffic based on weights
- Percentage of traffic to each resource
- Supports health checks

Formula:
Traffic to resource = (Weight of resource) / (Sum of all weights) × 100%

Use Cases:
✅ Blue/green deployments
✅ A/B testing
✅ Gradual migration
✅ Load distribution

Example:
example.com:
- Record 1: 93.184.216.34, Weight: 70 (70% traffic)
- Record 2: 93.184.216.35, Weight: 20 (20% traffic)
- Record 3: 93.184.216.36, Weight: 10 (10% traffic)

Blue/Green Deployment:
- Blue (old): Weight 90 (90% traffic)
- Green (new): Weight 10 (10% traffic)
- Gradually increase Green weight
- Eventually: Green 100, Blue 0
```

### 3. Latency-Based Routing ⭐⭐⭐⭐⭐
```
What it does:
- Route to resource with lowest latency
- Based on user location and resource location
- Supports health checks

Use Cases:
✅ Global applications
✅ Minimize latency
✅ Improve user experience

Example:
example.com:
- Record 1: us-east-1 ALB (for users near US East)
- Record 2: eu-west-1 ALB (for users near Europe)
- Record 3: ap-southeast-1 ALB (for users near Asia)

User in London → Routes to eu-west-1 (lowest latency)
User in Tokyo → Routes to ap-southeast-1 (lowest latency)
```

### 4. Failover Routing ⭐⭐⭐⭐⭐
```
What it does:
- Active-passive failover
- Primary resource (active)
- Secondary resource (passive, standby)
- Requires health checks

Use Cases:
✅ Disaster recovery
✅ High availability
✅ Active-passive setup

Example:
example.com:
- Primary: us-east-1 ALB (active)
- Secondary: us-west-2 ALB (standby)

If primary healthy → Route to primary
If primary unhealthy → Route to secondary

Architecture:
Primary (us-east-1) ← Health Check
    ↓ (if healthy)
  Users
    ↓ (if unhealthy)
Secondary (us-west-2)
```

### 5. Geolocation Routing ⭐⭐⭐⭐⭐
```
What it does:
- Route based on user's geographic location
- Continent, country, or state (US only)
- Default location (if no match)

Use Cases:
✅ Content localization
✅ Compliance (data residency)
✅ Language-specific content
✅ Restrict content by location

Example:
example.com:
- Europe → eu-west-1 ALB (European content)
- Asia → ap-southeast-1 ALB (Asian content)
- North America → us-east-1 ALB (US content)
- Default → us-east-1 ALB (all others)

User in France → Routes to eu-west-1
User in Japan → Routes to ap-southeast-1
User in Brazil → Routes to us-east-1 (default)
```

### 6. Geoproximity Routing ⭐⭐⭐⭐
```
What it does:
- Route based on geographic location of users and resources
- Bias value to shift traffic (expand or shrink region)
- Requires Route 53 Traffic Flow

Use Cases:
✅ Shift traffic between regions
✅ Load balancing across regions
✅ Gradual migration

Bias:
- Positive bias (1 to 99): Expand region (more traffic)
- Negative bias (-1 to -99): Shrink region (less traffic)

Example:
example.com:
- us-east-1: Bias +20 (expand region, more traffic)
- eu-west-1: Bias -10 (shrink region, less traffic)

Result: More users routed to us-east-1, fewer to eu-west-1
```

### 7. Multi-Value Answer Routing ⭐⭐⭐⭐
```
What it does:
- Return multiple IP addresses (up to 8)
- Client chooses one
- Supports health checks (only healthy IPs returned)
- Not a substitute for load balancer

Use Cases:
✅ Simple load distribution
✅ Multiple healthy resources
✅ Client-side load balancing

Example:
example.com:
- Record 1: 93.184.216.34 (healthy)
- Record 2: 93.184.216.35 (healthy)
- Record 3: 93.184.216.36 (unhealthy, not returned)

Response: 93.184.216.34, 93.184.216.35
Client chooses one randomly
```

---

## Route 53 Routing Policies Comparison ⭐⭐⭐⭐⭐

| Policy | Use Case | Health Checks | Returns |
|--------|----------|---------------|---------|
| **Simple** | Single resource | No | One or multiple IPs (random) |
| **Weighted** | A/B testing, gradual migration | Yes | One IP (based on weight) |
| **Latency** | Minimize latency | Yes | One IP (lowest latency) |
| **Failover** | Disaster recovery | Yes (required) | Primary or secondary |
| **Geolocation** | Content localization, compliance | Yes | One IP (based on location) |
| **Geoproximity** | Shift traffic between regions | Yes | One IP (based on proximity + bias) |
| **Multi-Value** | Multiple healthy resources | Yes | Multiple IPs (up to 8 healthy) |

---

## Route 53 Health Checks ⭐⭐⭐⭐⭐

### What are Health Checks?
```
- Monitor endpoint health
- Automated failover
- Integrated with CloudWatch alarms
- Can monitor other health checks (calculated health checks)
```

### Health Check Types ⭐⭐⭐⭐⭐

#### 1. Endpoint Health Checks
```
What it monitors:
- HTTP/HTTPS endpoint
- TCP endpoint
- Checks every 30 seconds (or 10 seconds, fast)

Configuration:
- Protocol: HTTP, HTTPS, TCP
- IP address or domain name
- Port: 80, 443, custom
- Path: /health (for HTTP/HTTPS)
- String matching (optional): Check response contains string
- Interval: 30 seconds (standard) or 10 seconds (fast)
- Failure threshold: 3 (default)

Health Check Locations:
- 15+ global locations
- Majority must report healthy (>50%)

Example:
Protocol: HTTPS
Domain: api.example.com
Port: 443
Path: /health
String: "OK"
Interval: 30 seconds
Threshold: 3 failures = unhealthy
```

#### 2. Calculated Health Checks
```
What it does:
- Combine multiple health checks
- AND, OR, NOT logic
- Monitor up to 256 child health checks

Use Cases:
✅ Complex health check logic
✅ All resources must be healthy (AND)
✅ At least one resource healthy (OR)

Example:
Parent Health Check (AND):
- Child 1: Web server health check
- Child 2: Database health check
- Child 3: Cache health check

Result: Healthy only if ALL children healthy
```

#### 3. CloudWatch Alarm Health Checks
```
What it does:
- Monitor CloudWatch alarm state
- Alarm state = health check state

Use Cases:
✅ Monitor private resources (not accessible from Internet)
✅ Custom metrics
✅ Complex monitoring logic

Example:
CloudWatch Alarm: DynamoDB throttling > 100
Health Check: Monitor alarm state
If alarm = ALARM → Health check = unhealthy
```

### Health Check for Private Resources ⭐⭐⭐⭐
```
Problem:
- Route 53 health checks are public
- Cannot directly check private resources (private subnet, on-premises)

Solution:
1. Create CloudWatch metric for private resource
2. Create CloudWatch alarm based on metric
3. Create Route 53 health check monitoring alarm

Example:
Private EC2 → CloudWatch Agent → Custom Metric → CloudWatch Alarm → Route 53 Health Check
```

---

## Route 53 Traffic Flow ⭐⭐⭐

### What is Traffic Flow?
```
- Visual editor for complex routing
- Combine multiple routing policies
- Version control
- Reusable configurations
- Additional cost ($50/month per policy record)
```

### Use Cases
```
✅ Complex routing requirements
✅ Geoproximity routing
✅ Combine multiple policies
✅ Visual representation
```

---

## Route 53 Domain Registration ⭐⭐⭐⭐

### Domain Registration
```
- Register new domains
- Transfer existing domains
- Automatic DNS configuration
- Domain privacy protection (WHOIS)

Pricing:
- Varies by TLD (.com, .net, .org, etc.)
- .com: ~$12/year
- Renewal fees apply
```

### Domain Transfer
```
Process:
1. Unlock domain at current registrar
2. Get authorization code
3. Initiate transfer in Route 53
4. Approve transfer
5. Wait for completion (5-7 days)

Note: Domain registration and DNS hosting are separate
```

---

## When to Use Route 53 ⭐⭐⭐⭐⭐

### ✅ Use Route 53 When
- Need DNS service
- Domain registration
- Traffic management (routing policies)
- Health checks and failover
- Global applications
- High availability required
- Integration with AWS services

### ❌ Don't Use Route 53 When
- Simple static IP (use Elastic IP)
- Internal DNS only (use VPC DNS)
- Very simple setup (default VPC DNS may suffice)

---

## Keywords to Identify Route 53

- "DNS"
- "Domain name"
- "Traffic routing"
- "Failover"
- "Latency-based routing"
- "Geolocation"
- "Health checks"
- "Domain registration"
- "A record, CNAME, Alias"

---

## Common Exam Scenarios ⭐⭐⭐⭐⭐

### Scenario 1: Route to AWS Resource (Root Domain)
**Question**: Route example.com to Application Load Balancer

**Answer**: Create Alias record pointing to ALB

**Why**:
- Alias record supports root domain (zone apex)
- CNAME cannot be used for root domain
- Alias is free (no query charges)
- Automatic IP updates

### Scenario 2: Active-Passive Failover
**Question**: Primary in us-east-1, failover to us-west-2 if primary fails

**Answer**: Use Failover routing policy with health checks

**Why**:
- Failover policy for active-passive
- Health check monitors primary
- Automatic failover to secondary
- Disaster recovery

### Scenario 3: Minimize Latency Globally
**Question**: Application in multiple regions, route users to nearest region

**Answer**: Use Latency-based routing policy

**Why**:
- Routes to lowest latency resource
- Based on user location
- Improves user experience
- Global application

### Scenario 4: A/B Testing
**Question**: Send 90% traffic to old version, 10% to new version

**Answer**: Use Weighted routing policy (90/10 split)

**Why**:
- Weighted routing distributes by percentage
- Gradual rollout
- Can adjust weights over time
- A/B testing

### Scenario 5: Content Localization
**Question**: European users see European content, Asian users see Asian content

**Answer**: Use Geolocation routing policy

**Why**:
- Routes based on user location
- Content localization
- Compliance (data residency)
- Language-specific content

### Scenario 6: Private DNS for VPC
**Question**: Internal application needs DNS resolution within VPC

**Answer**: Create Private Hosted Zone, associate with VPC

**Why**:
- Private hosted zone for internal DNS
- Only accessible within VPC
- Secure (not Internet-accessible)
- Internal service discovery

### Scenario 7: Monitor Private Resource
**Question**: Health check for EC2 instance in private subnet

**Answer**: CloudWatch metric → CloudWatch alarm → Route 53 health check

**Why**:
- Route 53 health checks are public
- Cannot directly check private resources
- Use CloudWatch alarm as proxy
- Monitor custom metrics

---

## Route 53 Best Practices ⭐⭐⭐⭐

### High Availability
```
✅ Use health checks
✅ Use failover routing for DR
✅ Deploy resources in multiple regions
✅ Use latency-based routing for global apps
✅ Monitor health check status
```

### Performance
```
✅ Use latency-based routing
✅ Use Alias records (free, automatic updates)
✅ Use appropriate TTL values
✅ Use Route 53 Resolver for hybrid DNS
```

### Security
```
✅ Use private hosted zones for internal resources
✅ Enable DNSSEC (if supported)
✅ Use IAM policies for access control
✅ Enable query logging
✅ Monitor with CloudWatch
```

### Cost Optimization
```
✅ Use Alias records (free queries)
✅ Appropriate TTL (reduce queries)
✅ Delete unused hosted zones
✅ Use standard health checks (not fast)
```

---

## Route 53 Pricing

### Pricing Components
```
Hosted Zones:
- $0.50 per hosted zone per month
- First 25 hosted zones

DNS Queries:
- $0.40 per million queries (standard)
- $0.60 per million queries (latency-based, geolocation, geoproximity)
- Alias queries to AWS resources: FREE

Health Checks:
- $0.50 per health check per month (standard)
- $1.00 per health check per month (fast, 10-second interval)
- $1.00 per health check per month (HTTPS with string matching)

Domain Registration:
- Varies by TLD (.com ~$12/year)

Traffic Flow:
- $50 per policy record per month
```

---

# Amazon CloudFront
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐⭐ (CRITICAL)

### What is CloudFront?
```
- Content Delivery Network (CDN)
- Global network of edge locations (400+)
- Cache content closer to users
- Reduce latency
- Improve performance
- DDoS protection (Shield Standard)
- Integration with AWS services
```

### How CloudFront Works ⭐⭐⭐⭐⭐
```
Architecture:
User → Edge Location (cache) → Origin (S3, ALB, EC2, custom)

First Request (Cache Miss):
1. User requests content
2. Edge location doesn't have content (cache miss)
3. Edge location fetches from origin
4. Edge location caches content
5. Edge location returns content to user

Subsequent Requests (Cache Hit):
1. User requests content
2. Edge location has content (cache hit)
3. Edge location returns cached content
4. No origin request (faster, cheaper)

Benefits:
✅ Lower latency (content closer to users)
✅ Reduced origin load
✅ Lower data transfer costs
✅ Better user experience
```

---

## CloudFront Origins ⭐⭐⭐⭐⭐

### 1. S3 Bucket as Origin ⭐⭐⭐⭐⭐
```
Use Cases:
✅ Static website hosting
✅ Media files (images, videos)
✅ Software downloads
✅ Static assets

Features:
- Origin Access Identity (OAI) or Origin Access Control (OAC)
- Restrict S3 access to CloudFront only
- S3 bucket can be private

Configuration:
1. Create CloudFront distribution
2. Set S3 bucket as origin
3. Create OAI/OAC
4. Update S3 bucket policy (allow OAI/OAC)

S3 Bucket Policy Example:
{
  "Effect": "Allow",
  "Principal": {
    "Service": "cloudfront.amazonaws.com"
  },
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::my-bucket/*",
  "Condition": {
    "StringEquals": {
      "AWS:SourceArn": "arn:aws:cloudfront::123456789012:distribution/EDFDVBD6EXAMPLE"
    }
  }
}
```

### 2. Custom Origin (HTTP/HTTPS) ⭐⭐⭐⭐⭐
```
Supported Origins:
✅ Application Load Balancer (ALB)
✅ EC2 instance
✅ S3 website endpoint
✅ Any HTTP server (on-premises, other cloud)

Use Cases:
✅ Dynamic content
✅ API acceleration
✅ Web applications
✅ Hybrid architectures

Configuration:
- Origin domain name
- Origin protocol (HTTP, HTTPS, Match Viewer)
- Origin path (optional)
- Custom headers (optional)

Example: ALB as Origin
- ALB must be public (Internet-facing)
- Security group: Allow CloudFront IP ranges
- CloudFront → ALB → EC2 instances
```

### 3. Multiple Origins ⭐⭐⭐⭐
```
Use Case:
- Different content from different origins
- Static content from S3
- Dynamic content from ALB

Configuration:
- Create multiple origins
- Use cache behaviors to route to different origins

Example:
Path Pattern          Origin
/images/*            S3 bucket
/api/*               ALB
Default (*)          S3 bucket
```

---

## CloudFront Cache Behaviors ⭐⭐⭐⭐⭐

### What are Cache Behaviors?
```
- Rules for how CloudFront handles requests
- Path pattern matching
- Different settings per path
- Evaluated in order (priority)
```

### Cache Behavior Settings ⭐⭐⭐⭐⭐
```
Key Settings:
- Path pattern: /images/*, /api/*, *
- Origin: Which origin to use
- Viewer protocol policy: HTTP/HTTPS
- Allowed HTTP methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
- Cache policy: TTL, query strings, headers, cookies
- Origin request policy: What to forward to origin
- Response headers policy: Add headers to response

Example:
Behavior 1 (Priority 0):
- Path: /api/*
- Origin: ALB
- Viewer protocol: HTTPS only
- Allowed methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
- Cache: Disabled (dynamic content)

Behavior 2 (Priority 1):
- Path: /images/*
- Origin: S3 bucket
- Viewer protocol: HTTP and HTTPS
- Allowed methods: GET, HEAD
- Cache: Enabled (TTL 86400 seconds)

Default Behavior:
- Path: *
- Origin: S3 bucket
- Cache: Enabled
```

---

## CloudFront Caching ⭐⭐⭐⭐⭐

### Cache Key ⭐⭐⭐⭐⭐
```
What is Cache Key?
- Unique identifier for cached object
- Determines if request is cache hit or miss

Default Cache Key:
- Domain name
- URL path

Extended Cache Key (optional):
- Query strings
- Headers
- Cookies

Example:
URL: https://example.com/image.jpg?size=large&format=png

Default cache key: example.com/image.jpg
Extended cache key: example.com/image.jpg?size=large&format=png

Impact:
- More specific cache key = more cache misses
- Less specific cache key = more cache hits
- Balance between caching and personalization
```

### TTL (Time to Live) ⭐⭐⭐⭐⭐
```
What is TTL?
- How long object stays in cache
- After TTL expires, CloudFront checks origin for updates

TTL Settings:
- Minimum TTL: 0 seconds (default)
- Maximum TTL: 31536000 seconds (1 year, default)
- Default TTL: 86400 seconds (24 hours)

TTL Sources (priority order):
1. Cache-Control max-age (origin header)
2. Cache-Control s-maxage (origin header)
3. Expires (origin header)
4. CloudFront default TTL

Example:
Origin returns: Cache-Control: max-age=3600
Result: Object cached for 1 hour

No cache headers from origin:
Result: Object cached for default TTL (24 hours)

Recommendations:
- Static content: Long TTL (days, weeks)
- Dynamic content: Short TTL (seconds, minutes) or no cache
- Versioned files: Very long TTL (use versioned URLs)
```

### Cache Invalidation ⭐⭐⭐⭐
```
What is Cache Invalidation?
- Remove objects from cache before TTL expires
- Force CloudFront to fetch fresh content from origin

Methods:
1. Invalidate specific paths
2. Invalidate with wildcards
3. Versioned URLs (recommended)

Invalidation Examples:
- /images/photo.jpg (specific file)
- /images/* (all files in directory)
- /* (all files, expensive)

Cost:
- First 1,000 invalidation paths per month: Free
- Beyond 1,000: $0.005 per path

Best Practice: Use versioned URLs
- /images/photo-v1.jpg
- /images/photo-v2.jpg
- No invalidation needed (new URL = new cache entry)
- Free
- Instant
```

---

## CloudFront Security ⭐⭐⭐⭐⭐

### 1. HTTPS ⭐⭐⭐⭐⭐
```
Viewer Protocol Policy:
- HTTP and HTTPS: Allow both
- Redirect HTTP to HTTPS: Redirect all HTTP to HTTPS
- HTTPS Only: Require HTTPS

Origin Protocol Policy:
- HTTP Only: CloudFront → Origin via HTTP
- HTTPS Only: CloudFront → Origin via HTTPS
- Match Viewer: Use same protocol as viewer

Recommendation:
- Viewer: Redirect HTTP to HTTPS
- Origin: HTTPS Only (if supported)

SSL/TLS Certificates:
- Default CloudFront certificate (*.cloudfront.net)
- Custom certificate (ACM or imported)
- Certificate must be in us-east-1 (for CloudFront)
```

### 2. Origin Access Identity (OAI) / Origin Access Control (OAC) ⭐⭐⭐⭐⭐
```
Purpose:
- Restrict S3 bucket access to CloudFront only
- Users cannot bypass CloudFront and access S3 directly

OAI (Legacy):
- CloudFront identity
- Add to S3 bucket policy
- Allow OAI to access bucket

OAC (Recommended):
- Newer, more secure
- Better support for S3 features
- Recommended for new distributions

Configuration:
1. Create OAC
2. Associate with CloudFront distribution
3. Update S3 bucket policy (allow OAC)

Result:
✅ S3 bucket can be private
✅ Only CloudFront can access
✅ Users must go through CloudFront
```

### 3. Signed URLs and Signed Cookies ⭐⭐⭐⭐⭐
```
Purpose:
- Restrict access to content
- Require authentication
- Time-limited access
- Premium content, paid content

Signed URLs:
- For individual files
- Include signature in URL
- Expiration time
- IP restrictions (optional)

Signed Cookies:
- For multiple files
- Include signature in cookie
- Access multiple files with one cookie
- Better for streaming

Use Cases:
✅ Premium content (paid users only)
✅ Time-limited access (download links)
✅ Restrict by IP address
✅ Prevent hotlinking

Example Signed URL:
https://d111111abcdef8.cloudfront.net/image.jpg?Expires=1234567890&Signature=abc123&Key-Pair-Id=APKA...

Components:
- Expires: Expiration timestamp
- Signature: Cryptographic signature
- Key-Pair-Id: CloudFront key pair ID
```

### 4. Geo Restriction ⭐⭐⭐⭐
```
Purpose:
- Allow or block content by country
- Compliance, licensing, copyright

Configuration:
- Whitelist: Allow only specific countries
- Blacklist: Block specific countries

Example:
Whitelist: US, CA, GB (only these countries can access)
Blacklist: CN, RU (these countries cannot access)

Use Cases:
✅ Content licensing restrictions
✅ Copyright compliance
✅ Regional content
```

### 5. AWS WAF Integration ⭐⭐⭐⭐⭐
```
Purpose:
- Protect against web attacks
- SQL injection, XSS, DDoS
- Rate limiting
- IP filtering

Configuration:
1. Create WAF Web ACL
2. Associate with CloudFront distribution
3. Define rules (allow, block, count)

Use Cases:
✅ DDoS protection (Layer 7)
✅ SQL injection protection
✅ XSS protection
✅ Rate limiting
✅ IP blocking
```

---

## CloudFront Performance Features ⭐⭐⭐⭐

### 1. Compression ⭐⭐⭐⭐
```
Purpose:
- Reduce file size
- Faster downloads
- Lower data transfer costs

Supported:
- Gzip
- Brotli (better compression)

Configuration:
- Enable in cache behavior
- CloudFront compresses automatically
- Requires Accept-Encoding header from client

Compression Ratio:
- Text files: 70-90% reduction
- HTML, CSS, JavaScript: 60-80% reduction
- Already compressed (images, videos): Minimal benefit

Requirements:
- File size: 1,000 to 10,000,000 bytes
- File types: text/*, application/javascript, application/json, etc.
- Client sends Accept-Encoding: gzip or br

Benefits:
✅ Faster page loads
✅ Lower data transfer costs
✅ Better user experience
```

### 2. Lambda@Edge and CloudFront Functions ⭐⭐⭐⭐
```
Purpose:
- Run code at edge locations
- Customize content delivery
- Modify requests/responses

CloudFront Functions:
- Lightweight JavaScript
- Sub-millisecond execution
- Millions of requests/sec
- Viewer request/response only
- Use: URL rewrites, header manipulation, simple logic

Lambda@Edge:
- Full Node.js or Python
- Millisecond execution
- Thousands of requests/sec
- All four triggers (viewer/origin request/response)
- Use: Complex logic, external API calls, image transformation

Triggers:
1. Viewer Request: After CloudFront receives request
2. Origin Request: Before CloudFront forwards to origin
3. Origin Response: After CloudFront receives response from origin
4. Viewer Response: Before CloudFront returns response to viewer

Use Cases:
✅ A/B testing (route to different origins)
✅ User authentication
✅ SEO optimization (modify headers)
✅ Image transformation
✅ URL rewrites
✅ Bot detection
```

---

## When to Use CloudFront ⭐⭐⭐⭐⭐

### ✅ Use CloudFront When
- Global user base
- Static content (images, videos, CSS, JavaScript)
- Dynamic content acceleration
- API acceleration
- Video streaming
- Software downloads
- Need DDoS protection
- Need to reduce origin load
- Need to reduce latency

### ❌ Don't Use CloudFront When
- Users in single location (use regional resources)
- Content changes very frequently (seconds)
- Very small user base
- Cost is primary concern (for low traffic)

---

## CloudFront vs S3 Transfer Acceleration ⭐⭐⭐⭐

| Feature | CloudFront | S3 Transfer Acceleration |
|---------|------------|--------------------------|
| **Purpose** | Content delivery (download) | Upload to S3 |
| **Direction** | Origin → Users | Users → S3 |
| **Caching** | Yes | No |
| **Use Case** | Distribute content globally | Upload large files globally |
| **Edge Locations** | 400+ | Same edge locations |

**Key Exam Tip**:
- **Download/distribute content** → CloudFront
- **Upload to S3** → S3 Transfer Acceleration

---

## Keywords to Identify CloudFront

- "CDN"
- "Content delivery"
- "Edge locations"
- "Global distribution"
- "Cache content"
- "Reduce latency"
- "Static content"
- "Video streaming"
- "DDoS protection"

---

## Common Exam Scenarios ⭐⭐⭐⭐⭐

### Scenario 1: Global Static Website
**Question**: Host static website with global users, minimize latency

**Answer**: S3 + CloudFront

**Why**:
- S3 for storage
- CloudFront for global distribution
- Cache at edge locations
- Lower latency for global users

### Scenario 2: Restrict S3 Access
**Question**: S3 bucket should only be accessible through CloudFront

**Answer**: Use Origin Access Control (OAC), make S3 bucket private

**Why**:
- OAC restricts S3 access to CloudFront only
- Users cannot bypass CloudFront
- More secure

### Scenario 3: Premium Content
**Question**: Restrict access to premium content for paid users

**Answer**: Use CloudFront Signed URLs or Signed Cookies

**Why**:
- Time-limited access
- Requires authentication
- Can restrict by IP
- Secure content delivery

### Scenario 4: Geo-Restriction
**Question**: Block content access from specific countries

**Answer**: Use CloudFront Geo Restriction

**Why**:
- Country-level blocking
- Compliance with licensing
- Simple configuration

### Scenario 5: Dynamic Content Acceleration
**Question**: Accelerate API requests globally

**Answer**: CloudFront with ALB as origin, disable caching for API paths

**Why**:
- CloudFront accelerates even without caching
- Optimized network path
- SSL/TLS termination at edge
- Lower latency

---

## CloudFront Best Practices ⭐⭐⭐⭐

### Performance
```
✅ Enable compression
✅ Use appropriate TTL values
✅ Use versioned URLs (avoid invalidations)
✅ Use multiple origins for different content types
✅ Enable HTTP/2
✅ Use Lambda@Edge for customization
```

### Security
```
✅ Use HTTPS (redirect HTTP to HTTPS)
✅ Use OAC for S3 origins
✅ Use Signed URLs/Cookies for restricted content
✅ Integrate with AWS WAF
✅ Enable access logs
✅ Use custom SSL certificates (ACM)
```

### Cost Optimization
```
✅ Use appropriate cache TTL (longer = cheaper)
✅ Use versioned URLs (avoid invalidations)
✅ Enable compression (reduce data transfer)
✅ Use CloudFront price classes (exclude expensive regions)
✅ Monitor usage with CloudWatch
```

---

## CloudFront Pricing

### Pricing Components
```
Data Transfer Out:
- Varies by region
- US/Europe: $0.085 per GB (first 10 TB/month)
- Asia: $0.140 per GB (first 10 TB/month)
- Volume discounts (more usage = lower price)

HTTP/HTTPS Requests:
- $0.0075 per 10,000 requests (HTTP)
- $0.0100 per 10,000 requests (HTTPS)

Invalidation Requests:
- First 1,000 paths per month: Free
- Beyond 1,000: $0.005 per path

Field-Level Encryption:
- $0.02 per 10,000 requests

Lambda@Edge:
- $0.60 per 1 million requests
- $0.00005001 per GB-second

CloudFront Functions:
- $0.10 per 1 million invocations

No charge for:
- Data transfer from origin to CloudFront
- Data transfer between CloudFront edge locations
```

---

# AWS Global Accelerator
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐

### What is Global Accelerator?
```
- Improve global application availability and performance
- Uses AWS global network
- Provides static anycast IPs
- Automatic failover
- Health checks
- DDoS protection (Shield Standard)
```

### How Global Accelerator Works ⭐⭐⭐⭐
```
Architecture:
User → Anycast IP → Nearest Edge Location → AWS Global Network → Application

Without Global Accelerator:
User → Internet → Application
- Multiple hops over public Internet
- Variable latency
- Potential packet loss

With Global Accelerator:
User → Edge Location (anycast IP) → AWS Global Network → Application
- Single hop to AWS network
- Consistent performance
- Lower latency
- Better reliability

Key Difference from CloudFront:
- CloudFront: Caches content at edge
- Global Accelerator: Routes traffic through AWS network (no caching)
```

---

## Global Accelerator Features ⭐⭐⭐⭐⭐

### 1. Static Anycast IPs ⭐⭐⭐⭐⭐
```
What are Anycast IPs?
- Two static IP addresses
- Announced from multiple edge locations
- User connects to nearest edge location
- Same IPs globally

Benefits:
✅ No DNS caching issues
✅ Instant failover (no DNS propagation)
✅ Easy whitelisting (static IPs)
✅ Simplified client configuration

Example:
Anycast IPs: 75.2.60.5, 99.83.190.51
User in US → Routes to US edge location
User in Europe → Routes to Europe edge location
Same IPs, different edge locations
```

### 2. Health Checks and Failover ⭐⭐⭐⭐
```
Health Checks:
- Monitor endpoint health
- Automatic failover to healthy endpoints
- Fast failover (30 seconds)

Configuration:
- Protocol: TCP or HTTP/HTTPS
- Port: Custom
- Interval: 10 or 30 seconds
- Threshold: 1-10 failures

Failover:
- Unhealthy endpoint detected
- Traffic automatically routed to healthy endpoint
- No DNS propagation delay
- Fast recovery
```

### 3. Traffic Dials and Endpoint Weights ⭐⭐⭐⭐
```
Traffic Dials:
- Control percentage of traffic to endpoint group
- 0-100%
- Use for blue/green deployments, maintenance

Example:
Endpoint Group A (us-east-1): Traffic dial 100%
Endpoint Group B (us-west-2): Traffic dial 0%
Result: All traffic to us-east-1

Endpoint Weights:
- Distribute traffic within endpoint group
- 0-255
- Similar to Route 53 weighted routing

Example:
Endpoint 1: Weight 128 (50% traffic)
Endpoint 2: Weight 128 (50% traffic)
```

### 4. Client Affinity ⭐⭐⭐⭐
```
Purpose:
- Route requests from same client to same endpoint
- Maintain session state

Options:
- None: No affinity (default)
- Source IP: Based on client IP address

Use Cases:
✅ Stateful applications
✅ Session persistence
✅ WebSocket connections
```

---

## Global Accelerator Endpoints ⭐⭐⭐⭐

### Supported Endpoints
```
✅ Network Load Balancer (NLB)
✅ Application Load Balancer (ALB)
✅ EC2 instances
✅ Elastic IP addresses

Note: Cannot use Classic Load Balancer
```

### Endpoint Groups ⭐⭐⭐⭐
```
What is an Endpoint Group?
- Logical grouping of endpoints
- One endpoint group per region
- Traffic dial per endpoint group

Example:
Accelerator
├─ Endpoint Group (us-east-1)
│  ├─ ALB 1
│  └─ ALB 2
└─ Endpoint Group (eu-west-1)
   ├─ NLB 1
   └─ NLB 2
```

---

## Global Accelerator vs CloudFront ⭐⭐⭐⭐⭐ (CRITICAL)

| Feature | Global Accelerator | CloudFront |
|---------|-------------------|------------|
| **Purpose** | Network acceleration | Content delivery (CDN) |
| **Caching** | No | Yes |
| **Protocols** | TCP, UDP | HTTP/HTTPS |
| **Use Case** | Non-HTTP (gaming, IoT, VoIP), HTTP | HTTP/HTTPS content |
| **IPs** | Static anycast IPs | Dynamic IPs |
| **Failover** | Fast (30 sec) | Depends on DNS TTL |
| **Origin** | AWS only (ALB, NLB, EC2, EIP) | AWS or custom |
| **DDoS Protection** | Shield Standard | Shield Standard |

**Key Exam Tips**:
- **HTTP/HTTPS with caching** → CloudFront
- **TCP/UDP, gaming, IoT, VoIP** → Global Accelerator
- **Need static IPs** → Global Accelerator
- **Fast failover** → Global Accelerator

---

## When to Use Global Accelerator ⭐⭐⭐⭐⭐

### ✅ Use Global Accelerator When
- Non-HTTP protocols (TCP, UDP)
- Gaming applications
- IoT applications
- VoIP applications
- Need static IPs (whitelisting)
- Need fast failover (no DNS caching)
- Global application with multiple regions
- Need consistent performance

### ❌ Don't Use Global Accelerator When
- HTTP/HTTPS with caching → Use CloudFront
- Single region application
- Cost is primary concern
- Don't need static IPs

---

## Keywords to Identify Global Accelerator

- "Static IP"
- "Anycast IP"
- "Gaming application"
- "IoT"
- "VoIP"
- "TCP/UDP"
- "Fast failover"
- "Global application"
- "Consistent performance"
- "AWS global network"

---

## Common Exam Scenarios ⭐⭐⭐⭐⭐

### Scenario 1: Gaming Application
**Question**: Global gaming application needs low latency and static IPs

**Answer**: Use AWS Global Accelerator

**Why**:
- Optimized for TCP/UDP (gaming)
- Static anycast IPs
- Low latency via AWS global network
- Fast failover

### Scenario 2: IoT Application
**Question**: IoT devices worldwide need to connect to application

**Answer**: Use AWS Global Accelerator

**Why**:
- Static IPs (easy device configuration)
- TCP/UDP support
- Global network optimization
- High availability

### Scenario 3: IP Whitelisting
**Question**: Application needs static IPs for client firewall whitelisting

**Answer**: Use AWS Global Accelerator

**Why**:
- Provides two static anycast IPs
- IPs don't change
- Easy whitelisting
- Global access

### Scenario 4: Fast Failover
**Question**: Application needs instant failover without DNS caching delays

**Answer**: Use AWS Global Accelerator

**Why**:
- Fast failover (30 seconds)
- No DNS propagation delay
- Anycast IPs (no DNS caching)
- Automatic health checks

---

## Global Accelerator Best Practices

### High Availability
```
✅ Deploy endpoints in multiple regions
✅ Use health checks
✅ Configure appropriate failover thresholds
✅ Test failover scenarios
✅ Monitor with CloudWatch
```

### Performance
```
✅ Use endpoint weights for load distribution
✅ Enable client affinity (if needed)
✅ Deploy endpoints close to users
✅ Use appropriate endpoint types (ALB, NLB)
```

### Cost Optimization
```
✅ Use traffic dials for gradual rollouts
✅ Monitor usage with CloudWatch
✅ Delete unused accelerators
✅ Right-size endpoints
```

---

## Global Accelerator Pricing

### Pricing Components
```
Fixed Fee:
- $0.025 per hour per accelerator

Data Transfer Premium:
- $0.015 per GB (in addition to standard data transfer)
- Charged for data transferred over AWS global network

Example:
1 accelerator, 1 TB data transfer per month:
Fixed: $0.025 × 730 hours = $18.25
Data transfer premium: 1,000 GB × $0.015 = $15
Total: $33.25/month (plus standard data transfer costs)
```

---

# AWS Direct Connect
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐⭐ (CRITICAL)

### What is Direct Connect?
```
- Dedicated network connection from on-premises to AWS
- Private connection (not over Internet)
- Consistent network performance
- Reduced bandwidth costs
- Supports hybrid architectures
```

### Why Use Direct Connect? ⭐⭐⭐⭐⭐
```
Without Direct Connect (VPN over Internet):
On-Premises → Internet → AWS
- Variable latency
- Shared bandwidth
- Security concerns (public Internet)
- Higher data transfer costs

With Direct Connect:
On-Premises → Dedicated Connection → AWS
- Consistent latency
- Dedicated bandwidth
- Private connection
- Lower data transfer costs
- More reliable
```

---

## Direct Connect Components ⭐⭐⭐⭐⭐

### 1. Direct Connect Location
```
- AWS Direct Connect facility
- Colocation facility or data center
- Where physical connection is made
- 100+ locations worldwide
```

### 2. Connection Types ⭐⭐⭐⭐⭐

#### Dedicated Connection
```
- Physical Ethernet connection
- Dedicated to single customer
- Speeds: 1 Gbps, 10 Gbps, 100 Gbps
- Provisioned by AWS
- Takes 1+ months to provision

Use Cases:
✅ High bandwidth requirements
✅ Consistent performance needed
✅ Large enterprise
```

#### Hosted Connection
```
- Provided by AWS Direct Connect Partner
- Shared physical connection
- Speeds: 50 Mbps to 10 Gbps
- Faster provisioning (days to weeks)
- More flexible

Use Cases:
✅ Lower bandwidth requirements
✅ Faster provisioning needed
✅ Small to medium business
```

### 3. Virtual Interfaces (VIFs) ⭐⭐⭐⭐⭐

#### Private VIF
```
Purpose:
- Access VPC resources privately
- Connect to VPC via Virtual Private Gateway (VGW)

Use Cases:
✅ Access EC2, RDS, etc. in VPC
✅ Private connectivity
✅ Hybrid cloud

Architecture:
On-Premises → Direct Connect → Private VIF → VGW → VPC
```

#### Public VIF
```
Purpose:
- Access AWS public services (S3, DynamoDB, etc.)
- Does NOT go over Internet
- Uses AWS public IP addresses

Use Cases:
✅ Access S3, DynamoDB privately
✅ Bypass Internet for public services
✅ Lower data transfer costs

Architecture:
On-Premises → Direct Connect → Public VIF → AWS Public Services (S3, DynamoDB)

Note: Cannot access Internet through Public VIF
```

#### Transit VIF
```
Purpose:
- Connect to Transit Gateway
- Access multiple VPCs through single VIF

Use Cases:
✅ Connect to many VPCs
✅ Centralized connectivity
✅ Simplified management

Architecture:
On-Premises → Direct Connect → Transit VIF → Transit Gateway → Multiple VPCs
```

---

## Direct Connect Gateway ⭐⭐⭐⭐⭐

### What is Direct Connect Gateway?
```
- Connect to multiple VPCs in different regions
- Single Direct Connect connection
- Centralized connectivity

Without Direct Connect Gateway:
- One Private VIF per VPC
- Limited to 50 VIFs per connection
- Complex management

With Direct Connect Gateway:
- One Private VIF to Direct Connect Gateway
- Connect to multiple VPCs (any region)
- Simplified management
```

### Architecture ⭐⭐⭐⭐⭐
```
On-Premises
    ↓
Direct Connect
    ↓
Private VIF
    ↓
Direct Connect Gateway
    ↓
├─ VGW (VPC in us-east-1)
├─ VGW (VPC in us-west-2)
└─ VGW (VPC in eu-west-1)

Benefits:
✅ Single connection to multiple VPCs
✅ Cross-region connectivity
✅ Simplified management
✅ Cost-effective
```

---

## Direct Connect High Availability ⭐⭐⭐⭐⭐

### Single Point of Failure Risks
```
Risks:
❌ Single Direct Connect connection (connection failure)
❌ Single Direct Connect location (facility failure)
❌ Single customer router (router failure)

Solution: Redundancy at multiple levels
```

### High Availability Architectures ⭐⭐⭐⭐⭐

#### 1. Dual Connections (Same Location)
```
Architecture:
On-Premises
├─ Router 1 → Direct Connect 1 → AWS
└─ Router 2 → Direct Connect 2 → AWS

Protection:
✅ Connection failure
✅ Router failure

Risk:
❌ Direct Connect location failure
```

#### 2. Dual Connections (Different Locations)
```
Architecture:
On-Premises
├─ Router 1 → Direct Connect Location A → AWS
└─ Router 2 → Direct Connect Location B → AWS

Protection:
✅ Connection failure
✅ Router failure
✅ Direct Connect location failure

Recommendation: Maximum high availability
```

#### 3. Direct Connect + VPN Backup ⭐⭐⭐⭐⭐
```
Architecture:
On-Premises
├─ Primary: Direct Connect → AWS
└─ Backup: VPN over Internet → AWS

Protection:
✅ Direct Connect failure
✅ Automatic failover to VPN

Benefits:
✅ Cost-effective (VPN cheaper than second Direct Connect)
✅ Fast failover
✅ Good for most use cases

Considerations:
- VPN has lower bandwidth
- VPN has higher latency
- VPN goes over Internet
```

---

## Direct Connect + VPN (Encryption) ⭐⭐⭐⭐⭐

### Problem
```
Direct Connect is NOT encrypted by default
- Private connection, but not encrypted
- Data visible to AWS and network providers
```

### Solution: VPN over Direct Connect ⭐⭐⭐⭐⭐
```
Architecture:
On-Premises → Direct Connect → Public VIF → VPN → VPC

Process:
1. Establish Direct Connect with Public VIF
2. Create VPN connection over Direct Connect
3. Traffic encrypted end-to-end

Benefits:
✅ Encryption (IPsec)
✅ Consistent performance (Direct Connect)
✅ Private connection
✅ Compliance requirements met

Use Cases:
✅ Regulatory requirements (encryption)
✅ Sensitive data
✅ Compliance (HIPAA, PCI DSS)
```

---

## When to Use Direct Connect ⭐⭐⭐⭐⭐

### ✅ Use Direct Connect When
- High bandwidth requirements (> 1 Gbps)
- Consistent network performance needed
- Hybrid cloud architecture
- Large data transfers (reduce costs)
- Low latency required
- Private connectivity to AWS
- Compliance requirements

### ❌ Don't Use Direct Connect When
- Low bandwidth requirements (< 100 Mbps) → Use VPN
- Temporary connectivity needed → Use VPN
- Cost is primary concern → Use VPN
- Quick setup needed (< 1 month) → Use VPN

---

## Direct Connect vs VPN ⭐⭐⭐⭐⭐ (CRITICAL)

| Feature | Direct Connect | Site-to-Site VPN |
|---------|----------------|------------------|
| **Connection** | Dedicated private | Over Internet |
| **Bandwidth** | 50 Mbps - 100 Gbps | Up to 1.25 Gbps per tunnel |
| **Latency** | Consistent, low | Variable |
| **Setup Time** | 1+ months | Minutes |
| **Cost** | Higher (port + data) | Lower |
| **Encryption** | Not by default (add VPN) | Yes (IPsec) |
| **Use Case** | High bandwidth, consistent performance | Quick setup, encryption, backup |

**Key Exam Tips**:
- **High bandwidth, consistent performance** → Direct Connect
- **Quick setup, encryption, low cost** → VPN
- **Best of both** → Direct Connect + VPN backup

---

## Keywords to Identify Direct Connect

- "Dedicated connection"
- "Private connection"
- "On-premises to AWS"
- "Hybrid cloud"
- "Consistent performance"
- "High bandwidth"
- "Reduce data transfer costs"
- "1 Gbps, 10 Gbps"
- "Colocation"

---

## Common Exam Scenarios ⭐⭐⭐⭐⭐

### Scenario 1: High Bandwidth Requirement
**Question**: Transfer 10 TB data monthly from on-premises to AWS, need consistent performance

**Answer**: Use AWS Direct Connect

**Why**:
- High bandwidth (1-100 Gbps)
- Consistent performance
- Lower data transfer costs
- Reliable connection

### Scenario 2: Hybrid Cloud
**Question**: On-premises data center needs private connectivity to multiple VPCs

**Answer**: Use Direct Connect with Direct Connect Gateway

**Why**:
- Private connectivity
- Single connection to multiple VPCs
- Cross-region support
- Consistent performance

### Scenario 3: Encryption Required
**Question**: Direct Connect needed but data must be encrypted

**Answer**: Use VPN over Direct Connect (Public VIF)

**Why**:
- Direct Connect for performance
- VPN for encryption
- Meets compliance requirements
- Best of both worlds

### Scenario 4: High Availability
**Question**: Critical application needs maximum availability for on-premises to AWS connectivity

**Answer**: Dual Direct Connect connections in different locations + VPN backup

**Why**:
- Redundant Direct Connect (different locations)
- VPN backup (if both Direct Connect fail)
- Maximum availability
- Multiple failure protection

### Scenario 5: Quick Setup Needed
**Question**: Need to connect on-premises to AWS within 1 week

**Answer**: Use Site-to-Site VPN (not Direct Connect)

**Why**:
- VPN setup in minutes
- Direct Connect takes 1+ months
- Quick connectivity needed
- Can migrate to Direct Connect later

---

## Direct Connect Best Practices ⭐⭐⭐⭐

### High Availability
```
✅ Use dual connections (different locations)
✅ Use VPN as backup
✅ Monitor connection health
✅ Test failover scenarios
✅ Use BGP for automatic failover
```

### Security
```
✅ Use VPN over Direct Connect (encryption)
✅ Use Private VIF for VPC access
✅ Implement network segmentation
✅ Monitor with CloudWatch
✅ Use IAM for access control
```

### Performance
```
✅ Choose appropriate bandwidth
✅ Use Direct Connect Gateway (multiple VPCs)
✅ Optimize routing (BGP)
✅ Monitor latency and throughput
✅ Use jumbo frames (MTU 9001)
```

### Cost Optimization
```
✅ Right-size bandwidth
✅ Use Direct Connect for large data transfers
✅ Monitor usage with CloudWatch
✅ Consider hosted connection (lower bandwidth)
✅ Use VPN for backup (cheaper than second Direct Connect)
```

---

## Direct Connect Pricing

### Pricing Components
```
Port Hours:
- 1 Gbps: $0.30 per hour (~$219/month)
- 10 Gbps: $2.25 per hour (~$1,643/month)
- 100 Gbps: $22.50 per hour (~$16,425/month)

Data Transfer OUT:
- Reduced rates compared to Internet
- Varies by region
- Example (US): $0.02 per GB (vs $0.09 Internet)

Data Transfer IN:
- Free

Example (1 Gbps, 10 TB OUT per month):
Port: $219
Data OUT: 10,000 GB × $0.02 = $200
Total: $419/month

Savings vs Internet:
Internet data OUT: 10,000 GB × $0.09 = $900
Direct Connect: $419
Savings: $481/month
```

---

# AWS Site-to-Site VPN
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐⭐ (CRITICAL)

### What is Site-to-Site VPN?
```
- Encrypted connection over Internet
- Connect on-premises network to AWS VPC
- IPsec VPN tunnels
- Quick setup (minutes)
- Cost-effective
```

### How Site-to-Site VPN Works ⭐⭐⭐⭐⭐
```
Architecture:
On-Premises Network → Customer Gateway → Internet → Virtual Private Gateway → VPC

Components:
1. Customer Gateway (CGW): On-premises VPN device
2. Virtual Private Gateway (VGW): AWS side VPN endpoint
3. VPN Connection: Two IPsec tunnels (redundancy)
```

---

## Site-to-Site VPN Components ⭐⭐⭐⭐⭐

### 1. Virtual Private Gateway (VGW) ⭐⭐⭐⭐⭐
```
What is VGW?
- VPN concentrator on AWS side
- Attached to VPC
- Supports multiple VPN connections
- Highly available (AWS managed)

Configuration:
1. Create VGW
2. Attach to VPC
3. Enable route propagation (optional)
4. Update route tables

Route Propagation:
- Automatic route updates
- BGP routes from on-premises
- Simplifies routing management
```

### 2. Customer Gateway (CGW) ⭐⭐⭐⭐⭐
```
What is CGW?
- Physical device or software on-premises
- Customer side of VPN connection
- Public IP address required

Supported Devices:
✅ Cisco ASA
✅ Juniper SRX
✅ Palo Alto
✅ pfSense
✅ Software VPN (OpenSwan, Libreswan)

Configuration:
- Public IP address (static)
- BGP ASN (if using dynamic routing)
- Device type and vendor
```

### 3. VPN Connection ⭐⭐⭐⭐⭐
```
What is VPN Connection?
- Logical connection between CGW and VGW
- Two IPsec tunnels (high availability)
- Encrypted (IPsec)

Tunnels:
- Tunnel 1: Primary
- Tunnel 2: Backup (redundancy)
- Both active (ECMP if supported)

Routing:
- Static routing: Manual route configuration
- Dynamic routing: BGP (recommended)
```

---

## Site-to-Site VPN Routing ⭐⭐⭐⭐⭐

### Static Routing
```
Configuration:
- Manually specify routes
- No BGP
- Simple setup

Use Cases:
✅ Simple network
✅ Few routes
✅ Device doesn't support BGP

Limitations:
❌ Manual updates needed
❌ No automatic failover
❌ Less flexible
```

### Dynamic Routing (BGP) ⭐⭐⭐⭐⭐
```
Configuration:
- Use BGP (Border Gateway Protocol)
- Automatic route exchange
- Dynamic failover

Use Cases:
✅ Complex network
✅ Many routes
✅ Automatic failover needed
✅ Multiple VPN connections

Benefits:
✅ Automatic route updates
✅ Automatic failover
✅ Load balancing (ECMP)
✅ More flexible

Recommendation: Use BGP for production
```

---

## Site-to-Site VPN High Availability ⭐⭐⭐⭐⭐

### Default HA (Two Tunnels)
```
Architecture:
On-Premises CGW
├─ Tunnel 1 → VGW (AZ-A)
└─ Tunnel 2 → VGW (AZ-B)

Protection:
✅ Single tunnel failure
✅ Single AZ failure (AWS side)

Risk:
❌ Customer Gateway failure
```

### Maximum HA (Dual CGW + Dual VPN) ⭐⭐⭐⭐⭐
```
Architecture:
On-Premises
├─ CGW 1
│  ├─ Tunnel 1 → VGW
│  └─ Tunnel 2 → VGW
└─ CGW 2
   ├─ Tunnel 3 → VGW
   └─ Tunnel 4 → VGW

Total: 4 tunnels (2 CGW × 2 tunnels each)

Protection:
✅ Tunnel failure
✅ Customer Gateway failure
✅ AZ failure (AWS side)

Recommendation: Maximum high availability
```

---

## Site-to-Site VPN Acceleration ⭐⭐⭐⭐

### VPN with Global Accelerator
```
Problem:
- VPN over Internet (variable performance)
- Multiple hops
- Potential packet loss

Solution:
- Enable acceleration on VPN connection
- Uses AWS Global Accelerator
- Traffic routed through AWS global network

Benefits:
✅ Consistent performance
✅ Lower latency
✅ Better reliability
✅ Fewer hops

Cost:
- Additional charge for acceleration
- $0.025 per hour per accelerator
- Data transfer premium

Use Cases:
✅ Global connectivity
✅ Consistent performance needed
✅ Multiple remote locations
```

---

## CloudHub (Multiple Site-to-Site VPN) ⭐⭐⭐⭐

### What is CloudHub?
```
- Connect multiple on-premises sites through AWS
- Hub-and-spoke model
- Sites can communicate with each other
- Uses single Virtual Private Gateway
```

### CloudHub Architecture ⭐⭐⭐⭐
```
Architecture:
        VGW (Hub)
         ↓
    ┌────┼────┐
    ↓    ↓    ↓
  Site1 Site2 Site3

Communication:
- Site1 ↔ VPC ✅
- Site2 ↔ VPC ✅
- Site3 ↔ VPC ✅
- Site1 ↔ Site2 ✅ (through VGW)
- Site1 ↔ Site3 ✅ (through VGW)
- Site2 ↔ Site3 ✅ (through VGW)

Requirements:
- Dynamic routing (BGP)
- Unique BGP ASN per site
- Non-overlapping IP ranges

Use Cases:
✅ Multiple branch offices
✅ Site-to-site communication
✅ Hub-and-spoke topology
✅ Cost-effective (vs dedicated connections)
```

---

## When to Use Site-to-Site VPN ⭐⭐⭐⭐⭐

### ✅ Use Site-to-Site VPN When
- Quick setup needed (minutes)
- Low to medium bandwidth (< 1.25 Gbps)
- Cost-effective solution needed
- Encryption required
- Temporary connectivity
- Backup for Direct Connect
- Multiple small sites (CloudHub)

### ❌ Don't Use Site-to-Site VPN When
- High bandwidth needed (> 1.25 Gbps) → Use Direct Connect
- Consistent performance critical → Use Direct Connect
- Large data transfers → Use Direct Connect
- Very low latency required → Use Direct Connect

---

## Keywords to Identify Site-to-Site VPN

- "VPN"
- "Encrypted connection"
- "IPsec"
- "On-premises to VPC"
- "Quick setup"
- "Customer Gateway"
- "Virtual Private Gateway"
- "Cost-effective"
- "Internet-based"

---

## Common Exam Scenarios ⭐⭐⭐⭐⭐

### Scenario 1: Quick Connectivity
**Question**: Connect on-premises to AWS within 1 hour

**Answer**: Use Site-to-Site VPN

**Why**:
- Setup in minutes
- No physical installation
- Over Internet
- Immediate connectivity

### Scenario 2: Backup for Direct Connect
**Question**: Direct Connect needs backup connection

**Answer**: Use Site-to-Site VPN as backup

**Why**:
- Cost-effective backup
- Automatic failover (BGP)
- Encrypted
- Quick setup

### Scenario 3: Multiple Branch Offices
**Question**: Connect 5 branch offices to AWS and to each other

**Answer**: Use AWS VPN CloudHub

**Why**:
- Hub-and-spoke topology
- Single VGW for all sites
- Sites can communicate
- Cost-effective

### Scenario 4: Encryption Required
**Question**: Connect on-premises to AWS with encryption

**Answer**: Use Site-to-Site VPN

**Why**:
- IPsec encryption by default
- Secure over Internet
- Meets compliance requirements

---

## Site-to-Site VPN Best Practices ⭐⭐⭐⭐

### High Availability
```
✅ Use both VPN tunnels
✅ Use dynamic routing (BGP)
✅ Deploy dual Customer Gateways
✅ Monitor tunnel status
✅ Test failover scenarios
```

### Security
```
✅ Use strong encryption (AES-256)
✅ Rotate pre-shared keys regularly
✅ Use IKEv2 (latest)
✅ Restrict access with security groups
✅ Monitor with CloudWatch
```

### Performance
```
✅ Use VPN acceleration (if needed)
✅ Enable both tunnels (ECMP)
✅ Monitor bandwidth usage
✅ Optimize MTU (1400 bytes recommended)
✅ Use BGP for automatic failover
```

---

## Site-to-Site VPN Pricing

### Pricing Components
```
VPN Connection:
- $0.05 per hour per VPN connection
- ~$36.50 per month

Data Transfer:
- Data OUT: Standard AWS rates ($0.09 per GB)
- Data IN: Free

VPN Acceleration (optional):
- $0.025 per hour per accelerator
- Data transfer premium

Example (1 VPN connection, 1 TB OUT):
VPN: $36.50
Data OUT: 1,000 GB × $0.09 = $90
Total: $126.50/month
```

---

# AWS Client VPN
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐

### What is Client VPN?
```
- Managed VPN service for remote users
- OpenVPN-based
- Connect individual users to AWS and on-premises
- Secure remote access
- Scalable (thousands of users)
```

### Client VPN vs Site-to-Site VPN ⭐⭐⭐⭐

| Feature | Client VPN | Site-to-Site VPN |
|---------|------------|------------------|
| **Purpose** | Remote users | Site-to-site |
| **Users** | Individual users | Networks |
| **Protocol** | OpenVPN | IPsec |
| **Authentication** | Active Directory, SAML, certificate | Pre-shared key, certificate |
| **Use Case** | Remote workers | Connect offices/data centers |

---

## Client VPN Components ⭐⭐⭐⭐

### 1. Client VPN Endpoint
```
- VPN concentrator in AWS
- Associated with VPC and subnets
- Handles client connections
- Scalable (AWS managed)
```

### 2. Target Network
```
- VPC subnets where clients connect
- Multiple subnets for high availability
- Different AZs recommended
```

### 3. Authentication
```
Options:
- Active Directory (AWS Managed Microsoft AD)
- SAML 2.0 (Okta, Azure AD, etc.)
- Mutual certificate authentication

Recommendation: Active Directory or SAML for centralized management
```

### 4. Authorization
```
- Network-based: Security groups, NACLs
- User-based: Authorization rules (specific users/groups)

Example:
- Group "Developers" → Access to dev VPC
- Group "Admins" → Access to all VPCs
```

---

## Client VPN Architecture ⭐⭐⭐⭐

### Basic Architecture
```
Remote User (OpenVPN client)
    ↓
Internet
    ↓
Client VPN Endpoint
    ↓
VPC Subnets
    ↓
AWS Resources (EC2, RDS, etc.)
```

### Split Tunnel vs Full Tunnel ⭐⭐⭐⭐
```
Split Tunnel:
- Only AWS traffic goes through VPN
- Internet traffic goes directly
- Better performance
- Lower data transfer costs

Full Tunnel:
- All traffic goes through VPN
- Internet traffic also through VPN
- More secure (all traffic monitored)
- Higher data transfer costs

Recommendation: Split tunnel for most use cases
```

---

## When to Use Client VPN ⭐⭐⭐⭐

### ✅ Use Client VPN When
- Remote workers need access to AWS
- Remote workers need access to on-premises (via VPN/Direct Connect)
- Need centralized authentication (AD, SAML)
- Need to scale to thousands of users
- Need secure remote access

### ❌ Don't Use Client VPN When
- Site-to-site connectivity → Use Site-to-Site VPN
- Simple remote access → Use bastion host
- Very few users → Consider alternatives

---

## Keywords to Identify Client VPN

- "Remote users"
- "Remote workers"
- "OpenVPN"
- "Individual users"
- "Work from home"
- "Remote access"
- "SAML authentication"
- "Active Directory authentication"

---

## Common Exam Scenarios ⭐⭐⭐⭐

### Scenario 1: Remote Workers
**Question**: 500 remote workers need secure access to AWS resources

**Answer**: Use AWS Client VPN

**Why**:
- Designed for remote users
- Scalable (thousands of users)
- Secure (encrypted)
- Centralized authentication

### Scenario 2: Active Directory Integration
**Question**: Remote users should authenticate with corporate Active Directory

**Answer**: Use Client VPN with AWS Managed Microsoft AD

**Why**:
- Integrates with Active Directory
- Centralized user management
- Single sign-on experience
- Existing credentials

---

## Client VPN Pricing

### Pricing Components
```
Endpoint Association:
- $0.10 per hour per subnet association
- ~$73 per month per subnet

Connection:
- $0.05 per hour per active connection
- ~$36.50 per month per user (if connected 24/7)

Data Transfer:
- Standard AWS data transfer rates

Example (2 subnets, 100 users, 8 hours/day):
Subnets: 2 × $73 = $146
Connections: 100 × $0.05 × 8 × 30 = $1,200
Total: $1,346/month
```

---

# AWS Transit Gateway
[BackToTop](#table-of-contents)
## Core Concepts ⭐⭐⭐⭐⭐ (CRITICAL)

### What is Transit Gateway?
```
- Network transit hub
- Connect VPCs, VPN, Direct Connect
- Hub-and-spoke topology
- Simplifies network architecture
- Centralized management
- Transitive routing (unlike VPC Peering)
```

### Why Use Transit Gateway? ⭐⭐⭐⭐⭐
```
Without Transit Gateway (VPC Peering):
- Mesh topology (n*(n-1)/2 connections)
- Complex management
- No transitive routing

Example (5 VPCs):
- Peering connections: 5*(5-1)/2 = 10
- Route table entries: 4 per VPC = 20 total
- Complex and unscalable

With Transit Gateway:
- Hub-and-spoke topology
- Single connection per VPC
- Centralized management
- Transitive routing

Example (5 VPCs):
- Connections: 5 (one per VPC)
- Route table entries: 1 per VPC = 5 total
- Simple and scalable
```

---

## Transit Gateway Architecture ⭐⭐⭐⭐⭐

### Basic Architecture
```
        Transit Gateway (Hub)
              ↓
    ┌─────────┼─────────┐
    ↓         ↓         ↓
  VPC-A     VPC-B     VPC-C
    ↓         ↓         ↓
  VPN    Direct    VPC-D
         Connect

All connected through single Transit Gateway
Transitive routing enabled
```

### Attachments ⭐⭐⭐⭐⭐
```
Supported Attachments:
✅ VPC
✅ VPN connection
✅ Direct Connect Gateway
✅ Transit Gateway peering (cross-region)
✅ Transit Gateway Connect (SD-WAN)

Each attachment connects to Transit Gateway
```

---

## Transit Gateway Features ⭐⭐⭐⭐⭐

### 1. Transitive Routing ⭐⭐⭐⭐⭐
```
What is Transitive Routing?
- Traffic can route through Transit Gateway to other attachments
- VPC-A can reach VPC-B through Transit Gateway
- VPC-A can reach on-premises through VPN attached to Transit Gateway

Example:
VPC-A → Transit Gateway → VPN → On-Premises ✅
(Transitive routing works)

vs. VPC Peering:
VPC-A → VPC-B → VPN → On-Premises ❌
(No transitive routing)
```

### 2. Route Tables ⭐⭐⭐⭐⭐
```
Transit Gateway Route Tables:
- Control routing between attachments
- Multiple route tables supported
- Isolate traffic between attachments

Example:
Route Table 1 (Production):
- VPC-Prod-A → VPC-Prod-B ✅
- VPC-Prod-A → VPC-Dev ❌

Route Table 2 (Development):
- VPC-Dev-A → VPC-Dev-B ✅
- VPC-Dev-A → VPC-Prod ❌

Use Cases:
✅ Isolate production from development
✅ Isolate different departments
✅ Compliance requirements
```

### 3. Transit Gateway Peering ⭐⭐⭐⭐
```
What is Transit Gateway Peering?
- Connect Transit Gateways in different regions
- Inter-region connectivity
- Transitive routing across regions

Architecture:
Region 1 (us-east-1):
  Transit Gateway 1 → VPC-A, VPC-B
      ↓ (Peering)
Region 2 (eu-west-1):
  Transit Gateway 2 → VPC-C, VPC-D

Result:
- VPC-A (us-east-1) can reach VPC-C (eu-west-1)
- Through Transit Gateway peering
- Transitive routing

Use Cases:
✅ Global applications
✅ Multi-region architectures
✅ Disaster recovery
```

### 4. Multicast Support ⭐⭐⭐
```
What is Multicast?
- One-to-many communication
- Single source, multiple receivers
- Efficient for streaming, video distribution

Use Cases:
✅ Video streaming
✅ Financial data feeds
✅ Software distribution
✅ IoT applications

Note: Only Transit Gateway supports multicast in AWS
```

### 5. Equal-Cost Multi-Path (ECMP) ⭐⭐⭐⭐
```
What is ECMP?
- Load balance traffic across multiple paths
- Multiple VPN connections
- Aggregate bandwidth

Example:
Transit Gateway
├─ VPN 1 (1.25 Gbps)
├─ VPN 2 (1.25 Gbps)
└─ VPN 3 (1.25 Gbps)

Total bandwidth: 3.75 Gbps (with ECMP)

Use Cases:
✅ Increase VPN bandwidth
✅ High availability
✅ Load balancing
```

---

## Transit Gateway vs VPC Peering ⭐⭐⭐⭐⭐ (CRITICAL)

| Feature | Transit Gateway | VPC Peering |
|---------|----------------|-------------|
| **Topology** | Hub-and-spoke | Mesh (point-to-point) |
| **Scalability** | High (thousands of VPCs) | Low (limited connections) |
| **Transitive Routing** | Yes | No |
| **Management** | Centralized | Distributed |
| **Cross-Region** | Yes (peering) | Yes |
| **VPN/Direct Connect** | Yes | No |
| **Cost** | Higher (per attachment + data) | Lower (data only, same region free) |
| **Use Case** | Many VPCs, complex topology | Few VPCs, simple topology |

**Key Exam Tips**:
- **Many VPCs (>10), complex topology** → Transit Gateway
- **Few VPCs (2-10), simple** → VPC Peering
- **Need transitive routing** → Transit Gateway
- **Cost-sensitive, simple** → VPC Peering

---

## Transit Gateway Route Tables ⭐⭐⭐⭐⭐

### Default Route Table
```
- Created automatically with Transit Gateway
- All attachments associated by default
- All attachments can communicate

Example:
Default Route Table:
- VPC-A → All other attachments ✅
- VPC-B → All other attachments ✅
- VPN → All other attachments ✅
```

### Custom Route Tables ⭐⭐⭐⭐⭐
```
Purpose:
- Isolate traffic
- Control routing
- Implement security policies

Example: Isolate Production from Development

Production Route Table:
- VPC-Prod-A → VPC-Prod-B ✅
- VPC-Prod-A → VPC-Dev ❌
- VPC-Prod-A → On-Premises (VPN) ✅

Development Route Table:
- VPC-Dev-A → VPC-Dev-B ✅
- VPC-Dev-A → VPC-Prod ❌
- VPC-Dev-A → On-Premises (VPN) ✅

Shared Services Route Table:
- VPC-Shared → VPC-Prod ✅
- VPC-Shared → VPC-Dev ✅
- VPC-Shared → On-Premises ✅

Use Cases:
✅ Environment isolation (prod/dev/test)
✅ Department isolation
✅ Compliance requirements
✅ Security policies
```

---

## When to Use Transit Gateway ⭐⭐⭐⭐⭐

### ✅ Use Transit Gateway When
- Many VPCs (>10)
- Complex network topology
- Need transitive routing
- Centralized management needed
- Connect VPCs + VPN + Direct Connect
- Multi-region connectivity
- Need network segmentation
- Scalability important

### ❌ Don't Use Transit Gateway When
- Few VPCs (2-10) → Use VPC Peering
- Simple topology → Use VPC Peering
- Cost is primary concern → Use VPC Peering
- No transitive routing needed → Use VPC Peering

---

## Keywords to Identify Transit Gateway

- "Many VPCs"
- "Hub-and-spoke"
- "Transitive routing"
- "Centralized network"
- "Complex topology"
- "Network segmentation"
- "Scalable network"
- "Connect VPCs and on-premises"

---

## Common Exam Scenarios ⭐⭐⭐⭐⭐

### Scenario 1: Many VPCs
**Question**: Connect 50 VPCs in same region

**Answer**: Use Transit Gateway

**Why**:
- Hub-and-spoke topology
- 50 connections (vs 1,225 peering connections)
- Centralized management
- Scalable

### Scenario 2: Transitive Routing
**Question**: VPC-A needs to access on-premises through VPC-B's VPN

**Answer**: Use Transit Gateway (not VPC Peering)

**Why**:
- Transit Gateway supports transitive routing
- VPC Peering does not
- Single Transit Gateway with VPC and VPN attachments

### Scenario 3: Network Segmentation
**Question**: Isolate production VPCs from development VPCs

**Answer**: Use Transit Gateway with separate route tables

**Why**:
- Multiple route tables
- Control routing between attachments
- Isolate environments
- Centralized management

### Scenario 4: Multi-Region Connectivity
**Question**: Connect VPCs in us-east-1 and eu-west-1

**Answer**: Use Transit Gateway peering

**Why**:
- Transit Gateway in each region
- Peering connection between Transit Gateways
- Transitive routing across regions
- Centralized management

### Scenario 5: Increase VPN Bandwidth
**Question**: Need more than 1.25 Gbps VPN bandwidth

**Answer**: Use Transit Gateway with multiple VPN connections and ECMP

**Why**:
- ECMP load balances across VPN connections
- Aggregate bandwidth (e.g., 4 VPNs = 5 Gbps)
- High availability
- Cost-effective vs Direct Connect

---

## Transit Gateway Best Practices ⭐⭐⭐⭐

### Design
```
✅ Use hub-and-spoke topology
✅ Plan route tables (isolation)
✅ Use descriptive names
✅ Document network architecture
✅ Plan for growth
```

### High Availability
```
✅ Deploy in multiple AZs (automatic)
✅ Use multiple VPN connections (ECMP)
✅ Use Transit Gateway peering (multi-region)
✅ Monitor with CloudWatch
✅ Test failover scenarios
```

### Security
```
✅ Use route tables for isolation
✅ Use security groups and NACLs
✅ Enable VPC Flow Logs
✅ Monitor with CloudWatch
✅ Use IAM for access control
```

### Cost Optimization
```
✅ Use VPC Peering for simple topologies
✅ Monitor attachment usage
✅ Delete unused attachments
✅ Use appropriate data transfer strategies
✅ Consider cross-region costs
```

---

## Transit Gateway Pricing

### Pricing Components
```
Attachments:
- $0.05 per hour per attachment
- ~$36.50 per month per attachment

Data Processing:
- $0.02 per GB processed

Example (10 VPC attachments, 100 TB data):
Attachments: 10 × $36.50 = $365
Data: 100,000 GB × $0.02 = $2,000
Total: $2,365/month

vs. VPC Peering (same region):
Peering connections: 45 (10*9/2)
Data transfer: Free (same region)
Total: $0/month

Note: Transit Gateway more expensive but more scalable and manageable
```

---

# Networking Services Summary
[BackToTop](#table-of-contents)
## Quick Reference: When to Use Which Service ⭐⭐⭐⭐⭐

| Requirement | Service | Keywords |
|-------------|---------|----------|
| **Isolated network in AWS** | VPC | "Private network", "CIDR", "subnets" |
| **Internet access (public subnet)** | Internet Gateway | "Public IP", "Internet access" |
| **Internet access (private subnet)** | NAT Gateway | "Private subnet", "outbound only" |
| **Instance firewall** | Security Group | "Stateful", "allow rules", "instance level" |
| **Subnet firewall** | NACL | "Stateless", "deny rules", "subnet level" |
| **Connect two VPCs** | VPC Peering | "Two VPCs", "private connectivity" |
| **Private AWS service access** | VPC Endpoints | "S3/DynamoDB private", "no Internet" |
| **Expose service to other VPCs** | PrivateLink | "SaaS", "service provider" |
| **Distribute HTTP/HTTPS traffic** | Application Load Balancer | "HTTP", "path-based routing", "microservices" |
| **Extreme performance, TCP/UDP** | Network Load Balancer | "Millions of requests", "static IP", "low latency" |
| **Security appliances** | Gateway Load Balancer | "Firewall", "IDS/IPS", "third-party" |
| **DNS service** | Route 53 | "Domain name", "DNS", "routing policies" |
| **Content delivery (caching)** | CloudFront | "CDN", "edge locations", "static content" |
| **Network acceleration (no caching)** | Global Accelerator | "Static IP", "gaming", "IoT", "TCP/UDP" |
| **Dedicated connection** | Direct Connect | "1-100 Gbps", "consistent performance", "private" |
| **Encrypted connection over Internet** | Site-to-Site VPN | "Quick setup", "IPsec", "cost-effective" |
| **Remote user access** | Client VPN | "Remote workers", "OpenVPN", "individual users" |
| **Connect many VPCs** | Transit Gateway | "Hub-and-spoke", "transitive routing", "many VPCs" |

---

# Networking Decision Trees
[BackToTop](#table-of-contents)
## Decision Tree 1: VPC Connectivity

```
Need to connect networks?

├─ Within AWS?
│  ├─ Two VPCs? → VPC Peering
│  ├─ Many VPCs (>10)? → Transit Gateway
│  └─ Access AWS services privately? → VPC Endpoints
│
├─ On-Premises to AWS?
│  ├─ High bandwidth (>1 Gbps)? → Direct Connect
│  ├─ Quick setup needed? → Site-to-Site VPN
│  ├─ Backup for Direct Connect? → Site-to-Site VPN
│  └─ Encryption required? → Site-to-Site VPN or VPN over Direct Connect
│
└─ Remote users to AWS?
   └─ Individual users? → Client VPN
```

## Decision Tree 2: Load Balancer Selection

```
What type of traffic?

├─ HTTP/HTTPS?
│  ├─ Need advanced routing? → ALB
│  ├─ Microservices? → ALB
│  ├─ Containers? → ALB
│  └─ Lambda? → ALB
│
├─ TCP/UDP?
│  ├─ Extreme performance? → NLB
│  ├─ Static IP needed? → NLB
│  ├─ Preserve source IP? → NLB
│  └─ PrivateLink? → NLB
│
└─ Security appliances?
   └─ Firewall/IDS/IPS? → GWLB
```

## Decision Tree 3: Content Delivery

```
What do you need?

├─ Distribute content globally?
│  ├─ HTTP/HTTPS with caching? → CloudFront
│  └─ TCP/UDP without caching? → Global Accelerator
│
├─ Accelerate uploads to S3?
│  └─ S3 Transfer Acceleration
│
└─ DNS routing?
   └─ Route 53
```

## Decision Tree 4: Route 53 Routing Policy

```
What routing behavior needed?

├─ Single resource? → Simple
├─ A/B testing, gradual rollout? → Weighted
├─ Minimize latency globally? → Latency-based
├─ Active-passive failover? → Failover
├─ Route by user location? → Geolocation
├─ Shift traffic between regions? → Geoproximity
└─ Multiple healthy resources? → Multi-Value Answer
```

---

# Critical Exam Tips for Networking 
>⭐⭐⭐⭐⭐

[BackToTop](#table-of-contents)
## 1. Security Groups vs NACLs (Most Tested)

### Must Remember
```
Security Groups:
✅ Stateful (return traffic automatic)
✅ Instance level
✅ Allow rules only
✅ All rules evaluated

NACLs:
✅ Stateless (must allow return traffic)
✅ Subnet level
✅ Allow and deny rules
✅ Rules evaluated in order (lowest first)

Key: Use both for defense in depth
```

### Common Mistakes
```
❌ Forgetting ephemeral ports for NACLs
❌ Using Security Groups to deny (use NACL)
❌ Not allowing return traffic in NACL
❌ Confusing stateful vs stateless
```

---

## 2. VPC Peering vs Transit Gateway

### Quick Decision
```
2-10 VPCs, simple → VPC Peering
>10 VPCs, complex → Transit Gateway
Need transitive routing → Transit Gateway
Cost-sensitive → VPC Peering
```

### Key Differences
```
VPC Peering:
❌ Not transitive
❌ Mesh topology (complex at scale)
✅ Lower cost
✅ Simple for few VPCs

Transit Gateway:
✅ Transitive routing
✅ Hub-and-spoke (scalable)
❌ Higher cost
✅ Centralized management
```

---

## 3. Direct Connect vs VPN

### Quick Decision
```
High bandwidth (>1 Gbps) → Direct Connect
Consistent performance → Direct Connect
Quick setup (< 1 month) → VPN
Cost-effective → VPN
Encryption required → VPN or VPN over Direct Connect
Backup → VPN
```

### Key Numbers
```
Direct Connect:
- Bandwidth: 50 Mbps - 100 Gbps
- Setup time: 1+ months
- Cost: Higher

VPN:
- Bandwidth: Up to 1.25 Gbps per tunnel
- Setup time: Minutes
- Cost: Lower
```

---

## 4. Load Balancer Selection

### Quick Decision
```
HTTP/HTTPS, advanced routing → ALB
Extreme performance, TCP/UDP → NLB
Static IP needed → NLB
Security appliances → GWLB
Legacy → CLB (avoid)
```

### Key Features
```
ALB:
✅ Path-based routing
✅ Host-based routing
✅ Lambda targets
✅ WebSocket

NLB:
✅ Millions of requests/sec
✅ Static IP
✅ Preserve source IP
✅ Ultra-low latency
```

---

## 5. CloudFront vs Global Accelerator

### Quick Decision
```
HTTP/HTTPS with caching → CloudFront
TCP/UDP without caching → Global Accelerator
Static IP needed → Global Accelerator
Gaming/IoT → Global Accelerator
```

### Key Differences
```
CloudFront:
✅ Caches content
✅ HTTP/HTTPS only
✅ Dynamic IPs
✅ Content delivery

Global Accelerator:
❌ No caching
✅ Any TCP/UDP
✅ Static anycast IPs
✅ Network acceleration
```

---

## 6. Route 53 Routing Policies

### Most Common
```
Latency-based: Minimize latency globally
Failover: Active-passive DR
Weighted: A/B testing, gradual rollout
Geolocation: Content localization, compliance
```

### Key Exam Tip
```
"Minimize latency" → Latency-based
"Disaster recovery" → Failover
"A/B testing" → Weighted
"Content by location" → Geolocation
```

---

## 7. VPC Endpoints

### Quick Decision
```
S3 or DynamoDB → Gateway Endpoint (free)
Other AWS services → Interface Endpoint (paid)
```

### Key Benefits
```
✅ Private access to AWS services
✅ No Internet Gateway needed
✅ No NAT Gateway needed
✅ Lower latency
✅ Cost savings (no NAT Gateway charges)
```

---

## 8. Common Exam Traps

### Trap 1: VPC Peering Transitivity
```
❌ Wrong: VPC-A can access VPC-C through VPC-B (peered)
✅ Right: Must create direct peering A ↔ C or use Transit Gateway
VPC Peering is NOT transitive
```

### Trap 2: NAT Gateway for Inbound
```
❌ Wrong: Use NAT Gateway for inbound Internet traffic
✅ Right: Use Internet Gateway + public IP
NAT Gateway is outbound only
```

### Trap 3: Security Group Deny
```
❌ Wrong: Use Security Group to deny specific IP
✅ Right: Use NACL to deny
Security Groups have allow rules only
```

### Trap 4: Direct Connect Encryption
```
❌ Wrong: Direct Connect is encrypted by default
✅ Right: Direct Connect is NOT encrypted (add VPN for encryption)
```

### Trap 5: CloudFront for TCP/UDP
```
❌ Wrong: Use CloudFront for gaming application (TCP/UDP)
✅ Right: Use Global Accelerator
CloudFront is HTTP/HTTPS only
```

### Trap 6: ALB Static IP
```
❌ Wrong: Use ALB when static IP required
✅ Right: Use NLB (ALB doesn't support static IP)
```

---

# Final Networking Exam Checklist

## Before the Exam

### ✅ Core Concepts to Master
- [ ] VPC, subnets, CIDR notation
- [ ] Security Groups vs NACLs (critical!)
- [ ] Internet Gateway vs NAT Gateway
- [ ] VPC Peering vs Transit
- [ ] VPC Peering vs Transit Gateway
- [ ] VPC Endpoints (Gateway vs Interface)
- [ ] Load balancer types (ALB, NLB, GWLB)
- [ ] Route 53 routing policies (all 7 types)
- [ ] CloudFront vs Global Accelerator
- [ ] Direct Connect vs VPN
- [ ] Site-to-Site VPN vs Client VPN

### ✅ Decision Trees to Remember
- [ ] VPC connectivity (Peering vs Transit Gateway)
- [ ] Load balancer selection (ALB vs NLB vs GWLB)
- [ ] Content delivery (CloudFront vs Global Accelerator)
- [ ] On-premises connectivity (Direct Connect vs VPN)
- [ ] Route 53 routing policy selection

### ✅ Key Numbers to Memorize
- [ ] VPC CIDR: /16 to /28
- [ ] Reserved IPs per subnet: 5
- [ ] Security Groups: Stateful, allow only
- [ ] NACLs: Stateless, allow and deny
- [ ] Ephemeral ports: 1024-65535
- [ ] Direct Connect: 50 Mbps - 100 Gbps
- [ ] VPN: Up to 1.25 Gbps per tunnel
- [ ] ALB: Layer 7 (HTTP/HTTPS)
- [ ] NLB: Layer 4 (TCP/UDP), ~100 microseconds latency
- [ ] Route 53: 100% SLA

### ✅ Common Patterns
- [ ] Public subnet: Route to IGW, instances have public IPs
- [ ] Private subnet: Route to NAT Gateway, private IPs only
- [ ] High availability: Multi-AZ, multiple resources
- [ ] Many VPCs: Transit Gateway (hub-and-spoke)
- [ ] Few VPCs: VPC Peering (point-to-point)
- [ ] HTTP/HTTPS: ALB
- [ ] Extreme performance: NLB
- [ ] Global content: CloudFront
- [ ] Global acceleration: Global Accelerator
- [ ] On-premises high bandwidth: Direct Connect
- [ ] On-premises quick setup: VPN

---

# Networking Services Detailed Comparison

[BackToTop](#table-of-contents)

## VPC Connectivity Options ⭐⭐⭐⭐⭐

| Option | Use Case | Transitive | Cost | Setup Time | Bandwidth |
|--------|----------|------------|------|------------|-----------|
| **VPC Peering** | 2-10 VPCs | No | Low | Minutes | No limit |
| **Transit Gateway** | >10 VPCs | Yes | High | Minutes | 50 Gbps per attachment |
| **VPN** | On-premises | Yes (via TGW) | Low | Minutes | 1.25 Gbps per tunnel |
| **Direct Connect** | On-premises | Yes (via TGW) | High | 1+ months | 50 Mbps - 100 Gbps |
| **PrivateLink** | Service exposure | N/A | Medium | Minutes | 10 Gbps |

---

## Load Balancer Detailed Comparison ⭐⭐⭐⭐⭐

| Feature | ALB | NLB | GWLB | CLB |
|---------|-----|-----|------|-----|
| **OSI Layer** | 7 (Application) | 4 (Transport) | 3 (Network) | 4 & 7 |
| **Protocols** | HTTP, HTTPS, WebSocket | TCP, UDP, TLS | IP (GENEVE) | TCP, SSL, HTTP, HTTPS |
| **Performance** | High | Extreme (millions/sec) | High | Moderate |
| **Latency** | Milliseconds | ~100 microseconds | Low | Milliseconds |
| **Static IP** | No | Yes (Elastic IP) | Yes | No |
| **Preserve Source IP** | No (X-Forwarded-For) | Yes | Yes | No |
| **Path-based Routing** | Yes | No | No | No |
| **Host-based Routing** | Yes | No | No | No |
| **Target Types** | Instance, IP, Lambda | Instance, IP, ALB | Instance, IP | Instance only |
| **Health Checks** | HTTP/HTTPS | TCP, HTTP/HTTPS | TCP, HTTP/HTTPS | TCP, SSL, HTTP, HTTPS |
| **SSL Termination** | Yes | Yes | No | Yes |
| **SNI** | Yes | Yes | No | No |
| **WebSocket** | Yes | Yes | No | No |
| **HTTP/2** | Yes | No | No | No |
| **Sticky Sessions** | Yes (cookie) | Yes (source IP) | No | Yes (cookie) |
| **Cross-Zone LB** | Enabled (free) | Disabled (charged) | N/A | Disabled (free) |
| **Use Case** | Web apps, microservices | Extreme perf, TCP/UDP | Security appliances | Legacy |
| **Cost** | $$ | $$$ | $$$ | $ |

---

## Route 53 Routing Policies Detailed ⭐⭐⭐⭐⭐

| Policy | How It Works | Health Checks | Returns | Use Case | Example |
|--------|--------------|---------------|---------|----------|---------|
| **Simple** | Single resource or random from multiple | No | One or multiple IPs | Single resource | example.com → 1.2.3.4 |
| **Weighted** | Distribute by weight % | Yes | One IP (weighted) | A/B testing, gradual rollout | 70% to old, 30% to new |
| **Latency** | Lowest latency to user | Yes | One IP (lowest latency) | Global apps, minimize latency | User in EU → EU region |
| **Failover** | Primary/secondary | Yes (required) | Primary or secondary | Disaster recovery | Primary fails → Secondary |
| **Geolocation** | Based on user location | Yes | One IP (by location) | Content localization | EU users → EU content |
| **Geoproximity** | Based on proximity + bias | Yes | One IP (proximity + bias) | Shift traffic between regions | Bias +20 to us-east-1 |
| **Multi-Value** | Multiple healthy IPs | Yes | Multiple IPs (up to 8) | Simple load distribution | Return 3 healthy IPs |

---

## Content Delivery and Acceleration ⭐⭐⭐⭐⭐

| Service | Purpose | Caching | Protocols | IPs | Use Case |
|---------|---------|---------|-----------|-----|----------|
| **CloudFront** | CDN | Yes | HTTP/HTTPS | Dynamic | Static/dynamic content, video streaming |
| **Global Accelerator** | Network acceleration | No | TCP/UDP | Static anycast | Gaming, IoT, VoIP, fast failover |
| **S3 Transfer Acceleration** | Upload acceleration | No | HTTP/HTTPS | Dynamic | Upload large files to S3 |

---

## VPC Endpoints Detailed ⭐⭐⭐⭐⭐

| Feature | Gateway Endpoint | Interface Endpoint |
|---------|------------------|-------------------|
| **Services** | S3, DynamoDB only | 100+ AWS services |
| **Implementation** | Route table target | ENI with private IP |
| **DNS** | No | Yes (private DNS) |
| **Security Group** | No | Yes |
| **On-Premises Access** | No | Yes (via VPN/DX) |
| **Availability** | Highly available (AWS) | Per AZ (deploy in multiple) |
| **Cost** | Free | $0.01/hour per AZ + data |
| **Use Case** | S3/DynamoDB private access | Other AWS services private access |

---

# Advanced Networking Scenarios

## Scenario 1: Multi-Tier Application Architecture ⭐⭐⭐⭐⭐

### Architecture
```
Internet
    ↓
Internet Gateway
    ↓
Public Subnet (AZ-A)          Public Subnet (AZ-B)
├─ NAT Gateway A              ├─ NAT Gateway B
└─ Application Load Balancer  └─ (ALB spans both AZs)
    ↓                             ↓
Private Subnet (AZ-A)         Private Subnet (AZ-B)
├─ Web Servers (Auto Scaling) ├─ Web Servers (Auto Scaling)
    ↓                             ↓
Private Subnet (AZ-A)         Private Subnet (AZ-B)
├─ App Servers (Auto Scaling) ├─ App Servers (Auto Scaling)
    ↓                             ↓
Private Subnet (AZ-A)         Private Subnet (AZ-B)
└─ RDS Multi-AZ (Primary)     └─ RDS Multi-AZ (Standby)
```

### Security Configuration
```
Internet-facing ALB Security Group:
- Inbound: 80, 443 from 0.0.0.0/0
- Outbound: All to Web Server SG

Web Server Security Group:
- Inbound: 80, 443 from ALB SG
- Outbound: All to App Server SG

App Server Security Group:
- Inbound: 8080 from Web Server SG
- Outbound: 3306 to Database SG

Database Security Group:
- Inbound: 3306 from App Server SG
- Outbound: None needed

NAT Gateway:
- For outbound Internet access from private subnets
- One per AZ for high availability
```

### Route Tables
```
Public Subnet Route Table:
- 10.0.0.0/16 → local
- 0.0.0.0/0 → Internet Gateway

Private Subnet Route Table (Web/App):
- 10.0.0.0/16 → local
- 0.0.0.0/0 → NAT Gateway (local AZ)

Private Subnet Route Table (Database):
- 10.0.0.0/16 → local
- No Internet route (isolated)
```

---

## Scenario 2: Hybrid Cloud Architecture ⭐⭐⭐⭐⭐

### Architecture
```
On-Premises Data Center
├─ Customer Gateway 1 (Primary)
│  ├─ Direct Connect 1 → Direct Connect Gateway
│  └─ VPN 1 (Backup) → Virtual Private Gateway
└─ Customer Gateway 2 (Secondary)
   ├─ Direct Connect 2 → Direct Connect Gateway
   └─ VPN 2 (Backup) → Virtual Private Gateway
       ↓
   Transit Gateway
       ↓
   ├─ VPC-Production (us-east-1)
   ├─ VPC-Development (us-east-1)
   ├─ VPC-Shared-Services (us-east-1)
   └─ Transit Gateway Peering → Transit Gateway (eu-west-1)
                                     ↓
                                 ├─ VPC-Production (eu-west-1)
                                 └─ VPC-Development (eu-west-1)
```

### Benefits
```
✅ High availability (dual Direct Connect + VPN backup)
✅ Transitive routing (all VPCs can reach on-premises)
✅ Centralized management (Transit Gateway)
✅ Multi-region connectivity (Transit Gateway peering)
✅ Network segmentation (Transit Gateway route tables)
✅ Automatic failover (BGP)
```

---

## Scenario 3: Global Application with Low Latency ⭐⭐⭐⭐⭐

### Architecture
```
Users Worldwide
    ↓
CloudFront (400+ edge locations)
├─ Static Content → S3 (Origin)
└─ Dynamic Content → Global Accelerator
                         ↓
                    ┌────┴────┐
                    ↓         ↓
            ALB (us-east-1)  ALB (eu-west-1)
                ↓                 ↓
            EC2 Instances     EC2 Instances
                ↓                 ↓
            RDS (Primary)     RDS (Read Replica)
```

### Configuration
```
CloudFront:
- Cache static content (images, CSS, JS)
- TTL: 24 hours for static assets
- Origin: S3 bucket
- Behavior: /static/* → S3

Global Accelerator:
- Anycast IPs for dynamic content
- Health checks on ALBs
- Traffic dial for blue/green deployments
- Endpoint: ALBs in multiple regions

Route 53:
- Latency-based routing for ALBs
- Health checks for automatic failover
- Alias records to Global Accelerator

Benefits:
✅ Low latency globally (CloudFront + Global Accelerator)
✅ High availability (multi-region)
✅ Automatic failover (health checks)
✅ Static content cached at edge
✅ Dynamic content accelerated
```

---

## Scenario 4: Secure Multi-Account Architecture ⭐⭐⭐⭐⭐

### Architecture
```
AWS Organization
├─ Network Account
│  └─ Transit Gateway (Hub)
│      ├─ VPN Connection (On-Premises)
│      ├─ Direct Connect Gateway
│      └─ Shared Services VPC
│          ├─ Active Directory
│          ├─ DNS Resolvers
│          └─ Centralized Egress (NAT Gateway)
│
├─ Production Account
│  └─ VPC-Production → Transit Gateway (Network Account)
│      └─ Route Table: Isolated from Dev
│
├─ Development Account
│  └─ VPC-Development → Transit Gateway (Network Account)
│      └─ Route Table: Isolated from Prod
│
└─ Security Account
   └─ VPC-Security → Transit Gateway (Network Account)
       ├─ Firewall Appliances (Gateway Load Balancer)
       ├─ IDS/IPS Systems
       └─ Centralized Logging
```

### Transit Gateway Route Tables
```
Production Route Table:
- Production VPC ↔ Shared Services ✅
- Production VPC ↔ On-Premises ✅
- Production VPC ↔ Development ❌
- Production VPC ↔ Security (inspection) ✅

Development Route Table:
- Development VPC ↔ Shared Services ✅
- Development VPC ↔ On-Premises ✅
- Development VPC ↔ Production ❌
- Development VPC ↔ Security (inspection) ✅

Shared Services Route Table:
- Shared Services ↔ All VPCs ✅
- Shared Services ↔ On-Premises ✅

Security Route Table:
- Security ↔ All VPCs (inspection) ✅
- Security ↔ On-Premises ✅
```

### Benefits
```
✅ Network isolation (separate accounts)
✅ Environment isolation (prod/dev)
✅ Centralized services (AD, DNS)
✅ Centralized egress (cost optimization)
✅ Centralized security (inspection)
✅ Centralized connectivity (Transit Gateway)
```

---

# Networking Troubleshooting Guide

[BackToTop](#table-of-contents)
## Common Issues and Solutions ⭐⭐⭐⭐⭐

### Issue 1: Cannot Connect to EC2 Instance
```
Checklist:
1. ✅ Instance is running?
2. ✅ Instance has public IP (if in public subnet)?
3. ✅ Security group allows inbound traffic (port 22 for SSH, 3389 for RDP)?
4. ✅ NACL allows inbound traffic?
5. ✅ NACL allows outbound ephemeral ports (1024-65535)?
6. ✅ Route table has route to Internet Gateway (public subnet)?
7. ✅ Correct key pair (SSH)?
8. ✅ Instance not in stopping/stopped state?

Common Causes:
❌ Security group doesn't allow port 22/3389
❌ NACL blocking traffic
❌ No public IP on instance
❌ No route to Internet Gateway
❌ Wrong key pair
```

### Issue 2: Private Instance Cannot Access Internet
```
Checklist:
1. ✅ NAT Gateway in public subnet?
2. ✅ NAT Gateway has Elastic IP?
3. ✅ Route table has route to NAT Gateway (0.0.0.0/0 → nat-xxx)?
4. ✅ Public subnet route table has route to Internet Gateway?
5. ✅ Security group allows outbound traffic?
6. ✅ NACL allows outbound traffic?
7. ✅ NACL allows inbound ephemeral ports (1024-65535)?

Common Causes:
❌ No NAT Gateway
❌ Route table doesn't point to NAT Gateway
❌ NAT Gateway in wrong subnet
❌ NACL blocking return traffic (ephemeral ports)
```

### Issue 3: VPC Peering Not Working
```
Checklist:
1. ✅ Peering connection accepted?
2. ✅ Route tables updated in both VPCs?
3. ✅ Security groups allow traffic from peer VPC CIDR?
4. ✅ NACLs allow traffic from peer VPC CIDR?
5. ✅ No overlapping CIDR blocks?
6. ✅ DNS resolution enabled (if using DNS names)?

Common Causes:
❌ Route tables not updated
❌ Security groups blocking traffic
❌ Peering connection not accepted
❌ Overlapping CIDR blocks
```

### Issue 4: Load Balancer Not Distributing Traffic
```
Checklist:
1. ✅ Targets registered with target group?
2. ✅ Targets passing health checks?
3. ✅ Security group allows traffic from load balancer?
4. ✅ Load balancer in correct subnets (public for Internet-facing)?
5. ✅ Listener configured correctly?
6. ✅ Target group associated with listener?

Common Causes:
❌ Targets failing health checks
❌ Security group blocking load balancer traffic
❌ Health check path incorrect
❌ No targets registered
```

### Issue 5: Direct Connect Not Working
```
Checklist:
1. ✅ Direct Connect connection in "available" state?
2. ✅ Virtual Interface (VIF) created and accepted?
3. ✅ BGP session established?
4. ✅ Route tables updated (VPC and on-premises)?
5. ✅ Virtual Private Gateway attached to VPC?
6. ✅ Security groups/NACLs allow traffic?

Common Causes:
❌ BGP not configured correctly
❌ Route tables not updated
❌ VIF not accepted
❌ Connection not provisioned
```

---

# Networking Best Practices Summary 
>⭐⭐⭐⭐⭐

[BackToTop](#table-of-contents)

## Design Principles
```
✅ Plan IP addressing (CIDR blocks)
✅ Use multiple AZs (high availability)
✅ Separate public and private subnets
✅ Use security groups and NACLs (defense in depth)
✅ Use VPC Flow Logs (monitoring)
✅ Document network architecture
✅ Plan for growth (scalability)
```

## Security Best Practices
```
✅ Principle of least privilege (security groups)
✅ Use private subnets for databases and app servers
✅ Use NAT Gateway (not NAT Instance)
✅ Enable VPC Flow Logs
✅ Use VPC Endpoints (private AWS service access)
✅ Encrypt data in transit (TLS/SSL)
✅ Use AWS WAF with ALB/CloudFront
✅ Enable GuardDuty (threat detection)
✅ Regular security audits
```

## High Availability Best Practices
```
✅ Deploy across multiple AZs
✅ Use Auto Scaling
✅ Use load balancers (ALB/NLB)
✅ Use Route 53 health checks
✅ Use Multi-AZ for databases (RDS)
✅ Use multiple NAT Gateways (one per AZ)
✅ Use Transit Gateway for complex topologies
✅ Test failover scenarios
```

## Performance Best Practices
```
✅ Use CloudFront for content delivery
✅ Use Global Accelerator for network acceleration
✅ Use VPC Endpoints (reduce latency)
✅ Use appropriate load balancer type
✅ Enable cross-zone load balancing
✅ Use Direct Connect for high bandwidth
✅ Optimize security group rules
✅ Use placement groups (when appropriate)
```

## Cost Optimization Best Practices
```
✅ Use VPC Peering for simple topologies (free same-region)
✅ Use NAT Gateway instead of NAT Instance (managed)
✅ Use VPC Endpoints (avoid NAT Gateway charges)
✅ Use S3 Gateway Endpoint (free)
✅ Delete unused resources (Elastic IPs, load balancers)
✅ Use Direct Connect for large data transfers
✅ Monitor with Cost Explorer
✅ Right-size resources
```

---

# Summary: Most Important Networking Concepts 
>⭐⭐⭐⭐⭐

[BackToTop](#table-of-contents)
## Must Know (Critical for Exam)

### 1. VPC Fundamentals
```
✅ CIDR notation and IP addressing
✅ Public vs private subnets
✅ Internet Gateway vs NAT Gateway
✅ Route tables and routing
✅ Reserved IPs (5 per subnet)
```

### 2. Security Groups vs NACLs
```
✅ Stateful vs stateless
✅ Allow only vs allow and deny
✅ Instance level vs subnet level
✅ Ephemeral ports (1024-65535)
✅ Defense in depth strategy
```

### 3. VPC Connectivity
```
✅ VPC Peering (2-10 VPCs, not transitive)
✅ Transit Gateway (>10 VPCs, transitive)
✅ VPC Endpoints (Gateway vs Interface)
✅ PrivateLink (service exposure)
```

### 4. Load Balancers
```
✅ ALB (Layer 7, HTTP/HTTPS, advanced routing)
✅ NLB (Layer 4, extreme performance, static IP)
✅ GWLB (Layer 3, security appliances)
✅ Health checks and failover
```

### 5. Route 53
```
✅ All 7 routing policies
✅ Alias vs CNAME records
✅ Health checks
✅ Failover and disaster recovery
```

### 6. Content Delivery
```
✅ CloudFront (CDN, caching, HTTP/HTTPS)
✅ Global Accelerator (no caching, TCP/UDP, static IP)
✅ Use cases for each
```

### 7. Hybrid Connectivity
```
✅ Direct Connect (high bandwidth, consistent)
✅ Site-to-Site VPN (quick setup, encrypted)
✅ Client VPN (remote users)
✅ When to use each
```

### 8. Transit Gateway
```
✅ Hub-and-spoke topology
✅ Transitive routing
✅ Route tables for isolation
✅ When to use vs VPC Peering
```

---

**You're now ready for the Networking and Content Delivery section of the SAA-C03 exam!** 🌐🚀

**Key Takeaway**: Focus on understanding **when to use which networking service** based on:
- Connectivity requirements (VPC-to-VPC, on-premises, Internet)
- Performance needs (latency, bandwidth, throughput)
- Security requirements (encryption, isolation, access control)
- Scalability needs (few vs many VPCs)
- Cost considerations
- High availability requirements

Most questions test your ability to **choose the right networking solution for the right scenario**, not deep technical implementation details.

**Good luck!** 💪

---

**End of AWS Networking and Content Delivery - SAA-C03 Exam Guide**

---

### [BackToTop](#table-of-contents)
