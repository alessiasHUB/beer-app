import { IBeer } from "./interfaces";

export function searchAbvBeers(
  beers: IBeer[],
  searchQuery: string,
  setting: "abv_gt" | "abv_lt"
): IBeer[] {
  return beers.filter((beer: IBeer) =>
    setting === "abv_gt"
      ? beer.abv > Number(searchQuery)
      : beer.abv < Number(searchQuery)
  );
}
