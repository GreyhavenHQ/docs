---
id: api
title: REST API
---

# Greyproxy REST API

Greyproxy exposes a full REST API at `http://localhost:43080` for automation and integration. All dashboard functionality is available through the API.

## Base URL

```
http://localhost:43080
```

## Authentication

The API does not require authentication by default when accessed from localhost.

## Common Endpoints

### Rules

```http
GET    /api/rules          # List all rules
POST   /api/rules          # Create a new rule
DELETE /api/rules/{id}     # Delete a rule
```

### Pending Requests

```http
GET    /api/pending            # List pending requests
POST   /api/pending/{id}/allow # Allow a pending request (adds to rules)
POST   /api/pending/{id}/deny  # Deny a pending request
```

### Logs

```http
GET /api/logs              # List request logs
GET /api/logs?limit=100    # Paginate results
```

### Status

```http
GET /api/status            # Proxy status and uptime
GET /api/health            # Health check endpoint
```

## Rule Format

Rules are JSON objects with the following fields:

```json
{
  "destination": "*.example.com",
  "port": 443,
  "action": "allow"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `destination` | string | Hostname or glob pattern (e.g., `*.example.com`) |
| `port` | int | Port number (0 = any port) |
| `action` | string | `"allow"` or `"deny"` |

## Example: Add an Allow Rule

```bash
curl -X POST http://localhost:43080/api/rules \
  -H "Content-Type: application/json" \
  -d '{"destination": "registry.npmjs.org", "port": 443, "action": "allow"}'
```

## Example: List Pending Requests

```bash
curl http://localhost:43080/api/pending
```

## WebSocket

The dashboard uses a WebSocket connection at `/ws` for real-time updates. You can connect to this endpoint for live traffic notifications in your own tooling.

:::note
The full API specification is embedded in the greyproxy binary and served at `http://localhost:43080/api/docs` when the server is running.
:::
