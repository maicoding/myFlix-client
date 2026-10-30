import { test } from "node:test";
import assert from "node:assert/strict";
import { filterFilms, savedLegacyFilms } from "../src/catalogue.js";
const films = [
  {
    id: "1",
    title: "Castle in the Sky",
    romanisedTitle: "Tenkū no shiro Rapyuta",
    originalTitle: "天空の城ラピュタ",
    director: "Hayao Miyazaki",
    year: 1986,
  },
  { id: "2", title: "Only Yesterday", director: "Isao Takahata", year: 1991 },
  { id: "3", title: "Unknown year", director: "Hayao Miyazaki", year: null },
];
test("search handles original titles, romanisation accents, directors and years", () => {
  for (const query of ["tenku", "天空", "1986"])
    assert.equal(filterFilms(films, { query })[0].id, "1");
  assert.equal(filterFilms(films, { query: " TAKAHATA " })[0].id, "2");
  assert.equal(filterFilms(films, { query: "no match" }).length, 0);
});
test("director and chronological sorting compose without mutating API results", () => {
  assert.equal(filterFilms(films, { director: "Isao Takahata" }).length, 1);
  assert.deepEqual(
    filterFilms(films, { sort: "newest" }).map((f) => f.id),
    ["2", "1", "3"],
  );
  assert.deepEqual(
    filterFilms(films, { sort: "year" }).map((f) => f.id),
    ["1", "2", "3"],
  );
  assert.deepEqual(
    films.map((f) => f.id),
    ["1", "2", "3"],
  );
});
test("only previously saved samples remain available and clearly marked", () => {
  const old = savedLegacyFilms(["metropolis", "missing", "ghibli:anything"]);
  assert.equal(old.length, 1);
  assert.equal(old[0].id, "metropolis");
  assert.equal(old[0].source, "legacy");
  assert.deepEqual(savedLegacyFilms([]), []);
});
