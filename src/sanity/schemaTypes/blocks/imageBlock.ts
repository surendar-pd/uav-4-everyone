import { defineType } from 'sanity'

export const imageBlock = defineType({
  name: 'imageBlock',
  title: 'Image',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Full Width', value: 'full' },
          { title: 'Side by Side (2 images)', value: 'sideBySide' },
        ],
      },
      initialValue: 'full',
    },
    {
      name: 'additionalImages',
      title: 'Additional Images',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', title: 'Alt Text', type: 'string' },
        ],
      }],
      hidden: ({ parent }) => parent?.layout === 'full',
    },
  ],
  preview: {
    select: { image: 'image', alt: 'image.alt', layout: 'layout' },
    prepare({ image, alt, layout }) {
      return {
        title: alt || 'Image',
        subtitle: layout,
        media: image,
      }
    },
  },
})
