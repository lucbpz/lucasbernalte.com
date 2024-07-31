import { useColorMode, Text, Flex, Box, Link } from "@chakra-ui/react";
import { parseISO, format } from "date-fns";

const NewsletterItem = ({ title, num, url, date }) => {
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
    <Link w="100%" _hover={{ textDecoration: "none" }} href={url} isExternal>
      <Box
        mb={2}
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
          <Flex flexDirection="row">
            <Text size="md" as="h3" mr={4} fontWeight="medium">
              #{num}
            </Text>
            <Text size="md" as="h3" fontWeight="medium">
              {title}
            </Text>
          </Flex>
          <Text
            color={secondaryTextColor[colorMode]}
            mb={{ base: 4, md: 0 }}
            textStyle="p"
            fontSize="md"
          >
            {`${format(parseISO(date), "MMMM dd, yyyy")}`}
          </Text>
        </Flex>
      </Box>
    </Link>
  );
};

export default NewsletterItem;
