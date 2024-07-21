import React, { useEffect } from 'react'
import Link from 'next/link'
import { calculateXP } from '@/app/lib/flashcards/xpCalculation'
import { useUserContext } from '@/app/contexts/UserContext'

interface XPBonusScreenProps {
  reviewedCards: any[]
  currentXP: number
  currentLevel: number
}

const XPBonusScreen: React.FC<XPBonusScreenProps> = ({
  reviewedCards,
  currentXP,
  currentLevel,
}) => {
  const { setCurrentXP, setCurrentLevel } = useUserContext()
  const xpGained = calculateXP(reviewedCards)
  const newTotalXP = currentXP + xpGained
  const newLevel = Math.floor(Math.sqrt(newTotalXP / 100)) + 1

  useEffect(() => {
    const updateUserXP = async () => {
      setCurrentXP(newTotalXP)
      setCurrentLevel(newLevel)
    }
    updateUserXP()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <div className="shadow-lg rounded-lg p-8 max-w-md text-center">
        <h2 className="text-3xl mb-6 font-bold text-blue-600">XP Bonus!</h2>
        <p className="text-xl mb-4">You gained:</p>
        <p className="text-4xl text-green-500 mb-6 font-bold">{xpGained} XP</p>
        <p className="text-lg mb-4">Total XP: {newTotalXP}</p>
        <p className="text-lg mb-8">Level: {newLevel}</p>
        {newLevel > currentLevel && (
          <p className="text-2xl text-yellow-500 mb-6 font-bold">Level Up!</p>
        )}
        <Link
          href="/atoms"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Continue
        </Link>
      </div>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="animate-confetti absolute w-2 h-2 bg-blue-500 opacity-70"></div>
        <div className="animate-confetti absolute w-2 h-2 bg-green-500 opacity-70"></div>
        <div className="animate-confetti absolute w-2 h-2 bg-yellow-500 opacity-70"></div>
      </div>
    </div>
  )
}

export default XPBonusScreen
