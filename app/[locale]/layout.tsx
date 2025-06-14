import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import '../globals.css'
import { Navigation } from '@/components/navigation'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

// Supported locales
export const locales = ['en', 'ru']

export default async function RootLayout({
	children,
	params,
}: {
	children: ReactNode
	params: { locale: string }
}) {
	const { locale } = await params
	const isValidLocale = locales.some(cur => cur === locale)
	if (!isValidLocale) notFound()

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={inter.className} suppressHydrationWarning>
				<ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
					<Navigation />
					<main className='min-h-screen'>{children}</main>
				</ThemeProvider>
			</body>
		</html>
	)
}
