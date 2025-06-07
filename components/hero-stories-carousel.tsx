'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CustomVideoPlayer } from '@/components/custom-video-player'

interface StoryVideo {
	id: string
	title: string
	videoUrl: string
	thumbnail: {
		id: string
		url: string
	}
}

interface HeroStoriesCarouselProps {
	stories: StoryVideo[]
}

export function HeroStoriesCarousel({ stories }: HeroStoriesCarouselProps) {
	const [selectedStory, setSelectedStory] = useState<StoryVideo | null>(null)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [progress, setProgress] = useState(0)
	const [isVideoReady, setIsVideoReady] = useState(false)
	const scrollRef = useRef<HTMLDivElement>(null)
	const progressInterval = useRef<NodeJS.Timeout | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	// Reset video state when story changes
	useEffect(() => {
		if (selectedStory) {
			setIsVideoReady(false)
			setProgress(0)
		}
	}, [selectedStory])

	// Auto-progress story only after video is ready
	useEffect(() => {
		if (selectedStory && isVideoReady) {
			setProgress(0)

			// Clear any existing interval
			if (progressInterval.current) {
				clearInterval(progressInterval.current)
			}

			// Set new interval
			progressInterval.current = setInterval(() => {
				setProgress(prev => {
					if (prev >= 100) {
						nextStory()
						return 0
					}
					return prev + 0.5
				})
			}, 100)
		}

		return () => {
			if (progressInterval.current) {
				clearInterval(progressInterval.current)
				progressInterval.current = null
			}
		}
	}, [selectedStory, isVideoReady, currentIndex])

	const nextStory = () => {
		if (currentIndex < stories.length - 1) {
			const nextIndex = currentIndex + 1
			setCurrentIndex(nextIndex)
			setSelectedStory(stories[nextIndex])
			setIsVideoReady(false)
		} else {
			closeStory()
		}
	}

	const prevStory = () => {
		if (currentIndex > 0) {
			const prevIndex = currentIndex - 1
			setCurrentIndex(prevIndex)
			setSelectedStory(stories[prevIndex])
			setIsVideoReady(false)
		}
	}

	const openStory = (story: StoryVideo, index: number) => {
		setSelectedStory(story)
		setCurrentIndex(index)
		setIsModalOpen(true)
	}

	const closeStory = () => {
		setIsModalOpen(false)

		if (progressInterval.current) {
			clearInterval(progressInterval.current)
			progressInterval.current = null
		}

		setTimeout(() => {
			setSelectedStory(null)
			setProgress(0)
			setIsVideoReady(false)
		}, 300)
	}

	const handleVideoReady = () => {
		console.log('Video is ready!')
		setIsVideoReady(true)
	}

	const scroll = (direction: 'left' | 'right') => {
		if (scrollRef.current) {
			const scrollAmount = 200
			scrollRef.current.scrollBy({
				left: direction === 'left' ? -scrollAmount : scrollAmount,
				behavior: 'smooth',
			})
		}
	}

	if (!stories || !stories.length) {
		return null
	}

	return (
		<>
			<div className='relative mb-12'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-6'
				>
					<h2 className='text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2'>
						Uzbekistan Stories
					</h2>
				</motion.div>

				<div className='relative'>
					{/* Navigation Buttons */}
					<Button
						variant='ghost'
						size='sm'
						className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2'
						onClick={() => scroll('left')}
					>
						<ChevronLeft className='h-4 w-4' />
					</Button>
					<Button
						variant='ghost'
						size='sm'
						className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2'
						onClick={() => scroll('right')}
					>
						<ChevronRight className='h-4 w-4' />
					</Button>

					{/* Stories Carousel */}
					<div
						ref={scrollRef}
						className='flex space-x-4 overflow-x-auto pb-4 scrollbar-hide px-8'
						style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
					>
						{stories.map((story, index) => (
							<motion.div
								key={story.id}
								className='flex-shrink-0 cursor-pointer group'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => openStory(story, index)}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: index * 0.1 }}
							>
								<div className='relative'>
									<div className='relative h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-full'>
										<div className='absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 animate-spin-slow' />
										<div className='absolute inset-1 rounded-full bg-black overflow-hidden'>
											<Image
												src={
													story.thumbnail?.url ||
													'/placeholder.svg?height=160&width=160'
												}
												alt={story.title}
												fill
												className='object-cover transition-transform duration-300 group-hover:scale-110 rounded-full'
											/>
										</div>
									</div>
									<div className='absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'>
										<Play className='h-8 w-8 text-white' />
									</div>
								</div>
								<p className='mt-3 text-center text-sm font-medium text-slate-300 max-w-32 md:max-w-40 truncate'>
									{story.title}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</div>

			{/* Story Modal */}
			<AnimatePresence>
				{isModalOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0   flex items-center justify-center bg-black/90'
						onClick={closeStory}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							className='relative w-full max-w-md mx-auto '
							onClick={e => e.stopPropagation()}
						>
							{/* Progress Bars */}
							<div className='absolute top-4 left-4 right-4 flex space-x-1'>
								{stories.map((_, index) => (
									<div
										key={index}
										className='flex-1 h-1 bg-white/30 rounded-full overflow-hidden '
									>
										<div
											className='h-full bg-white transition-all duration-100'
											style={{
												width:
													index < currentIndex
														? '100%'
														: index === currentIndex
														? `${progress}%`
														: '0%',
											}}
										/>
									</div>
								))}
							</div>

							{/* Close Button */}
							<Button
								variant='ghost'
								size='sm'
								className='absolute top-4 right-4 z-20 text-white hover:bg-white/20 rounded-full p-2'
								onClick={closeStory}
							>
								<X className='h-4 w-4' />
							</Button>

							{/* Navigation Areas */}
							<div className='absolute inset-0 z-10 flex'>
								<div
									className='flex-1 cursor-pointer'
									onClick={e => {
										e.stopPropagation()
										prevStory()
									}}
								/>
								<div
									className='flex-1 cursor-pointer'
									onClick={e => {
										e.stopPropagation()
										nextStory()
									}}
								/>
							</div>

							{/* Story Content */}
							<div className='aspect-[9/16] w-full bg-black rounded-lg overflow-hidden '>
								{selectedStory && (
									<CustomVideoPlayer
										url={selectedStory.videoUrl}
										onReady={handleVideoReady}
									/>
								)}
							</div>

							{/* Story Title */}
							<div className='absolute bottom-4 left-4 right-4 z-20'>
								<h3 className='text-white text-lg font-bold'>
									{selectedStory?.title}
								</h3>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
