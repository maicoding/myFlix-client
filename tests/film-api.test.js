import { test } from "node:test";
import assert from "node:assert/strict";
import {
  fetchFilms,
  normalizeFilms,
  FILM_API_URL,
  FilmApiError,
} from "../src/film-api.js";

const item = {
  id: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
  title: "Castle in the Sky",
  original_title: "天空の城ラピュタ",
  original_title_romanised: "Tenkū no shiro Rapyuta",
  release_date: "1986",
  running_time: "124",
  director: "Hayao Miyazaki",
  producer: "Isao Takahata",
  description: "A film description.",
  image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/example.jpg",
};

test("API film IDs, typed fields and poster URLs are normalized without losing original titles", () => {
  const [film] = normalizeFilms([item]);
  assert.equal(film.id, "ghibli:" + item.id);
  assert.equal(film.year, 1986);
  assert.equal(film.minutes, 124);
  assert.equal(film.originalTitle, item.original_title);
  assert.equal(film.sourceUrl, "https://ghibliapi.vercel.app/films/" + item.id);
  assert.equal(film.image, "https://image.tmdb.org/t/p/w342/example.jpg");
});
test("missing metadata stays explicitly unknown and untrusted image URLs are rejected", () => {
  const [film] = normalizeFilms([
    {
      ...item,
      release_date: "unknown",
      running_time: "",
      director: null,
      description: null,
      image: "https://example.com/tracker.jpg",
    },
  ]);
  assert.equal(film.year, null);
  assert.equal(film.minutes, null);
  assert.equal(film.image, null);
  assert.equal(film.director, "Unknown director");
  assert.match(film.description, /No description/);
});
test("bad records and duplicate IDs do not corrupt the usable catalogue", () => {
  assert.equal(
    normalizeFilms([
      null,
      {},
      item,
      item,
      { ...item, id: "javascript:alert(1)" },
    ]).length,
    1,
  );
  assert.throws(() => normalizeFilms([]), FilmApiError);
  assert.throws(() => normalizeFilms({ error: "bad response" }), FilmApiError);
  assert.throws(
    () => normalizeFilms([{ id: item.id, title: "" }]),
    FilmApiError,
  );
});
test("HTTP and invalid JSON responses surface readable errors instead of demo data", async () => {
  await assert.rejects(
    fetchFilms({ fetchImpl: async () => ({ ok: false, status: 503 }) }),
    /HTTP 503/,
  );
  await assert.rejects(
    fetchFilms({
      fetchImpl: async () => ({
        ok: true,
        json: async () => {
          throw new SyntaxError("bad");
        },
      }),
    }),
    /could not be loaded/,
  );
  await assert.rejects(
    fetchFilms({ fetchImpl: async () => ({ ok: true, json: async () => [] }) }),
    /no usable films/,
  );
});
test("fetch uses the real endpoint and passes a cancellable request signal", async () => {
  const result = await fetchFilms({
    fetchImpl: async (url, options) => {
      assert.equal(url, FILM_API_URL);
      assert(options.signal instanceof AbortSignal);
      return { ok: true, json: async () => [item] };
    },
  });
  assert.equal(result[0].title, item.title);
});
test("slow requests time out and caller cancellation remains distinguishable", async () => {
  const fetchImpl = (_url, { signal }) =>
    new Promise((_resolve, reject) => {
      if (signal.aborted) {
        reject(signal.reason);
        return;
      }
      const guard = setTimeout(
        () => reject(new Error("Timeout test exceeded")),
        2000,
      );
      signal.addEventListener(
        "abort",
        () => {
          clearTimeout(guard);
          reject(signal.reason);
        },
        { once: true },
      );
    });
  await assert.rejects(
    fetchFilms({ fetchImpl, timeoutMs: 10 }),
    /took too long/,
  );
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(
    fetchFilms({ fetchImpl, signal: controller.signal }),
    (error) => error.name === "AbortError",
  );
});
