FROM golang:alpine AS build

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build

FROM alpine:latest

WORKDIR /root/

COPY --from=build /app .

CMD ["./server"]
