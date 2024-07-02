'use client'
import { useSceneContext } from '@/app/contexts/SceneContext'
import AtomCard from '@/app/components/AtomCard'
import NextSceneButton from '@/app/components/NextSceneButton'
import { useState } from 'react'

const AtomAssignment: React.FC<{ scene: any }> = ({ scene }) => {
  const [isReviewed, setIsReviewed] = useState(false)
  const { currentScene } = useSceneContext()

  return (
    <>
      <div className="flex flex-grow p-4">
        <div className="w-1/2 pr-2">{scene.atom && <AtomCard atom={scene.atom} />}</div>
        <div className="w-1/2 pl-2 overflow-y-auto">
          <div
            dangerouslySetInnerHTML={{ __html: scene.sceneExposition_html }}
            className="[&>ul]:list-disc [&>ul]:list-inside [&>a]:text-blue-500 [&>a]:underline"
          />
        </div>
      </div>
      <NextSceneButton isAnswered={isReviewed} setIsAnswered={setIsReviewed} />
    </>
  )
}

export default AtomAssignment
