import { CollectionConfig } from 'payload'

export const LearningPhase: CollectionConfig = {
  slug: 'learning-phases',
  labels: { plural: 'Learning Phases', singular: 'Learning Phase' },
  admin: { useAsTitle: 'title' },
  access: {
    read: () => true, // Allows public read access
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'stage',
      type: 'number',
    },
  ],
}
