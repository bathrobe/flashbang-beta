'use client'
import { useState } from 'react'
import AtomCard from '@/app/components/AtomCard'
import NextSceneButton from '@/app/components/NextSceneButton'
import { useSceneContext } from '@/app/contexts/SceneContext'
import { useAtomContext } from '@/app/contexts/AtomContext'
import ContentHolder from '@/app/components/scenes/ContentHolder'

const AtomAssignment: React.FC<{ scene: any }> = ({ scene }) => {
  const { userAtoms, setUserAtoms } = useAtomContext()
  const { userAtomsData } = useSceneContext()
  const atom = userAtomsData.find((atom) => atom.atom.id === scene.atom.id)
  const [atomIsAssigned, setIsAtomAssigned] = useState(atom ? true : false)

  const handleAssign = () => {
    setIsAtomAssigned(true)
    setUserAtoms([...userAtoms, scene.atom])
  }

  return (
    <>
      <div className="flex flex-grow p-4">
        <div className="w-1/2 pr-2">
          {scene.atom && (
            <AtomCard atom={scene.atom} isAtomAssigned={atomIsAssigned} onAssign={handleAssign} />
          )}
        </div>
        <div className="w-1/2">
          <ContentHolder content={scene.sceneExposition_html} />
        </div>
      </div>
      {atomIsAssigned ? <NextSceneButton /> : null}
    </>
  )
}

export default AtomAssignment
