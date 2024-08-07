import { CollectionConfig } from 'payload'

export const UserLessons: CollectionConfig = {
  slug: 'userLessons',
  labels: { plural: 'User Lessons', singular: 'User Lesson' },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'lesson',
      type: 'relationship',
      relationTo: 'lessons',
      required: true,
    },
    {
      name: 'currentPhase',
      type: 'relationship',
      relationTo: 'learningPhases',
    },
    {
      name: 'isCompleted',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
