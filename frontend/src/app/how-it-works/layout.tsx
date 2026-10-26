import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works — 5-Phase Self-Discovery & AI Architecture | Baagupadu',
  description:
    'Discover how Baagupadu’s Sahayam AI companion guides youth and students through deep conversational inquiry, psychological persona synthesis, and Dynamic RAG to build actionable career roadmaps.',
  keywords: [
    'How Baagupadu Works',
    'AI Companion Architecture',
    'Dynamic RAG vs Fine-Tuning',
    'Sahayam AI Engine',
    '5 Phase Self Discovery',
    'Nenu Evaru Framework',
    'Telugu AI Companion',
    'Sreekar Reddy Pindi',
  ],
  alternates: {
    canonical: 'https://baagupadu.com/how-it-works',
  },
  openGraph: {
    title: 'How It Works — 5-Phase Self-Discovery & AI Architecture | Baagupadu',
    description:
      'Explore the science and conversational psychology behind Baagupadu: Dynamic RAG, non-linear life exploration, and personalized career roadmaps.',
    url: 'https://baagupadu.com/how-it-works',
    siteName: 'Baagupadu — Autonomous AI Companion',
    type: 'website',
  },
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
