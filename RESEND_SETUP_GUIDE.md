# Complete Step-by-Step Guide: Setting Up Email Functionality for GICA

## Prerequisites
- Node.js installed on your computer
- A text editor (VS Code recommended)
- Access to your domain's DNS settings (for production)

---

## STEP 1: Sign Up for Resend

### 1.1 Visit Resend Website
- Go to **https://resend.com**
- Click the **"Sign Up"** or **"Get Started"** button in the top right corner

### 1.2 Create Your Account
- Choose to sign up with **GitHub**, **Google**, or email
- If using email:
  - Enter your email address
  - Create a password (or use "Continue with Google")
  - Click **"Create Account"**

### 1.3 Verify Your Email
- Check your inbox for a verification email from Resend
- Click the verification link in the email
- This activates your account

### 1.4 Free Tier Benefits
You get:
- ✅ **100 emails per day** (free tier)
- ✅ **3,000 emails per month**
- ✅ Email sending API
- ✅ Domain verification
- ✅ Email logs and analytics

---

## STEP 2: Get Your API Key

### 2.1 Navigate to API Keys
- Once logged into Resend dashboard
- Look at the left sidebar
- Click on **"API Keys"** (or go to: https://resend.com/api-keys)

### 2.2 Create a New API Key
1. Click the **"Create API Key"** button (usually blue, top right)
2. Give it a name: **"GICA Website"**
3. Click **"Add"**
4. **IMPORTANT**: Copy the API key immediately (it starts with `re_`)
5. Paste it somewhere safe - you won't see it again!

> ⚠️ **Copy your API key now!** Example format: `re_1234567890abcDEFghij`

---

## STEP 3: Configure Your Local Environment

### 3.1 Create .env.local File

**In your project folder** (`D:\Kodak\Projects\Premium\GICA\Project\GICA`):

1. Check if `.env.local` already exists
2. If not, create a new file named `.env.local` (no extension needed)
3. If it exists, open it in your code editor

### 3.2 Add Your API Key

**IMPORTANT: If you don't have a .env.local file, create one now!**

1. In your project root (`D:\Kodak\Projects\Premium\GICA\Project\GICA`), create a file named `.env.local`
2. Add this line to your `.env.local` file:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
```

**Important**: Replace `re_your_actual_api_key_here` with the actual API key you copied from Resend.

**Example:**
```bash
RESEND_API_KEY=re_AbCdEf123456GhIjKl789012MnO
```

### 3.3 Verify the File

Your `.env.local` should now look like:
```bash
RESEND_API_KEY=re_your_actual_key_paste_here
```

**You can use this template:**
```bash
# Resend API Key for Email Service
RESEND_API_KEY=re_your_key_here
```

### 3.4 CRITICAL: Restart Your Dev Server

After adding or changing the API key, **you MUST restart your dev server**:

1. Stop the current server (Press `Ctrl+C` in terminal)
2. Run: `npm run dev`
3. Now test the form again

**⚠️ The API key is only loaded when the server starts, so restart is required!**

---

## STEP 4: Install Resend Package (Already Done)

✅ Resend is already installed in your project.

If you need to reinstall for any reason:
```bash
npm install resend
```

---

## STEP 5: Test Locally (Development)

### 5.1 Start Your Development Server

Open terminal in your project folder and run:
```bash
npm run dev
```

Wait for the message: **"Ready on http://localhost:3000"**

### 5.2 Test the Contact Form

1. Open your browser and go to: **http://localhost:3000/en** (or your locale)
2. Scroll down to the **Contact** section
3. Fill out the form:
   - Name: Test User
   - Email: your.email@example.com
   - Message: Test message
4. Click **"Send"**

### 5.3 Check for Success

You should see:
- ✅ **"Message sent successfully!"** (green text)
- The form clears automatically

### 5.4 Test Newsletter Subscription

1. Scroll to the **"Subscribe to our newsletter"** section
2. Enter an email address
3. Click **"Subscribe"**
4. You should see: **"Successfully subscribed!"** (green text)

### 5.5 Check Your Email

📧 **Check your inbox at `contact@gica.art`** - you should receive:
- Contact form submissions
- Newsletter subscriptions

> **Note**: For now, Resend will send from `onboarding@resend.dev` because your domain isn't verified yet. This works for testing!

---

## STEP 6: Verify Your Domain (PRODUCTION)

### 6.1 Why Verify Domain?
- Send emails from **contact@gica.art** (not `onboarding@resend.dev`)
- Better email deliverability
- Professional appearance

### 6.2 Add Domain to Resend

1. In Resend dashboard, click **"Domains"** in the left sidebar
2. Click **"Add Domain"** button
3. Enter your domain: **`gica.art`**
4. Click **"Add Domain"**
5. You'll see DNS records to add - **copy these records**

### 6.3 Add DNS Records to Your Domain Provider

You'll get 3 types of records:

**Type 1: TXT Record (for SPF)**
- Name: `@` (or `gica.art`)
- Type: `TXT`
- Value: `v=spf1 include:_spf.resend.com ~all`

**Type 2: TXT Record (for DKIM)**
- Name: `resend._domainkey` (or similar)
- Type: `TXT`
- Value: `p=...` (long string starting with `p=`)

**Type 3: CNAME Record (for DMARC - optional but recommended)**
- Name: `_resend`
- Type: `CNAME`
- Value: `resend.com`

### 6.4 Where to Add DNS Records

Go to your domain provider (where you bought `gica.art`):

**Popular Providers:**
- **Namecheap**: Dashboard → Domain List → Manage → Advanced DNS
- **GoDaddy**: My Products → DNS
- **Cloudflare**: DNS → Records → Add record
- **Google Domains**: DNS → Custom records

### 6.5 Save DNS Records
1. Add each record one by one
2. Save changes
3. Wait 5-10 minutes for DNS propagation

### 6.6 Verify in Resend

1. Go back to Resend dashboard → Domains
2. Click **"Verify"** next to `gica.art`
3. Status should change to **"Verified"** ✅

---

## STEP 7: Update Production Email Settings

Once your domain is verified:

### 7.1 Update API Route

Edit `app/api/contact/route.ts`:

**Line 24** - Change from:
```javascript
from: 'GICA Contact <onboarding@resend.dev>',
```
to:
```javascript
from: 'GICA Contact <contact@gica.art>',
```

**Line 62** - Change from:
```javascript
from: 'GICA Newsletter <onboarding@resend.dev>',
```
to:
```javascript
from: 'GICA Newsletter <contact@gica.art>',
```

---

## STEP 8: Deploy to Production (Vercel)

### 8.1 Push Code to GitHub

```bash
git add .
git commit -m "Add email functionality with Resend"
git push origin dev
```

### 8.2 Add Environment Variable to Vercel

1. Go to **https://vercel.com** and sign in
2. Select your **GICA** project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add"**
5. Add:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your actual API key (`re_...`)
6. Click **"Save"**

### 8.3 Redeploy

1. Go to **Deployments** tab in Vercel
2. Click **"Redeploy"** on the latest deployment
3. Wait for deployment to complete

### 8.4 Test Live Site

1. Visit **https://www.gica.art/en**
2. Test the contact form
3. Test the newsletter subscription
4. Check your `contact@gica.art` inbox!

---

## STEP 9: Monitor & Manage Emails

### 9.1 View Email Logs

- In Resend dashboard → **"Emails"** tab
- See all sent emails
- Check delivery status
- View analytics

### 9.2 Monitor Usage

- Dashboard shows: **X/3,000 emails used this month**
- Free tier: 3,000 emails/month
- Upgrade if needed (paid plans start at $20/month)

### 9.3 Email Configuration

**Current setup sends:**
- ✅ **Contact form** → email to `contact@gica.art`
- ✅ **Newsletter subscription** → email to `contact@gica.art`

**You receive:**
- Contact submissions with name, email, message
- Newsletter subscriptions with email address
- Can reply directly to users via `reply-to` header

---

## Troubleshooting

### ❌ "Failed to send message" Error

**Solutions:**
1. Check your API key is correct in `.env.local`
2. Restart dev server: `npm run dev`
3. Check Resend dashboard for API key status
4. Verify you haven't exceeded the free tier limit

### ❌ Emails Not Arriving

**Check:**
1. Spam/junk folder in `contact@gica.art`
2. Resend dashboard → Emails tab (see delivery status)
3. Domain verification status in Resend

### ❌ "Missing required fields" Error

- Ensure email input has `required` attribute (it does)
- Check browser console for errors

### ❌ Domain Verification Fails

**Common issues:**
1. DNS records not propagated (wait up to 24 hours)
2. Wrong DNS record values (copy exactly from Resend)
3. Cached DNS (flush DNS cache)

---

## Quick Reference: Commands

```bash
# Start development server
npm run dev

# Install/update dependencies
npm install

# Check for errors
npm run lint

# Type checking
npm run typecheck
```

---

## Support & Resources

- **Resend Docs**: https://resend.com/docs
- **Resend Support**: https://resend.com/help
- **Next.js Docs**: https://nextjs.org/docs
- **GICA Project**: D:\Kodak\Projects\Premium\GICA\Project\GICA

---

## Summary Checklist

- [ ] Signed up for Resend account
- [ ] Copied API key
- [ ] Added API key to `.env.local`
- [ ] Tested locally with `npm run dev`
- [ ] Sent test contact form
- [ ] Sent test newsletter subscription
- [ ] Verified domain `gica.art` in Resend
- [ ] Updated `from` email in `app/api/contact/route.ts`
- [ ] Added environment variable in Vercel
- [ ] Deployed to production
- [ ] Tested live site
- [ ] Received emails at `contact@gica.art`

🎉 **You're done!** Your contact forms and newsletter are now fully functional!

