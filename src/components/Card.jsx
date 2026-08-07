export default function Card({ pokemon }) {
  return (
    <div className="card-container">
      <img src={pokemon.image} alt={pokemon.name} />
      <p>{pokemon.name}</p>
    </div>
  );
}
