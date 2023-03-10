import { useEffect, useState } from "react";
import { IBeer } from "./utils/interfaces";
import BeerView from "./BeerView";
import DetailBeerView from "./DetailViewPage";
import SearchBar from "./SearcBar";
import AbvSearch from "./AbvSearc";
import PageButtons from "./PageButtons";
import isANum from "./utils/isANum";

// todo: fetch one extra beer for pages that have 24,
//       to see if you're on the final page
// todo: "navigator" error in localhost:3000

const apiURL = "https://api.punkapi.com/v2/beers"; //after "/" put the id of the beer
const numBeersPerPage: number = 24;

export default function MainPage(): JSX.Element {
  const [allBeers, setAllBeers] = useState<IBeer[]>([]);
  const [selectedBeer, setSelectedBeer] = useState<IBeer | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [abvBtn, setAbvBtn] = useState<null | "abv_lt" | "abv_gt">(null);
  const [abvInput, setAbvInput] = useState<string>("");

  // todo: dont re-fetch when I click to get detailed View and the CLOSE btn
  // todo: fix abvBtn thingy not going to the right link even tho no btn is pressed
  //--------------------------------------------------fetching beers for each page
  useEffect(() => {
    async function fetchData() {
      let link = `${apiURL}?page=${page}&per_page=${numBeersPerPage}`;
      if (searchInput !== "" && abvBtn === null) {
        link = `https://api.punkapi.com/v2/beers?beer_name=${searchInput}&per_page=${numBeersPerPage}&page=${page}`;
      } else if (abvBtn !== null && searchInput === "") {
        link = `https://api.punkapi.com/v2/beers?${abvBtn}=${abvInput}&per_page=${numBeersPerPage}&page=${page}`;
      } else if (abvBtn !== null && searchInput !== "") {
        link = `https://api.punkapi.com/v2/beers?${abvBtn}=${abvInput}&beer_name=${searchInput}&per_page=${numBeersPerPage}&page=${page}`;
      }
      const response = await fetch(link);
      const data = await response.json();
      setAllBeers(data);
    }
    fetchData();
  }, [page, searchInput, abvBtn, abvInput]);

  //--------------------------------------------------page setting
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  //--------------------------------------------------filter beers depending on their ABV
  const handleAbvSearchInput = (input: string) => {
    setAbvInput(input);
    if (input === "" || !isANum(input)) {
      setAbvBtn(null);
    }
  };
  const handleGreaterBtn = () => {
    if (abvBtn === "abv_gt") {
      setAbvBtn(null);
    } else {
      setAbvBtn("abv_gt");
    }
    setPage(1);
  };
  const handleLessBtn = () => {
    if (abvBtn === "abv_lt") {
      setAbvBtn(null);
    } else {
      setAbvBtn("abv_lt");
    }
    setPage(1);
  };

  //--------------------------------------------------displaying one beer in detail when clicked
  const handleBeerSelectorOnClick = (id: number) => {
    async function fetchSelectedData() {
      const response = await fetch(`${apiURL}/${id}`);
      const data = await response.json();
      setSelectedBeer(data[0]);
    }
    fetchSelectedData();
  };

  //--------------------------------------------------going back to normal view (from selectedBeer) when clicked
  const handleCloseButton = () => {
    setSelectedBeer(null);
  };

  //--------------------------------------------------search-bar functionalities
  const handleSearchInput = (input: string) => {
    // change out spaces(' ') for underscores ('_')
    if (input.includes(" ")) {
      input.split(" ").join("_");
    }
    setSearchInput(input);
    setPage(1);
  };
  const setPageOnChange = () => {
    setPage(1);
  };

  //--------------------------------------------------filters
  const filteredBeersRender = allBeers.map((beer: IBeer, index) => {
    return (
      <BeerView
        key={index}
        beer={beer}
        onClick={() => handleBeerSelectorOnClick(beer.id)}
      />
    );
  });

  return (
    <>
      <div className="header">
        <span>
          <img
            alt="icon"
            src="https://static.vecteezy.com/system/resources/previews/001/201/132/original/beer-png.png"
          />
          Welcome to the Beer App
        </span>
        <SearchBar
          searchQuery={searchInput}
          onChange={handleSearchInput}
          setPageOnChange={setPageOnChange}
        />
        <AbvSearch
          searchQuery={abvInput}
          abvBtn={abvBtn}
          onChange={handleAbvSearchInput}
          onGreaterClick={handleGreaterBtn}
          onLessClick={handleLessBtn}
          setPageOnChange={setPageOnChange}
        />
      </div>

      {selectedBeer && (
        <DetailBeerView
          beer={selectedBeer}
          onClick={() => handleCloseButton()}
        />
      )}
      <div className="beers-map">{filteredBeersRender}</div>
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
