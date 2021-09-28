import React from 'react';
import NextLink from 'next/link';
import { useColorMode, Heading, Text, Flex, Box, Link } from '@chakra-ui/react';

const BlogPost = ({title, slug, readingTime, summary}) => {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: 'gray.500',
    dark: 'gray.400'
  };
  const descriptionTextColor = {
    light: 'gray.600',
    dark: 'gray.300'
  };

  return (
    <NextLink href={`/blog/${slug}`} passHref>
      <Link w="100%" _hover={{ textDecoration: 'none' }}>
        <Box mb={8} display="block" width="100%">
          <Flex
            width="100%"
            align="flex-start"
            justifyContent="space-between"
            direction={{ base: "column", md: "row" }}

          >
            <Heading size="md" as="h3" mb={2} fontWeight="medium">
              {title}
            </Heading>
            <Text
              color={secondaryTextColor[colorMode]}
              mb={{base: 4, md: 0}}
              textStyle="p"
              fontSize="md"
            >
              {`${readingTime.text}`}
            </Text>
          </Flex>
          <Text color={descriptionTextColor[colorMode]} textStyle="p" fontSize="md">{summary}</Text>
        </Box>
      </Link>
    </NextLink>
  );
};

export default BlogPost;