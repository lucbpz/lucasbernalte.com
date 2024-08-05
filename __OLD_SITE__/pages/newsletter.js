import React from "react";
import { NextSeo } from "next-seo";
import {
  Heading,
  Text,
  Flex,
  Stack,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

import Container from "../components/Container";
import NewsletterItem from "../components/NewsletterItem";
import Subscribe from "../components/Subscribe";

import { MAX_WIDTH } from "../lib/constants";

const url = "https://lucasbernalte.com/blog";
const title = "Blog – Lucas Bernalte";
const description =
  "Artículos sobre desarrollo web, Frontend, JavaScript, React, desarrollo personal y algunas cosas más";

const Highlighted = ({ children, ...props }) => (
  <Text
    width="fit-content"
    display="inline"
    sx={{
      background: "linear-gradient(120deg, #e4a0a1 0%, #e4a0a1 100%)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 40%",
      backgroundPosition: "0 90%",
    }}
    {...props}
  >
    {children}
  </Text>
);

const Newsletter = ({ newsletters }) => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
        }}
      />
      <Container>
        <Stack
          as="main"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="2rem auto 2rem auto"
          maxWidth={MAX_WIDTH}
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
              Manteniendo Código - La Newsletter
            </Heading>
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            mt={8}
          >
            <Heading letterSpacing="tight" mt={8} mb={6} as="h2" size="xl">
              ¿Por qué "Manteniendo Código"?
            </Heading>
            <Text mb={8} textStyle="p">
              La mayoría de desarrolladores mantenemos código en nuestro día a
              día. A medida que vamos ganando experiencia, queremos seguir
              mejorando lo que hacemos y a la vez progresar en nuestra carrera.
              Reflexionar sobre algunos temas es determinante para evitar poner
              el piloto automático y poder seguir mejorando en nuestra carrera.
              Te ayudaré a tener más herramientas a la hora de programar y saber
              cuáles pueden ser los siguientes pasos a mejorar.
            </Text>
            <List spacing={3} mb={8}>
              <ListItem>
                <Text textStyle="p">
                  <ListIcon
                    fontSize="18px"
                    as={MdCheckCircle}
                    color="green.500"
                  />
                  <strong>Better Code</strong>: Cómo hacer un código más simple
                  para que pueda mantenerse mejor, y sea más resiliente a
                  cambios.
                </Text>
              </ListItem>
              <ListItem>
                <Text textStyle="p">
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  <strong>Developer Growth</strong>: Cuáles son los siguientes
                  pasos en mi carrera profesional y qué puedo hacer ahora para
                  seguir desarrollando skills que no sean técnicas.
                </Text>
              </ListItem>
              <ListItem>
                <Text textStyle="p">
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  <strong>Wellbeing</strong>: Mejorar nuestra salud, que
                  mejorará nuestro foco, nos ayudará a gestionar mejor el estrés
                  y nos sentiremos mejor con nosotros mismos, haciendo que
                  tengamos más confianza.
                </Text>
              </ListItem>
            </List>
            <Subscribe />
            <Heading letterSpacing="tight" mt={16} mb={8} as="h2" size="xl">
              Archivo
            </Heading>
            {newsletters.map((item, index) => (
              <NewsletterItem
                key={item.id}
                num={newsletters.length - index}
                title={item.title}
                url={item.url}
                date={item.sent_at}
              />
            ))}
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export async function getStaticProps() {
  try {
    const API_KEY = process.env.REVUE_API_KEY;
    const response = await fetch("https://www.getrevue.co/api/v2/issues", {
      headers: {
        Authorization: `Token ${API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (response.status >= 400) {
      const text = await response.text();
      return res.status(400).json({
        error: text,
      });
    }

    const data = await response.json();
    return { props: { newsletters: data }, revalidate: 10 };
  } catch (error) {
    return { props: { newsletters: [] }, revalidate: 10 };
  }
}

export default Newsletter;
