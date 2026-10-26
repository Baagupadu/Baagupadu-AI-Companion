'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Copy, 
  Check, 
  MapPin, 
  ChevronRight
} from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { containerVariants, slideUpVariants } from '@/lib/utils/animations';

const COLOR_PALETTE = [
  { name: 'Digital Indigo (Primary)', hex: '#6366F1', role: 'Brand core, cognitive clarity & primary UI actions' },
  { name: 'Radiant Rose (Empathy)', hex: '#FF6B8A', role: 'Warm emotional cues, confidant persona & vulnerability' },
  { name: 'Emerald Mint (Flourish)', hex: '#6DD5B8', role: 'Milestones, career growth, and success states' },
  { name: 'Sun Amber (Warmth)', hex: '#FFB84D', role: 'Accountability, focus, and energy' },
  { name: 'Deep Slate (Background)', hex: '#0F172A', role: 'Base luxury dark mode canvas' },
];

export default function PressPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      // fallback
    }
  };

  const BOILERPLATE_SHORT =
    'Baagupadu Technologies is an Indian AI enterprise founded in Hyderabad by Sreekar Reddy Pindi. Its flagship product, Baagupadu (బాగుపడు), is an autonomous, empathetic AI companion and AI friend that combines developmental psychology with Dynamic RAG to deliver personalized self-discovery and actionable life & career roadmaps for students and youth.';

  const BOILERPLATE_LONG =
    'Headquartered in Hyderabad, India, Baagupadu Technologies is pioneering the "Purposeful AI Companion" market. Named after the Telugu blessing "బాగుపడు" (to improve oneself, uplift your life, and flourish), the platform bridges emotional companionship with structured career guidance. Unlike superficial chatbots, Baagupadu’s multi-agent conversational engine, Sahayam, unpacks childhood curiosities, teenage identity, and adult ambitions into an actionable execution compass. Grounded in India’s DPDP Act 2023 with zero third-party ad tracking, Baagupadu partners with engineering colleges and universities through its Campus Edition mentorship lab.';

  const BIO_SREEKAR =
    'Sreekar Reddy Pindi is the Co-Founder and Chief AI Architect of Baagupadu Technologies, based in Hyderabad, India. He spearheads the architectural engineering of Baagupadu’s multi-agent cognitive engine, Dynamic RAG pipeline, and empathetic AI companion frameworks, democratizing life clarity and career mentorship for students across India.';

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-start px-4 pt-24 sm:pt-28 pb-20 relative overflow-x-hidden">
        <motion.div
          className="w-full max-w-5xl relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-6">
            <Link href="/" className="hover:text-[var(--color-secondary)] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <Link href="/about" className="hover:text-[var(--color-secondary)] transition-colors">Company</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[var(--color-text)]">Press &amp; Media Kit</span>
          </div>

          {/* Hero Header */}
          <div className="mb-14 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider mb-4 border border-[var(--color-secondary)]/20">
              <FileText className="w-3.5 h-3.5" />
              Official Press Resources &amp; Brand Assets
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--color-text)] mb-6 tracking-tight leading-[1.15]">
              Press &amp; <br className="hidden sm:inline" />
              <span className="gradient-text">Media Resources</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--color-text-muted)] max-w-3xl leading-relaxed mb-6">
              Welcome to the official Baagupadu Media Kit. Here you will find copy-pasteable company descriptions, brand guidelines, founder biographies, and direct media contact channels.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[var(--color-text-muted)]">
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-secondary)]" />
                Hyderabad, Telangana, India
              </span>
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5">
                Media Inquiries: <a href="mailto:info@baagupadu.com" className="text-[var(--color-secondary)] font-semibold hover:underline">info@baagupadu.com</a>
              </span>
            </div>
          </div>

          {/* Fast Facts Card */}
          <motion.section
            variants={slideUpVariants}
            className="p-8 sm:p-10 rounded-[2.5rem] mb-16 glass-card border border-black/5 dark:border-white/5 text-left"
          >
            <h2 className="text-2xl font-extrabold text-[var(--color-text)] mb-6 tracking-tight">
              Fast Facts &amp; Corporate Identity
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs sm:text-sm">
              <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                <span className="text-[var(--color-text-muted)] block text-xs">Legal Corporate Entity</span>
                <strong className="text-[var(--color-text)] text-sm mt-0.5 block">Baagupadu Technologies</strong>
              </div>

              <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                <span className="text-[var(--color-text-muted)] block text-xs">Operating Headquarters</span>
                <strong className="text-[var(--color-text)] text-sm mt-0.5 block">Hyderabad, Telangana, India</strong>
              </div>

              <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                <span className="text-[var(--color-text-muted)] block text-xs">Leadership</span>
                <strong className="text-[var(--color-text)] text-sm mt-0.5 block">Sreekar Reddy Pindi (Co-Founder &amp; Chief AI Architect)</strong>
              </div>

              <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                <span className="text-[var(--color-text-muted)] block text-xs">Founder Direct Desk</span>
                <a href="mailto:sreekar.pindi@baagupadu.com" className="text-[var(--color-secondary)] hover:underline text-sm mt-0.5 block font-mono font-bold">
                  sreekar.pindi@baagupadu.com
                </a>
              </div>

              <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                <span className="text-[var(--color-text-muted)] block text-xs">Core Technology</span>
                <strong className="text-[var(--color-text)] text-sm mt-0.5 block">Dynamic RAG, LangGraph &amp; pgvector</strong>
              </div>

              <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                <span className="text-[var(--color-text-muted)] block text-xs">General Contact</span>
                <strong className="text-[var(--color-text)] text-sm mt-0.5 block font-mono">info@baagupadu.com</strong>
              </div>
            </div>
          </motion.section>

          {/* Copy-Pasteable Boilerplates */}
          <motion.section variants={slideUpVariants} className="mb-16 text-left space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
              Official Boilerplates for Media &amp; Press
            </h2>

            {/* Short boilerplate */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card border border-black/5 dark:border-white/5">
              <div className="flex items-center justify-between gap-4 mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-secondary)]">
                  Short Boilerplate (50 Words)
                </h3>
                <button
                  onClick={() => handleCopy('short', BOILERPLATE_SHORT)}
                  className="px-3 py-1.5 rounded-lg glass border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-[var(--color-text)]"
                >
                  {copiedKey === 'short' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'short' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed font-sans">
                {BOILERPLATE_SHORT}
              </p>
            </div>

            {/* Long boilerplate */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card border border-black/5 dark:border-white/5">
              <div className="flex items-center justify-between gap-4 mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-secondary)]">
                  Standard Boilerplate (120 Words)
                </h3>
                <button
                  onClick={() => handleCopy('long', BOILERPLATE_LONG)}
                  className="px-3 py-1.5 rounded-lg glass border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-[var(--color-text)]"
                >
                  {copiedKey === 'long' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'long' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed font-sans">
                {BOILERPLATE_LONG}
              </p>
            </div>

            {/* Founder Biography Card */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card border border-black/5 dark:border-white/5">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-secondary)]">
                    Executive Bio • Sreekar Reddy Pindi
                  </h3>
                  <span className="text-xs text-[var(--color-text-muted)] font-semibold">
                    Co-Founder &amp; Chief AI Architect
                  </span>
                </div>
                <button
                  onClick={() => handleCopy('founder', BIO_SREEKAR)}
                  className="px-3 py-1.5 rounded-lg glass border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-[var(--color-text)]"
                >
                  {copiedKey === 'founder' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'founder' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed font-sans mb-4">
                {BIO_SREEKAR}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-black/5 dark:border-white/5 text-xs font-semibold">
                <a
                  href="mailto:sreekar.pindi@baagupadu.com"
                  className="text-[var(--color-secondary)] hover:underline inline-flex items-center gap-1"
                >
                  sreekar.pindi@baagupadu.com
                </a>
                <span className="text-[var(--color-text-muted)]">•</span>
                <a
                  href="https://www.linkedin.com/in/sreekar-reddy-p-8bb249287"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  LinkedIn Profile ↗
                </a>
                <span className="text-[var(--color-text-muted)]">•</span>
                <a
                  href="https://github.com/Sreekarreddy2005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors inline-flex items-center gap-1"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </motion.section>

          {/* Brand Palette & Visual Identity */}
          <motion.section variants={slideUpVariants} className="mb-16 text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-3 tracking-tight">
              Brand Colors &amp; Visual Identity
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-8">
              Official color tokens used across the Baagupadu design system.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {COLOR_PALETTE.map((col) => (
                <div key={col.name} className="p-5 rounded-2xl glass-card border border-black/5 dark:border-white/5">
                  <div className="w-full h-12 rounded-xl mb-3 border border-black/10 dark:border-white/10 shadow-sm" style={{ backgroundColor: col.hex }} />
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-[var(--color-text)]">{col.name}</h3>
                    <code className="text-xs font-mono font-semibold text-[var(--color-secondary)]">{col.hex}</code>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">{col.role}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Media Contact Box */}
          <motion.section
            variants={slideUpVariants}
            className="p-8 sm:p-12 rounded-[2.5rem] mb-16 glass-strong border border-[var(--color-secondary)]/25 text-left"
          >
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] block mb-2">
                Press &amp; Media Inquiries
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-3 tracking-tight">
                Get in Touch with Media Relations
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6">
                Journalists, podcasters, conference organizers, and education researchers seeking interviews, executive quotes, or high-resolution assets can reach out directly:
              </p>

              <div className="p-5 rounded-2xl glass border border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[var(--color-text-muted)] block">Dedicated Media Desk:</span>
                  <a
                    href="mailto:info@baagupadu.com?subject=[Press%20Inquiry]%20Baagupadu%20AI%20Companion"
                    className="font-mono text-sm sm:text-base text-[var(--color-secondary)] font-bold hover:underline"
                  >
                    info@baagupadu.com
                  </a>
                </div>

                <a
                  href="mailto:info@baagupadu.com?subject=[Press%20Inquiry]%20Baagupadu%20AI%20Companion"
                  className="px-5 py-2.5 rounded-xl bg-[var(--color-secondary)] hover:bg-[#5658d6] text-white text-xs font-semibold shadow-md transition-all shrink-0 cursor-pointer"
                >
                  Send Press Query
                </a>
              </div>
            </div>
          </motion.section>
        </motion.div>

        <Footer />
      </main>
    </>
  );
}
