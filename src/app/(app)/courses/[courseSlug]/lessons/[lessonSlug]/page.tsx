import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: any }) {
  const { courseSlug, lessonSlug } = params

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
  const { title, description, cloudinaryUrl, number } = lesson[0]

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">{title}</h1>
      <div className="flex justify-center mb-8">
        <p className="text-xl text-gray-700">{description}</p>
      </div>
      {cloudinaryUrl && (
        <div className="mb-8">
          <img src={cloudinaryUrl} alt={title} className="w-full rounded-lg shadow-md" />
        </div>
      )}
      <div className="text-lg text-gray-600">
        <p>Lesson {number}</p>
        {/* Add more lesson content here */}
      </div>
    </div>
  )
}
