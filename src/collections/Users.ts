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
      name: 'userProfile',
      type: 'json',
    },
    {
      name: 'xp',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'level',
      type: 'number',
      defaultValue: 1,
    },
    {
      name: 'userData',
      type: 'group',
      fields: [
        {
          name: 'userLessons',
          type: 'array',
          fields: [
            {
              name: 'lesson',
              type: 'relationship',
              relationTo: 'lessons',
            },
            {
              name: 'isCompleted',
              type: 'checkbox',
            },
            {
              name: 'data',
              type: 'json',
            },
          ],
        },
        {
          name: 'userCourses',
          type: 'array',
          fields: [
            {
              name: 'course',
              type: 'relationship',
              relationTo: 'courses',
            },
            {
              name: 'isCompleted',
              type: 'checkbox',
            },
            {
              name: 'data',
              type: 'json',
            },
          ],
        },
      ],
    },
  ],
}
