TODO:


### Wipe the database

Run these 2 commands to reset database

```
podman-compose down -v
```

```
podman-compose up -d
```

### Restart frontend after code changes

```
podman-compose stop frontend && podman-compose up -d frontend
```