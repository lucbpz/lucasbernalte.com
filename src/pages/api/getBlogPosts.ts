import { readingTime } from "@lib/utils";
import { getCollection } from "astro:content";

export const GET = async () => {
  const posts = await getCollection("blog"); // assuming 'blog' is your collection name
  return new Response(
    JSON.stringify(
      posts.map((post) => {
        return {
          slug: post.slug,
          data: post.data,
          readingTime: readingTime(post.body),
        };
      }),
    ),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
