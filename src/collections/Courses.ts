import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'isHidden',
      type: 'checkbox',
    },
    {
      name: 'slug',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'cloudinaryUrl',
      type: 'text',
      label: 'Cloudinary URL',
    },
    {
      name: 'sources',
      type: 'relationship',
      relationTo: 'sources',
      hasMany: true,
    },
    {
      name: 'lessons',
      type: 'relationship',
      relationTo: 'lessons',
      hasMany: true,
    },
    {
      name: 'prereqs',
      type: 'relationship',
      relationTo: 'courses',
      hasMany: true,
    },
  ],
}
