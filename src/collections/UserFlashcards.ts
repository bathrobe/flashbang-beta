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
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'flashcard',
      type: 'relationship',
      relationTo: 'flashcards',
    },
    {
      name: 'lesson',
      type: 'relationship',
      relationTo: 'lessons',
    },
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
}
