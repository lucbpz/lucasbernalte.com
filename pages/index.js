import React from 'react';
import { useColorMode, Heading, Text, Flex, Stack, Box } from '@chakra-ui/react';

import {CustomLink} from '../components/MDXComponents';
import Container from '../components/Container';
import BlogPost from '../components/BlogPost';
import Subscribe from '../components/Subscribe';
import {MAX_WIDTH} from '../lib/constants';
import { getAllPosts } from '../lib/api'

const Index = ({ allPosts }) => {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400'
  };

  const borderColor = {
    light: 'gray.200',
    dark: 'gray.700'
  };
  const bgColor = {
    light: 'blue.50',
    dark: 'blue.900'
  };

  const latestThreePosts = allPosts.slice(0, 3);

  return (
    <Container>
      <Stack
        as="main"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth={MAX_WIDTH}
      >
        <div style={{position: 'relative', height: '1px', width: '110%'}}>
          <div style={{
            position: 'absolute',
            top: '-56px',
            left: '-112px',
            right: 0,
            height: '24rem',
            pointerEvents: 'none',
            background: colorMode === 'light' ? 'url(/static/images/web-bg.png)50% 0 no-repeat' : 'url(/static/images/web-bg-inverted.png)50% 0 no-repeat',
            opacity: .15,
            maskImage: 'linear-gradient(to top,transparent 20%,black 80%)',
            WebkitMaskImage: 'linear-gradient(to top,transparent 20%,black 80%)'
          }}></div>
        </div>
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth={MAX_WIDTH}
        >
          <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
            Hey, I’m Lucas Bernalte
          </Heading>
          <Text mt={16} color={secondaryTextColor[colorMode]} textStyle="p">
            Ingeniero y desarrollador Full Stack en JavaScript con experiencia. Trabajo en Electronic Arts como <strong>Frontend Engineer</strong>.
            Mi misión es ayudar a desarrolladores junior a progresar en su carrera, para ello escribo y comparto conocimiento sobre Frontend.
            La tecnología con la que más estoy trabajando es React, así que me verás escribiendo sobre ello con mucha frecuencia!
          </Text>
          <Text mt={4} color={secondaryTextColor[colorMode]} textStyle="p">
            Si ya sabes los conocimientos básicos sobre React y te has preguntado ¿y ahora qué? echa un vistazo a mi blog!
          </Text>
          {/* <Box
            border="1px solid"
            borderColor={borderColor[colorMode]}
            bg={bgColor[colorMode]}
            borderRadius={4}
            padding={6}
            my={4}
            w="100%"
          >
            <Text color={secondaryTextColor[colorMode]} textStyle="p">
              No suelo estar trabajando en más de 2-3 side projects. Ahora estoy <CustomLink>disponible para uno más</CustomLink>.
            </Text>
          </Box> */}
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="900px"
          mt={8}
        >
          <Heading letterSpacing="tight" my={4} size="xl" fontWeight={700}>
            Últimos Posts
          </Heading>
           {latestThreePosts.map(blogPost => <BlogPost key={blogPost.slug} {...blogPost} />)}
        </Flex>
        
        <Subscribe />
      </Stack>
    </Container>
  );
};

export default Index;

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
