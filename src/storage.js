export function readWatchlist() {
  try {
    const value = JSON.parse(
      localStorage.getItem("myflix.watchlist.v1") || "[]",
    );
    return Array.isArray(value)
      ? [...new Set(value.filter((id) => typeof id === "string" && id.trim()))]
      : [];
  } catch {
    return [];
  }
}
export function saveWatchlist(ids) {
  try {
    localStorage.setItem("myflix.watchlist.v1", JSON.stringify(ids));
    return true;
  } catch {
    return false;
  }
}
