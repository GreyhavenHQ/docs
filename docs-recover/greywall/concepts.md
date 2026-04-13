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
- `allowLocalOutbound`: lets a sandboxed process connect to `localhost` services (e.g., Redis/Postgres on your machine).
- `-p/--port`: exposes inbound ports so things outside the sandbox can reach your server.

These are separate on purpose. A typical safe default for dev servers is:

- allow binding + expose just the needed port(s)
- disallow localhost outbound unless you explicitly need it

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
