import { useEffect, useState } from "react";
import { IBeer } from "./utils/interfaces";
import { searchCriteriaBeers } from "./utils/searchCriteria";
import { searchAvbBeers } from "./utils/abvSearc";
import BeerView from "./BeerView";
import DetailBeerView from "./DetailViewPage";
import SearchBar from "./SearcBar";
import AbvSearch from "./AbvSearc";
import PageButtons from "./PageButtons";

const apiURL = "https://api.punkapi.com/v2/beers"; //after "/" put the id of the beer

const totalPages: number = 13; //if 25 beers per page
const numBeersPerPage: number = 24;
export default function MainPage(): JSX.Element {
  const [allBeers, setAllBeers] = useState<IBeer[]>([]);
  const [selectedBeer, setSelectedBeer] = useState<IBeer | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [abvBtn, setAbvBtn] = useState<undefined | "under" | "over">(undefined);
  const [abvInput, setAbvInput] = useState<string>("");

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

  //--------------------------------------------------filter beers depending on their ABV
  const handleAbvSearchInput = (input: string) => {
    setAbvInput(input);
    if (input === "") {
      setAbvBtn(undefined);
    }
  };
  const handleGreaterBtn = () => {
    if (abvBtn === "over") {
      setAbvBtn(undefined);
    } else {
      setAbvBtn("over");
    }
    setPage(1);
  };
  const handleLessBtn = () => {
    if (abvBtn === "under") {
      setAbvBtn(undefined);
    } else {
      setAbvBtn("under");
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

  //--------------------------------------------------going back to normal view when clicked
  const handleBackButton = () => {
    setSelectedBeer(null);
  };

  //--------------------------------------------------search-bar functionalities
  const handleSearchInput = (input: string) => {
    setSearchInput(input);
    setPage(1);
  };
  const filteredBeers: IBeer[] =
    abvBtn && abvInput !== "" && Number(abvInput)
      ? searchCriteriaBeers(
          searchAvbBeers(allBeers, abvInput, abvBtn),
          searchInput
        )
      : searchCriteriaBeers(allBeers, searchInput);
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
          Welcome to the Beer App
        </span>
        <SearchBar searchQuery={searchInput} onChange={handleSearchInput} />
        <AbvSearch
          searchQuery={abvInput}
          abvBtn={abvBtn}
          onChange={handleAbvSearchInput}
          onGreaterClick={handleGreaterBtn}
          onLessClick={handleLessBtn}
        />
      </div>

      {selectedBeer && (
        <DetailBeerView
          beer={selectedBeer}
          onClick={() => handleBackButton()}
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
