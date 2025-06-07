import type { RichTextContent } from "@graphcms/rich-text-types"

export interface StoryVideo {
  id: string
  title: string
  videoUrl: string
  thumbnail: {
    url: string
  }
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: {
    json: RichTextContent
  }
  publishedAt: string
  coverImage?: {
    url: string
  }
  videoUrl?: string
}
