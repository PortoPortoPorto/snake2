import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Snakebody from './Snakebody'; 
import Fruit from './Fruit';
import over from '../assets/sounds/over.wav';  

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
	const [goldenFruitCollision, setGoldenFruitCollision] = useState(false); 
	const [fruitLocation, setFruitLocation] = useState({left: '', top: ''});
	const [goldenFruitLocation, setGoldenFruitLocation] = useState({left: '', top: ''}); 
	const snakeHasStarted = useRef(false); 
	const wallInitialised = useRef(false); 
	const bodyInitialised = useRef(false); 
	const gameOverStateInitialised = useRef(false); 
	//create a ref to hold a reference to audio objects
	const audioRef = useRef(null); 
	const directionRef = useRef('');
	const arrowClicked = useRef(false); 


	const handleArrowKey = (event) => { 
	// if arrow has been clicked already within the current move interval, return. Otherwise, set direction 	
	 	if(arrowClicked.current === true)return;
	 	arrowClicked.current = true; 	
	 	setDirection(prevDirection => {
	 		if(event.key === 'ArrowRight') {
	 			if(directionRef.current === 'left') {
	 				return 'left';
	 			} else {
	 				return 'right';
	 			}	
	 		} else if(event.key === 'ArrowLeft') {
	 			if(directionRef.current === 'right') {
	 				return 'right';
	 			} else {
	 				return 'left'; 
	 			}
	 		} else if(event.key === 'ArrowUp') {
	 			if(directionRef.current === 'down') {
	 				return 'down'; 
	 			} else {
	 				return 'up'; 
	 			}
	 		} else if(event.key === 'ArrowDown') {
	 			if(directionRef.current === 'up') {
	 				return 'up';
	 			} else {
	 				return 'down'; 
	 			}
	 		} 
	 		return direction; 
	 	});	
	}

    //reset arrow clicked ref, called in snakebody automove function at intervals
	const arrowReset = (arrowState) => {
		arrowClicked.current = arrowState;
	}

    // check if snake head has collided with the game walls
	const checkForWallCollision = () => {
		setWallCollision(prevWallCollision => {
			if (headPosition.top < 0 || headPosition.top > 432) {
				return true; 
			} else if (headPosition.left < 0 || headPosition.left > 752) {
				return true; 
			}
			return prevWallCollision; 	
		}); 
	}

	// check if the snake head has collided with fruit 
	const checkForFruitCollision = () => {	
		if(fruitLocation.left === headPosition.left && fruitLocation.top === headPosition.top) {
			setScore((prevScore) => prevScore + 1);  
			setFruitCollision((f) => true);  
		} 
	}

	// check if snake head has collided with golden fruit 
	const checkForGoldenFruitCollision = () => {
		if(goldenFruitLocation.left === headPosition.left && goldenFruitLocation.top === headPosition.top) {
			setScore((prevScore) => prevScore + 5); 
			setGoldenFruitCollision((g) => true); 			
		}
	}

	// check if snake head has collided with snake body 
	const checkForBodyCollision = () => {
		bodyPositions.forEach((bodyPosition, index) => {
			if(bodyPosition.left === headPosition.left && bodyPosition.top === headPosition.top) {
				setBodyCollision((b) => true); 
			}
		});
	}

	//receive head position from child component (snakeBody) and run all neccessary checks
	const receiveHeadPosition = (headData) => {
		checkForFruitCollision();  
		checkForWallCollision();
		checkForBodyCollision();
		checkForGoldenFruitCollision();   
	}

	//set game over sound and state 
	const itsGameOver = () => {
		audioRef.current.play();
		const gameOverTimeout = setTimeout(() => {
			setGameOver(true); 
		}, 1000);
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

	//handle body collision, wall collision and game over states 
	useEffect(() => {
		if(!wallInitialised.current) {
			wallInitialised.current = true;
			return;
		}
		console.log('wall collision:', wallCollision);
		if(wallCollision === true) {
			itsGameOver();
		}
	}, [wallCollision]); 

	useEffect(() => {
		if(!bodyInitialised.current) {
			bodyInitialised.current = true;
			return; 
		}
		console.log('body collision:', bodyCollision);
		bodyCollision === true? itsGameOver() : ''; 
	}, [bodyCollision])

	useEffect(() => {
		if(!gameOverStateInitialised.current) {
			gameOverStateInitialised.current = true;
			return;
		}
		console.log('game over:', gameOver); 
	}, [gameOver])

	useEffect(() => {
		directionRef.current = direction; 
	}, [direction]);


	return (
		<>
		<div className='h-full w-full p-5  justify-center items-center'>
			<Snakebody 
			handleArrowKey={handleArrowKey}
			direction={direction}
			setDirection={setDirection}	
			wallCollision={wallCollision}
			bodyCollision={bodyCollision}
			fruitCollision={fruitCollision}
			goldenFruitCollision={goldenFruitCollision}
			onData={checkForWallCollision}
			headData={receiveHeadPosition}
			headPosition={headPosition}
			setHeadPosition={setHeadPosition}
			bodyPositions={bodyPositions}
			setBodyPositions={setBodyPositions}
			arrowData={arrowReset}
			/>
			<Fruit
			headPosition={headPosition}
			fruitCollision={fruitCollision}
			setFruitCollision={setFruitCollision}
			fruitLocation={fruitLocation}
			setFruitLocation={setFruitLocation}
			goldenFruitLocation={goldenFruitLocation}
			setGoldenFruitLocation={setGoldenFruitLocation}
			goldenFruitCollision={goldenFruitCollision}
			setGoldenFruitCollision={setGoldenFruitCollision}
			bodyPositions={bodyPositions}
			/>
		</div>
		<audio ref={audioRef} src={over}/>
		</>
	)
}

export default Snakescreen