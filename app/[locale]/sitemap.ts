import type { MetadataRoute } from "next"
import { getBlogPosts } from "@/lib/hygraph"
import { locales } from "./layout"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com"

  // Get all blog posts for all locales
  const allPosts = await Promise.all(
    locales.map(async (locale) => {
      const posts = await getBlogPosts(locale)
      return posts.map((post) => ({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }))
    }),
  )

  // Flatten the array of arrays
  const blogUrls = allPosts.flat()

  // Add static pages
  const staticPages = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ])

  return [...staticPages, ...blogUrls]
}
