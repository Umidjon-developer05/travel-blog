import { gql, request } from 'graphql-request'
import type { BlogPost, StoryVideo } from './types'

const HYGRAPH_ENDPOINT =
	process.env.HYGRAPH_ENDPOINT ||
	'https://eu-west-2.cdn.hygraph.com/content/cmbki6ohq003906waqeuoh1my/master'

// 🟢 StoryVideos: Ko‘pligini unutmang!
export async function getStoryVideos(locale: string): Promise<StoryVideo[]> {
	const query = gql`
		query MyQuery {
			storyVideo(locales: [${locale}]) {
				id
				title
				thumbnail {
					... on Thumbnail {
						id
						url
					}
				}
				videoUrl
			}
		}
	`
	const data = await request<{
		storyVideo: any
	}>(HYGRAPH_ENDPOINT, query)
	console.log('getStoryVideos', data)
	return data?.storyVideo ?? []
}

// 🟢 BlogPosts
export async function getBlogPosts(locale: string): Promise<BlogPost[]> {
	const query = gql`
		query MyQuery {
			blogPost(locales: [${locale}]) {
				id
				title
				slug
				excerpt {
					html
				}
				publishedAt
				coverImage {
					... on CoverImage {
						id
						url
					}
				}
				videoUrl
			}
		}
	`

	const data = await request<{ blogPost: any }>(HYGRAPH_ENDPOINT, query)
	console.log('getBlogPosts', data)
	return data?.blogPost ?? []
}

// 🟢 BlogPost by Slug
export async function getBlogPostBySlug(
	locale: string,
	slug: string
): Promise<BlogPost | null> {
	const query = gql`
		query BlogPostBySlug($locale: Locale!, $slug: String!) {
			blogPost(locales: [$locale], where: { slug: $slug }, first: 100) {
				coverImage {
					... on CoverImage {
						id
						url
					}
				}
				publishedAt
				slug
				title
				videoUrl
				id
				excerpt {
					html
				}
			}
		}
	`

	const variables = {
		locale,
		slug,
	}

	const data = await request<{ blogPost: any }>(
		HYGRAPH_ENDPOINT,
		query,
		variables
	)
	console.log('getBlogPostBySlug', data)
	return data?.blogPost?.[0] ?? null
}
