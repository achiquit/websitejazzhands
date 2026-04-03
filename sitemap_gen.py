"""Generate sitemap.txt and print site statistics for andre.chiquit.ooo."""

from __future__ import annotations

import sys
from pathlib import Path

BASE_URL = "https://andre.chiquit.ooo"
SITEMAP_FILE = Path("sitemap.txt")
QUOTES_FILE = Path("quotes.txt")


def generate_sitemap(root_dir: Path = Path()) -> list[str]:
    """Walk the directory tree and collect URLs for pages containing index.html."""
    urls: list[str] = []
    for dirpath, _dirnames, filenames in root_dir.walk():
        if "index.html" in filenames:
            relative = dirpath.relative_to(root_dir)
            url_path = "/".join(relative.parts)
            url = f"{BASE_URL}/{url_path}/" if url_path else f"{BASE_URL}/"
            urls.append(url)
    return sorted(urls)


def count_quotes(quotes_file: Path = QUOTES_FILE) -> int:
    """Count lines in the quotes file, returning 0 on error."""
    try:
        return sum(1 for _ in quotes_file.open())
    except OSError as exc:
        print(f"Warning: could not read {quotes_file}: {exc}", file=sys.stderr)
        return 0


def write_sitemap(urls: list[str], sitemap_file: Path = SITEMAP_FILE) -> None:
    """Write URLs to sitemap file, one per line."""
    try:
        sitemap_file.write_text("\n".join(urls) + "\n", encoding="utf-8")
    except OSError as exc:
        print(f"Error: could not write {sitemap_file}: {exc}", file=sys.stderr)
        raise


def main() -> None:
    """Entry point: generate sitemap.txt and print statistics."""
    urls = generate_sitemap()
    write_sitemap(urls)
    print("Sitemap Updated! :)")
    print()
    print("=+=+=+=+=+=+=+=--- By The Numbers ---=+=+=+=+=+=+=+=")
    print()
    print(f"Total Webpages: {len(urls)}")
    print(f"Total Quotes: {count_quotes()}")


if __name__ == "__main__":
    main()
