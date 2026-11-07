# Baagupadu — Next.js 16 Technical SEO Implementation Blueprint

**Platform:** Next.js 16.2.9 (App Router, Turbopack)  
**Document Classification:** Production Engineering Specification  
**Author:** Principal Technical SEO Architect & Next.js 16 Performance Engineer  
**Date:** November 7, 2026  

---

## 1. Architectural Principles

This technical specification details the production implementation of native Next.js 16 App Router capabilities to achieve technical SEO excellence, robust indexing, sub-second Core Web Vitals, and strict authentication protection without introducing unnecessary external libraries.

### Core Tenets:
1. **Zero External SEO Plugins:** Rely exclusively on native Next.js 16 App Router metadata APIs (`Metadata`, `MetadataRoute.Sitemap`, `MetadataRoute.Robots`, `manifest.ts`, dynamic `ImageResponse`).
2. **Server-Rendered Semantic Core:** Ensure that all primary headings ($H1$, $H2$), body text, and navigation anchors are fully server-rendered and visible in the initial HTML stream delivered to search crawlers.
3. **Clerk Boundary Isolation:** Ensure public crawlers receive clean $200\text{ OK}$ HTML responses on all marketing routes without triggering Clerk client redirects, while private routes (`/chat`, `/settings`, `/onboarding`) strictly enforce authentication.
4. **Resilient Offline Font Strategy:** Prevent Turbopack build failures caused by sandboxed font fetches by providing clean system fallbacks for Google Fonts.
5. **Canonical Domain Discipline:** Enforce strict single-domain canonicalization (`https://baagupadu.com`) across production, preview, and development environments.

---

## 2. Metadata Architecture & Canonical Resolution

### 2.1 Root Layout Specification (`frontend/src/app/layout.tsx`)
The root layout establishes global defaults, the `metadataBase` origin, robots directives, and search engine verification hooks:

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://baagupadu.com'),
  title: {
    default: 'Baagupadu (బాగుపడు) — Autonomous AI Companion & Career Guidance',
    template: '%s | Baagupadu',
  },
  description:
    'Baagupadu (బాగుపడు) is your empathetic autonomous AI companion and trusted digital confidant. Built for youth, students, and professionals to explore self-discovery, gain emotional clarity, and craft actionable life & career roadmaps with Sahayam AI.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-token', // Configured via search console
    other: {
      'msvalidate.01': 'bing-verification-token',
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/baagupadu-logo-companion.jpg',
  },
};
```

### 2.2 Subpage Canonical & Metadata Isolation
Each public route must define its own scoped metadata with an explicit canonical path relative to `metadataBase`:

```typescript
// Example: src/app/research/layout.tsx
export const metadata: Metadata = {
  title: 'Cognitive Frameworks & Dynamic RAG Architecture | Baagupadu Whitepaper',
  description:
    'A scientific exploration of Baagupadu’s multi-agent cognitive architecture: Dynamic RAG vs. Fine-Tuning, Reciprocal Rank Fusion (RRF), Bandura Self-Efficacy, and ROUGE-L evaluation.',
  alternates: {
    canonical: '/research',
  },
  openGraph: {
    title: 'Cognitive Frameworks & Dynamic RAG Architecture | Baagupadu Whitepaper',
    description: 'Scientific whitepaper on multi-agent cognitive architecture and empathetic AI companionship.',
    url: '/research',
    type: 'article',
  },
};
```

---

## 3. Dynamic Discovery Routes

### 3.1 Sitemap Implementation (`frontend/src/app/sitemap.ts`)
The sitemap dynamically lists only valid, eligible, public URLs. In contrast to static or random timestamps, dates are tied to verified release milestones:

```typescript
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://baagupadu.com';
  // Use stable ISO publication/update dates rather than dynamic new Date()
  const releaseDate = '2026-11-07T00:00:00.000Z';

  return [
    {
      url: baseUrl,
      lastModified: releaseDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: releaseDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mentors`,
      lastModified: releaseDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: releaseDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/research`,
      lastModified: releaseDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/manifesto`,
      lastModified: releaseDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: releaseDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/press`,
      lastModified: releaseDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: releaseDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: releaseDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: releaseDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
```

### 3.2 Robots Directives (`frontend/src/app/robots.ts`)
Ensures RFC-9309 compliance and covers both trailing slash and non-trailing slash patterns:

```typescript
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const disallowedRoutes = [
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
        disallow: disallowedRoutes,
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'cohere-ai',
          'Omgilibot',
        ],
        allow: [
          '/',
          '/how-it-works',
          '/mentors',
          '/about',
          '/research',
          '/manifesto',
          '/careers',
          '/press',
          '/privacy',
          '/terms',
          '/cookies',
          '/llms.txt',
          '/llms-full.txt',
          '/sitemap.xml',
        ],
        disallow: disallowedRoutes,
      },
      {
        // Model training crawlers - explicit owner control
        userAgent: ['Google-Extended', 'Applebot-Extended', 'CCBot', 'Bytespider'],
        disallow: disallowedRoutes,
      },
    ],
    sitemap: 'https://baagupadu.com/sitemap.xml',
    host: 'https://baagupadu.com',
  };
}
```

### 3.3 Web App Manifest (`frontend/src/app/manifest.ts`)
Supports mobile web indexing, Progressive Web App discovery, and rich browser integration:

```typescript
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Baagupadu (బాగుపడు) — Autonomous AI Companion',
    short_name: 'Baagupadu',
    description: 'Autonomous AI companion for empathetic self-discovery and actionable career roadmaps.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F172A',
    theme_color: '#6366F1',
    icons: [
      {
        src: '/baagupadu-logo-companion.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/baagupadu-comfort-logo.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
    categories: ['education', 'lifestyle', 'productivity'],
  };
}
```

### 3.4 Custom Not-Found Handler (`frontend/src/app/not-found.tsx`)
Eliminates soft-404 errors by returning genuine HTTP 404 status codes alongside branded, index-optimized navigation:

```typescript
import Link from 'next/link';
import { ArrowRight, Compass, Home } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center pt-32 pb-20">
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] flex items-center justify-center mb-6">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-secondary)] mb-2 font-mono">
          HTTP 404 • Destination Not Found
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight">
          Every Journey Has Uncharted Paths
        </h1>
        <p className="text-base text-[var(--color-text-muted)] max-w-md mx-auto mb-8 leading-relaxed">
          The page or resource you are looking for has been relocated or does not exist. Let Sahayam guide you back to your journey.
        </p>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-secondary)] text-white font-semibold text-sm hover:bg-[#5658d6] transition-all shadow-md"
          >
            <Home className="w-4 h-4" /> Return to Homepage
          </Link>
          <Link
            href="/how-it-works"
            className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-[var(--glass-border)] text-[var(--color-text)] font-semibold text-sm hover:border-[var(--color-secondary)] transition-all"
          >
            How It Works <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

---

## 4. WebGL, Three.js & Performance Optimization

### 4.1 Isolating WebGL Canvases from Search HTML
- **The Challenge:** Three.js and React Three Fiber execute complex WebGL rendering loops. If HTML text (headings, descriptions) is rendered inside `<canvas>` elements, search crawlers cannot index it.
- **The Solution:** 
  - All critical $H1$, $H2$, paragraphs, and CTA buttons are positioned strictly in native DOM elements outside WebGL canvases.
  - Canvases (`AuraOverlay`, 3D avatars) are contained inside dedicated presentation wrappers with `aria-hidden="true"` so screen readers and search bots focus entirely on semantic content.
  - The heavy 3D canvas is dynamically loaded on the client side using React suspense or dynamic imports to keep the initial Server-Side Render (SSR) lightweight and sub-second.

### 4.2 Core Web Vitals Targets & Strategies

| Metric | Target | Optimization Strategy |
| :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | $< 2.0\text{s}$ | Hero typography and gradient headlines rendered via native HTML/CSS; large background glows use CSS blur rather than heavy bitmap textures. |
| **INP (Interaction to Next Paint)** | $< 150\text{ms}$ | Framer Motion animations use GPU-accelerated `transform` and `opacity` properties; avoid heavy state updates during scroll. |
| **CLS (Cumulative Layout Shift)** | $< 0.05$ | Explicit aspect ratios and skeleton containers allocated for avatar selector and dynamic personality wheel. |
| **TTFB (Time to First Byte)** | $< 300\text{ms}$ | Vercel Edge caching for static marketing pages; zero synchronous blocking database queries during public page rendering. |

---

## 5. Security Headers & Vercel Preview Protection

In `frontend/next.config.ts`, security headers are maintained and preview deployments are protected from accidental indexing:

```typescript
// Add X-Robots-Tag header for Vercel preview environments
async headers() {
  const isProduction = process.env.VERCEL_ENV === 'production';
  return [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=()" },
        // Disallow indexing of Vercel preview branch deployments
        ...(isProduction ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
      ],
    },
  ];
}
```

