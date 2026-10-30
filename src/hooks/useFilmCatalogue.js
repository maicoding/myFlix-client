import { useEffect, useState } from "react";
import { fetchFilms } from "../film-api";

export function useFilmCatalogue() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    fetchFilms({ signal: controller.signal })
      .then((data) => {
        if (!controller.signal.aborted) setFilms(data);
      })
      .catch((error) => {
        if (!controller.signal.aborted) setError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [revision]);
  return {
    films,
    loading,
    error,
    reload: () => setRevision((value) => value + 1),
  };
}
