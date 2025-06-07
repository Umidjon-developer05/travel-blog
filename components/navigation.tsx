'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Menu, X, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { useTheme } from 'next-themes'
import { useParams } from 'next/navigation'

export function Navigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const { theme, setTheme } = useTheme()
	const { locale } = useParams()

	const navItems = [
		{ name: locale === 'en' ? 'Home' : 'Главная', href: `/${locale}` },
		{ name: locale === 'en' ? 'About' : 'О нас', href: `/${locale}/about` },
		{ name: locale === 'en' ? 'Blogs' : 'Блоги', href: `/${locale}/blog` },
		{
			name: locale === 'en' ? 'Contact' : 'Контакты',
			href: `/${locale}/contact`,
		},
	]

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			className='sticky top-0    '
		>
			<div className='container backdrop-blur dark:bg-slate-900/50 rounded-md light:border-2 mx-auto px-4'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo */}
					<Link href={`/${locale}`} className='flex items-center space-x-2'>
						<motion.div
							whileHover={{ scale: 1.05 }}
							className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'
						>
							Uzbekistan Travel
						</motion.div>
					</Link>

					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center space-x-8'>
						{navItems.map(item => (
							<Link
								key={item.name}
								href={item.href}
								className=' hover:text-white transition-colors relative group'
							>
								{item.name}
								<span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full'></span>
							</Link>
						))}
					</div>

					{/* Right Side Actions */}
					<div className='flex items-center space-x-4'>
						{/* Theme Toggle */}
						<Button
							variant='ghost'
							size='sm'
							onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
						>
							{theme === 'dark' ? (
								<Sun className='h-4 w-4' />
							) : (
								<Moon className='h-4 w-4' />
							)}
						</Button>

						{/* Language Switcher */}
						<LocaleSwitcher />

						{/* Mobile Menu Button */}
						<Button
							variant='ghost'
							size='sm'
							className='md:hidden text-slate-400 hover:text-white'
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							{isMenuOpen ? (
								<X className='h-5 w-5' />
							) : (
								<Menu className='h-5 w-5' />
							)}
						</Button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						className='md:hidden py-4 border-t border-slate-800'
					>
						{navItems.map(item => (
							<Link
								key={item.name}
								href={item.href}
								className='block py-2 text-slate-300 hover:text-white transition-colors'
								onClick={() => setIsMenuOpen(false)}
							>
								{item.name}
							</Link>
						))}
					</motion.div>
				)}
			</div>
		</motion.nav>
	)
}
