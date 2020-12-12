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

const url = 'https://lucasbernalte.com/inspiration';
const title = 'Inspiration – Lucas Bernalte';

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
              Inspiration
            </Heading>
            <Text color={secondaryTextColor[colorMode]} my={4} textStyle="p">
              Este site está fuertemente inspirado en el sitio de <CustomLink href="https://twitter.com/leeerob">@leeerob</CustomLink>.
              Quería aprender NextJS y quería hacer mi blog con NextJS, y tras ver varios artículos, di con el suyo donde cuenta
              cómo hacer un blog. Hay varias cosas que han cambiado desde ese momento (migración de Chakra, el suyo ahora usa Tailwind...)
              pero el diseño de la mayoría de componentes es suyo. Leerob tiene <CustomLink href="https://masteringnextjs.com/">un curso de NextJS</CustomLink> muy recomendable.
            </Text>
            <Text color={secondaryTextColor[colorMode]} my={4} textStyle="p">
              El background de la página de inicio es inspiración de <CustomLink href="https://jake.nyc/">jake.nyc</CustomLink>. Me encanta y seguramente haga alguna cosa más con esto!
            </Text>
            <Text color={secondaryTextColor[colorMode]} my={4} textStyle="p">
              Viendo otros blogs y portfolios como el de <CustomLink href="https://www.taniarascia.com/">Tania Rascia</CustomLink> me di cuenta de que
              tenía que aumentar el tamaño de fuente.
            </Text>
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default About;