'use server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import authCheck from './authCheck'

export async function updateXP(newXP: number) {
  try {
    const user = await authCheck()
    if (!user) {
      throw new Error('User not authenticated')
    }

    const payload = await getPayloadHMR({ config: configPromise })

    const updatedUser = await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        xp: newXP,
        level: Math.floor(Math.sqrt(newXP / 100)) + 1,
      },
    })

    return updatedUser
  } catch (error) {
    console.error('Error updating XP:', error)
    throw error
  }
}
