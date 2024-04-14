import React from 'react';
import { useState } from 'react'; 
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import Header from './components/Header';
import Gameboard from './components/Gameboard';
import Scorebox from './components/Scorebox';
import Highscorebox from './components/Highscorebox';
import Reset from './components/Reset';
import Snakebox from './components/Snakebox';
import Openingscreen from './components/Openingscreen'; 

library.add(fas, far); 


const App = () => {

  const [gameStarted, setGameStarted] = useState(false); 

  return (
    <>
        <Header/>
        <Gameboard gameStarted={gameStarted} setGameStarted={setGameStarted}/>
        <Reset gameStarted={gameStarted} setGameStarted={setGameStarted}/>
    </>
  )
}

export default App