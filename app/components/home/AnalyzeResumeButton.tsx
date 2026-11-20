'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

type AnalyzeResumeButtonProps = {
  signedIn: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function AnalyzeResumeButton({ signedIn, className, children }: AnalyzeResumeButtonProps) {
  return (
    <Link
      href={signedIn ? '/dashboard/new' : '/'}
      className={className}
      onClick={(event) => {
        if (!signedIn) {
          event.preventDefault();
          void authClient.signIn.social({ provider: 'github', callbackURL: '/dashboard/new' });
        }
      }}
    >
      {children ?? (
        <>
          Analyze my resume <ArrowRight size={16} />
        </>
      )}
    </Link>
  );
}
