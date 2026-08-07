import { useState } from "react";
import "./App.css";
import Gameboard from "./components/Gameboard";
import GameOverModal from "./components/GameOverModal";
import Scoreboard from "./components/Scoreboard";

export default function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedId, setClickedId] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  return (
    <main>
      <h1>Alex's Memory Card Game</h1>
      <Scoreboard currentScore={currentScore} highScore={highScore} />
      <Gameboard />
      <GameOverModal isGameOver={isGameOver} />
    </main>
  );
}
