# Rick & Morty Characters Directory

# Requirements

Docker version 26.1.4, Node.js version 20.14.0

# Development

The workflow is,

- Compose docker Dev environemnt to work
- Jump into that Dev environment
- - Develop and deliver
- - Check Production build process and preview using Vite server
- Build Production docker image
- Run Production docker container for Test (or Produce for delivery)

In project root directory,

# Workflow in detail

## 1. Compose docker Dev environemnt to work

```
$ docker compose -f config/docker/docker-compose.yml --env-file ./env/.env.development up -d
```

## 2. Jump into Dev environment

```
$ docker exec -it rick_and_morty_UI_dev /bin/bash
```

### 2.1 Develop and deliver

in container's bash,

```
$ cd usr/src/rick-and-morty-UI
$ npm i
$ npm run format
$ npm run dev
```

open browser and visit,

```
http://localhost:8080
```

### 2.2 Check Production build process and preview using Vite server

in container's bash

```
$ npm run build
$ npm run preview
```

open browser and visit,

```
http://localhost:4173
```

## 3. Build Production docker image

**From host machine project directory**

- Create a production image using NGINX server consuming the .rick-and-morty-UI/dist artifacts (created previously by `npm run build`)
- - `$ docker build . -t rick_and_morty_ui_prod`

## 4. Run Production docker container for Test (or Produce for delivery)

If the container is already there please remove it, `$ docker container rm rick_and_morty_ui_prod_container `

- Run the container
- - `$ docker run --name rick_and_morty_ui_prod_container -p 80:8080 -it rick_and_morty_ui_prod`

- Open browser in http://localhost/

## Tasks:

- ~~setup api service~~
- ~~setup store/state~~
- ~~create list~~
- - ~~get last episode's link in list's items~~
- - ~~add status icon in listing (red/green circle)~~
- ~~main page UI design~~
- ~~create details - UI~~
- ~~adjust details for edit mode~~
- ~~organize styles~~
- ~~add loader~~
- ~~add toast (error handling, edit mode state store notify user)~~
- - ~~use toast for invalid pagination inputs~~
- - ~~use toast for requests errors~~
- ~~create NavComponent (show activePage/total and input)~~
- - ~~currently input is binded on:keydown:enter @TODO: add button to the right of the input~~
- - ~~add validation (before request) in pagin input / sanitize input value~~
- - ~~simplify template properties instead of using pinia state directly~~

---

## Known Issues

- Material Icon font loading issue while developing (page behaves like CSS is blocking on load), visible in devTools warnings:
- - Failed to decode downloaded font: /material-design-icons/font/MaterialIcons-Regular.woff2
- - OTS parsing error: invalid sfntVersion: 1008813135

## Future improvements:

- Enrich input controls (e.g. add drop down select)
- Improve UX e.g. add focus on 1st input when in edit mode
- Keep Listing Paging - change Listing Paging while navigating though Details, state should be aware of the new Listing Paging in order to go back to that listing (redirecting away from Details)
- While in Details Edit mode a guard should cancel browser back and refresh
- Break down components even more

---

# rick-and-morty-UI (Vue application)

Files exist in usr/src/rick-and-morty-UI

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

Comment
