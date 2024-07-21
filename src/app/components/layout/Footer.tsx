import Link from 'next/link'

const Footer = () => (
  <footer className="mt-24 border-t border-gray-300">
    <div className="flex flex-col items-center py-6">
      <Link
        className="text-sm text-gray-600 hover:text-gray-800 transition-colors mb-2"
        href="https://flashbangapp.substack.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Subscribe
      </Link>
      <span className="text-xs text-gray-500">© 2024 Flashbang School</span>
    </div>
  </footer>
)

export default Footer
