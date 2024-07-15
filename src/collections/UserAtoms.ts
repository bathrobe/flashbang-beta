import { CollectionConfig } from 'payload'

export const UserAtoms: CollectionConfig = {
  slug: 'user-atoms',
  labels: { plural: 'User Atoms', singular: 'User Atom' },
  admin: { useAsTitle: 'atom' },
  fields: [
    {
      name: 'atom',
      type: 'relationship',
      relationTo: 'atoms',
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'level',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'xp',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
  ],
}
