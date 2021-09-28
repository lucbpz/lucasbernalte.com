import React, { useState, useRef } from 'react';
import {
  Heading,
  InputGroup,
  Box,
  Flex,
  Image,
  Input,
  InputRightElement,
  InputLeftAddon,
  Button,
  Text,
  useToast,
  useColorMode
} from '@chakra-ui/react';

const Subscribe = () => {
  const [loading, setLoading] = useState(false);
  const inputEl = useRef(null);
  const nameInputEl = useRef(null);
  const toast = useToast();
  const { colorMode } = useColorMode();
  const bgColor = {
    light: 'blue.100',
    dark: 'blue.800'
  };
  const borderColor = {
    light: 'blue.200',
    dark: 'blue.800'
  };
  const bgInputColor = {
    light: 'white',
    dark: 'blue.800'
  }

  const subscribe = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: inputEl.current.value,
        first_name: nameInputEl.current.value,
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
    nameInputEl.current.value = '';
    toast({
      title: 'Success!',
      description: 'Enhorabuena! Te acabas de suscribir.',
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  };

  return (
    <Box
      border="1px solid"
      borderColor={borderColor[colorMode]}
      bg={bgColor[colorMode]}
      borderRadius={32}
      padding={12}
      my={4}
      w="100%"
    >
      <Flex align="center" justify="center" flexDirection="column">
        <Heading as="h5" size="lg" mb={2}>
          Suscríbete a mi Newsletter Manteniendo Código
        </Heading>
        <Box w={{ base: "50%", sm: "40%", md: "20%" }} my={{ base: 4, md: 4 }}>
          <Image src="/static/images/newsletter/art.png" size="100%" rounded="1rem" />
        </Box>
      </Flex>
      <Text>
        Recibe emails sobre cómo hacer mejor código para mantener nuestro software sin sufrir, cómo mejorar en tu carrera profesional como Frontend, y cómo influye nuestra salud en todo esto. 
      </Text>
      <br/>
      <Text>
        Pero prometo no hacerlo demasiado frecuente para no llenarte la bandeja de entrada. 💌
      </Text>
      <InputGroup size="md" mt={4}>
        <InputLeftAddon children="Name" />
        <Input
          aria-label="Name for newsletter"
          bg={bgInputColor[colorMode]}
          placeholder="Fulanito"
          ref={nameInputEl}
          type="text"

        />
        {/* <InputRightElement width="12rem" mr={-8}> */}
        {/* </InputRightElement> */}
      </InputGroup>
      <InputGroup size="md" my={4}>
        <InputLeftAddon children="Email" />
        <Input
          aria-label="Email for newsletter"
          bg={bgInputColor[colorMode]}
          placeholder="hola@fulanito.com"
          ref={inputEl}
          type="email"

        />
        {/* <InputRightElement width="12rem" mr={-8}> */}
        {/* </InputRightElement> */}
      </InputGroup>
      <Button
        isLoading={loading}
        colorScheme="purple"
        onClick={subscribe}
      >
        Subscribe
      </Button>
    </Box>
  );
};

export default Subscribe;
