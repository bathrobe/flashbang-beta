import React, { useState } from 'react'
import NextSceneButton from '@/app/components/NextSceneButton'

const AnswerButton: React.FC<{
  answerMessage: string
  answerText: string
  isCorrect: boolean
  setIsAnswered: (isAnswered: boolean) => void
}> = ({ answerMessage, answerText, isCorrect, setIsAnswered }) => {
  const handleClick = () => {
    alert(answerMessage)
    if (isCorrect) {
      setIsAnswered(true)
    }
  }

  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleClick}>
      {answerText}
    </button>
  )
}

const MCKnowledgeCheck: React.FC<{ scene: any }> = ({ scene }) => {
  const [isAnswered, setIsAnswered] = useState(false)

  return (
    <>
      <div className="flex flex-grow p-4">
        <div className="w-1/2 pr-2">
          <img
            src={scene.cloudinaryUrl}
            alt="Scene"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="w-1/2 pl-2 overflow-y-auto flex flex-col">
          <div
            dangerouslySetInnerHTML={{ __html: scene.sceneExposition_html }}
            className="[&>ul]:list-disc [&>ul]:list-inside"
          />
          <p className="mt-4">{scene.question}</p>
          {scene.answerChoices.map((ac: any, index: number) => (
            <AnswerButton
              key={index}
              answerMessage={ac.answerMessage}
              answerText={ac.answerText}
              isCorrect={ac.isCorrect}
              setIsAnswered={setIsAnswered}
            />
          ))}
        </div>
      </div>
      {isAnswered && <NextSceneButton />}
    </>
  )
}

export default MCKnowledgeCheck
