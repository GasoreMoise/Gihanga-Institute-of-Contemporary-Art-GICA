# Production Setup - Make Email Work on Live Site

## ✅ Step 1: Add Environment Variable to Vercel

**Critical:** The production site needs the Resend API key!

### In Vercel Dashboard:

1. Go to: **https://vercel.com**
2. Login and select your **GICA** project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add"**
5. Add this environment variable:
   - **Key**: `RESEND_API_KEY`
   - **Value**: `re_Q8M9S65g_PXfKSDBEGxXXUTMm9GnLF13W`
6. Select all environments: ✅ Production ✅ Preview ✅ Development
7. Click **"Save"**

---

## ✅ Step 2: Deploy to Production

Your code is already pushed to GitHub. Now:

### Option A: If you have auto-deploy set up:
- Vercel will automatically deploy when you merge to main/master
- Or just wait 1-2 minutes for it to deploy from your push

### Option B: Manual deploy:
1. Go to Vercel Dashboard
2. Go to **Deployments** tab
3. Find the latest deployment
4. Click **"Redeploy"** (if needed)

### Option C: Merge to main branch:
```bash
git checkout main
git merge dev
git push origin main
```

---

## ✅ Step 3: Verify Domain is Verified in Resend

**Important:** Make sure the domain verification is complete!

1. Go to: **https://resend.com/domains**
2. Check that **gica.art** shows:
   - ✅ Status: **"Verified"** or **"Active"**
   - ✅ All DNS records show green checkmarks

**If not verified yet:**
- Wait up to 24 hours for full DNS propagation
- Or check the DNS records in Cloudflare match Resend exactly

---

## ✅ Step 4: Test Production Site

Once deployed to production:

1. Go to: **https://www.gica.art/en**
2. Test the contact form
3. Test the newsletter subscription
4. Check `contact@gica.art` inbox for emails!

---

## ✅ Step 5: Monitor Emails

### In Resend Dashboard:
- Go to: **https://resend.com/emails**
- See all sent emails
- Check delivery status
- View any errors

### Check Live Site:
- Form submissions should work
- Newsletter subscriptions should work
- All emails go to contact@gica.art

---

## 🎉 Done!

Your email functionality is now live on production!

---

## Troubleshooting

### "Email service not configured" error in production:
- Check environment variable is set in Vercel
- Make sure you selected all environments (Production, Preview, Development)
- Redeploy after adding environment variable

### "Cannot send to contact@gica.art" error:
- Verify domain in Resend dashboard
- Check DNS records in Cloudflare
- Wait for DNS propagation (up to 24 hours)

### Emails not arriving:
- Check spam folder
- Verify contact@gica.art email account exists
- Check Resend dashboard → Emails tab for delivery status

---

**All set! Test your live site now!** 🚀

