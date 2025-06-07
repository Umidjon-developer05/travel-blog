import React from 'react'
import {
	MapPin,
	Phone,
	Mail,
	Plane,
	Globe,
	Instagram,
	Facebook,
	Twitter,
} from 'lucide-react'

const Footer = () => {
	return (
		<footer className=' py-16 px-6'>
			<div className='max-w-7xl mx-auto'>
				{/* Main Footer Content */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
					{/* Company Info */}
					<div className='space-y-6 animate-fade-in-up'>
						<div className='flex items-center space-x-3'>
							<Plane className='h-8 w-8 text-blue-400 animate-float' />
							<h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
								Uzbekistan Travel
							</h3>
						</div>
						<p className='text-gray-300 leading-relaxed'>
							Discover amazing destinations around the world. We make your
							travel dreams come true with unforgettable experiences.
						</p>
						<div className='flex space-x-4'>
							{[Facebook, Instagram, Twitter].map((Icon, index) => (
								<div
									key={index}
									className='p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 cursor-pointer group'
									style={{ animationDelay: `${index * 0.1}s` }}
								>
									<Icon className='h-5 w-5 group-hover:text-blue-400 transition-colors' />
								</div>
							))}
						</div>
					</div>

					{/* Quick Links */}
					<div
						className='space-y-6 animate-fade-in-up'
						style={{ animationDelay: '0.1s' }}
					>
						<h4 className='text-xl font-semibold flex items-center space-x-2'>
							<Globe className='h-5 w-5 text-blue-400' />
							<span>Quick Links</span>
						</h4>
						<ul className='space-y-3'>
							{['Home', 'Destinations', 'Tours', 'About Us', 'Contact'].map(
								(link, index) => (
									<li key={link} className='group'>
										<a
											href='#'
											className='text-gray-300 hover:text-white transition-colors duration-300 relative inline-block'
										>
											<span className='relative z-10'>{link}</span>
											<span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full'></span>
										</a>
									</li>
								)
							)}
						</ul>
					</div>

					{/* Popular Destinations */}
					<div
						className='space-y-6 animate-fade-in-up'
						style={{ animationDelay: '0.2s' }}
					>
						<h4 className='text-xl font-semibold flex items-center space-x-2'>
							<MapPin className='h-5 w-5 text-blue-400' />
							<span>Popular Destinations</span>
						</h4>
						<div className='space-y-3'>
							{[
								{ name: 'Bukhara , Uzbekistan', emoji: 'uz' },
								{ name: 'Samarqand, Uzbekistan', emoji: 'uz' },
								{ name: 'Xiva, Uzbekistan', emoji: '🇺z' },
								{ name: 'Tashkent, Uzbekistan', emoji: 'uz' },
								{ name: 'Jizzax, Uzbekistan', emoji: 'uz' },
							].map((destination, index) => (
								<div
									key={destination.name}
									className='flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer group'
								>
									<span className='text-gray-300 group-hover:text-white transition-colors'>
										{destination.name}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Contact Info */}
					<div
						className='space-y-6 animate-fade-in-up'
						style={{ animationDelay: '0.3s' }}
					>
						<h4 className='text-xl font-semibold'>Contact Info</h4>
						<div className='space-y-4'>
							<div className='flex items-start space-x-3 group'>
								<MapPin className='h-5 w-5 text-blue-400 mt-1 group-hover:animate-bounce' />
								<div>
									<p className='text-gray-300'> Travel Street</p>
									<p className='text-gray-300'>Bukhara city</p>
								</div>
							</div>
							<div className='flex items-center space-x-3 group cursor-pointer'>
								<Phone className='h-5 w-5 text-blue-400 group-hover:animate-pulse' />
								<span className='text-gray-300 group-hover:text-white transition-colors'>
									+998 93 655 89 59
								</span>
							</div>
							<div className='flex items-center space-x-3 group cursor-pointer'>
								<Mail className='h-5 w-5 text-blue-400 group-hover:animate-pulse' />
								<span className='text-gray-300 group-hover:text-white transition-colors'>
									umidjongafforov175@gmail.com
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Newsletter Section */}
				<div
					className='border-t border-white/20 pt-8 mb-8 animate-fade-in-up'
					style={{ animationDelay: '0.4s' }}
				>
					<div className='text-center max-w-2xl mx-auto'>
						<h4 className='text-2xl font-semibold mb-4'>
							Subscribe to Our Newsletter
						</h4>
						<p className='text-gray-300 mb-6'>
							Get the latest travel deals and destination guides delivered to
							your inbox
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<input
								type='email'
								placeholder='Enter your email address'
								className='px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 flex-1 max-w-md'
							/>
							<button className='px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg'>
								Subscribe
							</button>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div
					className='border-t border-white/20 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 animate-fade-in-up'
					style={{ animationDelay: '0.5s' }}
				>
					<p className='text-gray-400 text-sm'>
						© 2024 TravelPro. All rights reserved.
					</p>
					<div className='flex space-x-6 text-sm'>
						{['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
							(link, index) => (
								<a
									key={link}
									href='#'
									className='text-gray-400 hover:text-white transition-colors duration-300 relative group'
								>
									{link}
									<span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full'></span>
								</a>
							)
						)}
					</div>
				</div>

				{/* Floating Elements */}
				<div className='absolute top-10 left-10 opacity-20'>
					<Plane
						className='h-16 w-16 text-blue-400 animate-float'
						style={{ animationDelay: '1s' }}
					/>
				</div>
				<div className='absolute bottom-20 right-20 opacity-20'>
					<Globe
						className='h-12 w-12 text-purple-400 animate-float'
						style={{ animationDelay: '2s' }}
					/>
				</div>
			</div>
		</footer>
	)
}

export default Footer
