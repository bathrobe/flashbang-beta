import NextSceneButton from '@/app/components/NextSceneButton'
import ContentHolder from '@/app/components/scenes/ContentHolder'
import ImageHolder from '@/app/components/scenes/ImageHolder'

const NoInteraction: React.FC<{ scene: any }> = ({ scene }) => {
  return (
    <>
      <div className="flex flex-grow p-4">
        <ImageHolder src={scene.cloudinaryUrl} alt="Scene" />
        <div className="w-1/2 pl-2 overflow-y-auto">
          <ContentHolder content={scene.sceneExposition_html} />
        </div>
      </div>
      <NextSceneButton />
    </>
  )
}

export default NoInteraction
