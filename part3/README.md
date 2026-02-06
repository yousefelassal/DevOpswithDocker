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
