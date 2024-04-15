import React from 'react';
import { useState, useEffect } from 'react';

const Snakescreen = () => {
	
	const [headPosition, setHeadPosition] = useState({ left: 64, top:16 }); 
	const [secondPosition, setSecondPosition] = useState({ left: 48, top: 16});
	const [thirdPosition, setThirdPosition] = useState({ left: 32, top: 16});
	const [fourthPosition, setFourthPosition] = useState({ left: 16, top: 16});
	const [direction, setDirection] = useState(''); 
	const [collision, setCollison] = useState(false); 

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

	useEffect(() => {
		window.addEventListener('keydown', handleArrowKey); 
		return () => {
			window.removeEventListener('keydown', handleArrowKey); 
		}; 
	}, []); 

	useEffect(() => {
		console.log(direction); 
		moveHead(); 
	}, [direction]); 

	useEffect(() => {
	}, [headPosition]); 


	const moveHead = () => {
		const previousLeftPosition = headPosition.left;
		const previousTopPosition = headPosition.top;
		
		if(direction === 'up') {
			const newTopPosition = previousTopPosition - 16;
			setHeadPosition({left : previousLeftPosition, top : newTopPosition});
			setSecondPosition({left: previousLeftPosition, top: previousTopPosition}); 
			setThirdPosition(secondPosition);
			setFourthPosition(thirdPosition);
		} else if (direction === 'down') {
			const newTopPosition = previousTopPosition + 16;
			setHeadPosition({left : previousLeftPosition, top : newTopPosition});
			setSecondPosition({left: previousLeftPosition, top: previousTopPosition});  
			setThirdPosition(secondPosition);
			setFourthPosition(thirdPosition);
		} else if (direction === 'right') {
			const newLeftPosition = previousLeftPosition + 16;
			setHeadPosition({left : newLeftPosition, top : previousTopPosition});
			setSecondPosition({left: previousLeftPosition, top: previousTopPosition}); 
			setThirdPosition(secondPosition);
			setFourthPosition(thirdPosition); 
		} else if (direction === 'left') {
			const newLeftPosition = previousLeftPosition - 16;
			setHeadPosition({left : newLeftPosition, top : previousTopPosition});
			setSecondPosition({left: previousLeftPosition, top: previousTopPosition});
			setThirdPosition(secondPosition); 
			setFourthPosition(thirdPosition); 
		} 
	}; 


	return (
		<>
		<div className='h-full w-full p-5  justify-center items-center'>
				<div name='snakeComponent'
					 className= 'h-[14px] w-[14px] bg-black rounded-md m-[1px] absolute' 
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