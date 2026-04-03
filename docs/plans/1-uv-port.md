# uv + pyproject.toml Migration Plan — websitejazzhands

## Context

This personal static website has three Python utility scripts with zero tooling infrastructure (no pyproject.toml, no requirements.txt, no .venv, no .gitignore). The goal is to introduce `uv` as the project manager with a proper `pyproject.toml`, fix all code quality issues discovered in the audit, and make the deployment pipeline use `uv run` instead of bare `python3`.

uv 0.6.8 is already installed at `~/.local/bin/uv`. Branch `uv-port` is already checked out.

---

## Code Audit

### MAJOR (fix immediately)

| File | Location | Issue |
|------|----------|-------|
| `sitemap-gen.py` | L10–12 | `re.sub("^.", "", root, count=1)` strips first char blindly — fragile URL gen; use `Path.relative_to()` instead |
| `legacy-content/port.py` | L37–47 | `combine_files_at_location` writes to an open file without error handling; partial write corrupts target |
| `legacy-content/port.py` | L34–35 | Bare `except Exception` swallows all errors including KeyboardInterrupt |
| `legacy-content/port.py` | L49–51 | `os.remove()` with no error handling crashes if file is absent |
| `resources/wild-west/youtube-gen.py` | L9,17 | No error handling for network/API calls; crash on private/deleted playlist |
| `resources/wild-west/youtube-gen.py` | L7 | `open('...', 'w').close()` anti-pattern — handle can leak on exception |

### MEDIUM

| File | Issue |
|------|-------|
| `sitemap-gen.py` L5, L23 | File I/O with no try/except |
| All three files | No type hints on any function |
| `youtube-gen.py` | `pytube` is effectively abandoned; replace with `yt-dlp` |
| `port.py` L53–55 | `edit_content()` stub that prints `'fart'` — dead code |

### MINOR

| File | Issue |
|------|-------|
| `sitemap-gen.py` L20, L27 | `f"Total: " + str(x)` — use pure f-string `f"Total: {x}"` |
| `youtube-gen.py` L11–14 | Commented-out dead code block |
| `sitemap-gen.py` L29–30 | Commented-out dead code |

### NITPICKY

| File | Issue |
|------|-------|
| `sitemap-gen.py` L24 | 5-space indent vs 4-space rest of file |
| `sitemap-gen.py` | `"sitemap.txt"`, `"quotes.txt"` hardcoded; should be module constants |
| `youtube-gen.py` L7, L16 | Hardcoded file paths; should be constants |
| `port.py` L39 | Magic number `24`; should be `HEADER_LINES = 24` |

---

## Implementation Plan

### 1. Create `pyproject.toml` (new file)

```toml
[project]
name = "websitejazzhands"
version = "0.1.0"
description = "Personal static website tooling for andre.chiquit.ooo"
license = { text = "MIT" }
requires-python = ">=3.12"
dependencies = []

[project.scripts]
sitemap-gen = "sitemap_gen:main"

[dependency-groups]
dev = [
    "yt-dlp>=2024.1.1",
    "ruff>=0.9.0",
    "mypy>=1.13.0",
]

[tool.uv]
package = true

[tool.ruff]
target-version = "py312"
line-length = 88

[tool.ruff.lint]
select = ["E", "W", "F", "I", "UP", "B", "SIM", "PTH", "RUF"]
ignore = ["ANN101", "ANN102"]

[tool.ruff.lint.isort]
known-first-party = ["sitemap_gen"]

[tool.ruff.format]
quote-style = "double"
indent-style = "space"

[tool.mypy]
python_version = "3.12"
strict = true
warn_return_any = true
warn_unused_configs = true
```

Key decisions:
- `[dependency-groups]` (PEP 735) not `[project.optional-dependencies]` — the 2025/2026 standard for dev deps in non-distributed projects; uv supports natively via `uv sync --group dev`
- `package = true` — required for `[project.scripts]` entry point to install into `.venv/bin`
- `yt-dlp` replaces `pytube` (abandoned; breaks with YouTube API changes)
- No pytest — no tests exist; don't add framework without tests

### 2. Create `.python-version` (new file)

```
3.12
```

Pins uv to Python 3.12.x (minor version only — lets uv use any 3.12.x it finds).

### 3. Create `.gitignore` (new file)

```gitignore
# Python virtual environment
.venv/

# Python bytecode
__pycache__/
*.py[cod]
*.pyo

# uv local cache
.uv/

# macOS
.DS_Store
```

Note: `uv.lock` should NOT be gitignored — commit it for reproducibility.

After creating `.gitignore`, untrack already-committed `__pycache__`:
```bash
git rm -r --cached __pycache__
git rm -r --cached resources/wild-west/__pycache__  # if tracked
```

### 4. Rename `sitemap-gen.py` → `sitemap_gen.py` + full rewrite

**Why rename:** Python module names cannot contain hyphens. The `[project.scripts]` entry `sitemap_gen:main` requires the module name `sitemap_gen`.

```bash
git mv sitemap-gen.py sitemap_gen.py
```

New content for `sitemap_gen.py`:

```python
"""Generate sitemap.txt and print site statistics for andre.chiquit.ooo."""

from __future__ import annotations

import sys
from pathlib import Path

BASE_URL = "https://andre.chiquit.ooo"
SITEMAP_FILE = Path("sitemap.txt")
QUOTES_FILE = Path("quotes.txt")


def generate_sitemap(root_dir: Path = Path(".")) -> list[str]:
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
```

Fixes applied:
- **MAJOR** URL bug: `Path.relative_to()` + `"/".join(parts)` replaces fragile `re.sub("^.", ...)`. Correctly handles root dir (yields empty string → `BASE_URL/`).
- **MEDIUM** File I/O error handling: `write_sitemap` catches `OSError`, prints to stderr, re-raises for non-zero exit. `count_quotes` degrades gracefully.
- **MEDIUM** Type hints: all functions annotated.
- **MINOR** f-string purity: `f"Total Webpages: {len(urls)}"` vs old `f"Total: " + str(count)`.
- **MINOR** Dead commented-out code removed (L29–30).
- **NITPICKY** Constants: `BASE_URL`, `SITEMAP_FILE`, `QUOTES_FILE` at module level.
- **NITPICKY** Indentation: consistent 4-space throughout.
- Output is now `sorted()` for stable diffs in git (os.walk order varies by filesystem).
- `Path.walk()` requires Python 3.12+ — aligned with `.python-version`.

### 5. Rewrite `resources/wild-west/youtube-gen.py`

```python
"""Generate HTML iframes from a YouTube favorites playlist using yt-dlp."""

from __future__ import annotations

import sys
from pathlib import Path

PLAYLIST_URL = "https://youtube.com/playlist?list=FLsNkuoghnddIhV58-aFWBhw&si=pyp3vspHUoDGcohg"
OUTPUT_FILE = Path("resources/wild-west/favorite_videos.txt")

IFRAME_TEMPLATE = (
    '<iframe src="https://www.youtube.com/embed/{video_id}"'
    ' title="YouTube video player" frameborder="0"'
    ' allow="accelerometer; autoplay; clipboard-write; encrypted-media;'
    ' gyroscope; picture-in-picture; web-share"'
    ' referrerpolicy="strict-origin-when-cross-origin"'
    ' allowfullscreen class="lg:h-120"></iframe>'
)


def fetch_video_ids(playlist_url: str) -> list[str]:
    """Fetch video IDs from a YouTube playlist using yt-dlp."""
    try:
        import yt_dlp  # noqa: PLC0415
    except ImportError as exc:
        raise ImportError("yt-dlp is required. Run: uv sync --group dev") from exc

    ydl_opts = {"extract_flat": True, "quiet": True, "no_warnings": True}
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(playlist_url, download=False)
        if info is None or "entries" not in info:
            raise ValueError(f"Could not extract playlist info from {playlist_url}")
        return [entry["id"] for entry in info["entries"] if entry.get("id")]


def build_iframe(video_id: str) -> str:
    """Build an HTML iframe string for a YouTube video."""
    return IFRAME_TEMPLATE.format(video_id=video_id)


def write_iframes(video_ids: list[str], output_file: Path = OUTPUT_FILE) -> None:
    """Write HTML iframes for each video ID to the output file."""
    try:
        with output_file.open("w", encoding="utf-8") as f:
            for video_id in video_ids:
                f.write(build_iframe(video_id) + "\n")
    except OSError as exc:
        print(f"Error: could not write {output_file}: {exc}", file=sys.stderr)
        raise


def main() -> None:
    """Entry point: fetch playlist and write iframe HTML."""
    print(f"Fetching playlist: {PLAYLIST_URL}")
    try:
        video_ids = fetch_video_ids(PLAYLIST_URL)
    except Exception as exc:
        print(f"Error fetching playlist: {exc}", file=sys.stderr)
        sys.exit(1)
    print(f"Found {len(video_ids)} videos. Writing to {OUTPUT_FILE}...")
    write_iframes(video_ids)
    print("Done.")


if __name__ == "__main__":
    main()
```

Fixes applied:
- **MAJOR** `open().close()` anti-pattern removed entirely — `output_file.open("w")` in `write_iframes` handles it atomically.
- **MAJOR** Network error handling: `main()` catches all exceptions from `fetch_video_ids`, prints to stderr, exits with code 1.
- **MEDIUM** `pytube` → `yt-dlp`: actively maintained, stable Python API, handles YouTube changes. `extract_flat=True` fetches metadata only without downloads.
- **MEDIUM** Type hints: all functions annotated.
- **MINOR** Dead commented-out code removed; output now goes to `favorite_videos.txt` (the intended final destination, not `test.txt`).
- **NITPICKY** Constants: `PLAYLIST_URL`, `OUTPUT_FILE`, `IFRAME_TEMPLATE` at module level.
- `import yt_dlp` is inside the function intentionally — this is a dev utility; a top-level import failure prevents even inspection of the module.

### 6. Rewrite `legacy-content/port.py`

```python
"""Port legacy blog content into the redesigned website template.

One-off migration tool — not part of the automated deployment pipeline.
"""

from __future__ import annotations

import re
import shutil
import sys
from pathlib import Path

HEADER_LINES = 24  # Lines to skip in the target template before inserting content


def extract_block(
    filepath: Path,
    start_pattern: str,
    end_pattern: str,
    output_file: Path,
) -> None:
    """Extract lines between regex patterns and write to output_file."""
    inside_block = False
    try:
        with filepath.open("r", encoding="utf-8") as source, \
             output_file.open("w", encoding="utf-8") as dest:
            for line in source:
                if re.search(start_pattern, line):
                    dest.write(line)
                    inside_block = True
                elif re.search(end_pattern, line):
                    dest.write(line)
                    inside_block = False
                elif inside_block:
                    dest.write(line)
    except FileNotFoundError:
        print(f"Error: File not found: {filepath}", file=sys.stderr)
        raise
    except OSError as exc:
        print(f"Error processing {filepath}: {exc}", file=sys.stderr)
        raise


def combine_files_at_location(insert_file: Path, target_file: Path) -> None:
    """Insert contents of insert_file into target_file after HEADER_LINES lines."""
    try:
        target_lines = target_file.read_text(encoding="utf-8").splitlines(keepends=True)
    except OSError as exc:
        print(f"Error reading {target_file}: {exc}", file=sys.stderr)
        raise

    try:
        insert_content = insert_file.read_text(encoding="utf-8")
    except OSError as exc:
        print(f"Error reading {insert_file}: {exc}", file=sys.stderr)
        raise

    header = target_lines[:HEADER_LINES]
    remainder = target_lines[HEADER_LINES:]
    combined = "".join(header) + insert_content + "".join(remainder)

    try:
        target_file.write_text(combined, encoding="utf-8")
    except OSError as exc:
        print(f"Error writing {target_file}: {exc}", file=sys.stderr)
        raise


def reset_from_template(reset_file: Path, template_file: Path) -> None:
    """Overwrite reset_file with a copy of template_file."""
    try:
        shutil.copy2(template_file, reset_file)
    except FileNotFoundError:
        print(f"Error: Template not found: {template_file}", file=sys.stderr)
        raise
    except OSError as exc:
        print(f"Error resetting {reset_file}: {exc}", file=sys.stderr)
        raise


def main() -> None:
    """Run the legacy blog content migration."""
    filepath = Path("legacy-content/blog-2024-postgrad-southwest.html")
    start_pattern = r'^.*id="cochise".*$'
    end_pattern = r"^.*End Spotify embed.*$"
    temp_file = Path("legacy-content/test.txt")
    template_file = Path("adventures/import-template.html")
    target_file = Path("adventures/2023/postgrad/southwest/index.html")

    extract_block(filepath, start_pattern, end_pattern, temp_file)
    reset_from_template(target_file, template_file)
    combine_files_at_location(temp_file, target_file)


if __name__ == "__main__":
    main()
```

Fixes applied:
- **MAJOR** Resource leak: nested `with open()` replaced by single `with filepath.open() as source, output_file.open() as dest:` — both handles close together.
- **MAJOR** Bare `except Exception`: replaced with specific `except FileNotFoundError` + `except OSError`; all exceptions re-raised.
- **MAJOR** Partial write corruption: `combine_files_at_location` now reads both files fully, constructs output in memory, then does a single `write_text()` — atomic at the Python level.
- **MAJOR** `os.remove()` hazard: `reset_from_template` uses `shutil.copy2()` directly — no need to remove first; wraps in try/except.
- **MEDIUM** Type hints: all functions annotated with `Path` parameters.
- **MINOR** Stub `edit_content()` that printed `'fart'` removed.
- **NITPICKY** `HEADER_LINES = 24` named constant replaces magic number.
- Renamed `print_lines_between_patterns` → `extract_block` (describes intent, not implementation).

### 7. Update `update.sh`

Change line 7 only:
```diff
-python3 sitemap-gen.py
+uv run sitemap-gen
```

`uv run` automatically resolves the venv regardless of shell `$PATH` state.

### 8. Bootstrap commands (run after all files are written)

```bash
# Sync the project — creates .venv, installs sitemap-gen entry point
uv sync

# Sync dev deps for youtube-gen.py development
uv sync --group dev

# Untrack committed __pycache__ dirs
git rm -r --cached __pycache__

# Rename script (preserves git history)
git mv sitemap-gen.py sitemap_gen.py

# Verify the entry point works
uv run sitemap-gen

# Lint
uv run ruff check .
uv run ruff format .

# Type check
uv run mypy sitemap_gen.py
```

---

## Critical Files

| Action | Path |
|--------|------|
| Create | `pyproject.toml` |
| Create | `.python-version` |
| Create | `.gitignore` |
| Create (replaces `sitemap-gen.py`) | `sitemap_gen.py` |
| Rewrite | `resources/wild-west/youtube-gen.py` |
| Rewrite | `legacy-content/port.py` |
| Edit L7 | `update.sh` |

## Verification

1. `uv run sitemap-gen` — should regenerate `sitemap.txt` and print webpage + quote counts
2. `git diff sitemap.txt` — verify output is stable (sorted URLs, no regressions)
3. `uv run ruff check .` — zero lint errors
4. `uv run mypy sitemap_gen.py` — zero type errors
5. `./update.sh` dry-run (can abort at git commit) — verify `uv run sitemap-gen` runs correctly via the shell script
