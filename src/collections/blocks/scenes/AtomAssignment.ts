import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'

export const AtomAssignment: any = {
  slug: 'atomAssignment',
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
      name: 'atom',
      type: 'relationship',
      relationTo: 'atoms',
    },
  ],
}
