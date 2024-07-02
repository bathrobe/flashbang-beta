'use server'
import authCheck from '../authCheck'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { redirect } from 'next/navigation'

export async function answerCard(userFlashcard: any, input: any, rating: any) {
  'use server'
  const { fsrs } = userFlashcard
  const user = await authCheck()
  // @ts-ignore
  const schedulingResult = srs.repeat(fsrs.current, fsrs.current.due)[rating]
  schedulingResult.log['userAnswerText'] = input
  const payload = await getPayloadHMR({ config: configPromise })

  if (!user) {
    redirect('/auth/login')
  }

  await payload.update({
    collection: 'user-flashcards',
    id: userFlashcard.id,
    data: {
      // @ts-ignore
      fsrs: {
        current: schedulingResult.card,
        logs: [schedulingResult.log, ...fsrs.logs],
      },
    },
  })
}
