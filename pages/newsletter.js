import React from 'react';
import { useQuery } from 'react-query';
import { NextSeo } from 'next-seo';
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
} from '@chakra-ui/react';

import Container from '../components/Container';
import NewsletterItem from '../components/NewsletterItem';
import Subscribe from '../components/Subscribe';

import { MAX_WIDTH } from '../lib/constants';


const url = 'https://lucasbernalte.com/blog';
const title = 'Blog – Lucas Bernalte';
const description = 'Artículos sobre desarrollo web, Frontend, JavaScript, React, desarrollo personal y algunas cosas más';

const Newsletter = ({newsletters}) => {

    const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400'
  };

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description
        }}
      />
      <Container>
        <Stack
          as="main"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="2rem auto 2rem auto"
          maxWidth={MAX_WIDTH}
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
              Manteniendo Código - La Newsletter
            </Heading>
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            mt={8}
          >
            <Subscribe />
            <Heading letterSpacing="tight" mt={16} mb={8} as="h2" size="xl">
              Archivo
            </Heading>
            {newsletters.map((item, index) => <NewsletterItem key={item.id} num={newsletters.length - index} title={item.title} url={item.url} date={item.sent_at} />)}
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export async function getStaticProps() {
    try {
        const API_KEY = process.env.REVUE_API_KEY;
        const response = await fetch('https://www.getrevue.co/api/v2/issues', {
          headers: {
            Authorization: `Token ${API_KEY}`,
            'Content-Type': 'application/json'
          },
          method: 'GET',
        });
  
        if (response.status >= 400) {
          const text = await response.text();  
          return res.status(400).json({
            error: text
          });
        }
  
        const data = await response.json();
        return { props: {newsletters: data }, revalidate: 10 }
      } catch (error) {
        return { props: { newsletters: [] }, revalidate: 10 }
      }
  }
  
export default Newsletter;
  