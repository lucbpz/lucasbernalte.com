import { MDXProvider } from "@mdx-js/react";
import { Global, css } from "@emotion/react";
import { DefaultSeo } from "next-seo";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import Head from "next/head";

import theme from "../styles/theme";
import { prismLightTheme, prismDarkTheme } from "../styles/prism";
import MDXComponents from "../components/MDXComponents";
import SEO from "../next-seo.config";

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Global
        styles={css`
          ${colorMode === "light" ? prismLightTheme : prismDarkTheme};
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
            background: ${colorMode === "light" ? "white" : "#171923"};
          }
        `}
      />
      {children}
    </>
  );
};

// import Sora font-family
import "@fontsource/sora/200.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/600.css";
import "@fontsource/sora/800.css";

const App = ({ Component, pageProps }) => {
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
            <script
              async
              defer
              data-domain="lucasbernalte.com"
              src="https://plausible.io/js/plausible.js"
            ></script>
            <link
              rel="alternate"
              type="application/rss+xml"
              title="RSS"
              href="/feed.xml"
            />
            <script>
              window.plausible = window.plausible || function(){" "}
              {(window.plausible.q = window.plausible.q || []).push(arguments)}
            </script>
          </Head>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </GlobalStyle>
      </MDXProvider>
    </ChakraProvider>
  );
};

export default App;
