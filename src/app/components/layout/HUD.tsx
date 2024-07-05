'use client'
import { useAtomContext } from '@/app/contexts/AtomContext'
import { useUserContext } from '@/app/contexts/UserContext'
import { Atom, Star } from 'lucide-react'

export default function HUD() {
  const { userAtoms } = useAtomContext()
  const { userClass } = useUserContext()
  const atomCount = userAtoms?.length || 0

  if (atomCount === 0 && !userClass) {
    return null
  }

  const level = 1

  return (
    <div className="p-2 mt-4">
      <div className="flex  items-center">
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="">
            {userClass} - Level {level}
          </span>
        </div>
        {atomCount > 0 && (
          <div className="flex items-center ml-8">
            <Atom className="w-5 h-5 mr-1 text-blue-300" />
            <span className="">{atomCount}</span>
          </div>
        )}
      </div>
    </div>
  )
}
