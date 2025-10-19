# GICA Admin Guide

## Editing content
- Open Sanity Studio and login.
- Exhibitions: title, dates, cover, body, locale.
- Programme: date/time, poster, description, locale.

## Preview
- `/api/preview?secret=YOUR_SECRET&redirect=/en`
- Exit preview via `/api/disable-draft` (or clear cookies).

## Publishing
- Click Publish in Sanity. Site updates shortly via CDN.

## Pushing code updates
- Not required for content changes. For code, contact developer; PR → preview → deploy.
