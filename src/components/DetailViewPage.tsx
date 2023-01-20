import { IBeer } from "./utils/interfaces";

interface IDetailBeerProps {
  beer: IBeer;
  onClick: () => void;
}

export default function DetailBeerView(props: IDetailBeerProps): JSX.Element {
  const { beer, onClick } = props;
  console.log(beer.name);
  return (
    <div>
      <p>{beer.name}</p>
      <p>{beer.tagline}</p>
      <img src={beer.image_url} alt="" />
      <p>{beer.abv}</p>
      <p>{beer.description}</p>
      <p>
        {beer.food_pairing.map((el, i) => {
          return i !== beer.food_pairing.length - 1 ? (
            <span>{el} / </span>
          ) : (
            <span>{el}</span>
          );
        })}
      </p>
      <button onClick={onClick}>BACK</button>
    </div>
  );
}
