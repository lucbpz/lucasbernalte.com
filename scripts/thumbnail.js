import { writeFile } from "node:fs/promises";
import { Readable } from "node:stream";
import { select } from "@inquirer/prompts";

export function formatDate(date) {
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

export function readingTime(html) {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
}

const microLinkCardParams = ({ title, date, readingTime }) => ({
  bgImage: "https://lucasbernalte.com/static/thumbnails/bg.png",
  bgOverlay: "rgba(255,255,255,0)",
  color: "#fff",
  domain: "lucasbernalte.com",
  logo: "https://lucasbernalte.com/static/favicons/lucas-circle.png",
  subtitle: `${formatDate(new Date(date))} — ${readingTime}`,
  title,
});

async function getBlogPosts() {
  try {
    const response = await fetch("http://localhost:4321/api/getBlogPosts"); // Adjust the URL as needed
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
}

const blogPosts = await getBlogPosts();

const answer = await select({
  message: "Select a blog post to download the thumbnail",
  choices: blogPosts.map((post) => ({
    title: post.data.title,
    value: post.slug,
  })),
});

const post = blogPosts.find((post) => post.slug === answer);

const params = microLinkCardParams({
  title: post.data.title,
  date: post.data.date,
  readingTime: post.readingTime,
});

const searchParams = new URLSearchParams({
  preset: "smhutch",
  ...params,
}).toString();
const cardURL = `https://cards.microlink.io/?${searchParams}`;
const thumbnailURL = `https://api.microlink.io/?url=${encodeURIComponent(
  cardURL,
)}&force=false&adblock=false&screenshot.element=%23screenshot&embed=screenshot.url&meta=false&waitUntil.0=load&waitUntil.1=networkidle0`;

const response = await fetch(thumbnailURL);
const body = Readable.fromWeb(response.body);
await writeFile(`./public/thumbnails/${post.slug}.png`, body);
