'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { locales } from '@/app/[locale]/layout'
import { Globe } from 'lucide-react'
import Cookies from 'js-cookie'
export function LocaleSwitcher() {
	const pathname = usePathname()
	const router = useRouter()

	const currentLocale = pathname.split('/')[1]

	const localeNames = {
		en: 'English',
		ru: 'Русский',
	}

	const switchLanguage = (newLang: 'en' | 'uz') => {
		const segments = pathname.split('/')
		segments[1] = newLang
		const newPath = segments.join('/')
		Cookies.set('NEXT_LOCALE', newLang, { path: '/' })
		router.push(newPath)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='sm'>
					<Globe className='mr-2 h-4 w-4' />
					{localeNames[currentLocale as keyof typeof localeNames]}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{locales.map(locale => (
					<DropdownMenuItem
						key={locale}
						onClick={() => switchLanguage(locale as 'en' | 'uz')}
						className={locale === currentLocale ? 'bg-muted' : ''}
					>
						{localeNames[locale as keyof typeof localeNames]}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
