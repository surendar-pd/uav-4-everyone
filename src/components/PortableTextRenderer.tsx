'use client'

import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Fence } from './Fence'
import { Callout } from './Callout'
import { slugifyWithCounter } from '@sindresorhus/slugify'

// Create a fresh slugify instance for each render
const createSlugify = () => slugifyWithCounter()

export function PortableTextRenderer({ value }: { value: any }) {
  // Create a fresh slugify instance for this render
  const slugify = createSlugify()

  const components = {
    block: {
      h1: ({ children, value }: any) => {
        const text = value.children?.map((c: any) => c.text).join('') || ''
        const id = slugify(text)
        return <h1 id={id}>{children}</h1>
      },
      h2: ({ children, value }: any) => {
        const text = value.children?.map((c: any) => c.text).join('') || ''
        const id = slugify(text)
        return <h2 id={id}>{children}</h2>
      },
      h3: ({ children, value }: any) => {
        const text = value.children?.map((c: any) => c.text).join('') || ''
        const id = slugify(text)
        return <h3 id={id}>{children}</h3>
      },
    },
  types: {
    calloutBlock: ({ value }: any) => (
      <Callout title={value.title} type={value.type}>
        {value.content && <PortableText value={value.content} />}
      </Callout>
    ),

    codeBlock: ({ value }: any) => (
      <div className="my-8">
        {value.filename && (
          <div className="bg-slate-800 text-slate-300 px-4 py-2 text-sm rounded-t-lg">
            {value.filename}
          </div>
        )}
        <Fence language={value.language}>{value.code}</Fence>
      </div>
    ),

    imageBlock: ({ value }: any) => {
      const { image, caption, layout, additionalImages } = value

      // Check if image has an asset reference
      if (!image?.asset) {
        // Return placeholder for missing images
        return (
          <div className="my-8 p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800">
            <p className="text-center text-slate-500 dark:text-slate-400">
              📷 Image placeholder: {image?.alt || 'Image not uploaded yet'}
            </p>
            {caption && <p className="text-center text-sm mt-2 text-slate-400">{caption}</p>}
          </div>
        )
      }

      if (layout === 'sideBySide' && additionalImages?.[0]?.asset) {
        return (
          <div className="grid grid-cols-2 gap-4 my-8">
            <Image
              src={urlFor(image).width(600).url()}
              alt={image.alt || ''}
              width={600}
              height={400}
              className="rounded-lg"
            />
            <Image
              src={urlFor(additionalImages[0]).width(600).url()}
              alt={additionalImages[0].alt || ''}
              width={600}
              height={400}
              className="rounded-lg"
            />
            {caption && <figcaption className="col-span-2 text-center text-sm mt-2">{caption}</figcaption>}
          </div>
        )
      }

      return (
        <figure className="my-8">
          <Image
            src={urlFor(image).width(1200).url()}
            alt={image.alt || ''}
            width={1200}
            height={800}
            className="rounded-lg"
          />
          {caption && <figcaption className="text-center text-sm mt-2">{caption}</figcaption>}
        </figure>
      )
    },

    tableBlock: ({ value }: any) => (
      <div className="my-8 overflow-x-auto">
        {value.caption && <p className="mb-2 font-semibold">{value.caption}</p>}
        <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-700">
          <thead>
            <tr>
              {value.headers.map((h: string, i: number) => (
                <th key={i} className="px-4 py-2 text-left text-sm font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {value.rows.map((row: any, i: number) => (
              <tr key={i}>
                {row.cells.map((cell: string, j: number) => (
                  <td key={j} className="px-4 py-2 text-sm">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
}

  return <PortableText value={value} components={components} />
}
