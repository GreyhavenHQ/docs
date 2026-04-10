---
id: architecture
title: Architecture
---

# Architecture

Greywall restricts network, filesystem, and command access for arbitrary commands. It works by:

1. **Blocking commands** via configurable deny/allow lists before execution
2. **Routing network traffic** through an external SOCKS5 proxy (e.g., [Greyproxy](../greyproxy)) via transparent TUN-based proxying
3. **Sandboxing processes** using OS-native mechanisms (macOS sandbox-exec, Linux bubblewrap)
4. **Sanitizing environment** by stripping dangerous variables (LD_PRELOAD, DYLD_INSERT_LIBRARIES, etc.)

```mermaid
flowchart TB
    subgraph Greywall
        Config["Config<br/>(JSON)"]
        Manager
        CmdCheck["Command<br/>Blocking"]
        EnvSanitize["Env<br/>Sanitization"]
        Sandbox["Platform Sandbox<br/>(macOS/Linux)"]
    end

    subgraph External
        Proxy["SOCKS5 Proxy<br/>(e.g. Greyproxy)"]
        DNS["DNS Server"]
    end

    Config --> Manager
    Manager --> CmdCheck
    CmdCheck --> EnvSanitize
    EnvSanitize --> Sandbox
    Sandbox -->|tun2socks| Proxy
    Sandbox -->|DNS bridge| DNS
```

## Project Structure

```text
greywall/
├── cmd/greywall/           # CLI entry point
│   └── main.go
├── internal/               # Private implementation
│   ├── config/             # Configuration loading/validation
│   ├── platform/           # OS detection
│   ├── proxy/              # GreyProxy detection, installation, and lifecycle
│   └── sandbox/            # Platform-specific sandboxing
│       ├── manager.go      # Orchestrates sandbox lifecycle
│       ├── macos.go        # macOS sandbox-exec profiles
│       ├── linux.go        # Linux bubblewrap + socat bridges
│       ├── linux_seccomp.go
│       ├── linux_landlock.go
│       ├── linux_ebpf.go
│       ├── command.go      # Command blocking/allow lists
│       ├── hardening.go    # Environment sanitization
│       └── utils.go
└── pkg/greywall/           # Public Go API
    └── greywall.go
```

## Core Components

### Config (`internal/config/`)

Handles loading and validating sandbox configuration:

```go
type Config struct {
    Network    NetworkConfig    // Proxy URL, DNS, localhost controls
    Filesystem FilesystemConfig // Read/write restrictions
    Command    CommandConfig    // Command deny/allow lists
    AllowPty   bool             // Allow pseudo-terminal allocation
}
```

- Loads from XDG config dir or custom path
- Falls back to restrictive defaults
- Validates paths and normalizes them

### Sandbox (`internal/sandbox/`)

#### macOS Implementation

Uses Apple's `sandbox-exec` with Seatbelt profiles. Network traffic is routed via proxy environment variables (`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`).

```mermaid
flowchart LR
    subgraph macOS Sandbox
        CMD["User Command"]
        SE["sandbox-exec -p profile"]
        ENV["Environment Variables<br/>HTTP_PROXY, HTTPS_PROXY<br/>ALL_PROXY"]
    end
    CMD --> SE
    SE --> ENV
```

#### Linux Implementation

Uses `bubblewrap` (bwrap) with network namespace isolation and transparent SOCKS5 proxying:

```mermaid
flowchart TB
    subgraph Host
        PROXY["External SOCKS5 Proxy<br/>(:43052)"]
        PSOCAT["socat<br/>(proxy bridge)"]
        USOCK["Unix Sockets"]
    end

    subgraph Sandbox ["Sandbox (bwrap --unshare-net)"]
        CMD["User Command"]
        TUN["tun2socks<br/>(TUN device)"]
        ISOCAT["socat<br/>(relay)"]
    end

    PROXY <--> PSOCAT
    PSOCAT <--> USOCK
    USOCK <-->|bind-mounted| ISOCAT
    CMD -->|all traffic| TUN
    TUN --> ISOCAT
```

With `--unshare-net`, the sandbox has its own isolated network namespace. Unix sockets provide cross-namespace communication. If TUN is unavailable, greywall falls back to proxy environment variables.

## Execution Flow

```mermaid
flowchart TD
    A["1. CLI parses arguments"] --> B["2. Load config"]
    B --> C["3. Create Manager"]
    C --> D["4. Manager.Initialize()"]
    D --> E["5. Manager.WrapCommand()"]
    E --> E0{"Check command deny/allow"}
    E0 -->|blocked| ERR["Return error"]
    E0 -->|allowed| F["6. Sanitize env"]
    F --> G["7. Execute wrapped command"]
    G --> H["8. Manager.Cleanup()"]
```

## Platform Comparison

| Feature | macOS | Linux |
|---------|-------|-------|
| Sandbox mechanism | sandbox-exec (Seatbelt) | bubblewrap + Landlock + seccomp |
| Network isolation | Syscall filtering | Network namespace |
| Proxy routing | Environment variables | tun2socks + socat bridges |
| Filesystem control | Profile rules | Bind mounts + Landlock (5.13+) |
| Violation monitoring | log stream | eBPF |

See [Linux Security Features](./linux-security-features) for details on the Linux security layer stack.
