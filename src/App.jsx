import React, { useState } from "react";
import { movies } from "./movies";
import { readWatchlist, saveWatchlist } from "./storage";
import { MovieRow } from "./components/MovieRow";
import { MovieDialog } from "./components/MovieDialog";
const genres = [...new Set(movies.map((m) => m.genre))].sort();
export default function App() {
  const [saved, setSaved] = useState(readWatchlist),
    [query, setQuery] = useState(""),
    [genre, setGenre] = useState("all"),
    [view, setView] = useState("all"),
    [sort, setSort] = useState("title"),
    [selected, setSelected] = useState(null),
    [notice, setNotice] = useState("");
  function toggle(id) {
    const next = saved.includes(id)
      ? saved.filter((x) => x !== id)
      : [...saved, id];
    setSaved(next);
    setNotice(
      saveWatchlist(next)
        ? "Watchlist updated."
        : "Browser storage is unavailable. Your watchlist will last until this page is closed.",
    );
  }
  const visible = movies
    .filter(
      (m) =>
        (view === "all" || saved.includes(m.id)) &&
        (genre === "all" || m.genre === genre) &&
        [m.title, m.director, String(m.year)].some((s) =>
          s.toLowerCase().includes(query.trim().toLowerCase()),
        ),
    )
    .sort((a, b) =>
      sort === "year" ? a.year - b.year : a.title.localeCompare(b.title),
    );
  return (
    <>
      <a className="skip" href="#main">
        Skip to films
      </a>
      <div className="shell">
        <header className="brand">
          <span className="brand-mark" aria-hidden="true">
            m
          </span>{" "}
          myFlix
        </header>
        <main id="main">
          <section className="intro">
            <h1>Film collection.</h1>
            <p>A small collection of cinema’s early experiments.</p>
          </section>
          <div className="toolbar">
            <label className="grow">
              Search films
              <input
                type="search"
                placeholder="Title, director or year"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <label>
              Genre
              <select
                aria-label="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="all">All genres</option>
                {genres.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </label>
            <label>
              Sort by
              <select
                aria-label="Sort by"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="title">Title A–Z</option>
                <option value="year">Oldest first</option>
              </select>
            </label>
          </div>
          <div className="summary">
            <div className="tabs">
              <button
                aria-pressed={view === "all"}
                onClick={() => setView("all")}
              >
                All films
              </button>
              <button
                aria-pressed={view === "saved"}
                onClick={() => setView("saved")}
              >
                Watchlist (
                {saved.filter((id) => movies.some((m) => m.id === id)).length})
              </button>
            </div>
            <span className="muted" aria-live="polite">
              {visible.length} films
            </span>
          </div>
          <ul className="film-list">
            {visible.map((movie) => (
              <MovieRow
                key={movie.id}
                movie={movie}
                saved={saved.includes(movie.id)}
                onToggle={toggle}
                onDetails={setSelected}
              />
            ))}
          </ul>
          {!visible.length ? (
            <div className="empty">
              <h2>No films in this view.</h2>
              <p>Try another search or add a film to your watchlist.</p>
              <button
                onClick={() => {
                  setQuery("");
                  setGenre("all");
                  setView("all");
                }}
              >
                Show all films
              </button>
            </div>
          ) : null}
          <p role="status" className="notice">
            {notice}
          </p>
        </main>
        <footer>
          Curated sample catalogue · No streaming or account connection.
          <br />
          Your watchlist is saved on this device.
        </footer>
      </div>
      <MovieDialog movie={selected} onClose={() => setSelected(null)} />
    </>
  );
}
