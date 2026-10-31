# Soulbook

A fan-made Deadlock site by ch1ll_vibe: live hero and item tier lists, hero abilities and lore, the full item shop, and a build planner.

Plain HTML, CSS and JavaScript. No build step, no framework. All game data is loaded in the browser from the free community API at https://deadlock-api.com, so stats and items follow Valve's patches automatically.

## Folder layout

```
docs/                  the website (GitHub Pages serves this folder)
  index.html           Meta: hero tier list, hero of the week, winning items
  heroes.html          hero grid with class guides; hero detail with ?id=<hero id>
                       (abilities, base stats, lore, most-played community builds)
  items.html           item shop by cost and type, plus an item tier list (#tiers)
  builds.html          build planner (stages, totals, per-hero drafts, save, share link)
  news.html            weekly news: hand-written posts, official patch notes feed, live weekly numbers
  js/news-data.js      the news posts (edit this file to publish a post)
  balance.html         buffs and nerfs per patch: changes parsed from Valve's notes, verdicts by hand
  js/balance-data.js   verdicts and one-line notes per hero/item per patch (edit after each patch)
  about.html           credits and contact
  css/style.css        the brass & verdigris theme
  js/codex.js          shared header/footer, API loading, caching, helpers
  img/favicon.svg      browser tab icon
design/                canvas pages that draw the channel icon and banners (not published)
serve.ps1              tiny local server for previewing on Windows
```

## Preview locally

The pages fetch data from the API, so open them through a local server rather than double-clicking the files:

```bash
powershell -ExecutionPolicy Bypass -File serve.ps1
```

Then open http://localhost:8765 in a browser.

## Put it online (free)

**GitHub Pages** (this is how Soulbook is hosted)
1. The repository is https://github.com/ch1ll-vibe/Soulbook; the site is the `docs/` folder.
2. In the repository: Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/docs`.
3. The site appears at `https://ch1ll-vibe.github.io/Soulbook/` within a minute or two. `404.html` is picked up automatically for missing pages.
4. To update the site later (a news post, a balance verdict), edit the file, commit and push; Pages redeploys on its own.

**Netlify or Cloudflare Pages**
Drag the `deadlock-codex` folder onto their "deploy a site" page. No configuration needed.

## Publishing a news post

Open `docs/js/news-data.js` and add an entry at the top of the `NEWS` list:

```js
{
  date: '2026-11-07',
  title: 'Patch summary: 7 November',
  tags: ['Patch', 'Meta'],
  body: `<p>What changed, in a few sentences.</p><ul><li><b>Hero:</b> what happened to them.</li></ul>`,
},
```

The page sorts posts by date, shows the newest first and uses the newest date as "Last update". Re-upload the file wherever the site is hosted and the post is live.

## Things you will want to edit

- Contact address (`soulbook.guide@gmail.com`) appears in `about.html` and in the footer in `js/codex.js`; change both if it ever changes.
- `heroes.html`: `CLASSES` holds the hand-written class guides (assassin, brawler, marksman, mystic, support).
- `js/codex.js`: `CACHE_HOURS` controls how long game data is cached in the visitor's browser; bump `CACHE_VERSION` if you change how data is processed.
- `js/codex.js`: `TIER_SHARES` sets the share of heroes or items that land in each tier (S, A, B, C, D).
- `css/style.css`: all colours are variables at the top of the file.

## Notes

- Builds are saved in the visitor's browser (localStorage) and shared as links. Nothing is stored on a server.
- Deadlock has no way to import builds from outside the game; "Copy item list" gives a text list to recreate in the in-game build editor.
- Deadlock and its images belong to Valve. This project is not affiliated with Valve.
