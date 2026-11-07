import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const disallowed = [
    '/api',
    '/api/*',
    '/chat',
    '/chat/*',
    '/onboarding',
    '/onboarding/*',
    '/settings',
    '/settings/*',
    '/login',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowed,
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
        disallow: disallowed,
      },
    ],
    sitemap: 'https://baagupadu.com/sitemap.xml',
    host: 'https://baagupadu.com',
  };
}
