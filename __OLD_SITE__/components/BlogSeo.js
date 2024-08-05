import React from "react";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { parseISO, format } from "date-fns";

const BlogSeo = ({ title, summary, date, url, image, readingTime }) => {
  const microLinkCardParams = {
    bgImage: "https://lucasbernalte.com/static/thumbnails/bg.png",
    bgOverlay: "rgba(255,255,255,0)",
    color: "#fff",
    domain: "lucasbernalte.com",
    logo: "https://lucasbernalte.com/static/favicons/lucas-circle.png",
    subtitle: `${format(parseISO(date), "MMMM dd, yyyy")} — ${
      readingTime.text
    }`,
    title,
  };
  const searchParams = new URLSearchParams(microLinkCardParams);

  const api =
    "https://i.microlink.io/?adblock=false&waitForTimeout=1500&meta=false&screenshot&element=%23screenshot&embed=screenshot.url&url=";
  const cardUrl = `https://cards.microlink.io/?preset=smhutch%26${encodeURIComponent(
    searchParams.toString(),
  )}`;

  const publishedTime = new Date(date).toISOString();

  const featuredImage = {
    url: `${api}${cardUrl}`,
    alt: title,
  };

  return (
    <>
      <NextSeo
        title={`${title} – Lucas Bernalte's blog`}
        description={summary}
        canonical={url}
        openGraph={{
          type: "article",
          article: {
            publishedTime,
          },
          url,
          title,
          description: summary,
          images: [featuredImage],
        }}
      />
      <ArticleJsonLd
        authorName="Lucas Bernalte"
        dateModified={publishedTime}
        datePublished={publishedTime}
        description={summary}
        images={[featuredImage]}
        publisherLogo="/static/favicons/android-chrome-192x192.png"
        publisherName="Lucas Bernalte"
        title={title}
        url={url}
      />
    </>
  );
};

export default BlogSeo;
