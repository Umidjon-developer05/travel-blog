import { type NextRequest, NextResponse } from "next/server"
import { locales } from "./app/[locale]/layout"

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = request.headers.get("accept-language")?.split(",")[0].split("-")[0] || "en"
  const defaultLocale = locales.includes(locale) ? locale : "en"

  // e.g. incoming request is /products
  // The new URL is /en/products
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url))
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc.)
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
