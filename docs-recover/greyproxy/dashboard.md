---
id: dashboard
title: Dashboard
---

# Dashboard

The Greyproxy dashboard is available at [http://localhost:43080](http://localhost:43080) once greyproxy is running. It provides a real-time view of proxy traffic and a management interface for rules and pending requests.

## Dashboard Sections

### Overview

The main dashboard view shows a real-time summary of proxy traffic:

- Active connections
- Recent requests
- Traffic statistics

### Pending Requests

When greywall routes traffic through greyproxy with no matching allow rule, requests can be placed in a "pending" state for interactive review. From the Pending Requests view you can:

- **Approve** a pending request — add the destination to the allow list
- **Deny** a pending request — block the destination
- See which process or container originated the request

This is especially useful during initial setup when you're building up your allow rules.

### Rules

The Rules section lets you manage the allow/deny policy for outbound traffic:

- Add rules matching by destination hostname, port, or pattern
- View and delete existing rules
- Rules are stored in the SQLite database and persist across restarts

### Logs

The Logs section shows a historical record of all proxy requests, including:

- Timestamp
- Source (container/process)
- Destination
- Decision (allowed/denied/pending)

## Real-Time Updates

The dashboard uses WebSocket-based live updates, so you don't need to refresh to see new pending requests or rule changes.

## Single Binary

The entire dashboard — HTML, CSS, JavaScript, fonts, and icons — is embedded in the greyproxy binary. There is no separate frontend server to deploy or configure.
