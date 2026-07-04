---
title: "Finding S3 server for local dev"
description: "Comparing Garage and SeeweedFS focusing on local development"
pubDate: "Apr 04 2026"
heroImage: "../../assets/blog/Garage-VS-Seaweed-cover.png"
draft: false
---

Note: This is not a thorough comparison of Garage and SeaweedFS. It's more of a note on what I found while trying out both.

Since MinIO effectively abandoned its open-source edition, I wanted a tool that I can develop against locally but also potentially take to production if I self-host.

## Garage

I initially started with Garage, but I need anonymous access and Garage doesn't support that.

Garage does have a web endpoint, but that doesn't suit me because the URL format is different. I want the exact same API as S3 since I plan to use AWS S3 or Cloudflare R2 in production.

This issue has been mentioned [since 2022](https://git.deuxfleurs.fr/Deuxfleurs/garage/issues/263) and there's a [PR addressing it](https://git.deuxfleurs.fr/Deuxfleurs/garage/pulls/1306), but there's no timeline for when it will be implemented. So I needed to find an alternative.

## SeaweedFS

One I stumbled upon is SeaweedFS. The project has been around since the early 2010s and is actively maintained (from looking at its GitHub). It has an enterprise offering, which might mean they could pull the same move MinIO did, that's a potential con. On the other hand, it probably means the project will get frequent bug fixes (I hope).

## Ease of Setup

**Goal:** Be able to git clone and just run the code. I want access keys predefined so I don't have to change my .env file every time I delete the Docker Compose stack.

**Garage:**
Quite complicated. Most of the configuration is done via API or shell commands, with no easy way to pass in environment variables and let it set itself up. The approach I used is a shell script that executes commands inside the Docker container to set up the bucket and create the access key by importing a pregenerated key.

**SeaweedFS:**
From the SeaweedFS [README](https://github.com/seaweedfs/seaweedfs?tab=readme-ov-file#quick-start-for-s3-api-on-docker), the Docker quickstart points to running `server -s3`, which doesn't seem to auto-configure keys (and I'm still not sure how to use it). For a quick local dev setup, I think `weed mini` is what you'll want to use.

With `weed mini`, I can directly specify `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` using environment variables.

It still doesn't have an option to auto-create buckets from an environment variable, so I still need a script that runs the AWS CLI to create the bucket.

For connecting to it, refer to this [documentation](https://github.com/seaweedfs/seaweedfs/wiki/AWS-CLI-with-SeaweedFS).

## Resource Consumption

### Image Size

As shown on Docker Desktop:

dxflrs/garage v2.2.0 - 64.41 MB  
chrislusf/seaweedfs latest (v4.17) - 312.08 MB

### Memory Usage

Not a scientific measurement — I just launched each container with 2 buckets and a few files, then ran `docker stats`.

Garage - 23 MiB  
SeaweedFS - 137 MiB
