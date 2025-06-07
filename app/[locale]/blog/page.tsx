import { getBlogPosts } from '@/lib/hygraph'
import { BlogGrid } from '@/components/blog-grid'

export default async function BlogPage({
	params,
}: {
	params: { locale: string }
}) {
	const { locale } = params
	const blogPosts = await getBlogPosts(locale)

	return (
		<div className='container mx-auto px-4 py-8'>
			<h1 className='mb-8 text-4xl font-bold'>
				{locale === 'en' ? 'Blog' : 'Блог'}
			</h1>
			<BlogGrid posts={blogPosts} />
		</div>
	)
}
