import { Sparkles, X, Mail } from 'lucide-react'
import Link from 'next/link'

const footerLinks = {
  product: [
    { label: 'Resume Checker', href: '/checker' },
    { label: 'Magic Editor', href: '/editor' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Changelog', href: '/changelog' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Help Center', href: '/help' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ]
}

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container py-12 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              <Sparkles className="h-6 w-6" />
              <span>ATSFriendly</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              AI-powered ATS resume checker and optimization platform for job seekers.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="h-5 w-5" />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Github className="h-5 w-5" />
              </a> */}
              <a href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
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
                  <Link href={link.href} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400 text-center">
          <p>© 2026 ATSFriendly.com. All rights reserved. Made with 
            <b className='animate-pulse py-1 text-xl'>❤️</b> by <b>Mohammad Fallah</b> for job seekers everywhere.</p>
        </div>
      </div>
    </footer>
  )
}