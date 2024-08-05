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

const title = "React landing page with Chakra UI";
const subtitle =
  "This is the subheader section where you describe the basic benefits of your product";
const image = "/static/favicons/lucas-circle.png";
const ctaText = "Create your account now";
const ctaLink = "/signup";

export default function Hero({}) {
  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column", md: "row" }}
      wrap="no-wrap"
      minH="70vh"
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
        {/* <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
        >
          {title}
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          {subtitle}
        </Heading>
        <Link to={ctaLink}>
          <Button
            variantColor="primary"
            borderRadius="8px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
            rightIcon="chevron-right"
          >
            {ctaText}
          </Button>
        </Link>
        <Text
          fontSize="xs"
          mt={2}
          textAlign="center"
          color="primary.800"
          opacity="0.6"
        >
          No credit card required.
        </Text> */}
        <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
          I’m Lucas Bernalte
        </Heading>
        <Text mt={8} fontSize={20} style={{ fontWeight: 300 }}>
          Ingeniero y desarrollador Full Stack en JavaScript con experiencia.
          Trabajo en Electronic Arts como <strong>Frontend Engineer</strong>. Mi
          misión es ayudar a desarrolladores junior a progresar en su carrera,
          para ello escribo y comparto conocimiento sobre Frontend. La
          tecnología con la que más estoy trabajando es React, así que me verás
          escribiendo sobre ello con mucha frecuencia!
        </Text>
        {/* <Text mt={4} fontSize={20} style={{fontWeight: 300}}>
            Si ya sabes los conocimientos básicos sobre React y te has preguntado ¿y ahora qué? echa un vistazo a mi blog!
          </Text> */}
      </Stack>
    </Flex>
  );
}
