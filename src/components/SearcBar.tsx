// ● Search: The main page also supports searchable interface, where users can search
// for a particular beer by name.

interface SearchBarProps {
  searchQuery: string;
  onChange: (searchInput: string) => void;
  setPageOnChange: () => void;
}

export default function SearchBar(props: SearchBarProps): JSX.Element {
  const { searchQuery, onChange, setPageOnChange } = props;
  return (
    <input
      placeholder="search here"
      value={searchQuery}
      onChange={(e) => {
        onChange(e.target.value);
        setPageOnChange();
      }}
      className="search-bar"
    />
  );
}
