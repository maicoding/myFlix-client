import React from "react";
import { MoviePoster } from "./MoviePoster";
export function MovieRow({ movie, saved, onToggle, onDetails }) {
  return (
    <li className="film-row">
      <MoviePoster movie={movie} />
      <div>
        <h2>{movie.title}</h2>
        <p>
          {movie.year ?? "Year unavailable"} · {movie.director}
          {movie.minutes ? ` · ${movie.minutes} min` : ""}
        </p>
        {movie.source === "legacy" ? (
          <p className="legacy-note">Saved from the earlier demo catalogue</p>
        ) : null}
        <p className="film-description">{movie.description}</p>
        <button
          className="text-button"
          aria-label={"Details for " + movie.title}
          onClick={() => onDetails(movie)}
        >
          Explore film ↗
        </button>
      </div>
      <button
        className="watch-button"
        aria-label={"Watchlist " + movie.title}
        aria-pressed={saved}
        onClick={() => onToggle(movie.id)}
      >
        {saved ? "✓ In watchlist" : "+ Watchlist"}
      </button>
    </li>
  );
}
