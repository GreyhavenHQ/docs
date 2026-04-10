---
id: concepts
title: Concepts
---

# Concepts

Greywall combines two ideas:

1. **An OS sandbox** to enforce "no direct network" and restrict filesystem operations.
2. **Local filtering proxies** (HTTP + SOCKS5) to selectively allow outbound traffic by domain.

## Network Model

By default, greywall blocks all outbound network access.

When you allow domains, greywall:

- Starts local HTTP and SOCKS5 proxies
- Sets proxy environment variables (`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`)
- Allows the sandboxed process to connect only to the local proxies
- Filters outbound connections by **destination domain**

Greywall can also delegate domain filtering entirely to an external SOCKS5 proxy (like [Greyproxy](../greyproxy)), which gives you a live dashboard and rule engine.

### Localhost Controls

- `allowLocalBinding`: lets a sandboxed process *listen* on local ports (e.g., dev servers).
- `allowLocalOutbound`: lets a sandboxed process connect to host `localhost` services (macOS only; see below).
- `-p/--port`: exposes inbound ports so things outside the sandbox can reach your server.
- `-f/--forward`: forwards a host localhost port *into* the sandbox (Linux only).
- `forwardPorts`: config-file equivalent of `-f` for specifying ports to forward.

These are separate on purpose. A typical safe default for dev servers is:

- allow binding + expose just the needed port(s)
- disallow localhost outbound unless you explicitly need it

### Port forwarding: platform differences

On macOS, the sandbox shares the host network stack, so `allowLocalOutbound: true` is enough for the sandboxed process to reach any host localhost service.

On Linux, the sandbox runs in an isolated network namespace (bubblewrap `--unshare-net`). The host's `localhost` is not reachable from inside the sandbox. To connect to a specific host service, you must explicitly forward its port with `-f` (or `forwardPorts` in the config file).

| Feature | macOS | Linux |
|---------|-------|-------|
| Sandbox connects to host `localhost` | `allowLocalOutbound: true` | `-f <port>` or `forwardPorts: [port]` |
| Host connects to sandbox port | `-p <port>` | `-p <port>` |
| Sandbox listens on local port | `allowLocalBinding: true` | `allowLocalBinding: true` |

For example, connecting to a Postgres server running on port 5432 of the host:

```bash
# macOS: allowLocalOutbound in the config is enough
greywall -- psql -h localhost

# Linux: the specific port must be forwarded
greywall -f 5432 -- psql -h localhost
```

## Filesystem Model

Greywall uses a deny-by-default model for both reads and writes:

- **Reads**: denied by default (`defaultDenyRead` is `true` when not set). Only system paths, the current working directory, and paths listed in `allowRead` are accessible.
- **Writes**: denied by default (you must opt-in with `allowWrite`).
- **denyWrite**: overrides `allowWrite` (useful for protecting secrets and dangerous files).

Use `--learning` mode to automatically discover the read/write paths a command needs and generate a config template. See [Learning Mode](./learning-mode) for details.

Greywall also protects some dangerous targets regardless of config (e.g., shell startup files, git hooks, `.env` files).

## Debug vs Monitor Mode

- `-d/--debug`: verbose output (proxy activity, filter decisions, sandbox command details).
- `-m/--monitor`: show blocked requests/violations only (great for auditing and policy tuning).

Workflow tip:

1. Start restrictive.
2. Run with `-m` to see what gets blocked.
3. Add the minimum domains/paths required.

## Platform Notes

- **macOS**: uses `sandbox-exec` with generated Seatbelt profiles.
- **Linux**: uses `bubblewrap` for namespaces + `socat` bridges to connect the isolated network namespace to host-side proxies.

For the under-the-hood view, see [Architecture](./architecture).
