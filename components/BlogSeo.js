import React from 'react';
import { NextSeo, ArticleJsonLd } from 'next-seo';

const BlogSeo = ({ title, summary, date, url, image }) => {
  const publishedTime = new Date(date).toISOString();
  const featuredImage = {
    url: `https://lucasbernalte.com${image}`,
    alt: title
  };

  return (
    <>
      <NextSeo
        title={`${title} – Lucas Bernalte`}
        description={summary}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime,
          },
          url,
          title,
          description: summary,
          images: [featuredImage]
        }}
      />
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