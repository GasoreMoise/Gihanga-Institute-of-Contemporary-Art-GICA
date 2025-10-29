# Add These 4 Records to Cloudflare DNS

## ✅ Records to Add in Cloudflare

### Record 1: MX Record
- **Type**: `MX`
- **Name**: `send`
- **Mail server**: `feedback-smtp.eu-west-1.amazonses.com`
- **Priority**: `10`
- **Proxy**: Grey cloud (DNS only)

---

### Record 2: TXT Record (SPF)
- **Type**: `TXT`
- **Name**: `send`
- **Content**: `v=spf1 include:amazonses.com ~all`
- **Proxy**: Grey cloud (DNS only)

---

### Record 3: TXT Record (DMARC)
- **Type**: `TXT`
- **Name**: `_dmarc`
- **Content**: `v=DMARC1; p=none;`
- **Proxy**: Grey cloud (DNS only)

---

### Record 4: TXT Record (DKIM) - The long one!
- **Type**: `TXT`
- **Name**: `resend._domainkey`
- **Content**: `p=MIGfMA0GCSqGSIb3DQEBAQUA...` (the full long string from Resend)
- **Proxy**: Grey cloud (DNS only)

---

## Steps in Cloudflare:

1. Go to Cloudflare → DNS section
2. Click **"Add record"** for each record above
3. Fill in the fields EXACTLY as shown
4. Make sure proxy is **grey cloud** (not orange)
5. Click **"Save"** for each record

**Important**: Copy the FULL content for the `resend._domainkey` record - it's a very long string!

---

After adding all 4 records, go back to Resend and click "Verify"!

