# San Francisco Street History

A quick history of San Francisco told as a tour of its street and place names.
Each fact is paired with the map location it's about; tap, swipe, or arrow-key
through them.

Live at **[sfstreethistory.com](https://sfstreethistory.com)**.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, static export)
- React 19
- [@vis.gl/react-google-maps](https://visgl.github.io/react-google-maps/) for the map
- [react-swipeable](https://github.com/FormidableLabs/react-swipeable) for touch
- [react-share](https://github.com/nygardk/react-share) for share buttons
- CSS Modules
- Deployed on [Netlify](https://www.netlify.com/) as a static site

## Running locally

```bash
npm install
echo 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here' > .env
npm run dev
```

Open <http://localhost:3000>. You'll need a Google Maps JavaScript API key with
the Maps JavaScript API enabled and `localhost` in its allowed referrers.

## Building

```bash
npm run build
```

Produces a fully static site in `out/`. Every `/street/N/` URL is pre-rendered
to its own HTML file via `generateStaticParams`.

## Editing the slides

Slide content lives in [`data/slides.json`](data/slides.json). Each entry has a
title, HTML text, and a map location:

```json
{
  "title": "Mission Dolores",
  "text": "Mission street is named after the Mission, but the mission isn't on that street…",
  "location": {
    "place": "Misión San Francisco de Asís",
    "center": { "lat": 37.7644, "lng": -122.4267 },
    "zoom": 17
  }
}
```

If you prefer editing in a spreadsheet, there are sync helpers:

```bash
npm run writecsv   # exports data/slides.json → data/SF Street History - slides.csv
npm run readcsv    # imports the CSV back into slides.json
```

Pull requests with new factoids welcome — corrections and additions especially.

## Deploying

The site builds to a static export, so Netlify (or any static host) works.
Configuration is in [`netlify.toml`](netlify.toml). The only environment
variable needed is `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.

## History

The original 2019 version was a five-hour hack on Next.js 9; it was rebuilt
from scratch in 2026 on Next 16 + React 19 with the same data and visual idea.

## License

[MIT](LICENSE) © Laurie Voss
