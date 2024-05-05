import React from 'react';
import { useState, useEffect, useRef } from 'react';

const GameOverScreen = ({score, newHighScore}) => {
	
	let scoreToRender = score;
	//create a ref to hold a reference to the audio object
	const newHighScoreRef = useRef(false);

	useEffect(() => {
		newHighScoreRef.current = newHighScore;
	}, []);

	//if there is a newHighScore registered, game over screen will render this information
	return (
		<>
			<div className= 'h-full w-full p-5 flex flex-col justify-around items-center text-8xl '>
				<p>GAME OVER</p>
				{ !newHighScoreRef.current  ? <p className= 'text-4xl'>Your score: {scoreToRender}</p> : 
					<div className = 'flex items-center justify-around'>
						<p className= 'text-4xl p-3'>New High Score:</p>
						<p className = 'text-4xl text-orange-300 p-3'>{scoreToRender}</p>
					</div>
				}
			</div>
		</>
	)
}

export default GameOverScreen