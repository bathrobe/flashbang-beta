import type { CollectionConfig } from 'payload'

const rootUrl = process.env.PROJECT_URL

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    admin: ({ req }) => {
      if (req?.user?.role === 'admin') {
        return true
      }
      return false
    },
  },
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        const url = `${rootUrl}/auth/verify?token=${token}`
        return `<p>Welcome!</p>
        <p>Verify your email by clicking <a href="${url}">here</a>.</p>`
      },
    },
    forgotPassword: {
      // @ts-ignore
      generateEmailHTML: ({ token }) => {
        const url = `${rootUrl}/auth/reset?token=${token}`
        return `<p>Reset your password by clicking <a href="${url}">here</a>.</p>`
      },
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    },
    {
      name: 'lessons',
      type: 'array',
      label: 'User Lessons',
      fields: [
        {
          name: 'lesson',
          type: 'relationship',
          relationTo: 'lessons',
          required: true,
        },
        {
          name: 'isCompleted',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
