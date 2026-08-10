import { useState, useEffect } from "react";
import "./App.css";
import Gameboard from "./components/Gameboard";
import GameOverModal from "./components/GameOverModal";
import Scoreboard from "./components/Scoreboard";

export default function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedId, setClickedId] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [round, setRound] = useState(1);
  const [pokemonData, setPokemonData] = useState([]);
  useEffect(() => {
    //populate first time and refresh 20 random cards after each round
    let pokemonIds = new Set();
    while (pokemonIds.size < 20) {
      pokemonIds.add(Math.floor(Math.random() * 151 + 1));
    }
    let pokemonIdsArray = Array.from(pokemonIds);
    let fetchArray = pokemonIdsArray.map((pokemonId) => {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(
        (response) => response.json(),
      );
    });
    Promise.all(fetchArray)
      .then((results) => {
        setPokemonData(results);
      })
      .catch((error) => console.error("error"));
  }, [round]);

  //card on click handler
  const clickHandler = (pokemonId) => {
    if (clickedId.includes(pokemonId)) {
      let score = currentScore;
      if (score > highScore) setHighScore(score);
      setIsGameOver(true);
    } else {
      setCurrentScore((prev) => prev + 1);
      setClickedId((prev) => [...prev, pokemonId]);
      //shuffle the cards after each non-repeated click with fisher yates
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
      //need to do a shallow copy as pokemonData is an array and react may not be able to differentiate between the original array and the shuffled array
      setPokemonData((prev) => {
        const newData = [...prev];
        return shuffle(newData);
      });
      if (clickedId.length === 19) {
        //round increase when hv 19 clicked card and not game over
        //if set 20 here react will never trigger
        setRound((prev) => prev + 1); //trigger refresher
        setClickedId([]); //empty clickedId array after each round
      }
    }
  };
  return (
    <main>
      <h1>Alex's Memory Card Game</h1>
      <Scoreboard
        currentScore={currentScore}
        highScore={highScore}
        round={round}
      />
      <Gameboard pokemonData={pokemonData} clickHandler={clickHandler} />
      <GameOverModal isGameOver={isGameOver} />
    </main>
  );
}
