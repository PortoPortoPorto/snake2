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


const Gameboard = ({gameStarted, gameOver, setGameOver, score, setScore, 
	highScore, setHighScore, newHighScore, setNewHighScore}) => {
	

    // set new high score state, to be passed as prop to game over screen component prior to mount 		
	useEffect(() => {
		if(gameStarted) {
			setNewHighScore(true);
		} else {
			setNewHighScore(false); 
		}
	}, [highScore]);


    // reset new high score state on game over in prep for game restart
	useEffect(() => {
		if(gameOver === true && newHighScore === true) {
			setNewHighScore(false);  
		}
	}, [gameOver]);

	return (
		<>	
			<div className = 'h-auto w-full p-5 mt-5 flex justify-around items-center'>
				<Scorebox score={score}
				setScore={setScore}/>
				<div className = ' p-5 h-[480px] w-[800px] border border-solid border-black border-[15px] relative'>
					{gameStarted? (
						gameOver? <GameOverScreen score={score} newHighScore={newHighScore}/>  : 
						<Snakescreen 
						gameStarted={gameStarted} 
						score={score} 
						setScore={setScore}
						gameOver={gameOver}
						setGameOver={setGameOver}/> ) : (
						<Openingscreen/>
						)}
				</div>
				<Highscorebox 
				score={score} 
				setScore={setScore}
				highScore={highScore} 
				setHighScore={setHighScore}
				gameStarted={gameStarted}
				gameOver={gameOver}
				newHighScore={newHighScore}
				setNewHighScore={setNewHighScore}/>	
			</div>		
		</>
	)
}

export default Gameboard