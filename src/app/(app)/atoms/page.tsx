import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import AtomProgressCard from '@/app/components/AtomProgressCard'
import authCheck from '@/app/lib/authCheck'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AtomsPage() {
  const user = await authCheck()
  if (!user) {
    redirect('/auth/login')
  }

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const userAtomsData = await payload.find({
    collection: 'user-atoms',
    where: {
      user: {
        equals: user.id,
      },
    },
    depth: 2,
  })

  const userAtoms = userAtomsData.docs.map((userAtom: any) => userAtom.atom)

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Your Atoms</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {userAtoms.map((atom: any) => (
          <AtomProgressCard key={atom.id} atom={atom} />
        ))}
      </div>
    </div>
  )
}
