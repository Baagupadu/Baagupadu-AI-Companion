import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy & Tracking Transparency',
  description:
    'Discover why Baagupadu uses zero third-party advertising cookies, and how strictly necessary session cookies and theme preferences function.',
  alternates: {
    canonical: 'https://baagupadu.com/cookies',
  },
  openGraph: {
    title: 'Cookie Policy & Tracking Transparency | Baagupadu AI Companion',
    description:
      'Detailed inventory of cookies and local storage items used on Baagupadu. Zero ad-trackers, zero commercial pixels, DPDP Act 2023 aligned.',
    url: 'https://baagupadu.com/cookies',
    siteName: 'Baagupadu — Autonomous AI Companion',
    type: 'article',
  },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
