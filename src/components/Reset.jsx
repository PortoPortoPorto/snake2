import React from 'react';
import { useState, useEffect, useRef } from 'react'; 

const Reset = ({gameStarted, setGameStarted, gameOver, setGameOver, score, setScore}) => {
	const resetIsMounted = useRef(false); 

   //toggle game started / game over states on button click
	const startNewGame = () => {
		gameStarted === true? setGameStarted(false) : setGameStarted(true);
		gameOver === true? setGameOver(false) : '';
		setScore(0);  
	}

	// might not need this? As it seems to purely log when the game has started? 
	useEffect(() => {
		if(resetIsMounted.current === false) {
			resetIsMounted.current = true;
			return; 
		}	
		console.log('Game Started:', gameStarted);
	}, [gameStarted]);

	return (
		<>
			<div className= 'w-full mt-6 flex justify-center'>
				<button 
				className='text-2xl bg-orange-200 border border-solid border-black p-3 rounded-md hover:bg-orange-300'
				onClick={startNewGame}>
					<>{gameStarted ? 'RESET' : 'START' }</>
				</button>
			</div>	
		</>
	)
}

export default Reset