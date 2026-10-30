export const FILM_API_URL = "https://ghibliapi.vercel.app/films?limit=250";
export const FILM_API_HOME = "https://ghibliapi.vercel.app/";

export class FilmApiError extends Error {
  constructor(message) {
    super(message);
    this.name = "FilmApiError";
  }
}

const text = (value, fallback = "") =>
  typeof value === "string" && value.trim() ? value.trim() : fallback;
const number = (value, min, max) => {
  if (value === "" || value == null) return null;
  const result = Number(value);
  return Number.isInteger(result) && result >= min && result <= max
    ? result
    : null;
};

function posterUrl(value) {
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.hostname !== "image.tmdb.org" ||
      !/^\/t\/p\/[^/]+\/[\w-]+\.(jpg|png|webp)$/.test(url.pathname)
    )
      return null;
    url.pathname = url.pathname.replace(/^\/t\/p\/[^/]+\//, "/t/p/w342/");
    url.search = "";
    return url.href;
  } catch {
    return null;
  }
}

export function normalizeFilms(payload) {
  if (!Array.isArray(payload))
    throw new FilmApiError("The film service returned an unexpected response.");
  const seen = new Set();
  const films = [];
  for (const item of payload) {
    if (!item || !/^[0-9a-f-]{36}$/i.test(item.id) || !text(item.title))
      continue;
    const id = "ghibli:" + item.id;
    if (seen.has(id)) continue;
    seen.add(id);
    films.push({
      id,
      title: text(item.title),
      originalTitle: text(item.original_title),
      romanisedTitle: text(item.original_title_romanised),
      year: number(item.release_date, 1800, 2200),
      minutes: number(item.running_time, 1, 1000),
      director: text(item.director, "Unknown director"),
      producer: text(item.producer),
      description: text(
        item.description,
        "No description is available from the film service.",
      ),
      image: posterUrl(item.image),
      source: "ghibli",
      sourceUrl: FILM_API_HOME + "films/" + item.id,
      color: "#9eb6a9",
    });
  }
  if (!films.length)
    throw new FilmApiError("The film service returned no usable films.");
  return films;
}

export async function fetchFilms({
  signal,
  fetchImpl = globalThis.fetch,
  timeoutMs = 15000,
} = {}) {
  const timeout = AbortSignal.timeout(timeoutMs);
  const requestSignal = signal ? AbortSignal.any([signal, timeout]) : timeout;
  try {
    const response = await fetchImpl(FILM_API_URL, { signal: requestSignal });
    if (!response.ok)
      throw new FilmApiError(
        `The film service is unavailable (HTTP ${response.status}).`,
      );
    return normalizeFilms(await response.json());
  } catch (error) {
    if (signal?.aborted) throw error;
    if (error instanceof FilmApiError) throw error;
    if (timeout.aborted)
      throw new FilmApiError("The film service took too long to respond.");
    throw new FilmApiError(
      "Films could not be loaded. Check your connection and try again.",
    );
  }
}
