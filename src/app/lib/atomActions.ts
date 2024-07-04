'use server'

import authCheck from './authCheck'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export async function getUserAtoms() {
  const user = await authCheck()
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
