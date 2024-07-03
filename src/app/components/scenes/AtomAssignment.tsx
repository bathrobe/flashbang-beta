'use client'
import AtomCard from '@/app/components/AtomCard'
import NextSceneButton from '@/app/components/NextSceneButton'

const AtomAssignment: React.FC<{ scene: any }> = ({ scene }) => {
  return (
    <>
      <div className="flex flex-grow p-4">
        <div className="w-1/2 pr-2">
          {scene.atom && <AtomCard disabled={false} atom={scene.atom} />}
        </div>
        <div className="w-1/2 pl-2 overflow-y-auto">
          <div
            dangerouslySetInnerHTML={{ __html: scene.sceneExposition_html }}
            className="[&>ul]:list-disc [&>ul]:list-inside [&>a]:text-blue-500 [&>a]:underline"
          />
        </div>
      </div>
      <NextSceneButton />
    </>
  )
}

export default AtomAssignment
