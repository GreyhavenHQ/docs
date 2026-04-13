---
id: quickstart
title: Quickstart
---

# Greyproxy Quickstart

## Installation

### Homebrew (macOS)

```bash
brew tap greyhavenhq/tap
brew install greyproxy
```

### Build from Source

```bash
git clone https://github.com/greyhavenhq/greyproxy.git
cd greyproxy
go build ./cmd/greyproxy
```

### Via Greywall

If you're using [Greywall](../greywall), you can install and start greyproxy automatically:

```bash
greywall setup
```

## Install as a Service

Install the binary to `~/.local/bin/` and register it as a systemd user service:

```bash
./greyproxy install
```

This copies the binary, registers a systemd user service, and starts it automatically. The dashboard will be available at [http://localhost:43080](http://localhost:43080).

To remove everything:

```bash
greyproxy uninstall
```

## Run in Foreground

To run the server directly without installing as a service:

```bash
greyproxy serve
```

Or with a custom configuration file:

```bash
greyproxy serve -C greyproxy.yml
```

## Service Management

Once installed, manage the service with:

```bash
greyproxy service status
greyproxy service start
greyproxy service stop
greyproxy service restart
```

## Access the Dashboard

Once running, open [http://localhost:43080](http://localhost:43080) in your browser to access the dashboard.

The dashboard shows:

- Real-time traffic overview
- Pending requests awaiting approval/denial
- Rule management
- Request logs

## Default Ports

| Service       | Port    |
|---------------|---------|
| Dashboard/API | `43080` |
| HTTP Proxy    | `43051` |
| SOCKS5 Proxy  | `43052` |
| DNS Proxy     | `43053` |

## Next Steps

- [Configuration](./configuration) — customize ports, rules, and storage
- [Dashboard](./dashboard) — learn about the web UI
- [REST API](./api) — automate greyproxy
- [Using with Greywall](./using-with-greywall) — integrate with the greywall sandbox
