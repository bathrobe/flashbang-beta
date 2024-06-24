import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import SceneContainer from '@/app/components/SceneContainer'

export const dynamic = 'force-dynamic'

export default async function Scenes({ params }: { params: any }) {
  const { lessonSlug } = params

  const payload = await getPayloadHMR({
    config: configPromise,
  })
  const lessonData = await payload.find({
    collection: 'lessons',
    where: {
      slug: {
        equals: lessonSlug,
      },
    },
  })

  const { docs: lesson } = lessonData
  const { scenes } = lesson[0]

  return (
    <div>
      <SceneContainer scenes={scenes} />
    </div>
  )
}
