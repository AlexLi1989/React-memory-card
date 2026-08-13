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
  const [gameId, setGameId] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //logic to prevent race conditions and memory leak
    let isMounted = true;
    setLoading(true);

    //populate first time and refresh 18 random cards after each round
    let pokemonIds = new Set();
    while (pokemonIds.size < 18) {
      pokemonIds.add(Math.floor(Math.random() * 151 + 1)); //151 for old geezers like me
    }
    let pokemonIdsArray = Array.from(pokemonIds);
    let fetchArray = pokemonIdsArray.map((pokemonId) => {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(
        (response) => {
          if (response.status >= 400) {
            throw new Error("server error");
          }
          return response.json();
        },
      );
    });
    Promise.all(fetchArray)
      .then((results) => {
        //only updates data,error and loading if still mounted
        if (isMounted) setPokemonData(results);
      })
      .catch((error) => {
        if (isMounted) setError(error);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    //cleanup function: set closure isMounted to prevent leakage
    return () => {
      isMounted = false;
    };
  }, [round, gameId]);

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
      if (clickedId.length === 17) {
        //round increase when hv 19 clicked card and not game over
        //if set 18 here react will never trigger
        setRound((prev) => prev + 1); //trigger refresher
        setClickedId([]); //empty clickedId array after each round
      }
    }
  };

  //modal restart game handler
  const restartHandler = () => {
    setCurrentScore(0);
    setClickedId([]);
    setIsGameOver(false);
    setRound(1);
    setGameId((prev) => prev + 1);
  };
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <code>A network error was encountered</code>
      </div>
    );
  }
  return (
    <main>
      <h1>Alex's Memory Card Game</h1>
      <Scoreboard
        currentScore={currentScore}
        highScore={highScore}
        round={round}
      />
      <Gameboard
        pokemonData={pokemonData}
        clickHandler={clickHandler}
        key={gameId}
      />
      <GameOverModal isGameOver={isGameOver} restartHandler={restartHandler} />
    </main>
  );
}
