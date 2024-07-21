'use client'
import { useUserContext } from '@/app/contexts/UserContext'

export default function InboxNoties() {
  const { dueCards } = useUserContext()
  const dueCount = dueCards.length
  return (
    <span>
      {dueCount > 0 && (
        <span className="bg-red-500 text-white px-2 py-1 rounded-full">{dueCount}</span>
      )}
    </span>
  )
}
