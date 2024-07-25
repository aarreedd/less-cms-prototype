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

## How it works

The build script:

1) Copies all the markdown files and assets to the distribution directory
2) Parses all [FrontMatter](https://www.npmjs.com/package/front-matter) info in the markdown files and coverts to json and stores it in the distribution directory
3) Creates a [manifest.json](https://less-cms-prototype.pages.dev/manifest.json) file which allows you to list and filter posts easily

That's it. Now deploy it to a [static file hosting service](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/) and you have a simple JSON API to retrieve all of your content from.

## Example Pages

- [manifest.json](https://less-cms-prototype.pages.dev/manifest.json)
- authors
    - [alan.json](https://less-cms-prototype.pages.dev/authors/alan.json)
    - [alan.md](https://less-cms-prototype.pages.dev/authors/alan.json)
- posts
    - [post-one.json](https://less-cms-prototype.pages.dev/posts/post-one.json)
    - [post-one.md](https://less-cms-prototype.pages.dev/posts/post-one.md)
    - [post-two.json](https://less-cms-prototype.pages.dev/posts/post-two.json)
    - [post-two.md](https://less-cms-prototype.pages.dev/posts/post-two.md)
- assets
    - img
        - [logo.png](https://less-cms-prototype.pages.dev/assets/img/logo.png)
