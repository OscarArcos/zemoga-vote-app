# Front end Zemoga-Vote-App

##### Created by Oscar Arcos

Repositorio para estructurar el front end de la prueba para Zemoga

## Descripción del proyecto

El proyecto es un proyecto de nuxt, por lo que la mayoría de carpetas son carpetas relacionadas con Nuxt.

- assets: Contiene archivos estáticos como imágenes, css, etc.
- components: Aquí se escriben los componentes de la aplicación, estos son, componentes que las distintas `pages` utilizan para construir de manera modular la aplicación
- layouts: Especifican una estructura general para una o muchas páginas.
- middleware: Especifican funciones para ser ejecutadas antes de entrar a una página
- pages: Especifica las diferentes rutas de la página, contienen funcionalidades adicionales que components.
- plugins: Especifican librerías para ser utilizadas de manera global, también se utiliza para configurar librerías sin SSR
- server: Contiene el servidor que se va a ejecutar para servir la página web y realizar SSR durante desarrollo
- static: Contiene archivos estáticos que no se compilan, por ejemplo el favicon.
- store: Contiene un store de vuex, organizado de manera modular
- nuxt.config.js: Define la información básica del proyecto de nuxt, por ejemplo si se va a compilar como una spa o como SSR. Define igualmente los plugins que se van a utilizar y sus diferentes configuraciones. Aquí además es donde se configura el `head` del html que se sirve

Para mayor información ver el README.md de cada carpeta

El proyecto debe cumplir con los estándares de eslint y prettier para nuxt para que se pueda ejecutar. Se recomienda para esto utilizar vscode, instalar las extensiones de vscode de eslint y prettier y dejar prettier como el "default formatting"
(Click derecho, format document with, configure default formatter, prettier)

## Tecnologías base

Se está utilizando NuxtJS, el cual es un framework basado en VueJS. Se usan otras librerías para funcionalidades adicionales

### Escogencia de tecnologías

En este video se observa una comparación de Vue con angular y con React: https://www.youtube.com/watch?v=lYWYWyX04JI

La ventaja de Nuxt es que utiliza VueJS, pero lo extiende de manera que el desarrollo es más sencillo, por ejemplo creando rutas en función de carpetas y archivos definidos en pages

Para realizar peticiones http se escogió el plugin axios para nuxt, puesto que se pueden crear interceptors para toda la aplicación, por ejemplo en el caso de que el token expire se puede crear uno que lea si la respuesta es 401 y reintente la petición, independientemente de donde sea que se envió la petición

Así mismo, utiliza eslint y prettier para darle un formato consistente al código y coherente con los estandares de JS y Nuxt.

Este proyecto incluye otras librerías que pueden ser observadas en cada package.json respectivamente

## Instrucciones para ejecutar

### Requisitos

- **Node JS**

Verificar que nodeJS está instalado ejecutando "node -v" en la terminal o cmd. Puede ser descargado de https://nodejs.org/ (versión LTS)

Instalar las librerías globales necesarias. Para eso se debe ejecutar el siguiente comando en la terminal con permisos de administrador para sistemas UNIX.

```
npm install -g prettier eslint
```

Posteriormente se debe ejecutar en la carpeta principal

```
npm install
```

### Correr el proyecto en desarrollo

En la carpeta principal se debe ejecutar

```
npm run dev
```