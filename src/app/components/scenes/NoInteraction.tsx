import NextSceneButton from '@/app/components/NextSceneButton'

const NoInteraction: React.FC<{ scene: any }> = ({ scene }) => (
  <>
    <div className="flex flex-grow p-4">
      <div className="w-1/2 pr-2">
        <img
          src={scene.cloudinaryUrl}
          alt="Scene"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="w-1/2 pl-2 overflow-y-auto">
        <p>{scene.sceneText}</p>
      </div>
    </div>
    <NextSceneButton />
  </>
)

export default NoInteraction
