# websitejazzhands

Static personal website for Andre Chiquito.

## Local Run

```bash
uv run serve
```

Then open `http://127.0.0.1:8000/`.

Do not open pages directly with `file://`. The site uses root-relative paths such as `/header.html`, `/footer.html`, `/quotes.txt`, `/js/script.js`, and `/styles.css`, so it needs to run behind an HTTP server rooted at this directory.

## Python Tooling

The Python scripts in this repo are managed with [uv](https://docs.astral.sh/uv/).

### Setup

Install uv if you don't have it:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Then sync the project (creates `.venv` and installs the `sitemap-gen` entry point):

```bash
uv sync
```

For the YouTube playlist generator (`resources/wild-west/youtube-gen.py`), also install dev dependencies:

```bash
uv sync --group dev
```

### Scripts

| Command | What it does |
|---------|--------------|
| `uv run serve` | Start the local HTTP server at `http://127.0.0.1:8000/` |
| `uv run sitemap-gen` | Regenerate `sitemap.txt` and print site statistics |
| `uv run python resources/wild-west/youtube-gen.py` | Fetch YouTube favorites playlist and write iframes to `favorite_videos.txt` |
| `uv run python legacy-content/port.py` | One-off legacy content migration (not part of normal workflow) |

### Linting and type checking

```bash
uv run ruff check .          # lint
uv run ruff format .         # format
uv run mypy sitemap_gen.py   # type check
```

---

## Dependencies

### Required for local viewing

- `python3` (3.12+) or `uv`
- a browser with internet access

### Runtime dependencies loaded from CDNs

- Tailwind via `@tailwindcss/browser`
- Vue 3
- jQuery
- Font Awesome
- `seedrandom`
- Google Analytics (`gtag.js`)

### Page-specific external services

- `climbing/` uses Bootstrap 4 and DataTables
- `get-updates/` posts to a Mailchimp subscribe form
- some blog/adventure pages use PublicAlbum embeds
- some blog/adventure pages use HTML Comment Box

### Not required

- Node.js / npm / pnpm / yarn / bun
- Docker
- a database

## Repo Structure

- `index.html`: homepage entrypoint
- `header.html`, `footer.html`: shared layout fragments loaded at runtime
- `js/script.js`: shared navigation, footer, quote, and UI behavior
- `styles.css`: global site styles and local font wiring
- `quotes.txt`: source for rotating quotes
- `adventures/`: newer travel and trip content plus templates
- `blog/`: standalone blog posts
- `climbing/`: CSV-backed climbing stats pages
- `legacy-content/`: older pages and migration helpers
- `sitemap_gen.py`: regenerates `sitemap.txt` (run via `uv run sitemap-gen`)
- `update.sh`: owner-facing publish/deploy helper

## Main Workflows

### Local content preview

1. Run `uv run serve` from the repo root.
2. Visit `http://127.0.0.1:8000/`.
3. Navigate from the homepage or open section URLs directly, for example:
   - `/about/`
   - `/adventures/`
   - `/photography/`
   - `/resume/`
   - `/climbing/`
   - `/wild-west/`

### Shared site behavior

Most current pages:

- load `header.html` into `#header`
- load `footer.html` into `#footer`
- fetch quotes from `quotes.txt`
- use `styles.css` for global styling

This behavior is wired in `js/script.js`.

### Climbing pages

The `climbing/` section is still static HTML, but the tables are populated from CSV data in `climbing/data/` using local JavaScript plus CDN-hosted Bootstrap and DataTables assets.

### Content maintenance

- edit HTML content directly in the relevant section directory
- update shared navigation/footer in `header.html` and `footer.html`
- update rotating quotes in `quotes.txt`
- regenerate the sitemap with `uv run sitemap-gen` after adding or removing pages

## Publish / Deployment

The current owner-maintained deploy helper is:

```bash
./update.sh
```

What it does:

1. runs `uv run sitemap-gen`
2. stages and commits changes
3. pushes to the `origin` GitHub remote
4. uses `tailscale ssh` to trigger a remote `update.sh`

This is not required for local development.

### Historical notes from the previous README

Windows-oriented update flow:

```text
Crank up Putty
sudo ./update.sh
```

Linux-oriented update flow:

```bash
sudo tailscale up
ssh 100.66.206.56
sudo ./update.sh
```

Treat those as owner-specific operational notes, not prerequisites for running the site locally.

## Troubleshooting

- If the header or footer does not appear, make sure you started the HTTP server from the repo root.
- If pages look unstyled, check internet access because several CSS/JS dependencies are CDN-hosted.
- If a climbing page is blank, confirm the browser can fetch the CSV files under `climbing/data/`.
