import React from 'react'
import { Atom, UserFlashcard, Flashcard } from '../../payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import dayjs from 'dayjs'
import authCheck from '../lib/authCheck'

const AtomProgressCard: React.FC<{ atom: Atom }> = async ({ atom }) => {
  const payload = await getPayloadHMR({
    config: configPromise,
  })
  const user = await authCheck()

  const userFlashcardsData = await payload.find({
    collection: 'user-flashcards',
    where: {
      flashcard: {
        in: atom?.flashcards?.map((flashcard: any) => flashcard.id),
      },
      user: {
        equals: user?.id,
      },
    },
    depth: 2,
  })

  const userFlashcards: UserFlashcard[] = userFlashcardsData.docs

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{atom.title}</h2>
        <p className="mb-4">{atom.summary}</p>
        <h3 className="text-lg font-semibold mb-2">Flashcards</h3>
        <ul>
          {userFlashcards.map((userFlashcard) => (
            <li key={userFlashcard?.id} className="mb-4 bg-gray-50 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  {(userFlashcard?.flashcard as Flashcard)?.title}
                </h4>
                <FSRSStatus fsrs={userFlashcard?.fsrs as any} />
              </div>
              <FSRSStats fsrs={userFlashcard?.fsrs as any} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const FSRSStatus: React.FC<{ fsrs: any }> = ({ fsrs }) => {
  if (!fsrs?.current) return null

  const status = fsrs.logs?.length === 0 ? 'New' : fsrs.current.state === 2 ? 'Review' : 'Learning'
  const colorClass =
    status === 'New'
      ? 'bg-blue-100 text-blue-800'
      : status === 'Review'
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800'

  return (
    <span className={`text-sm font-medium px-2 py-1 rounded-full ${colorClass}`}>{status}</span>
  )
}

const FSRSStats: React.FC<{ fsrs: any }> = ({ fsrs }) => {
  if (!fsrs?.current) return null

  const { due, reps, stability, difficulty } = fsrs.current

  return (
    <div className="grid grid-cols-2 gap-2 text-sm">
      <StatItem label="Next Due" value={dayjs(due).format('MMM D, YYYY HH:mm')} />
      <StatItem label="Reviews" value={reps} />
      <StatItem label="Stability" value={stability.toFixed(2)} />
      <StatItem label="Difficulty" value={difficulty.toFixed(2)} />
    </div>
  )
}

const StatItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div>
    <span className="font-medium text-gray-600">{label}: </span>
    <span className="text-gray-800">{value}</span>
  </div>
)

export default AtomProgressCard
