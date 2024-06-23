# Rick & Morty assignment

# Setup

Docker version 26.1.4, Node.js version 20.14.0

# Development

In project root directory,

## Prepare image

```
$ docker compose -f config/docker/docker-compose.yml --env-file ./env/.env.development up -d
```

## Open running container command line

```
$ docker exec -it rick_and_morty_UI_dev /bin/bash
```

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

### Check prod build in vite server

in container's bash

```
$ npm run build
$ npm run preview
```

open browser and visit,

```
http://localhost:4173
```

## Demonstrate Production

- Create a production image using NGINX server consuming the .rick-and-morty-UI/dist artifacts (created previously by `npm run build`)
- - `$ docker build . -t rick_and_morty_ui_prod`
- Run the container
- - `$ docker run --name rick_and_morty_ui_prod_container -p 80:8080 -it rick_and_morty_ui_prod`
- Open browser in http://localhost/

### Tasks:

- ~~setup api service~~
- ~~setup store/state~~ - **inreview**
- ~~create list~~
- - ~~get last episode's link in list's items~~
- - ~~add status icon in listing (red/green circle)~~
- ~~main page UI design~~ - **inreview**
- ~~create details - UI~~ - **inreview**
- ~~adjust details for edit mode~~ **WIP**
- organize styles - **WIP/inreview**
- ~~add loader~~
- ~~add toast (error handling, edit mode state store notify user)~~
- - ~~use toast for invalid pagination inputs~~
- - ~~use toast for requests errors~~
- ~~create NavComponent (show activePage/total and input)~~
- - ~~currently input is binded on:keydown:enter @TODO: add button to the right of the input~~
- - ~~add validation (before request) in pagin input / sanitize input value~~
- - simplify template properties instead of using pinia state directly

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
