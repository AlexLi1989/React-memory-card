export default function Scoreboard({ currentScore, highScore, round }) {
  return (
    <section className="scoreboard">
      <h2>Scoreboard</h2>
      <p>Round : {round}</p>
      <p>Your current score : {currentScore}</p>
      <p>Your high score : {highScore}</p>
    </section>
  );
}
