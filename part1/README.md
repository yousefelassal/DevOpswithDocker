<div align="center">
<img src="https://github.com/yousefelassal/DevOpswithDocker/assets/76617202/f4711007-4c06-4d37-b8d2-6866f774e643" height="auto" width="500px" />
</div>

# Image and Containers

an image is like a blueprint or template, while a container is an instance of that blueprint or template.

### Image

images are _immutable_, they can not be changed after they are created.

### Most used commands

| command | explain | shorthand  |
|---|---|---|
| `docker image ls` | Lists all images | `docker images` |
| `docker image rm <image>` | Removes an image | `docker rmi` |
| `docker image pull <image>` | Pulls image from a docker registry | `docker pull`|
| `docker container ls -a` | Lists all containers | `docker ps -a` |
| `docker container run <image>` | Runs a container from an image | `docker run` |
| `docker container rm <container>` | Removes a container | `docker rm` |
| `docker container stop <container>` | Stops a container | `docker stop`|
| `docker container exec <container>` | Executes a command inside the container | `docker exec` |
