# AWS EFS(Elastic File System) Hands-On

Created by: Niyush Bjr
Created time: 27 June 2026 15:13
Last edited time: 21 July 2026 00:16
level: Beginner, Intermediate
Description: Complete AWS EFS From Beginner → Intermediate | SAA-C03 Aligned 
AWS Services : CloudWatch, EC2, Elastic File System (EFS), VPC
Other tools: terminal
Category: Storage
Buy-Me-a-Coffee: http://buymeacoffee.com/niyushbjr1L

<aside>
<img src="https://app.notion.com/icons/confetti-party-popper_blue.svg" alt="https://app.notion.com/icons/confetti-party-popper_blue.svg" width="40px" />

**■ ❒**  ❑   ※  ⌘. ⊞ ★  ● **𒒬 ✓ ⓘ Ȋ 𝌟 ⏧  ❏ ❐ ✿ ❀ ❁ ❂** 

</aside>

<aside>
<img src="https://app.notion.com/icons/currency_green.svg" alt="https://app.notion.com/icons/currency_green.svg" width="40px" />

 **Budget Note :** 

EFS is the **most budget-friendly** of the three FSx/EFS services. A full 2-hour lab with 2 EC2 instances + EFS costs only **~¥10–¥15 total**. Unlike FSx for Lustre (minimum 1,200 GiB), EFS charges only for data actually stored — so a lab with a few test files costs virtually nothing. Even if you forget to delete it, the cost is negligible. **EC2 instances are the bigger cost risk here, not EFS itself.**

</aside>

# **Cost Summary**

> EFS is by far the most **beginner-friendly** service for cost — you pay **only for what you store**, with no provisioned minimum.
> 

| Resource | Cost/hr | 2-hr Lab | Notes |
| --- | --- | --- | --- |
| EFS Standard (1 GB of test data) | ~¥0.00007/hr | ~¥0.001 | Essentially free |
| EC2 t3.micro × 2 (Linux) | ~¥2.46/hr each | ~¥10 total | Main cost |
| EFS Data Transfer (Elastic mode) | Per GB transferred | ~¥0–¥1 | Minimal in lab |
| EFS Backup | ~$0.05/GB-month | ~¥0 | Tiny for a few MB |
| Total Lab Cost (2 hrs) |  | ~¥10–¥15 | ✅ Well under budget |

---

# **ⓘ** Step 0 : Before Getting Started

#### 0.1 Billing Alarms

<aside>
<img src="https://app.notion.com/icons/bell-notification_red.svg" alt="https://app.notion.com/icons/bell-notification_red.svg" width="40px" />

Even though EFS is cheap, form the habit:

1. **AWS Console → Billing → Budgets → Create Budget**
2. **Cost Budget → $6 USD** → alert at **80%** → add your email
3. Click **Create**
</aside>

---

#### **0.2 — Architecture Overview (What You'll Build)**

| Lab | Services Used |
| --- | --- |
| EFS Basics Lab | EFS + EC2 Amazon Linux 2 (x2) + VPC + Security Groups |
| EFS Advanced Lab | + EFS Access Points + IAM Auth + Lifecycle Policies + CloudWatch |

---

# ⌘ Step 1 : Creating Security group and EFS

### **❒**  Step 1.1 : VPC and Subnet Check

Before proceding with the creation of EFS, confirm the following :

- **Console → VPC → Your VPCs** → Default VPC exists
- Note your **VPC ID** and all **Subnet IDs** (one per AZ)
- Note the **CIDR block** of your default VPC (usually `172.31.0.0/16`)

<aside>
<img src="https://app.notion.com/icons/info-alternate_blue.svg" alt="https://app.notion.com/icons/info-alternate_blue.svg" width="40px" />

For a **Regional (Multi-AZ)** EFS file system, AWS creates one **Mount Target** per Availability Zone. Each mount target needs to be in a subnet and have a security group allowing **NFS port 2049**.

</aside>

- Open/Close Screenshot
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image.png)
    

---

### **❒**  Step 1.2 : **Create the EFS Security Group**

> NFS uses port 2049 (TCP). Create a security group that allows it.
> 
- EC2 → Security groups → Create Security group
- Name : `EFS-Sec-Group`
- Description : EFS NFS access
- VPC : Default VPC

> Inbound Rules :
> 

| Type | Protocol | Port | Source |
| --- | --- | --- | --- |
| NFS | TCP | 2049 | Your VPC CIDR |
| SSH | TCP | 22 | One’s IP |

> **Outbound Rules:** Leave default (all traffic allowed)
> 

<aside>
<img src="https://app.notion.com/icons/info-alternate_blue.svg" alt="https://app.notion.com/icons/info-alternate_blue.svg" width="40px" />

**Why VPC CIDR as source?** Any EC2 instance within the VPC can reach EFS. For production, scope this to specific EC2 security groups instead.

</aside>

- Open/Close Screenshot
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%201.png)
    

---

### **❒**  Step 1.3 : Create the EFS File system

- EFS → Create file system → Click Customize  →  In the file system settings

#### **❐** Step 1.3a : File System Settings

| Name | efs-labs |
| --- | --- |
| File System type  | Regional `← Multi-AZ, replicated across AZs (recommended)` |
| Automatic Backups  | Enabled |
| Lifecycle management | Transition to EFS-IA: 30 days after last access
`Transition to EFS Archive: 90 days after last access
Transition to EFS Standard: On first access ← smart tiering` |
| Perfomance Settngs : |  |
| Throughput mode | Enhanced Elastic  `recommended default, auto-scales
Bursting = tied to storage size, Provisioned = fixed MB/s` |
| Performance model | General Purpose `← recommended for latency-sensitive
Max I/O = legacy, for very high parallelism, higher latency` |
| Encryption | Enable encryption at rest  |

<aside>
<img src="https://app.notion.com/icons/warning_yellow.svg" alt="https://app.notion.com/icons/warning_yellow.svg" width="40px" />

**Throughput Mode Decision Guide:**

- **Elastic** → 99% of use cases. Auto-scales, pay per GB transferred. Best for unpredictable workloads.
- **Bursting** → Throughput scales with storage size. Good if you store lots of data and access it heavily. Free (included).
- **Provisioned** → You specify MB/s. Use only if you need guaranteed throughput independent of storage size. Costs extra.
</aside>

- Click `Next`

- Open/Close Screenshot
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%202.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%203.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%204.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%205.png)
    

- Open/Close Screenshot
    
    

---

#### **❐** Step 1.3b : Network Settings

VPC : `Default VPC`
Mount Targets - EFS Automatically suggest one per AZs.

Make sure to remove the default security group and add the one you created.

| AZ | Subnet | Security Groups |
| --- | --- | --- |
| ap-northeast-1a | subent-xxx(1a) | efs-sg |
| ap-northeast-1b | subnet-xxx(1b) | efs-sg |
| ap-northeast-1c | subnet-xxx(1c) | efs-sg |
- click `Next`

- Open/Close Screenshot
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%206.png)
    

---

#### **❐** Step 1.3c : **File System Policy (Optional for now)**

Leave it to default. 

In production, one would add an IAM resource policy like : 

```json
{
  "Statement": [{
    "Effect": "Deny",
    "Principal": {"AWS": "*"},
    "Action": "*",
    "Condition": {"Bool": {"aws:SecureTransport": "false"}}
  }]
}
```

This forces **TLS encryption in transit** for all clients.

- **Review → Create**

> EFS creation takes **~30–60 seconds** — much faster than FSx!
> 

- Open/Close Screenshot
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%207.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%208.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%209.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2010.png)
    

---

# ⌘ Step 2 : **Launch  EC2, Install Mount, Share files and Check Metrics**

<aside>
<img src="https://app.notion.com/icons/warning_yellow.svg" alt="https://app.notion.com/icons/warning_yellow.svg" width="40px" />

launch two EC2 instnaces to demonstrate the key superpower of EFS : simultaneous multi-client shared access.

</aside>

> Instance 1 : (Writer)
> 

| Name  | efs-client-1 |
| --- | --- |
| AMI | Amazon Linux 2023 |
| Instance type  | t3.micro |
| Key pair | Use existing or create new |
| Network Settings |  |
| VPC | default VPC |
| Subent | ap-northeast-1a |
| Security group | efs-sg |
| Auto-assign public IP | Enable |
| Click `Launch Instance` |  |

> Instance 2 : (reader)
> 
- Repeat the above process and change the following
- Name : `efs-client-2`
- Subnet : `ap-northeast-1c`

<aside>
<img src="https://app.notion.com/icons/info-alternate_blue.svg" alt="https://app.notion.com/icons/info-alternate_blue.svg" width="40px" />

Two instances in different AZs = demonstrates EFS cross-AZ shared access. This is something **EBS cannot do**.

</aside>

- Open/Close Screenshot (Instance 1)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2011.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2012.png)
    

- Open/Close Screenshot (Instance 2)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2013.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2014.png)
    

---

### **❒**  Step 2.1: **Install EFS Mount Helper & Mount**

SSH into **both instances** (open two terminal tabs):

> Terminal Tab 1 for (efs-client-1)
> 

```bash
ssh -i efs-lab-key.pem ec2-user@<client-1-public-ip>
```

> Terminal Tab 2 for (efs-client-2)
> 

```bash
ssh -i efs-lab-key.pem ec2-user@<client-2-public-ip>
```

> On both the instances run
> 

```bash
# Install EFS mount helper (amazon-efs-utils)
sudo yum install -y amazon-efs-utils

# Verify the installation
rpm -qa | grep amazon-efs-utils
```

- EFS console → File systems → Select the FS
- Copy the File system ID (fs-xxxxxxxxxxxx)

> Mount EFS on Both instance
> 

```bash
# create mount point 
sudo mkdir -p /mnt/efs

# Mount using EFS mount helper with TLS encryption in transit
sudo mount -t efs -o tls fs-xxxxxxxxx:/ /mnt/efs
sudo mount -t efs -o tls fs-0ca072fe9a3263b1e:/ /mnt/efs

# Verify the mount
df -h /mnt/efs
mount | grep efs
```

> Expected Output
> 

```
Filesystem      Size  Used Avail Use% Mounted on
127.0.0.1:/     8.0E     0  8.0E   0% /mnt/efs
```

The `8.0E` (8 exabytes) is EFS's way of showing **unlimited capacity** — it grows as you add files.

- Open/Close Screenshot
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2015.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2016.png)
    

- Open/Close Screenshot Install EFS mount helper
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2017.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2018.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2019.png)
    

- Open/Close Screenshot Mount EFS on Both instance
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2020.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2021.png)
    

---

### **❒**  Step 2.2: **Demonstrate Shared File Access**

Testing / Showing the real-time shared access across two instances.

> On Instance-1 (efs-client-1)
> 

```bash
# Write a file to EFS
echo "Hello from the client-1 - ${date}" | sudo tee /mnt/efs/shared-test.txt

# Create a directory structure
sudo mkdir -p /mnt/efs/project/{data,logs,config}
echo "config value : production" | sudo tee /mnt/efs/project/config/app.conf
```

> On Instance-2 (efs-client-2)
> 

```bash
# Read the file written from instance-1
cat /mnt/efs/shared-test.txt

# List the directory created by client 1 (Instance-1)
ls -la /mnt/efs/project/
cat /mnt/efs/project/config/app.conf
```

> **Write from Client 2, read from Client 1:**
> 

```bash
# On client 2 Terminal 
echo "Responding from Client-2 - ${date}" | sudo tee /mnt/efs/project/logs/client2.log

# On client 1 Terminal
cat /mnt/efs/project/logs/client2.log
```

- Open/Close Screenshot On Instance-1 (efs-client-1)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2022.png)
    

- Open/Close Screenshot On Instance-2 (efs-client-2)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2023.png)
    

- Open/Close Screenshot **Write from Client 2, read from Client 1:**
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2024.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2025.png)
    

---

### **❒**  Step 2.3: **Set Up Auto-Mount at Boot (fstab)**

EFS remounts automatically if the instance reboots.

> On both instnaces.
> 

```bash
# Add EFS to /etc/fstab for atuo-mount at boot 
echo "fs-xxxxxx:/ /mng/efs efs _netdev,nofail,tls,iam 0 0 " | sudo tee -a /etc/fstab

# Verify the fstab entry
cat /etc/fstab

# test the fstab without rebooting
sudo mount -fav
```

<aside>
<img src="https://app.notion.com/icons/info-alternate_blue.svg" alt="https://app.notion.com/icons/info-alternate_blue.svg" width="40px" />

Options explained :

- `_netdev` — mount after network is up
- `nofail` — don't fail boot if EFS is unreachable
- `tls` — encrypt in transit
- `iam` — use IAM for authorization (requires access point in production)
</aside>

- Open/Close Screenshot **Set Up Auto-Mount at Boot**
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2026.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2027.png)
    

---

### **❒**  Step 2.4 : Check Metrics in CloudWatch

- EFS Console → Select your file system → Monitoring Tab

<aside>
<img src="https://app.notion.com/icons/info-alternate_blue.svg" alt="https://app.notion.com/icons/info-alternate_blue.svg" width="40px" />

Key Metrics to Observe : 

- `ClientConnections` — should show 2 connected clients
- `DataReadIOBytes` / `DataWriteIOBytes` — your read/write activity
- `StorageBytes` — current used storage per class (Standard, IA, Archive)
- `PercentIOLimit` — (General Purpose mode) how close to the limit
- `BurstCreditBalance` — (Bursting mode only) your remaining burst credits

> 💡 **SAA-C03 tip:** `BurstCreditBalance` dropping to zero = you need to switch to Provisioned or Elastic throughput. This is a common exam scenario.
> 
</aside>

- Open/Close Screenshot  Check Metrics
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2028.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2029.png)
    

---

# ⌘ Step 3 : **EFS Access Points**

<aside>
<img src="https://app.notion.com/icons/info-alternate_blue.svg" alt="https://app.notion.com/icons/info-alternate_blue.svg" width="40px" />

Access Points are application-specific entry points into your EFS which enforce the following.

- A specific root directory (so apps can’t access each other’s data)
- A specific POSIX user/group ID ( So file ownership is consistent)
- IAM-based authentication (so only authorized roles can mount)
</aside>

#### **❒**  Step 3.1 : Create an Access point.

| Name | app-access-point |
| --- | --- |
| Root directory path  |  |
| User ID  | 1000 |
| Group ID  | 1000 |
| Root directory creation prermission |  |
| Owner user ID | 1000 |
| Owner group ID | 1000 |
| POSIX permissions | 755 |

#### **❒**  Step 3.2 : Mount using the Access points

```bash
# Get the Access Point ID from console
sudo mkdir -p /mnt/efs-app

# Mount via access point (app only sees / app-data, not full FS0
sudo mount -t efs -o tls,accesspoint=ap-XXXXX fs-XXXXX:/ /mnt/efs-app

# Verify 
ls /mnt/efs-app/
```

<aside>
<img src="https://app.notion.com/icons/info-alternate_blue.svg" alt="https://app.notion.com/icons/info-alternate_blue.svg" width="40px" />

**Real-world use:** 
Multiple microservices on the same EFS file system, each mounted via their own access point. Service A can't read Service B's data even though they share the same physical EFS FS.

</aside>

- Open/Close Screenshot Create an Access point.
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2030.png)
    

- Open/Close Screenshot Mount using the Access points
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2031.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2032.png)
    

---

#### **❒**  Step 3.3 : EFS Lifecycle Management (Automatic Tiering)

already configured lifecycle during file system creation, but let's verify and test:

- EFS → Select your file system → General Tab
- Under Lifecycle management , confirm

<aside>
<img src="https://app.notion.com/icons/checklist_green.svg" alt="https://app.notion.com/icons/checklist_green.svg" width="40px" />

Transition into EFS-IA:      30 days after last access
Transition into EFS Archive: 90 days after last access
Transition out of EFS-IA:    On first access (back to Standard)

</aside>

> Manually trigger a file to move to IA for testing
> 

```bash
# Check which storage class files are in
aws efs describe-file-systems --file-system-id fs-0abc1234def56789 \
  --query 'FileSystems[0].SizeInBytes'
```

**Real-world impact:**

- Files accessed daily → stay in **Standard** ($0.30/GB-month)
- Files not touched for 30 days → auto-move to **EFS-IA** ($0.016/GB-month = 95% cheaper)
- Files not touched for 90 days → auto-move to **Archive** ($0.008/GB-month = 97% cheaper)
- When accessed → auto-move back to Standard immediately

> **EFS Storage Classes: Full Breakdown**
> 

| Storage Class | Price/GB-month | Latency | Use Case |
| --- | --- | --- | --- |
| EFS Standard (Regional) | ~$0.30 | Sub-ms | Actively used files, databases |
| EFS Standard (One Zone) | ~$0.16 | Sub-ms | Dev/test, single-AZ workloads |
| EFS IA (Infrequent Access) | ~$0.016 | Low ms | Files accessed < few times/quarter |
| EFS Archive | ~$0.008 | Higher ms | Rarely accessed, compliance, audit |

<aside>
<img src="https://app.notion.com/icons/warning_orange.svg" alt="https://app.notion.com/icons/warning_orange.svg" width="40px" />

**Note:** IA and Archive storage classes have **per-access charges** on top of the storage price. If you access IA files frequently, it becomes more expensive than Standard. Use lifecycle policies wisely.

</aside>

> **EFS Replication (Cross-Region / Cross-AZ) [OPTIONAL]**
> 

EFS replication creates a read-only replica in another region or AZ for DR.

- EFS Console → File system → Replication Tab → Create replication.

Replication destinaion :

- Region:              ap-southeast-1 (Singapore)  ← or another AZ within same region
  File system:       Create new file system
  Availability:        Regional
  Encryption:        Encrypted
- Click `Create replication`

<aside>
<img src="https://app.notion.com/icons/warning_orange.svg" alt="https://app.notion.com/icons/warning_orange.svg" width="40px" />

Cost Consideration : Cross-region replication incurs data transfer charges. For this lab the price is negligible .

</aside>

- Open/Close Screenshot
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2033.png)
    

- Open/Close Screenshot **EFS Replication**
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2034.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2035.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2036.png)
    

---

#### **❒**  Step 3.4 : **Performance Tests**

> Test 1 : Sequential Write throughput
> 

```bash
# On efs-client-1
# Write 512MB sequentially
sudo dd if=/dev/zero of=/mnt/efs/perf-test bs=1M count=512 conv=fdatasync
# Note the throughput (MB/s)
```

- Open/Close Screenshot Sequential Write throughput
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2037.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2038.png)
    

---

> Test 2 : **Sequential Read Throughput**
> 

```bash
# Drop the page cache first
sudo sh -c "echo 3 > /proc/sys/vm/drop_caches"

# Read back
sudo dd if=/mnt/efs/perf-test of=/dev/null bs=1M
# Note the throughput

```

- Open/Close Screenshot **Sequential Read Throughput**
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2039.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2040.png)
    

---

> **Test 3: Parallel Writes from Both Clients Simultaneously**
> 

```bash
# On efs-client-1 (run this):
sudo dd if=/mnt/efs/perf-test of=/dev/null bs=1M

# On efs-client-2 (run this at the same time):
sudo dd if=/mnt/efs/perf-test of=/dev/null bs=1M

# Both write simultaneously — EFS handles concurrent access natively

```

- Open/Close Screenshot **Parallel Writes from Both Clients**
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2041.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2042.png)
    

---

> **Test 4: File Locking (Advisory locks over NFS)**
> 

```bash
# On efs-client-1:
flock /mnt/efs/locktest.txt echo "Acquired lock on Client 1"

# In a real app, use application-level locking — NFS advisory locks work but have limits
```

- Open/Close Screenshot **File Locking**
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2043.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2044.png)
    

---

# ⌘ Step 4 : **EFS with AWS Lambda and ECS/Fargate**

#### **❒**  Step 4.1 : Mounting EFS to Lambda

EFS can be mounted to Lambda for shared persistent storage across function invocations.

- Lambda → Create function → Function config → File system → Add file system
- Sample code
    
    ```bash
    import os
    
    def lambda_handler(event, context):
        # Write to EFS
        with open('/mnt/efs/lambda-output.txt', 'a') as f:
            f.write(f"Lambda invocation at {context.aws_request_id}\n")
        
        # Read it back
        with open('/mnt/efs/lambda-output.txt', 'r') as f:
            return {'statusCode': 200, 'body': f.read()}
    ```
    

<aside>
<img src="https://app.notion.com/icons/warning_orange.svg" alt="https://app.notion.com/icons/warning_orange.svg" width="40px" />

**Key Lambda + EFS requirements:**

- Lambda must be in the **same VPC** as the EFS mount target
- Lambda must use an **EFS access point** (not raw FS mount)
- Lambda execution role needs `elasticfilesystem:ClientMount` permission
</aside>

- Open/Close Screenshot
    
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2045.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2046.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2047.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2048.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2049.png)
    

---

#### **❒**  Step 4.2 : Mounting EFS to **ECS/Fargate (Container Shared Storage)**

**Task Definition snippet (AWS Console ECS):**

In your ECS Task Definition → **Volumes tab:**

```
Volume type:      EFS
Name:             shared-storage
File system ID:   fs-0abc1234def56789
Root directory:   /
Transit encryption: Enabled
Access point ID:  ap-0abc1234def56789
IAM:              Enabled
```

**Container mount points:**

```
Source volume:    shared-storage
Container path:   /data
Read only:        false
```

<aside>
<img src="https://app.notion.com/icons/info-alternate_blue.svg" alt="https://app.notion.com/icons/info-alternate_blue.svg" width="40px" />

 **Real-world use:** Multiple ECS tasks (e.g., a web server + a background worker) sharing the same upload directory via EFS — no S3 required for inter-container file sharing.

</aside>

- Open/Close Screenshot
    
    

---

---

# Step 5 : Deletion step-by-step

<aside>
<img src="https://app.notion.com/icons/info-alternate_blue.svg" alt="https://app.notion.com/icons/info-alternate_blue.svg" width="40px" />

**Order matters.** Delete in this sequence to avoid errors.

</aside>

### **❒**  Step 5.1 **Unmount EFS from EC2 instances (before terminating EC2):**

```bash
# On all connected EC2 instances
sudo umount /mnt/efs
sudo umount /mnt/efs-app  # if access point mount exists

# Remove fstab entry
sudo sed -i '/efs/d' /etc/fstab
```

- Open/Close Screenshot **Unmount EFS from EC2 instances**
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2050.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2051.png)
    

---

### **❒**  Step 5.2 **Terminate EC2 Instances:**

- **EC2 Console → Instances → Select both → Instance state → Terminate**
- Wait for status: `Terminated`

- Open/Close Screenshot **Terminate EC2**
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2052.png)
    

---

### **❒**  Step 5.3 **Delete EFS Access Points:**

- **EFS Console → Select your file system → Access points tab**
- Select each access point → **Actions → Delete**
- Confirm each deletion

- Open/Close Screenshot **Delete EFS Access Points**
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2053.png)
    

---

### **❒**  Step 5.4 **Delete EFS Replication (if created):**

- **EFS Console → Select your file system → Replication tab**
- Click **Delete replication**

- Open/Close Screenshot **Delete EFS Replication**
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2054.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2055.png)
    

---

### **❒**  Step 5.5 **Delete the EFS File System:**

- **EFS Console → File systems → Select your file system → Delete**
- The console will **automatically delete all mount targets** first
- Type the file system ID to confirm → **Confirm**
- ⏱️ Takes ~30 seconds

<aside>
<img src="https://app.notion.com/icons/info-alternate_blue.svg" alt="https://app.notion.com/icons/info-alternate_blue.svg" width="40px" />

**Console Note:** Unlike the CLI (where you must manually delete mount targets first), the **AWS Console handles mount target deletion automatically** when you delete the file system.

</aside>

- Open/Close Screenshot **Delete the EFS File System**
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2056.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2057.png)
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2058.png)
    

---

### **❒**  Step 5.6 **Delete the Security Group:**

- **EC2 Console → Security Groups → Select `efs-sg` → Actions → Delete security groups**
- ⚠️ Only works after EC2 instances are terminated (no more references to the SG)

- Open/Close Screenshot **Delete the Security Group**
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2059.png)
    

---

### **❒**  Step 5.7 **Delete Key Pair (optional):**

- **EC2 Console → Key Pairs → Select → Delete**

- Open/Close Screenshot **Delete Key Pair**
    
    ![image.png](AWS%20EFS(Elastic%20File%20System)%20Hands-On/image%2060.png)
    

---

**Verify in Cost Explorer:**

- **Billing → Cost Explorer → Service: EFS**
- New charges should stop within a few minutes

---

# When to use EFS and When not to use EFS

### When to use EFS

Use EFS when:

- ✅ You need **shared storage for Linux workloads** across multiple EC2 instances, containers, or Lambda
- ✅ You need a **serverless, auto-scaling** file system (no capacity planning)
- ✅ You're running **web servers** that serve static content shared across an Auto Scaling Group
- ✅ **Containers (ECS/EKS/Fargate)** need persistent shared storage
- ✅ **Lambda functions** need more than 512MB of writable storage
- ✅ You need **multi-AZ high availability** without managing replicas
- ✅ Your data has **variable access patterns** and you want automatic cost tiering (IA/Archive)
- ✅ **CI/CD pipelines** needing shared build caches
- ✅ **Content management systems** (WordPress, Drupal) storing user-uploaded media
- ✅ **Dev/test environments** where storage size is unpredictable

### When not to use EFS

- ❌ You have **Windows clients** that need SMB → use FSx for Windows
- ❌ You need **maximum HPC/ML throughput** (EFS max is tens of GB/s; Lustre is hundreds of GB/s)
- ❌ You need **NTFS permissions** or **Active Directory** → FSx for Windows
- ❌ Your app needs **S3 as a data lake backend** with burst access → FSx for Lustre
- ❌ You need **VSS shadow copies** → FSx for Windows
- ❌ You're running **Windows applications** like SharePoint or SQL Server with SMB → FSx for Windows

---

## The Decision Tree

```markdown
Shared file storage needed?
│
├── Windows clients + SMB + Active Directory?
│     → FSx for Windows
│
├── HPC / ML / Genomics / Parallel compute (Linux, massive throughput)?
│     → FSx for Lustre
│
├── S3 data lake + burst compute access?
│     → FSx for Lustre + DRA
│
├── Linux workloads + multi-client + serverless + auto-scale?
│     → EFS ✅
│
└── Just object storage, backups, static assets?
      → S3
```

---

# **SAA-C03 Real-World Scenario Tests**

## **Scenario 1 — Shared Web Content for Auto Scaling Group**

**Context:** A company runs a WordPress site on an EC2 Auto Scaling Group (2–10 instances). Uploaded media files must be visible to all instances instantly.

**Problem without EFS:** Each EC2 instance has its own EBS volume. A file uploaded to Instance A is invisible to Instances B, C, etc.

**Solution:** EFS mounted to all instances in the ASG.

**Architecture:**

```
Internet → ALB → Auto Scaling Group (2-10 EC2 t3.micro)
                       ↓ (all mounted to)
                    EFS File System (Regional)
                    /var/www/html/wp-content/uploads
```

**SAA-C03 Answer keywords:** EFS + ASG + shared static content

---

## **Scenario 2 — Serverless File Processing with Lambda**

**Context:** A data pipeline receives CSV files. Lambda processes them. Results must persist between invocations and be accessible to EC2 for inspection.

**Architecture:**

```
S3 Event → Lambda (processes CSV)
                ↓ (writes results to)
            EFS Access Point (/lambda-data)
                ↑ (reads for inspection)
            EC2 Admin Instance
```

**SAA-C03 keywords:** Lambda + EFS + Access Points + VPC

---

## **Scenario 3 — ECS Fargate Stateful Service**

**Context:** A containerized application on ECS Fargate needs to store user-generated content that persists across task restarts and is shared between tasks.

**Architecture:**

```
ECS Service (Fargate, 3 tasks)
    ↓ (all mount via EFS volume config)
EFS File System
    /uploads (app access point)
    /logs    (logs access point)
```

**Why not EBS?** EBS can't be shared across Fargate tasks. **Why not S3?** App needs filesystem semantics (POSIX), not object API.

---

## **Scenario 4 — Multi-Region Disaster Recovery**

**Context:** A company runs critical file-based workloads in ap-northeast-1 (Tokyo). They need a DR copy in ap-southeast-1 (Singapore) with an RPO of minutes.

**Solution:** Enable EFS Replication → Tokyo (primary, read-write) → Singapore (replica, read-only). In a DR event, promote the Singapore replica to be the new primary.

**SAA-C03 keywords:** EFS Replication + RPO + RTO + DR

---

## **Scenario 5 — Cost Optimization with Intelligent Tiering**

**Context:** A media company stores 50TB of video project files in EFS Standard. Only 10% are actively edited; 90% are rarely accessed archives.

**Solution:** Enable EFS Lifecycle Management:

- Active files → EFS Standard ($0.30/GB-month)
- Files not accessed in 30 days → EFS-IA ($0.016/GB-month = 95% saving)
- Files not accessed in 90 days → EFS Archive ($0.008/GB-month = 97% saving)

**Estimated monthly savings:**

- 45TB in Archive vs Standard: saves ~$13,000/month
- SAA-C03 keywords: EFS IA + Archive + Lifecycle Management + cost optimization

---

## **Scenario 6 — Wrong Choice Trap (SAA-C03 Trick)**

**Context:** "A Windows .NET application needs a shared filesystem that supports Windows Access Control Lists and integrates with Active Directory for user authentication."

**Trap answer:** "Use EFS — it's serverless and multi-AZ."

**Correct answer:** **FSx for Windows** — EFS uses NFSv4 (Linux), has no SMB, no Windows ACLs, no AD integration. EFS is Linux-only for file semantics.

---

## **Paired Services Cheat Sheet**

| Service | Pairs With EFS | Why |
| --- | --- | --- |
| EC2 (Linux) | ✅ Primary client | NFS mount to EFS |
| ECS / Fargate | ✅ Container shared storage | Persistent volumes across task restarts |
| EKS | ✅ Kubernetes PersistentVolumes | EFS CSI driver for K8s |
| Lambda | ✅ Serverless persistent storage | Via access points in same VPC |
| Auto Scaling Groups | ✅ Shared content across all instances | Web servers, CMS file storage |
| AWS Backup | ✅ Centralized backup | Backup EFS to S3-backed vault |
| AWS DataSync | ✅ Migration | Move on-prem NFS → EFS |
| CloudWatch | ✅ Monitoring | I/O, connections, storage class metrics |
| AWS KMS | ✅ Encryption at rest | CMK for EFS encryption |
| IAM | ✅ Access control | File system policies + access point IAM |
| AWS Direct Connect | ✅ On-premises access | Mount EFS from on-prem Linux servers |
| VPC + Security Groups | ✅ Required | Network access control (port 2049) |
| AWS Transfer Family | ✅ SFTP to EFS | File transfer protocol gateway to EFS |