import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Til sozlamalari
const locales = ['en', 'uz']
const defaultLocale = 'en'

// Public yo‘llar (locale yo‘q holatda)
const publicPaths = ['/', '/login', '/register']
const protectedPaths = ['/dashboard', '/profile', '/create-post']

// Foydalanuvchi tilini aniqlash
function getLocale(request: NextRequest): string {
	const pathname = request.nextUrl.pathname

	const pathnameLocale = locales.find(
		locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	)
	if (pathnameLocale) return pathnameLocale

	const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
	if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale

	const acceptLanguage = request.headers.get('accept-language')
	if (acceptLanguage) {
		const preferredLocale = locales.find(locale =>
			acceptLanguage.toLowerCase().includes(locale)
		)
		if (preferredLocale) return preferredLocale
	}

	return defaultLocale
}

// Locale'siz pathname'ni olish
function getPathnameWithoutLocale(pathname: string): string {
	const segments = pathname.split('/')
	if (locales.includes(segments[1])) {
		return '/' + segments.slice(2).join('/')
	}
	return pathname
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Ichki fayllar va API route'larni o'tkazib yuborish
	const isStaticFile = pathname.match(/\.(.*)$/)

	if (
		pathname.startsWith('/_next/') ||
		(pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/')) ||
		pathname === '/favicon.ico' ||
		isStaticFile // ← YANGI QO‘SHILDI!
	) {
		return NextResponse.next()
	}
	if (pathname.match(/\.(png|jpg|jpeg|gif|svg|ico)$/)) {
		return NextResponse.next()
	}
	// Pathname ichida locale borligini tekshirish
	const pathnameHasLocale = locales.some(
		locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	)

	// Agar locale yo‘q bo‘lsa, redirect qilamiz
	if (!pathnameHasLocale) {
		const locale = getLocale(request)
		const newUrl = new URL(`/${locale}${pathname}`, request.url)
		return NextResponse.redirect(newUrl)
	}

	// Locale bor holatda davom etamiz
	const pathnameWithoutLocale = getPathnameWithoutLocale(pathname)
	const currentLocale = pathname.split('/')[1]

	// Public pathmi?
	const isPublicPath =
		publicPaths.includes(pathnameWithoutLocale) ||
		pathnameWithoutLocale.startsWith('/api/auth/')

	// Tokenni olish (next-auth orqali)
	const token = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
	})

	const isProtectedPath = protectedPaths.some(prefix =>
		pathnameWithoutLocale.startsWith(prefix)
	)

	// 🔒 Agar protected sahifa bo‘lsa va user login qilmagan bo‘lsa → login sahifasiga redirect
	if (isProtectedPath && !token) {
		const loginUrl = new URL(`/${currentLocale}/login`, request.url)
		loginUrl.searchParams.set('callbackUrl', pathname)
		return NextResponse.redirect(loginUrl)
	}

	// 🔄 Agar login/register sahifasiga kirayotgan bo‘lsa va user allaqachon login bo‘lsa → homega redirect
	if (
		(pathnameWithoutLocale === '/login' ||
			pathnameWithoutLocale === '/register') &&
		token
	) {
		return NextResponse.redirect(new URL(`/${currentLocale}`, request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico|public|api/auth).*)'],
}
