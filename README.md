# Happy Birthday, Gauri 🌙 — Dreamy Sky Edition

A brand new take on the birthday site: soft pastel sky colors, twinkling stars, drifting clouds, and a little "same sky, different cities" illustration to capture the long-distance feeling. Same solid structure as before — separate HTML "slides", one shared stylesheet, small focused JS files, and all your text/photos living in one editable JSON file.

## Folder structure
```
gauri-dreamy-sky/
├── index.html        Slide 1 — hero + countdown + distance illustration + lock
├── thoughts.html      Slide 2 — sweet thought generator
├── memories.html       Slide 3 — photo gallery
├── jukebox.html         Slide 4 — song player
├── surprise.html        Slide 5 — final gift reveal
├── css/style.css       All styling (pastel sky palette, clouds, stars)
├── js/
│   ├── data.js          loads content.json
│   ├── lock.js          locks/unlocks pages based on the date
│   ├── particles.js     twinkling stars + drifting clouds background
│   ├── countdown.js     countdown + unlock celebration (index only)
│   ├── thoughts.js       sweet thought button logic
│   ├── gallery.js        builds the photo grid
│   ├── jukebox.js        play/pause + Spotify embed
│   └── modal.js          final gift modal
├── data/content.json    ← edit THIS for all your text/dates
└── images/               ← put your photos here
```

## 1. Add your content
Open `data/content.json` and edit:
- `birthday.month` / `birthday.day` — month is 0-indexed (0=Jan ... 7=Aug). Already set to **August 26** (`7, 26`).
- `sweetThoughts` — the 6 messages (already filled in, edit freely)
- `memories` — one entry per photo: `src`, `alt`, `caption` — this is where your Snapchat/video-call screenshots and her photos go
- `jukebox.spotifyEmbedUrl` — paste your playlist's embed link (Spotify → Share → Embed playlist → copy the `src="..."` URL)
- `finalSurprise.jewelryImage` — path to your gift photo

## 2. Add your images
Drop your photos into `images/`, matching the filenames referenced in `content.json` (`memory-1.jpg` through `memory-6.jpg`, `jewelry.jpg`), or use your own names and update the JSON to match.

## 3. Test it locally BEFORE uploading
Because the pages `fetch()` the JSON file, **just double-clicking the HTML won't load your content** — browsers block local file fetches. Use a tiny local server instead:

- **Terminal (Mac/Windows/Linux):** `cd` into the folder, run `python3 -m http.server`, open `http://localhost:8000`
- **VS Code:** install "Live Server" extension → right-click `index.html` → "Open with Live Server"
- **Simplest:** just push to GitHub Pages (below) and preview it there

## 4. Host it for free on GitHub Pages
1. Create a new GitHub repo (e.g. `gauri-birthday`)
2. Upload this folder's contents to the repo root
3. Repo **Settings → Pages**
4. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`
5. Live in a minute at `https://yourusername.github.io/gauri-birthday/`

## Notes
- The lock + countdown check the visitor's own device clock — unlocks based on her local time on Aug 26.
- Every page independently re-checks the date, so even if she opens `memories.html` directly, it stays locked until the birthday.
- To preview it unlocked, temporarily change `birthday.month`/`birthday.day` in `content.json` to today's date, refresh, then change it back before sending the real link.
