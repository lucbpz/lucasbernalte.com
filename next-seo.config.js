const title = 'Lucas Bernalte – Frontend, React, JavaScript FullStack Developer.';
const description =
  'Creando mi Digital Garden, hablando sobre JavaScript, React y dando mi visión acerca del mundo de Frontend y desarrollo web.';

const SEO = {
  title,
  description,
  canonical: 'https://lucasbernalte.com',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://lucasbernalte.com',
    title,
    description,
    images: [
      {
        url: 'https://lucasbernalte.com/static/thumbnails/lucas-bernalte.png',
        alt: title,
        width: 1200,
        height: 630
      }
    ]
  },
  twitter: {
    handle: '@lucasbernalte',
    site: '@lucasbernalte',
    cardType: 'summary_large_image'
  }
};

export default SEO;