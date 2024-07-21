import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'

const getUser = async () => {
  const headers = getHeaders()
  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const { user } = await payload.auth({ headers })
  return user
}

const authCheck = async () => {
  const user = await getUser()
  if (!user) {
    redirect('/auth/login')
  }
  return user
}

export { getUser, authCheck }
