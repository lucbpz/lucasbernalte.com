import { useColorMode, Text, Flex, Box, Link } from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';

const NewsletterItem = ({title, num, url, date}) => {
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
        <Link w="100%" _hover={{ textDecoration: 'none' }} href={url} isExternal>
        <Box mb={8} display="block" width="100%">
          <Flex
            width="100%"
            align="flex-start"
            justifyContent="space-between"
            direction={{ base: "column", md: "row" }}

          >
            <Flex flexDirection="row">
              <Text size="md" as="h3" mb={2} mr={4} fontWeight="medium">#{num}</Text>
              <Text size="md" as="h3" mb={2} fontWeight="medium">
                {title}
              </Text>
            </Flex>
            <Text
              color={secondaryTextColor[colorMode]}
              mb={{base: 4, md: 0}}
              textStyle="p"
              fontSize="md"
            >
              {`${format(parseISO(date),  'MMMM dd, yyyy')}`}
            </Text>
          </Flex>
        </Box>
      </Link>
    )
}

export default NewsletterItem;