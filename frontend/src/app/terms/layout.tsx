import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service & User Agreement',
  description:
    'Read the Terms of Service for Baagupadu AI Companion. Clear guidelines on acceptable use, personal content ownership, educational pilots, and Hyderabad jurisdiction.',
  alternates: {
    canonical: 'https://baagupadu.com/terms',
  },
  openGraph: {
    title: 'Terms of Service & User Agreement | Baagupadu AI Companion',
    description:
      'Legal terms governing the use of the Baagupadu autonomous AI companion platform, intellectual property rights, and community standards.',
    url: 'https://baagupadu.com/terms',
    siteName: 'Baagupadu — Autonomous AI Companion',
    type: 'article',
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
