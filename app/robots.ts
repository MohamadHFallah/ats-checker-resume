import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://ats.ai-automate.ir';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard', '/new'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
