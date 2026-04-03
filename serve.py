"""Local development server for andre.chiquit.ooo."""

from __future__ import annotations

import http.server
import os
import sys
from datetime import datetime
from pathlib import Path


class _Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, fmt: str, *args: object) -> None:
        timestamp = datetime.now().strftime("%H:%M:%S")
        print(f"[{timestamp}] {fmt % args}")

    def log_error(self, fmt: str, *args: object) -> None:
        timestamp = datetime.now().strftime("%H:%M:%S")
        print(f"[{timestamp}] ERROR {fmt % args}", file=sys.stderr)


def main() -> None:
    """Serve the repo root over HTTP on port 8000."""
    os.chdir(Path(__file__).resolve().parent)
    addr = ("", 8000)
    with http.server.ThreadingHTTPServer(addr, _Handler) as httpd:
        port = httpd.server_address[1]
        print(f"Serving at http://127.0.0.1:{port}/  (Ctrl+C to stop)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped.")


if __name__ == "__main__":
    main()
