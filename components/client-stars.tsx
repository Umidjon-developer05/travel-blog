'use client'

import ReactStars from 'react-stars'

const ClientStars = ({
	rating,
	setRating,
}: {
	rating: number
	setRating: any
}) => {
	const ratingChanged = (newRating: number) => {
		setRating(newRating)
	}

	return (
		<div className='mb-10'>
			<ReactStars
				count={5} // Doimiy 5 ta yulduz
				value={rating} // Faol (sariq) yulduzlar soni
				onChange={ratingChanged}
				size={24}
				color1='#ccc' // Faol bo'lmagan yulduzlar (kulrang)
				color2='#ffd700' // Faol (bosilgan) yulduzlar (oltin)
			/>
			{/* Misol uchun, hozirgi reytingni ko'rsatish */}
			<p className='text-sm text-gray-500 mt-2'>
				Tanlangan reyting: {rating} / 5
			</p>
		</div>
	)
}

export default ClientStars
