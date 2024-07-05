'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import authCheck from '@/app/lib/authCheck'

export async function selectOrientationClass(decisionData: any) {
  const payload = await getPayloadHMR({ config: configPromise })
  const user = await authCheck()
  if (user?.id) {
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        userProfile: {
          orientationClass: decisionData,
        },
      },
    })
  } else {
    throw new Error('User not found')
  }
}
