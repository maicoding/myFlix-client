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
          <p className="dialog-meta">
            {movie.year} · {movie.genre} · {movie.minutes} min
          </p>
          <p>{movie.description}</p>
          <p>
            Directed by <strong>{movie.director}</strong>
          </p>
          <p className="muted">
            Sample catalogue entry. Streaming is unavailable.
          </p>
        </>
      ) : null}
    </dialog>
  );
}
