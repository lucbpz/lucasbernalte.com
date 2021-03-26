import React from 'react';
import { parseISO, format } from 'date-fns';
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Avatar
} from '@chakra-ui/react';
import { getPostBySlug, getAllPosts } from '../../lib/api'
import hydrate from 'next-mdx-remote/hydrate';

import { getFiles, getFileBySlug } from '../../lib/mdx';
import MDXComponents from '../../components/MDXComponents';

import Container from '../../components/Container';
import Subscribe from '../../components/Subscribe';
import BlogSeo from '../../components/BlogSeo';
import {MAX_WIDTH} from '../../lib/constants';

export default function BlogLayout({ mdxSource, frontMatter, locale }) {
    const content = hydrate(mdxSource, { components: MDXComponents })

  const { colorMode } = useColorMode();
  const textColor = {
    light: 'gray.700',
    dark: 'gray.400'
  };

  return (
    <Container>
      <BlogSeo url={`https://lucasbernalte.com/blog/${frontMatter.slug}`} {...frontMatter} locale={locale}/>
      <Stack
        as="article"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth={MAX_WIDTH}
        w="100%"
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth={MAX_WIDTH}
          w="100%"
        >
          <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
            {frontMatter.title}
          </Heading>
          <Flex
            justify="space-between"
            align={['initial', 'center']}
            direction={['column', 'row']}
            mt={2}
            w="100%"
            mb={4}
          >
            <Flex align="center">
              <Avatar
                size="xs"
                backgroundColor="grey"
                name="Lucas Bernalte"
                src="/static/favicons/barba.png"
                mr={2}
              />
              <Text fontSize="sm" color={textColor[colorMode]}>
                {frontMatter.by}
                {'Lucas Bernalte / '}
                {format(parseISO(frontMatter.date), 'MMMM dd, yyyy')}
              </Text>
            </Flex>
            <Text fontSize="sm" color="gray.500" minWidth="100px" mt={[2, 0]}>
              {frontMatter.readingTime.text}
            </Text>
          </Flex>
        </Flex>
        {content}
        <Subscribe />
      </Stack>
    </Container>
  );
}


// export async function getStaticProps({ params }) {
//     const post = getPostBySlug(params.slug, [
//       'title',
//       'date',
//       'slug',
//       'author',
//       'content',
//       'ogImage',
//       'coverImage',
//     ])

//     const { data, content } = matter(post);
//     const mdxSource = await renderToString(content, {
//       components: MDXComponents,
//       mdxOptions: {
//         remarkPlugins: [
//           require('remark-autolink-headings'),
//           require('remark-slug'),
//           require('remark-code-titles')
//         ],
//         rehypePlugins: [mdxPrism]
//       }
//     });
  
//     return {
//         mdxSource,
//         frontMatter: {
//           wordCount: content.split(/\s+/gu).length,
//           readingTime: readingTime(content),
//           slug: slug || null,
//           ...data
//         }
//       };
//   }
  
//   export async function getStaticPaths() {
//     const posts = getAllPosts(['slug'])
  
//     return {
//       paths: posts.map((post) => {
//         return {
//           params: {
//             slug: post.slug,
//           },
//         }
//       }),
//       fallback: false,
//     }
//   }
export async function getStaticPaths() {
    const postsEn = await getFiles(`blog/en`);
    const postsEs = await getFiles(`blog/es`);
  
    return {
      paths: [...postsEn, ...postsEs].map((p) => ({
        params: {
          slug: p.replace(/\.mdx/, '')
        }
      })),
      fallback: false
    };
  }
  
  export async function getStaticProps({ params, locale }) {
    const post = await getFileBySlug(`blog/${locale}`, params.slug);
  
    return { props: post };
  }