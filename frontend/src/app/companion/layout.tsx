import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Purposeful AI Companion: Architecture, Philosophy & Market Landscape | Baagupadu',
  description:
    'A comprehensive deep dive into Baagupadu — the autonomous AI companion engineered in Hyderabad. Discover our non-directive listening philosophy, multi-agent cognitive architecture (LangGraph + Dynamic RAG), enterprise IT standards (DPDP Act, ISO 42001), and market comparative analysis.',
  keywords: [
    'Autonomous AI Companion',
    'Purposeful AI Companion',
    'AI Companion vs Chatbot',
    'Non-directive Empathetic AI',
    'Baagupadu Architecture Whitepaper',
    'LangGraph Multi-Agent System',
    'Dynamic RAG vs Fine-Tuning',
    'DPDP Act 2023 Compliance',
    'ISO IEC 42001 AI',
    'Indian Cultural AI Companion',
    'Sahayam AI Engine',
    'Sreekar Reddy Pindi',
    'NEP 2020 Career Guidance',
  ],
  alternates: {
    canonical: 'https://baagupadu.com/companion',
  },
  openGraph: {
    title: 'The Purposeful AI Companion: Architecture, Philosophy & Market Landscape | Baagupadu',
    description:
      'An in-depth whitepaper on Baagupadu: active listening without preachy advice, longitudinal modeling of culture and lifestyle, multi-agent cognitive systems, and enterprise data sovereignty.',
    url: 'https://baagupadu.com/companion',
    siteName: 'Baagupadu — Autonomous AI Companion',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Purposeful AI Companion: Architecture, Philosophy & Market Landscape',
    description:
      'How Baagupadu models your culture, roots, habits, and career as a lifelong friend who listens first.',
  },
};

export default function CompanionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
