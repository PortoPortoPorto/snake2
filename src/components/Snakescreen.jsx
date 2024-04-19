import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Snakebody from './Snakebody'; 
import Fruit from './Fruit'; 

const Snakescreen = ({gameStarted}) => {
	const [headPosition, setHeadPosition] = useState({ left: 64, top:16 }); 
	const [secondPosition, setSecondPosition] = useState({ left: 48, top: 16});
	const [thirdPosition, setThirdPosition] = useState({ left: 32, top: 16});
	const [fourthPosition, setFourthPosition] = useState({ left: 16, top: 16});
	const [direction, setDirection] = useState('right'); 
	const [wallCollision, setWallCollision] = useState(false); 
	const [fruitCollision, setFruitCollision] = useState(false); 
	const [count, setCount] = useState(0);
	const snakeHasStarted = useRef(false); 
	const wallInitialised = useRef(false); 
	const fruitLoc = useRef(''); 


	const handleArrowKey = (event) => {
	 	console.log(event.key); 
	 	console.log(direction); 
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

	const checkForWallCollision = (newHeadPosition) => {
		setWallCollision(prevWallCollision => {
			if (newHeadPosition.top < 0 || newHeadPosition.top > 464) {
				return true; 
			} else if (newHeadPosition.left < 0 || newHeadPosition.left > 784) {
				return true; 
			}
			return prevWallCollision; 	
		}); 
	}

	const checkForFruitCollision = (fruitLocation) => {
		fruitLoc.current = fruitLocation; 
		if(fruitLoc.current.left === headPosition.left && fruitLoc.current.top === headPosition.top) {
			setFruitCollision((f) => true);  
		} 
	}


	const moveHead = (direction, headPosition) => {
		const previousLeftPosition = headPosition.left;
		const previousTopPosition = headPosition.top;
		let newHeadPosition; 
		
		if(direction === 'up') {
			const newTopPosition = previousTopPosition - 16;
			newHeadPosition = {left: previousLeftPosition, top: newTopPosition};
			setSecondPosition({left: previousLeftPosition, top: previousTopPosition}); 
			setThirdPosition(secondPosition);
			setFourthPosition(thirdPosition);
		} else if (direction === 'down') {
			const newTopPosition = previousTopPosition + 16;
			newHeadPosition = {left: previousLeftPosition, top: newTopPosition};
			setSecondPosition({left: previousLeftPosition, top: previousTopPosition});  
			setThirdPosition(secondPosition);
			setFourthPosition(thirdPosition);
		} else if (direction === 'right') {
			const newLeftPosition = previousLeftPosition + 16;
			newHeadPosition = {left: newLeftPosition, top: previousTopPosition};
			setSecondPosition({left: previousLeftPosition, top: previousTopPosition}); 
			setThirdPosition(secondPosition);
			setFourthPosition(thirdPosition); 
		} else if (direction === 'left') {
			const newLeftPosition = previousLeftPosition - 16;
			newHeadPosition = {left: newLeftPosition, top: previousTopPosition};
			setSecondPosition({left: previousLeftPosition, top: previousTopPosition});
			setThirdPosition(secondPosition); 
			setFourthPosition(thirdPosition); 
		} else {
			return;
		}
		setHeadPosition((prevHeadPosition) => newHeadPosition); 
		checkForWallCollision(newHeadPosition);
		checkForFruitCollision(fruitLoc.current); 
	}; 

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
	//set up autoMove interval
		const autoMoveInterval = setInterval(() => {
			setDirection((d) => direction);
			setHeadPosition((p) => headPosition);  
			moveHead(direction, headPosition); 
		}, 200);
		return () => {
			clearInterval(autoMoveInterval);
		}
	}, [headPosition, direction]);

	useEffect(() => {
		if(!wallInitialised.current){
			wallInitialised.current = true;
			return;
		}
		console.log('wall collision:', wallCollision);
		wallCollision === true ? console.log('game over') : '';   
	}, [wallCollision]); 


	useEffect(() => {
		if(fruitCollision === false)return;

		console.log('NOM NOM NOM NOM NOM NOM NOM'); 
	}, [fruitCollision]);

	return (
		<>
		<div className='h-full w-full p-5  justify-center items-center'>
			<Snakebody 
			headPosition={headPosition} 
			secondPosition={secondPosition}
			thirdPosition={thirdPosition}
			fourthPosition={fourthPosition}
			direction={direction}	
			wallCollision={wallCollision}
			fruitCollision={fruitCollision}
			/>
			<Fruit
			headPosition={headPosition}
			fruitCollision={fruitCollision}
			onData={checkForFruitCollision}
			fruitCollision={fruitCollision}
			setFruitCollision={setFruitCollision}
			/>
		</div>
		</>
	)
}

export default Snakescreen