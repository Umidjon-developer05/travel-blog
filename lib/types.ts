import type { RichTextContent } from '@graphcms/rich-text-types'

export interface StoryVideo {
	id: string
	title: string
	videoUrl: string
	stories: {
		thumbnail: {
			url: string
		}
	}[]
}

export interface BlogPost {
	id: string
	title: string
	slug: string
	excerpt?: { html: string } // Make excerpt optional
	publishedAt: string
	coverImage: { id: string; url: string }
	url: string
	videoUrl?: string
}
