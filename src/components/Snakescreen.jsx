import React from 'react';
import { useState, useEffect } from 'react';

const Snakescreen = () => {
	
	const [headPosition, setHeadPosition] = useState({ left: 64, top:16 }); 
	const [secondPosition, setSecondPosition] = useState({ left: 48, top: 16});
	const [thirdPosition, setThirdPosition] = useState({ left: 32, top: 16});
	const [fourthPosition, setFourthPosition] = useState({ left: 16, top: 16});
	const [direction, setDirection] = useState(''); 
	const [wallCollision, setWallCollision] = useState(false); 

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
	 		return prevDirection; 
	 	});
	}

	const checkForWallCollision = (newHeadPosition) => {
		setWallCollision(prevWallCollision => {
			console.log(newHeadPosition.top);
			if (newHeadPosition.top < 0 || newHeadPosition.top > 464) {
				return true; 
			} else if (newHeadPosition.left < 0 || newHeadPosition.left > 784) {
				return true; 
			}
			return prevWallCollision; 	
		}); 
		console.log('wall collision:', wallCollision);
	}


	useEffect(() => {
		window.addEventListener('keydown', handleArrowKey); 
		return () => {
			window.removeEventListener('keydown', handleArrowKey); 
		}; 
	}, []); 

	useEffect(() => {
		moveHead();
		console.log(headPosition); 
	}, [direction]); 

	useEffect(() => {
		console.log('wall collision:', wallCollision);
		console.log('game over'); 
	}, [wallCollision]); 


	const moveHead = () => {
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
		setHeadPosition(newHeadPosition); 
		checkForWallCollision(newHeadPosition);
	}; 


	return (
		<>
		<div className='h-full w-full p-5  justify-center items-center'>
				<div name='snakeComponent'
					 className= {`h-[14px] w-[14px] ${wallCollision ? 'bg-[#647564]' : 'bg-black'} rounded-md m-[1px] absolute`} 
				     style={{left: headPosition.left, top: headPosition.top}}>				    	
				</div>
				<div name='snakeComponent'
					 className= 'h-[14px] w-[14px] bg-black rounded-md m-[1px] absolute' 
				     style={{left: secondPosition.left, top: secondPosition.top}}>				    	
				</div>
				<div name='snakeComponent'
					 className= 'h-[14px] w-[14px] bg-black rounded-md m-[1px] absolute' 
				     style={{left: thirdPosition.left, top: thirdPosition.top}}>				    	
				</div>
				<div name='snakeComponent'
					 className= 'h-[14px] w-[14px] bg-black rounded-md m-[1px] absolute' 
				     style={{left: fourthPosition.left, top: fourthPosition.top}}>				    	
				</div>

		</div>
		</>
	)
}

export default Snakescreen