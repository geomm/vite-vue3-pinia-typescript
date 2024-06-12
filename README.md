# Rick & Morty assignment

# Setup

Docker version 26.1.4, build 5650f9b
Node.js version 20.14.0

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
$ npm run dev
```

### Tasks:

- ~~setup api service~~
- setup store/state - inreview
- ~~create list - wip~~
- - get last episode's link in list's items
- - ~~add status icon in listing (red/green circle)~~
- main page UI design - inreview
- create details - UI design wip
- adjust details for edit mode
- organize styles - wip/inreview
- ~~add loader~~
- add toast (error handling, edit mode state store notify user)
- - use toast for invalid pagination inputs (validate input)
- - use toast for requests errors
- ~~create NavComponent (show activePage/total and input)~~
- - currently input is binded on:keydown:enter @TODO: add button to the right of the input 

---

# rick-and-morty-UI (Vue application)

Files exist in usr/src/rick-and-morty-UI

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

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
