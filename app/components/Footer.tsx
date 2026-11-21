import { GithubIcon, LinkedinIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

const telegramId = process.env.NEXT_PUBLIC_TELEGRAM_ID?.replace(/^@/, '').trim();

const footerLinks = {
  product: [{ label: 'Plans', href: '/Plans' }],
  company: [{ label: 'Contact', href: `https://t.me/${encodeURIComponent(telegramId!)}` }],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container py-12 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400 mb-4"
            >
              <Sparkles className="h-6 w-6" />
              <span>ATS Checker Resume</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              AI-powered ATS resume checker and optimization platform for job seekers.
            </p>
            <div className="flex gap-4 mt-4">
              {/* <a href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="h-5 w-5" />
              </a> */}
              <a
                href="https://www.linkedin.com/in/mohamad-hassan-fallah"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <HugeiconsIcon icon={LinkedinIcon} />
              </a>
              <a
                href="https://github.com/MohamadHFallah"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <HugeiconsIcon icon={GithubIcon} />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Mail className="h-5 w-5" />
              </a> */}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400 text-center">
          <p>
            © 2026 ats.ai-automate.ir All rights reserved. Made with
            <b className="animate-pulse py-1 text-xl">❤️</b> for job seekers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
