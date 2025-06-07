"use client"

import type { RichTextContent } from "@graphcms/rich-text-types"
import { RichText as HygraphRichText } from "@graphcms/rich-text-react-renderer"

interface RichTextProps {
  content: RichTextContent
}

export function RichText({ content }: RichTextProps) {
  return (
    <HygraphRichText
      content={content}
      renderers={{
        h1: ({ children }) => <h1 className="mb-4 mt-8 text-3xl font-bold">{children}</h1>,
        h2: ({ children }) => <h2 className="mb-3 mt-6 text-2xl font-bold">{children}</h2>,
        h3: ({ children }) => <h3 className="mb-3 mt-6 text-xl font-bold">{children}</h3>,
        p: ({ children }) => <p className="mb-4">{children}</p>,
        ul: ({ children }) => <ul className="mb-4 list-disc pl-6">{children}</ul>,
        ol: ({ children }) => <ol className="mb-4 list-decimal pl-6">{children}</ol>,
        a: ({ children, href }) => (
          <a href={href} className="text-primary underline" target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
      }}
    />
  )
}
