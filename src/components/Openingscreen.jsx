import React from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStaffSnake} from '@fortawesome/free-solid-svg-icons';
import {faAppleWhole} from '@fortawesome/free-solid-svg-icons';

const Openingscreen = () => {
	return (
		<>
		  <div className='h-full w-full p-5 flex justify-center items-center'>
		  	<FontAwesomeIcon icon={faStaffSnake} className='text-8xl m-5'/>
		  	<div name='snakeComponent 'className= 'h-[80px] w-[80px] bg-black rounded-md m-5'></div>
		  	<FontAwesomeIcon icon={faAppleWhole} className='text-8xl m-5'/>
		  	<div name='snakeComponent 'className= 'h-[80px] w-[80px] bg-black rounded-md m-5'></div>
		  </div>	
		</>
	)
}

export default Openingscreen