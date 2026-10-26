import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Founding Manifesto — Baagupadu Technologies',
  description:
    'Read the Founding Manifesto of Baagupadu Technologies. Our declaration against superficial chatbots and our commitment to purposeful human flourishing, self-discovery, and student sovereignty.',
  alternates: {
    canonical: 'https://baagupadu.com/manifesto',
  },
  openGraph: {
    title: 'The Founding Manifesto — Baagupadu Technologies',
    description:
      'Why we built Baagupadu: A declaration for authentic self-betterment, non-linear life exploration, and dignified career guidance for every Indian youth.',
    url: 'https://baagupadu.com/manifesto',
    siteName: 'Baagupadu — Autonomous AI Companion',
    type: 'article',
  },
};

export default function ManifestoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
