import fs from "fs";
import { Feed } from "feed";

export async function generateRssFeed(allPosts) {
  if (process.env.NODE_ENV === "development") {
    return;
  }

  const baseUrl = "https://lucasbernalte.com";

  const feed = new Feed({
    title: "Lucas Bernalte",
    description:
      "Lucas Bernalte – Frontend, React, JavaScript FullStack Developer.",
    id: baseUrl,
    link: baseUrl,
    feedLinks: {
      rss2: `${baseUrl}/feed.xml`,
      json: `${baseUrl}/feed.json`,
      atom: `${baseUrl}/atom.xml`,
    },
    author: {
      name: "Lucas Bernalte",
      email: "lucas.bernalte@gmail.com",
      link: baseUrl,
    },
  });

  allPosts.forEach((post) => {
    feed.addItem({
      title: post.title,
      guid: post.slug,
      link: `${baseUrl}/blog/${post.slug}`,
      date: new Date(post.date),
      description: post.summary,
    });
  });

  fs.writeFileSync("./public/feed.xml", feed.rss2());
  fs.writeFileSync("./public/feed.json", feed.json1());
  fs.writeFileSync("./public/atom.xml", feed.atom1());
}
