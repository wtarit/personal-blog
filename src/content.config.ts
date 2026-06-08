import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blogSchema = ({ image }: { image: () => z.ZodType }) =>
  z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
  });

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: blogSchema,
});

const thBlog = defineCollection({
  loader: glob({ base: "./src/content/th/blog", pattern: "**/*.{md,mdx}" }),
  schema: blogSchema,
});

export const collections = { blog, thBlog };
