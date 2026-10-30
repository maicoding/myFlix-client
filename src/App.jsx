import React, { useState } from "react";
import { readWatchlist, saveWatchlist } from "./storage";
import { useFilmCatalogue } from "./hooks/useFilmCatalogue";
import { filterFilms, savedLegacyFilms } from "./catalogue";
import { FILM_API_HOME } from "./film-api";
import { MovieRow } from "./components/MovieRow";
import { MovieDialog } from "./components/MovieDialog";

export default function App() {
  const { films, loading, error, reload } = useFilmCatalogue();
  const [saved, setSaved] = useState(readWatchlist);
  const [query, setQuery] = useState("");
  const [director, setDirector] = useState("all");
  const [view, setView] = useState("all");
  const [sort, setSort] = useState("title");
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState("");
  const legacy = savedLegacyFilms(saved);
  const allKnown = [...films, ...legacy];
  const watchlist = allKnown.filter((movie) => saved.includes(movie.id));
  const unresolved = saved.filter(
    (id) => !allKnown.some((movie) => movie.id === id),
  ).length;
  const directors = [
    ...new Set(allKnown.map((movie) => movie.director)),
  ].sort();
  const visible = filterFilms(view === "saved" ? watchlist : films, {
    query,
    director,
    sort,
  });
  function reset() {
    setQuery("");
    setDirector("all");
    setView("all");
  }
  function toggle(id) {
    const next = saved.includes(id)
      ? saved.filter((value) => value !== id)
      : [...saved, id];
    setSaved(next);
    setNotice(
      saveWatchlist(next)
        ? "Watchlist updated."
        : "Browser storage is unavailable. Your watchlist will last until this page is closed.",
    );
  }
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
            <p>Studio Ghibli films, loaded from the community film API.</p>
          </section>
          <div className="catalogue-source">
            <p className="muted">
              {loading
                ? "Loading films…"
                : `${films.length} films from the Studio Ghibli API`}
            </p>
            <button onClick={reload} disabled={loading}>
              Refresh films
            </button>
          </div>
          <div className="toolbar">
            <label className="grow">
              Search films
              <input
                type="search"
                placeholder="Title, director or year"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <label>
              Director
              <select
                aria-label="Director"
                value={director}
                onChange={(event) => setDirector(event.target.value)}
              >
                <option value="all">All directors</option>
                {directors.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
            <label>
              Sort by
              <select
                aria-label="Sort by"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="title">Title A–Z</option>
                <option value="year">Oldest first</option>
                <option value="newest">Newest first</option>
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
                Watchlist ({saved.length})
              </button>
            </div>
            <span className="muted" aria-live="polite">
              {loading && !films.length
                ? "Loading…"
                : `${visible.length} films`}
            </span>
          </div>
          {loading ? (
            <p role="status" className="loading-message">
              {films.length
                ? "Refreshing film data…"
                : "Loading the film catalogue…"}
            </p>
          ) : null}
          {error ? (
            <div className="api-error" role="alert">
              <h2>Film data is unavailable.</h2>
              <p>{error}</p>
              {films.length ? (
                <p>The last successfully loaded films are still shown.</p>
              ) : null}
              <button onClick={reload}>Try again</button>
            </div>
          ) : null}
          {view === "saved" && unresolved > 0 && !loading ? (
            <p className="muted">
              {unresolved} saved {unresolved === 1 ? "film is" : "films are"}{" "}
              currently unavailable from this catalogue. Your saved entries have
              been kept.
            </p>
          ) : null}
          <ul className="film-list" aria-busy={loading}>
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
          {!visible.length && !loading && !error ? (
            <div className="empty">
              <h2>
                {view === "saved" && !saved.length
                  ? "Your watchlist is empty."
                  : "No films in this view."}
              </h2>
              <p>Try another search or add a film to your watchlist.</p>
              <button onClick={reset}>Show all films</button>
            </div>
          ) : null}
          <p role="status" className="notice">
            {notice}
          </p>
        </main>
        <footer>
          Film data:{" "}
          <a href={FILM_API_HOME} target="_blank" rel="noreferrer">
            Studio Ghibli API
          </a>{" "}
          (community project). Posters are supplied by the API from TMDB.
          <br />
          Your watchlist is saved on this device. Streaming and accounts are
          unavailable.
        </footer>
      </div>
      <MovieDialog movie={selected} onClose={() => setSelected(null)} />
    </>
  );
}
