import { useEffect, useState } from "react";
import { IBeer } from "./utils/interfaces";
import { searchCriteriaBeers } from "./utils/searchCriteria";
import BeerView from "./BeerView";
import DetailBeerView from "./DetailViewPage";
import SearchBar from "./SearcBar";
import PageButtons from "./PageButtons";

// const apiURL = "https://api.punkapi.com/v2/beers"; //after "/" put the id of the beer
// const abv_gt = "?abv_gt="; //add number to go after
// const abv_lt = "?abv_lt="; //add number to go after

const totalPages: number = 13; //if 25 beers per page
const numBeersPerPage: number = 24;
export default function MainPage(): JSX.Element {
  // const [beers, setBeers] = useState<IBeer[]>([]);
  const [allBeers, setAllBeers] = useState<IBeer[]>([]);
  const [selectedBeer, setSelectedBeer] = useState<IBeer | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  //--------------------------------------------------fetching all beers
  useEffect(() => {
    async function fetchAllData() {
      for (let i = 1; i <= totalPages; i++) {
        const response = await fetch(
          `https://api.punkapi.com/v2/beers?page=${i}&per_page=25`
        );
        const data = await response.json();
        setAllBeers((prev) => prev.concat(data));
      }
    }
    fetchAllData();
  }, []);

  //--------------------------------------------------displaying one beer in detail when clicked
  const handleBeerSelectorOnClick = (id: number) => {
    async function fetchSelectedData() {
      const response = await fetch("https://api.punkapi.com/v2/beers/" + id);
      const data = await response.json();
      setSelectedBeer(data[0]);
    }
    fetchSelectedData();
  };

  //--------------------------------------------------going back to normal view when clicked
  const handleBackButton = () => {
    setSelectedBeer(null);
  };

  //--------------------------------------------------search-bar functionalities
  const handleSearchInput = (input: string) => {
    setSearchInput(input);
    setPage(1);
  };
  const filteredBeers: IBeer[] = searchCriteriaBeers(allBeers, searchInput);
  const filteredBeersRender = filteredBeers
    .slice((page - 1) * numBeersPerPage, page * numBeersPerPage)
    .map((beer: IBeer, index) => {
      return (
        <BeerView
          key={index}
          beer={beer}
          onClick={() => handleBeerSelectorOnClick(beer.id)}
        />
      );
    });

  //--------------------------------------------------page setting
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <div className="header">
        <span>
          <img
            alt="icon"
            src="https://static.vecteezy.com/system/resources/previews/001/201/132/original/beer-png.png"
          />
        </span>
        <span>Welcome to the Beer App</span>
        <SearchBar searchQuery={searchInput} onChange={handleSearchInput} />
      </div>
      <hr />

      {selectedBeer && (
        <DetailBeerView
          beer={selectedBeer}
          onClick={() => handleBackButton()}
        />
      )}

      {filteredBeersRender}
      <br />

      <PageButtons
        page={page}
        numBeersPerPage={numBeersPerPage}
        filteredBeersRenderLen={filteredBeersRender.length}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
      <br />
    </>
  );
}
