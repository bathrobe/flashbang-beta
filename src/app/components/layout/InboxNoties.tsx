'use client'
import { useFlashcardContext } from '@/app/contexts/FlashcardContext'

export default function InboxNoties() {
  const { dueCards } = useFlashcardContext()
  const dueCount = dueCards.length
  return (
    <span>
      {dueCount > 0 && (
        <span className="bg-red-500 text-white px-2 py-1 rounded-full">{dueCount}</span>
      )}
    </span>
  )
}
