import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'

const authCheck = async () => {
  const headers = getHeaders()
  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const { user } = await payload.auth({ headers })
  return user
}

export default authCheck
