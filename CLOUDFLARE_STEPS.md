# Step-by-Step: Set Up Email for GICA on Cloudflare

## ✅ Step 1: Add Domain to Resend

1. Go to: **https://resend.com/domains**
2. Click **"Add Domain"**
3. Enter: **`gica.art`**
4. Click **"Add Domain"**
5. Resend will show you **3 DNS records** to add (copy them!)

You'll see something like:

**Record 1 - TXT (SPF):**
```
Name: @
Value: v=spf1 include:_spf.resend.com ~all
```

**Record 2 - TXT (DKIM):**
```
Name: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQ... (very long string)
```

**Record 3 - CNAME (DMARC):**
```
Name: _resend
Value: resend.com
```

---

## ✅ Step 2: Add Records in Cloudflare

1. **Login to Cloudflare** (you should already be logged in)
2. **Select domain**: Click on **"gica.art"** 
3. Go to **"DNS"** in the left sidebar
4. Click **"Add record"**

### For each record:

**Record 1 (SPF):**
- Type: **TXT**
- Name: **@**
- Content: **v=spf1 include:_spf.resend.com ~all**
- Proxy status: **DNS only** (grey cloud, not orange)
- Click **"Save"**

**Record 2 (DKIM):**
- Click **"Add record"** again
- Type: **TXT**
- Name: **resend._domainkey**
- Content: **`p=MIG...`** (paste the long string from Resend)
- Proxy status: **DNS only** (grey cloud, not orange)
- Click **"Save"**

**Record 3 (DMARC - optional but recommended):**
- Click **"Add record"** again
- Type: **CNAME**
- Name: **_resend**
- Target: **resend.com**
- Proxy status: **DNS only** (grey cloud, not orange)
- Click **"Save"**

---

## ✅ Step 3: Verify in Resend

1. Go back to: **https://resend.com/domains**
2. Find **gica.art** in your list
3. Click **"Verify"** or **"Check"** button
4. Wait 1-2 minutes
5. Status should change to **"Verified"** ✅

**If it fails:**
- Wait 5-10 minutes (DNS propagation can take time)
- Double-check you copied the values exactly
- Make sure records are set to "DNS only" (grey cloud)

---

## ✅ Step 4: Update Code to Send to contact@gica.art

Once verified, I'll update the code for you.

But for now, let's add those DNS records!

**Tell me when you've completed Step 1 and I'll guide you through the rest.**

