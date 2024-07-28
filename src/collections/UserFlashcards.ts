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
        {
          name: 'xp',
          type: 'number',
          label: 'XP',
          defaultValue: 0,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'lesson',
          type: 'relationship',
          relationTo: 'lessons',
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
