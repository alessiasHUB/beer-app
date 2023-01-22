import isANum from "./utils/isANum";

interface AbvSearchProps {
  searchQuery: string;
  abvBtn: string | undefined;
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
          <button disabled className={"over" + abvBtn}>
            over
          </button>
          <button disabled className={"under" + abvBtn}>
            under
          </button>
        </div>
      ) : (
        <div className="abv-search-buttons">
          <button onClick={onGreaterClick} className={"over" + abvBtn}>
            over
          </button>
          <button onClick={onLessClick} className={"under" + abvBtn}>
            under
          </button>
        </div>
      )}
    </div>
  );
}
