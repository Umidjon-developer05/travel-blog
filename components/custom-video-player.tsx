'use client'

import { useEffect, useRef, useState } from 'react'
import { extractYouTubeID1 } from '@/lib/utils'
import { Loader } from 'lucide-react'

interface CustomVideoPlayerProps {
	url: string
	onReady?: () => void
}

export function CustomVideoPlayer({ url, onReady }: CustomVideoPlayerProps) {
	const [isLoading, setIsLoading] = useState(true)
	const iframeRef = useRef<HTMLIFrameElement>(null)
	const videoId = extractYouTubeID1(url)

	useEffect(() => {
		// Call onReady after a short delay to simulate video loading
		if (videoId && onReady) {
			const timer = setTimeout(() => {
				setIsLoading(false)
				onReady()
			}, 1500)

			return () => clearTimeout(timer)
		}
	}, [videoId, onReady])

	if (!videoId) {
		return (
			<div className='w-full h-full flex items-center justify-center bg-black'>
				<p className='text-white'>Invalid video URL</p>
			</div>
		)
	}

	// YouTube embed parameters to hide branding as much as possible
	const embedParams = new URLSearchParams({
		autoplay: '1',
		controls: '1',
		modestbranding: '1',
		rel: '0',
		showinfo: '0',
		iv_load_policy: '3',
		fs: '1',
		playsinline: '1',
		enablejsapi: '1',

		origin: typeof window !== 'undefined' ? window.location.origin : '',
	}).toString()

	return (
		<div className='relative w-full h-full bg-black '>
			{isLoading && (
				<div className='absolute inset-0 z-10 flex items-center justify-center bg-black'>
					<Loader className='h-10 w-10 text-white animate-spin' />
				</div>
			)}

			<iframe
				ref={iframeRef}
				src={`https://www.youtube.com/embed/${videoId}?${embedParams}`}
				className='w-full h-full border-0 '
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen
				onLoad={() => {
					setIsLoading(false)
					if (onReady) onReady()
				}}
			/>
		</div>
	)
}
