import { groq } from 'next-sanity'
import { client } from './client'

const PAGE_BY_SLUG_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    pageType,
    metaDescription,
    content
  }
`

export async function getPageBySlug(slug: string) {
  return await client.fetch(PAGE_BY_SLUG_QUERY, { slug })
}

export async function getAllPagesSlugs() {
  return await client.fetch(groq`*[_type == "page"]{ "slug": slug.current }`)
}

const ALL_PAGES_QUERY = groq`
  *[_type == "page"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    pageType
  }
`

export async function getAllPages() {
  return await client.fetch(ALL_PAGES_QUERY)
}
