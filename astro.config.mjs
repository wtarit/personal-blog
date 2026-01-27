// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import mermaid from "astro-mermaid";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://wtarit.me",

  integrations: [
    mermaid({
      theme: "forest",
      autoTheme: true,
    }),
    mdx(),
    sitemap(),
  ],

  adapter: cloudflare(),
});
