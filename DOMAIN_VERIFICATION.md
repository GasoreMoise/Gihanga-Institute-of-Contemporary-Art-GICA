# Step-by-Step: Verify gica.art Domain in Resend

## IMPORTANT: Complete these steps in order!

---

## STEP 1: Add Domain in Resend Dashboard

1. **Open**: https://resend.com/domains
2. Click **"Add Domain"** button (top right)
3. Enter domain: **`gica.art`** (without www or http://)
4. Click **"Add Domain"**

---

## STEP 2: Copy the DNS Records

After adding, you'll see a page with **3 DNS records** to add. **Copy all of them!**

**Record 1 - TXT (SPF):**
- Type: `TXT`
- Name: `@`
- Value: `v=spf1 include:_spf.resend.com ~all`

**Record 2 - TXT (DKIM):**
- Type: `TXT`
- Name: `resend._domainkey`
- Value: Long string starting with `p=...` (copy the entire value exactly)

**Record 3 - CNAME (DMARC - optional but recommended):**
- Type: `CNAME`
- Name: `_resend`
- Value: `resend.com`

---

## STEP 3: Find Your Domain Provider

Where did you buy `gica.art`? Here are common providers:

### Namecheap
1. Login to https://www.namecheap.com
2. Click **"Domain List"** on left
3. Find `gica.art` → Click **"Manage"**
4. Go to **"Advanced DNS"** tab

### GoDaddy
1. Login to https://www.godaddy.com
2. Go to **"My Products"**
3. Find `gica.art` → Click **"DNS"** or **"Manage"**

### Cloudflare
1. Login to https://dash.cloudflare.com
2. Select your domain `gica.art`
3. Click **"DNS"** in the left sidebar

### Hostinger
1. Login to https://www.hostinger.com
2. Go to **"Domains"**
3. Find `gica.art` → Click **"Manage"** → **"DNS Zone Editor"**

### Other providers
Look for: **DNS Management**, **DNS Settings**, **Zone Editor**, or **Nameservers**

---

## STEP 4: Add DNS Records

**For each record:**

1. Click **"Add Record"** or **"Create Record"**
2. Select the **Type** (TXT or CNAME)
3. Enter the **Name** exactly as shown in Resend
4. Enter the **Value** exactly as shown in Resend
5. Click **"Save"** or **"Add"**

**Important**: 
- Copy the values **exactly** as shown in Resend
- No extra spaces
- No quotes
- Case-sensitive

---

## STEP 5: Wait for DNS Propagation (2-10 minutes)

After adding records, DNS needs to propagate.

1. Go back to **https://resend.com/domains**
2. Find `gica.art` in your list
3. Click **"Verify"** or **"Refresh"**
4. Check status

**If verification fails:**
- Wait 5-10 more minutes
- Make sure you copied the exact values
- Check for typos in DNS records
- Try clicking "Verify" again

**When verified**, you'll see: ✅ **"Verified"** or **"Active"**

---

## STEP 6: Update Code to Use contact@gica.art

Once domain shows as **Verified** in Resend:

Update `app/api/contact/route.ts`:

**Line 67** - Change:
```javascript
to: 'gasorenshuti34@gmail.com', // Change to contact@gica.art after domain verification
```
To:
```javascript
to: 'contact@gica.art',
```

**Line 92** - Change:
```javascript
to: 'gasorenshuti34@gmail.com', // Change to contact@gica.art after domain verification
```
To:
```javascript
to: 'contact@gica.art',
```

**Restart your dev server after making changes!**

---

## STEP 7: Test!

1. Submit the contact form
2. Send a newsletter subscription
3. Check `contact@gica.art` inbox
4. You should receive emails! 🎉

---

## Troubleshooting

### "Domain not verified" error
- Make sure DNS records are added correctly
- Wait up to 24 hours for DNS propagation
- Check Resend dashboard for status

### "Cannot send to email"
- Make sure you're using `contact@gica.art` (not @gica.art.com)
- Check domain is verified in Resend dashboard
- Domain should show green "Verified" status

### DNS records not working
- Verify you copied exact values from Resend
- Remove any quotes around values
- Some providers need you to wait 5-10 minutes before records are active

---

## Need Help?

- **Resend Docs**: https://resend.com/docs
- **Resend Support**: https://resend.com/help

Good luck! 🚀

