import { test } from "node:test";
import assert from "node:assert/strict";
import { readWatchlist, saveWatchlist } from "../src/storage.js";
import { movies } from "../src/movies.js";
test("watchlist survives a storage round trip and filters malformed values", () => {
  let data = '["metropolis",1,null,"metropolis",""]';
  globalThis.localStorage = {
    getItem: () => data,
    setItem: (_key, value) => {
      data = value;
    },
  };
  assert.deepEqual(readWatchlist(), ["metropolis"]);
  assert.equal(saveWatchlist(["nosferatu"]), true);
  assert.deepEqual(readWatchlist(), ["nosferatu"]);
});
test("invalid and unavailable storage never prevents catalogue use", () => {
  globalThis.localStorage = { getItem: () => "{broken" };
  assert.deepEqual(readWatchlist(), []);
  globalThis.localStorage = {
    getItem() {
      throw new Error("blocked");
    },
    setItem() {
      throw new Error("blocked");
    },
  };
  assert.deepEqual(readWatchlist(), []);
  assert.equal(saveWatchlist(["metropolis"]), false);
});
test("catalogue identifiers are unique and durations usable", () => {
  assert.equal(new Set(movies.map((m) => m.id)).size, movies.length);
  assert(movies.every((m) => m.title && m.director && m.minutes > 0));
});
