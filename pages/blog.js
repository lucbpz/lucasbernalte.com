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
import { MAX_WIDTH } from '../lib/constants';

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
          m="2rem auto 2rem auto"
          maxWidth={MAX_WIDTH}
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth={MAX_WIDTH}
          >
            <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
              Blog
            </Heading>
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
            mt={8}
          >
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

export async function getStaticProps({locale}) {
    const allPosts = getAllPosts([
      'title',
      'date',
      'slug',
      'author',
      'coverImage',
      'summary',
      'content',
    ], locale)
  
    return {
      props: { allPosts },
    }
  }
  