import Link from 'next/link';
import { Moon, Sparkles, Sun, WalletCards, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useThemeSwitcher } from '@/hooks/use-theme';

export const AuthHeader = () => {
  const router = useRouter();
  const { toggleTheme, isDarkMode } = useThemeSwitcher();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-2 border-b border-border bg-background px-3 sm:gap-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger aria-label="Toggle saved resumes sidebar" />
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 text-base font-semibold text-primary sm:text-lg"
        >
          <Sparkles aria-hidden="true" className="size-5 shrink-0" />
          <span className="truncate">ATS Checker Resume</span>
        </Link>
      </div>
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <Link
          href="/plans"
          aria-label="Plans"
          className="inline-flex size-11 items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:size-auto sm:min-h-11 sm:gap-2 sm:px-3"
        >
          <WalletCards aria-hidden="true" className="size-4" />
          <span className="hidden sm:inline">Plans</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="size-11"
          onClick={toggleTheme}
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          {isDarkMode ? (
            <Sun aria-hidden="true" className="size-4" />
          ) : (
            <Moon aria-hidden="true" className="size-4" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-11 sm:hidden"
          aria-label="Sign out"
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: { onSuccess: () => router.push('/') },
            });
          }}
        >
          <LogOut aria-hidden="true" />
        </Button>
        <Button
          className="hidden min-h-11 sm:inline-flex"
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: { onSuccess: () => router.push('/') },
            });
          }}
        >
          Sign out
        </Button>
      </div>
    </header>
  );
};
