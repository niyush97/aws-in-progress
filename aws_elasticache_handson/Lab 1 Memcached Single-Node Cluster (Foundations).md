# Lab 1: Memcached Single-Node Cluster (Foundations)

<aside>
<img src="https://app.notion.com/icons/graduate_green.svg" alt="https://app.notion.com/icons/graduate_green.svg" width="40px" />

### **What You'll Learn**

- How to provision a Memcached cluster via Console
- Subnet group & security group concepts (the #1 source of connection failures)
- Connecting from an EC2 instance in the same VPC using **`telnet`** and the **`memcached`** CLI
- Why Memcached has NO backup, NO failover, and what that means for your architecture
</aside>

---

### Architecture

```markdown
   VPC: 10.0.0.0/16 (us-east-1)
   ├── Public subnet  10.0.1.0/24 (us-east-1a)
   │       └── EC2 (bastion + test client) — public IP
   │
   └── Private subnet 10.0.2.0/24 (us-east-1a)
           └── ElastiCache Memcached t3.micro (single node)
                    │
                    └── SG-memcached: allow 11211 from SG-ec2
```

---

### **💴 Cost for This Lab (2-hour session)**

| **Resource** | **Type** | **Hours** | **Cost** |
| --- | --- | --- | --- |
| EC2 | t3.micro | 2 | $0.02 |
| Memcached | cache.t3.micro | 2 | $0.03 |
| EBS gp3 (8 GB) | — | 2 | <$0.01 |
| **Total** |  |  | **~$0.06** |

⚠️ If you forget to delete the Memcached cluster, it will cost **~$12.50/month**.

---

#### **Step 1: Create a VPC (if you don't have a test VPC)**

> If you already have a VPC with public + private subnets, skip to Step 3. But running these steps ensures the lab is reproducible.
> 
1. Go to **AWS Console → VPC**.
2. Click **Create VPC** (orange button, top right).
3. Under **Resources to create**, select **VPC and more** (this auto-creates subnets, IGW, route tables).
4. Set the following:
    - **Name tag auto-generation:** **`elc-lab`**
    - **IPv4 CIDR block:** **`10.0.0.0/16`**
    - **Number of Availability Zones:** **`1`** (we want 1 AZ for the cheapest lab; we'll use 2+ in Phase 2)
    - **Number of public subnets:** **`1`**
    - **Number of private subnets:** **`1`**
    - **NAT gateways:** **`$0`** ⚠️ **None** (critical to avoid $32/month charge)
    - **VPC endpoints:** None
5. Click **Create VPC**. Wait ~2 minutes for the wizard to finish.
6. Verify: VPC console → **Your VPCs** → you should see **`elc-lab-vpc`** with CIDR **`10.0.0.0/16`**.
7. Verify: **Subnets** → you should see **`elc-lab-public-subnet-public-us-east-1a`** (10.0.1.0/24) and **`elc-lab-private-subnet-private-us-east-1a`** (10.0.2.0/24).

💡 **WHY no NAT Gateway?** A NAT Gateway costs $0.045/hour ($32/month) **even when idle**. For these labs, EC2 will be in a public subnet and reach AWS services (S3, Secrets Manager) directly via IGW. If you need private S3 access later, use a **Gateway VPC Endpoint** (free).

- Screenshot 

**Create a VPC**
    
![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image.png)
    

---

#### **Step 2: Create Security Groups**

> **EC2 SG:**
> 
1. **Create security group**.
2. Fill in:
    - **Name:** **`elc-lab-ec2-sg`**
    - **Description:** **`Bastion/test client`**
    - **VPC:** **`elc-lab-vpc`**
3. **Inbound rules → Add rule:**
    - Type: **`SSH`**
    - Source: **`My IP`** (click the dropdown — Console auto-detects your public IP). ⚠️ Never use **`0.0.0.0/0`** in production.
4. Click **Create security group**.

---

> **Memcached SG:**
> 
1. Console → **VPC → Security Groups → Create security group**.
2. Fill in:
    - **Name:** **`elc-lab-memcached-sg`**
    - **Description:** **`Allow 11211 from EC2 SG`**
    - **VPC:** **`elc-lab-vpcÎ`**
3. **Inbound rules → Add rule:**
    - Type: **`Custom TCP`**
    - Port range: **`11211`**
    - Source: start typing **`elc-lab-ec2-sg`** — it should auto-complete. Select it.
    - Click **Save rules**.
4. **Outbound rules:** leave default (allow all).
5. Click **Create security group**.

💡 **WHY reference SG instead of CIDR?** Security group references track the actual EC2 instances attached to that SG, even if their private IPs change. This is the canonical AWS pattern and is tested in SAA-C03.

- Screenshot **EC2 SG:**
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%201.png)
    

- Screenshot **Memcached SG**
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%202.png)
    

---

#### **Step 3: Launch a Test EC2 Instance**

1. Console → **EC2 → Instances → Launch instances**.
2. **Name:** **`elc-lab-client`**
3. **AMI:** **`Amazon Linux 2023`** (the default, free-tier-eligible AMI — but we're not on free tier, so it'll cost ~$7.60/month if left running).
4. **Instance type:** **`t3.micro`**.
5. **Key pair:** Create new key pair → **`elc-lab-key`** → RSA → **`.pem`** → Create. Save it to **`~/Downloads/elc-lab-key.pem`**.
6. **Network settings → Edit:**
    - VPC: **`elc-lab-vpc`**
    - Subnet: **`elc-lab-public-subnet-public-us-east-1a`**
    - Auto-assign public IP: **Enable** ⚠️ (Required for SSH access; no NAT here)
    - Firewall (security group): **Select existing** → **`elc-lab-ec2-sg`**
7. **Storage:** default 8 GiB gp3.
8. **Advanced details → User data:** paste the following:
- Sample Bash Code
    
    ```bash
    #!/bin/bash
    yum update -y
    yum install -y telnet memcached libmemcached
    curl -s https://stedolan.github.io/jq/download/linux64/jq -o /usr/local/bin/jq
    chmod +x /usr/local/bin/jq
    ```
    
1. Click **Launch instance**.
2. Wait ~2 minutes. Click **View all instances** → wait until **`elc-lab-client`** shows **`Running`** and **`2/2 checks passed`**.

💡 **WHY user data?** Saves you from running install commands manually after SSH. This is a common SAA-C03 pattern — automation via user-data is the right answer for "how to bootstrap instances."

- Screenshot Launch Instance
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%203.png)
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%204.png)
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%205.png)
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%206.png)
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%207.png)
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%208.png)
    

---

#### **Step 4: SSH to EC2**

Open your macOS terminal:

```bash
chmod 400 ~/Downloads/elc-lab-key.pem
ssh -i ~/Downloads/elc-lab-key.pem ec2-user@<EC2_PUBLIC_IP>
# Replace <EC2_PUBLIC_IP> with the value from EC2 console
```

- Screenshot  **SSH to**
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%209.png)
    

---

#### **Step 5: Create the ElastiCache Subnet Group**

1. Console → **ElastiCache** (search bar top-left).
2. Left nav → **Subnet groups → Create subnet group**.
3. Fill in:
    - **Name:** **`elc-lab-subnet-group`**
    - **Description:** **`Subnet group for ElastiCache labs`**
    - **VPC:** **`elc-lab-vpc`**
    - **Subnets:** select **`elc-lab-private-subnet-private-us-east-1a`** (10.0.2.0/24)
4. Click **Create**.

💡 **WHY a subnet group?** ElastiCache requires you to declare which subnets it can place nodes in. This is required because clusters may have multiple nodes spanning multiple AZs, and AWS needs to know your preference. Tested in SAA-C03.

⚠️ **Common mistake:** choosing the public subnet. ElastiCache nodes are NEVER given public IPs — they must live in private subnets. The cluster will technically deploy but you'll have no way to reach it from outside the VPC (which is what you want for security).

- Screenshot  **ElastiCache Subnet Group**
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%2010.png)
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%2011.png)
    

---

#### **Step 6: Create the Memcached Cluster**

1. ElastiCache console → **Memcached clusters → Create Memcached cluster**.
2. **Cluster settings:**
    - **Choose cluster settings:** **`Design your own cluster`** (don't use easy create — you lose control).
    - **Cluster info → Name:** **`elc-lab-memcached`**
    - **Description:** **`Lab 1 Memcached`**
3. **Cluster settings:**
    - **Engine version:** **`1.6.22`** (latest stable at time of writing — pick whatever default is shown)
    - **Node type:** click **Choose node type** → **`Current generation`** → **`cache.t3.micro`** → **Save**.
    - **Number of nodes:** **`1`**
4. **Subnet group settings:**
    - **Subnet group:** **`elc-lab-subnet-group`**
5. **Advanced settings → Security:**
    - **Security groups:** select **`elc-lab-memcached-sg`** (remove **`default`** if present)
6. **Advanced settings → Other:**
    - **Maintenance window:** **`No preference`**
    - **Notifications:** None
7. Click **Create**.

You'll be redirected to the cluster list. Status will be **`Creating`** for ~3–5 minutes, then **`Available`**.

- Screenshot **Create the Memcached Cluster**
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%2012.png)
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%2013.png)
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%2014.png)
    

---

#### **Step 7: Get the Configuration Endpoint**

1. Click the cluster name **`elc-lab-memcached`**.
2. Under **Configuration endpoint**, copy the **Primary endpoint** address (looks like **`elc-lab-memcached.xxxxxx.cfg.use1.cache.amazonaws.com:11211`**).
3. Note this endpoint — you'll use it from EC2.

- Screenshot  **Get the Configuration Endpoint**
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%2015.png)
    

---

#### **Step 8: Connect from EC2 and Test**

Back in your SSH session:

```bash
# IF ENCRYPTION IN TRANSIT IS DISABLED
telnet elc-lab-memcached.xxxxxx.cfg.use1.cache.amazonaws.com 11211
# You should see "Connected to ... Escape character is '^]'."
# Type Ctrl-] then quit to exit telnet

# Set a key
echo -e "set greeting 0 0 11\r\nhello world\r" | nc elc-lab-memcached.xxxxxx.cfg.use1.cache.amazonaws.com 11211
# Expected output: STORED

# Get the key
echo -e "get greeting\r" | nc elc-lab-memcached.xxxxxx.cfg.use1.cache.amazonaws.com 11211
# Expected output:
# VALUE greeting 0 11
# hello world
# END

# Use the memcached CLI for richer stats
memcached-tool elc-lab-memcached.xxxxxx.cfg.use1.cache.amazonaws.com:11211 stats
# Expect a long stats table; verify:
#   curr_items 1
#   bytes       11 (or similar)

---------------------------------------
# if ENCRYPTION IN TRANSIT IS CHECKED ON USED THESE COMMANDS.

Endpoint='0001.elc-lab-memcached.fkhzne.apne1.cache.amazonaws.com:11211'

openssl s_client -connect $Endpoint

printf "set greeting 0 0 11\r\nhello world\r\nget greeting\r\nquit\r\n" | openssl s_client -connect $Endpoint -quiet

printf "set greeting 0 0 11\r\nhello world\r\n" | timeout 2 openssl s_client -quiet -connect $Endpoint

printf "get greeting\r\n" | timeout 2 openssl s_client -quiet -connect $Endpoint

printf "stats\r\n" | timeout 2 openssl s_client -quiet -connect $Endpoint | grep curr_items
```

✅ **Verification checklist:**

- [ ]  **`telnet`** connects successfully.
- [ ]  **`STORED`** response from **`set`**.
- [ ]  **`get`** returns **`hello world`**.
- [ ]  **`memcached-tool stats`** shows **`curr_items >= 1`**.

- Screenshot  **Connect from EC2 and Test**
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%2016.png)
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%2017.png)
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%2018.png)
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%2019.png)
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%2020.png)
    

---

#### **Step 9: Test Eviction (Memcached-specific behavior)**

- If encryption in transit is unchecked
    
    ```bash
    # Memcached has a max size by default; new keys evict old ones via LRU
    # Check current memory limit
    echo "stats settings" | nc elc-lab-memcached.xxxxxx.cfg.use1.cache.amazonaws.com 11211 | grep maxbytes
    # Expect: STAT maxbytes 16777216  (i.e., 16 MB on cache.t3.micro)
    
    # Set a 1-second TTL
    echo -e "set temp 0 1 5\r\nhello\r" | nc elc-lab-memcached.xxxxxx.cfg.use1.cache.amazonaws.com 11211
    # Expect: STORED
    
    # Immediately get — should succeed
    echo -e "get temp\r" | nc elc-lab-memcached.xxxxxx.cfg.use1.cache.amazonaws.com 11211
    
    # Wait 2 seconds, get again — should return END (expired)
    sleep 2
    echo -e "get temp\r" | nc elc-lab-memcached.xxxxxx.cfg.use1.cache.amazonaws.com 11211
    ```
    

- Command if Encryption in Transit is checked on
    
    ```bash
    Endpoint='0001.elc-lab-memcached.fkhzne.apne1.cache.amazonaws.com:11211'
    
    openssl s_client -connect $Endpoint
    
    printf "set greeting 0 0 11\r\nhello world\r\n" | timeout 2 openssl s_client -quiet -connect $Endpoint
    
    printf "get greeting\r\n" | timeout 2 openssl s_client -quiet -connect $Endpoint
    
    printf "stats\r\n" | timeout 2 openssl s_client -quiet -connect $Endpoint | grep curr_items
    
    ============================================================
    # Memcached has a max size by default; new keys evict old ones via LRU
    # Check current memory limit
    printf "stats settings\r\n" | timeout 2 openssl s_client -quiet -connect $Endpoint | grep maxbytes
    
    # Set a 60 second TTL
    printf "set temp 0 60 5\r\nhello\r\n" | timeout 2 openssl s_client -quiet -connect $Endpoint
    # Expect: STORED
    
    printf "get temp\r\n" | timeout 2 openssl s_client -quiet -connect $Endpoint
    # Expect: VALUE temp 0 5 \n hello \n END
    
    # Wait 2 seconds, get again — should return END (expired)
    sleep 2
    printf "get temp\r\n" | timeout 2 openssl s_client -quiet -connect $Endpoint
    # Expect: END
    
    ```
    

- Screenshot **Test Eviction**
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%2021.png)
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%2022.png)
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%2023.png)
    

---

### **🗑️ Cleanup — Lab 1**

> Do this BEFORE moving to Lab 2 to avoid double charges.
> 

1. ElastiCache console → **Memcached clusters** → select **`elc-lab-memcached`** → **Delete**.
2. Confirm by typing **`delete me`** in the confirmation box → **Delete**.
3. Wait ~2 minutes for status to become **`Deleted`**.
4. **DO NOT delete** the VPC, subnet group, or security groups — we'll reuse them in Lab 2.
5. **DO NOT delete** the EC2 instance — we'll reuse it in Lab 2.

- Screenshot **Cleanup — Lab 1**
    
    ![image.png](Lab%201%20Memcached%20Single-Node%20Cluster%20(Foundations)/image%2024.png)
    

---

### **📊 Summary**

| **Done** | **Why it matters** |
| --- | --- |
| Created VPC w/ public + private subnet | Foundational VPC layout required by ElastiCache |
| Created SG referencing another SG | The canonical AWS security pattern (SG-to-SG) |
| Created subnet group | Mandatory prerequisite for cluster creation |
| Deployed Memcached t3.micro | Cheapest hands-on cache |
| Tested TTL eviction | Reinforces Memcached's ephemeral nature |

---

### **Common Mistakes & How to Avoid Them**

| **Mistake** | **Symptom** | **Fix** |
| --- | --- | --- |
| Wrong SG on cache | **`telnet`** hangs (no connection) | Check SG inbound: port 11211 from EC2 SG |
| Cluster in public subnet | Can't reach node from EC2 | Move subnet group to private subnets |
| Used **`My IP`** for Memcached SG | Works from your laptop but not from EC2 | Source should be EC2 SG, not your IP |
| Forgot to allow egress on EC2 SG | **`telnet`** works to internet but not to Memcached | EC2 SG outbound should be **`0.0.0.0/0`** (default) |
| Mixed VPCs (EC2 in default VPC, cache in lab VPC) | Can't reach endpoint | Re-create both in same VPC |

---

### **🎯 Key Concepts for SAA-C03**

- 🎯 Memcached = multi-threaded, no replication, no persistence, no failover.
- 🎯 Memcached supports up to 20 nodes per cluster (client-side sharding).
- 🎯 Memcached does NOT support backups, encryption at rest, or AUTH.
- 🎯 Choose Memcached when: large multi-threaded cache, no need for HA, ephemeral data only.
- 🎯 Memcached does NOT support Multi-AZ — only multi-node in same AZ for sharding.

---

### **Practice Questions (Lab 1)**

<aside>
<img src="https://app.notion.com/icons/thought-dialogue_blue.svg" alt="https://app.notion.com/icons/thought-dialogue_blue.svg" width="40px" />

**Q1.** A startup is building a real-time analytics dashboard that requires caching of session data with automatic failover across AZs and the ability to take daily backups. Which caching engine should they use?

- A. Memcached with multi-node
- B. Redis with cluster mode disabled and Multi-AZ
- C. Redis with cluster mode enabled with 1 shard
- D. DynamoDB DAX
- **Answer**
    
    **: C.** 🎯 Only Redis supports Multi-AZ failover, backups, AND persistence. Cluster mode enabled with 1 shard gives you Multi-AZ failover. Memcached (A) has no failover or backups. (B) cluster mode disabled can also work but does not scale horizontally. (D) DAX is DynamoDB-only.
    
</aside>

---

<aside>
<img src="https://app.notion.com/icons/thought-dialogue_blue.svg" alt="https://app.notion.com/icons/thought-dialogue_blue.svg" width="40px" />

**Q2.** An application requires a cache that supports 4 CPU cores per node and parallel processing of cache operations on the same node. The cache is purely ephemeral (no persistence needed). Which engine is most appropriate?

- A. Redis cluster mode disabled
- B. Redis cluster mode enabled
- C. Memcached
- D. DynamoDB Streams
- **Answer**
    
    **Answer: C.** 🎯 Memcached is multi-threaded and can use multiple CPU cores per node. Redis is single-threaded per shard. Memcached is ideal for ephemeral parallel caches.
    
</aside>

---

<aside>
<img src="https://app.notion.com/icons/thought-dialogue_blue.svg" alt="https://app.notion.com/icons/thought-dialogue_blue.svg" width="40px" />

**Q3.** Your team needs to deploy ElastiCache Memcached. The architecture requires the cache to survive an AZ failure with no data loss tolerance. What should you do?

- A. Deploy 2 nodes in 2 AZs; Memcached will replicate automatically
- B. Use Redis instead — Memcached cannot meet the requirement
- C. Enable Multi-AZ on the Memcached cluster
- D. Use a custom script to snapshot Memcached to S3
- **Answer**
    
    **Answer: B.** 🎯 Memcached has NO replication, NO Multi-AZ failover, and NO snapshots. If AZ-failure tolerance is required, you must switch to Redis. This is a classic exam trap.
    
</aside>

---