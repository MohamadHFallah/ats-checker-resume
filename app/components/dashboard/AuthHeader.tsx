
import Link from 'next/link';
import { Moon, Sparkles, Sun, WalletCards } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useThemeSwitcher } from '@/hooks/use-theme';

export const AuthHeader = () => {
    const router = useRouter();
    const { toggleTheme,isDarkMode } = useThemeSwitcher();

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
                <SidebarTrigger aria-label="Toggle saved resumes sidebar" />
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary">
                    <Sparkles aria-hidden="true" className="size-5" />
                    <span className="truncate">ATS Checker Resume</span>
                </Link>
            </div>
            <div className="flex items-center gap-2">
                <Link
                    href="/plans"
                    className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <WalletCards aria-hidden="true" className="size-4" />
                    <span>Plans</span>
                </Link>
                <Button
                    variant="ghost"
                    size="icon"
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
    )
}