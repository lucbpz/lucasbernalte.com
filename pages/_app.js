import { MDXProvider } from '@mdx-js/react';
import { Global, css } from '@emotion/react';
import { DefaultSeo } from 'next-seo';
import {
  ChakraProvider,
  useColorMode
} from '@chakra-ui/react';
import Head from 'next/head';

import theme from '../styles/theme';
import { prismLightTheme, prismDarkTheme } from '../styles/prism';
import MDXComponents from '../components/MDXComponents';
import SEO from '../next-seo.config';

import { IntlProvider } from 'react-intl';
import { useRouter } from "next/router"

const languages = {
  en: require('../locale/en.json'),
  es: require('../locale/es.json')
};

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Global
        styles={css`
          ${colorMode === 'light' ? prismLightTheme : prismDarkTheme};
          ::selection {
            background-color: #47a3f3;
            color: #fefefe;
          }
          html {
            min-width: 320px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: ${colorMode === 'light' ? 'white' : '#171923'};
          }
        `}
      />
      {children}
    </>
  );
};

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  const { locale, defaultLocale } = router;
  const messages = languages[locale];

  return (
    <ChakraProvider theme={theme}>
      <MDXProvider components={MDXComponents}>
          <GlobalStyle>
            <Head>
              <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
              <meta
                content="width=device-width, initial-scale=1"
                name="viewport"
              />
              <meta content="#ffffff" name="theme-color" />
              <meta content="#ffffff" name="msapplication-TileColor" />
              <meta
                content="/static/favicons/browserconfig.xml"
                name="msapplication-config"
              />
              <meta
                content="biHkMOychciu9cqUw-vineouEgViHqhNYTF8AFh67JA"
                name="google-site-verification"
              />
              <script async defer data-domain="lucasbernalte.com" src="https://plausible.io/js/plausible.js"></script>
            </Head>
            <DefaultSeo {...SEO} />
            <IntlProvider messages={messages} locale={locale} defaultLocale={defaultLocale}>
              <Component {...pageProps} />
            </IntlProvider>
          </GlobalStyle>
      </MDXProvider>
    </ChakraProvider>
  );
};

export default App;