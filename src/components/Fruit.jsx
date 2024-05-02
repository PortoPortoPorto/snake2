import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAppleWhole} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef} from 'react'; 
import munch from '../assets/sounds/munch.wav';

const Fruit = ({headPosition, fruitCollision, setFruitCollision, fruitLocation, setFruitLocation}) => {
	const [visibleFruit, setVisibleFruit] = useState('');  
	const fruitIsSet = useRef(false);
	//create a ref to hold a reference to the audio object
	const audioRef = useRef(null); 

	useEffect(() => {
		if(!fruitIsSet.current) { 
			fruitLocation.left = 16 * (Math.floor(Math.random() * 48));
			fruitLocation.top = 16 * (Math.floor(Math.random() * 27));
			setFruitLocation({left: fruitLocation.left, top : fruitLocation.top})
			fruitIsSet.current = true; 
		} 
	}, []);

	useEffect(() => {
		if(fruitCollision === false)return; 
		munchSound(); 
		fruitLocation.left = 16 * (Math.floor(Math.random() * 48));
		fruitLocation.top = 16 * (Math.floor(Math.random() * 27));
		setFruitLocation({left: fruitLocation.left, top : fruitLocation.top})
		setFruitCollision(false); 
	}, [fruitCollision]);

	const munchSound = () => {
		audioRef.current.play(); 
	}


	return (
		<>
			<FontAwesomeIcon icon={faAppleWhole} 
			className='text-[14px] absolute m-[1px]'
			style={{left: fruitLocation.left, top: fruitLocation.top}}/>
			<audio ref={audioRef} src={munch}/>
		</>
	)
}

export default Fruit