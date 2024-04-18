import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAppleWhole} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef} from 'react'; 

const Fruit = ({headPosition, fruitCollision, fruitLocation, setFruitLocation}) => {
	const [visibleFruit, setVisibleFruit] = useState(''); 
	const fruitIsSet = useRef(false); 


	useEffect(() => {
		if(!fruitIsSet.current) { 
			fruitLocation.left = 16 * (Math.floor(Math.random() * 50));
			fruitLocation.top = 16 * (Math.floor(Math.random() * 28));
			console.log('fruitLocation:', fruitLocation);
			console.log('fruitCollision;', fruitCollision);  
			fruitIsSet.current = true; 
		}
	}, []);

	return (
		<>
			<FontAwesomeIcon icon={faAppleWhole} 
			className='text-[14px] absolute m-[1px]'
			style={{left: fruitLocation.left, top: fruitLocation.top}}/>
		</>
	)
}

export default Fruit