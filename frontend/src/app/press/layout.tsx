import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press & Media Kit — Brand Assets & News | Baagupadu',
  description:
    'Access the official Baagupadu Press & Media Kit. Download official brand assets, review company boilerplates, founder bios, and media contact info in Hyderabad, India.',
  alternates: {
    canonical: 'https://baagupadu.com/press',
  },
  openGraph: {
    title: 'Press & Media Kit — Brand Assets & News | Baagupadu',
    description:
      'Official media resources, brand assets, founder biography, and boilerplates for journalists, creators, and institutional partners.',
    url: 'https://baagupadu.com/press',
    siteName: 'Baagupadu — Autonomous AI Companion',
    type: 'website',
  },
};

export default function PressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
