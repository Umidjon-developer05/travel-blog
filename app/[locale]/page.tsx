import { HeroStoriesCarousel } from '@/components/hero-stories-carousel'
import { BlogGrid } from '@/components/blog-grid'
import { getStoryVideos, getBlogPosts } from '@/lib/hygraph'
import Footer from '@/components/Footer'

export default async function Home({ params }: { params: { locale: string } }) {
	const { locale } = await params
	const storyVideos = await getStoryVideos(locale)
	const blogPosts = await getBlogPosts(locale)

	return (
		<div className='min-h-screen z-0 '>
			{/* Hero Section */}
			<section className='relative py-20 overflow-hidden '>
				<div className='absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-wave-slow'></div>
				<div className='absolute top-20 -right-20 w-60 h-60 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full animate-float delay-1000'></div>
				{/* <div className='absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full animate-scale-bounce delay-2000'></div> */}
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
			<div className=' relative'>
				<svg
					className='absolute bottom-0 left-0 w-full h-32 opacity-30 top-10'
					viewBox='0 0 1200 120'
					preserveAspectRatio='none'
				>
					<path
						d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'
						opacity='.25'
						className='fill-blue-500 animate-wave'
					></path>
					<path
						d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'
						opacity='.5'
						className='fill-indigo-500 animate-wave delay-500'
					></path>
					<path
						d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'
						className='fill-purple-500 animate-wave delay-1000'
					></path>
				</svg>
			</div>
			{/* Blog Section */}
			<section className='py-20'>
				<div className='container mx-auto px-4'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl font-bold  mb-4'>
							{locale === 'en' ? 'Travel Blog' : 'Истории блога'}
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
			<div className=' relative'>
				<svg
					className='absolute bottom-0 left-0 w-full h-32 opacity-30 top-10'
					viewBox='0 0 1200 120'
					preserveAspectRatio='none'
				>
					<path
						d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'
						opacity='.25'
						className='fill-blue-500 animate-wave'
					></path>
					<path
						d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'
						opacity='.5'
						className='fill-indigo-500 animate-wave delay-500'
					></path>
					<path
						d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'
						className='fill-purple-500 animate-wave delay-1000'
					></path>
				</svg>
			</div>
			<Footer />
		</div>
	)
}
