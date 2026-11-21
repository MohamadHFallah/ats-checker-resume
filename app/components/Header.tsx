'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Sparkles, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authClient, useSession } from '../../lib/auth-client';
import { useThemeSwitcher } from '@/hooks/use-theme';

const navItems = [
  { label: 'Plans', href: '/plans' },
  { label: 'Blog', href: '/blog' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const { toggleTheme, isDarkMode } = useThemeSwitcher();


  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400"
        >
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
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} theme`}
            className="inline-flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {isDarkMode ? (
              <Sun aria-hidden="true" size={18} />
            ) : (
              <Moon aria-hidden="true" size={18} />
            )}
          </button>
          {!session ? (
            <Button
              onClick={async () => {
                authClient.signIn.social({
                  provider: 'github',
                  callbackURL: '/',
                });
              }}
            >
              Sign in
            </Button>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                {session.user.name || session.user.email}
              </Link>
              <Button
                onClick={async () => {
                  await authClient.signOut({
                    fetchOptions: { keepalive: false, onSuccess: () => router.push('/') },
                  });
                }}
              >
                Sign out
              </Button>
            </>
          )}
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
        <div className="md:hidden border-t border-border bg-background p-4">
          <nav className="flex flex-col gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex min-h-11 items-center gap-2 text-left text-sm font-medium text-foreground"
            >
              {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
              Switch to {isDarkMode ? 'light' : 'dark'} theme
            </button>
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
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
