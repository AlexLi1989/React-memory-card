export default function Card({ pokemon, onClick }) {
  return (
    <div className="card-container" onClick={onClick}>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`}
        alt={pokemon.name}
      />
      <p>{pokemon.name}</p>
    </div>
  );
}
