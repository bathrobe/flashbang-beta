'use client'
import { useSceneContext } from '@/app/contexts/SceneContext'
import { selectOrientationClass } from '@/app/lib/lessonActions/decisionActions'
import NextSceneButton from '@/app/components/NextSceneButton'
import { useUserContext } from '@/app/contexts/UserContext'

const AnswerButton: React.FC<{
  answerMessage: string
  answerText: string
  decisionData: any
  setIsAnswered: (isAnswered: boolean) => void
}> = ({ answerMessage, answerText, decisionData, setIsAnswered }) => {
  const { setUserClass } = useUserContext()
  const handleClick = () => {
    alert(answerMessage)
    selectOrientationClass(decisionData)
    setUserClass(decisionData.name)
    setIsAnswered(true)
  }

  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleClick}>
      {answerText}
    </button>
  )
}

const MCDecisionPoint: React.FC<{ scene: any }> = ({ scene }) => {
  const { isCurrentQuestionAnswered, setIsCurrentQuestionAnswered } = useSceneContext()
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
          <p className="mt-4 ">{scene.question}</p>
          {scene.answerChoices.map((ac: any, index: number) => (
            <AnswerButton
              key={index}
              answerMessage={ac.answerMessage}
              answerText={ac.answerText}
              decisionData={ac.decisionData}
              setIsAnswered={setIsCurrentQuestionAnswered}
            />
          ))}
        </div>
      </div>
      {isCurrentQuestionAnswered && <NextSceneButton />}
    </>
  )
}

export default MCDecisionPoint
