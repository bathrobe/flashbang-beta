'use server'

import { getUser } from './authHelpers'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export async function authHelpersAtoms() {
  const user = await getUser()
  if (!user) throw new Error('User not authenticated')

  const payload = await getPayloadHMR({ config: configPromise })

  const userAtoms = await payload.find({
    collection: 'user-atoms',
    where: {
      user: {
        equals: user.id,
      },
    },
    depth: 1,
  })

  return userAtoms.docs
}
