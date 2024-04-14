import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAppleWhole} from '@fortawesome/free-solid-svg-icons';
import Fruit from './Fruit';
import Snakebody from './Snakebody';
import Snakescreen from './Snakescreen';
import Openingscreen from './Openingscreen';

const Snakebox = ({gameStarted, setGameStarted}) => {
	return (
		<>
			<div className = ' p-5 h-[480px] w-[800px] border border-solid border-black border-2'>
				{gameStarted? <Snakescreen/> : <Openingscreen/>}
			</div>
		</>
	)
}

export default Snakebox