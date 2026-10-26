'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Heart, 
  Brain, 
  Target, 
  ShieldCheck, 
  MapPin, 
  Mail, 
  ChevronRight, 
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { containerVariants, slideUpVariants } from '@/lib/utils/animations';

const VALUES = [
  {
    icon: <Heart className="w-6 h-6 text-[#FF6B8A]" />,
    title: 'Psychological Safety First',
    desc: 'Self-discovery cannot happen under pressure or judgment. We design every interaction to be an emotionally safe haven where youth can unpack vulnerability freely.',
  },
  {
    icon: <Brain className="w-6 h-6 text-[#6366F1]" />,
    title: 'Grounded Cognitive Truth',
    desc: 'Rather than superficial AI chatter or unconstrained hallucinations, our companion is anchored in proven developmental psychology and verifiable educational frameworks.',
  },
  {
    icon: <Target className="w-6 h-6 text-[#00B894]" />,
    title: 'Actionable Accountability',
    desc: 'Empathy without execution leads to stagnation. We translate deep emotional self-understanding into day-by-day and week-by-week tangible milestone roadmaps.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#FFB84D]" />,
    title: 'Radical Data Sovereignty',
    desc: 'We reject invasive advertising surveillance. We never monetize, trade, or sell student reflections, strictly abiding by India’s DPDP Act 2023 and IT Act 2000.',
  },
];

const METRICS = [
  { label: 'Graduates Annually in India', value: '1.5M+', sub: 'Engineering & tech students' },
  { label: 'Facing Mentorship Deficit', value: '80%+', sub: 'Lacking 1-on-1 career guidance' },
  { label: 'Life Stages Explored', value: '3 Phases', sub: 'Childhood, Teenage & Adult' },
  { label: 'Third-Party Ad Trackers', value: 'Zero', sub: 'Committed to complete privacy' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-start px-4 pt-24 sm:pt-28 pb-20 relative overflow-x-hidden">
        <motion.div
          className="w-full max-w-6xl relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-6">
            <Link href="/" className="hover:text-[var(--color-secondary)] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[var(--color-text)]">About</span>
          </div>

          {/* Hero Section */}
          <div className="mb-20 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider mb-4 border border-[var(--color-secondary)]/20">
              <Sparkles className="w-3.5 h-3.5" />
              Company Origins &amp; Vision
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--color-text)] mb-6 tracking-tight leading-[1.15]">
              Built to Help Every Student <br className="hidden sm:inline" />
              <span className="gradient-text">Flourish &amp; Uplift Their Life</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--color-text-muted)] max-w-3xl leading-relaxed mb-8">
              <strong>Baagupadu Technologies</strong> is an Indian artificial intelligence enterprise founded in Hyderabad. We build empathetic autonomous AI companions and intelligent guidance engines that empower youth, students, and professionals to understand their past, discover who they truly are, and navigate their future with clarity.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[var(--color-text-muted)]">
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-secondary)]" />
                Hyderabad, Telangana, India
              </span>
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5">
                Co-Founder &amp; AI Architect: <strong>Sreekar Reddy Pindi</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5">
                Inquiries: <a href="mailto:info@baagupadu.com" className="text-[var(--color-secondary)] font-semibold hover:underline">info@baagupadu.com</a>
              </span>
            </div>
          </div>

          {/* The Cultural Meaning of Baagupadu */}
          <motion.section
            variants={slideUpVariants}
            className="p-8 sm:p-12 rounded-[2.5rem] mb-20 glass-strong border border-[var(--color-secondary)]/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[var(--color-secondary)]/15 via-[#FF6B8A]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-3xl text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-secondary)] mb-3">
                Cultural Heritage &amp; Etymology
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight">
                The Sacred Meaning of <span className="text-[var(--color-secondary)] font-serif italic">&ldquo;బాగుపడు&rdquo;</span>
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
                <p>
                  In Telugu culture across Andhra Pradesh and Telangana, elders bless younger generations with a heartfelt phrase: <strong className="text-[var(--color-text)]">&ldquo;బాగుపడు&rdquo; (Baagupadu)</strong>. It translates far beyond superficial commercial wealth—it embodies the timeless wish to <em>improve oneself, rise with dignity, overcome adversity, and flourish into your highest human potential</em>.
                </p>
                <p>
                  We chose this name because we believe artificial intelligence should not be a superficial distraction or an endless dopamine trap. An AI companion should stand beside you like a loyal friend and wise mentor, asking the hard questions that unlock your latent gifts and helping you build a life of purpose.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Problem Statement & Impact Metrics */}
          <motion.section variants={slideUpVariants} className="mb-20 text-left">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] block mb-2">
                The Reality of Indian Education
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] tracking-tight">
                Why Baagupadu Exists
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-text-muted)] mt-3 leading-relaxed">
                India produces some of the most determined minds on earth. Yet millions of students face crippling placement anxiety, parental pressure, and zero access to personalized mentorship.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {METRICS.map((m) => (
                <div key={m.label} className="p-6 rounded-2xl glass-card border border-black/5 dark:border-white/5">
                  <div className="text-3xl sm:text-4xl font-black text-[var(--color-secondary)] mb-1">
                    {m.value}
                  </div>
                  <h3 className="text-sm font-bold text-[var(--color-text)] mb-1">{m.label}</h3>
                  <p className="text-xs text-[var(--color-text-muted)]">{m.sub}</p>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-3xl glass border border-black/5 dark:border-white/5 space-y-4 text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              <p>
                Private 1-on-1 career counseling currently costs upwards of ₹5,000 to ₹25,000 per student—far out of reach for middle-class and Tier 2/3 families. Meanwhile, college placement cells are tasked with managing 2,000+ students with a skeleton staff.
              </p>
              <p>
                Baagupadu solves this divide by democratizing world-class, empathetic life guidance. Through our companion engine <strong>Sahayam</strong>, every student has an autonomous AI mentor that remembers their childhood curiosities, understands their teenage pressures, and crafts realistic career milestones.
              </p>
            </div>
          </motion.section>

          {/* Core Values Grid */}
          <motion.section variants={slideUpVariants} className="mb-20 text-left">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] block mb-2">
                Foundational Principles
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] tracking-tight">
                What Guides Our Engineering
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VALUES.map((val) => (
                <div key={val.title} className="p-7 rounded-3xl glass-card border border-black/5 dark:border-white/5 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-5 border border-black/5 dark:border-white/5">
                      {val.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-text)] mb-2.5">{val.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Leadership & Co-Founder Section */}
          <motion.section
            variants={slideUpVariants}
            className="p-8 sm:p-12 rounded-[2.5rem] mb-20 glass-card border border-black/5 dark:border-white/5 text-left"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] block mb-2">
                  Leadership &amp; Architecture
                </span>
                <h2 className="text-3xl font-extrabold text-[var(--color-text)] tracking-tight mb-2">
                  Sreekar Reddy Pindi
                </h2>
                <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
                  Co-Founder &amp; Chief AI Architect • Baagupadu Technologies
                </p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                  Sreekar leads the architectural engineering of Baagupadu’s multi-agent cognitive engine, Dynamic RAG pipeline, and vernacular self-discovery frameworks in Hyderabad. Driven by the mission to make transformative mentorship accessible to every student in India, Sreekar combines cutting-edge AI systems engineering with psychological empathy.
                </p>
                <div className="flex items-center gap-4 text-xs font-medium">
                  <a href="mailto:info@baagupadu.com" className="text-[var(--color-secondary)] hover:underline font-semibold flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    info@baagupadu.com
                  </a>
                  <a href="https://github.com/Sreekarreddy2005" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                    GitHub Profile ↗
                  </a>
                </div>
              </div>

              <div className="w-full md:w-auto p-6 rounded-2xl glass-strong border border-black/5 dark:border-white/5 flex flex-col justify-center items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-secondary)] to-[#FF6B8A] flex items-center justify-center text-white mb-3 shadow-md">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="font-extrabold text-base text-[var(--color-text)]">Baagupadu Technologies</div>
                <div className="text-xs text-[var(--color-text-muted)]">Hyderabad, Telangana, India</div>
              </div>
            </div>
          </motion.section>

          {/* Bottom Call to Action */}
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4">
              Begin Your Journey of Self-Betterment
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6">
              Experience the companion that listens like a friend, guides like a mentor, and holds you accountable like a coach.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/chat">
                <button className="px-6 py-3 rounded-full bg-[var(--color-secondary)] hover:bg-[#5658d6] text-white text-sm font-bold shadow-md hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer">
                  <span>Talk to Sahayam</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/manifesto">
                <button className="px-6 py-3 rounded-full glass border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-[var(--color-text)] text-sm font-semibold transition-colors cursor-pointer">
                  Read The Manifesto
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

        <Footer />
      </main>
    </>
  );
}
