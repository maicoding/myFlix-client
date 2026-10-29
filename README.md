# myFlix

A React film catalogue replacing the initial greeting-only screen. Uses a small bundled sample catalogue of classic films; no film API, streaming or account backend is connected.

- Search title, director or year.
- Filter by genre and sort by title or release year.
- Open a keyboard-accessible film detail dialog.
- Add and remove films from a watchlist saved on this device.
- Responsive layouts, empty states and storage-failure feedback.

Poster panels are typographic treatments, not film posters. Runtime variants and film metadata should be checked against a chosen catalogue provider before expanding this into a production film service.

## Development

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

The Vite entry point is the repository-root `index.html`; `src/index.jsx` mounts the app. `src/App.jsx` composes the catalogue and the focused components under `src/components/`. Data and storage helpers live separately. `dist/` contains the reproducible static build. Relative asset paths support subdirectory hosting. Deploy `dist/`; the historical Parcel source HTML and SCSS are unused.

## Privacy

Watchlist IDs are stored in localStorage (`myflix.watchlist.v1`). Clearing site data removes the watchlist. No tracking, login, streaming or external API requests are included.

## Validation

`npm test` covers storage round trips, malformed/unavailable storage and catalogue identifiers. `npm run build` produces the static app. Browser-tested search, filters, sorting, details, Escape, watchlist persistence, empty-state reset and blocked storage at 1440px and 390px. Full WCAG conformance and cross-browser support are not certified.
