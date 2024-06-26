import React from 'react';
import { useState, useRef, useEffect } from 'react'; 
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import Header from './components/Header';
import Gameboard from './components/Gameboard';
import Scorebox from './components/Scorebox';
import Highscorebox from './components/Highscorebox';
import Reset from './components/Reset';
import Openingscreen from './components/Openingscreen'; 

library.add(fas, far); 


const App = () => {

  const [gameStarted, setGameStarted] = useState(false); 
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0);
  const [newHighScore, setNewHighScore] = useState(false);

  return (
    <>
        <Header/>
        <Gameboard gameStarted={gameStarted} setGameStarted={setGameStarted} 
        gameOver={gameOver} setGameOver={setGameOver} 
        score={score} setScore={setScore}
        highScore={highScore} setHighScore={setHighScore}
        newHighScore={newHighScore} setNewHighScore={setNewHighScore}/>
        <Reset gameStarted={gameStarted} setGameStarted={setGameStarted} 
        gameOver={gameOver} setGameOver={setGameOver}
        score={score} setScore={setScore}/>
    </>
  )
}

export default App