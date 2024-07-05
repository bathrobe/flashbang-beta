import Link from 'next/link'
import authCheck from '@/app/lib/authCheck'
import Logout from 'src/app/components/auth/Logout'
import InboxNoties from './InboxNoties'
import HUD from './HUD'

export default async function Header() {
  const user = await authCheck()
  return (
    <header
      className="mt-2 flex justify-between p-2"
      style={{ height: 'var(--header-height, auto)' }}
    >
      <Link href="/" className="text-lg font-bold">
        Flashbang
      </Link>
      <nav className="">
        {user ? (
          <div className="flex items-center space-x-2 text-sm">
            <span className="border-r border-gray-900 pr-4 mr-2">
              <Link href="/inbox">
                <span className="mr-2">Inbox</span>
                <InboxNoties />
              </Link>
              <Link className="ml-4" href="/atoms">
                Atoms
              </Link>
              <Link className="ml-4" href="/">
                Courses
              </Link>
              <Link
                className="ml-4"
                href="https://flashbangapp.substack.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Subscribe
              </Link>
            </span>
            <span>{user.email}</span>
            <Logout />
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/auth/login">Login</Link>
            <Link
              href="https://flashbangapp.substack.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Subscribe
            </Link>
          </div>
        )}
        <div>{user ? <HUD /> : ''}</div>
      </nav>
    </header>
  )
}
