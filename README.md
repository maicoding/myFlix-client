# myFlix

A React film catalogue connected directly to the community-maintained [Studio Ghibli API](https://ghibliapi.vercel.app/). The catalogue is restricted to that provider's Ghibli film records, rather than a general cinema database. No API key or backend is required. The endpoint returned 22 films when checked on 2026-10-30; the app does not hardcode that count.

- Search English titles, Japanese titles, romanisation, director or year.
- Filter by director; sort by title, oldest first or newest first. The API does not provide genres, so the app does not invent genre classifications.
- View original titles, synopses, running times, directors, producers and source links.
- Display API-provided posters, with typographic fallback if an image fails.
- Save and remove watchlist entries on this device, with persistence after reload.
- Show explicit loading, API error, timeout and retry states. A failed refresh keeps the last successful results visible and labelled; a failed initial load never substitutes sample data.

Previously saved entries from the six-film demo remain available only in the watchlist, labelled as earlier demo entries. They are excluded from the live API catalogue. Unresolved saved IDs are retained and reported. No streaming or user-account service is connected.

## Development

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

The entry point is the repository-root `index.html`. `src/App.jsx` composes the catalogue; `src/film-api.js` validates and normalizes external data; `src/hooks/useFilmCatalogue.js` handles cancellation, refresh and asynchronous state. `src/catalogue.js` implements search, filters, ordering and preservation of saved demo records. Focused display components live under `src/components/`.

`dist/` contains the generated static build. The Pages workflow runs tests, builds, verifies the entry point and publishes `dist` to the root [live URL](https://maicoding.github.io/myFlix-client/). GitHub Pages must use GitHub Actions as its publishing source. The historical Parcel source HTML and SCSS are unused.

## External requests and local data

Film requests go to `https://ghibliapi.vercel.app/films?limit=250` with a 15-second timeout. The API's poster URLs refer to `image.tmdb.org`; only HTTPS poster URLs on that host are accepted. Posters are loaded lazily. Both services receive ordinary browser requests. The app does not include analytics.

Watchlist IDs remain in localStorage (`myflix.watchlist.v1`). Clearing site data removes them. The catalogue is fetched on each visit; there is no persistent offline movie cache. API availability, catalogue completeness, metadata currency and poster availability depend on the provider. This is an unofficial community API, not a Studio Ghibli service.

## Validation

`npm test` covers normalized IDs and fields, invalid responses, deduplication, unknown metadata, poster URL validation, HTTP/JSON failures, timeout/cancellation, original-language search, director filters, ordering, preservation of saved demo entries and unavailable/corrupt local storage.

Browser verification covers the actual API, search, director filtering, both date orders, details, Escape/focus restoration, watchlist/reload/removal, empty-state reset, failed API requests and retry, poster fallback, plus desktop and 390px mobile layouts. Test fixtures distinguish failure handling from the separate live-provider checks. Full WCAG and cross-browser certification is not claimed.
