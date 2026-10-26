import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Baagupadu — Mission, Vision & Origins',
  description:
    'Learn about Baagupadu Technologies, co-founded by Sreekar Reddy Pindi in Hyderabad, India. Discover the meaning of "బాగుపడు", our mission to elevate student potential, and our empathetic autonomous AI companion.',
  alternates: {
    canonical: 'https://baagupadu.com/about',
  },
  openGraph: {
    title: 'About Baagupadu — Mission, Vision & Origins',
    description:
      'The story, philosophy, and engineering behind India’s autonomous AI companion and empathetic AI friend for youth self-discovery and career navigation.',
    url: 'https://baagupadu.com/about',
    siteName: 'Baagupadu — Autonomous AI Companion',
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
