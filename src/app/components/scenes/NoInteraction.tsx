import NextSceneButton from '@/app/components/NextSceneButton'

const NoInteraction: React.FC<{ scene: any }> = ({ scene }) => {
  console.log(scene)

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

export default NoInteraction
