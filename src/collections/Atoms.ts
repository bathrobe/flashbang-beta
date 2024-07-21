import type { CollectionConfig } from 'payload'
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'
const Atoms: CollectionConfig = {
  slug: 'atoms',
  access: {
    read: () => true, // Allows public read access
  },

  labels: { plural: 'Atoms', singular: 'Atom' },
  admin: { useAsTitle: 'shortSummary_html' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Short Summary',
          fields: [
            {
              name: 'shortSummary',
              label: 'Short Summary',
              type: 'richText',
              editor: lexicalEditor({
                // @ts-ignore
                features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
              }),
            },
            lexicalHTML('shortSummary', { name: 'shortSummary_html' }),
          ],
        },
        {
          label: 'Medium Summary',
          fields: [
            {
              name: 'mediumSummary',
              label: 'Medium Summary',
              type: 'richText',
              editor: lexicalEditor({
                // @ts-ignore
                features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
              }),
            },
            lexicalHTML('mediumSummary', { name: 'mediumSummary_html' }),
          ],
        },
        {
          label: 'Long Summary',
          fields: [
            {
              name: 'longSummary',
              label: 'Long Summary',
              type: 'richText',
              editor: lexicalEditor({
                // @ts-ignore
                features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
              }),
            },
            lexicalHTML('longSummary', { name: 'longSummary_html' }),
          ],
        },
      ],
    },
    {
      name: 'source',
      type: 'relationship',
      relationTo: 'sources',
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
        // {
        //   name: 'lesson',
        //   type: 'relationship',
        //   relationTo: 'lessons',
        // },
        {
          name: 'number',
          type: 'number',
        },
      ],
    },
  ],
}

export { Atoms }
