import React, { useEffect, useRef } from "react";
export function MovieDialog({ movie, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    if (movie && !ref.current.open) ref.current.showModal();
    else if (!movie && ref.current.open) ref.current.close();
  }, [movie]);
  return (
    <dialog ref={ref} aria-labelledby="film-title" onClose={onClose}>
      <button className="close" onClick={() => ref.current.close()}>
        Close
      </button>
      {movie ? (
        <>
          <h2 id="film-title">{movie.title}</h2>
          {movie.originalTitle ? (
            <p className="original-title" lang="ja">
              {movie.originalTitle}
            </p>
          ) : null}
          {movie.romanisedTitle ? (
            <p className="muted">{movie.romanisedTitle}</p>
          ) : null}
          <p className="dialog-meta">
            {movie.year ?? "Year unavailable"}
            {movie.minutes ? ` · ${movie.minutes} min` : ""}
          </p>
          <p>{movie.description}</p>
          <p>
            Directed by <strong>{movie.director}</strong>
          </p>
          {movie.producer ? (
            <p>
              Produced by <strong>{movie.producer}</strong>
            </p>
          ) : null}
          {movie.source === "legacy" ? (
            <p className="muted">Saved from the earlier demo catalogue.</p>
          ) : (
            <p className="muted">
              Film data:{" "}
              <a href={movie.sourceUrl} target="_blank" rel="noreferrer">
                Studio Ghibli API
              </a>
            </p>
          )}
        </>
      ) : null}
    </dialog>
  );
}
