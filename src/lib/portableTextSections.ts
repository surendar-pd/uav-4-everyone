import { slugifyWithCounter } from '@sindresorhus/slugify'

interface PortableTextBlock {
  _type: string
  style?: string
  children?: Array<{ text?: string; _type: string }>
  [key: string]: any
}

export type Subsection = {
  id: string
  title: string
  children?: undefined
}

export type Section = {
  id: string
  title: string
  children: Array<Subsection>
}

function getBlockText(block: PortableTextBlock): string {
  if (!block.children) return ''
  return block.children
    .map((child) => child.text || '')
    .join('')
}

export function collectPortableTextSections(
  content: Array<PortableTextBlock>,
): Array<Section> {
  let sections: Array<Section> = []
  const slugify = slugifyWithCounter()

  for (let block of content) {
    // Check if it's a heading block (h1, h2, h3, etc.)
    if (block._type === 'block' && block.style) {
      const level = block.style
      const title = getBlockText(block)

      if (title) {
        const id = slugify(title)

        if (level === 'h3') {
          // H3 is a subsection
          if (!sections[sections.length - 1]) {
            // If no h2 exists, skip or handle gracefully
            continue
          }
          sections[sections.length - 1].children.push({
            id,
            title,
          })
        } else if (level === 'h2') {
          // H2 is a main section
          sections.push({
            id,
            title,
            children: [],
          })
        } else if (level === 'h1') {
          // H1 is also a main section
          sections.push({
            id,
            title,
            children: [],
          })
        }
      }
    }
  }

  return sections
}
