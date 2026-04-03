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
        with (
            filepath.open("r", encoding="utf-8") as source,
            output_file.open("w", encoding="utf-8") as dest,
        ):
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
