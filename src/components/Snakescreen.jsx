import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Snakebody from './Snakebody'; 
import Fruit from './Fruit'; 

const Snakescreen = ({gameStarted, score, setScore, gameOver, setGameOver}) => {
	const [headPosition, setHeadPosition] = useState({ left: 64, top:16 });
	const [bodyPositions, setBodyPositions] = useState([
//initial array of body positions, to be passed to the snakeBody component for further updates 
	{id: 0, name: 'Body 1', left: 48, top: 16},
	{id: 1, name: 'Body 2', left: 32, top: 16},
	{id: 2, name: 'Body 3', left: 16, top: 16}
	]);
	const [direction, setDirection] = useState('right');
	const [wallCollision, setWallCollision] = useState(false); 
	const [fruitCollision, setFruitCollision] = useState(false); 
	const [bodyCollision, setBodyCollision] = useState(false); 
	const [fruitLocation, setFruitLocation] = useState({left: '', top: ''});
	const snakeHasStarted = useRef(false); 
	const wallInitialised = useRef(false); 
	const bodyInitialised = useRef(false); 
	const gameOverStateInitialised = useRef(false); 

	


const handleArrowKey = (event) => {
	 	setDirection(prevDirection => {
	 		if(event.key === 'ArrowRight' && prevDirection !== 'left') {
	 			return 'right';
	 		} else if(event.key === 'ArrowLeft' && prevDirection !== 'right') {
	 			return 'left'; 
	 		} else if(event.key === 'ArrowUp' && prevDirection !== 'down') {
	 			return 'up';
	 		} else if(event.key === 'ArrowDown' && prevDirection !== 'up') {
	 			return 'down'; 
	 		} 

	 		return direction; 
	 	});
	}

	const checkForWallCollision = () => {
		setWallCollision(prevWallCollision => {
			if (headPosition.top < 0 || headPosition.top > 464) {
				return true; 
			} else if (headPosition.left < 0 || headPosition.left > 784) {
				return true; 
			}
			return prevWallCollision; 	
		}); 
	}

	const checkForFruitCollision = () => {
	
		if(fruitLocation.left === headPosition.left && fruitLocation.top === headPosition.top) {
			console.log('YEAH'); 
			setScore((prevScore) => prevScore + 1);  
			setFruitCollision((f) => true);  
		} 
	}

	const checkForBodyCollision = () => {
		bodyPositions.forEach((bodyPosition, index) => {
			if(bodyPosition.left === headPosition.left && bodyPosition.top === headPosition.top) {
				setBodyCollision((b) => true); 
			}
		});
	}

	const receiveHeadPosition = (headData) => {
		checkForFruitCollision();  
		checkForWallCollision();
		checkForBodyCollision();  
	}


		useEffect(() => {
	//add event listeners and set up state
		window.addEventListener('keydown', handleArrowKey); 
		if(snakeHasStarted.current === true)return; 
		snakeHasStarted.current = true;
		window.addEventListener('keydown', handleArrowKey); 
		return () => {
		//clean up event listeners, direction etc	
			window.removeEventListener('keydown', handleArrowKey);
			setDirection(''); 
		}; 
	}, []); 


	useEffect(() => {
		if(!wallInitialised.current) {
			wallInitialised.current = true;
			return;
		}
		console.log('wall collision:', wallCollision);
		wallCollision === true ? setGameOver(true) : '';   
	}, [wallCollision]); 

	useEffect(() => {
		if(!bodyInitialised.current) {
			bodyInitialised.current = true;
			return; 
		}
		console.log('body collision:', bodyCollision);
		bodyCollision === true? setGameOver(true) : ''; 
	}, [bodyCollision])

	useEffect(() => {
		if(!gameOverStateInitialised.current) {
			gameOverStateInitialised.current = true;
			return;
		}

		console.log('game over:', gameOver); 
	}, [gameOver])

	return (
		<>
		<div className='h-full w-full p-5  justify-center items-center'>
			<Snakebody 
			handleArrowKey={handleArrowKey}
			direction={direction}
			setDirection={setDirection}	
			wallCollision={wallCollision}
			fruitCollision={fruitCollision}
			onData={checkForWallCollision}
			headData={receiveHeadPosition}
			headPosition={headPosition}
			setHeadPosition={setHeadPosition}
			bodyPositions={bodyPositions}
			setBodyPositions={setBodyPositions}
			/>
			<Fruit
			headPosition={headPosition}
			fruitCollision={fruitCollision}
			setFruitCollision={setFruitCollision}
			fruitLocation = {fruitLocation}
			setFruitLocation = {setFruitLocation}
			/>
		</div>
		</>
	)
}

export default Snakescreen