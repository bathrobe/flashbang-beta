import { CollectionConfig } from 'payload'

export const UserFlashcards: CollectionConfig = {
  slug: 'userFlashcards',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) {
        return {
          user: {
            equals: user.id,
          },
        }
      }
      return false
    },
    update: ({ req: { user } }) => {
      if (user) {
        return {
          user: {
            equals: user.id,
          },
        }
      }
      return false
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'userLesson',
          type: 'relationship',
          relationTo: 'userLessons',
        },
        {
          name: 'flashcard',
          type: 'relationship',
          relationTo: 'flashcards',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'current',
          type: 'json',
          label: 'Current State',
        },
        {
          name: 'log',
          type: 'json',
          label: 'Review Log',
        },
      ],
    },
  ],
}
