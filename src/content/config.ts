import { defineCollection, z } from "astro:content";

const news = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		description: z.string().nullish().transform((v) => v ?? ""),
		image: z.string().nullish().transform((v) => v || "./src/asset/images/news.jpg"),
		alt: z.string().nullish().transform((v) => v ?? ""),
		gallery: z
			.array(z.string().nullish())
			.nullish()
			.transform((a) => (a ?? []).filter((s): s is string => !!s)),
		// Set only for hand-built legacy pages that live in src/pages/news/*.astro
		link: z.string().optional(),
		focus: z.enum(["top", "center", "bottom"]).default("top"),
	}),
});

export const collections = { news };