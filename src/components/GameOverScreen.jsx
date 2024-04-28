import React from 'react';
import { useState, useEffect } from 'react';

const GameOverScreen = (score) => {
	
	let scoreToRender = score;

	return (
		<>
			<div className= 'h-full w-full p-5 flex flex-col justify-around items-center text-8xl'>
				<p>GAME OVER</p>
				<p className= 'text-4xl'>Your score: {scoreToRender.score}</p>
			</div>
		</>
	)
}

export default GameOverScreen