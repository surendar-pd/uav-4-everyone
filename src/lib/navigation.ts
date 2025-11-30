import { getAllPages } from '@/sanity/lib/queries'

export const staticNavigation = [
  {
    title: 'Introduction',
    links: [
      { title: 'Home', href: '/' },
      { title: 'About Us', href: '/docs/about-us' },
    ],
  },
]

export async function getNavigation() {
  const pages = await getAllPages()

  // Build datasets links from Sanity
  const datasetLinks = pages
    .filter((page: any) => page.pageType === 'dataset')
    .map((page: any) => ({
      title: page.title,
      href: `/datasets/${page.slug}`,
    }))

  // Return only dynamic Sanity pages for Datasets section
  return [
    staticNavigation[0], // Introduction section
    {
      title: 'Datasets',
      links: datasetLinks, // Only dynamic Sanity pages
    },
  ]
}

// Keep for backward compatibility with client components
export const navigation = staticNavigation
