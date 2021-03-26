import React from "react";
import { NextSeo, ArticleJsonLd } from "next-seo";
import Head from "next/head";

const BlogSeo = ({ title, summary, date, url, image, slug, locale }) => {
  const publishedTime = new Date(date).toISOString();
  const featuredImage = {
    url: `https://lucasbernalte.com${image}`,
    alt: title,
  };

  return (
    <>
      <NextSeo
        title={`${title} – Lucas Bernalte`}
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
      <Head>
        <link
          rel="alternate"
          hrefLang={locale}
          href={`${'http://lucasbernalte.com'}/${locale}/blog/${post?.slug}`}
        />
        {post?.hreflang?.lang && (
          <link
            rel="alternate"
            hrefLang={post?.hreflang?.lang}
            href={post?.hreflang?.link}
          />
        )}
      </Head>
      <ArticleJsonLd
        authorName="Lucas Bernalte"
        dateModified={publishedTime}
        datePublished={publishedTime}
        description={summary}
        images={[featuredImage]}
        publisherLogo="/static/favicons/barba.png"
        publisherName="Lucas Bernalte"
        title={title}
        url={url}
      />
    </>
  );
};

export default BlogSeo;
