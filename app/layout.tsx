import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: ' Uzbekistan Travel Blog - WanderWise ',
	description:
		'Discover breathtaking destinations, travel tips, itineraries, and personal stories from around the globe. WanderWise is your ultimate travel companion.',
	keywords: [
		'travel blog',
		'travel tips',
		'best travel destinations',
		'travel itineraries',
		'backpacking',
		'digital nomad',
		'budget travel',
		'solo travel',
		'adventure travel',
		'cultural experiences',
		'travel photography',
		'WanderWise',
		'Uzbekistan travel',
		'Bukhara tourism',
		'Silk Road destinations',
		'Samarkand travel guide',
	],
}
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body suppressHydrationWarning>{children}</body>
		</html>
	)
}
