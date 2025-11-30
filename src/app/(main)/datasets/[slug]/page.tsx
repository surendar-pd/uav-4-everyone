import { notFound } from 'next/navigation'
import { getPageBySlug } from '@/sanity/lib/queries'
import { PortableTextRenderer } from '@/components/PortableTextRenderer'
import { TableOfContents } from '@/components/TableOfContents'
import { collectPortableTextSections } from '@/lib/portableTextSections'

export default async function DatasetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Fetch from Sanity
  const page = await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  // Extract table of contents from Portable Text
  const tableOfContents = collectPortableTextSections(page.content || [])

  return (
    <>
      <div className="max-w-2xl min-w-0 flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
        <article>
          <header className="mb-9 space-y-1">
            <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
              {page.title}
            </h1>
            {page.metaDescription && (
              <p className="text-base text-slate-500 dark:text-slate-400">
                {page.metaDescription}
              </p>
            )}
          </header>

          <div className="prose prose-slate max-w-none dark:prose-invert dark:text-slate-400 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-slate-500 dark:prose-lead:text-slate-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px] prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10 dark:prose-hr:border-slate-800">
            <PortableTextRenderer value={page.content} />
          </div>
        </article>
      </div>
      <TableOfContents tableOfContents={tableOfContents} />
    </>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) return {}

  return {
    title: page.title,
    description: page.metaDescription,
  }
}
