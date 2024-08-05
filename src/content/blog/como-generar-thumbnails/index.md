---
title: "Cómo generar thumbnails automáticamente para tu blog con NextJS y Microlink Cards"
description: "Utiliza Microlink Cards como servicio de thumbnails y genera thumbnails online automáticamente para cada artículo de tu blog en NextJS sin morir en el intento"
date: "2021-10-06T00:00:07.322Z"
---

Voy a contarte cómo puedes generar thumbnails automáticamente sin tener que diseñar tú mismo una imagen para cada artículo.
Utilizaremos el servicio que nos da Microlink Cards, y esto te servirá si ya tienes un blog con NextJS o con cualquier otro framework.
En este artículo además veremos concretamente su uso con NextJS para generar un thumbnail el que está generado para este artículo:

![Thumbnail generado automáticamente](/images/como-generar/thumbnail.png)

# TL;DR

1. Entra en https://cards.microlink.io/editor, elige un preset y cambia los parámetros que necesites.
2. Asegúrate de tener un `<head>` configurable en la página de tu artículo.
3. Copia la URL desde el editor de Microlink y úsala en tu componente con la meta etiqueta `og:image`.

# Usando el `<head>` para poner tags correctas para nuestros artículos con NextJS

Si tienes un blog (y sobre todo, presta atención si el blog lo estás desarrollando tú mismo), por cada artículo que escribes deberías tener etiquetas `<meta>` dentro del `<head>` de tu HTML.
Esto es necesario para el SEO de tus artículos. Si quieres que te lean, tendrán que poder buscarte en google, y cuanto mejor sea tu SEO mejor posicionado estarás. Esto no es nada nuevo.
Si utilizas NextJS, ellos mismos tienen un componente que puedes utilizar para agregar cabeceras en cada página, de esta forma:

```jsx
import Head from "next/head";

function IndexPage() {
  return (
    <div>
      <Head>
        <meta property="og:title" content="My new title" key="title" />
      </Head>
      <p>Hello world!</p>
    </div>
  );
}

export default IndexPage;
```

y [puedes ver más sobre esto en su documentación](https://nextjs.org/docs/api-reference/next/head).

En mi caso, estoy utilizando otro componente, NextSEO, que hace un poco la vida más fácil si estás haciendo tu blog con NextJS.
Puedes ver en [el repositorio de este mismo blog](https://github.com/lucbpz/lucasbernalte.com) el uso que hago del mismo. [En el GitHub de NextSEO](https://github.com/garmeeh/next-seo) verás que tienen bastante documentación con muchos ejemplos dependiendo del tipo de contenido. Genial!

Para que veáis un ejemplo sacado de este blog, el componente ya trae las diferentes props que debemos poner, en lugar de preocuparnos por cómo se llaman las meta etiquetas que debemos poner.

```jsx
return (
  <>
    <NextSeo
      title={`${title} – Lucas Bernalte's blog`}
      description={summary}
      canonical={url}
      openGraph={{
        type: "article",
        article: {
          publishedTime,
        },
        url,
        title,
        description: summary,
        images: [featuredImage],
      }}
    />
  </>
);
```

Fijaros en este componente. Tenemos dentro de `openGraph` una propiedad `images` que será donde pongamos las imágenes relacionadas (o solo una, que será el thumbnail).
Si usáramos el componente `<Head>` que nos da NextJS (el primer ejemplo) tendríamos que poner nuestra propia etiqueta para la imagen relacionada, que sería algo así:

```jsx
<Head>
  <meta property="og:image" content="https://link-to-image.png" />
</Head>
```

Tan solo declarando la propiedad `og:image` tendremos un thumbnail para cuando queramos compartir nuestro artículo en redes sociales.

# Testeando que esto funciona _en local_

Una vez que tenemos una página publicada, tenemos herramientas para validar el **Open Graph** de nuestra página, tanto para Facebook como para Twitter:

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

¿Cómo validamos nuestro open graph desde nuestro entorno local?

Para ello usaremos una extensión de Google Chrome llamada [Localhost Open Graph Checker](https://chrome.google.com/webstore/detail/localhost-open-graph-chec/gcbnmkhkglonipggglncobhklaegphgn).

Es una herramienta muy simple que al instalarla, nos saldrá el icono en las extensiones de nuestro Chrome. Cuando queramos hacer una validación del open graph, solo tenemos que hacer 2 cosas:

1. Abrir nuestra página en local.
2. Pulsar sobre el icono de la extensión.

![Localhost](/images/como-generar/localhost-extension.jpg)

La extensión cogerá nuestro HTML, y copiará el `<head>` en una página que subirá temporalmente a una URL. Nos abrirá una página nueva en nuestro navegador donde nos saldrá el enlace para poder copiarlo, así como enlaces a los validadores mencionados anteriormente.

# Microlink Cards como generador de thumbnails

Elegimos usar Microlink Cards para generar las thumbnails [tras leer este thread de Zeno Rocha](https://twitter.com/zenorocha/status/1442864007799402498).
Microlink Cards tiene su propio editor, donde puedes elegir un preset y personalizarlo con tus propios parámetros.

Puedes jugar directamente con los componentes en el editor, pero lo más fácil es directamente cambiar las `query variables` que aparecen debajo del editor.
El preset ya viene con unos parámetros configurables que se añaden como query params a la URL para poder generar el thumbnail con el preset elegido y con nuestra propia personalización.

Veremos que cuando abrimos el editor la URL tiene un formato parecido al siguiente:

- https://cards.microlink.io/editor?preset=dracula

Y al cambiar la variable `title` a "Nuestro título" dentro de las query variables, la URL de nuestro navegador cambia a:

- https://cards.microlink.io/editor?preset=dracula&title=Nuestro+t%C3%ADtulo

Si hacemos click en el botón _Embed_ nos saldrá un popup, donde podremos elegir lo que mejor nos convenga para nuestro blog.

Si usamos el componente propio de NextJS, podemos elegir la opción _SEO tags_ que nos dará algo como esto:

```HTML
<meta name="twitter:card" content="summary_large_image" />
<meta name="image" content="https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Ddracula%26title%3DNuestro%2Bt%25C3%25ADtulo" />
<meta itemprop="image" content="https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Ddracula%26title%3DNuestro%2Bt%25C3%25ADtulo" />
<meta name="twitter:image" content="https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Ddracula%26title%3DNuestro%2Bt%25C3%25ADtulo" />
<meta property="og:image" content="https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Ddracula%26title%3DNuestro%2Bt%25C3%25ADtulo" />
```

Si accedemos a cualquiera de los enlaces que vemos en el `content` vemos que se abre una URL donde se acaba mostrando nuestro thumbnail! 🎉🎉🎉

Si usamos el componente `NextSEO`, tendremos que poner ese enlace dentro del apartado de la imagen:

```jsx
const featuredImage = {
  url: `https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Ddracula%26title%3DNuestro%2Bt%25C3%25ADtulo`,
  alt: title,
};

return (
  <>
    <NextSeo
      title={`${title} – Lucas Bernalte's blog`}
      description={summary}
      canonical={url}
      openGraph={{
        type: "article",
        article: {
          publishedTime,
        },
        url,
        title,
        description: summary,
        images: [featuredImage],
      }}
    />
    // el resto de la página
  </>
);
```

Aunque en realidad queremos que sea dinámico, así que podemos extraer las query variables a un objeto y convertir la URL de la siguiente forma:

```javascript
const microLinkCardParams = {
  title, // nuestro título, que lo obtenemos en nuestra página del blog
};
const searchParams = new URLSearchParams(microLinkCardParams);

const featuredImage = {
  url: `https://i.microlink.io/https%3A%2F%2Fcards.microlink.io%2F%3Fpreset%3Ddracula%26${encodeURIComponent(
    searchParams.toString(),
  )}`,
  alt: title,
};

// mismo return del ejemplo anterior
```

Puedes echar un ojo a [cómo está solucionado en este mismo blog](https://github.com/lucbpz/lucasbernalte.com/blob/main/components/BlogSeo.js) y el código es prácticamente el mismo.

# NOTA: qué hacer si Twitter no muestra el thumbnail.

Una vez terminado todo el proceso y haber testeado en local, me ha pasado que el validador de Twitter no estaba pillando el thumbnail correctamente. Sin embargo, todos los parámetros estaban correctos, la URL era correcta y el validador de Facebook lo pillaba correctamente.
Debe de ser algún bug raro. Para comprobar [cómo lo habían implementado en el hilo que mencionaba anteriormente](https://twitter.com/zenorocha/status/1442864007799402498), me fui directamente a la web de https://draculatheme.com/visual-studio-code y miré la diferencia en las imágenes.

El componente NextSEO sólo agrega un item `og:image` mientras en esta web están todas las etiquetas que genera automáticamente Microlink Cards. Según la documentación de Twitter, con tener una sola `og:image` basta para que detecte el thumbnail, pero en mi caso no estaba funcionando.

La única diferencia notable en el `content` es que la URL a la que estaba apuntando no era la misma. En lugar de apuntar a `i.microlink.io`, está apuntando a `microlink.vercel.app`.

Haciendo este cambio se soluciona el problema! 🎉🎉🎉

Ya tendríamos thumbnails dinámicos para cada uno de nuestros artículos.

---
