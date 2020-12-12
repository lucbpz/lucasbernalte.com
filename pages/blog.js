import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
} from '@chakra-ui/react';

import Container from '../components/Container';
import BlogPost from '../components/BlogPost';

import { getAllPosts } from '../lib/api'

const url = 'https://lucasbernalte.com/blog';
const title = 'Blog – Lucas Bernalte';
const description = 'Artículos sobre desarrollo web, Frontend, JavaScript, React, desarrollo personal y algunas cosas más';

const Blog = ({allPosts}) => {
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
          m="0 auto 4rem auto"
          maxWidth="700px"
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
          >
            <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
              Blog
            </Heading>
            <Text color={secondaryTextColor[colorMode]}>
              {`Estoy empezando en esto de compartir conocimientos, así que por ahora
              solo llevo ${allPosts.length} posts escritos aquí.`}
            </Text>
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
            mt={8}
          >
            <Heading letterSpacing="tight" my={4} size="xl" fontWeight={700}>
              All Posts
            </Heading>
            {!allPosts.length && 'No posts found.'}
            {allPosts.map((blogPost) => (
              <BlogPost key={blogPost.slug} {...blogPost} />
            ))}
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default Blog;

export async function getStaticProps() {
    const allPosts = getAllPosts([
      'title',
      'date',
      'slug',
      'author',
      'coverImage',
      'summary',
      'content',
    ])
  
    return {
      props: { allPosts },
    }
  }
  