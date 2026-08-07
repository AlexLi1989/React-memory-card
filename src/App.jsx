import "./App.css";
import Gameboard from "./components/Gameboard";
import GameOverModal from "./components/GameOverModal";
import Scoreboard from "./components/Scoreboard";

export default function App() {
  return (
    <main>
      <h1>Alex's Memory Card Game</h1>
      <Scoreboard />
      <Gameboard />
      <GameOverModal />
    </main>
  );
}
