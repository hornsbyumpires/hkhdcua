import { getCollection, type CollectionEntry } from "astro:content";
import sharp from "sharp";

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

/** A photo's natural width/height ratio, so <Picture> doesn't crop it. */
export async function ratioOf(src: string): Promise<number> {
	const { width = 1, height = 1, orientation } = await sharp(src.replace(/^\.\//, "")).metadata();
	// Phone photos often store rotation in EXIF; orientations 5–8 are rotated 90°
	return orientation && orientation >= 5 ? height / width : width / height;
}

/** Shape expected by News.astro / Card.astro. */
export function toCard(entry: NewsEntry) {
	return {
		title: entry.data.title,
		description: entry.data.description,
		date: formatDate(entry.data.date),
		image: { src: entry.data.image, alt: entry.data.alt, position: entry.data.focus },
		cta: { text: "Read more", link: entry.data.link ?? `/news/${entry.slug}` },
	};
}