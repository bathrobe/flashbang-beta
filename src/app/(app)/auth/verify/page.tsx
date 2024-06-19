import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { redirect } from 'next/navigation'

export default async function VerifyPage({ searchParams }: { searchParams: { token: string } }) {
  const token = searchParams.token

  if (!token) {
    redirect('/')
  }

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const result = await payload.verifyEmail({
    token,
    collection: 'users',
  })

  console.log(result)

  if (result) {
    console.log('found result')
    console.log(result)
    redirect('/')
  } else {
    return <div>error</div>
  }
}
