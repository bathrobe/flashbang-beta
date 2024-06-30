import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'

export const NoInteraction: any = {
  slug: 'noInteraction',
  fields: [
    {
      name: 'sceneExposition',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // The HTMLConverter Feature is the feature which manages the HTML serializers.
          // If you do not pass any arguments to it, it will use the default serializers.
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML('sceneExposition', { name: 'sceneExposition_html' }),
    {
      name: 'cloudinaryUrl',
      type: 'text',
    },
  ],
}
