import React from "react";
import NextLink from "next/link";
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Box,
  Link,
  Badge,
} from "@chakra-ui/react";

const BlogPost = ({ title, slug, readingTime, summary }) => {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: "gray.500",
    dark: "gray.400",
  };
  const descriptionTextColor = {
    light: "gray.600",
    dark: "gray.300",
  };

  const hoverColor = {
    light: "rgba(237,242,247, 0.5)",
    dark: "rgba(255, 255, 255, 0.08)",
  };

  return (
    <NextLink href={`/blog/${slug}`} passHref>
      <Link w="100%" _hover={{ textDecoration: "none" }}>
        <Box
          mb={6}
          p={2}
          display="block"
          width="100%"
          sx={{
            boxSizing: "border-box",
            border: "1px solid transparent",
            borderRadius: "0.375rem",

            transition: "all .15s" /* Animation */,
          }}
          _hover={{
            // transform: "scale(1.01)",
            background: hoverColor[colorMode],
          }}
        >
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
              mb={{ base: 4, md: 0 }}
              textStyle="p"
              fontSize="md"
              flexShrink={0}
            >
              {`${readingTime.text}`}
            </Text>
          </Flex>
          <Text
            color={descriptionTextColor[colorMode]}
            textStyle="p"
            fontSize="md"
          >
            {summary}
          </Text>
        </Box>
      </Link>
    </NextLink>
  );
};

export default BlogPost;
