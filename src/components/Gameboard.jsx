import React from 'react';
import Scorebox from './Scorebox';
import Highscorebox from './Highscorebox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAppleWhole} from '@fortawesome/free-solid-svg-icons';
import Fruit from './Fruit';
import Snakebody from './Snakebody';
import Snakescreen from './Snakescreen';
import Openingscreen from './Openingscreen';
import GameOverScreen from './GameOverScreen'; 
import { useState, useEffect } from 'react'; 


const Gameboard = ({gameStarted, gameOver, setGameOver, score, setScore}) => {
	

	useEffect(() => {
		console.log('Current Score:', score); 
	}, [score]);

	return (
		<>	
			<div className = 'h-auto w-full p-5 mt-5 flex justify-around items-center'>
				<Scorebox score={score}
				setScore={setScore}/>
				<div className = ' p-5 h-[480px] w-[800px] border border-solid border-black border-2 relative'>
					{gameStarted? (
						gameOver? <GameOverScreen score={score}/>  : <Snakescreen 
						gameStarted={gameStarted} 
						score={score} 
						setScore={setScore}
						gameOver={gameOver}
						setGameOver={setGameOver}/> ) : (
						<Openingscreen/>
						)}
				</div>
				<Highscorebox/>	
			</div>		
		</>
	)
}

export default Gameboard