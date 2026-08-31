#!/usr/bin/env python3
"""Preflight + registration for the local Anki MCP server.

Checks whether an Anki MCP bridge is reachable at MCP_URL and whether it is
already registered with the Claude Code CLI, then registers it if needed.
"""
import argparse
import json
import shutil
import socket
import subprocess
import sys
import urllib.error
import urllib.request

SERVER_NAME = "anki"
MCP_URL = "http://127.0.0.1:3141/"

# Exit codes for --check
EXIT_READY = 0
EXIT_NOT_REACHABLE = 2
EXIT_NOT_REGISTERED = 3
EXIT_NEITHER = 4


def check_reachable(url: str, timeout: float = 2.0) -> bool:
    """True if something HTTP-speaking is listening at url, even if it
    rejects a bare GET (MCP servers typically expect POST)."""
    try:
        urllib.request.urlopen(urllib.request.Request(url, method="GET"), timeout=timeout)
        return True
    except urllib.error.HTTPError:
        return True
    except (urllib.error.URLError, socket.timeout, ConnectionRefusedError, OSError):
        return False


def claude_cli_present() -> bool:
    return shutil.which("claude") is not None


def list_mcp_servers() -> str:
    try:
        result = subprocess.run(
            ["claude", "mcp", "list"], capture_output=True, text=True, timeout=10
        )
        return result.stdout
    except (FileNotFoundError, subprocess.TimeoutExpired):
        return ""


def is_registered(name: str, listing: str) -> bool:
    for line in listing.splitlines():
        head = line.strip().split(":", 1)[0].strip()
        if head == name:
            return True
    return False


def register(name: str, url: str) -> subprocess.CompletedProcess:
    return subprocess.run(
        ["claude", "mcp", "add", name, "--transport", "http", url],
        capture_output=True,
        text=True,
    )


def gather_status() -> dict:
    listing = list_mcp_servers()
    return {
        "mcp_url": MCP_URL,
        "server_name": SERVER_NAME,
        "reachable": check_reachable(MCP_URL),
        "registered": is_registered(SERVER_NAME, listing),
        "claude_cli_present": claude_cli_present(),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="silent exit-code-only preflight")
    parser.add_argument("--json", action="store_true", help="print status as JSON")
    args = parser.parse_args()

    status = gather_status()

    if args.check:
        if status["reachable"] and status["registered"]:
            sys.exit(EXIT_READY)
        if not status["reachable"] and not status["registered"]:
            sys.exit(EXIT_NEITHER)
        if not status["reachable"]:
            sys.exit(EXIT_NOT_REACHABLE)
        sys.exit(EXIT_NOT_REGISTERED)

    if args.json:
        print(json.dumps(status))
        return

    if not status["claude_cli_present"]:
        print("ERROR: 'claude' CLI not found on PATH; cannot register the MCP server.", file=sys.stderr)
        sys.exit(1)

    if status["registered"]:
        print(f"'{SERVER_NAME}' is already registered with the Claude Code CLI.")
    else:
        print(f"Registering '{SERVER_NAME}' MCP server ({MCP_URL}) via `claude mcp add`...")
        result = register(SERVER_NAME, MCP_URL)
        if result.returncode != 0:
            print(f"ERROR: registration failed:\n{result.stderr.strip()}", file=sys.stderr)
            sys.exit(1)
        print(f"Registered. Restart the Claude Code session to load the new MCP tools.")

    if status["reachable"]:
        print(f"{MCP_URL} is reachable.")
    else:
        print(
            f"WARNING: {MCP_URL} is not reachable. Open Anki with its MCP bridge "
            "add-on running, then re-run this check."
        )


if __name__ == "__main__":
    main()
