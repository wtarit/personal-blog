// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import mermaid from "astro-mermaid";
import icon from "astro-icon";

import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

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
    icon(),
  ],

  adapter: cloudflare(),

  vite: {
    plugins: [tailwindcss()],
  },
});