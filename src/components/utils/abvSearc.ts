import { IBeer } from "./interfaces";

export function searchAvbBeers(
  beers: IBeer[],
  searchQuery: string,
  setting: "over" | "under"
): IBeer[] {
  return beers.filter((beer: IBeer) =>
    setting === "over"
      ? beer.abv > Number(searchQuery)
      : beer.abv < Number(searchQuery)
  );
}
