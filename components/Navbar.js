import { useRef } from "react";
import NextLink from "next/link";
import styled from "@emotion/styled";
import { FiSun, FiMoon, FiMenu } from "react-icons/fi";
import {
  useColorMode,
  Button,
  Flex,
  Box,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MAX_WIDTH } from "../lib/constants";

const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
`;

const links = [
  { name: "Newsletter", link: "/newsletter" },
  { name: "📝 Blog", link: "/blog" },
  { name: "👨‍💻 Sobre mí", link: "/about" },
];

const Item = ({ link }) => (
  <NextLink href={link.link} passHref>
    <Button as="a" variant="ghost" p={[1, 4]} style={{ fontWeight: 600 }}>
      {link.name}
    </Button>
  </NextLink>
);

const Hamburger = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <IconButton my={2} ref={btnRef} aria-label="Menu" onClick={onOpen}>
        <FiMenu />
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>

            <DrawerBody>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <NextLink href="/" passHref>
                  <Button
                    as="a"
                    variant="ghost"
                    p={[1, 4]}
                    style={{ fontWeight: 600 }}
                  >
                    🏡 Home
                  </Button>
                </NextLink>
                {links.map((link) => (
                  <Item key={link.link} link={link} />
                ))}
              </Box>
            </DrawerBody>

            <DrawerFooter>
              <IconButton
                aria-label="Toggle dark mode"
                ml={4}
                onClick={toggleColorMode}
              >
                {colorMode === "dark" ? <FiSun /> : <FiMoon />}
              </IconButton>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const showTopNavbar = useBreakpointValue({
    base: false,
    sm: false,
    md: true,
  });

  const navBgColor = {
    light: "white",
    dark: "gray.800",
  };

  return (
    <Flex
      flexDirection="row"
      bg={navBgColor[colorMode]}
      justifyContent="center"
      alignItems="flex-start"
    >
      <StickyNav
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        maxWidth={MAX_WIDTH}
        width="100%"
        as="nav"
        p={4}
        mt={[0, 2]}
        mb={2}
        mx="auto"
      >
        <NextLink href="/" passHref>
          <Button as="a" variant="ghost" p={[1, 4]} style={{ fontWeight: 600 }}>
            Lucas Bernalte
          </Button>
        </NextLink>
        {showTopNavbar ? (
          <Box>
            {links.map((link) => (
              <Item key={link.link} link={link} />
            ))}
            <IconButton
              aria-label="Toggle dark mode"
              ml={4}
              onClick={toggleColorMode}
            >
              {colorMode === "dark" ? <FiSun /> : <FiMoon />}
            </IconButton>
          </Box>
        ) : (
          <Hamburger />
        )}
      </StickyNav>
    </Flex>
  );
};

export default Navbar;
