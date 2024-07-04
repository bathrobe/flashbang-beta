import React from 'react'

interface XPBonusScreenProps {
  reviewedCards: any[]
}

const XPBonusScreen: React.FC<XPBonusScreenProps> = ({ reviewedCards }) => {
  const xpGained = reviewedCards.length * 10 // Assuming 10 XP per reviewed card
  const totalXP = xpGained // This is just an example, you might want to fetch total XP from somewhere else

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white font-pixel">
      <div className="border-4 border-white p-8 max-w-md text-center">
        <h2 className="text-3xl mb-6">XP Bonus!</h2>
        <p className="text-xl mb-4">You gained:</p>
        <p className="text-4xl text-yellow-400 mb-6">{xpGained} XP</p>
        <p className="text-lg mb-8">Total XP: {totalXP}</p>
        <button
          onClick={() => {}} // You might want to add a function to handle continuing
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default XPBonusScreen
