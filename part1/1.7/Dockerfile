FROM alpine:3.19

WORKDIR /usr/src/app

COPY script.sh .

RUN chmod +x script.sh

RUN apk add curl

CMD ./script.sh
