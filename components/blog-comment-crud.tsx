'use client'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

interface User {
	_id: string
	name: string
	email: string
	image: string
}

interface Comment {
	_id: string
	blogSlug: string
	rating: number
	comment: string
	user: User
}

function BlogCommentCrud({
	slug,
	session,
	refreshTrigger,
}: {
	slug: string
	session: any
	refreshTrigger?: number
}) {
	const [comments, setComments] = useState<Comment[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		fetch(`/api/review?blogSlug=${slug}`)
			.then(res => res.json())
			.then(data => {
				if (!Array.isArray(data)) {
					console.error('Invalid data format:', data)
					setComments([])
					return
				}
				setLoading(false)
				setComments(data)
			})
			.catch(error => {
				console.error('Error fetching comments:', error)
				setLoading(false)
			})
	}, [slug, refreshTrigger])
	console.log('Comments:', comments)
	const renderStars = (rating: number) => {
		const stars = []
		const fullStars = Math.floor(rating)
		const hasHalfStar = rating % 1 !== 0

		for (let i = 0; i < fullStars; i++) {
			stars.push(
				<Star key={i} className='w-4 h-4 fill-yellow-400 text-yellow-400' />
			)
		}

		if (hasHalfStar) {
			stars.push(
				<div key='half' className='relative'>
					<Star className='w-4 h-4 text-gray-300' />
					<div className='absolute inset-0 overflow-hidden w-1/2'>
						<Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
					</div>
				</div>
			)
		}

		const remainingStars = 5 - Math.ceil(rating)
		for (let i = 0; i < remainingStars; i++) {
			stars.push(<Star key={`empty-${i}`} className='w-4 h-4 text-gray-300' />)
		}

		return stars
	}

	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map(word => word.charAt(0))
			.join('')
			.toUpperCase()
			.slice(0, 2)
	}

	if (loading) {
		return (
			<div className='space-y-4'>
				<h3 className='text-xl font-semibold mb-6'>Comments</h3>
				<div className='animate-pulse space-y-4'>
					{[1, 2, 3].map(i => (
						<Card key={i} className='p-4'>
							<div className='flex items-start gap-4'>
								<div className='w-12 h-12 bg-gray-200 rounded-full'></div>
								<div className='flex-1 space-y-2'>
									<div className='h-4 bg-gray-200 rounded w-1/4'></div>
									<div className='h-4 bg-gray-200 rounded w-1/6'></div>
									<div className='h-4 bg-gray-200 rounded w-3/4'></div>
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		)
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<h3 className='text-xl font-semibold'>Comments ({comments.length})</h3>
			</div>

			{comments.length === 0 ? (
				<Card className='p-8 text-center'>
					<p className='text-muted-foreground'>
						No comments yet. Be the first to comment!
					</p>
				</Card>
			) : (
				<div className='space-y-4'>
					{comments.map(comment => (
						<Card
							key={comment._id}
							className='p-4 hover:shadow-md transition-shadow'
						>
							<CardContent className='p-0'>
								<div className='flex items-start gap-4'>
									{comment.user ? (
										<>
											<Avatar className='w-12 h-12 border-2 border-gray-100'>
												<AvatarImage
													src={comment.user.image || '/placeholder.svg'}
													alt={comment.user.name}
													className='object-cover'
												/>
												<AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold'>
													{getInitials(comment.user.name)}
												</AvatarFallback>
											</Avatar>

											<div className='flex-1 space-y-2'>
												<div className='flex items-center gap-3'>
													<h4 className='font-semibold'>{comment.user.name}</h4>
													<div className='flex items-center gap-1'>
														{renderStars(comment.rating)}
														<span className='text-sm text-muted-foreground ml-1'>
															({comment.rating})
														</span>
													</div>
												</div>

												<p className='text-gray-700 leading-relaxed'>
													{comment.comment}
												</p>
											</div>
										</>
									) : (
										<div className='flex-1 space-y-2'>
											<p className='text-gray-500 italic'>Anonymous comment</p>
											<p className='text-gray-700 leading-relaxed'>
												{comment.comment}
											</p>
										</div>
									)}

									<div className='flex-1 space-y-2'>
										<div className='flex items-center gap-3'>
											<h4 className='font-semibold '>{comment.user.name}</h4>
											<div className='flex items-center gap-1'>
												{renderStars(comment.rating)}
												<span className='text-sm text-muted-foreground ml-1'>
													({comment.rating})
												</span>
											</div>
										</div>

										<p className='text-gray-700 leading-relaxed'>
											{comment.comment}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	)
}

export default BlogCommentCrud
