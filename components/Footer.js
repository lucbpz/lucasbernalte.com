import React from "react";
import NextLink from "next/link";
import {
  Flex,
  Text,
  Link,
  IconButton,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import {
  FaTwitter,
  FaGithub,
  FaLinkedinIn,
  FaTwitch,
  FaHeart,
} from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import NowPlaying from "./NowPlaying";

const footerColor = {
  light: "white",
  dark: "gray.800",
};

const textColor = {
  light: "gray.800",
  dark: "gray.100",
};

const Footer = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex align="center" pt="2rem" direction="column" bg={footerColor[colorMode]}>
      <NowPlaying />
      <div>
        <Link
          href="https://twitter.com/lucasbernalte"
          title="Twitter"
          isExternal
        >
          <IconButton
            aria-label="Twitter"
            size="lg"
            color={textColor[colorMode]}
            variant="ghost"
          >
            <FaTwitter />
          </IconButton>
        </Link>
        <Link href="https://github.com/lucbpz" title="GitHub" isExternal>
          <IconButton
            aria-label="GitHub"
            size="lg"
            color={textColor[colorMode]}
            variant="ghost"
          >
            <FaGithub />
          </IconButton>
        </Link>
        <Link
          href="https://www.linkedin.com/in/lucasbernalte"
          title="LinkedIn"
          isExternal
        >
          <IconButton
            aria-label="LinkedIn"
            size="lg"
            color={textColor[colorMode]}
            variant="ghost"
          >
            <FaLinkedinIn />
          </IconButton>
        </Link>
        <Link
          href="https://www.twitch.tv/lucasbernalte"
          title="Twitch"
          isExternal
        >
          <IconButton
            aria-label="Twitch"
            size="lg"
            color={textColor[colorMode]}
            variant="ghost"
          >
            <FaTwitch />
          </IconButton>
        </Link>
        <Link href="mailto:hola@lucasbernalte.com" title="Email" isExternal>
          <IconButton
            aria-label="Email"
            size="lg"
            color={textColor[colorMode]}
            variant="ghost"
          >
            <AiOutlineMail />
          </IconButton>
        </Link>
      </div>
      <Flex align="center" justify="center" wrap="wrap">
        <Text>
          Crafted with{" "}
          <Icon ml={1}>
            <FaHeart color="red" />
          </Icon>
          by Lucas Bernalte.
        </Text>
        <NextLink href="/inspiration" passHref>
          <Link
            fontSize="sm"
            color={textColor[colorMode]}
            minWidth="100px"
            mr={2}
            ml={1}
            title="Find the inspiration"
          >
            find the inspiration.
          </Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};

export default Footer;
