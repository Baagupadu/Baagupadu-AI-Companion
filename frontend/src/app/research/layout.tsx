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

const techArticleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  '@id': 'https://baagupadu.com/research#article',
  headline: 'Cognitive Frameworks & Dynamic RAG Multi-Agent Architecture',
  description:
    'Scientific engineering specification detailing Baagupadu’s multi-agent cognitive architecture, Dynamic RAG vs fine-tuning, Reciprocal Rank Fusion, and automated NLP evaluation.',
  inLanguage: 'en-US',
  author: {
    '@type': 'Person',
    name: 'Sreekar Reddy Pindi',
    url: 'https://baagupadu.com/about#sreekar-reddy-pindi',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Baagupadu Technologies',
    url: 'https://baagupadu.com',
  },
  datePublished: '2026-10-15T00:00:00.000Z',
  dateModified: '2026-11-07T00:00:00.000Z',
  mainEntityOfPage: 'https://baagupadu.com/research',
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />
      {children}
    </>
  );
}
