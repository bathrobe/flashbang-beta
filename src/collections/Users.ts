import type { CollectionConfig } from 'payload'
import { UserCourses } from './blocks/UserCourses'
import { UserLessons } from './blocks/UserLessons'

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
      name: 'userCourses',
      type: 'blocks',
      blocks: [UserCourses],
    },
    {
      name: 'userLessons',
      type: 'blocks',
      blocks: [UserLessons],
    },
  ],
}
