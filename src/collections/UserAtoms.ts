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
  ],
}
