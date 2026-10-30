import { movies as previousSamples } from "./movies.js";

// Retain previously saved demo entries without mixing samples into the API catalogue.
export function savedLegacyFilms(saved) {
  return previousSamples
    .filter((movie) => saved.includes(movie.id))
    .map((movie) => ({
      ...movie,
      source: "legacy",
      image: null,
    }));
}

const searchable = (value) =>
  String(value ?? "")
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase();

export function filterFilms(
  films,
  { query = "", director = "all", sort = "title" } = {},
) {
  const needle = searchable(query.trim());
  return films
    .filter(
      (movie) =>
        (director === "all" || movie.director === director) &&
        [
          movie.title,
          movie.originalTitle,
          movie.romanisedTitle,
          movie.director,
          movie.year,
        ].some((value) => searchable(value).includes(needle)),
    )
    .sort((a, b) => {
      if (sort === "year")
        return (
          (a.year ?? Infinity) - (b.year ?? Infinity) ||
          a.title.localeCompare(b.title)
        );
      if (sort === "newest")
        return (
          (b.year ?? -Infinity) - (a.year ?? -Infinity) ||
          a.title.localeCompare(b.title)
        );
      return a.title.localeCompare(b.title);
    });
}
