## Web production setup with Docker

The docker image for webup.js has a three stage build process.

1. dependencies are installed
2. the application is built using the local webup.js files, so make sure you're on the correct branch you want to build.
3. webup.js is run as a next.js application

### Build

To build the webup.js Docker image, run:

```sh
docker build -t webupjs .
```

to override the build args with specific values, use the --build-arg flag as many times as needed. i.e. :

```sh
docker build -t webupjs --build-arg WEBUPJS_APP_CONTEXT=/custom-path .
```

To see all the build args, look into the [Dockerfile](../Dockerfile)

### Run

To run webup.js in Docker exposed on a specific port, run:

```sh
docker run --name webupjs -dp [PORT]:3000 webupjs
```

To specify any environment variable, use the `-e` flag as many times as needed. i.e. :

```sh
docker run --name webupjs -dp [PORT]:3000 -e WEBUPJS_CONFIG_URL=/app/config.json webupjs
```

To mount local directories or files into the container as volumes, use the `-v` flag as many times as needed. i.e. :

```sh
docker run --name webupjs -dp [PORT]:3000 -v .env:/app/.env webupjs
```

## Docker Compose setup

To run webup.js and openproxy with docker compose, make sure to clone both repositories in the same directory.
Then, edit the `docker-compose.yml` file to make sure the build args, volumes and environment variables are correctly configured for your installation.

#### Build images

Build both Docker images with the command:

`docker compose build`

#### Start or update containers

To start the containers (or update them after rebuilding the image), run:

`docker compose up -d`
