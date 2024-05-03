import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAppleWhole} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef} from 'react'; 
import munch from '../assets/sounds/munch.wav';
import gold from '../assets/sounds/gold.wav'; 

const Fruit = ({headPosition, fruitCollision, setFruitCollision, fruitLocation, 
	setFruitLocation, goldenFruitLocation, setGoldenFruitLocation,
	goldenFruitCollision, setGoldenFruitCollision, bodyPositions}) => {
	const goldenFruitSet = useRef(false); 
	const fruitIsSet = useRef(false);
	//create a ref to hold a reference to the audio object
	const audioRef = useRef(null); 
	const goldAudioRef = useRef(null); 

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
		rollForGoldenFruit(); 
		fruit(); 
	}, [fruitCollision]);

	useEffect(() => {
		if(goldenFruitCollision === false)return; 
		goldSound();
		goldenFruitSet.current = false; 
		setGoldenFruitCollision((g) => false); 
	}, [goldenFruitCollision]);


	const munchSound = () => {
		audioRef.current.play(); 
	}

	const goldSound = () => {
		goldAudioRef.current.play(); 
	}


    // roll to see if golden fruit will materialise 
	const rollForGoldenFruit = () => {
		let rolledNumber = Math.floor(Math.random() * 100);
		console.log(rolledNumber);
		rolledNumber >= 90? goldenFruit(): ''; 
	}

	const fruit = () => {
		let fruitLocation = randomFruit(); 
	//check to see it fruit spawns on occupied tile, if so, rerun function	
		let fruitOccupied = bodyPositions.some(bodyPosition => 
			(bodyPosition.left === fruitLocation.left && bodyPosition.top === fruitLocation.top));
		if(fruitOccupied){
			fruitLocation = randomFruit();
		} if(fruitOccupied){
			fruitLocation = randomFruit();
		} if(fruitOccupied){
			fruitLocation = randomFruit();
		} 
		setFruitLocation({left: fruitLocation.left, top : fruitLocation.top})
		setFruitCollision(false); 
	}

	const goldenFruit = () => {
		//if golden fruit has already been set, return 
		if(goldenFruitSet.current === true)return; 
		//set golden fruit location and place on board. set timeout for removal of golden fruit 
		let goldenFruitLocation = randomFruit(); 
	//check to see it fruit spawns on occupied tile, if so, rerun function
		let fruitOccupied = bodyPositions.some(bodyPosition => 
			(bodyPosition.left === goldenFruitLocation.left && bodyPosition.top === goldenFruitLocation.top));
	//if fruit would spawn on occupied tile, return. If not, spawn golden fruit
		if(fruitOccupied) return;
		setGoldenFruitLocation({left: goldenFruitLocation.left, top: goldenFruitLocation.top});
		goldenFruitSet.current = true; 
		const goldenFruitTimeout = setTimeout (() => {
			goldenFruitSet.current = false;
			setGoldenFruitLocation({left: '', top: ''});
		}, 5000);
	}

	const randomFruit = () => {
		const fruit = {left: '', top: ''};
		fruit.left = 16 * (Math.floor(Math.random() * 48));
		fruit.top = 16 * (Math.floor(Math.random() * 27));
		return fruit; 
	}


	return (
		<>
			<FontAwesomeIcon icon={faAppleWhole} 
			className='text-[14px] absolute m-[1px]'
			style={{left: fruitLocation.left, top: fruitLocation.top}}/>
			{goldenFruitSet.current ? <FontAwesomeIcon icon={faAppleWhole} 
			className='text-[14px] text-amber-200 absolute m-[1px]'
			style={{left: goldenFruitLocation.left, top: goldenFruitLocation.top}}/> : ''}
			<audio ref={audioRef} src={munch}/>
			<audio ref={goldAudioRef} src={gold}/>

		</>
	)
}

export default Fruit