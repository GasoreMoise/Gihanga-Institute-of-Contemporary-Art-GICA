# How to Send Emails to contact@gica.art

## The Issue

Right now, Resend only allows sending to your verified email (gasorenshuti34@gmail.com). To send to `contact@gica.art`, you need to verify your domain.

## Quick Setup (Takes 10-15 minutes)

### Step 1: Add Domain in Resend

1. Go to **https://resend.com/domains**
2. Click **"Add Domain"**
3. Enter: **`gica.art`**
4. Click **"Add Domain"**

### Step 2: Get DNS Records

Resend will show you DNS records to add. You'll see something like:

**TXT Record 1 (SPF):**
- Name: `@`
- Value: `v=spf1 include:_spf.resend.com ~all`

**TXT Record 2 (DKIM):**
- Name: `resend._domainkey`
- Value: `p=MIGfMA0GCSqGSIb3DQEBAQUAA...` (long string)

**CNAME Record (DMARC - optional):**
- Name: `_resend`
- Value: `resend.com`

### Step 3: Add DNS Records to Your Domain Provider

**Go to wherever you bought `gica.art`:**

Common providers:
- **Namecheap**: Dashboard → Domain List → Manage → Advanced DNS
- **GoDaddy**: My Products → DNS → Manage
- **Cloudflare**: DNS → Records → Add record
- **Hostinger**: Domains → Manage → DNS Zone Editor

**Add each record:**
1. Click "Add Record" or similar
2. Select the type (TXT or CNAME)
3. Paste the name and value exactly as shown in Resend
4. Save

**Do this for all 2-3 records.**

### Step 4: Verify in Resend

1. Go back to **https://resend.com/domains**
2. Find `gica.art` in the list
3. Click **"Verify"**
4. Wait 1-2 minutes
5. Status should change to **"Verified"** ✅

### Step 5: Update Email Route

Once verified, update `app/api/contact/route.ts`:

Change from:
```javascript
to: 'gasorenshuti34@gmail.com',
```

To:
```javascript
to: 'contact@gica.art',
```

**Lines to update:** 67 and 92

### Step 6: Update Email Address

After domain verification, you can also change the `from` address:

From:
```javascript
from: 'GICA Contact <onboarding@resend.dev>',
```

To:
```javascript
from: 'GICA Contact <contact@gica.art>',
```

**This makes emails look more professional!**

---

## Alternative: Use Gmail Redirect

If you don't want to verify the domain right now, you can:

1. Go to Gmail → Settings → "Forwarding and POP/IMAP"
2. Set up forwarding: `contact@gica.art` → forwards to `gasorenshuti34@gmail.com`
3. All emails sent to `contact@gica.art` will arrive in your Gmail

But the best solution is domain verification in Resend!

---

## Current Status

✅ **Working Now**: Emails sent to gasorenshuti34@gmail.com
⏳ **After Domain Verification**: Emails sent to contact@gica.art

