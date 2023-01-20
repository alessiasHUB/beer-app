import { IBeer } from "./interfaces";

export function searchCriteriaBeers(
  beers: IBeer[],
  searchQuery: string
): IBeer[] {
  return beers.filter((item: IBeer) => {
    const name = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return item.name
      ? name || item.name.toLowerCase().includes(searchQuery.toLowerCase())
      : name;
  });
}
