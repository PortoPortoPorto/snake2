import React from 'react'

const Scorebox = () => {
	return (
		<>  
			<div className = 'flex flex-col items-center justify-between'>
				<div className = 'text-3xl m-2'>
					Score
				</div>
				<div className = 'h-44 w-44 border border-solid border-black border-1 rounded-sm flex justify-center items-center'>
					<h1 className = 'text-4xl'>0</h1>
				</div>
			</div>
		</>
	)
}

export default Scorebox