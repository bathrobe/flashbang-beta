import '@/globals.css'
import Header from '@/app/components/layout/Header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </>
  )
}

export default Layout
