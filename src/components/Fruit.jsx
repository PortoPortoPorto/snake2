import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAppleWhole} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef} from 'react'; 

const Fruit = ({headPosition, fruitCollision, setFruitCollision, onData}) => {
	const [visibleFruit, setVisibleFruit] = useState(''); 
	const [fruitLocation, setFruitLocation] = useState({left: '', top: ''}); 
	const fruitIsSet = useRef(false); 


	useEffect(() => {
		if(!fruitIsSet.current) { 
			fruitLocation.left = 16 * (Math.floor(Math.random() * 50));
			fruitLocation.top = 16 * (Math.floor(Math.random() * 28));
			setFruitLocation({left: fruitLocation.left, top : fruitLocation.top})
			onData(fruitLocation);  
			fruitIsSet.current = true; 
		} 
	}, []);

	useEffect(() => {
		if(fruitCollision === false)return; 
		fruitLocation.left = 16 * (Math.floor(Math.random() * 50));
		fruitLocation.top = 16 * (Math.floor(Math.random() * 28));
		setFruitLocation({left: fruitLocation.left, top : fruitLocation.top})
		onData(fruitLocation); 
		setFruitCollision(false); 
	}, [fruitCollision]);



	return (
		<>
			<FontAwesomeIcon icon={faAppleWhole} 
			className='text-[14px] absolute m-[1px]'
			style={{left: fruitLocation.left, top: fruitLocation.top}}/>
		</>
	)
}

export default Fruit