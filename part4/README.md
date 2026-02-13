### [Watchtower](https://containrrr.dev/watchtower/)

Watchtower is a tool for automatically updating running Docker containers. It watches for changes in your container images and automatically restarts the containers with the new images, ensuring that your applications are always running the latest version.

Watchtower can be run e.g. using the following Docker Compose file:

```yaml
services:
  watchtower:
    image: containrrr/watchtower
    environment:
      -  WATCHTOWER_POLL_INTERVAL=60 # Poll every 60 seconds
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    container_name: watchtower
```

One needs to be careful when starting Watchtower with docker compose up, since it will try to update every image running on the machine.