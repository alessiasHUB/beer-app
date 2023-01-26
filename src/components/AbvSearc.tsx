import isANum from "./utils/isANum";

interface AbvSearchProps {
  searchQuery: string;
  abvBtn: "abv_gt" | "abv_lt" | null;
  onChange: (searchInput: string) => void;
  onGreaterClick: () => void;
  onLessClick: () => void;
  setPageOnChange: () => void;
}

export default function AbvSearch(props: AbvSearchProps): JSX.Element {
  const {
    searchQuery,
    onChange,
    onGreaterClick,
    onLessClick,
    abvBtn,
    setPageOnChange,
  } = props;

  // check if the previous_value was a NUMBER and the
  // current_value is an EMPTY STRING => setPageOnChange();
  const maybeSetPageOnChange = (input: string): void => {
    if (isANum(input)) {
      setPageOnChange();
    }
  };
  return (
    <div className="abv-search">
      <input
        placeholder="abv%"
        value={searchQuery}
        onChange={(e) => {
          onChange(e.target.value);
          maybeSetPageOnChange(searchQuery);
        }}
      />
      {!isANum(searchQuery) || searchQuery === "" ? (
        <div className="abv-search-buttons">
          <button disabled className={"abv_gt" + abvBtn}>
            over
          </button>
          <button disabled className={"abv_lt" + abvBtn}>
            under
          </button>
        </div>
      ) : (
        <div className="abv-search-buttons">
          <button onClick={onGreaterClick} className={"abv_gt" + abvBtn}>
            over
          </button>
          <button onClick={onLessClick} className={"abv_lt" + abvBtn}>
            under
          </button>
        </div>
      )}
    </div>
  );
}
