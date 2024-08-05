---
title: "Por qué usar Testing Library en lugar de Enzyme"
description: "Análisis entre Enzyme y React Testing Library sobre cómo renderizan los componentes y qué se puede hacer con ambas. Buenas prácticas de testing."
date: "2021-02-10T11:35:07.322Z"
image: "/images/enzyme/testing-library-enzyme-es.png"
---

![Testing Library vs Enzyme](/images/enzyme/lab-enzyme.jpg)
<span>Photo by <a href="https://unsplash.com/@nci?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">National Cancer Institute</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

# Por qué usar Testing Library en lugar de Enzyme

La librería de testing creada por Kent C. Dodds y mantenida por su comunidad, Testing Library (no podían haber elegido un mejor nombre) ha tenido un tremendo éxito en la comunidad de desarrollo y aun empezando solo con React, ya existen Testing Libraries para Svelte, Vue, Angular, Cypress, etc. Antes de que existiera, los desarrolladores de React utilizaban Enzyme, creada por AirBnB, como su librería de testing.

En este artículo voy a explicarte qué hacen ambas librerías y por qué elegir Testing Library sobre Enzyme como tu librería de testing en tu stack de desarrollo.

# Enzyme

Enzyme es una librería de utilidades de Testing para React, que hace fácil la lectura del output de nuestros componentes, teniendo una API intuitiva y flexible.

## ¿Cómo renderiza Enzyme un componente?

- Shallow rendering: para limitar el test de un componente a su propia unidad, es decir, un nivel de profundidad, sin incluir nada de lo que está por debajo.

```jsx
const MyComponent = () => {
  return (
    <div>
      <h1>Title</h1>
      <Subcomponent type="info" />
    </div>
  );
};

// output de shallow(<MyComponent />) no renderiza Subcomponent
/*
<div>
	<h1>Title</h1>
	<Subcomponent type="info" />
</div>
*/
```

- Full DOM Rendering: Es la única opción de Enzyme que monta el componente, así que tiene que hacerlo en al menos, algo parecido a un browser, como el JSDOM.
- Static Rendering API: Genera HTML a partir del árbol de React de tu componente, para poder analizar la estructura HTML resultante.

## ¿Qué podemos comprobar y testear con Enzyme?

- Podemos interactuar con los elementos de dentro de nuestro componente como sus props y métodos, incluso hacer que se actualice, de forma imperativa:

```jsx
const wrapper = mount(<SomeComponent />);
act(() => wrapper.prop("handler")());
wrapper.update();
```

- Podemos también setear sus props con `setProps` o sus estado, con `setState`.

```jsx
const wrapper = mount(<Foo name="foo" />);
expect(wrapper.find(".foo")).to.have.lengthOf(1);
expect(wrapper.find(".bar")).to.have.lengthOf(0);
wrapper.setProps({ name: "bar" });
expect(wrapper.find(".foo")).to.have.lengthOf(0);
expect(wrapper.find(".bar")).to.have.lengthOf(1);
```

- Simular algunos eventos.

```jsx
wrapper.find("a").simulate("click");
```

- Desmontar el componente.

```jsx
wrapper.unmount();
```

# Testing Library

Testing Library es un set de utilidades de testing simple y completo que promueve las buenas prácticas del testing. Es una ayuda para testear User Interfaces de forma centrada en el usuario.

## ¿Cómo renderiza React Testing Library un componente?

Hablamos concretamente de React Testing Library, y no de Testing Library a secas, para hacer la comparación con Enzyme, ya que en otro framework, el renderizado sería diferente. React Testing Library usa el mismo método que usamos para renderizar un componente en nuestra aplicación, `ReactDOM.render`.

Esto hace que cuando se renderiza un componente en el test, pasa por los mismos ciclos de vida que pasa cuando se renderiza "en la vida real" ya que se hacen de la misma forma.

React Testing Library te provee de una función `render` que hará este renderizado por ti y te devolvera un tipo de dato que contiene queries para hacerle a este componente.

[Aquí puedes ver dónde se realiza el `render` dentro del código de RTL](https://github.com/testing-library/react-testing-library/blob/master/src/pure.js#L63)

## ¿Qué podemos comprobar y testear con Testing Library?

Testing Library tiene como premisa evitar testear implementaciones, así que lo que podemos hacer es interactuar con el DOM o en React, con el JSDOM. Esto implica que podemos:

- Comprobar que existe un elemento con queries directamente

```jsx
document.querySelector(".component-class");
```

- Lanzar eventos, al igual que se lanzan eventos desde el DOM cuando el usuario interactúa con el componente.

```jsx
fireEvent.click(screen.getByRole("button"));
```

- Comprobar que existe un elemento con las queries recomendadas, para seguir las buenas prácticas, y que las encontramos como respuesta del método render o dentro de un objeto screen, que contiene todo lo que renderizamos en el test. Esto podemos hacerlo de forma síncrona, o asíncrona. El método asíncrono, en realidad internamente, lo intentaría ejecutar varias veces, teniendo un timeout configurable a nivel global o por ejecución.

```jsx
render(<MyComponent />);
screen.getByText("title"); // síncrono. Lanza error si no existe.
screen.queryByText("title"); // síncrono. Devuelve null si no existe.
await screen.findByText("title"); // asíncrono.
```

- Comprobar que un elemento ha dejado de existir en el DOM:

```jsx
await waitForElementToBeRemoved(() => screen.queryByText("the mummy"));
```

Para saber qué query utilizar en cada momento, su documentación nos dice cuáles son las más recomendadas: [https://testing-library.com/docs/queries/about#priority](https://testing-library.com/docs/queries/about#priority)

Si necesitamos debuggear un test porque no sabemos qué se está renderizando y tenemos un árbol demasiado grande, no podremos ver bien el resultado en la terminal y se acabará cortando el árbol. Para ello, han desarrollado una herramienta visual, [Testing Playground](https://testing-playground.com/) donde podemos visualizar nuestro componente (aunque no tenga los estilos demasiado bien) y ver el árbol completo. Para ello, dentro de nuestro test ponemos:

```jsx
screen.logTestingPlaygroundURL();
```

y ya nos saldrá por consola un link que nos llevará a dicha herramienta con nuestro HTML.

# Por qué la comunidad está migrando a Testing Library

Si comparamos la opción de Testing Library con el "mount" de Enzyme, serían las más similares. ¿Por qué entonces la comunidad está eligiendo una frente a la otra?

Pues bien, antes de contestar a esta pregunta, es necesario hacerse otra pregunta.

¿Cuántos usuarios tiene nuestro componente?

En la mayoría de los casos, un componente tendrá dos usuarios:

- Por un lado, el usuario final, que ve nuestra aplicación e interactúa con él.
- El desarrollador que mantiene el código y puede modificarlo, o reutilizarlo en otro sitio.

Cuando agregamos opciones como `shallow` rendering, o mocks para testear nuestro componente de forma aislada, estamos creando un tercer usuario de nuestro componente: el test. Esto implica que este test necesitará mantenimiento, estará de alguna medida enlazado con la implementación, y cuando ésta cambie, tendremos que cambiar nuestro test. Nuestro código se vuelve mucho más mantenible cuando sólo tenemos dos usuarios.

Testing Library directamente no da una opción `shallow` precisamente porque [su premisa es hacer tests de una forma "Behavior Driven"](https://www.giffgaff.io/tech/react-test-driven-development/). Esta forma de testear, aunque parece ser "opinionated", es en realidad la forma más efectiva de testear User Interfaces, [evitando testear implementaciones](https://kentcdodds.com/blog/testing-implementation-details/).

> "We try to only expose methods and utilities that encourage you to write tests that closely resemble how your React components are used."

Tanto es así, que pasó a ser la primera librería de testing recomendada en la documentación oficial de React.

AirBnB, el propio creador de Enzyme, vio el potencial y comenzó su adopción, manteniendo de momento ambas librerías (tenían más de 17000 tests en Enzyme, imposible migrarlo en un commit...). Y [en marzo de 2020 AirBnB anunció que iban a hacer el transfer del ownership de la librería,](https://www.infoq.com/news/2020/03/airbnb-drops-ownership-enzyme/) aunque pensaban seguir contribuyendo.

Algunas de los repositorios Open Source más grandes en Github como Storybook o Gatsby ya usan React Testing Library, y algunas como Material UI están desde abril en proceso de migración.

React va a día de hoy por la v17, y Enzyme, al basarse en la propia implementación de React para poder renderizar, necesita de un "adapter" para funcionar, y todavía no han sacado ninguno oficial para la v17, teniendo que [instalarse un adapter no-oficial](https://www.npmjs.com/package/@wojtekmaj/enzyme-adapter-react-17) para que pueda funcionar con la última versión.

# Mi recomendación

Cada librería tiene su contexto, y hay que entender el contexto y la premisa con la que fueron creadas. La adopción de testear comportamientos por parte de la comunidad es muy grande y es la forma de aportar más valor con tus tests. Yo recomiendo elegir Testing Library para evitar caer en la tentación y testear cosas que no deberías, como props que se pasan de un sitio a otro (estarías testeando la propia implementación de React). Además proporciona una API muy buena e intuitiva para comprobar nuestra UI incluso de forma asíncrona, y la comunidad está haciendo un gran trabajo, extrayendo el core de la librería y sacando a utilidades toda su API para que pueda ser utilizada con cualquier framework. Y también están desarrollando `user-event` una librería que simula los eventos reales que realizaría un usuario como "click", "doble-click", "escribir", etc.

---

Si te ha gustado este artículo, puedes ayudarme dándole visibilidad, compartiéndolo en twitter y siguiéndome para estar al tanto del contenido que voy creando. Si ves que hay alguna errata y quieres colaborar, puedes directamente [hacer una Pull Request](https://github.com/lucbpz/lucasbernalte.com).

🙋‍♂️ Happy Testing!
