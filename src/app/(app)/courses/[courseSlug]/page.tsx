import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Link from 'next/link'
import authCheck from '@/app/lib/authCheck'

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

  const user = await authCheck()
  const userLessons = user?.userData?.userLessons
  const { docs: course } = courseData
  const { title, description, lessons } = course[0]
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
            {lessons?.map((lesson: any) => (
              <Link key={lesson?.id} href={`/courses/${courseSlug}/lessons/${lesson?.slug}/scenes`}>
                <li className="flex items-center justify-between mb-4 bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-500 mr-6">{lesson?.number}</span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{lesson?.title}</h3>
                      <p className="text-gray-600">{lesson?.description}</p>
                    </div>
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
