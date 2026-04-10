---
id: index
title: Greyproxy
sidebar_label: Overview
slug: /greyproxy
---

# Greyproxy

Greyproxy is a managed network proxy with a built-in web dashboard, rule engine, and REST API. It wraps powerful multi-protocol tunneling capabilities with an intuitive management layer for controlling and monitoring network traffic.

Greyproxy is the recommended network proxy companion for [Greywall](/greywall), but it can also be used independently in any environment where you need a transparent proxy with live traffic management.

## Features

- **Web Dashboard** — Real-time overview of proxy traffic, pending requests, and rule management, all served from a single binary
- **Rule Engine** — Define allow/deny rules with pattern matching on container, destination, and port
- **Pending Requests** — Review and approve/deny network requests awaiting a policy decision
- **Multi-Protocol Proxy** — HTTP, SOCKS5, and DNS proxies with forwarding chain support
- **DNS Caching** — Built-in DNS resolution and caching with hostname enrichment on requests
- **REST API** — Full HTTP API for automation and integration
- **Real-Time Updates** — WebSocket-based live updates on the dashboard
- **Single Binary** — Web UI, fonts, icons, and assets are all embedded; no separate frontend to deploy

## Default Ports

| Service       | Port    |
|---------------|---------|
| Dashboard/API | `43080` |
| HTTP Proxy    | `43051` |
| SOCKS5 Proxy  | `43052` |
| DNS Proxy     | `43053` |

The dashboard is available at [http://localhost:43080](http://localhost:43080) once running.

## Relationship with Greywall

Greywall routes all sandboxed network traffic through a SOCKS5 proxy. Greyproxy is the recommended companion that provides:

- A live dashboard showing what traffic greywall is allowing/blocking
- An interactive rule engine to define per-domain policies
- Pending request review — approve or deny traffic in real time

However, **greywall can work with any SOCKS5 proxy**, and **greyproxy can work without greywall** (for example, as a network proxy in containerized environments).

See [Using Greyproxy with Greywall](/greyproxy/using-with-greywall) for integration details.

## Quick Install

```bash
# macOS via Homebrew
brew tap greyhavenhq/tap
brew install greyproxy

# Or install via greywall (installs greyproxy as a dependency)
greywall setup
```

See the [Quickstart](/greyproxy/quickstart) for full installation instructions.

## Acknowledgments

Greyproxy is a fork of [**GOST** (GO Simple Tunnel)](https://github.com/go-gost/gost) by [ginuerzh](https://github.com/ginuerzh). GOST is an excellent and feature-rich tunnel and proxy toolkit written in Go.

For documentation on the underlying proxy and tunnel capabilities, refer to the [GOST documentation](https://gost.run/en/).

Licensed under the [MIT License](https://github.com/GreyhavenHQ/greyproxy/blob/main/LICENSE).
