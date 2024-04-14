import React from 'react';
import Scorebox from './Scorebox';
import Snakebox from './Snakebox';
import Highscorebox from './Highscorebox';


const Gameboard = ({gameStarted, setGameStarted}) => {
	return (
		<>	
			<div className = 'h-auto w-full p-5 mt-5 flex justify-around items-center'>
				<Scorebox/>
				<Snakebox gameStarted={gameStarted} setGameStarted={setGameStarted}/>
				<Highscorebox/>	
			</div>		
		</>
	)
}

export default Gameboard