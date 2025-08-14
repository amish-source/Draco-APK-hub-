import Link from 'next/link'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="border-b bg-white">
        <div className="container flex items-center justify-between h-16">
          <Link className="font-bold text-lg" href="/">
            {process.env.NEXT_PUBLIC_SITE_NAME || 'AppHub'}
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/apps">Apps</Link>
            <Link href="/about">About</Link>
            <a href="https://play.google.com/store/apps" target="_blank" rel="noreferrer">Google Play</a>
          </nav>
        </div>
      </header>
      <main className="container py-6">{children}</main>
      <footer className="border-t mt-8">
        <div className="container py-6 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} {process.env.NEXT_PUBLIC_SITE_NAME || 'AppHub'} — Legal app listings with official download links only.</p>
          <p className="mt-2">We do not host or distribute APK/mod/cracked files. DMCA & takedown: contact the site owner.</p>
        </div>
      </footer>
    </div>
  )
}
