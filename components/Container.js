import React from 'react';
import { useColorMode, Flex } from '@chakra-ui/react';

import Footer from './Footer';
import Navbar from './Navbar';

const Container = ({ children }) => {
  const { colorMode } = useColorMode();

  const bgColor = {
    light: 'white',
    dark: 'gray.800'
  };
  const primarytextColor = {
    light: 'black',
    dark: 'white'
  };

  return (
    <>
      <Navbar />
      <Flex
        as="main"
        justifyContent="center"
        flexDirection="column"
        flex="1 0 auto"
        bg={bgColor[colorMode]}
        color={primarytextColor[colorMode]}
        px={8}
      >
        {children}
      </Flex>
      <Footer />
    </>
  );
};

export default Container;