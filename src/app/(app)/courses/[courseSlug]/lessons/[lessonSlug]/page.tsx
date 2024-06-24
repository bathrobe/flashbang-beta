import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Link from 'next/link'

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
  const { title, description, cloudinaryUrl, number, scenes } = lesson[0]

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">{title}</h1>
      <div className="flex justify-center mb-8">
        <p className="text-xl text-gray-700">{description}</p>
      </div>
      {/* {cloudinaryUrl && (
        <div className="mb-8">
          <img src={cloudinaryUrl} alt={title} className="w-full rounded-lg shadow-md" />
        </div>
      )} */}
      <div className="text-lg text-gray-600 mb-8">
        <p>Lesson {number}</p>
      </div>
      <Link href={`/courses/${courseSlug}/lessons/${lessonSlug}/scenes`}>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          Start Lesson
        </button>
      </Link>
    </div>
  )
}
