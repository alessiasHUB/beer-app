// ● List View: The application has a main interface/page which shows a list of beers with
// basic details like name, tagline, image, and abv value. The list should be paginated,
// and should support basic page navigation to see more beer options.

import { IBeer } from "./utils/interfaces";

interface IBeerViewProps {
  beer: IBeer;
  onClick: () => void;
}

export default function BeerView(props: IBeerViewProps): JSX.Element {
  const { beer, onClick } = props;
  return (
    <button className="beer-view" onClick={onClick}>
      <p>{beer.name}</p>
      <p>{beer.tagline}</p>
      <img src={beer.image_url} alt="" />
      <p>ABV: {beer.abv}</p>
    </button>
  );
}
