---
name: anki
version: "0.1.0"
description: Connect Claude Code to a local Anki instance by registering its MCP bridge server (HTTP transport, http://127.0.0.1:3141/) with the Claude Code CLI. Verifies the bridge is reachable, runs `claude mcp add`, and points you at the resulting `mcp__anki__*` tools for deck/note/review operations.
argument-hint: "[question or action about your Anki decks]"
allowed-tools: Bash, AskUserQuestion
user-invocable: true
---

# /anki

This skill does not talk to Anki itself. It onboards the **Anki MCP bridge** — a
local server, addressed by a separate add-on/process you run alongside Anki,
that exposes deck/note/review operations over MCP — by registering it with the
Claude Code CLI over HTTP transport. Once registered and the harness has
picked up the new server, Anki operations happen through the `mcp__anki__*`
tools the bridge itself exposes, not through anything in this skill.

## Resolve `SKILL_DIR` (do this before any command)

Every `python3 ...` command below runs a bundled script under
`SKILL_DIR/scripts/`. Set `SKILL_DIR` to the absolute path of the directory
containing THIS SKILL.md you just Read — the script is always a direct
sibling of this file (`SKILL_DIR/scripts/setup.py`).

```bash
SKILL_DIR="<absolute path of the directory containing the SKILL.md you Read>"
if [ ! -f "$SKILL_DIR/scripts/setup.py" ]; then
  echo "ERROR: scripts/setup.py not found under SKILL_DIR=$SKILL_DIR" >&2
  exit 1
fi
```

## Step 0 — Setup preflight (runs every `/anki` invocation, silent on success)

```bash
python3 "${SKILL_DIR}/scripts/setup.py" --check
```

Exit codes:

| Exit | Meaning | Action |
|------|---------|--------|
| `0`  | Bridge reachable at `http://127.0.0.1:3141/` AND registered with the CLI | Proceed — use the `mcp__anki__*` tools directly, don't re-run setup |
| `2`  | Registered, but the bridge isn't answering | Anki (or its MCP bridge add-on) isn't running. Tell the user to open Anki with the bridge active, then re-check |
| `3`  | Bridge is reachable, but not yet registered | Run the full setup script (below) to register it |
| `4`  | Neither reachable nor registered | Run the full setup script; it will still register the server, then warn that the bridge itself needs to be started |

On exit `0`, say nothing about setup — go straight to answering the user's request with the Anki tools.

On any non-zero exit, run the full setup to register (idempotent, safe to re-run):

```bash
python3 "${SKILL_DIR}/scripts/setup.py"
```

This prints human-readable status and, if not already registered, runs:

```bash
claude mcp add anki --transport http http://127.0.0.1:3141/
```

**After a fresh registration, the current session does not automatically pick up the new MCP tools.** Tell the user the `anki` MCP server was registered and that they need to restart the Claude Code session (or reconnect MCP servers, if their client supports that) before `mcp__anki__*` tools appear.

If the bridge still isn't reachable after registration, don't loop retrying — tell the user plainly: Anki needs to be running with its MCP bridge add-on active and listening on port 3141, then ask them to try again.

## When to use

- User asks to look up, add, edit, or review Anki cards/notes/decks.
- User pastes the `claude mcp add anki ...` command or asks "how do I connect Claude to Anki".
- `mcp__anki__*` tools are not yet present in the tool list and the user wants to use Anki.

## How to invoke

**Step 1 — preflight** per Step 0 above.

**Step 2 — if tools are available**, use the `mcp__anki__*` tools directly to satisfy the user's request (search notes, add cards, list decks, trigger review, etc.) — consult `ToolSearch` with a query like `select:mcp__anki__*` or a keyword search if the exact tool names aren't already loaded in context. This skill does not wrap or re-implement those operations.

**Step 3 — if tools are still missing after a session restart**, use `AskUserQuestion` or plain text to confirm: is Anki open, is the bridge add-on/process running, is it actually bound to port 3141 (some bridges are configurable)? Re-run Step 0 after any fix.

## Failure modes and handling

- **`claude` CLI not on PATH** → the setup script exits non-zero with a clear stderr message; relay it to the user, don't attempt registration another way.
- **Port 3141 in use by something else / wrong bridge** → `check_reachable` only proves *something* HTTP-speaking is listening, not that it's the Anki bridge. If `mcp__anki__*` tools fail after registration, ask the user to confirm which process owns port 3141.
- **Already registered under a different URL** (e.g. bridge moved to a different port) → `claude mcp add anki ...` will fail if the name is taken with a conflicting config; surface that error and offer to run `claude mcp remove anki` before re-adding, but only after the user confirms.

## Security & Permissions

**What this skill does:**
- Sends a local, unauthenticated HTTP GET to `http://127.0.0.1:3141/` to check whether something is listening (loopback only — never leaves the machine)
- Runs `claude mcp list` and, if needed, `claude mcp add anki --transport http http://127.0.0.1:3141/` to register the bridge with the Claude Code CLI's own MCP config
- Does not read, modify, or transmit any Anki data itself — deck/note/review access happens later, through the `mcp__anki__*` tools the bridge exposes once connected

**What this skill does NOT do:**
- Does not install, start, or configure the Anki MCP bridge add-on itself — that's a prerequisite the user manages
- Does not make any network request beyond loopback (`127.0.0.1`)
- Does not remove or modify any other registered MCP server

**Bundled scripts:** `scripts/setup.py` (reachability check + `claude mcp add` registration). Review before first use to verify behavior.
