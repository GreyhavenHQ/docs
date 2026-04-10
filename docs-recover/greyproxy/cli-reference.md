---
id: cli-reference
title: CLI Reference
---

# Greyproxy CLI Reference

## Synopsis

```
greyproxy <subcommand> [flags]
```

## Subcommands

### `greyproxy serve`

Start the proxy server in the foreground.

```bash
greyproxy serve
greyproxy serve -C greyproxy.yml
```

| Flag | Description |
|------|-------------|
| `-C <path>` | Path to a YAML config file. Defaults to the embedded default config. |

The server starts all configured proxy services and the dashboard/API. Press `Ctrl+C` to stop.

---

### `greyproxy install`

Install greyproxy as a persistent background service.

```bash
greyproxy install
greyproxy install -C /etc/greyproxy/greyproxy.yml
```

What `install` does:
1. Copies the binary to `~/.local/bin/greyproxy`
2. Registers a **systemd user service** (Linux) or **launchd user agent** (macOS)
3. Starts the service immediately

The dashboard will be available at [http://localhost:43080](http://localhost:43080) once running.

| Flag | Description |
|------|-------------|
| `-C <path>` | Config file path for the installed service to use |

---

### `greyproxy uninstall`

Stop and completely remove greyproxy: stops the service, removes the systemd/launchd registration, and deletes the binary from `~/.local/bin/`.

```bash
greyproxy uninstall
```

---

### `greyproxy service`

Manage the installed greyproxy service without uninstalling it.

```bash
greyproxy service status
greyproxy service start
greyproxy service stop
greyproxy service restart
```

| Subcommand | Description |
|------------|-------------|
| `status` | Show whether the service is running |
| `start` | Start the service |
| `stop` | Stop the service |
| `restart` | Restart the service |

---

### `greyproxy version`

Print the greyproxy version and exit.

```bash
greyproxy version
```

---

### `greyproxy help`

Show help for any subcommand.

```bash
greyproxy help
greyproxy help serve
```

---

## Default Ports

| Service | Port | Protocol |
|---------|------|----------|
| Dashboard / API | `43080` | HTTP + WebSocket |
| HTTP Proxy | `43051` | TCP |
| SOCKS5 Proxy | `43052` | TCP |
| DNS Proxy | `43053` | UDP |

These can be changed in a custom config file passed with `-C`. See [Configuration](./configuration).

## Service File Locations

After `greyproxy install`:

| Platform | Service type | Location |
|----------|-------------|----------|
| Linux | systemd user unit | `~/.config/systemd/user/greyproxy.service` |
| macOS | launchd user agent | `~/Library/LaunchAgents/co.greyhaven.greyproxy.plist` |

You can inspect or modify these files manually if needed.

## Examples

```bash
# Start in foreground with default config
greyproxy serve

# Start with a custom config file
greyproxy serve -C ~/my-greyproxy.yml

# Install as a service (starts automatically on login)
greyproxy install

# Check service status
greyproxy service status

# View logs (Linux systemd)
journalctl --user -u greyproxy -f

# View logs (macOS)
tail -f ~/Library/Logs/greyproxy.log
```
