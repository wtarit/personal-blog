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

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      date: z.coerce.date(),
      hasWriteup: z.boolean().default(false),
      type: z.enum(["project", "hackathon", "competition"]).default("project"),
      award: z.string().optional(),
      github: z.string().url().optional(),
      devpost: z.string().url().optional(),
      youtube: z.string().url().optional(),
      demo: z.string().url().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog, thBlog, projects };
