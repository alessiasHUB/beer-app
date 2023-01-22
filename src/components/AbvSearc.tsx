// ● Search: The main page also supports searchable interface, where users can search
// for a particular beer by name.

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
        placeholder="ABV"
        value={searchQuery}
        onChange={(e) => onChange(e.target.value)}
      />
      {!Number(searchQuery) && searchQuery === "" ? (
        <>
          <button disabled className={"over" + abvBtn}>
            over
          </button>
          <button disabled className={"under" + abvBtn}>
            under
          </button>
        </>
      ) : (
        <>
          <button onClick={onGreaterClick} className={"over" + abvBtn}>
            over
          </button>
          <button onClick={onLessClick} className={"under" + abvBtn}>
            under
          </button>
        </>
      )}
    </div>
  );
}
