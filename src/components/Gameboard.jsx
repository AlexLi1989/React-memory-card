import MOCK_POKEMON from "../data/data.js";
import Card from "./Card";

export default function Gameboard({ pokemonData, clickHandler }) {
  return (
    <div className="gameboard-container">
      {pokemonData.map((pokemon) => {
        return (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => clickHandler(pokemon.id)}
          />
        );
      })}
    </div>
  );
}
