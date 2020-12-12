import React from 'react';
import { NextSeo } from 'next-seo';
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Link,
  IconButton,
  Image,
  Box
} from '@chakra-ui/react';
import { FaVuejs, FaGit, FaReact } from 'react-icons/fa';
import {AiOutlineMail} from 'react-icons/ai';

import Container from '../components/Container';
import { CustomLink } from '../components/MDXComponents';
import {MAX_WIDTH} from '../lib/constants';

const url = 'https://lucasbernalte.com/about';
const title = 'Sobre mí – Lucas Bernalte';

const About = () => {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400'
  };

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title
        }}
      />
      <Container>
        <Stack
          as="main"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="0 auto 4rem auto"
          maxWidth={MAX_WIDTH}
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth={MAX_WIDTH}
          >
            <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
              Sobre mí
            </Heading>
            <Text color={secondaryTextColor[colorMode]} my={4} textStyle="p">
              Hey, I’m Lucas Bernalte. Soy desarrollador web y experto en Frontend 
              con la misión de <strong>ayudar a desarrolladores junior a progresar en su carrera dentro del software</strong>.
              Actualmente trabajo con React y escribo artículos sobre lo relacionado con Front End, lo que "da vida" al software.
            </Text>
            <Image src="static/images/about-me/me.jpg" />
            <Text color={secondaryTextColor[colorMode]} my={4} textStyle="p">
            Cuando me adentré en el mundo del software y comencé a trabajar no sabia realmente qué me esperaba. 
            Pero lo que he encontrado es una oportunidad para desarrollar mi verdadera pasión y también poner mi 
            granito de arena hacia un mundo mejor.
            Para ello, contribuyo al open source, comparto conocimiento y ayudo a otros desarrolladores a convertirse en mejores desarrolladores.
            </Text>
            <Text color={secondaryTextColor[colorMode]} my={4} textStyle="p">
              Pronto esta web se convertirá en un  <strong>digital garden</strong> con artículos y enlaces sobre tecnologías de Frontend
              que servirán de apoyo para poder avanzar en la carrera como desarrollador web. Si quieres formar parte de esta comunidad 
              y ser el primero en enterarte de estas cosas puedes suscribirte a mi newsletter, donde
              publicaré contenido de valor con enlaces a referentes que leo y eventos que pasan en el mundo del Frontend.
              Si quieres apoyarme, <CustomLink href="https://buymeacoffee.com/lucasbernalte">puedes invitarme a un café</CustomLink>.
              La cafeína me dará energía extra para poder seguir trabajando.
            </Text>
            {/* <Heading letterSpacing="tight" mt={8} mb={4} as="h2" size="xl">
              Cómo puedo ayudarte
            </Heading>
            <Heading letterSpacing="tight" mt={8} mb={4} as="h3" size="md">
              Si eres desarrollador junior y quieres progresar
            </Heading>
            <Text color={secondaryTextColor[colorMode]} my={4}>
              Podemos <strong>charlar durante 30'</strong>.
            </Text>
            <Heading letterSpacing="tight" mt={8} mb={4} as="h3" size="md">
              Si tienes un proyecto y quieres trabajar juntos
            </Heading> */}

            <Heading letterSpacing="tight" mt={8} mb={4} as="h2" size="xl">
              Contacto
            </Heading>
            <Text color={secondaryTextColor[colorMode]} my={4} textStyle="p">
              Si tienes una idea o proyecto y quieres que trabajemos juntos, puedes contactar conmigo vía email:<br/>
              <Link href="mailto:hola@lucasbernalte.com" title="Email" isExternal>
                <IconButton
                  aria-label="Email"
                  size="lg"
                  color="gray.500"
                  variant="ghost"
                ><AiOutlineMail /></IconButton>hola@lucasbernalte.com
              </Link>
            </Text>
            <Heading letterSpacing="tight" mt={8} mb={4} as="h2" size="xl">
              Talks
            </Heading>
            <Heading size="md" as="h3" mb={4} fontWeight="medium">
              <Flex align="center">
                Cómo testear con React Testing Library como un usuario
                <Box ml={2}><FaReact color="#61dafb" /></Box>
              </Flex>
            </Heading>
            <Heading size="md" as="h3" mb={4} fontWeight="medium">
              <Flex align="center">
                useState? Redux? Por qué usar React Query para estados asíncronos
                <Box ml={2}><FaReact color="#61dafb" /></Box>
              </Flex>
            </Heading>
            <Heading size="md" as="h3" mb={2} fontWeight="medium">
              <Link
                display="flex"
                href="https://github.com/kgrafico/VUE-nas-formacion"
                isExternal
              >
                <Flex align="center">
                  Introducción a Vue
                  <FaVuejs color="#41B883" />
                </Flex>
              </Link>
            </Heading>
            <Text color={secondaryTextColor[colorMode]} mb={8}>
              Colaboración con VueJS Madrid para iniciar a desarrolladores en el mundo de VueJS, creando una aplicación desde cero,
              creando componentes contenedores y presentacionales, entendiendo el funcionamiento reactivo de Vue y cómo nos podemos
              beneficiar de este framework al ser progresivo. 
            </Text>
            <Heading size="md" as="h3" mb={2} fontWeight="medium">
              <Link
                display="flex"
                href="https://github.com/lucbpz/git-tale"
                isExternal
              >
                <Flex align="center">
                  Git Tale
                  <Box ml={2}><FaGit color="orange" /></Box>
                </Flex>
              </Link>
            </Heading>
            <Text color={secondaryTextColor[colorMode]} mb={8}>
              Taller práctico para aprender a trabajar con Git, en varias ramas, dentro de un equipo trabajando sobre el mismo
              repositorio. Los asistentes escribían un capítulo de un libro en distinto orden, e incluso corrigiendo lo que iban
              subiendo otros, para al final mergearse todo correctamente en master. 
            </Text>            
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default About;