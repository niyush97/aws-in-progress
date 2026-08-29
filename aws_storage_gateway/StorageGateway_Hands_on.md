# Console: S3 File Gateway

## **❐  Step 1 — Create the S3 Bucket**

1. Go to **S3 Console** → **Create bucket**
2. Settings:
    - **Bucket name:** `my-sgw-lab-bucket-<your-name>` (must be globally unique)
    - **Region:** `ap-northeast-1`
    - **Block all public access:** ✅ Enabled (leave default)
    - **Versioning:** Disabled (for cost)
    - **Encryption:** SSE-S3 (default)
3. Click **Create bucket**

- Open/Close ScreenShot
    
    ![image.png](Console%20S3%20File%20Gateway/image.png)
    

---

## **❐  Step 2 — Launch the Storage Gateway EC2 Instance (AMI)**


1. Go to **Storage Gateway Console** → [https://console.aws.amazon.com/storagegateway(opens in a new tab)](https://console.aws.amazon.com/storagegateway)
1. Click **Create gateway**
1. **Gateway name:** `my-s3-file-gateway`
1. **Gateway time zone:** `GMT+9:00 Tokyo`
1. **Gateway type:** Select **Amazon S3 File Gateway**
1. Click **Next**

**Host platform:**

7. Select **Amazon EC2**

8. Click **`Launch instance`** — this opens the EC2 console with the Storage Gateway AMI pre-selected

- ScreenShot
    
    ![image.png](Console%20S3%20File%20Gateway/image%201.png)
    
    ![image.png](Console%20S3%20File%20Gateway/image%202.png)
    
    ![image.png](Console%20S3%20File%20Gateway/image%203.png)
    
    ![image.png](Console%20S3%20File%20Gateway/image%204.png)
    

---



>When deploying your gateway on Amazon EC2, the instance size must be at least xlarge for your gateway to function. The Storage Gateway AMI is only compatible with x86-based instances that use Intel or AMD processors. ARM-based instances that use Graviton processors are not supported.



1. In the EC2 launch wizard, configure:
    - **Instance type:** `m5.xlarge` ← **minimum requirement, do NOT go smaller**
    - Recommended: General-purpose instance family — m5, m6, or m7 instance type, xlarge size or higher
    - **Key pair:** Select your existing key pair
    - **Network:** Your default VPC, public subnet
    - **Auto-assign public IP:** Enable
    - **Security group — add these inbound rules:**

| Port | Protocol | Source | Purpose |
| --- | --- | --- | --- |
| 80 | TCP | Your IP only | Gateway activation |
| 2049 | TCP/UDP | NFS client SG or CIDR | NFS |
| 111 | TCP/UDP | NFS client SG or CIDR | NFS portmapper |
| 20048 | TCP/UDP | NFS client SG or CIDR | NFS mountd |
| 443 | TCP | 0.0.0.0/0 | AWS communication |

- ScreenShot
    
    ![image.png](Console%20S3%20File%20Gateway/image%205.png)
    

---

1. **Add a storage volume (Cache disk):**
    - In the **Configure storage** section → **Add new volume**
    - Size: **150 GiB**, Type: **gp3**
    - *(This will be used as the local cache)*
2. Click **Launch instance**
3. Note the **Public IP** of this EC2 instance

- ScreenShot
    
    ![image.png](Console%20S3%20File%20Gateway/image%206.png)
    
    ![image.png](Console%20S3%20File%20Gateway/image%207.png)
    
    ![image.png](Console%20S3%20File%20Gateway/image%208.png)
    

---

## **❐  Step 3 — Activate the Gateway**

Back in the **Storage Gateway Console**:

1. Check the box: *"I completed all the steps above and launched the EC2 instance"*
2. Click **Next**
3. On **Connect to AWS:**
    - **Connection option:** `IP address`
    - **IP address:** Enter the **Public IPv4** of your gateway EC2 instance
    - **Endpoint type:** `Public`
4. Click **Next** — AWS will contact port 80 on your EC2 to retrieve an activation key
5. Confirm the **Gateway name** and **Time zone**
6. Click **Activate gateway**

> ⏳ Wait ~1–2 minutes for activation to complete.
> 

- ScreenShot
    
    ![image.png](Console%20S3%20File%20Gateway/image%209.png)
    
    ![image.png](Console%20S3%20File%20Gateway/image%2010.png)
    

---

## **❐  Step 4 — Configure the Cache Disk**

After activation, you'll be prompted to configure local disks:

1. You'll see the **150 GiB EBS volume** you attached listed as an available disk
2. Select it and assign it as **Cache** storage
3. Click **Save and continue**

- ScreenShot
    
    

---

## **❐  Step 5 — Create an NFS File Share**

1. In the Storage Gateway Console → left menu → **File shares**
2. Click **Create file share**
3. Settings:
    - **Gateway:** Select `my-s3-file-gateway`
    - **File share protocol:** `NFS`
    - **S3 bucket name:** `my-sgw-lab-bucket-<your-name>` (the bucket from Step 1)
    - **AWS Region:** `ap-northeast-1`
4. Click **Next**
5. **Amazon S3 storage settings:**
    - Storage class: `S3 Standard`
    - Object metadata: leave defaults
6. Click **Next**
7. **File access settings:**
    - **Allowed clients:** Add your NFS client's CIDR (e.g., `172.31.0.0/16` for default VPC)
    - **Squash level:** `Root squash` (recommended)
    - **Export as:** `Read-write`
8. Click **Create file share**

- ScreenShot
    
    ![image.png](Console%20S3%20File%20Gateway/image%2011.png)
    
    ![image.png](Console%20S3%20File%20Gateway/image%2012.png)
    
    ![image.png](Console%20S3%20File%20Gateway/image%2013.png)
    
    ![image.png](Console%20S3%20File%20Gateway/image%2014.png)
    
    ![image.png](Console%20S3%20File%20Gateway/image%2015.png)
    

---

## **❐  Step 6 — Test with an NFS Client EC2**

Launch a **small client EC2** (t3.micro, Amazon Linux 2023) in the same VPC:

```bash
# SSH into client EC2, then:

# Install NFS utils
sudo yum install -y nfs-utils

# Create a mount point
sudo mkdir -p /mnt/s3-gateway

# Mount the NFS share (get the mount command from the File Share console page)
# It looks like: sudo mount -t nfs -o nolock,hard <gateway-ip>:/<bucket-name> /mnt/s3-gateway
sudo mount -t nfs -o nolock,hard <GATEWAY_EC2_PRIVATE_IP>:/my-sgw-lab-bucket-<your-name> /mnt/s3-gateway

# Verify mount
df -h /mnt/s3-gateway

# Write a test file
echo "Hello from Storage Gateway Lab!" | sudo tee /mnt/s3-gateway/test-file.txt

# List files
ls -la /mnt/s3-gateway/

```

Now go to your **S3 Console → bucket → verify `test-file.txt` appears as an S3 object!** 🎉

- ScreenShot
    
    ![image.png](Console%20S3%20File%20Gateway/image%2016.png)
    
    ![image.png](Console%20S3%20File%20Gateway/image%2017.png)
    
    ![image.png](Console%20S3%20File%20Gateway/image%2018.png)
    
    ![image.png](Console%20S3%20File%20Gateway/image%2019.png)
    
    ![image.png](Console%20S3%20File%20Gateway/image%2020.png)
    
    ![image.png](Console%20S3%20File%20Gateway/image%2021.png)
    

---

## **❐   Step 7 🗑️ Deletion & Cleanup**

> ⚠️ **Always clean up promptly to avoid charges!**
> 

### **Console Cleanup (in order)**

**Step 1 — Delete the NFS File Share**

1. Storage Gateway Console → **File shares**
2. Select your file share → **Actions** → **Delete file share**
3. Type `delete` to confirm → **Delete**

- ScreenShot
    
    ![image.png](Console%20S3%20File%20Gateway/image%2022.png)
    
    ![image.png](Console%20S3%20File%20Gateway/image%2023.png)
    

---

**Step 2 — Delete the Gateway**

1. Storage Gateway Console → **Gateways**
2. Select `my-s3-file-gateway` → **Actions** → **Delete gateway**
3. Type `delete` to confirm → **Delete**

After you have deleted the gateway, you must remove any resources associated with the gateway that you don't need to avoid paying for those resources.

- ScreenShot
    
    ![image.png](Console%20S3%20File%20Gateway/image%2024.png)
    

---

**Step 3 — Terminate EC2 Instance**

1. EC2 Console → **Instances**
2. Select the Storage Gateway EC2 instance → **Instance state** → **Terminate instance**
3. The attached EBS volumes set to "Delete on termination" will be auto-deleted

- ScreenShot
    
    ![image.png](Console%20S3%20File%20Gateway/image%2025.png)
    
    ![image.png](Console%20S3%20File%20Gateway/image%2026.png)
    

---

**Step 4 — Delete EBS Snapshots (if any)**

1. EC2 Console → **Elastic Block Store** → **Snapshots**
2. Filter by your account, delete any snapshots created during the lab
3. Make sure to detach first to delete the volume

- ScreenShot
    
    ![image.png](Console%20S3%20File%20Gateway/image%2027.png)
    

---

**Step 5 — Empty and Delete S3 Bucket**

1. S3 Console → Select `my-sgw-lab-bucket-<your-name>`
2. Click **Empty** → type `permanently delete` → **Empty**
3. After empty → **Delete** → type bucket name → **Delete bucket**

- ScreenShot
    
    ![image.png](Console%20S3%20File%20Gateway/image%2028.png)
    

---

**Step 6 — Delete Security Group** (if manually created)

1. EC2 Console → **Security Groups**
2. Select your SGW security group → **Actions** → **Delete security groups**

- ScreenShot
    
    ![image.png](Console%20S3%20File%20Gateway/image%2029.png)
    

---

**Step 7 — Delete IAM Role** (if manually created)

1. IAM Console → **Roles** → search `storage-gateway`
2. Select and **Delete**

- ScreenShot
    
    ![image.png](Console%20S3%20File%20Gateway/image%2030.png)
    
    ![image.png](Console%20S3%20File%20Gateway/image%2031.png)
    

---

## **❐  Step 8 — Verify CloudWatch Metrics (Optional but SAA-C03 relevant)**

1. Go to **CloudWatch Console** → **Metrics** → **StorageGateway**
2. Look for metrics like:
    - `CacheHitPercent`
    - `CacheUsed`
    - `ReadBytes` / `WriteBytes`
3. This shows you how the **local cache** offloads reads from S3

---