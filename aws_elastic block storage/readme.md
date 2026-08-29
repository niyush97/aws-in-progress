# Getting started with Elastic Block Storage


### Prerequisites :

>Before starting, make sure you have:
>- An active **AWS Account** with Console access
>- A user with **AdministratorAccess** or appropriate IAM permissions
>- Basic familiarity with EC2 (launching instances)



---

## ❑ Step 1 : Create a Key pair

```bash
1. Login → AWS Console (console.aws.amazon.com)

2. Top right → make sure region is set to:
   "US East (N. Virginia) us-east-1" or "the one near to oneself"

3. Search bar (top) → type "EC2" → click EC2

4. LEFT sidebar → scroll down to
   "Network & Security" → click "Key Pairs"

5. Top right → click "Create Key Pair" (orange button)

6. Fill in:
   ┌──────────────────────────────────────────────┐
   │ Name            → my-ebs-keypair             │
   │ Key Pair Type   → RSA                        │
   │ Private Key     → .pem  (for Mac/Linux SSH)  │
   │ Format          → .pem                       │
   │ Tags            → optional                   │
   └──────────────────────────────────────────────┘

7. Click "Create Key Pair" (orange button) ✅

8. ⚠️ .pem file downloads AUTOMATICALLY to your Mac
   → Move it to a safe folder e.g. ~/.ssh/

   mv ~/Downloads/my-ebs-keypair.pem ~/.ssh/

   ⚠️ You CANNOT download this again — keep it safe!
```

- `Image : Creating KeyPair`
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image.png)
    

---

## ❑ Step 2 : Launching EC2 Instance.

```makefile
1. EC2 Dashboard → LEFT sidebar → "Instances"
   → click "Instances"

2. Top right → "Launch Instances" (orange button)

3. Fill in Section by Section:

   ┌─────────────────────────────────────────────────┐
   │ SECTION 1 — Name                                │
   │ Name → my-ec2-instance                          │
   └─────────────────────────────────────────────────┘

   ┌─────────────────────────────────────────────────┐
   │ SECTION 2 — Application and OS Images (AMI)     │
   │ → Click "Amazon Linux"                          │
   │ → Amazon Linux 2023 AMI ✅ (Free tier eligible) │
   │ → Architecture: 64-bit (x86)                    │
   └─────────────────────────────────────────────────┘

   ┌─────────────────────────────────────────────────┐
   │ SECTION 3 — Instance Type                       │
   │ → t2.micro ✅ (Free tier eligible)              │
   └─────────────────────────────────────────────────┘

   ┌─────────────────────────────────────────────────┐
   │ SECTION 4 — Key Pair                            │
   │ → Select "my-ebs-keypair" (created in Step 1)   │
   └─────────────────────────────────────────────────┘

   ┌─────────────────────────────────────────────────┐
   │ SECTION 5 — Network Settings                    │
   │ → Click "Edit"                                  │
   │ VPC            → default                        │
   │ Subnet         → us-east-1a ⚠️ NOTE THIS DOWN   │
   │                  (your EBS must match this AZ)  │
   │ Auto-assign IP → Enable                         │
   │ Firewall       → Create Security Group          │
   │ Security Group → Allow SSH traffic ✅           │
   │                  Source: My IP (recommended)    │
   └─────────────────────────────────────────────────┘

   ┌─────────────────────────────────────────────────┐
   │ SECTION 6 — Storage (Root Volume)               │
   │ → 8 GiB  gp3  (default is fine)                 │
   │ → "Delete on Termination" = YES (default)       │
   │   ✅ Leave as YES — root volume auto-deletes     │
   │      when instance terminates                   │
   └─────────────────────────────────────────────────┘

4. Right side summary panel → "Launch Instance" ✅

5. Click "View All Instances"

6. Wait for:
   Instance State  → "running"    ✅
   Status Checks   → "2/2 checks" ✅
   (takes 1-2 minutes)

7. Click your instance → note down:
   ┌─────────────────────────────────────────────────┐
   │ Public IPv4 Address → e.g. 54.123.45.67         │
   │ Availability Zone   → e.g. us-east-1a           │
   └─────────────────────────────────────────────────┘
```

- `Image`
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%201.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%202.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%203.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%204.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%205.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%206.png)
    

---

## Step 3 : Create EBS Volume

```notion
1. EC2 → LEFT sidebar → "Elastic Block Store"
   → click "Volumes"

2. Top right → "Create Volume" (orange button)

3. Fill in:
   ┌──────────────────────────────────────────────────┐
   │ Volume Type       → gp3 ✅ (General Purpose SSD) │
   │ Size              → 8 GiB                        │
   │ IOPS              → 3000 (default)               │
   │ Throughput        → 125 MiB/s (default)          │
   │ Availability Zone → us-east-1a                   │
   │                  ⚠️ MUST match your EC2's AZ!    │
   │ Snapshot ID       → leave empty                  │
   │ Encryption        → leave default                │
   │ Tags → Key: Name  Value: my-ebs-volume           │
   └──────────────────────────────────────────────────┘

4. Click "Create Volume" ✅

5. Volume appears with state = "available"
```

- Image :
    
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%207.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%208.png)
    

---

## ❑ Step 4 : Attaching Volume to EC2

```notion
1. EC2 → Elastic Block Store → Volumes

2. Click checkbox next to "my-ebs-volume"
   (state should be "available")

3. "Actions" dropdown → "Attach Volume"

4. Fill in:
   ┌─────────────────────────────────────────────────┐
   │ Instance   → select "my-ec2-instance"           │
   │ Device     → /dev/sdf                           │
   │              (AWS maps this to /dev/xvdf        │
   │               inside the EC2)                   │
   └─────────────────────────────────────────────────┘

5. Click "Attach Volume" ✅

6. Volume state changes:
   "available" → "in-use" 
```

- Image
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%209.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2010.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2011.png)
    

---

## ❑ Step 5 : Connecting to EC2 via SSH (Mac/Linux)

```makefile
# Step 1 — Open Terminal on your Mac

# Step 2 — Navigate to where your .pem file is
cd ~/.ssh/

# Step 3 — Fix permissions on .pem file (REQUIRED!)
# SSH will refuse connection without this
chmod 400 my-ebs-keypair.pem

# Step 4 — Connect to EC2
ssh -i "my-ebs-keypair.pem" ec2-user@<your-public-ip>
# Replace <your-public-ip> with e.g. 54.123.45.67
# e.g:
ssh -i "my-ebs-keypair.pem" ec2-user@54.123.45.67

# Step 5 — First time connecting you'll see:
# "Are you sure you want to continue connecting? (yes/no)"
# Type: yes → press Enter

# Step 6 — You're in! You'll see:
#    ,     #_
#    ~\\_  ####_        Amazon Linux 2023
#   ~~  \\_#####\\
#   ~~     \\###|       Welcome to your EC2!
# [ec2-user@ip-172-xx-xx-xx ~]$  ✅
```

- Image
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2012.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2013.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2014.png)
    

---

## ❑ Step 6: Format & Mount the Volume

```bash
# ── All commands run inside EC2 via SSH ──

# Step 1 — Verify the volume is attached
lsblk
# Output should show:
# NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
# xvda    202:0    0   8G  0 disk
# └─xvda1 202:1    0   8G  0 part /
# xvdf    202:80   0   8G  0 disk   ← your new volume (no mountpoint yet)

# Step 2 — Format the volume
# ⚠️ ONLY do this ONCE on a brand new empty volume!
# ⚠️ NEVER do this on a volume that already has data!
sudo mkfs -t ext4 /dev/xvdf
# Output: Creating filesystem with 2097152 4k blocks... ✅

# Step 3 — Create a mount point (a folder to access the volume)
sudo mkdir /mnt/myebs

# Step 4 — Mount the volume to the folder
sudo mount /dev/xvdf /mnt/myebs

# Step 5 — Verify it's mounted
df -h
# Output should show:
# /dev/xvdf   7.9G   24M  7.4G   1% /mnt/myebs  ✅

# Step 6 — (Optional but Recommended) Make mount permanent after reboot
# Get the UUID of your volume
sudo blkid /dev/xvdf
# Output: /dev/xvdf: UUID="abc-123-xyz" TYPE="ext4"
# Copy the UUID value
# Example ::: UUID="9f9fa7c2-e726-4343-be8c-e84ae08d3cf5" BLOCK_SIZE="4096" TYPE="ext4"

# Edit fstab
sudo nano /etc/fstab

# Add this line at the very bottom (replace UUID with yours):
UUID=abc-123-xyz  /mnt/myebs  ext4  defaults,nofail  0  2

# Save: Ctrl+X → Y → Enter ✅
```

- image
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2015.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2016.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2017.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2018.png)
    

---

## ❑  Step 7: Write & Test Data

```bash
# ── All commands run inside EC2 via SSH ──

# Step 1 — Navigate to your mounted EBS volume
cd /mnt/myebs

# Step 2 — Create a test file
echo "Hello EBS! This data lives on my EBS volume!" | sudo tee testfile.txt

# Step 3 — Create a folder with more files
sudo mkdir myfolder
echo "File 1 content" | sudo tee myfolder/file1.txt
echo "File 2 content" | sudo tee myfolder/file2.txt

# Step 4 — Read the files back
cat testfile.txt
# Output: Hello EBS! This data lives on my EBS volume! ✅

ls -la myfolder/
# Output: file1.txt  file2.txt ✅

# Step 5 — Check disk usagels 
df -h /mnt/myebs
# Output: shows size, used, available space ✅

# Step 6 — Check all files on volume
ls -la /mnt/myebs
```

- Image
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2019.png)
    

---

## ❑  Step 8: Create a Snapshot

```
1. EC2 → Elastic Block Store → Volumes

2. Click checkbox next to "my-ebs-volume"

3. "Actions" dropdown → "Create Snapshot"

4. Fill in:
   ┌──────────────────────────────────────────────────┐
   │ Description → "myebs-backup-march-2026"          │
   │ Tags:                                            │
   │   Key: Name                                      │
   │   Value: myebs-snapshot-march-2026               │
   └──────────────────────────────────────────────────┘

5. Click "Create Snapshot" ✅

6. To view:
   EC2 → Elastic Block Store → Snapshots

7. Wait for status:
   "pending" → "completed" ✅
   (few minutes depending on volume size)
```

- Image
    
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2020.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2021.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2022.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2023.png)
    

---

## ❑  Step 9: Share Snapshot with Another AWS Account

```
1. EC2 → Elastic Block Store → Snapshots

2. Make sure filter shows "Owned by me"

3. Click checkbox next to your snapshot

4. "Actions" dropdown → "Modify Permissions"

5. You'll see:
   ┌──────────────────────────────────────────────────┐
   │ 🔴 Public  → Anyone can use it                   │
   │              ⚠️ NOT recommended                  │
   │                                                  │
   │ 🟢 Private → Share with specific accounts ✅     │
   └──────────────────────────────────────────────────┘

6. Select "Private"
   → Click "Add AWS Account ID"
   → Enter the 12-digit account ID
     e.g. 123456789012
   → Click "Add" ✅

7. Click "Save Changes" ✅

   The other user finds it:
   EC2 → Snapshots → filter "Private Snapshots"
   → they can Create Volume from it ✅
```

- Image
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2024.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2025.png)
    

---

## ❑  Step 10: Export Snapshot to Your Own S3 Bucket

### ⌘ Step 10a — Create S3 Bucket First

```
1. AWS Console → Search "S3" → Open S3

2. Click "Create Bucket" (orange button)

3. Fill in:
   ┌──────────────────────────────────────────────────┐
   │ Bucket Name → my-ebs-snapshots-bucket-2026       │
   │               ⚠️ Must be globally unique         │
   │ Region      → us-east-1                          │
   │               ⚠️ Same region as your volume      │
   │ Block Public Access → leave ON ✅                │
   │ Versioning  → Disable (for now)                  │
   │ Encryption  → default                            │
   └──────────────────────────────────────────────────┘

4. Click "Create Bucket" ✅
```

- Image :
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2026.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2027.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2028.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2029.png)
    

---

### ⌘ Step 10b — Store Snapshot to S3

```
1. EC2 → Elastic Block Store → Snapshots

2. Click checkbox next to your snapshot

3. "Actions" dropdown → "Store Snapshot"

4. Fill in:
   ┌──────────────────────────────────────────────────┐
   │ S3 Bucket → my-ebs-snapshots-bucket-2026         │
   └──────────────────────────────────────────────────┘

5. Click "Store Snapshot" ✅

6. Verify in S3:
   S3 → your bucket → snapshot data appears ✅

7. To share with users via Pre-signed URL:
   S3 → your bucket → select the file
   → "Object Actions" → "Share with presigned URL"
   → Set expiry: e.g. 7 days
   → Copy URL → send to users ✅
```

- Image
    
    

---

## ❑  Step 11: Restore Snapshot to a New Volume

```
1. EC2 → Elastic Block Store → Snapshots

2. Click checkbox next to your snapshot

3. "Actions" dropdown → "Create Volume from Snapshot"

4. Fill in:
   ┌──────────────────────────────────────────────────┐
   │ Volume Type → gp3                                │
   │ Size        → 8 GiB or larger                   │
   │               ⚠️ NEVER smaller than original    │
   │ AZ          → us-east-1a                        │
   │               ⚠️ Must match your EC2's AZ       │
   │ Tags → Key: Name  Value: my-restored-volume      │
   └──────────────────────────────────────────────────┘

5. Click "Create Volume" ✅

6. Attach to EC2 (follow Step 4 again)
   Device name → /dev/sdg (maps to /dev/xvdg)

7. SSH in and mount (NO formatting — data already exists!)
   sudo mkdir /mnt/myebs-restored
   sudo mount /dev/xvdg /mnt/myebs-restored
   ls /mnt/myebs-restored
   cat /mnt/myebs-restored/testfile.txt
   # Output: Hello EBS! ✅ Data is back!
```

---

## CLEANUP — Avoid Charges 

> ⚠️ Follow this order exactly — some steps depend on previous ones
> 

## ❑  Step 12: Unmount & Detach Volume

### ⌘ Step 12a — Unmount inside EC2 first (via SSH)

```bash
# SSH into EC2
ssh -i "my-ebs-keypair.pem" ec2-user@<your-public-ip>

# Unmount the volume
sudo umount /mnt/myebs

# Verify it's unmounted
df -h
# /dev/xvdf should NO longer appear ✅

# Also remove fstab entry to keep things clean
sudo nano /etc/fstab
# Delete the UUID line you added earlier
# Ctrl+X → Y → Enter ✅

# Exit SSH
exit
```

- image
    
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2030.png)
    

---

### ⌘ Step 12b — Detach via AWS Console

```
1. EC2 → Elastic Block Store → Volumes

2. Click checkbox next to "my-ebs-volume"

3. "Actions" dropdown → "Detach Volume"

4. Confirm → Click "Detach" ✅

5. Volume state changes:
   "in-use" → "available" ✅
```

- Image
    
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2031.png)
    

---

## ❑  Step 13: Delete EBS Volume

> ⚠️ Volume must be "available" (detached) before deleting
⚠️ This is PERMANENT and UNRECOVERABLE
> 

```
1. EC2 → Elastic Block Store → Volumes

2. Confirm state = "available"

3. Click checkbox next to "my-ebs-volume"

4. "Actions" dropdown → "Delete Volume"

5. Confirmation dialog appears:
   ┌──────────────────────────────────────────────────┐
   │ Type "delete" to confirm                         │
   └──────────────────────────────────────────────────┘

6. Click "Delete" ✅

7. Volume disappears from list
   💸 EBS storage charges stop immediately ✅

   ⚠️ If you also created a restored volume in Step 11
      repeat this step for that volume too!
```

- Image
    
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2032.png)
    

---

## ❑  Step 14: Delete Snapshot

> ⚠️ If snapshot is linked to an AMI — deregister AMI first!
> 

### Normal Snapshot Delete

```
1. EC2 → Elastic Block Store → Snapshots

2. Filter → "Owned by me"

3. Click checkbox next to your snapshot

4. "Actions" dropdown → "Delete Snapshot"

5. Confirm → Click "Delete" ✅

6. Snapshot disappears from list
   💸 S3 snapshot storage charges stop ✅
```

- Image
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2033.png)
    

---

### If Linked to an AMI (deregister first)

```
1. EC2 → Images → AMIs
2. Find the AMI → checkbox → "Actions" → "Deregister AMI"
3. Confirm ✅
4. Now go back → Snapshots → Delete Snapshot ✅
```

---

## ❑  Step 15: Terminate EC2 Instance

> ⚠️ Termination is PERMANENT — the instance cannot be recovered!
✅ Root volume (/dev/xvda) auto-deletes because we left "Delete on Termination = YES"
> 

```
1. EC2 → Instances → Instances

2. Click checkbox next to "my-ec2-instance"

3. "Instance State" dropdown (top right)
   → "Terminate Instance"

4. Confirmation dialog appears → Confirm ✅

5. Instance state changes:
   "running" → "shutting-down" → "terminated" ✅

6. Terminated instances stay visible for ~1 hour
   then disappear from the list automatically

   💸 EC2 compute charges stop immediately ✅
   💸 Root EBS volume auto-deleted ✅
```

- Image
    
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2034.png)
    

---

## ❑  Step 16: Delete Key Pair

> ⚠️ Deleting from AWS Console does NOT delete your local .pem file
Delete both for full cleanup
> 

---

### Delete from AWS Console

```
1. EC2 → Network & Security → Key Pairs

2. Click checkbox next to "my-ebs-keypair"

3. "Actions" dropdown → "Delete"

4. Type the key pair name to confirm:
   ┌──────────────────────────────────────────────────┐
   │ Type "my-ebs-keypair" to confirm                 │
   └──────────────────────────────────────────────────┘

5. Click "Delete" ✅
```

- Image
    
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2035.png)
    

---

### Delete local .pem file from your Mac

```bash
# In your Mac Terminal
rm ~/.ssh/my-ebs-keypair.pem

# Verify it's gone
ls ~/.ssh/
# my-ebs-keypair.pem should not appear ✅
```

- Image
    
    ![Group 20.jpg](Getting%20started%20with%20Elastic%20Block%20Storage/Group_20.jpg)
    

---

## ❑  Step 17: Delete S3 Bucket (if created in Step 10)

> ⚠️ S3 bucket must be EMPTY before it can be deleted
> 

### ⌘ Step 17a — Empty the Bucket first

```
1. AWS Console → S3

2. Click on "my-ebs-snapshots-bucket-2026"

3. Click "Empty" button (top right)

4. Confirmation dialog:
   ┌──────────────────────────────────────────────────┐
   │ Type "permanently delete" to confirm             │
   └──────────────────────────────────────────────────┘

5. Click "Empty" ✅
   All objects inside are deleted
```

- Image
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2036.png)
    

---

### ⌘ Step 17b — Delete the Bucket

```
1. Go back to S3 bucket list

2. Click checkbox next to "my-ebs-snapshots-bucket-2026"

3. Click "Delete" button (top right)

4. Confirmation dialog:
   ┌──────────────────────────────────────────────────┐
   │ Type the bucket name to confirm:                 │
   │ "my-ebs-snapshots-bucket-2026"                   │
   └──────────────────────────────────────────────────┘

5. Click "Delete Bucket" ✅

   💸 S3 storage charges stop immediately ✅
```

---

## ❑  Step 18: Final Verification Checklist

> Go through each service and confirm everything is cleaned up
> 

### EC2 Check

```
EC2 → Instances
☐ No running instances
   (terminated ones are fine — they disappear after ~1hr)

EC2 → Elastic Block Store → Volumes
☐ No volumes in "available" or "in-use" state

EC2 → Elastic Block Store → Snapshots → "Owned by me"
☐ No snapshots listed

EC2 → Network & Security → Key Pairs
☐ "my-ebs-keypair" deleted
```

- Images
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2037.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2038.png)
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2039.png)
    

### S3 Check

```
S3 → Buckets
☐ "my-ebs-snapshots-bucket-2026" deleted
```

### Billing Check (Most Important! 💸)

```
1. AWS Console → top right → your account name
   → "Billing and Cost Management"

2. Click "Bills" on left sidebar

3. Expand current month → check for:
   ☐ EC2 Running Hours  → $0.00
   ☐ EBS Storage        → $0.00
   ☐ S3 Storage         → $0.00
   ☐ Data Transfer      → $0.00

4. Alternatively check "Free Tier" usage:
   Billing → "Free Tier"
   → Make sure you haven't exceeded limits
```

- Image :
    
    
    ![image.png](Getting%20started%20with%20Elastic%20Block%20Storage/image%2040.png)
    

----

<aside>
<img src="https://app.notion.com/icons/confetti-party-popper_blue.svg" alt="https://app.notion.com/icons/confetti-party-popper_blue.svg" width="40px" /> And that’s a wrap!!!!!!!!!!

</aside>