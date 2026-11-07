import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | Baagupadu',
  description: 'Sign in to access your autonomous AI companion and saved roadmaps.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://baagupadu.com/login',
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

