import { getCollection, type CollectionEntry } from "astro:content";

export type NewsEntry = CollectionEntry<"news">;

const dateFormat = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric",
	timeZone: "Australia/Sydney",
});

export const formatDate = (d: Date) => dateFormat.format(d);

/** All news entries, newest first. */
export async function getNews(): Promise<NewsEntry[]> {
	const entries = await getCollection("news");
	return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Shape expected by News.astro / Card.astro. */
export function toCard(entry: NewsEntry) {
	return {
		title: entry.data.title,
		description: entry.data.description,
		date: formatDate(entry.data.date),
		image: { src: entry.data.image, alt: entry.data.alt },
		cta: { text: "Read more", link: entry.data.link ?? `/news/${entry.slug}` },
	};
}