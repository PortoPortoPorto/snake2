import React from 'react'; 
import { useState, useEffect } from 'react';

const Snakebody = ({headPosition, secondPosition, thirdPosition, fourthPosition, direction, wallCollision, fruitCollision}) => {


	return (
		<>		
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
		</>
	)
}

export default Snakebody