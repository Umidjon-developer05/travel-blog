import { HeroStoriesCarousel } from '@/components/hero-stories-carousel'
import { BlogGrid } from '@/components/blog-grid'
import { getStoryVideos, getBlogPosts } from '@/lib/hygraph'

export default async function Home({ params }: { params: { locale: string } }) {
	const { locale } = await params
	const storyVideos = await getStoryVideos(locale)
	const blogPosts = await getBlogPosts(locale)

	return (
		<div className='min-h-screen z-0'>
			{/* Hero Section */}
			<section className='relative py-20 overflow-hidden '>
				<div className='absolute inset-0 ' />
				<div className='container mx-auto px-4 relative z-10'>
					<div className='text-center mb-16'>
						<h1 className='text-5xl md:text-7xl font-bold   mb-6'>
							{locale === 'en' ? 'Discover Uzbekistan' : 'Откройте Узбекистан'}
						</h1>
						<p className='text-xl  max-w-3xl mx-auto leading-relaxed'>
							{locale === 'en'
								? 'Journey through the ancient Silk Road, where magnificent architecture, rich culture, and warm hospitality create unforgettable memories in the heart of Central Asia.'
								: 'Путешествие по древнему Шелковому пути, где великолепная архитектура, богатая культура и теплое гостеприимство создают незабываемые воспоминания в сердце Центральной Азии.'}
						</p>
					</div>

					<HeroStoriesCarousel stories={storyVideos} />
				</div>
			</section>

			{/* Blog Section */}
			<section className='py-20'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl font-bold  mb-4'>
							{locale === 'en' ? 'Travel Stories' : 'Истории путешествий'}
						</h2>
						<p className='text-slate-400 text-lg max-w-2xl mx-auto'>
							{locale === 'en'
								? "Explore our collection of travel experiences, cultural insights, and hidden gems across Uzbekistan's most captivating destinations."
								: 'Исследуйте нашу коллекцию путевых заметок, культурных открытий и скрытых жемчужин самых захватывающих мест Узбекистана.'}
						</p>
					</div>

					<BlogGrid posts={blogPosts} />
				</div>
			</section>
		</div>
	)
}
