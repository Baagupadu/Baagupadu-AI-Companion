import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adaptive AI Personas & Companions — Sahayam, Coach & Guide | Baagupadu',
  description:
    'Explore Baagupadu’s adaptive AI companion personas: Sahayam (Empathy & Deep Wisdom), Coach Mode (Task Accountability), and Gen Z Sounding Board for daily clarity.',
  keywords: [
    'AI Companion Personas',
    'Sahayam AI Mentor',
    'Empathetic AI Friend',
    'AI Career Coach',
    'Adaptive AI Companions',
    'Baagupadu Mentors',
  ],
  alternates: {
    canonical: 'https://baagupadu.com/mentors',
  },
  openGraph: {
    title: 'Adaptive AI Personas & Companions — Sahayam, Coach & Guide | Baagupadu',
    description:
      'Choose your AI companion persona: Empathetic Friend, Strict Accountability Coach, or Strategic Life Mentor.',
    url: 'https://baagupadu.com/mentors',
    siteName: 'Baagupadu — Autonomous AI Companion',
    type: 'website',
  },
};

export default function MentorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
