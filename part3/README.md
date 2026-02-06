# [Docker Compose](https://docs.docker.com/compose/)

> Docker Compose documentation states that using .yaml extension is preferred over .yml even though both are acceptable. We'll have docker-compose.yaml in use, but you can choose the newest standard for naming, which is compose.yaml.


### Using Dockerfile

```yaml
services:
  yt-dlp-ubuntu:
    image: <username>/<repositoryname>
    build: .
```

File defines now one service that is given name `yt-dlp-ubuntu`.

The value of the key build can be a file system path (in the example it is the current directory `.`) or an object with keys context and dockerfile.

Now we can build and push with just these commands:

```bash
docker compose build
docker compose push
```

### [Volumes](https://docs.docker.com/engine/storage/volumes/#use-a-volume-with-docker-compose)

We will need to add the volume bind mounts. Volumes in Docker Compose are defined with the following syntax location-in-host:location-in-container. Compose can work without an absolute path:

```yaml
services:
  yt-dlp-ubuntu:
    image: <username>/<repositoryname>
    build: .
    volumes:
      - .:/mydir
    container_name: yt-dlp
```

We can also give the container a name it will use when running with container_name. The service name can be used to run the container:

```bash
docker compose run yt-dlp-ubuntu https://www.youtube.com/watch?v=saEpkcVi1d4
```

