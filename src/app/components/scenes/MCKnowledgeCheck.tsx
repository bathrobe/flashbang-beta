import React, { useState, useCallback } from 'react'
import NextSceneButton from '@/app/components/NextSceneButton'

const AnswerButton: React.FC<{
  answerMessage: string
  answerText: string
  isCorrect: boolean
  onAnswer: (isCorrect: boolean) => void
}> = ({ answerMessage, answerText, isCorrect, onAnswer }) => {
  const handleClick = useCallback(() => {
    alert(answerMessage)
    onAnswer(isCorrect)
  }, [answerMessage, isCorrect, onAnswer])

  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleClick}>
      {answerText}
    </button>
  )
}

const MCKnowledgeCheck: React.FC<{ scene: any }> = ({ scene }) => {
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)

  const handleAnswer = useCallback((isCorrect: boolean) => {
    setIsAnswered(true)
    setIsCorrectAnswer(isCorrect)
  }, [])

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
              onAnswer={handleAnswer}
            />
          ))}
        </div>
      </div>
      {isAnswered && isCorrectAnswer && (
        <NextSceneButton isAnswered={isAnswered} setIsAnswered={setIsAnswered} />
      )}
    </>
  )
}

export default MCKnowledgeCheck
