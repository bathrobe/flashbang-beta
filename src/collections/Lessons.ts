import type { CollectionConfig } from 'payload'
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'
import { MCKnowledgeCheck } from './blocks/scenes/MCKnowledgeCheck'
import { MCDecisionPoint } from './blocks/scenes/MCDecisionPoint'
import { NoInteraction } from './blocks/scenes/NoInteraction'
import { AtomAssignment } from './blocks/scenes/AtomAssignment'
import { MultChoice } from './blocks/interactions/MultChoice'

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  admin: {
    useAsTitle: 'title',
  },
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
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'cloudinaryUrl',
      type: 'text',
      label: 'Cloudinary URL',
    },
    {
      name: 'number',
      type: 'number',
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      hasMany: false,
    },
    {
      name: 'exposition',
      type: 'richText',
      label: 'Exposition',
      editor: lexicalEditor({
        // @ts-ignore
        features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
      }),
    },
    lexicalHTML('exposition', { name: 'exposition_html' }),
    {
      name: 'interactions',
      type: 'blocks',
      label: 'Interactions',
      minRows: 0,
      maxRows: 50,
      blocks: [
        MultChoice,
        // Import and add your interaction blocks here
        // For example:
        // MCInteraction,
        // FillInTheBlankInteraction,
        // DragAndDropInteraction,
      ],
    },
    {
      name: 'atom',
      type: 'relationship',
      relationTo: 'atoms',
      hasMany: false,
    },

    {
      name: 'scenes',
      type: 'blocks',
      label: 'Scenes',
      minRows: 1,
      maxRows: 50,
      blocks: [NoInteraction, MCKnowledgeCheck, MCDecisionPoint, AtomAssignment],
    },
  ],
}
