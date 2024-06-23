// Return a list of `params` to populate the [slug] dynamic segment
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: any }) {
  const { courseSlug } = params

  const payload = await getPayloadHMR({
    config: configPromise,
  })
  const courseData = await payload.find({
    collection: 'courses',
    where: {
      slug: {
        equals: courseSlug,
      },
    },
  })

  const { docs: course } = courseData
  const { title, description, sources, lessons } = course[0]
  console.log(lessons)
  return (
    <div>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        <div className="flex justify-center mb-8">
          <p className="text-xl text-gray-700">{description}</p>
        </div>
        <section>
          <h2 className="text-2xl font-bold mb-4">Lessons</h2>
          <ul>
            {lessons?.map((lesson) => (
              <Link href={`/courses/${courseSlug}/lessons/${lesson?.slug}`}>
                <li
                  key={lesson?.id}
                  className="flex items-center mb-4 bg-white rounded-lg shadow-md p-4"
                >
                  <span className="text-2xl font-bold text-gray-500 mr-6">{lesson?.number}</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{lesson?.title}</h3>
                    <p className="text-gray-600">{lesson?.description}</p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
