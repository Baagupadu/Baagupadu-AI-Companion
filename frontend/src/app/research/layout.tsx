import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cognitive Frameworks & AI Architecture Research | Baagupadu',
  description:
    'Explore the scientific research and multi-agent cognitive architecture behind Baagupadu: Dynamic RAG vs. Fine-Tuning, Reciprocal Rank Fusion (RRF), Bandura Self-Efficacy, and 5-Phase Persona Synthesis.',
  alternates: {
    canonical: 'https://baagupadu.com/research',
  },
  openGraph: {
    title: 'Cognitive Frameworks & AI Architecture Research | Baagupadu',
    description:
      'Engineering whitepaper and psychological research underpinning Baagupadu’s autonomous AI companion and LangGraph multi-agent cognitive engine.',
    url: 'https://baagupadu.com/research',
    siteName: 'Baagupadu — Autonomous AI Companion',
    type: 'article',
  },
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
