'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Heart, 
  Brain, 
  Zap, 
  MapPin, 
  Mail, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { containerVariants, slideUpVariants } from '@/lib/utils/animations';

const CULTURE_PILLARS = [
  {
    icon: <Zap className="w-6 h-6 text-amber-500" />,
    title: 'Extreme Agency Over Bureaucracy',
    desc: 'We don’t believe in micro-management or layers of approval. When you take on a problem at Baagupadu, you own it end-to-end—from research and systems design to production deployment.',
  },
  {
    icon: <Heart className="w-6 h-6 text-[#FF6B8A]" />,
    title: 'The Student-First Obsession',
    desc: 'Every architecture decision, prompt refinement, and UI micro-interaction is judged by one metric: Does this give an Indian youth more emotional clarity and agency over their future?',
  },
  {
    icon: <Brain className="w-6 h-6 text-[#6366F1]" />,
    title: 'Deep Intellectual & Engineering Rigor',
    desc: 'We build at the intersection of cognitive developmental psychology and multi-agent AI systems (LangGraph, pgvector, local GGUF quantization, Next.js 16). We value craft and speed.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#00B894]" />,
    title: 'Honesty, Privacy & Integrity',
    desc: 'We reject dark patterns and predatory edtech tactics. We never sell student data or build addictive engagement traps. We build tools that make users more independent, not dependent.',
  },
];

const WORKING_PRINCIPLES = [
  {
    title: 'High-Density Founding Team',
    desc: 'We intentionally stay small, agile, and concentrated. You work shoulder-to-shoulder with the founders with zero intermediate layers.',
  },
  {
    title: 'Hyderabad Headquarters with Remote Flexibility',
    desc: 'Rooted in Hyderabad’s booming technology corridor, we combine collaborative in-person whiteboarding with deep, uninterrupted remote focus time.',
  },
  {
    title: 'Continuous Learning & Research Freedom',
    desc: 'We encourage continuous exploration of state-of-the-art AI literature, developmental psychology papers, and open-source contributions.',
  },
];

export default function CareersPage() {
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
            <span className="text-[var(--color-text)]">Careers &amp; Culture</span>
          </div>

          {/* Hero Header */}
          <div className="mb-16 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Life &amp; Philosophy at Baagupadu
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--color-text)] mb-6 tracking-tight leading-[1.15]">
              Build the Future of <br className="hidden sm:inline" />
              <span className="gradient-text">Empathetic Artificial Intelligence</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--color-text-muted)] max-w-3xl leading-relaxed mb-6">
              At <strong>Baagupadu Technologies</strong>, we are engineering an autonomous companion that transforms human flourishing. We are a tight-knit team of builders in Hyderabad who believe that technology should elevate human dignity, not exploit it.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[var(--color-text-muted)]">
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-secondary)]" />
                Hyderabad, Telangana, India
              </span>
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5">
                Culture: High Agency • Zero Bureaucracy
              </span>
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5">
                Inquiries: <a href="mailto:info@baagupadu.com" className="text-[var(--color-secondary)] font-semibold hover:underline">info@baagupadu.com</a>
              </span>
            </div>
          </div>

          {/* Culture Pillars Grid */}
          <motion.section variants={slideUpVariants} className="mb-20 text-left">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] block mb-2">
                Our Ethos
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] tracking-tight">
                How We Think &amp; Build
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CULTURE_PILLARS.map((col) => (
                <div key={col.title} className="p-7 rounded-3xl glass-card border border-black/5 dark:border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-5 border border-black/5 dark:border-white/5">
                      {col.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-text)] mb-2.5">{col.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{col.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* How We Operate */}
          <motion.section
            variants={slideUpVariants}
            className="p-8 sm:p-12 rounded-[2.5rem] mb-20 glass-strong border border-black/5 dark:border-white/5 text-left"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] block mb-2">
              Work Environment
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-8 tracking-tight">
              Life at Baagupadu Technologies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {WORKING_PRINCIPLES.map((wp) => (
                <div key={wp.title} className="p-6 rounded-2xl glass border border-black/5 dark:border-white/5">
                  <h3 className="text-base font-bold text-[var(--color-text)] mb-2">{wp.title}</h3>
                  <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">{wp.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* General Talent Network Note (Per user instruction: maintain culture page without hardcoded openings) */}
          <motion.section
            variants={slideUpVariants}
            className="p-8 sm:p-12 rounded-[2.5rem] mb-16 glass-card border border-[var(--color-secondary)]/25 text-left relative overflow-hidden"
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider mb-4 border border-[var(--color-secondary)]/20">
                Talent Community &amp; General Inquiries
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight">
                Connecting With Our Team
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed mb-8">
                <p>
                  We are currently operating as a focused founding team. While we are not running active open recruitment cycles on this page right now, we are always excited to connect with high-agency engineers, systems architects, and cognitive psychology researchers who resonate with our mission.
                </p>
                <p>
                  If you are building something remarkable in autonomous agents, localized model inference, or student mentorship, we would love to hear from you.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-strong border border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
                    Direct Founder Introduction:
                  </div>
                  <a
                    href="mailto:info@baagupadu.com?subject=Introduction%20to%20Baagupadu%20Team"
                    className="font-mono text-sm sm:text-base text-[var(--color-secondary)] font-bold hover:underline flex items-center gap-1.5"
                  >
                    <Mail className="w-4 h-4" />
                    info@baagupadu.com
                  </a>
                </div>

                <a
                  href="mailto:info@baagupadu.com?subject=Introduction%20to%20Baagupadu%20Team"
                  className="px-5 py-2.5 rounded-xl bg-[var(--color-secondary)] hover:bg-[#5658d6] text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Say Hello</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.section>

          {/* Bottom Back Nav */}
          <div className="text-center text-xs text-[var(--color-text-muted)]">
            <span>Learn more about our vision in </span>
            <Link href="/manifesto" className="text-[var(--color-secondary)] font-semibold hover:underline">
              The Founding Manifesto
            </Link>
            <span> or explore our </span>
            <Link href="/about" className="text-[var(--color-secondary)] font-semibold hover:underline">
              Company Story
            </Link>
            .
          </div>
        </motion.div>

        <Footer />
      </main>
    </>
  );
}
