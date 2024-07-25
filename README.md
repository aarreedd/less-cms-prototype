# \*Less CMS Prototype

This is a simple headless, serverless, static, git-based CMS.

After spending a day researching headless CMSs, I could not find exactly what I want. So I build this prototype. Feedback welcome!

## Workflow:

1) Edit marketdown files locally
2) Push to git
3) Trigger build and deploy to static file hosting service (Cloudflare pages, Github Page, S3, etc)
4) Get content through simple API

## Why?

1) Decouple content from your main code base
2) Store content centrally, dispaly anywhere (website, app, etc)
3) Practically free to operate
4) Fast and simple
5) No database, serverless, git-based

## Features

- SEO friendly
- Supports images
- Supports basic search/filtering (should handle thousands of posts without issue)
- Supports Categories
- Supports Authors
- Supports recent posts
- Supports Pagination