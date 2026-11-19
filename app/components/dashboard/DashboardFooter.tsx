import Link from 'next/link';

export function DashboardFooter() {
  return (
    <footer className="mt-auto border-t border-border px-4 py-5 text-center text-sm text-muted-foreground sm:px-6">
      <p>
        © 2026 ATSFriendly. Resume compatibility results are estimates, not official ATS scores.{' '}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
          Privacy
        </Link>
      </p>
    </footer>
  );
}
