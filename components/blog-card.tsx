'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { formatDate } from '@/lib/utils'
import { Video, MapPin, Clock } from 'lucide-react'
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

interface BlogCardProps {
	post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
	const { locale } = useParams()

	return (
		<motion.div
			whileHover={{ y: -8 }}
			className='group overflow-hidden rounded-2xl bg-gradient-to-br shadow-xl hover:shadow-2xl transition-all duration-300'
		>
			<Link href={`/${locale}/blog/${post.slug}`}>
				<div className='relative aspect-[4/3] overflow-hidden'>
					<Image
						src={post.coverImage.url || '/placeholder.svg?height=400&width=600'}
						alt={post.title}
						fill
						className='object-cover transition-transform duration-500 group-hover:scale-110'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />

					{/* Video Badge */}
					{post.videoUrl && (
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							className='absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg'
						>
							<Video className='h-4 w-4' />
						</motion.div>
					)}

					{/* Location Badge */}
					<div className='absolute top-4 left-4 bg-blue-500/90 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1'>
						<MapPin className='h-3 w-3' />
						<span>Uzbekistan</span>
					</div>
				</div>

				<div className='p-6'>
					<h3 className='text-xl font-bold  mb-3 line-clamp-2  transition-colors'>
						{post.title}
					</h3>

					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-2 text-slate-400 text-xs'>
							<Clock className='h-3 w-3' />
							<span>{formatDate(post.publishedAt, locale as string)}</span>
						</div>

						<motion.span
							whileHover={{ x: 4 }}
							className=' text-sm font-medium flex items-center space-x-1'
						>
							<span>{locale === 'en' ? 'Read more' : 'Читать далее'}</span>
							<span>→</span>
						</motion.span>
					</div>
				</div>
			</Link>
		</motion.div>
	)
}
