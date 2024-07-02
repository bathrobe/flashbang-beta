import { CollectionConfig } from 'payload'

export const Flashcards: CollectionConfig = {
  slug: 'flashcards',
  labels: { plural: 'Flashcards', singular: 'Flashcard' },
  access: {
    read: () => true, // Allows public read access
  },
  admin: { useAsTitle: 'title' },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'question', // required
      type: 'text', // required
    },
    {
      name: 'answer', // required
      type: 'text', // required
    },
  ],
}
