import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'

export const MCDecisionPoint: any = {
  slug: 'mcDecisionPoint',
  fields: [
    {
      name: 'sceneExposition',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
      }),
    },
    lexicalHTML('sceneExposition', { name: 'sceneExposition_html' }),
    {
      name: 'cloudinaryUrl',
      type: 'text',
    },
    {
      name: 'question',
      type: 'text',
    },
    {
      name: 'answerChoices',
      type: 'array',
      fields: [
        {
          name: 'answerText',
          type: 'text',
        },
        {
          name: 'answerMessage',
          type: 'textarea',
        },
        {
          name: 'decisionSlug',
          type: 'text',
        },
      ],
    },
  ],
}
