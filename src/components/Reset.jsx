import React from 'react';
import { useState, useEffect } from 'react'; 

const Reset = ({gameStarted, setGameStarted}) => {

	const startNewGame = () => {
		gameStarted === true? setGameStarted(false) : setGameStarted(true);
	}

	useEffect(() => {
		console.log('Game Started:', gameStarted);
	}, [gameStarted]);

	return (
		<>
			<div className= 'w-full mt-6 flex justify-center'>
				<button 
				className='text-2xl bg-green-100 border border-solid border-black p-3 rounded-md'
				onClick={startNewGame}>
					<>{gameStarted ? 'RESET' : 'START' }</>
				</button>
			</div>	
		</>
	)
}

export default Reset