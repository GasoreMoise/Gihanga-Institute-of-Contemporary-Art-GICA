# Make GICA Website Appear on Google Search

## Goal
Make your website `gica.art` discoverable through Google Search when people search for "GICA", "Gihanga Institute of Contemporary Art", etc.

---

## ✅ Your Current SEO Setup (Already Good!)

You already have:
- ✅ Sitemap configured
- ✅ Robots.txt configured  
- ✅ Open Graph tags for social media
- ✅ Meta descriptions
- ✅ Structured data (JSON-LD)
- ✅ Proper title tags

**Now we just need to submit to Google!**

---

## ✅ Part 1: Submit Site to Google Search Console

### Step 1: Verify Domain Ownership

1. Go to **https://search.google.com/search-console**
2. Click **"Start now"** or **"Add property"**
3. Choose: **"URL prefix"** (not domain property)
4. Enter: **`https://gica.art`**
5. Click **"Continue"**

### Step 2: Verify Ownership

Google will give you several options. **Choose the easiest:**

**Recommended: HTML file upload**

1. Click **"HTML file upload"** method
2. Download the verification file (e.g., `google1234567890.html`)
3. Upload it to your project:
   - Place in `public/` folder
   - Name: `google1234567890.html` (exact filename)
4. Commit and push to GitHub:
   ```bash
   git add public/google1234567890.html
   git commit -m "Add Google Search Console verification"
   git push origin dev
   ```
5. Wait for Vercel to deploy (1-2 minutes)
6. Go back to Google Search Console
7. Click **"Verify"**

**Alternative: DNS verification**
- Add a TXT record to Cloudflare (same as we did for Resend)
- May be easier if HTML file upload doesn't work

### Step 3: Add Sitemap

Once verified:

1. In Google Search Console, go to **"Sitemaps"** (left sidebar)
2. Enter: **`https://gica.art/sitemap.xml`**
3. Click **"Submit"**
4. Google will start crawling your site!

---

## ✅ Part 2: Request Indexing

After submitting the sitemap:

1. In Google Search Console, go to **"URL Inspection"** (top search bar)
2. Enter: **`https://gica.art/en`**
3. Click **"Test live URL"**
4. Click **"Request Indexing"**
5. Google will index your homepage!
6. Repeat for **`https://gica.art/rw`** (Kinyarwanda version)

---

## ✅ Part 3: Wait and Monitor

### Timeline:
- **Immediate**: Site is crawled
- **1-3 days**: Some pages indexed
- **1-4 weeks**: Full indexing
- **2-6 weeks**: Appears in Google Search results

### Check Progress:

1. Go to Google Search Console → **"Pages"**
2. See how many pages are indexed
3. Go to **"Performance"** to see search queries

---

## ✅ Part 4: Optimize Content (Optional but Recommended)

### Add More Keywords to Your Content:

Your current description is good, but we can enhance it. Let me update it:

---

## ✅ Part 2: Optimize Your Code for SEO

Let me check your current SEO setup:
<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>
read_file
