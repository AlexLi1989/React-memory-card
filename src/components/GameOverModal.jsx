export default function GameOverModal({ isGameOver, restartHandler }) {
  return (
    <>
      {isGameOver && (
        <div className="game-over-modal">
          <h2>Game Over!</h2>
          <button onClick={restartHandler}>Restart Game</button>
        </div>
      )}
    </>
  );
}
