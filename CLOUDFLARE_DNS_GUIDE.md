# Cloudflare DNS Guide - Adding Resend Records

## Common Mistake ❌

**If Cloudflare asks for an IPv4 address, you selected the wrong record type!**

## Correct Steps:

### When Adding DNS Records in Cloudflare:

1. **Type should be**: `TXT` or `CNAME` (NOT "A" record!)
2. **A records** need IPv4 addresses
3. **TXT and CNAME records** need text content (not IP addresses)

---

## What You Should See in Cloudflare:

### For TXT Records (Record 1 and 2):

```
Type: TXT          ← Select this dropdown
Name: @            ← Enter the name from Resend
Content: v=sp...   ← Enter the value from Resend
Proxy status: DNS only (grey cloud)
```

**NO IPv4 field should appear!**

### For CNAME Record (Record 3):

```
Type: CNAME        ← Select this dropdown
Name: _resend      ← Enter the name from Resend
Target: resend.com ← Enter the value from Resend
Proxy status: DNS only (grey cloud)
```

**NO IPv4 field should appear!**

---

## If You Still See IPv4 Field:

You might be in the wrong place or have the wrong record type selected.

**Try this:**
1. Make sure you're in: Cloudflare Dashboard → DNS
2. When clicking "Add record", select **"TXT"** from the Type dropdown FIRST
3. Then the fields will change to show Name/Content instead of Name/IP

---

## Quick Checklist:

- [ ] Location: Cloudflare → DNS section for gica.art
- [ ] Record Type: TXT (not A)
- [ ] Fields: Name and Content (not IP)
- [ ] Proxy: Grey cloud (DNS only)
- [ ] Values: Copied exactly from Resend

**If it's asking for an IPv4 address, you're trying to add an A record. Change the Type to TXT instead!**

