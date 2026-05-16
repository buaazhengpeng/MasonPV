<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

### Overview

MasonPV is a Next.js 16 + TypeScript + Tailwind CSS v4 personal media browser app. It is a single Next.js process serving both frontend and API routes. There is no external database server (SQLite will be embedded) and no Docker dependency.

### Dev server

```bash
npm run dev
```

Runs on `http://localhost:3000` by default.

### Lint / Build

- `npm run lint` — ESLint with Next.js + TypeScript config
- `npm run build` — Production build via Turbopack

### System dependencies

- **ffmpeg / ffprobe** is required for video metadata and thumbnail generation. It is pre-installed in the Cloud Agent VM (`/usr/bin/ffmpeg`).
- **sharp** is an npm dependency (installed via `npm install`); no separate system install needed.

### Project structure

- `app/` — Next.js App Router pages and API routes
- `components/` — UI components (shadcn/ui based)
- `lib/` — Shared utilities, config loader
- `lib/media/` — Media scanning, metadata, thumbnail logic
- `storage/` — Runtime data (thumbnails, DB) — gitignored except `.gitkeep`
- `docs/` — Planning documents
- `config.example.json` — Example config; copy to `config.local.json` for real paths

### Gotchas

- The project uses Tailwind CSS v4 with `@tailwindcss/postcss` (not the legacy `tailwindcss` PostCSS plugin or `tailwind.config.js`). There is no `tailwind.config.ts`; theme customization lives in `app/globals.css`.
- shadcn/ui components are in `components/ui/` and use the base-nova style.
- `config.local.json` is gitignored — never commit real filesystem paths.
