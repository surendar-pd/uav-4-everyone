import { defineType } from 'sanity'

export const codeBlock = defineType({
  name: 'codeBlock',
  title: 'Code Block',
  type: 'object',
  fields: [
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'Python', value: 'python' },
          { title: 'JavaScript', value: 'javascript' },
          { title: 'Bash', value: 'bash' },
          { title: 'MATLAB', value: 'matlab' },
          { title: 'YAML', value: 'yaml' },
          { title: 'JSON', value: 'json' },
        ],
      },
      initialValue: 'python',
    },
    {
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 15,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'filename',
      title: 'Filename (optional)',
      type: 'string',
    },
  ],
  preview: {
    select: { language: 'language', code: 'code', filename: 'filename' },
    prepare({ language, code, filename }) {
      const preview = code?.split('\n')[0]?.substring(0, 50) || 'Empty'
      return {
        title: filename || `Code: ${language}`,
        subtitle: preview,
      }
    },
  },
})
