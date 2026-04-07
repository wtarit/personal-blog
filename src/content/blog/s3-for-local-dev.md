---
title: "Finding S3 server for local dev"
description: "Comparing Garage and SeeweedFS focusing on local development"
pubDate: "Apr 04 2026"
heroImage: "../../assets/blog/Garage-VS-Seaweed-cover.png"
draft: false
---

Note: This is not a through comparison of Garage and SeeweedFS, its more like a note on what I found trying out both.

Since minIO go fully closed source.

I want some tool that I can dev on but also potentially go to prod with if I selfhost.

Initially I started with Garage

I need annonymous access but garage doesn't provide that.

Garage have web but that doesn't suite me because the URL format is different and I want exact same API as S3 since I plan to use AWS S3 or Cloudflare R2 in production.

This issue have been mentioned [since 2022](https://git.deuxfleurs.fr/Deuxfleurs/garage/issues/263) and there's a [PR addressing this issue](https://git.deuxfleurs.fr/Deuxfleurs/garage/pulls/1306) but no timeline when it gonna be implemented. So I need to find alternative.

One I stumbled apon is SeaweedFS, the project started since 2014 and is actively maintained (from looking at its GitHub) it have an enterprise offering which might mean that they can pull the same move similar to what minIO did so that might be a con but it probably mean it will get frequent bug fix (I hope).

Ease of setup
Goal: Be able to git clone and just run the code. I want to have access key predefined so I don't have to change my .env file if I need to delete the docker compose stack.
Garage:
Quite complicated, most of the config is done via API or shell command, no easy way to pass in environment variable and let it set itself up. The approach I use is to have a shell script which execute command inside the docker container that I manually run to setup bucket and crete the access key by importing the pregenerated key.

From SeaweedFS [README](https://github.com/seaweedfs/seaweedfs?tab=readme-ov-file#quick-start-for-s3-api-on-docker) the docker quickstart point to running the command `server -s3` which doesn't seems to auto configure key (and I'm still not sure how to use it). I think for quick local dev setup `weed mini` is what you'll want to use.

By using weed mini, I can directly pre specify AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY using env var

It still doesn't have option to auto create bucket from env var so I still need a script for running aws cli for creating the bucket

For connecting to it refer to this [documentation](https://github.com/seaweedfs/seaweedfs/wiki/AWS-CLI-with-SeaweedFS)

# Resource Comsumption

## Image Size

What shown on Docker Desktop

dxflrs/garage v2.2.0 - 64.41 MB  
chrislusf/seaweedfs latest (v4.17) - 312.08 MB

## Memory Usage

Not a scientific mesure, I just launched container with 2 bucket and a few files in it and run `docker stats`

Garage - 23 MiB  
SeaweedFS - 137 MiB
