# MasonPV

Personal local media (photo & video) browser web application.

## Development

### Prerequisites

- Node.js 22+
- npm
- ffmpeg / ffprobe (for video thumbnail generation)

### Setup

```bash
npm install
```

### Running

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

### Configuration

Copy `config.example.json` to `config.local.json` and edit media root directories:

```bash
cp config.example.json config.local.json
```

## Planning

- [Development Plan (Chinese)](docs/local-media-web-plan.md)
