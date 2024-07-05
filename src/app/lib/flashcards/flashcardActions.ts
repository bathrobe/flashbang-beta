'use server'
import authCheck from '../authCheck'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { redirect } from 'next/navigation'
import { fsrs, generatorParameters, createEmptyCard } from 'ts-fsrs'

const srs = fsrs(generatorParameters({ enable_fuzz: true, maximum_interval: 365 }))

export async function answerCard(userFlashcard: any, input: any, rating: any) {
  'use server'
  try {
    const { fsrs } = userFlashcard
    const user = await authCheck()
    // @ts-ignore
    const schedulingResult = srs.repeat(fsrs.current, fsrs.current.due)[rating]
    console.log('schedulingResult')
    console.log(schedulingResult)
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
    return schedulingResult
  } catch (error) {
    console.error('Error in answerCard:', error)
    throw error // Re-throw to allow caller to handle or for global error handling
  }
}
export async function assignAtom(atomId: any) {
  const payload = await getPayloadHMR({ config: configPromise })
  const user = await authCheck()

  if (!user) throw new Error('User not authenticated')

  let userAtomEntry = null

  try {
    userAtomEntry = await payload.create({
      collection: 'user-atoms',
      data: {
        atom: atomId,
        user: user.id,
      },
    })

    const atom = await payload.findByID({
      collection: 'atoms',
      id: atomId,
    })

    const nestedFcards = atom.flashcards || []
    const assignPromises = nestedFcards.map((card: any) => assignCard(card.id, user.id))
    const newCards = await Promise.all(assignPromises)

    console.log('newCards', newCards)
    return newCards
  } catch (error) {
    if (userAtomEntry) {
      await payload.delete({
        collection: 'user-atoms',
        id: userAtomEntry.id,
      })
    }
    throw error
  }
}

export async function assignCard(flashcardId: any, userId: any) {
  const fsrsData = createEmptyCard()
  const payload = await getPayloadHMR({ config: configPromise })

  return await payload.create({
    collection: 'user-flashcards',
    data: {
      flashcard: flashcardId,
      user: userId,
      fsrs: JSON.stringify({ current: fsrsData, logs: [] }),
    },
  })
}
