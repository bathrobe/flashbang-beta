'use client'
import Link from 'next/link'
import { useUserContext } from '../contexts/UserContext'

const TodayLearning: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { dueCards } = useUserContext()

  return (
    <div className="mb-8 space-y-4">
      <h2 className="text-2xl font-bold">Today's Learning</h2>
      {dueCards.length > 0 ? (
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="font-semibold">Review</h3>
          <Link
            href="/inbox"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 inline-block"
          >
            Start Review →
          </Link>
        </div>
      ) : (
        <div className=" p-4 rounded-lg">
          <h3 className="font-semibold">
            {/* {dueCards.length > 0 ? 'New Lessons' : 'No new content today'} */}
          </h3>
          {children}
        </div>
      )}
    </div>
  )
}

export default TodayLearning
