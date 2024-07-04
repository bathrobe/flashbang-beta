import type { CollectionConfig } from 'payload'
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'
const Atoms: CollectionConfig = {
  slug: 'atoms',
  access: {
    read: () => true, // Allows public read access
  },

  labels: { plural: 'Atoms', singular: 'Atom' },
  admin: { useAsTitle: 'title' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'summary',
      label: 'One Sentence Summary',
      type: 'textarea',
    },

    {
      name: 'details',
      label: '2-3 Bullet Summary',
      type: 'richText',
      editor: lexicalEditor({
        // @ts-ignore
        features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
      }),
    },
    lexicalHTML('details', { name: 'details_html' }),
    {
      name: 'sourceQuote',
      type: 'textarea',
    },
    {
      name: 'flashcards',
      type: 'relationship',
      relationTo: 'flashcards',
      hasMany: true,
    },

    {
      type: 'row',
      fields: [
        {
          name: 'lesson',
          type: 'relationship',
          relationTo: 'lessons',
        },
        {
          name: 'number',
          type: 'number',
        },
      ],
    },
  ],
}

export { Atoms }
