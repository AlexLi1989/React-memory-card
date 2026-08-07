import MOCK_POKEMON from "../data/data.js";
import Card from "./Card";

export default function Gameboard() {
  return (
    <div className="gameboard-container">
      {MOCK_POKEMON.map((pokemon) => {
        return <Card key={pokemon.id} pokemon={pokemon} />;
      })}
    </div>
  );
}
