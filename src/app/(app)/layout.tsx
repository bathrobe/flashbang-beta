import '@/globals.css'
import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import UserContextProvider from '@/app/contexts/UserContext'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <UserContextProvider
          initialUserClass="1"
          initialLevel={1}
          initialXP={0}
          initialDueCards={[]}
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
