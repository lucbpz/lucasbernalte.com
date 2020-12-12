import NextLink from 'next/link';
import styled from '@emotion/styled';
import {FiSun, FiMoon} from 'react-icons/fi';
import { useColorMode, Button, Flex, Box, IconButton, Avatar } from '@chakra-ui/react';
import {MAX_WIDTH} from '../lib/constants';

const StickyNav = styled(Flex)`
    position: sticky;
    z-index: 10;
    top: 0;
    backdrop-filter: saturate(180%) blur(20px);
    transition: background-color 0.1 ease-in-out;
`;
const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const navBgColor = {
        light: 'rgba(255, 255, 255, 0.8)',
        dark: 'rgba(23, 25, 35, 0.8)'
      };

    return (
        // <Flex
        //   flexDirection="row"
        //   justifyContent="center"
        //   alignItems="flex-start"
        // >
        <StickyNav
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            maxWidth={MAX_WIDTH}
            width="100%"
            bg={navBgColor[colorMode]}
            as="nav"
            p={4}
            mt={[0, 8]}
            mb={8}
            mx="auto"
        >
        <NextLink href="/" passHref>
          <IconButton as="a" variant="link" p={[1, 4]}>
            <Avatar name="Lucas Bernalte" src="/static/favicons/barba.png" />
          </IconButton>
        </NextLink>
        <Box>
          <NextLink href="/blog" passHref>
            <Button as="a" variant="ghost" p={[1, 4]}>
              Blog
            </Button>
          </NextLink>
          <NextLink href="/about" passHref>
            <Button as="a" variant="ghost" p={[1, 4]}>
              Sobre mí
            </Button>
          </NextLink>
          <IconButton
            aria-label="Toggle dark mode"
            ml={4}
            onClick={toggleColorMode}>
            { colorMode === 'dark'
              ? <FiSun />
              : <FiMoon />
            }
          </IconButton>
        </Box>
      </StickyNav>
      // </Flex>
    )
}

export default Navbar;