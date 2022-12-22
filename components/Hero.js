import React from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

const image = "/static/favicons/lucas-circle.png";

export default function Hero({}) {
  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column", md: "row" }}
      wrap="no-wrap"
      minH="30vh"
      px={0}
      mb={0}
    >
      <Box w={{ base: "80%", sm: "60%", md: "30%" }} mb={{ base: 12, md: 0 }}>
        <Image src={image} size="100%" rounded="1rem" />
      </Box>
      <Stack
        spacing={4}
        w={{ base: "100%", md: "60%" }}
        align={["center", "center", "flex-start", "flex-start"]}
      >
        <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
          I'm Lucas Bernalte
        </Heading>
        <Text mt={8} fontSize={20} style={{ fontWeight: 300 }}>
          Ingeniero y desarrollador Full Stack en JavaScript con experiencia.
          Trabajo en 🐳 Docker como <strong>Senior Frontend Engineer</strong>.
          Mi misión es ayudar a desarrolladores junior a progresar en su
          carrera, para ello escribo y comparto conocimiento sobre Frontend. La
          tecnología con la que más estoy trabajando es React, así que me verás
          escribiendo sobre ello con mucha frecuencia!
        </Text>
      </Stack>
    </Flex>
  );
}
