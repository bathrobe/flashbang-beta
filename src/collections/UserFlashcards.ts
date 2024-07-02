import { CollectionConfig } from 'payload'
export const UserFlashcards: CollectionConfig = {
  slug: 'user-flashcards',
  labels: { plural: 'User Flashcards', singular: 'User Flashcard' },
  admin: { useAsTitle: 'flashcard' },
  fields: [
    {
      name: 'flashcard',
      type: 'relationship',
      relationTo: 'flashcards',
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'fsrs',
      type: 'json',
    },
  ],
}
