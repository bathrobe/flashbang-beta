import type { CollectionConfig } from 'payload'
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'

import { MultChoice } from './blocks/interactions/MultChoice'

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
        },
        {
          name: 'course',
          type: 'relationship',
          relationTo: 'courses',
          hasMany: false,
        },
        {
          name: 'number',
          type: 'number',
        },
      ],
    },
    {
      name: 'disabled',
      type: 'checkbox',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Video/Exposition',
          fields: [
            {
              name: 'youTubeId',
              type: 'text',
              label: 'YouTube Video ID',
            },
            {
              name: 'exposition',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
              }),
              label: 'Exposition',
            },
            lexicalHTML('exposition', { name: 'exposition_html' }),
          ],
        },
        {
          label: 'Review',
          fields: [
            {
              name: 'review',
              type: 'blocks',
              label: 'Review',
              blocks: [MultChoice],
            },
          ],
        },
        {
          label: 'Atom',
          fields: [
            {
              name: 'atom',
              type: 'group',
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
                            features: ({ defaultFeatures }) => [
                              ...defaultFeatures,
                              HTMLConverterFeature({}),
                            ],
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
                            features: ({ defaultFeatures }) => [
                              ...defaultFeatures,
                              HTMLConverterFeature({}),
                            ],
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
                            features: ({ defaultFeatures }) => [
                              ...defaultFeatures,
                              HTMLConverterFeature({}),
                            ],
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
                  name: 'specificSection',
                  type: 'text',
                  label: 'Specific Section of Source',
                },
              ],
            },
          ],
        },
        {
          label: 'Flashcards',
          fields: [
            {
              name: 'flashcards',
              type: 'relationship',
              relationTo: 'flashcards',
              hasMany: true,
            },
          ],
        },
      ],
    },
  ],
}
