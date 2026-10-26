import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers & Life at Baagupadu — Our Culture & Philosophy',
  description:
    'Discover what it means to build at Baagupadu Technologies in Hyderabad. Learn about our culture of high agency, extreme empathy, intellectual rigor, and our mission to elevate student potential.',
  alternates: {
    canonical: 'https://baagupadu.com/careers',
  },
  openGraph: {
    title: 'Careers & Life at Baagupadu — Our Culture & Philosophy',
    description:
      'Explore life at Baagupadu Technologies: high agency, student obsession, cutting-edge AI systems engineering, and how we work in Hyderabad.',
    url: 'https://baagupadu.com/careers',
    siteName: 'Baagupadu — Autonomous AI Companion',
    type: 'website',
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
