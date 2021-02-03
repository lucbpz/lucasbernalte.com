import React from 'react';
import NextLink from 'next/link';
import { useColorMode, Heading, Text, Flex, Box, Link } from '@chakra-ui/react';

const BlogPost = ({title, slug, readingTime, summary}) => {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: 'gray.900',
    dark: 'gray.200'
  };

  return (
    <NextLink href={`/blog/${slug}`} passHref>
      <Link w="100%" _hover={{ textDecoration: 'none' }}>
        <Box mb={8} display="block" width="100%">
          <Flex
            width="100%"
            align="flex-start"
            justifyContent="space-between"
            flexDirection={['column', 'row']}
          >
            <Heading size="md" as="h3" mb={2} fontWeight="medium">
              {title}
            </Heading>
            <Text
              color="gray.200"
              minWidth="105px"
              textAlign={['left', 'right']}
              mb={[4, 0]}
              textStyle="p"
            >
              {`${readingTime.text}`}
            </Text>
          </Flex>
          <Text color={secondaryTextColor[colorMode]} textStyle="p">{summary}</Text>
        </Box>
      </Link>
    </NextLink>
  );
};

export default BlogPost;