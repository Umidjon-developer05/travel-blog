'use client'
import { useState } from 'react'
import BlogCommentCrud from './blog-comment-crud'
import BlogComment from './blog-comment'

interface Props {
	slug: string
	session: any
}

export default function BlogCommentsWrapper({ slug, session }: Props) {
	const [refreshTrigger, setRefreshTrigger] = useState(0)

	const handleCommentAdded = () => {
		setRefreshTrigger(prev => prev + 1)
	}

	return (
		<div className='space-y-6'>
			<BlogCommentCrud
				slug={slug}
				session={session}
				refreshTrigger={refreshTrigger}
			/>
			<BlogComment
				slug={slug}
				session={session}
				onCommentAdded={handleCommentAdded}
			/>
		</div>
	)
}
