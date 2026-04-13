---
id: import-claude
title: Importing from Claude Code
---

# Importing from Claude Code

If you've been using [Claude Code](https://claude.ai/code) and have built up a set of permission rules through its interactive prompts, you can import those directly into greywall with one command — no manual translation needed.

```bash
greywall import --claude --save
```

## Why This Matters

Claude Code accumulates `Bash(...)`, `Read(...)`, and `Write(...)` permission rules as you work. These rules capture *exactly* what filesystem paths and shell commands your workflow touches. Greywall can read them and convert them to a greywall config, so you can run Claude Code (or any other tool) inside a sandbox that already knows what it needs.

## Usage

```bash
# Preview what would be generated (prints to stdout, no files written)
greywall import --claude

# Save to the default config path
greywall import --claude --save

# Import from a specific Claude Code settings file
greywall import --claude -f ~/.claude/settings.json --save

# Save to a specific output file instead of the default location
greywall import --claude -o ./greywall.json

# Import without extending any template (minimal config, no defaults)
greywall import --claude --no-extend --save

# Extend a specific template instead of the default "code" template
greywall import --claude --extend local-dev-server --save
```

## How Permissions Are Mapped

| Claude Code permission | Greywall config field |
|------------------------|----------------------|
| `Bash(xyz)` — allow | `command.allow: ["xyz"]` |
| `Bash(xyz:*)` — deny | `command.deny: ["xyz"]` |
| `Read(path)` — deny | `filesystem.denyRead: [path]` |
| `Write(path)` — allow | `filesystem.allowWrite: [path]` |
| `Write(path)` — deny | `filesystem.denyWrite: [path]` |
| `Edit(path)` | Same as `Write(path)` |
| `ask` rules | Converted to deny (greywall doesn't support interactive prompts) |

Global tool permissions (bare `Read`, `Write`, `Grep` without a path) are skipped — greywall uses path-based and command-based rules.

## Default Template Extension

By default, imports extend the `code` built-in template, which provides:

- Filesystem protections for secrets and sensitive paths (`.env`, SSH keys, etc.)
- Command restrictions for dangerous operations (`rm -rf /`, `git push`, etc.)

This means your imported config inherits a safe baseline and only adds your project-specific permissions on top.

Use `--no-extend` if you want a completely minimal config:

```bash
greywall import --claude --no-extend --save
```

Or choose a different base template:

```bash
greywall import --claude --extend local-dev-server --save
```

## Example Output

Running `greywall import --claude` might produce something like:

```jsonc
{
  "extends": "code",
  "filesystem": {
    "allowWrite": [
      ".",
      "~/.cache/claude",
      "~/.config/claude",
      "~/.local/state/claude"
    ],
    "denyRead": [
      "~/.ssh/id_*",
      ".env",
      ".env.*"
    ]
  },
  "command": {
    "allow": [
      "git push origin docs"
    ],
    "deny": [
      "npm publish"
    ]
  }
}
```

## Workflow

The typical workflow after importing is:

```bash
# 1. Import existing Claude Code permissions
greywall import --claude --save

# 2. Review the generated config
cat ~/.config/greywall/greywall.json

# 3. Run Claude Code sandboxed — greywall auto-loads the config
greywall -- claude

# 4. Use monitor mode to catch anything that's missing
greywall -m -- claude
```

## Where Is Claude Code's Settings File?

Greywall looks in the default Claude Code location automatically. You can find it at:

- `~/.claude/settings.json` (Linux/macOS)

If Claude Code is installed in a non-standard location, point to it explicitly:

```bash
greywall import --claude -f /path/to/claude/settings.json
```

## See Also

- [Configuration Reference](./configuration) — full config file documentation
- [Config Templates](./templates) — available built-in templates
- [AI Agent Integration](./agents) — using greywall with coding agents
