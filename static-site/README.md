# Fix-It First — static build

A static, client-only export of the main app for GitHub Pages, which can't run a Node server or SQLite. It's a snapshot: diagnosis profiles, Bob's FAQ, and site copy are frozen at build time from the same defaults the main app ships with, instead of being read from the live-editable database. No admin panel here — edit the source `.ts` files directly and rebuild if you need to change content.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs to `dist/`, deployed to the `gh-pages` branch of this repo.
