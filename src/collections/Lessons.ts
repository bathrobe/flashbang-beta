import type { CollectionConfig } from 'payload'
import { MCKnowledgeCheck } from './blocks/scenes/MCKnowledgeCheck'
import { MCDecisionPoint } from './blocks/scenes/MCDecisionPoint'
import { NoInteraction } from './blocks/scenes/NoInteraction'

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
      name: 'scenes',
      type: 'blocks',
      label: 'Scenes',
      minRows: 1,
      maxRows: 50,
      blocks: [NoInteraction, MCKnowledgeCheck, MCDecisionPoint],
    },
  ],
}
