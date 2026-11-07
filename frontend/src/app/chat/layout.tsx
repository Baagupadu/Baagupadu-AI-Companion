import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Companion Session | Baagupadu',
  description: 'Confidential conversational self-discovery session with Sahayam.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

