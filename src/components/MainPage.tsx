import { useEffect, useState } from "react";
import { IBeer } from "./utils/interfaces";
import BeerView from "./BeerView";
import DetailBeerView from "./DetailViewPage";
import SearchBar from "./SearcBar";
import { searchCriteriaBeers } from "./utils/searchCriteria";

const apiURL = "https://api.punkapi.com/v2/beers/"; //after "/" put the id of the beer

export default function MainPage(): JSX.Element {
  const [beers, setBeers] = useState<IBeer[]>([]);
  const [selectedBeer, setSelectedBeer] = useState<IBeer | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");

  //--------------------------------------------------fetching the first 25 beers
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiURL);
      const data = await response.json();
      setBeers(data);
    }
    fetchData();
  }, []);

  //--------------------------------------------------displaying one beer in detail when clicked
  const handleBeerSelectorOnClick = (id: number) => {
    async function fetchSelectedData() {
      const response = await fetch(apiURL + id);
      const data = await response.json();
      setSelectedBeer(data[0]);
    }
    fetchSelectedData();
  };

  //--------------------------------------------------going back to normal view when clicked
  const handleBackButton = () => {
    setSelectedBeer(null);
  };

  //--------------------------------------------------search-bar function
  const handleSearchInput = (input: string) => {
    setSearchInput(input);
  };
  const filteredBeers: IBeer[] = searchCriteriaBeers(beers, searchInput);
  const filteredBeersRender = filteredBeers.map((beer: IBeer) => {
    return (
      <BeerView
        key={beer.id}
        beer={beer}
        onClick={() => handleBeerSelectorOnClick(beer.id)}
      />
    );
  });

  return (
    <>
      <SearchBar searchQuery={searchInput} onChange={handleSearchInput} />
      {selectedBeer && (
        <DetailBeerView
          beer={selectedBeer}
          onClick={() => handleBackButton()}
        />
      )}
      {filteredBeersRender}
    </>
  );
}
