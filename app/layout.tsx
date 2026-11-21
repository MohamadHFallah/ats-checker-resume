import type { Metadata } from 'next';
import { Geist, Geist_Mono, Figtree } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://ats.ai-automate.ir'),
  title: {
    default: 'ATS Resume Checker | AI Resume Analysis & Job Matching',
    template: '%s | ATS Resume Checker',
  },
  description:
    'Review your resume with AI, compare it with job descriptions, and get evidence-based feedback on skills, keywords, and experience. Compatibility scores are estimates, not official ATS results.',
  applicationName: 'ATS Resume Checker',
  keywords: [
    'ATS resume checker',
    'AI resume analysis',
    'resume job description match',
    'resume keyword analysis',
    'resume feedback',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'ATS Resume Checker',
    title: 'ATS Resume Checker | AI Resume Analysis & Job Matching',
    description:
      'Get actionable, evidence-based resume feedback and compare your experience with job requirements.',
    url: '/',
  },
  twitter: {
    card: 'summary',
    title: 'ATS Resume Checker | AI Resume Analysis & Job Matching',
    description:
      'Get actionable, evidence-based resume feedback and compare your experience with job requirements.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={cn(
        'dark',
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        figtree.variable
      )}
    >
      <head>
        {!!process.env.WEBSITE_ID && (
          <script
            defer
            src="http://ats.ai-automate.ir/script.js"
            data-website-id={process.env.WEBSITE_ID}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
