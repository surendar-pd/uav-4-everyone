import { defineField, defineType } from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    // Core metadata
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Dataset', value: 'dataset' },
          { title: 'Introduction', value: 'introduction' },
          { title: 'General', value: 'general' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),

    // Main content (Portable Text with custom blocks)
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'calloutBlock' },
        { type: 'codeBlock' },
        { type: 'imageBlock' },
        { type: 'tableBlock' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pageType: 'pageType',
      slug: 'slug.current',
    },
    prepare({ title, pageType, slug }) {
      return {
        title: title,
        subtitle: `${pageType} - /${slug}`,
      }
    },
  },
})
