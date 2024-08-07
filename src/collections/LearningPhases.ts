import { CollectionConfig } from 'payload'

export const LearningPhases: CollectionConfig = {
  slug: 'learningPhases',
  labels: { plural: 'Learning Phases', singular: 'Learning Phase' },
  access: {
    read: () => true,
  },
  admin: { useAsTitle: 'name' },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'stabilityThreshold',
      type: 'number',
      required: true,
    },
    {
      name: 'stage',
      type: 'number',
      required: true,
    },
  ],
}
