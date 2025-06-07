'use client'

import { useEffect, useState } from 'react'
import { extractYouTubeID1 } from '@/lib/utils'

interface VideoPlayerProps {
	url: string
	autoPlay?: boolean
}

export function VideoPlayer({ url, autoPlay = false }: VideoPlayerProps) {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return (
			<div className='aspect-video w-full animate-pulse rounded-lg bg-muted'></div>
		)
	}

	const videoId = extractYouTubeID1(url)

	if (!videoId) {
		return (
			<div className='text-center text-sm text-red-500'>
				Invalid YouTube URL
			</div>
		)
	}

	const embedUrl = `https://www.youtube.com/embed/${videoId}${
		autoPlay ? '?autoplay=1' : ''
	}`

	return (
		<div className='aspect-video w-full overflow-hidden rounded-lg'>
			<iframe
				width='100%'
				height='100%'
				src={embedUrl}
				title='YouTube video player'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen
				className='border-0'
			></iframe>
		</div>
	)
}
