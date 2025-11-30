import FlexSearch from 'flexsearch'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

export type SanitySearchResult = {
  url: string
  title: string
  pageTitle: string
}

let searchIndex: FlexSearch.Document<any, string[]> | null = null
let indexPromise: Promise<void> | null = null

async function buildSearchIndex() {
  if (searchIndex) return

  searchIndex = new FlexSearch.Document({
    tokenize: 'full',
    document: {
      id: 'url',
      index: 'content',
      store: ['title', 'pageTitle'],
    },
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true,
    },
  })

  // Fetch all pages from Sanity
  const pages = await client.fetch(
    groq`*[_type == "page"] {
      _id,
      title,
      "slug": slug.current,
      pageType,
      content
    }`
  )

  // Index each page
  for (const page of pages) {
    const url = page.pageType === 'dataset'
      ? `/datasets/${page.slug}`
      : `/docs/${page.slug}`

    // Extract text content from portable text blocks
    const content = page.content
      ?.filter((block: any) => block._type === 'block')
      .map((block: any) => {
        return block.children
          ?.map((child: any) => child.text || '')
          .join('') || ''
      })
      .join('\n') || ''

    searchIndex.add({
      url,
      title: page.title,
      content: [page.title, content].join('\n'),
      pageTitle: page.title,
    })
  }
}

export async function searchSanity(
  query: string,
  options: { limit?: number } = {}
): Promise<SanitySearchResult[]> {
  // Build index if not already built
  if (!indexPromise) {
    indexPromise = buildSearchIndex()
  }
  await indexPromise

  if (!searchIndex) return []

  const result = searchIndex.search(query, {
    ...options,
    enrich: true,
  })

  if (result.length === 0) {
    return []
  }

  return result[0].result.map((item: any) => ({
    url: item.id,
    title: item.doc.title,
    pageTitle: item.doc.pageTitle,
  }))
}
