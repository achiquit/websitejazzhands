"""Local development server for andre.chiquit.ooo."""

from __future__ import annotations

import http.server
import os
import sys
from datetime import datetime


class _Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format: str, *args: object) -> None:  # noqa: A002
        timestamp = datetime.now().strftime("%H:%M:%S")
        print(f"[{timestamp}] {format % args}")

    def log_error(self, format: str, *args: object) -> None:  # noqa: A002
        timestamp = datetime.now().strftime("%H:%M:%S")
        print(f"[{timestamp}] ERROR {format % args}", file=sys.stderr)


def main() -> None:
    """Serve the repo root over HTTP on port 8000."""
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    addr = ("", 8000)
    with http.server.ThreadingHTTPServer(addr, _Handler) as httpd:
        print(f"Serving at http://127.0.0.1:{httpd.server_address[1]}/  (Ctrl+C to stop)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped.")
