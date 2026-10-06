import { defineCollection, z } from "astro:content";

const news = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		description: z.string().default(""),
		// Fallback keeps the build green if an editor skips the cover photo
		image: z.string().default("./src/asset/images/news.jpg"),
		alt: z.string().default(""),
		gallery: z.array(z.string()).default([]),
		// Set only for hand-built legacy pages that live in src/pages/news/*.astro
		link: z.string().optional(),
	}),
});

export const collections = { news };