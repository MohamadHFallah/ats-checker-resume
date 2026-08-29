
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { authClient, useSession } from '../lib/auth-client'
import { signOut } from 'better-auth/api'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession();

  const navItems = [
    { label: 'Resume Checker', href: '/checker' },
    { label: 'Magic Editor', href: '/editor' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
  ]

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/95">
      <div className="container flex h-16 items-center justify-between mx-auto">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400">
          <Sparkles className="h-6 w-6" />
          <span>ATS Checker Resume</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {!session ? <Button onClick={async () => {
            authClient.signIn.social({
              provider: "github",
              callbackURL: "/"
            })
          }}>Sign in</Button> :
            <>
             <p>{session.user.name}</p>
            <Button onClick={() => signOut()}>Sign out</Button>
            </>

          }
          {/* <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            Get Started
          </Button> */}
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="outline" size="sm">Sign In</Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}