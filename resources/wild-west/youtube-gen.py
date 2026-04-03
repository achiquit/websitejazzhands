"""Generate HTML iframes from a YouTube favorites playlist using yt-dlp."""

from __future__ import annotations

import sys
from pathlib import Path

PLAYLIST_URL = (
    "https://youtube.com/playlist?list=FLsNkuoghnddIhV58-aFWBhw&si=pyp3vspHUoDGcohg"
)
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
        import yt_dlp
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
