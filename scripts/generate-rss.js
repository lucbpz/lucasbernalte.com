import fs from "fs";
import { Feed } from "feed";

import { getAllPosts } from "../lib/api";

(async () => {
  const feed = new Feed({
    title: "Lucas Bernalte",
    description:
      "Lucas Bernalte – Frontend, React, JavaScript FullStack Developer.",
    id: "https://lucasbernalte.com",
    link: "https://lucasbernalte.com",
    feedLinks: {
      rss2: "https://lucasbernalte.com/feed.xml",
      json: "https://lucasbernalte.com/feed.json",
      atom: "https://lucasbernalte.com/atom.xml",
    },
    author: {
      name: "Lucas Bernalte",
      email: "lucas.bernalte@gmail.com",
      link: "https://lucasbernalte.com",
    },
  });

  (await getAllPosts(["title", "date", "slug", "summary"]))
    .slice(0, 10)
    .forEach((post) => {
      feed.addItem({
        title: post.title,
        guid: post.slug,
        link: `https://lucasbernalte.com/blog/${post.slug}`,
        date: new Date(post.date),
        description: post.summary,
      });
    });

  fs.writeFileSync("./public/feed.xml", feed.rss2());
  fs.writeFileSync("./public/feed.json", feed.json1());
  fs.writeFileSync("./public/atom.xml", feed.atom1());
})();
