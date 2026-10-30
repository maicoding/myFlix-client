import React, { useState } from "react";
export function MoviePoster({ movie }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="poster" style={{ "--poster": movie.color || "#9eb6a9" }} aria-hidden="true">
      <span>{movie.year ?? "Film"}</span>
      <span>{movie.title.split(" ").map(word => word[0]).slice(0, 3).join("")}</span>
      {movie.image && !failed ? <img src={movie.image} alt="" loading="lazy" width="100" height="150"
        referrerPolicy="no-referrer" onError={() => setFailed(true)} /> : null}
    </div>
  );
}
