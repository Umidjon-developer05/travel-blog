'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BlogCard } from '@/components/blog-card'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'

interface BlogPost {
	id: string
	title: string
	slug: string
	excerpt: {
		html: string
	}
	publishedAt: string
	coverImage: {
		id: string
		url: string
	}
	videoUrl?: string
}

interface BlogGridProps {
	posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
	const { locale } = useParams()
	const [visiblePosts, setVisiblePosts] = useState(6)

	const loadMore = () => {
		setVisiblePosts(prev => prev + 6)
	}

	if (!posts || posts.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className='py-16 text-center'
			>
				<div className='text-6xl mb-4'>🏛️</div>
				<h3 className='text-xl font-semibold text-slate-300 mb-2'>
					{locale === 'en' ? 'No stories yet' : 'Пока нет историй'}
				</h3>
				<p className='text-slate-400'>
					{locale === 'en'
						? 'Check back soon for amazing Uzbekistan travel stories!'
						: 'Скоро здесь появятся удивительные истории об Узбекистане!'}
				</p>
			</motion.div>
		)
	}

	return (
		<div className='space-y-12'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'
			>
				{posts.slice(0, visiblePosts).map((post, index) => (
					<motion.div
						key={post.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
						className='border rounded-lg'
					>
						<BlogCard post={post} />
					</motion.div>
				))}
			</motion.div>

			{visiblePosts < posts.length && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='flex justify-center'
				>
					<Button
						onClick={loadMore}
						className='  px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105'
					>
						{locale === 'en' ? 'Discover More Stories' : 'Больше историй'}
					</Button>
				</motion.div>
			)}
		</div>
	)
}
