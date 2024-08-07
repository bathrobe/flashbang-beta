// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { LinkFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
// import { resendAdapter } from '@payloadcms/email-resend'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Courses } from './collections/Courses'
import { Sources } from './collections/Sources'
import { Lessons } from './collections/Lessons'
import { Flashcards } from './collections/Flashcards'
import { UserFlashcards } from './collections/UserFlashcards'
import { UserLessons } from './collections/UserLessons'
import { LearningPhases } from './collections/LearningPhases'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    Courses,
    UserLessons,
    Sources,
    Lessons,
    Flashcards,
    UserFlashcards,
    LearningPhases,
  ],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      LinkFeature({
        // Example showing how to customize the built-in fields
        // of the Link feature
        fields: [
          {
            name: 'rel',
            label: 'Rel Attribute',
            type: 'select',
            hasMany: true,
            options: ['noopener', 'noreferrer', 'nofollow'],
            admin: {
              description:
                'The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.',
            },
          },
          {
            name: 'target',
            label: 'Open in',
            type: 'select',
            defaultValue: '_blank',
            options: [
              { label: 'New Tab', value: '_blank' },
              { label: 'Same Tab', value: '_self' },
            ],
            admin: {
              description: 'Choose how the link should open.',
            },
          },
        ],
      }),
    ],
  }),
  // email: resendAdapter({
  //   defaultFromAddress: process.env.EMAIL_ADDRESS || '',
  //   defaultFromName: process.env.EMAIL_NAME || '',
  //   apiKey: process.env.RESEND_API_KEY || '',
  // }),
  email: nodemailerAdapter({
    defaultFromAddress: 'support@mail.flashbang.school',
    defaultFromName: 'Flashbang School',
    // Nodemailer transportOptions
    transportOptions: {
      host: process.env.SMTP_HOST,
      secure: true,
      port: 465,
      auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY,
      },
    },
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
