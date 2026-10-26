import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Protection',
  description:
    'Baagupadu’s DPDP Act 2023 and IT Act 2000 compliant privacy framework. Automated PII scrubbing, Section 9 minor protections, zero advertising trackers, and statutory right to erasure.',
  alternates: {
    canonical: 'https://baagupadu.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy & Data Protection | Baagupadu AI Companion',
    description:
      'Learn how Baagupadu protects student and user privacy in adherence with India’s DPDP Act 2023, CERT-In logging directives, and automated PII scrubbing.',
    url: 'https://baagupadu.com/privacy',
    siteName: 'Baagupadu — Autonomous AI Companion',
    type: 'article',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
