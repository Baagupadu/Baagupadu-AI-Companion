import { describe, it, expect } from 'vitest';
import sitemap from '../app/sitemap';
import robots from '../app/robots';
import manifest from '../app/manifest';
import nextConfig from '../../next.config';

// Import route metadata to test canonicals, titles, and robots directives
import { metadata as aboutMetadata } from '../app/about/layout';
import { metadata as companionMetadata } from '../app/companion/layout';
import { metadata as howItWorksMetadata } from '../app/how-it-works/layout';
import { metadata as mentorsMetadata } from '../app/mentors/layout';
import { metadata as manifestoMetadata } from '../app/manifesto/layout';
import { metadata as careersMetadata } from '../app/careers/layout';
import { metadata as pressMetadata } from '../app/press/layout';
import { metadata as privacyMetadata } from '../app/privacy/layout';
import { metadata as termsMetadata } from '../app/terms/layout';
import { metadata as cookiesMetadata } from '../app/cookies/layout';
import { metadata as loginMetadata } from '../app/login/layout';
import { metadata as chatMetadata } from '../app/chat/layout';
import { metadata as settingsMetadata } from '../app/settings/layout';
import { metadata as onboardingMetadata } from '../app/onboarding/layout';

describe('Technical SEO & Discoverability Validation Suite', () => {
  it('should generate a valid sitemap with all 12 public URLs, zero private routes, and omitted lastmod', () => {
    const urls = sitemap();
    expect(urls).toBeInstanceOf(Array);
    expect(urls.length).toBe(12);

    const urlList = urls.map((u) => u.url);
    expect(urlList).toContain('https://baagupadu.com');
    expect(urlList).toContain('https://baagupadu.com/companion');
    expect(urlList).toContain('https://baagupadu.com/how-it-works');
    expect(urlList).toContain('https://baagupadu.com/mentors');
    expect(urlList).toContain('https://baagupadu.com/about');
    expect(urlList).toContain('https://baagupadu.com/research');
    expect(urlList).toContain('https://baagupadu.com/manifesto');
    expect(urlList).toContain('https://baagupadu.com/careers');
    expect(urlList).toContain('https://baagupadu.com/press');
    expect(urlList).toContain('https://baagupadu.com/privacy');
    expect(urlList).toContain('https://baagupadu.com/terms');
    expect(urlList).toContain('https://baagupadu.com/cookies');

    // Ensure NO private or auth routes exist in sitemap
    for (const url of urlList) {
      expect(url).not.toContain('/login');
      expect(url).not.toContain('/chat');
      expect(url).not.toContain('/settings');
      expect(url).not.toContain('/onboarding');
      expect(url).not.toContain('/api');
    }

    // Verify lastModified is omitted rather than fabricated
    for (const entry of urls) {
      expect(entry.lastModified).toBeUndefined();
    }
  });

  it('should generate valid robots.txt rules protecting private routes and allowing crawlers', () => {
    const robotsData = robots();
    expect(robotsData.sitemap).toBe('https://baagupadu.com/sitemap.xml');
    expect(robotsData.host).toBe('https://baagupadu.com');

    const rules = Array.isArray(robotsData.rules) ? robotsData.rules : [robotsData.rules];
    const wildcardRule = rules.find((r) => r.userAgent === '*');
    expect(wildcardRule).toBeDefined();

    const disallow = Array.isArray(wildcardRule?.disallow)
      ? wildcardRule?.disallow
      : [wildcardRule?.disallow];

    expect(disallow).toContain('/login');
    expect(disallow).toContain('/chat');
    expect(disallow).toContain('/chat/*');
    expect(disallow).toContain('/settings');
    expect(disallow).toContain('/settings/*');
    expect(disallow).toContain('/onboarding');
    expect(disallow).toContain('/onboarding/*');
    expect(disallow).toContain('/api');
    expect(disallow).toContain('/api/*');

    // Verify AI and Search Bot Crawler Permissions
    const aiBotsRule = rules.find(
      (r) => Array.isArray(r.userAgent) && r.userAgent.includes('GPTBot')
    );
    expect(aiBotsRule).toBeDefined();
    expect(aiBotsRule?.userAgent).toContain('Google-Extended');
    expect(aiBotsRule?.userAgent).toContain('Applebot-Extended');
    expect(aiBotsRule?.userAgent).toContain('PerplexityBot');
    expect(aiBotsRule?.userAgent).toContain('ClaudeBot');
    expect(aiBotsRule?.allow).toContain('/companion');
  });

  it('should generate a valid web app manifest with branding and theme colors', () => {
    const manifestData = manifest();
    expect(manifestData.name).toBe('Baagupadu (బాగుపడు) — Autonomous AI Companion');
    expect(manifestData.short_name).toBe('Baagupadu');
    expect(manifestData.theme_color).toBe('#6366F1');
    expect(manifestData.start_url).toBe('/');
    expect(manifestData.icons?.length).toBeGreaterThan(0);
  });

  it('should configure permanent 308 redirect from www.baagupadu.com to canonical domain', async () => {
    expect(nextConfig.redirects).toBeDefined();
    if (nextConfig.redirects) {
      const redirects = await nextConfig.redirects();
      const wwwRedirect = redirects.find(
        (r) =>
          r.has &&
          r.has.some((h: { type: string; value?: string }) => h.type === 'host' && h.value === 'www.baagupadu.com')
      );
      expect(wwwRedirect).toBeDefined();
      expect(wwwRedirect?.destination).toBe('https://baagupadu.com/:path*');
      expect(wwwRedirect?.permanent).toBe(true);
    }
  });

  it('should configure security and indexing headers with preview protection', async () => {
    expect(nextConfig.headers).toBeDefined();
    if (nextConfig.headers) {
      // Test production environment: X-Robots-Tag must NEVER be injected
      const origEnv = process.env.VERCEL_ENV;
      try {
        process.env.VERCEL_ENV = 'production';
        const prodHeadersConfig = await nextConfig.headers();
        const prodRootHeaders = prodHeadersConfig.find((h) => h.source === '/(.*)');
        expect(prodRootHeaders).toBeDefined();
        const prodHeaderKeys = prodRootHeaders?.headers.map((h: { key: string; value: string }) => h.key);
        expect(prodHeaderKeys).toContain('X-Frame-Options');
        expect(prodHeaderKeys).toContain('X-Content-Type-Options');
        expect(prodHeaderKeys).toContain('Strict-Transport-Security');
        expect(prodHeaderKeys).not.toContain('X-Robots-Tag');

        // Test preview environment: X-Robots-Tag MUST be injected to prevent duplicate indexing
        process.env.VERCEL_ENV = 'preview';
        const previewHeadersConfig = await nextConfig.headers();
        const previewRootHeaders = previewHeadersConfig.find((h) => h.source === '/(.*)');
        expect(previewRootHeaders).toBeDefined();
        const previewRobotsHeader = previewRootHeaders?.headers.find((h: { key: string; value: string }) => h.key === 'X-Robots-Tag');
        expect(previewRobotsHeader).toBeDefined();
        expect(previewRobotsHeader?.value).toBe('noindex, nofollow');
      } finally {
        process.env.VERCEL_ENV = origEnv;
      }
    }
  });

  it('should enforce self-referencing canonical URLs and titles across all public layouts', () => {
    const publicLayouts = [
      { name: 'about', meta: aboutMetadata, expectedCanonical: 'https://baagupadu.com/about' },
      { name: 'companion', meta: companionMetadata, expectedCanonical: 'https://baagupadu.com/companion' },
      { name: 'how-it-works', meta: howItWorksMetadata, expectedCanonical: 'https://baagupadu.com/how-it-works' },
      { name: 'mentors', meta: mentorsMetadata, expectedCanonical: 'https://baagupadu.com/mentors' },
      { name: 'manifesto', meta: manifestoMetadata, expectedCanonical: 'https://baagupadu.com/manifesto' },
      { name: 'careers', meta: careersMetadata, expectedCanonical: 'https://baagupadu.com/careers' },
      { name: 'press', meta: pressMetadata, expectedCanonical: 'https://baagupadu.com/press' },
      { name: 'privacy', meta: privacyMetadata, expectedCanonical: 'https://baagupadu.com/privacy' },
      { name: 'terms', meta: termsMetadata, expectedCanonical: 'https://baagupadu.com/terms' },
      { name: 'cookies', meta: cookiesMetadata, expectedCanonical: 'https://baagupadu.com/cookies' },
    ];

    for (const item of publicLayouts) {
      expect(item.meta.title, `Missing title on ${item.name}`).toBeDefined();
      expect(item.meta.description, `Missing description on ${item.name}`).toBeDefined();
      expect(item.meta.alternates?.canonical, `Invalid canonical on ${item.name}`).toBe(
        item.expectedCanonical
      );
      expect(item.meta.openGraph?.url, `Invalid OG url on ${item.name}`).toBe(
        item.expectedCanonical
      );
    }
  });

  it('should enforce robots: { index: false, follow: false } across private/auth routes', () => {
    const privateLayouts = [
      { name: 'login', meta: loginMetadata },
      { name: 'chat', meta: chatMetadata },
      { name: 'settings', meta: settingsMetadata },
      { name: 'onboarding', meta: onboardingMetadata },
    ];

    for (const item of privateLayouts) {
      expect(item.meta.robots).toEqual({ index: false, follow: false });
    }
  });
});
