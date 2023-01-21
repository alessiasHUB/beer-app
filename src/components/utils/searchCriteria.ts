import { IBeer } from "./interfaces";

export function searchCriteriaBeers(
  beers: IBeer[],
  searchQuery: string
): IBeer[] {
  return beers.filter((beer: IBeer) =>
    beer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}
