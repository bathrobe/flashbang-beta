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
    {
      name: 'relatedAtom',
      type: 'relationship',
      relationTo: 'atoms',
      hasMany: false,
      admin: {
        disabled: true,
      },
      hooks: {
        afterRead: [
          async ({ req, value, data }) => {
            if (value) return value // If already populated, return as is

            // Query the atoms collection to find the atom that has this flashcard
            const atom = await req.payload.find({
              collection: 'atoms',
              where: {
                'flashcards.id': {
                  equals: data?.id,
                },
              },
            })

            if (atom.docs.length > 0) {
              return atom.docs[0].id
            }

            return null
          },
        ],
      },
    },
  ],
}
