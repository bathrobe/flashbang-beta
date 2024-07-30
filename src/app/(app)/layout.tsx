import '@/globals.css'
import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import UserContextProvider from '@/app/contexts/UserContext'
import { getUser } from '@/app/lib/auth'
import { getDueCards } from '@/app/lib/flashcards'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser()
  const dueCards = await getDueCards(user)

  const payload = await getPayloadHMR({
    config: configPromise,
  })

  const userLessons = user
    ? await payload.find({
        collection: 'userLessons',
        where: {
          user: {
            equals: user.id,
          },
        },
      })
    : { docs: [] }

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <UserContextProvider
          // @ts-ignore
          initialUser={user}
          initialDueCards={dueCards}
          initialUserLessons={userLessons.docs}
        >
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </UserContextProvider>
      </body>
    </html>
  )
}

export default Layout
