'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, MapPin, Send, MessageCircle, Heart } from 'lucide-react'
import { toast } from 'sonner'

const ContactPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	})

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log('Form submitted:', formData)
		toast.success(
			"Your message has been sent successfully! We'll get back to you soon."
		)
		setFormData({ name: '', email: '', subject: '', message: '' })
	}

	return (
		<div className='min-h-screen relative overflow-hidden'>
			{/* Animated Background Waves */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-wave-slow'></div>
				<div className='absolute top-20 -right-20 w-60 h-60 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full animate-float delay-1000'></div>
				<div className='absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full animate-scale-bounce delay-2000'></div>

				{/* Wave SVG Background */}
				<svg
					className='absolute bottom-0 left-0 w-full h-32 opacity-30'
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

			<div className='relative z-10 container mx-auto px-4 py-16'>
				{/* Header Section */}
				<div className='text-center mb-16 animate-fade-in-up'>
					<h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4'>
						Contact Us
					</h1>
					<p className='text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
						Get in touch with our team. We'd love to hear your questions and
						suggestions.
					</p>
					<div className='flex justify-center mt-6'>
						<Heart className='w-6 h-6 text-red-500 animate-scale-bounce' />
					</div>
				</div>

				<div className='grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto'>
					{/* Contact Form */}
					<Card className=' shadow-2xl animate-fade-in-up delay-300'>
						<CardHeader>
							<CardTitle className='text-2xl font-semibold text-center flex items-center justify-center gap-2'>
								<MessageCircle className='w-6 h-6 text-blue-600' />
								Send Message
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className='space-y-6'>
								<div className='grid md:grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<label
											htmlFor='name'
											className='text-sm font-medium text-foreground'
										>
											Your Name
										</label>
										<Input
											id='name'
											name='name'
											value={formData.name}
											onChange={handleInputChange}
											placeholder='Enter your name'
											className='transition-all duration-300 focus:scale-105 focus:shadow-lg'
											required
										/>
									</div>
									<div className='space-y-2'>
										<label
											htmlFor='email'
											className='text-sm font-medium text-foreground'
										>
											Email Address
										</label>
										<Input
											id='email'
											name='email'
											type='email'
											value={formData.email}
											onChange={handleInputChange}
											placeholder='email@example.com'
											className='transition-all duration-300 focus:scale-105 focus:shadow-lg'
											required
										/>
									</div>
								</div>

								<div className='space-y-2'>
									<label
										htmlFor='subject'
										className='text-sm font-medium text-foreground'
									>
										Subject
									</label>
									<Input
										id='subject'
										name='subject'
										value={formData.subject}
										onChange={handleInputChange}
										placeholder='Enter message subject'
										className='transition-all duration-300 focus:scale-105 focus:shadow-lg'
										required
									/>
								</div>

								<div className='space-y-2'>
									<label
										htmlFor='message'
										className='text-sm font-medium text-foreground'
									>
										Message
									</label>
									<Textarea
										id='message'
										name='message'
										value={formData.message}
										onChange={handleInputChange}
										placeholder='Write your message in detail...'
										rows={6}
										className='transition-all duration-300 focus:scale-105 focus:shadow-lg resize-none'
										required
									/>
								</div>

								<Button
									type='submit'
									className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl'
								>
									<Send className='w-4 h-4 mr-2' />
									Send Message
								</Button>
							</form>
						</CardContent>
					</Card>

					{/* Contact Information */}
					<div className='space-y-8 animate-fade-in-up delay-500'>
						<Card className='shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105'>
							<CardContent className='p-8'>
								<div className='flex items-center space-x-4 mb-4'>
									<div className='p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'>
										<Mail className='w-6 h-6 text-white' />
									</div>
									<div>
										<h3 className='text-lg font-semibold'>Email</h3>
										<p className='text-muted-foreground'>
											umidjongafforov175@gmail.com
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className=' shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105'>
							<CardContent className='p-8'>
								<div className='flex items-center space-x-4 mb-4'>
									<div className='p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full'>
										<Phone className='w-6 h-6 text-white' />
									</div>
									<div>
										<h3 className='text-lg font-semibold'>Phone</h3>
										<p className='text-muted-foreground'>+998 93 655 89 59</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className=' shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105'>
							<CardContent className='p-8'>
								<div className='flex items-center space-x-4 mb-4'>
									<div className='p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full'>
										<MapPin className='w-6 h-6 text-white' />
									</div>
									<div>
										<h3 className='text-lg font-semibold'>Address</h3>
										<p className='text-muted-foreground'>Bukhara city</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Office Hours */}
						<Card className=' border border-white/20 shadow-xl'>
							<CardContent className='p-8'>
								<h3 className='text-xl font-semibold mb-4 text-center'>
									Office Hours
								</h3>
								<div className='space-y-2 text-center'>
									<p className='text-muted-foreground'>
										Monday - Friday: 9:00 AM - 6:00 PM
									</p>
									<p className='text-muted-foreground'>
										Saturday: 9:00 AM - 3:00 PM
									</p>
									<p className='text-muted-foreground'>Sunday: Closed</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Call to Action */}
				<div className='text-center mt-16 animate-fade-in-up delay-700'>
					<h2 className='text-3xl font-bold text-foreground mb-4'>
						Have Questions?
					</h2>
					<p className='text-lg text-muted-foreground mb-8 max-w-2xl mx-auto'>
						Our team of specialists is ready to help you. Contact us with any
						questions you may have.
					</p>
					<div className='flex flex-wrap justify-center gap-4'>
						<Button
							variant='outline'
							className='hover:scale-105 transition-transform duration-300'
						>
							Call Us
						</Button>
						<Button
							variant='outline'
							className='hover:scale-105 transition-transform duration-300'
						>
							Send Email
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ContactPage
