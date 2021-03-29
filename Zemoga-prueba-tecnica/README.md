# Front end Zemoga-Vote-App

##### Created by Oscar Arcos

Repository to structure the test front end for Zemoga

## Project description

The project is a nuxt project, so most of the folders are Nuxt-related folders.

- assets: Contains static files such as images, css, etc.
- components: The components of the application are written here, these are components that the different `pages` use to build the application in a modular way
- layouts: They specify a general structure for one or many pages.
- middleware: They specify functions to be executed before entering a page
- pages: Specify the different paths of the page, they contain additional functionalities than components.
- plugins: They specify libraries to be used globally, it is also used to configure libraries without SSR
- server: Contains the server that will be executed to serve the web page and perform SSR during development
- static: Contains static files that are not compiled, for example the favicon.
- store: Contains a vuex store, organized in a modular way
- nuxt.config.js: Defines the basic information of the nuxt project, for example if it is going to be compiled as a spa or as an SSR. It also defines the plugins to be used and their different configurations. This is also where the `head` of the html that is served is configured

For more information see the README.md of each folder

The project must meet eslint and prettier standards for nuxt for it to run. For this it is recommended to use vscode, install the eslint and prettier vscode extensions and leave prettier as the "default format"
(Right click, format document with, configure default formatter, prettier)

## Base technologies

NuxtJS is being used, which is a framework based on VueJS. Other libraries are used for additional functionalities

### Choice of technologies

In this video you can see a comparison of Vue with angular and with React: https://www.youtube.com/watch?v=lYWYWyX04JI

The advantage of Nuxt is that it uses VueJS, but extends it in a way that development is easier, for example creating paths based on folders and files defined in pages

To make http requests, the axios plugin for nuxt was chosen, since interceptors can be created for the entire application, for example, in the event that the token expires, one can be created that reads if the response is 401 and retries the request, regardless Wherever the request was sent from

Likewise, it uses eslint and prettier to give a consistent format to the code and consistent with the JS and Nuxt standards.

This project includes other libraries that can be seen in each package.json respectively

## Instructions to execute

### Requirements

- **Node JS**

Verify that nodeJS is installed by running "node -v" in terminal or cmd. It can be downloaded from https://nodejs.org/ (LTS version)

Install the necessary global libraries. For this, the following command must be executed in the terminal with administrator permissions for UNIX systems.

```
npm install -g prettier eslint
```

Later it must be executed in the main folder

```
npm install
```

### Run the project in development

In the main folder you must run

```
npm run dev
```