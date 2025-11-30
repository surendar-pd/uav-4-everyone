import { defineType } from 'sanity'

export const calloutBlock = defineType({
  name: 'calloutBlock',
  title: 'Callout',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Callout Type',
      type: 'string',
      options: {
        list: [
          { title: 'Note', value: 'note' },
          { title: 'Warning', value: 'warning' },
        ],
        layout: 'radio',
      },
      initialValue: 'note',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
  preview: {
    select: { title: 'title', type: 'type' },
    prepare({ title, type }) {
      return {
        title: `Callout: ${title}`,
        subtitle: type,
      }
    },
  },
})
