import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Baagupadu & Co-Founder Sreekar Reddy Pindi | Autonomous AI Companion',
  description:
    'Learn about Baagupadu Technologies, co-founded and architected by Sreekar Reddy Pindi in Hyderabad, India. Discover our mission to elevate student potential through empathetic autonomous AI companions and Dynamic RAG.',
  keywords: [
    'Sreekar Reddy Pindi',
    'Sreekar Reddy',
    'Sreekar Pindi',
    'Co-Founder Baagupadu',
    'Chief AI Architect Baagupadu',
    'Sreekar Reddy Pindi Hyderabad',
    'Sreekar Reddy LinkedIn',
    'Baagupadu Technologies',
    'Autonomous AI Companion',
    'Dynamic RAG Architect',
    'AI Companion India',
    'Sahayam AI',
  ],
  authors: [
    { name: 'Sreekar Reddy Pindi', url: 'https://www.linkedin.com/in/sreekar-reddy-p-8bb249287' },
    { name: 'Baagupadu Technologies', url: 'https://baagupadu.com' },
  ],
  creator: 'Sreekar Reddy Pindi',
  alternates: {
    canonical: 'https://baagupadu.com/about',
  },
  openGraph: {
    title: 'About Baagupadu & Co-Founder Sreekar Reddy Pindi | Autonomous AI Companion',
    description:
      'The story, leadership, and engineering behind India’s autonomous AI companion and empathetic AI friend co-founded by Sreekar Reddy Pindi in Hyderabad.',
    url: 'https://baagupadu.com/about',
    siteName: 'Baagupadu — Autonomous AI Companion',
    type: 'profile',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
