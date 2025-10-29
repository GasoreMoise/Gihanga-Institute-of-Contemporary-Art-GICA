# Quick Guide: Adding Records to Cloudflare

## In Cloudflare Dashboard:

### For the MX Record:
1. Type → Select **"MX"**
2. Name → Type **`send`**
3. Mail server → Type **`feedback-smtp.eu-west-1.amazonses.com`**
4. Priority → Type **`10`**
5. Proxy → Make sure it's **grey cloud** (not orange)
6. Click **"Save"**

### For TXT Records (Records 2, 3, 4):
1. Type → Select **"TXT"**
2. Name → Type the name (e.g., `send`, `_dmarc`, `resend._domainkey`)
3. Content → Paste the content value from Resend
4. Proxy → Make sure it's **grey cloud**
5. Click **"Save"**

Repeat for each TXT record!

---

**After all 4 records are added, tell me and we'll verify!**

