'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authClient, useSession } from '../../lib/auth-client';
import { useThemeSwitcher } from '@/hooks/use-theme';
import { HugeiconsIcon } from '@hugeicons/react';
import { GithubIcon } from '@hugeicons/core-free-icons';

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
      <div className="container mx-auto flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="min-w-0 truncate text-base font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-lg"
          onClick={() => setIsMenuOpen(false)}
        >
          ATS Checker Resume
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="https://github.com/MohamadHFallah/ats-checker-resume"
            target='_blank'
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <HugeiconsIcon icon={GithubIcon} />
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} theme`}
            className="inline-flex size-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                className="max-w-48 truncate text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
        </div>

        <button
          type="button"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-md text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-background px-4 py-3 md:hidden sm:px-6"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => {
                toggleTheme();
                setIsMenuOpen(false);
              }}
              className="flex min-h-11 items-center gap-3 rounded-md px-3 text-left text-sm font-medium text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
              Switch to {isDarkMode ? 'light' : 'dark'} theme
            </button>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://github.com/MohamadHFallah/ats-checker-resume"
              target='_blank'
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <HugeiconsIcon icon={GithubIcon} size={10}/>
            </a>
            {!session ? (
              <Button
                className="mt-2 min-h-11 w-full"
                onClick={() => {
                  setIsMenuOpen(false);
                  authClient.signIn.social({ provider: 'github', callbackURL: '/' });
                }}
              >
                Sign in
              </Button>
            ) : (
              <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
                <Link
                  href="/dashboard"
                  className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {session.user.name || session.user.email}
                </Link>
                <Button
                  className="min-h-11 w-full"
                  variant="outline"
                  onClick={async () => {
                    setIsMenuOpen(false);
                    await authClient.signOut({
                      fetchOptions: { keepalive: false, onSuccess: () => router.push('/') },
                    });
                  }}
                >
                  Sign out
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
