import '@/globals.css'
import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import UserContextProvider from '@/app/contexts/UserContext'
import { getUser } from '@/app/lib/authHelpers'
import { getDueCards } from '@/app/lib/flashcards/flashcardUtils'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser()
  const userLessons = user?.lessons || []
  const dueCards = await getDueCards(user)

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <UserContextProvider initialUserLessons={userLessons} initialDueCards={dueCards}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </UserContextProvider>
      </body>
    </html>
  )
}

export default Layout
