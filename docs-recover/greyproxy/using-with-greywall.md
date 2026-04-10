---
id: using-with-greywall
title: Using with Greywall
---

# Using Greyproxy with Greywall

Greywall and Greyproxy are two independent products that work especially well together.

## How They Fit Together

[Greywall](../greywall) sandboxes commands by blocking direct network access and routing all traffic through a SOCKS5 proxy. [Greyproxy](/greyproxy) provides that SOCKS5 proxy, plus a live dashboard and rule engine for managing what traffic is allowed.

```
Your command → Greywall sandbox → Greyproxy SOCKS5 → Internet
                                        ↕
                                  Dashboard (port 43080)
                                  Rule engine
                                  Request review
```

## Quickest Setup

Install both with a single command:

```bash
# macOS (Homebrew)
brew tap greyhavenhq/tap
brew install greywall   # installs greyproxy as a dependency

# Or install greywall, then set up greyproxy
greywall setup
```

## Default Integration

By default, greywall routes traffic to greyproxy's SOCKS5 port at `localhost:43052` and DNS at `localhost:43053`:

```json
{
  "network": {
    "proxyUrl": "socks5://localhost:43052",
    "dnsAddr": "localhost:43053"
  }
}
```

These are greywall's defaults — no configuration needed if greyproxy is running on default ports.

## Using a Different SOCKS5 Proxy

Greywall is not locked to greyproxy. You can point it at any SOCKS5 proxy:

```bash
# Use a custom proxy via CLI flag
greywall --proxy socks5://localhost:1080 -- npm install

# Or via config file
```

```json
{
  "network": {
    "proxyUrl": "socks5://my-proxy.example.com:1080"
  }
}
```

## Using Greyproxy Without Greywall

Greyproxy can also be used as a standalone proxy in environments where greywall's filesystem sandboxing isn't needed — for example:

- **Containerized environments**: containers already provide process and filesystem isolation; adding greyproxy gives you network visibility and control
- **Development environments**: use greyproxy's dashboard to monitor and understand traffic patterns
- **CI environments**: route build traffic through greyproxy for auditing and egress control

Simply point any tool that supports HTTP or SOCKS5 proxies at `localhost:43051` (HTTP) or `localhost:43052` (SOCKS5).

## Workflow: Building Your Allow List

A common workflow when introducing greywall + greyproxy to a new project:

1. **Start greyproxy** (`greywall setup` or `greyproxy serve`)
2. **Run your command with monitor mode**: `greywall -m -- npm install`
3. **Watch the dashboard** at `http://localhost:43080` — you'll see pending/blocked requests
4. **Approve the destinations** you want to allow in the dashboard's Pending Requests view
5. **Run again** — approved destinations now pass through automatically

This iterative approach lets you build a minimal, precise allow list rather than guessing upfront.

## Check Status

```bash
# Check greywall dependencies including greyproxy status
greywall check
```
