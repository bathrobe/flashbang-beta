import { Block } from 'payload'
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'

export const MultChoice: Block = {
  slug: 'multChoice',
  fields: [
    {
      name: 'reviewQuestion',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
      }),
    },
    lexicalHTML('reviewQuestion', { name: 'reviewQuestion_html' }),
    {
      name: 'answers',
      type: 'array',
      minRows: 2,
      fields: [
        {
          name: 'answerText',
          type: 'text',
        },
        {
          name: 'isCorrect',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'answerMessage',
          type: 'text',
          label: 'Answer Message',
          admin: {
            description: 'Message to display when this answer is selected',
          },
        },
      ],
    },
  ],
}
