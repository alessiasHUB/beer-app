import isANum from "./utils/isANum";

interface AbvSearchProps {
  searchQuery: string;
  abvBtn: "abv_gt" | "abv_lt" | null;
  onChange: (searchInput: string) => void;
  onGreaterClick: () => void;
  onLessClick: () => void;
}

export default function AbvSearch(props: AbvSearchProps): JSX.Element {
  const { searchQuery, onChange, onGreaterClick, onLessClick, abvBtn } = props;

  return (
    <div className="abv-search">
      <input
        placeholder="abv%"
        value={searchQuery}
        onChange={(e) => onChange(e.target.value)}
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
