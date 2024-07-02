import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import dayjs from 'dayjs'

export const getDueCards = async (userId: string | null | number) => {
  const payload = await getPayloadHMR({ config: configPromise })
  let dueCards: any[] = []
  if (userId) {
    const dueFlashcardData = await payload.find({
      collection: 'user-flashcards',
      depth: 1,
      where: {
        user: { equals: userId },
      },
    })
    dueCards = dueFlashcardData.docs.filter((doc) => {
      // @ts-ignore
      const dueDate = dayjs(doc.fsrs?.current.due!)
      return !dueDate.isAfter(dayjs(), 'day')
    })
  }
  return dueCards
}
