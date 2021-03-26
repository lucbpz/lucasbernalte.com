import React, { useState, useRef } from 'react';
import {
  Heading,
  InputGroup,
  Box,
  Input,
  InputRightElement,
  Button,
  Text,
  useToast,
  useColorMode
} from '@chakra-ui/react';

const Subscribe = () => {
  const [loading, setLoading] = useState(false);
  const inputEl = useRef(null);
  const toast = useToast();
  const { colorMode } = useColorMode();
  const bgColor = {
    light: 'secondary.50',
    dark: 'gray.600'
  };
  const borderColor = {
    light: 'secondary.200',
    dark: 'gray.600'
  };
  const bgInputColor = {
    light: 'white',
    dark: 'secondary.900'
  }

  const subscribe = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: inputEl.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    setLoading(false);
    const { error } = await res.json();

    if (error) {
      toast({
        title: 'An error occurred.',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true
      });

      return;
    }

    inputEl.current.value = '';
    toast({
      title: 'Success!',
      description: 'You are now subscribed.',
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  };

  return (
    <Box
      border="1px solid"
      borderColor={bgColor[colorMode]}
      bg={bgColor[colorMode]}
      borderRadius={10}
      padding={6}
      my={4}
      w="100%"
      boxShadow="xl"
    >
      <Heading as="h5" size="lg" mb={2}>
        Suscríbete a mi Newsletter
      </Heading>
      <Text>
        Recibe información sobre artículos sobre Frontend, el mundo del software, katas del mundo real en JS y puede que algo extra de música o desarrollo personal. 
      </Text>
      <br/>
      <Text>
        Pero prometo no hacerlo demasiado frecuente para no llenarte la bandeja de entrada. 💌
      </Text>
      <InputGroup size="md" mt={4}>
        <Input
          aria-label="Email for newsletter"
          bg={bgInputColor[colorMode]}
          placeholder="john@doe.com"
          ref={inputEl}
          type="email"
        />
        <InputRightElement width="8rem">
          <Button
            isLoading={loading}
            fontWeight="bold"
            h="1.75rem"
            size="sm"
            onClick={subscribe}
          >
            Subscribe
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default Subscribe;
