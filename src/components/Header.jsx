import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStaffSnake} from '@fortawesome/free-solid-svg-icons';


const Header = () => {
	return (
		<>
			<div className = 'text-6xl flex justify-center h-36 p-8 font-sans'>
				<h1>SNAKE</h1>
				<FontAwesomeIcon icon={faStaffSnake} className='ml-5'/>
			</div>	
		</>
	)
}

export default Header