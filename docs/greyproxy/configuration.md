---
id: configuration
title: Configuration
---

# Greyproxy Configuration

Greyproxy ships with a sensible default configuration embedded in the binary. To customize, pass a YAML config file with `-C`:

```bash
greyproxy serve -C greyproxy.yml
```

## Example Configuration

```yaml
greyproxy:
  addr: ":43080"        # Dashboard and API
  db: "./greyproxy.db"  # SQLite database

services:
  - name: http-proxy
    addr: ":43051"
    handler:
      type: http
    listener:
      type: tcp

  - name: socks5-proxy
    addr: ":43052"
    handler:
      type: socks5
    listener:
      type: tcp

  - name: dns-proxy
    addr: ":43053"
    handler:
      type: dns
    listener:
      type: udp
```

## Default Ports

| Service       | Port    | Description |
|---------------|---------|-------------|
| Dashboard/API | `43080` | Web UI and REST API |
| HTTP Proxy    | `43051` | HTTP/HTTPS proxy |
| SOCKS5 Proxy  | `43052` | SOCKS5 proxy (used by greywall) |
| DNS Proxy     | `43053` | DNS proxy and cache |

## Full Configuration Reference

See [`greyproxy.yml`](https://github.com/GreyhavenHQ/greyproxy/blob/main/greyproxy.yml) in the repository for a complete annotated example with all available options.

For underlying proxy and tunnel configuration options, refer to the [GOST documentation](https://gost.run/en/) — greyproxy is built on GOST v3.
