import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatDate(date: string, locale: string): string {
	try {
		return new Date(date).toLocaleDateString(
			locale === 'en' ? 'en-US' : 'ru-RU',
			{
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}
		)
	} catch (error) {
		console.error('Error formatting date:', error)
		return date
	}
}

export function extractYouTubeID(url: string): string | null {
	if (!url) return null

	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
	const match = url.match(regExp)

	return match && match[2].length === 11 ? match[2] : null
}
export function extractYouTubeID1(url: string): string | null {
	try {
		const patterns = [
			/shorts\/([a-zA-Z0-9_-]{11})/,
			/watch\?v=([a-zA-Z0-9_-]{11})/,
			/embed\/([a-zA-Z0-9_-]{11})/,
			/youtu\.be\/([a-zA-Z0-9_-]{11})/,
		]

		for (const pattern of patterns) {
			const match = url.match(pattern)
			if (match && match[1]) {
				return match[1]
			}
		}
	} catch (error) {
		console.error('Invalid YouTube URL:', error)
	}

	return null
}
