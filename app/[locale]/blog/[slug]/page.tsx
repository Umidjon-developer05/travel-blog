import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/hygraph'
import { formatDate } from '@/lib/utils'
import { VideoPlayer } from '@/components/video-player'

export const generateMetadata = async ({
	params,
}: {
	params: { locale: string; slug: string }
}) => {
	const post = await getBlogPostBySlug(params.locale, params.slug)
	return {
		title: post?.title,
		description: post?.excerpt?.html,
		ogImage: post?.coverImage?.url,
		ogType: 'article',
		twitterCard: 'summary_large_image',
		twitterImage: post?.coverImage?.url,
	}
}

export default async function BlogPost({
	params,
}: {
	params: { locale: string; slug: string }
}) {
	const { locale, slug } = params
	const post = await getBlogPostBySlug(locale, slug)

	if (!post) {
		notFound()
	}

	return (
		<article className='container mx-auto px-4 py-8'>
			<div className='mx-auto max-w-3xl'>
				{post.coverImage && (
					<div className='mb-8 overflow-hidden rounded-lg'>
						<Image
							src={post.coverImage.url || '/placeholder.svg'}
							alt={post.title}
							width={1200}
							height={630}
							className='h-auto w-full object-cover'
							priority
						/>
					</div>
				)}

				<h1 className='mb-4 text-4xl font-bold'>{post.title}</h1>

				<div className='mb-8 text-sm text-muted-foreground'>
					{formatDate(post.publishedAt, locale)}
				</div>

				{post.videoUrl && (
					<div className='mb-8'>
						<VideoPlayer url={post.videoUrl} />
					</div>
				)}
			</div>
		</article>
	)
}
