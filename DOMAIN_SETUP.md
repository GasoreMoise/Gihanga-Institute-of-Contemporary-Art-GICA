# Connect gica.art Domain to Vercel Deployment

## What We're Doing

Connecting your custom domain `gica.art` to your Vercel deployment so visitors can access the site at **https://gica.art** instead of the Vercel URL.

---

## Step 1: Add Domain in Vercel Dashboard

1. Go to **https://vercel.com**
2. Login and select your **GICA** project
3. Go to **Settings** → **Domains**
4. In the "Domains" section, enter: **`gica.art`**
5. Click **"Add"**

---

## Step 2: Get DNS Records from Vercel

After adding the domain, Vercel will show you DNS records to add.

**You'll see something like:**

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Write these down or keep the tab open!**

---

## Step 3: Add DNS Records to Cloudflare

**Go back to Cloudflare** (you're already there from earlier!):

### For the A Record:
1. Click **"Add record"**
2. **Type**: `A`
3. **Name**: `@` (or `gica.art`)
4. **IPv4 address**: Copy the IP from Vercel (e.g., `76.76.21.21`)
5. **Proxy**: **DNS only** (grey cloud)
6. Click **"Save"**

### For the CNAME Record (www):
1. Click **"Add record"** again
2. **Type**: `CNAME`
3. **Name**: `www`
4. **Target**: Copy the CNAME value from Vercel (e.g., `cname.vercel-dns.com`)
5. **Proxy**: **DNS only** (grey cloud)
6. Click **"Save"**

---

## Step 4: Wait for DNS Propagation

1. Go back to Vercel → Settings → Domains
2. It will show status: **"Validating"** or **"Pending"**
3. Wait 5-15 minutes
4. Status should change to: **"Valid"** or **"Connected"** ✅

**Note**: DNS can take up to 24 hours to fully propagate worldwide, but usually works in 5-15 minutes.

---

## Step 5: Configure SSL Certificate

**Automatic in Vercel!**

- Vercel will automatically provision an SSL certificate
- Wait 5-10 minutes after domain is validated
- Your site will be available at:
  - ✅ **https://gica.art**
  - ✅ **https://www.gica.art**

---

## Step 6: Test Your Domain

Once status shows "Valid":

1. Visit **https://gica.art**
2. You should see your GICA website!
3. Test the contact form
4. Test newsletter subscription
5. Everything should work exactly like the Vercel URL

---

## Important Notes

### Existing DNS Records:
- **Don't delete** existing records (MX, TXT records for email)
- **Add** the new Vercel records
- All records can coexist!

### Domain Already Has Email Setup:
- Your existing email records (MX, SPF, DMARC, etc.) will stay intact
- Only adding A and CNAME records for web hosting
- Email will continue to work perfectly

### Subdomains:
If you need subdomains:
- Add CNAME records for each subdomain
- Example: `blog` → CNAME → `cname.vercel-dns.com`

---

## Troubleshooting

### "Invalid Domain" in Vercel:
- Make sure you have the correct domain name (gica.art, not www.gica.art)
- Check for typos

### Domain Shows "Pending" for More Than 24 Hours:
- Verify DNS records are added correctly in Cloudflare
- Check A record points to correct IP
- Check CNAME record points to correct target
- Remove and re-add domain in Vercel

### Site Shows "This domain is not configured" Error:
- DNS hasn't propagated yet (wait 15-30 minutes)
- Check DNS records in Cloudflare match Vercel exactly
- Ensure proxy is set to "DNS only" (grey cloud)

### SSL Certificate Not Working:
- Wait 10-15 minutes after domain is validated
- Vercel provisions SSL automatically
- Clear browser cache
- Try incognito/private browsing

### Site Works on http:// But Not https://:
- SSL provisioning takes a few minutes
- Wait 5-10 minutes and try again
- Check Vercel dashboard for SSL status

---

## Quick Checklist

- [ ] Add domain in Vercel Dashboard
- [ ] Copy DNS records from Vercel
- [ ] Add A record in Cloudflare
- [ ] Add CNAME record in Cloudflare
- [ ] Wait 5-15 minutes for DNS propagation
- [ ] Check Vercel shows "Valid" status
- [ ] Test https://gica.art works
- [ ] Test contact form on live domain
- [ ] Test newsletter subscription on live domain

---

## After Setup

Your site will be available at:
- ✅ **https://gica.art** (main domain)
- ✅ **https://www.gica.art** (www subdomain)
- ✅ Contact form works
- ✅ Newsletter works
- ✅ Email sends to contact@gica.art

**All set! Domain connected to Vercel!** 🎉

