import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/chat/', '/onboarding/', '/settings/', '/login'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Google-Extended',
          'Applebot-Extended',
          'cohere-ai',
          'Omgilibot',
        ],
        allow: [
          '/',
          '/how-it-works',
          '/mentors',
          '/privacy',
          '/terms',
          '/cookies',
          '/about',
          '/manifesto',
          '/research',
          '/careers',
          '/press',
          '/llms.txt',
          '/llms-full.txt',
          '/sitemap.xml',
        ],
        disallow: ['/api/', '/chat/', '/onboarding/', '/settings/', '/login'],
      },
    ],
    sitemap: 'https://baagupadu.com/sitemap.xml',
    host: 'https://baagupadu.com',
  };
}
