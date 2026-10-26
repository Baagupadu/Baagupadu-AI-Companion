import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import AmbientBackground from '@/components/AmbientBackground';
import CookieConsent from '@/components/ui/CookieConsent';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://baagupadu.com'),
  title: {
    default: 'Baagupadu — Autonomous AI Companion | Discover Who You Truly Are',
    template: '%s | Baagupadu — Autonomous AI Companion',
  },
  description:
    'Baagupadu (బాగుపడు) is your empathetic autonomous AI companion and trusted AI friend. Built for youth, students, and professionals to explore self-discovery, gain emotional clarity, and craft actionable life & career roadmaps with Sahayam AI.',
  keywords: [
    'AI Companion',
    'AI Friend',
    'Empathetic AI Friend',
    'Autonomous AI Companion',
    'Personal AI Friend',
    'AI Life Companion',
    'AI Confidant',
    'AI Mentor and Friend',
    'Best AI Friend App',
    'Conversational AI Friend',
    'AI Companion for Students',
    'Self Discovery AI Friend',
    'Gen Z AI Companion',
    'AI Companion India',
    'Telugu AI Companion',
    'Baagupadu AI Companion',
    'Emotional AI Companion',
    'Conversational AI Companion',
    'Best AI Companion',
    'AI Career Coach',
    'Sahayam AI Friend',
    'Baagupadu',
    'Bagupadu',
    'బాగుపడు',
    'Sahayam AI',
    'Career Guidance India',
    'NEP 2020 Career Guidance',
  ],
  authors: [
    { name: 'Sreekar Reddy Pindi', url: 'https://baagupadu.com' },
    { name: 'Baagupadu Technologies', url: 'https://baagupadu.com' },
  ],
  creator: 'Sreekar Reddy Pindi',
  publisher: 'Baagupadu Technologies',
  alternates: {
    canonical: 'https://baagupadu.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://baagupadu.com',
    siteName: 'Baagupadu — Autonomous AI Companion',
    title: 'Baagupadu — Your Autonomous AI Companion | Discover Who You Truly Are',
    description:
      'Meet your empathetic autonomous AI companion co-founded by Sreekar Reddy Pindi. Have a deep, judgment-free conversation with Sahayam to understand your story, discover your true identity, and navigate your future.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 675,
        alt: 'Baagupadu — Autonomous AI Companion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baagupadu — Your Autonomous AI Companion | Discover Who You Truly Are',
    description:
      'Empathetic autonomous AI companion for youth, students, and professionals co-founded by Sreekar Reddy Pindi. Understand your past, gain clarity, and navigate your future.',
    images: ['/og-image.jpg'],
    creator: '@Baagupadu',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Baagupadu — Autonomous AI Companion',
  alternateName: [
    'Baagupadu AI Companion',
    'Baagupadu',
    'Bagupadu',
    'బాగుపడు',
    'Sahayam AI Companion',
  ],
  url: 'https://baagupadu.com',
  description:
    'India\'s premier autonomous AI companion for self-discovery, emotional growth, and life & career navigation, co-founded by Sreekar Reddy Pindi.',
};

const jsonLdOrg = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Baagupadu Technologies',
  alternateName: ['Baagupadu AI Companion', 'Baagupadu', 'బాగుపడు'],
  url: 'https://baagupadu.com',
  logo: 'https://baagupadu.com/og-image.jpg',
  email: 'info@baagupadu.com',
  founder: {
    '@type': 'Person',
    name: 'Sreekar Reddy Pindi',
    alternateName: ['Sreekar Reddy', 'Sreekar Pindi'],
    jobTitle: 'Co-Founder & Chief AI Architect',
    url: 'https://baagupadu.com/about#sreekar-reddy-pindi',
    email: 'mailto:sreekar.pindi@baagupadu.com',
    sameAs: [
      'https://www.linkedin.com/in/sreekar-reddy-p-8bb249287',
      'https://github.com/Sreekarreddy2005',
    ],
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.linkedin.com/company/baagupadu',
    'https://github.com/Baagupadu',
    'https://www.linkedin.com/in/sreekar-reddy-p-8bb249287',
    'https://github.com/Sreekarreddy2005',
  ],
};

const jsonLdSoftware = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Baagupadu Autonomous AI Companion & AI Friend',
  applicationCategory: 'LifestyleApplication, EducationalApplication',
  operatingSystem: 'All Web Browsers',
  author: {
    '@type': 'Person',
    name: 'Sreekar Reddy Pindi',
    jobTitle: 'Co-Founder & Chief AI Architect',
    email: 'mailto:sreekar.pindi@baagupadu.com',
    sameAs: [
      'https://www.linkedin.com/in/sreekar-reddy-p-8bb249287',
      'https://github.com/Sreekarreddy2005',
    ],
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  description:
    'An empathetic autonomous AI companion and personal AI friend co-engineered by Sreekar Reddy Pindi and the founding team providing conversational self-discovery, emotional clarity, and personalized life & career compass roadmaps using Dynamic Retrieval-Augmented Generation (RAG).',
};

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does Baagupadu work as an AI friend and companion?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Baagupadu acts as an empathetic AI friend and personal confidant through its companion engine Sahayam. It provides a warm, judgment-free space to explore your daily thoughts, childhood curiosities, and ambitions, combining the listening ear of a true AI friend with structured mentorship.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who founded Baagupadu AI Companion?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Baagupadu was co-founded and architected by Sreekar Reddy Pindi and the founding team in Hyderabad, India, to provide youth and students with an empathetic, autonomous AI companion for psychological self-discovery and actionable career guidance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Baagupadu as a personal AI friend for self-discovery?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Baagupadu is designed for youth and students seeking an autonomous AI companion and supportive AI friend. Sahayam listens with deep empathy, detects repeating cognitive patterns across your life stages, and helps you gain clarity on who you are.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does Baagupadu use Dynamic RAG instead of model fine-tuning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Baagupadu utilizes Dynamic Retrieval-Augmented Generation (RAG) over static model fine-tuning to deliver real-time user context updates, strict hallucination control, and localized cultural Indian career mentorship without expensive retraining cycles.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Baagupadu AI Companion?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Baagupadu (బాగుపడు) is an autonomous AI companion designed to help youth and students discover who they truly are. Unlike superficial chatbots, Baagupadu offers empathetic life companionship, emotional clarity, and actionable career navigation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes Baagupadu unique in the AI companion market?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'While typical AI companions only offer casual small talk, Baagupadu bridges emotional companionship with tangible self-betterment. Through its companion engine Sahayam, it maps your childhood curiosity, teenage identity, and ambitions into an actionable personal compass.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does the word Baagupadu mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Baagupadu is a meaningful Telugu word (బాగుపడు) meaning to improve yourself, flourish, elevate your life, and achieve your highest potential.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the Sahayam AI companion interact with me?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sahayam operates as an empathetic confidant, mentor, and accountability partner. It listens without judgment, recognizes recurring behavioral patterns, and helps you navigate real-world decisions with milestone roadmaps.',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${inter.variable} min-h-screen antialiased`}
        suppressHydrationWarning
      >
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
          />
        </head>
        <body className="min-h-screen bg-transparent text-text font-sans transition-colors duration-300 ">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AmbientBackground />
            <div className="relative z-10 min-h-screen">
              {children}
            </div>
            <CookieConsent />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
