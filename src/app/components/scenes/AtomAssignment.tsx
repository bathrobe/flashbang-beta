'use client'
import { useState } from 'react'
import AtomCard from '@/app/components/AtomCard'
import NextSceneButton from '@/app/components/NextSceneButton'

const AtomAssignment: React.FC<{ scene: any }> = ({ scene }) => {
  const [atomIsAssigned, setIsAtomAssigned] = useState(false)

  const handleAssign = () => setIsAtomAssigned(true)

  return (
    <>
      <div className="flex flex-grow p-4">
        <div className="w-1/2 pr-2">
          {scene.atom && (
            <AtomCard atom={scene.atom} isAtomAssigned={atomIsAssigned} onAssign={handleAssign} />
          )}
        </div>
        <div className="w-1/2 pl-2 overflow-y-auto">
          <div
            dangerouslySetInnerHTML={{ __html: scene.sceneExposition_html }}
            className="[&>ul]:list-disc [&>ul]:list-inside [&>a]:text-blue-500 [&>a]:underline"
          />
        </div>
      </div>
      {atomIsAssigned ? <NextSceneButton /> : null}
    </>
  )
}

export default AtomAssignment
