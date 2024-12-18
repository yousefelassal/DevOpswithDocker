# Definitions and basic concepts


<div align="center">
  <br />
  <img src="https://github.com/yousefelassal/DevOpswithDocker/assets/76617202/f4711007-4c06-4d37-b8d2-6866f774e643" height="auto" width="500px" />
</div>

## Image and Containers

an image is like a blueprint or template, while a container is an instance of that blueprint or template.

### Image

A Docker image is a file. An image never changes; you can not edit an existing file. Creating a new image happens by starting from a base image and adding new **layers** to it. Images are _immutable_, they can not be changed after they are created.

**Dockerfile**
```Dockerfile
FROM <image>:<tag>

RUN <install some dependencies>

CMD <command that is executed on `docker container run`>
```

### Container

Containers only contain that which is required to execute an application; and you can start, stop and interact with them. They are **isolated** environments in the host machine with the ability to interact with each other and the host machine itself via defined methods (TCP/UDP).

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
| `docker start <container_name_or_id>` | Start an exited container | `docker start <container_id_prefix>` |
| `docker container exec <container>` | Executes a command inside the container | `docker exec` |

If you have hundreds of stopped containers and you wish to delete them all, you should use 
- `docker container prune` (deletes all stopped containers)
- `docker image prune` (remove "dangling" images)
- `docker system prune` (clears almost everything)


# Running and stopping containers

run Ubuntu
```cmd
docker run ubuntu
```
- `-i` (interactive)
- `-t` ([tty](https://itsfoss.com/what-is-tty-in-linux/))

```
docker run -d -it --name looper ubuntu sh -c 'while true; do date; sleep 1; done'
```

- `docker run -d` run container detached.
- `-it` is short for `-i` and `-t` allows you to interact with the container by using the command line.
- Because we ran the container with `--name looper`, we can now reference it easily.


### Let's follow `-f` the output of logs with
```
$ docker logs -f looper
  Thu Mar  1 15:51:29 UTC 2023
  Thu Mar  1 15:51:30 UTC 2023
  Thu Mar  1 15:51:31 UTC 2023
  ...
```

### Let's test pausing the looper without exiting or stopping it.
- `docker pause looper`
- `docker unpause looper`

### attach to the running container from the second terminal using `attach`:
```
$ docker attach looper
  Thu Mar  1 15:54:38 UTC 2023
  Thu Mar  1 15:54:39 UTC 2023
  ...
```
- If we want to attach to a container while making sure we don't close it from the other terminal we can specify to not attach STDIN with `--no-stdin` option.
- start the stopped container with `docker start looper`

### Running processes inside a container with docker exec
execute commands within a running container - `docker exec` command.
```bash
docker exec <CONTAINER> ls -la
```
We can execute the Bash shell in the container in interactive mode and then run any commands within that Bash session:
```bash
docker exec -it <CONTAINER> bash
root@2a49df3ba735:/# ps aux

  USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
  root        64  1.5  0.0   4112  3460 pts/1    Ss   12:36   0:00 bash
  root        80  0.0  0.0   5900  2844 pts/1    R+   12:36   0:00 ps aux
```
we can exit the container with `exit`.

### To terminate the process, stop follows the SIGTERM with a SIGKILL after a grace period. In this case, it's simply faster to use kill.
```
$ docker kill looper
$ docker rm looper
```
- Running the previous two commands is basically equivalent to running `docker rm --force looper`


```
$ docker run -d --rm -it --name looper-it ubuntu sh -c 'while true; do date; sleep 1; done'
```
`--rm` removes the process automatically after it has exited. The `--rm` ensures that there are no garbage containers left behind. It also means that `docker start` can not be used to start the container after it has exited.

### Building Images
We will choose [Alpine](https://www.alpinelinux.org/), a small Linux distribution that is often used to create small images.

```Dockerfile
# Start from the alpine image that is smaller but no fancy tools
FROM alpine:3.19

# Use /usr/src/app as our workdir. The following instructions will be executed in this location.
WORKDIR /usr/src/app

# Copy the hello.sh file from this directory to /usr/src/app/ creating /usr/src/app/hello.sh
COPY hello.sh .

# Alternatively, if we skipped chmod earlier, we can add execution permissions during the build.
# RUN chmod +x hello.sh

# When running docker run the command will be ./hello.sh
CMD ./hello.sh
```

- [docker build](https://docs.docker.com/engine/reference/commandline/build/) | Docker Docs

`docker build` with instructions where to build (`.`) and give it a name (`-t <name>`):
```bash
$ docker build . -t hello-docker
 => [internal] load build definition from Dockerfile                                                                                                                                              0.0s
 => => transferring dockerfile: 478B                                                                                                                                                              0.0s
 => [internal] load metadata for docker.io/library/alpine:3.19                                                                                                                                    2.1s
 => [auth] library/alpine:pull token for registry-1.docker.io                                                                                                                                     0.0s
 => [internal] load .dockerignore                                                                                                                                                                 0.0s
 => => transferring context: 2B                                                                                                                                                                   0.0s
 => [1/3] FROM docker.io/library/alpine:3.19@sha256:c5b1261d6d3e43071626931fc004f70149baeba2c8ec672bd4f27761f8e1ad6b                                                                              0.0s
 => [internal] load build context                                                                                                                                                                 0.0s
 => => transferring context: 68B                                                                                                                                                                  0.0s
 => [2/3] WORKDIR /usr/src/app                                                                                                                                                                    0.0s
 => [3/3] COPY hello.sh .                                                                                                                                                                         0.0s
 => exporting to image                                                                                                                                                                            0.0s
 => => exporting layers                                                                                                                                                                           0.0s
 => => writing image sha256:5f8f5d7445f34b0bcfaaa4d685a068cdccc1ed79e65068337a3a228c79ea69c8                                                                                                      0.0s
 => => naming to docker.io/library/hello-docker
```

Copying files using `docker cp`

```bash
$ docker ps
  CONTAINER ID   IMAGE          COMMAND   CREATED         STATUS         PORTS     NAMES
  9c06b95e3e85   hello-docker   "sh"      4 minutes ago   Up 4 minutes             zen_rosalind
  
$ touch additional.txt
$ docker cp ./additional.txt zen_rosalind:/usr/src/app/
```

`docker diff` to check what has changed
  ```bash
  $ docker diff zen_rosalind
    C /usr
    C /usr/src
    C /usr/src/app
    A /usr/src/app/additional.txt
    C /root
    A /root/.ash_history
  ```
  - A = added, D = deleted, C = changed

`docker commit` save the changes as a _new image_:

```
$ docker commit zen_rosalind hello-docker-additional
  sha256:2f63baa355ce5976bf89fe6000b92717f25dd91172aed716208e784315bfc4fd
$ docker image ls
  REPOSITORY                   TAG          IMAGE ID       CREATED          SIZE
  hello-docker-additional      latest       2f63baa355ce   3 seconds ago    7.73MB
  hello-docker                 latest       444f21cf7bd5   31 minutes ago   7.73MB
```

[ENTRYPOINT](https://docs.docker.com/reference/dockerfile/#entrypoint)

An `ENTRYPOINT` allows you to configure a container that will run as an executable.

`ENTRYPOINT` has two possible forms:

- The exec form, which is the preferred form:
```Dockerfile
ENTRYPOINT ["executable", "param1", "param2"]
```
- The shell form:
```Dockerfile
ENTRYPOINT command param1 param2
```

### [volumes](https://docs.docker.com/engine/storage/volumes/)
So a volume is simply a folder (or a file) that is shared between the host machine and the container. If a file in volume is modified by a program that's running inside the container the changes are also saved from destruction when the container is shut down as the file exists on the host machine.

```
$ docker run -v "$(pwd):/mydir" yt-dlp https://www.youtube.com/watch?v=DptFY_MszQs
```
start a container with `-v` option, that requires an absolute path. We mount our current folder as /mydir in our container, overwriting everything that we have put in that folder in our Dockerfile.


<div align="center">
  <br />
  <img src="https://github.com/user-attachments/assets/20277c3a-88fb-4491-84c4-acdf89201bec" height="auto" width="500px" />
</div>


