import React from 'react'

const AnswerButton: React.FC<{ answerMessage: string; answerText: string }> = ({
  answerMessage,
  answerText,
}) => (
  <button
    className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
    onClick={() => alert(answerMessage)}
  >
    {answerText}
  </button>
)

const MCKnowledgeCheck: React.FC<{ scene: any }> = ({ scene }) => {
  return (
    <div className="flex flex-grow p-4">
      <div className="w-1/2 pr-2">
        <img
          src={scene.cloudinaryUrl}
          alt="Scene"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="w-1/2 pl-2 overflow-y-auto flex flex-col">
        <p>{scene.sceneText}</p>
        {scene.answerChoices.map((ac: any) => {
          return <AnswerButton answerMessage={ac.answerMessage} answerText={ac.answerText} />
        })}
      </div>
    </div>
  )
}

export default MCKnowledgeCheck
