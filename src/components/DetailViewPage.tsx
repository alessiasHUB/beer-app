import { IBeer } from "./utils/interfaces";

interface IDetailBeerProps {
  beer: IBeer;
  onClick: () => void;
}

export default function DetailBeerView(props: IDetailBeerProps): JSX.Element {
  const { beer, onClick } = props;
  return (
    <div className="detailed-view">
      <p>
        {beer.name} | {beer.abv}%
      </p>
      <p>{beer.tagline}</p>
      <img src={beer.image_url} alt="" />

      <p>{beer.description}</p>
      <p>
        {beer.food_pairing.map((el, i) => {
          return i !== beer.food_pairing.length - 1 ? (
            <span key={i}>{el} / </span>
          ) : (
            <span key={i}>{el}</span>
          );
        })}
      </p>
      <button onClick={onClick}>CLOSE</button>
    </div>
  );
}
