## Comprehensive Explanation on CIDR block. 
(Classless Inter-Domain Routing)


### First : what is an IP address?

An IPv4 address like 10.0.1.25 is actually 32 bits (binary), just written in a human-friendly way.

```

10      .  0       .  1       .  25
↓          ↓          ↓          ↓
00001010 . 00000000 . 00000001 . 00011001

```

>  Each section is called an octet (8 bits). Since 8 bits can represent 
2^8 =256
each octet ranges from 0 to 255.

---

### What Does /24 Mean?
The /24 tells you how many bits are locked (network portion).

/24 means: 24 bits fixed | 8 bits free for hosts

```
10  .  0  .  1  . [0-255]
└─────────────┘   └──────┘
   FIXED (24)     FREE (8)

```
---

#### Why 255 is the Max?
>Each octet = 8 bits
8 bits can hold:
00000000 = 0   (minimum)
11111111 = 255 (maximum)

Calculation: 2^8 = 256 values (0 to 255)
That's why you'll never see _10.0.1.256_ — it's invalid!

---

|CIDR|Fixed Bits|Free Bits | Total IPs| Usable Hosts|
|---|--|--|---|---|
/16	| 16	|32 - 16 = 16	|	65,536 | 65,531
/24	| 24	|32 - 24 = 8	|256| 251
/26	| 26	|32 - 26 = 6	|64| 59
/28	| 28	|32 - 28 = 4	|16| 11
/32	| 32	|32 - 32 = 0	| (single IP)| none

***AWS reserves 5 IPs per subnet (first 4 + last 1)**

---

### Does It Have to Be 10.x.x.x?

No! But you should use private IP ranges (RFC 1918):
| Range | CIDR | Typically used for |
|---|---|---|
| 10.0.0.0 - 10.255.255.255 | 10.0.0.0/8 | 	Large networks (most common in AWS)|
| 172.16.0.0 - 172.31.255.255  | 172.16.0.0/12  | Medium networks
 192.168.0.0 - 192.168.255.255  | 192.168.0.0/16 |Small networks/home routers

---

### AWS Reserved IPs (5 per subnet)
For a subnet 10.0.1.0/24 (range: 10.0.1.0 - 10.0.1.255):

|Reserved |IP	Purpose|
|---|---|
|10.0.1.0	|Network address|
|10.0.1.1	|VPC Router|
|10.0.1.2	|DNS Server|
|10.0.1.3	|Future use (reserved by AWS)|
|10.0.1.255	|Broadcast address|

---

### Visual: How /24 vs /16 Differs

```
10.0.X.X
10.0.0.0/16 → Fixed: 10.0 | Free: X.X
└─┬┘ └─┬─┘
  │    └── FREE [16 bits = can be 10.0.(0-255).(0-255)]
  │───────  10.0.0.0 - 10.0.255.255 (65,536 IPs)
  └─────── FIXED (this defines the network)
  └─────── Change this (last fixed) for different /16 network

=======================================

10.0.0.X 
10.0.0.0/24 → Fixed: 10.0.0 | Free: .X
└──┬──┘  └┬┘ 
   |      │─────── FREE [8 bits = can be 10.0.0.(0-255)]
   |      │─────── Range: 10.0.0.0 - 10.0.0.255 (256 IPs)
   |      └─────── Usable: 251 IPs (AWS reserves 5)
   └────────────── /24 = First 3 octets LOCKED  
   └────────────── Change 3rd octet for different /24 network
                   e.g., 10.0.1.0/24, 10.0.2.0/24
```

---



---

|CIDR	|Fixed Octets	|Free Octets	|What Must Change for Different Network?|
|---|---|---|--|
|/8|	1st|	2nd, 3rd, 4th	|1st octet (e.g., 10.x.x.x vs 11.x.x.x)
|/16|	1st, 2nd |3rd, 4th	|2nd octet (e.g., 10.0.x.x vs 10.1.x.x)
|/24|	1st, 2nd, 3rd |4th	|3rd octet (e.g., 10.0.0.x vs 10.0.1.x)

---

## Complete CIDR Reference Table

| CIDR | Fixed Bits | Free Bits | Fixed Octets | Free Octets | Total IPs | Usable IPs (AWS) | Range Example | Change This for Different Network |
|------|-----------|-----------|--------------|-------------|-----------|------------------|---------------|-----------------------------------|
| `/8` | 8 | 24 | 1st | 2nd, 3rd, 4th | $2^{24}$ = 16,777,216 | 16,777,211 | `10.0.0.0 - 10.255.255.255` | 1st octet (`10.x.x.x` → `11.x.x.x`) |
| `/16` | 16 | 16 | 1st, 2nd | 3rd, 4th | $2^{16}$ = 65,536 | 65,531 | `10.0.0.0 - 10.0.255.255` | 2nd octet (`10.0.x.x` → `10.1.x.x`) |
| `/24` | 24 | 8 | 1st, 2nd, 3rd | 4th | $2^{8}$ = 256 | 251 | `10.0.0.0 - 10.0.0.255` | 3rd octet (`10.0.0.x` → `10.0.1.x`) |
| `/25` | 25 | 7 | 1st, 2nd, 3rd | partial 4th | $2^{7}$ = 128 | 123 | `10.0.0.0 - 10.0.0.127` | Jump by 128 (`10.0.0.0` → `10.0.0.128`) |
| `/26` | 26 | 6 | 1st, 2nd, 3rd | partial 4th | $2^{6}$ = 64 | 59 | `10.0.0.0 - 10.0.0.63` | Jump by 64 (`10.0.0.0` → `10.0.0.64`) |
| `/27` | 27 | 5 | 1st, 2nd, 3rd | partial 4th | $2^{5}$ = 32 | 27 | `10.0.0.0 - 10.0.0.31` | Jump by 32 (`10.0.0.0` → `10.0.0.32`) |
| `/28` | 28 | 4 | 1st, 2nd, 3rd | partial 4th | $2^{4}$ = 16 | 11 | `10.0.0.0 - 10.0.0.15` | Jump by 16 (`10.0.0.0` → `10.0.0.16`) |
| `/32` | 32 | 0 | All | None | $2^{0}$ = 1 | 1 | `10.0.0.1` (single IP) | Any octet (it's just one IP) |

---

## Visual Breakdown

```
IP Address:    10  .  0   .  0   .  0
Octet:         1st   2nd   3rd   4th
Bits:         [8]   [8]   [8]   [8]  = 32 bits total

/8  ──────────►│    FREE (24 bits)    │
               └──────────────────────┘

/16 ──────────────────►│ FREE (16 bits)│
                       └───────────────┘

/24 ───────────────────────────►│FREE 8│
                                └──────┘

/28 ────────────────────────────►│FREE 4│
                                   └───┘
```

---

| What You Need | Formula |
|---------------|---------|
| Free bits | $32 - \text{prefix}$ |
| Total IPs | $2^{(32 - \text{prefix})}$ |
| Usable IPs (AWS) | $2^{(32 - \text{prefix})} - 5$ |
| Jump size for next network | $2^{(32 - \text{prefix})}$ |

---

### For the Case of VPC and subnet
```
VPC:     10.0.0.0/16
         ├── 10.0.[0-255].[0-255]
         ├── 65,536 total IPs
         │
         ├── Subnet A: 10.0.1.0/24 → 10.0.1.[0-255]   (256 IPs, 251 usable)
         ├── Subnet B: 10.0.2.0/24 → 10.0.2.[0-255]   (256 IPs, 251 usable)
         └── Subnet C: 10.0.3.0/24 → 10.0.3.[0-255]   (256 IPs, 251 usable)

```
---

#### Key Principle
Subnet prefix must be ≥ VPC prefix (the number after / must be equal or larger). So if VPC is /16, subnets can be /16, /17, /18... up to /28 (in AWS), but never smaller numbers like /15 or /8.

This allows you to efficiently divide your VPC into multiple non-overlapping subnets for different purposes (public, private, different availability zones, etc.).

---

## Example: Splitting a VPC (`/16`) into Subnets

```
VPC: 10.0.0.0/16 (65,536 IPs)
│
├── Public Subnets (/24 = 256 IPs each)
│   ├── 10.0.1.0/24  → 10.0.1.0   - 10.0.1.255
│   ├── 10.0.2.0/24  → 10.0.2.0   - 10.0.2.255
│   └── 10.0.3.0/24  → 10.0.3.0   - 10.0.3.255
│
├── Private Subnets (/24 = 256 IPs each)
│   ├── 10.0.10.0/24 → 10.0.10.0  - 10.0.10.255
│   ├── 10.0.11.0/24 → 10.0.11.0  - 10.0.11.255
│   └── 10.0.12.0/24 → 10.0.12.0  - 10.0.12.255
│
└── Small Subnets (/28 = 16 IPs each)
    ├── 10.0.20.0/28  → 10.0.20.0  - 10.0.20.15
    ├── 10.0.20.16/28 → 10.0.20.16 - 10.0.20.31
    └── 10.0.20.32/28 → 10.0.20.32 - 10.0.20.47
```

---

## Useful Site:

- [IPaddressGuide](https://www.ipaddressguide.com/cidr)
- [cidr.xyz](https://cidr.xyz)