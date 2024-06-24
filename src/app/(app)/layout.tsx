import '@/globals.css'
import Header from '@/app/components/layout/Header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  )
}

export default Layout
