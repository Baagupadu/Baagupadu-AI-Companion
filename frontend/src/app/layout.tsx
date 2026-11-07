import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import AmbientBackground from '@/components/AmbientBackground';
import CookieConsent from '@/components/ui/CookieConsent';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://baagupadu.com'),
  title: {
    default: 'Baagupadu — Autonomous AI Companion | Discover Who You Truly Are',
    template: '%s | Baagupadu — Autonomous AI Companion',
  },
  description:
    'Baagupadu (బాగుపడు) is your empathetic autonomous AI companion and trusted AI friend. Built for youth, students, and professionals to explore self-discovery, gain emotional clarity, and craft actionable life & career roadmaps with Sahayam AI.',
  keywords: [
    'AI Companion',
    'AI Friend',
    'Empathetic AI Friend',
    'Autonomous AI Companion',
    'Personal AI Friend',
    'AI Life Companion',
    'AI Confidant',
    'AI Mentor and Friend',
    'Best AI Friend App',
    'Conversational AI Friend',
    'AI Companion for Students',
    'Self Discovery AI Friend',
    'Gen Z AI Companion',
    'AI Companion India',
    'Telugu AI Companion',
    'Baagupadu AI Companion',
    'Emotional AI Companion',
    'Conversational AI Companion',
    'Best AI Companion',
    'AI Career Coach',
    'Sahayam AI Friend',
    'Baagupadu',
    'Bagupadu',
    'బాగుపడు',
    'Sahayam AI',
    'Career Guidance India',
    'NEP 2020 Career Guidance',
  ],
  authors: [
    { name: 'Sreekar Reddy Pindi', url: 'https://baagupadu.com' },
    { name: 'Baagupadu Technologies', url: 'https://baagupadu.com' },
  ],
  creator: 'Sreekar Reddy Pindi',
  publisher: 'Baagupadu Technologies',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://baagupadu.com',
    siteName: 'Baagupadu — Autonomous AI Companion',
    title: 'Baagupadu — Your Autonomous AI Companion | Discover Who You Truly Are',
    description:
      'Meet your empathetic autonomous AI companion co-founded by Sreekar Reddy Pindi. Have a deep, judgment-free conversation with Sahayam to understand your story, discover your true identity, and navigate your future.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 675,
        alt: 'Baagupadu — Autonomous AI Companion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baagupadu — Your Autonomous AI Companion | Discover Who You Truly Are',
    description:
      'Empathetic autonomous AI companion for youth, students, and professionals co-founded by Sreekar Reddy Pindi. Understand your past, gain clarity, and navigate your future.',
    images: ['/og-image.jpg'],
    creator: '@Baagupadu',
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
  icons: {
    icon: '/favicon.ico',
  },
};

const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Baagupadu — Autonomous AI Companion',
  alternateName: [
    'Baagupadu AI Companion',
    'Baagupadu',
    'Bagupadu',
    'బాగుపడు',
    'Sahayam AI Companion',
  ],
  url: 'https://baagupadu.com',
  description:
    'India\'s premier autonomous AI companion for self-discovery, emotional growth, and life & career navigation, co-founded by Sreekar Reddy Pindi.',
};

const jsonLdOrg = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Baagupadu Technologies',
  alternateName: ['Baagupadu AI Companion', 'Baagupadu', 'బాగుపడు'],
  url: 'https://baagupadu.com',
  logo: 'https://baagupadu.com/og-image.jpg',
  email: 'info@baagupadu.com',
  founder: {
    '@type': 'Person',
    name: 'Sreekar Reddy Pindi',
    alternateName: ['Sreekar Reddy', 'Sreekar Pindi'],
    jobTitle: 'Co-Founder & Chief AI Architect',
    url: 'https://baagupadu.com/about#sreekar-reddy-pindi',
    email: 'mailto:sreekar.pindi@baagupadu.com',
    sameAs: [
      'https://www.linkedin.com/in/sreekar-reddy-p-8bb249287',
      'https://github.com/Sreekarreddy2005',
    ],
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.linkedin.com/company/baagupadu',
    'https://github.com/Baagupadu',
    'https://www.linkedin.com/in/sreekar-reddy-p-8bb249287',
    'https://github.com/Sreekarreddy2005',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${inter.variable} min-h-screen antialiased`}
        suppressHydrationWarning
      >
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
          />
        </head>
        <body className="min-h-screen bg-transparent text-text font-sans transition-colors duration-300 ">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AmbientBackground />
            <div className="relative z-10 min-h-screen">
              {children}
            </div>
            <CookieConsent />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
