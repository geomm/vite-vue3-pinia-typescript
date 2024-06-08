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

- setup api service
- setup store/state
- setup list
- setup details
- setup details edit mode