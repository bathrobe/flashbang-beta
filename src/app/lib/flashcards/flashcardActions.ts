'use server'
import { getUser } from '../authHelpers'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { redirect } from 'next/navigation'
import { fsrs, generatorParameters } from 'ts-fsrs'

const srs = fsrs(generatorParameters({ enable_fuzz: true, maximum_interval: 365 }))

export async function answerCard(card: any, input: string, rating: number) {
  try {
    const user = await getUser()
    if (!user) {
      redirect('/auth/login')
    }

    const payload = await getPayloadHMR({ config: configPromise })

    const schedulingResult = srs.repeat(card.current, new Date()) as any

    await payload.update({
      collection: 'userFlashcards',
      id: card.id,
      data: {
        current: schedulingResult[rating].card,
        log: [schedulingResult[rating].log, ...(card.log || [])],
      },
    })

    return schedulingResult
  } catch (error) {
    console.error('Error in answerCard:', error)
    throw error
  }
}
