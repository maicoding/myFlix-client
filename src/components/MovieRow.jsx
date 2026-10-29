import React from "react";
export function MovieRow({ movie, saved, onToggle, onDetails }) {
  return (
    <li className="film-row">
      <div
        className="poster"
        style={{ "--poster": movie.color }}
        aria-hidden="true"
      >
        <span>{movie.year}</span>
        <span>
          {movie.title
            .split(" ")
            .map((w) => w[0])
            .slice(0, 3)
            .join("")}
        </span>
      </div>
      <div>
        <h2>{movie.title}</h2>
        <p>
          {movie.year} · {movie.genre} · {movie.minutes} min
        </p>
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
