'use client'
import { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import ClientStars from './client-stars'
import LoginPage from './Login'
import { Loader2 } from 'lucide-react'

function BlogComment({
	slug,
	session,
	onCommentAdded,
}: {
	slug: string
	session: any
	onCommentAdded?: () => void
}) {
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const validateInputs = () => {
		if (rating === 0) {
			alert('Please select a rating!')
			return false
		}
		if (comment.trim() === '') {
			alert('Please write a comment!')
			return false
		}
		if (comment.trim().length < 5) {
			alert('Comment must be at least 5 characters long!')
			return false
		}
		return true
	}

	const OnComment = async () => {
		if (!validateInputs()) return

		if (session?.user?.id) {
			setIsLoading(true)
			try {
				const res = await fetch('/api/review', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						userId: session?.user?.id,
						rating,
						comment: comment.trim(),
						blogSlug: slug,
					}),
				})

				const data = await res.json()

				if (res.ok) {
					// Reset form
					setRating(0)
					setComment('')

					// Show success message
					alert('Comment added successfully!')

					// Trigger refresh of comments list
					if (onCommentAdded) {
						onCommentAdded()
					}
				} else {
					alert(data.message || 'Failed to add comment')
				}
			} catch (error) {
				console.error('Error adding comment:', error)
				alert('Failed to add comment. Please try again.')
			} finally {
				setIsLoading(false)
			}
		} else {
			alert('You need to login first')
		}
	}

	return (
		<div className='space-y-4 p-6  rounded-lg border'>
			<h3 className='text-lg font-semibold'>Add Your Comment</h3>

			<div className='space-y-4'>
				<div>
					<label className='block text-sm font-medium mb-2'>Rating *</label>
					<ClientStars rating={rating} setRating={setRating} />
				</div>

				<div>
					<label className='block text-sm font-medium mb-2'>Comment *</label>
					<Textarea
						placeholder='Share your thoughts about this blog post...'
						value={comment}
						onChange={e => setComment(e.target.value)}
						className='min-h-[100px]'
						disabled={isLoading}
						maxLength={500}
					/>
					<p className='text-xs text-gray-500 mt-1'>
						{comment.length}/500 characters (minimum 5 characters)
					</p>
				</div>

				<div className='flex justify-end'>
					{!session?.user?.id ? (
						<LoginPage />
					) : (
						<Button
							className='min-w-[120px]'
							onClick={OnComment}
							disabled={isLoading}
						>
							{isLoading ? (
								<>
									<Loader2 className='w-4 h-4 mr-2 animate-spin' />
									Saving...
								</>
							) : (
								'Save Comment'
							)}
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default BlogComment
