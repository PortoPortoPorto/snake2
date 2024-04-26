import React from 'react'; 
import { useState, useEffect, useRef } from 'react';

const Snakebody = ({headPosition, setHeadPosition, bodyPositions, setBodyPositions, direction, setDirection, wallCollision, fruitCollision, handleArrowKey, onData, headData}) => {	
	
	const [previousBodyPositions, setPreviousBodyPositions] = useState([...bodyPositions]); 
	const [previousHeadPosition, setPreviousHeadPosition] = useState({...headPosition}); 
	const firstMove = useRef(true); 


	const moveHead = (direction, headPosition, bodyPositions, setBodyPositions) => {
			const previousLeftPosition = headPosition.left;
			const previousTopPosition = headPosition.top;
			let newHeadPosition;
			
			if(direction === 'up') {
				const newTopPosition = previousTopPosition - 16;
				newHeadPosition = {left: previousLeftPosition, top: newTopPosition};

			} else if (direction === 'down') {
				const newTopPosition = previousTopPosition + 16;
				newHeadPosition = {left: previousLeftPosition, top: newTopPosition};

			} else if (direction === 'right') {
				const newLeftPosition = previousLeftPosition + 16;
				newHeadPosition = {left: newLeftPosition, top: previousTopPosition};

			} else if (direction === 'left') {
				const newLeftPosition = previousLeftPosition - 16;
				newHeadPosition = {left: newLeftPosition, top: previousTopPosition};
			} else {
				return;
			}
			setPreviousHeadPosition((PHP) => headPosition); 
			setHeadPosition((prevHeadPosition) => newHeadPosition);
			moveBody(newHeadPosition, headPosition);
		}; 

	
	const moveBody = (newHeadPosition, headPosition) => {
	//create shallow copies of previous body position arrray, body position array and head position object
		const copyOfPreviousBodyPos = [...previousBodyPositions]
		let copyOfBodyPositions = [...bodyPositions];
		const copyOfHeadPosition = {...headPosition};
	//create new variable to replace the first body piece. new variable position moves to the (previous) head position
		let firstPosition = {...copyOfBodyPositions[0] };
		firstPosition.left = copyOfHeadPosition.left;
		firstPosition.top = copyOfHeadPosition.top; 
	// create a new array, containing all but the first body piece. Move each piece to the location of the original array at -1 index (same index due to the slice)
		let slicedCopy = copyOfBodyPositions.slice(1);
		for(let i = 0; i < slicedCopy.length; i ++) {
		 	let slicedCopyPreviousName = slicedCopy[i].name;
		 	slicedCopy[i] = {...copyOfBodyPositions[i]};
		 	slicedCopy[i].id = slicedCopy[i].id + 1;
		 	slicedCopy[i].name = slicedCopyPreviousName;  	
		}
	// replace shallow copy of body positions with a new array, made from the new first body piece and the sliced sopy array
		slicedCopy.unshift(firstPosition); 
		copyOfBodyPositions = [...slicedCopy];
	// set body positions to the updated shallow copy 
		setBodyPositions((pBp) => copyOfBodyPositions);
	//set previous body positions array to current positions, for the next movement
		setPreviousBodyPositions((P) => bodyPositions); 
	}


	const sendHeadPosition = () => {
		const headPos = headPosition;
		headData(headPos); 
	}


		useEffect(() => {
	//set up autoMove interval
		const autoMoveInterval = setInterval(() => {
			setDirection((d) => direction);
			setHeadPosition((p) => headPosition);  
			moveHead(direction, headPosition, bodyPositions, setBodyPositions);
			sendHeadPosition(); 

		}, 200);
		return () => {
			clearInterval(autoMoveInterval);
		}
	}, [headPosition, direction]);

	return (
		<>		
				<div name='snakeComponent'
					 className= {`h-[14px] w-[14px] ${wallCollision ? 'bg-[#647564]' : 'bg-black'} rounded-md m-[1px] absolute`} 
				     style={{left: headPosition.left, top: headPosition.top}}>				    	
				</div>
				{bodyPositions.map((bodyPosition, index) => (
					<div 
						key={index}
						name='snakeComponent'
						className= 'h-[14px] w-[14px] bg-black rounded-md m-[1px] absolute' 
						style={{left: bodyPosition.left, top: bodyPosition.top}}
					></div>
				))}	
		</>
	); 
}

export default Snakebody