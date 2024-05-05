import React from 'react'; 
import { useState, useEffect, useRef } from 'react';

const Highscorebox = ({score, setScore, highScore, setHighScore, gameOver, gameStarted, newHighScore}) => {

	const [highScoreFromStorage, setHighScoreFromStorage] = useState(0)
	const [newHighScoreFlash, setNewHighScoreFlash] = useState(false); 


	const checkForHighScore = () => {
		//if score is higher than high scores in local storage and in game, set as high score and set in storage
		if(score >= highScore) {
			let storageScore = getHighScore(); 
			if(storageScore === 'null' || score > storageScore) {
				setHighScoreFromStorage(score);
				localStorage.setItem('high', JSON.stringify(score));
				setHighScore(score); 
				console.log('new high score set at:', score);
			} else {
				setHighScore(highScoreFromStorage); 
			}
		}
	}

	//check local storage for high score, to be returned as current high score on mount
	const getHighScore = () => {
		const storedHighScore = localStorage.getItem('high');
		if(!storedHighScore)return 0;  
		const parsedScore = JSON.parse(storedHighScore);
		setHighScoreFromStorage(parsedScore);
		return parsedScore; 
	}


	//retrieve highScoreData from local storage on mount 
	useEffect(() => {
		setHighScore(getHighScore()); 
	}, []);


	useEffect(() => {
		if(!gameStarted)return; 
		checkForHighScore();
	}, [score]);

	useEffect(() => {
		if(!gameStarted)return;
		setNewHighScoreFlash(true);
		const highScoreFlash = setTimeout(() => {
			setNewHighScoreFlash(false);
		}, 200); 
	}, [highScore]);

	return (
		<>
			<div className = 'flex flex-col items-center justify-between'>
				<div className = 'text-3xl m-2'>
					High Score
				</div>
				<div className = 'h-44 w-44 border border-solid border-black border-2 rounded-sm flex justify-center items-center'>
					<h1 className ={`text-5xl ${newHighScoreFlash ? 'text-orange-300 text-7xl' : ''}`}>{highScore}</h1> 
				</div>
			</div>
		</>
	)
}

export default Highscorebox