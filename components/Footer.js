import React from 'react';
import NextLink from 'next/link';
import { Flex, Text, Link, IconButton, Icon } from '@chakra-ui/react';
import { FaTwitter, FaGithub, FaLinkedinIn, FaTwitch, FaHeart } from 'react-icons/fa';
import {AiOutlineMail} from 'react-icons/ai';
import NowPlaying from './NowPlaying';

const Footer = () => (
  <Flex align="center" mb={4} direction="column">
    <NowPlaying />
    <div>
      <Link href="https://twitter.com/lucasbernalte" title="Twitter" isExternal>
        <IconButton
          aria-label="Twitter"
          size="lg"
          color="gray.500"
          variant="ghost"
        ><FaTwitter /></IconButton>
      </Link>
      <Link href="https://github.com/lucbpz" title="GitHub" isExternal>
        <IconButton
          aria-label="GitHub"
          size="lg"
          color="gray.500"
          variant="ghost"
        ><FaGithub /></IconButton>
      </Link>
      <Link
        href="https://www.linkedin.com/in/lucasbernalte"
        title="LinkedIn"
        isExternal
      >
        <IconButton
          aria-label="LinkedIn"
          size="lg"
          color="gray.500"
          variant="ghost"
        ><FaLinkedinIn /></IconButton>
      </Link>
      <Link
        href="https://www.twitch.tv/lucasbernalte"
        title="Twitch"
        isExternal
      >
        <IconButton
          aria-label="Twitch"
          size="lg"
          color="gray.500"
          variant="ghost"
        ><FaTwitch /></IconButton>
      </Link>
      <Link href="mailto:hola@lucasbernalte.com" title="Email" isExternal>
        <IconButton
          aria-label="Email"
          size="lg"
          color="gray.500"
          variant="ghost"
        ><AiOutlineMail /></IconButton>
      </Link>
    </div>
    <Flex align="center" justify="center" wrap="wrap">
      <Text>Crafted with <Icon ml={1}><FaHeart color="red"/></Icon>by Lucas Bernalte.</Text>
      <NextLink href="/inspiration" passHref>
        <Link
          fontSize="sm"
          color="gray.500"
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

export default Footer;