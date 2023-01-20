// ● Search: The main page also supports searchable interface, where users can search
// for a particular beer by name.

interface SearchBarProps {
  searchQuery: string;
  onChange: (searchInput: string) => void;
}

export default function SearchBar(props: SearchBarProps): JSX.Element {
  const { searchQuery, onChange } = props;
  return (
    <input
      placeholder="search here"
      value={searchQuery}
      onChange={(e) => onChange(e.target.value)}
      className="search-bar"
    />
  );
}
