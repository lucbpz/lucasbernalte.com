const title = 'Lucas Bernalte – Frontend, React developer, JavaScript.';
const description =
  'Front-end developer, JavaScript y cursos sobre desarrollo web';

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
        url: 'https://lucasbernalte.com/static/favicons/favicon.ico',
        alt: title,
        width: 32,
        height: 32
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