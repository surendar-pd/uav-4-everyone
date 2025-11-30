import { defineType } from 'sanity'

export const tableBlock = defineType({
  name: 'tableBlock',
  title: 'Table',
  type: 'object',
  fields: [
    {
      name: 'caption',
      title: 'Table Caption',
      type: 'string',
    },
    {
      name: 'headers',
      title: 'Headers',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'cells',
            title: 'Cells',
            type: 'array',
            of: [{ type: 'string' }],
          },
        ],
      }],
    },
  ],
  preview: {
    select: { caption: 'caption', headers: 'headers' },
    prepare({ caption, headers }) {
      return {
        title: caption || 'Table',
        subtitle: headers?.join(' | '),
      }
    },
  },
})
