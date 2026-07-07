# AGENTS.md

This file provides guidance to coding agents working in this repository.

## Overview

Personal blog and portfolio site built with Astro 5, deployed to Cloudflare Pages via the `@astrojs/cloudflare` adapter.

## Commands

- `pnpm dev` — Start dev server (localhost:4321)
- `pnpm build` — Production build to `./dist/`
- `pnpm preview` — Preview production build locally

## Architecture

- **Framework:** Astro 5 with MDX support, Tailwind CSS v4 (via Vite plugin), and TypeScript (strict mode)
- **Deployment:** Cloudflare Pages (`wrangler.jsonc` config, `@astrojs/cloudflare` adapter)
- **Content:** Blog posts live in `src/content/blog/` as `.md` or `.mdx` files. The collection schema is defined in `src/content.config.ts`
- **Homepage (`src/pages/index.astro`):** Portfolio page composed of section components in `src/components/portfolio/`. Its primary audiences are technical recruiters and engineers; homepage content and design decisions should prioritize their needs.
- **Blog listing (`src/pages/blog/index.astro`):** Filters out `draft: true` posts and sorts by `pubDate` descending
- **Blog post pages (`src/pages/blog/[...slug].astro`):** Dynamic routes using Astro content collections
- **Site constants** (title, description) are in `src/consts.ts`

## Blog Post Frontmatter Schema

```yaml
title: string        # required
description: string  # required
pubDate: string      # required, coerced to Date
updatedDate: string  # optional
heroImage: string    # optional, relative path to image asset
draft: boolean       # optional, hides post from blog listing
```

## Key Integrations

- `astro-embed` — Used for embedding YouTube videos in MDX posts
- `astro-mermaid` — Mermaid diagram support with auto dark/light theme
- `astro-icon` with `@iconify-json/simple-icons` — Icon support. Every icon used in a component must also be added to the appropriate `integrations.icon.include` allowlist in `astro.config.mjs`.
- `@astrojs/rss` — RSS feed at `src/pages/rss.xml.js`
- `@astrojs/sitemap` — Auto-generated sitemap
