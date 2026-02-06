# deployment process

- cd to where `Dockerfile` is and build the app
  ```
  docker build -t <name> .
  ```
- tag the new build
  ```
  docker tag <name> <reg>/<name>:<major>.<minor>
  ```
- push the new tag to the registery
  ```
  docker push <reg>/<name>:<major>.<minor>
  ```
