```bash
docker compose up -d
```

```bash
curl localhost:8000
```

```bash
docker compose up --scale whoami=3
```

```bash
docker compose port --index 1 whoami 8000
0.0.0.0:32770
docker compose port --index 2 whoami 8000
0.0.0.0:32769
docker compose port --index 3 whoami 8000
0.0.0.0:32768
```