import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
	MapPin,
	Users,
	Calendar,
	Camera,
	Star,
	Mountain,
	Building,
	Heart,
} from 'lucide-react'

const About = () => {
	const features = [
		{
			icon: Mountain,
			title: 'Ancient Silk Road',
			description:
				'Journey through the historic trade routes that connected East and West for centuries.',
		},
		{
			icon: Building,
			title: 'Architectural Wonders',
			description:
				'Explore magnificent mosques, madrasas, and mausoleums with intricate Islamic architecture.',
		},
		{
			icon: Users,
			title: 'Rich Culture',
			description:
				'Experience the warm hospitality and diverse traditions of Uzbek people.',
		},
		{
			icon: Camera,
			title: 'UNESCO Sites',
			description:
				'Visit four UNESCO World Heritage Sites including Samarkand and Bukhara.',
		},
	]

	const destinations = [
		{
			name: 'Samarkand',
			description:
				'The jewel of the Silk Road with the magnificent Registan Square',
			image:
				'https://avatars.mds.yandex.net/i?id=4b86190192e30e760bb6998c28891878_l-4328551-images-thumbs&n=13',
		},
		{
			name: 'Bukhara',
			description: 'A living museum with over 140 architectural monuments',
			image:
				'https://cdn.tripster.ru/thumbs2/e2e3e772-9bcc-11ed-999b-9e4425b8c29a.1200x1000.jpeg?width=1200&height=630',
		},
		{
			name: 'Khiva',
			description: 'An open-air museum within the ancient Ichan Qala fortress',
			image:
				'https://avatars.mds.yandex.net/i?id=bad76095a2396a9d41c50150cda6e1dd_l-13078695-images-thumbs&n=13',
		},
	]

	return (
		<div className='min-h-screen  relative overflow-hidden'>
			{/* Animated Background Elements */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-wave-slow'></div>
				<div className='absolute top-20 -right-20 w-60 h-60 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full animate-float delay-1000'></div>
				<div className='absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full animate-scale-bounce delay-2000'></div>

				{/* Floating Icons */}
				<div className='absolute top-32 left-1/4 animate-float delay-500'>
					<Star className='w-6 h-6 text-yellow-400 opacity-60' />
				</div>
				<div className='absolute top-48 right-1/3 animate-float delay-1500'>
					<MapPin className='w-5 h-5 text-blue-500 opacity-50' />
				</div>
				<div className='absolute bottom-32 right-1/4 animate-float delay-2500'>
					<Heart className='w-5 h-5 text-purple-500 opacity-60' />
				</div>
			</div>

			<div className='relative z-10 container mx-auto px-4 py-16'>
				{/* Hero Section */}
				<div className='text-center mb-20 animate-fade-in-up'>
					<h1 className='text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6'>
						About Travel Uzbekistan
					</h1>
					<p className='text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed p-5'>
						Discover the magical land of Uzbekistan, where ancient history meets
						vibrant culture. From the legendary Silk Road cities to the warm
						hospitality of its people, Uzbekistan offers an unforgettable
						journey through time and tradition.
					</p>
				</div>

				{/* Mission Statement */}
				<Card className='mb-16  shadow-2xl animate-fade-in-up delay-300'>
					<CardContent className='p-12 text-center'>
						<h2 className='text-3xl font-bold text-foreground mb-6'>
							Our Mission
						</h2>
						<p className='text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto'>
							We are dedicated to showcasing the incredible beauty, rich
							history, and cultural treasures of Uzbekistan. Our goal is to
							provide travelers with authentic experiences that connect them
							with the soul of Central Asia's most fascinating destination.
						</p>
					</CardContent>
				</Card>

				{/* Features Grid */}
				<div className='mb-20'>
					<h2 className='text-4xl font-bold text-center text-foreground mb-12 animate-fade-in-up delay-500'>
						Why Choose Uzbekistan?
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						{features.map((feature, index) => (
							<Card
								key={index}
								className='group  shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up'
								style={{ animationDelay: `${600 + index * 200}ms` }}
							>
								<CardHeader className='text-center pb-4'>
									<div className='mx-auto p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-300'>
										<feature.icon className='w-8 h-8 text-white' />
									</div>
									<CardTitle className='text-xl font-semibold'>
										{feature.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className='text-muted-foreground text-center leading-relaxed'>
										{feature.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Destinations Showcase */}
				<div className='mb-20'>
					<h2 className='text-4xl font-bold text-center text-foreground mb-12 animate-fade-in-up delay-1000'>
						Must-Visit Destinations
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{destinations.map((destination, index) => (
							<Card
								key={index}
								className='group overflow-hidden  shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up'
								style={{ animationDelay: `${1200 + index * 200}ms` }}
							>
								<div className='relative overflow-hidden h-48'>
									<img
										src={destination.image}
										alt={destination.name}
										className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
									<div className='absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<MapPin className='w-5 h-5' />
									</div>
								</div>
								<CardHeader>
									<CardTitle className='text-2xl font-bold group-hover:text-primary transition-colors duration-300'>
										{destination.name}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className='text-muted-foreground leading-relaxed'>
										{destination.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Statistics */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 animate-fade-in-up delay-1800'>
					<div className='text-center p-6  rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'>
						<div className='text-4xl font-bold text-primary mb-2'>4</div>
						<div className='text-muted-foreground'>UNESCO Sites</div>
					</div>
					<div className='text-center p-6  rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'>
						<div className='text-4xl font-bold text-primary mb-2'>2,700+</div>
						<div className='text-muted-foreground'>Years of History</div>
					</div>
					<div className='text-center p-6  rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'>
						<div className='text-4xl font-bold text-primary mb-2'>35M</div>
						<div className='text-muted-foreground'>Population</div>
					</div>
					<div className='text-center p-6  rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'>
						<div className='text-4xl font-bold text-primary mb-2'>100+</div>
						<div className='text-muted-foreground'>Ethnic Groups</div>
					</div>
				</div>

				{/* Call to Action */}
				<div className='text-center animate-fade-in-up delay-2000'>
					<h2 className='text-3xl font-bold text-foreground mb-6'>
						Ready to Explore Uzbekistan?
					</h2>
					<p className='text-lg text-muted-foreground mb-8 max-w-2xl mx-auto'>
						Join us on an incredible journey through the heart of Central Asia.
						Experience the magic, history, and beauty that awaits in Uzbekistan.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl'>
							Start Your Journey
						</Button>
						<Button
							variant='outline'
							className='px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg'
						>
							Learn More
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default About
