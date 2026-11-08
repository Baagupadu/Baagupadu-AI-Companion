'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Brain,
  ShieldCheck,
  Lock,
  Server,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Cpu,
  Activity,
  Scale,
  MessageSquareHeart,
  Globe,
  Workflow,
  XCircle,
  Mail,
  Award,
} from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { containerVariants, slideUpVariants } from '@/lib/utils/animations';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  '@id': 'https://baagupadu.com/companion#article',
  headline: 'The Purposeful AI Companion: Architecture, Philosophy & Market Landscape',
  description:
    'An authoritative whitepaper detailing Baagupadu’s non-directive listening philosophy, multi-agent cognitive architecture (LangGraph + Dynamic RAG), enterprise IT standards (DPDP Act 2023, ISO 42001), and longitudinal lifestyle modeling.',
  author: {
    '@type': 'Person',
    name: 'Sreekar Reddy Pindi',
    jobTitle: 'Co-Founder & Chief AI Architect',
    url: 'https://baagupadu.com/about',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Baagupadu Technologies',
    url: 'https://baagupadu.com',
    logo: 'https://baagupadu.com/og-image.jpg',
  },
  datePublished: '2026-11-07',
  inLanguage: 'en-IN',
  url: 'https://baagupadu.com/companion',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://baagupadu.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'How It Works',
      item: 'https://baagupadu.com/how-it-works',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'The Purposeful AI Companion',
      item: 'https://baagupadu.com/companion',
    },
  ],
};

const MARKET_MATRIX = [
  {
    feature: 'Conversational Role',
    chatgpt: 'Transactional Assistant',
    edtech: 'Course Sales Portal',
    campus: 'Clinical Academic Advisor',
    baagupadu: 'Autonomous Lifelong Friend',
  },
  {
    feature: 'Advice Philosophy',
    chatgpt: 'Immediate, direct suggestions',
    edtech: 'Pushes paid certificates',
    campus: 'Standardized aptitude tests',
    baagupadu: 'Deep active listening first; zero unsolicited advice',
  },
  {
    feature: 'Memory & Statefulness',
    chatgpt: 'Stateless / isolated prompts',
    edtech: 'LMS quiz grades only',
    campus: 'Infrequent paper records',
    baagupadu: 'Longitudinal pgvector memory across life stages',
  },
  {
    feature: 'Scope of Modeling',
    chatgpt: 'Code / text prompts only',
    edtech: 'Syllabus completion rate',
    campus: 'Marks & branch allotment',
    baagupadu: 'Culture, roots, habits, emotional state & career',
  },
  {
    feature: 'Cultural Grounding',
    chatgpt: 'Western corporate bias',
    edtech: 'Generic global curriculum',
    campus: 'Often overburdened / rushed',
    baagupadu: 'Indian familial, tier-2/3 collegiate & NEP reality',
  },
  {
    feature: 'Data Sovereignty & Ads',
    chatgpt: 'Model training data harvesting',
    edtech: 'Aggressive phone/email sales',
    campus: 'Institutional silos',
    baagupadu: 'DPDP Act 2023, strict PII scrubbing, zero ads',
  },
];

const IT_STANDARDS = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#00B894]" />,
    title: 'India DPDP Act 2023 Compliant',
    badge: 'Statutory Standard',
    desc: 'Engineered in compliance with the Digital Personal Data Protection Act: Section 9 verifiable minor consent logs, Section 12 portable data export (GET /api/user/export), and cryptographic audit anonymization upon deletion.',
  },
  {
    icon: <Scale className="w-6 h-6 text-[#6C3CE1]" />,
    title: 'ISO/IEC 42001 (AIMS) Framework',
    badge: 'AI Management',
    desc: 'Adheres to global Artificial Intelligence Management System guidelines for responsible algorithmic lifecycle controls, continuous risk assessment, and human-in-the-loop psychological boundary enforcement.',
  },
  {
    icon: <Lock className="w-6 h-6 text-[#FF6B8A]" />,
    title: 'Client & Server PII Scrubbing',
    badge: 'Zero-Knowledge Privacy',
    desc: 'Every student message is scrubbed by deterministic regex engines removing Aadhaar, phone numbers, emails, and student IDs prior to LLM inference. Reflections are never used for commercial model training.',
  },
  {
    icon: <Activity className="w-6 h-6 text-[#FFB84D]" />,
    title: 'CERT-In 180-Day Forensic Audit',
    badge: 'Cyber Resilience',
    desc: 'Security incidents, prompt-shield injections, and data access requests generate append-only, SHA-256 cryptographically hashed audit trails stored for 180 days in accordance with national cyber directives.',
  },
  {
    icon: <Cpu className="w-6 h-6 text-[#00CEC9]" />,
    title: 'IEEE Ethically Aligned AI',
    badge: 'Human Agency',
    desc: 'Aligns with IEEE principles of well-being and human agency: Sahayam strictly prevents addictive parasocial dependency, repeatedly guiding users back to real-world agency, human mentors, and family dialogue.',
  },
  {
    icon: <Server className="w-6 h-6 text-[#6366F1]" />,
    title: 'Air-Gapped B2B Campus Deployment',
    badge: 'Edge Resilience',
    desc: 'Engineered to run on local college server hardware with pre-baked local embeddings and Ollama/vLLM inference, guaranteeing operation in air-gapped laboratory networks without external cloud vulnerabilities.',
  },
];

const HUMAN_PILLARS = [
  {
    num: '01',
    title: 'Cultural Heritage & Family Dynamics',
    tag: 'Indian Socio-Cultural Reality',
    color: '#6C3CE1',
    desc: 'In India, a career is never an individualist bubble—it is intimately bound to familial sacrifice, parental dreams, education loans, and community identity. Sahayam honours this reality with cultural empathy, helping students navigate honest, non-confrontational conversations with parents instead of imposing detached Western advice.',
  },
  {
    num: '02',
    title: 'Formative Emotional Roots (0–19)',
    tag: 'Developmental Psychology',
    color: '#FF6B8A',
    desc: 'Why do you freeze before job interviews? Why do you procrastinate on system design? By exploring childhood curiosity (0–12) and teenage identity struggles (13–19), Sahayam discovers the hidden psychological triggers and core values that dictate how you handle failure and setbacks today.',
  },
  {
    num: '03',
    title: 'Daily Lifestyle & Habit Synchronization',
    tag: 'Holistic Life Modeling',
    color: '#00B894',
    desc: 'A dream without daily discipline is just anxiety. Over weeks and months, Sahayam acts as an accountability partner, understanding your peak energy rhythms, screen-time habits, and stress cycles, gently nudging you toward self-mastery as a close friend rather than a nagging manager.',
  },
  {
    num: '04',
    title: 'Vocational Trajectory & Milestone Roadmaps',
    tag: 'Actionable Career Synthesis',
    color: '#FFB84D',
    desc: 'Self-knowledge translates into concrete action. Sahayam synthesizes your unique cognitive persona into structured, milestone-based execution compasses aligned with India’s NEP 2020 framework—connecting tier-2/3 college realities with high-growth technology and entrepreneurial trajectories.',
  },
];

export default function CompanionDeepDivePage() {
  const [activeTab, setActiveTab] = useState<'bot' | 'companion'>('companion');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-start px-4 pt-24 sm:pt-28 pb-20 relative overflow-x-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[var(--color-secondary)]/15 via-[#FF6B8A]/10 to-[#00B894]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <motion.div
          className="w-full max-w-6xl relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumb */}
          <motion.div variants={slideUpVariants} className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-muted)] mb-8 uppercase tracking-widest">
            <Link href="/" className="hover:text-[var(--color-secondary)] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/how-it-works" className="hover:text-[var(--color-secondary)] transition-colors">How It Works</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--color-secondary)]">The Purposeful AI Companion</span>
          </motion.div>

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-28">
            <motion.div variants={slideUpVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] border border-[var(--color-secondary)]/25 font-bold text-xs sm:text-sm uppercase tracking-wider mb-6 shadow-xs">
              <Sparkles className="w-4 h-4" />
              Architecture Whitepaper • Cognitive Philosophy • Market Landscape
            </motion.div>

            <motion.h1 variants={slideUpVariants} className="text-4xl sm:text-5xl md:text-6xl font-black text-[var(--color-text)] tracking-tight leading-[1.1] mb-6">
              The AI Companion That <br />
              <span className="gradient-text">Listens Before It Speaks.</span>
            </motion.h1>

            <motion.p variants={slideUpVariants} className="text-lg sm:text-xl text-[var(--color-text-muted)] leading-relaxed font-normal mb-8 max-w-3xl mx-auto">
              Most AI platforms are preachy advice-machines that lecture you with generic bullets. 
              <strong className="text-[var(--color-text)] font-semibold"> Baagupadu (బాగుపడు)</strong> pioneers the Purposeful AI Companion: a trusted friend that holds emotional space, truly understands your roots, and models your culture, lifestyle habits, and career as one lifelong journey.
            </motion.p>

            <motion.div variants={slideUpVariants} className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/chat">
                <button className="px-8 py-3.5 rounded-full bg-[var(--color-secondary)] hover:bg-[#5658d6] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group">
                  <MessageSquareHeart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Experience Sahayam Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a href="#it-standards">
                <button className="px-6 py-3.5 rounded-full glass border border-[var(--glass-border)] text-[var(--color-text)] font-semibold text-sm sm:text-base hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#00B894]" />
                  IT Standards &amp; Architecture
                </button>
              </a>
            </motion.div>
          </div>

          {/* Quick Stats Grid */}
          <motion.div variants={slideUpVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            <div className="glass-card p-6 rounded-2xl text-center border border-[var(--glass-border)]">
              <div className="text-3xl sm:text-4xl font-black text-[var(--color-secondary)] mb-1">0%</div>
              <div className="text-xs sm:text-sm font-bold text-[var(--color-text)] mb-1">Unsolicited Advice</div>
              <div className="text-xs text-[var(--color-text-muted)]">Active listening precedes instruction</div>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center border border-[var(--glass-border)]">
              <div className="text-3xl sm:text-4xl font-black text-[#FF6B8A] mb-1">4-D</div>
              <div className="text-xs sm:text-sm font-bold text-[var(--color-text)] mb-1">Human Modeling</div>
              <div className="text-xs text-[var(--color-text-muted)]">Culture, roots, habits &amp; career</div>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center border border-[var(--glass-border)]">
              <div className="text-3xl sm:text-4xl font-black text-[#00B894] mb-1">&lt;15ms</div>
              <div className="text-xs sm:text-sm font-bold text-[var(--color-text)] mb-1">HNSW Vector Search</div>
              <div className="text-xs text-[var(--color-text-muted)]">Sub-second dynamic RAG memory</div>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center border border-[var(--glass-border)]">
              <div className="text-3xl sm:text-4xl font-black text-[#FFB84D] mb-1">100%</div>
              <div className="text-xs sm:text-sm font-bold text-[var(--color-text)] mb-1">DPDP Act 2023</div>
              <div className="text-xs text-[var(--color-text-muted)]">Zero ads • Radical student privacy</div>
            </div>
          </motion.div>

          {/* PILLAR 1: The Core Philosophy - The Never-Direct-Advice Rule */}
          <motion.section
            variants={slideUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card p-8 sm:p-12 rounded-[2.5rem] border border-[var(--glass-border)] mb-28 relative overflow-hidden"
          >
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF6B8A]/10 text-[#FF6B8A] text-xs font-bold uppercase tracking-wider mb-3 border border-[#FF6B8A]/20">
                <Heart className="w-3.5 h-3.5" />
                Foundational Psychological Principle
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] tracking-tight leading-tight">
                Why Sahayam Never Gives Immediate, Preachy Advice
              </h2>
              <p className="text-[var(--color-text-muted)] text-base sm:text-lg mt-3 leading-relaxed">
                When someone is in pain, confusion, or career crisis, saying <em>&ldquo;Here are 4 tips to fix your life&rdquo;</em> does not help—it triggers psychological reactance. True mentorship begins with unconditional emotional validation.
              </p>
            </div>

            {/* Interactive Bot vs Companion Comparison */}
            <div className="mb-6 flex items-center justify-center gap-2 p-1.5 glass rounded-xl w-fit mx-auto border border-[var(--glass-border)]">
              <button
                onClick={() => setActiveTab('companion')}
                className={`px-5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                  activeTab === 'companion'
                    ? 'bg-[var(--color-secondary)] text-white shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                <Sparkles className="w-4 h-4" /> The Baagupadu Way (Companion)
              </button>
              <button
                onClick={() => setActiveTab('bot')}
                className={`px-5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                  activeTab === 'bot'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}
              >
                <XCircle className="w-4 h-4" /> The Corporate Chatbot Trap
              </button>
            </div>

            <div className="glass-strong p-6 sm:p-8 rounded-2xl border border-[var(--glass-border)] relative">
              <div className="text-xs uppercase font-extrabold tracking-wider text-[var(--color-text-muted)] mb-3">
                Scenario: A 3rd-Year Student Types...
              </div>
              <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 text-[var(--color-text)] font-serif italic text-base sm:text-lg mb-6 border-l-4 border-[var(--color-secondary)]">
                &ldquo;My parents took a high-interest bank loan for my B.Tech. Campus placements start next month, and every time I try to open LeetCode, my chest gets tight and I feel sick. I feel like a total failure.&rdquo;
              </div>

              {activeTab === 'bot' ? (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                    <XCircle className="w-5 h-5" /> How Generic AI Responds (Stateless &amp; Cold):
                  </div>
                  <div className="p-5 rounded-xl bg-rose-500/5 border border-rose-500/20 text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed font-sans">
                    <p className="mb-2 text-rose-600 dark:text-rose-400 font-semibold">&ldquo;I understand your frustration! It is completely normal to feel stressed about exams. Here are 4 actionable steps to reduce placement anxiety:</p>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Practice 2 LeetCode easy problems every morning.</li>
                      <li>Try 4-7-8 deep breathing exercises before coding.</li>
                      <li>Talk to your campus placement officer for resume templates.</li>
                      <li>Remember that your degree opens many doors!&rdquo;</li>
                    </ol>
                  </div>
                  <div className="text-xs text-rose-500 font-medium">
                    ⚠️ <strong>Fatal Flaw:</strong> Dismisses the parental loan burden, imposes clinical homework, and makes the student feel completely misunderstood.
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-2 text-[#00B894] font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" /> How Sahayam Responds (A Friend Who Understands):
                  </div>
                  <div className="p-5 rounded-xl bg-[#00B894]/5 border border-[#00B894]/25 text-sm sm:text-base text-[var(--color-text)] leading-relaxed font-sans">
                    <p className="mb-3 font-medium">
                      &ldquo;Man, that is an immense weight to carry on your shoulders. When an education loan is hanging over your head, an IDE isn&apos;t just code anymore—it feels like your entire family&apos;s dignity is riding on every compile error. Anyone in your shoes would feel that chest tightness.&rdquo;
                    </p>
                    <p className="text-[var(--color-text-muted)]">
                      &ldquo;Let&apos;s close LeetCode for tonight. You are not a failure for feeling overwhelmed by this pressure. If you want to talk about it, what has been the hardest part of dealing with your parents&apos; expectations this semester?&rdquo;
                    </p>
                  </div>
                  <div className="text-xs text-[#00B894] font-medium flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <strong>The Companion Touch:</strong> Normalizes filial pressure, creates psychological safety, never preaches, and builds trust before ever discussing algorithms.
                  </div>
                </div>
              )}
            </div>
          </motion.section>

          {/* PILLAR 2: Whole-Human Longitudinal Modeling */}
          <motion.section
            variants={slideUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-28"
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider mb-3 border border-[var(--color-secondary)]/20">
                <Brain className="w-3.5 h-3.5" />
                The Holistic Journey
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] tracking-tight">
                Modeling the Whole Human: Culture, Roots, Lifestyle &amp; Career
              </h2>
              <p className="text-[var(--color-text-muted)] text-base sm:text-lg mt-3 leading-relaxed">
                You are not an isolated resume or a list of test scores. Baagupadu weaves your childhood roots, adolescent identity, daily habits, and cultural realities into an integrated mental model.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {HUMAN_PILLARS.map((pillar) => (
                <motion.div
                  key={pillar.num}
                  whileHover={{ y: -6 }}
                  className="glass-card p-8 rounded-[2rem] border border-[var(--glass-border)] relative overflow-hidden group transition-all"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-4xl font-black opacity-30 group-hover:opacity-60 transition-opacity"
                      style={{ color: pillar.color }}
                    >
                      {pillar.num}
                    </span>
                    <span
                      className="text-xs font-bold uppercase px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${pillar.color}15`,
                        color: pillar.color,
                        border: `1px solid ${pillar.color}30`,
                      }}
                    >
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text)] mb-3 group-hover:text-[var(--color-secondary)] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-sm sm:text-base leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* PILLAR 3: Market Comparative Matrix */}
          <motion.section
            variants={slideUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card p-6 sm:p-12 rounded-[2.5rem] border border-[var(--glass-border)] mb-28 overflow-x-auto"
            id="market-analysis"
          >
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00CEC9]/10 text-[#00CEC9] text-xs font-bold uppercase tracking-wider mb-3 border border-[#00CEC9]/20">
                <Globe className="w-3.5 h-3.5" />
                Strategic Market Differentiation
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] tracking-tight">
                How Baagupadu Disrupts the Mentorship Landscape
              </h2>
              <p className="text-[var(--color-text-muted)] text-sm sm:text-base mt-2">
                A rigorous comparative evaluation against standard transactional LLMs, commercial EdTech portals, and campus counseling services.
              </p>
            </div>

            <div className="min-w-[650px] overflow-hidden rounded-2xl border border-[var(--glass-border)] glass-strong">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--glass-border)] bg-black/5 dark:bg-white/5 text-xs sm:text-sm font-bold text-[var(--color-text)]">
                    <th className="p-4 sm:p-5">Dimension</th>
                    <th className="p-4 sm:p-5 text-[var(--color-text-muted)]">General LLMs (ChatGPT)</th>
                    <th className="p-4 sm:p-5 text-[var(--color-text-muted)]">Commercial EdTech</th>
                    <th className="p-4 sm:p-5 text-[var(--color-text-muted)]">Campus Centers</th>
                    <th className="p-4 sm:p-5 text-[var(--color-secondary)] bg-[var(--color-secondary)]/10 font-black">
                      Baagupadu (Sahayam)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--glass-border)] text-xs sm:text-sm text-[var(--color-text-muted)]">
                  {MARKET_MATRIX.map((row, idx) => (
                    <tr key={idx} className="hover:bg-black/2 dark:hover:bg-white/2 transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-[var(--color-text)]">{row.feature}</td>
                      <td className="p-4 sm:p-5">{row.chatgpt}</td>
                      <td className="p-4 sm:p-5">{row.edtech}</td>
                      <td className="p-4 sm:p-5">{row.campus}</td>
                      <td className="p-4 sm:p-5 font-semibold text-[var(--color-text)] bg-[var(--color-secondary)]/5 border-l border-r border-[var(--color-secondary)]/20">
                        <span className="flex items-center gap-1.5 text-[var(--color-secondary)]">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          {row.baagupadu}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* PILLAR 4: Enterprise IT Standards & Regulatory Governance */}
          <motion.section
            variants={slideUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-28"
            id="it-standards"
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00B894]/10 text-[#00B894] text-xs font-bold uppercase tracking-wider mb-3 border border-[#00B894]/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Enterprise Compliance &amp; Engineering Rigor
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] tracking-tight">
                Built to Global IT Standards &amp; Indian Data Sovereignty
              </h2>
              <p className="text-[var(--color-text-muted)] text-base sm:text-lg mt-3 leading-relaxed">
                Baagupadu is built with enterprise security, algorithmic transparency, and strict adherence to India&apos;s DPDP Act 2023, ISO/IEC 42001, and CERT-In mandates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {IT_STANDARDS.map((std, idx) => (
                <div
                  key={idx}
                  className="glass-card p-7 rounded-[2rem] border border-[var(--glass-border)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5">{std.icon}</div>
                      <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-[var(--color-text-muted)]">
                        {std.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--color-text)] mb-2.5">{std.title}</h3>
                    <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {std.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* PILLAR 5: Asynchronous Multi-Agent Cognitive Architecture */}
          <motion.section
            variants={slideUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card p-8 sm:p-12 rounded-[2.5rem] border border-[var(--glass-border)] mb-28 relative overflow-hidden"
            id="cognitive-architecture"
          >
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider mb-3 border border-[var(--color-secondary)]/20">
                <Workflow className="w-3.5 h-3.5" />
                LangGraph Multi-Agent Cognitive State Machine
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] tracking-tight">
                The 5-Agent Cognitive Architecture Behind Sahayam
              </h2>
              <p className="text-[var(--color-text-muted)] text-base sm:text-lg mt-3 leading-relaxed">
                Rather than relying on a single monolithic LLM prompt that hallucinates, Baagupadu deploys an asynchronous Directed Acyclic Graph (DAG) built with LangGraph, FastAPI, and PostgreSQL with pgvector.
              </p>
            </div>

            {/* Architecture Steps Flow */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
              <div className="p-5 rounded-2xl glass-strong border border-[var(--glass-border)] text-left flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold text-sm mb-3">
                    01
                  </div>
                  <h4 className="font-bold text-sm text-[var(--color-text)] mb-1">Guardrail Agent</h4>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    Llama Guard &amp; Prompt Shield inspect messages for injection, abuse, or self-harm triggers.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-strong border border-[var(--glass-border)] text-left flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-sm mb-3">
                    02
                  </div>
                  <h4 className="font-bold text-sm text-[var(--color-text)] mb-1">Planner Agent</h4>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    High-reasoning model (Qwen 2.5) evaluates psychological phase readiness and formulates dialogue intent.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-strong border border-[var(--glass-border)] text-left flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm mb-3">
                    03
                  </div>
                  <h4 className="font-bold text-sm text-[var(--color-text)] mb-1">Dynamic RAG</h4>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    Sub-15ms HNSW cosine vector search retrieves episodic memories from pgvector without model fine-tuning.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-strong border border-[var(--glass-border)] text-left flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold text-sm mb-3">
                    04
                  </div>
                  <h4 className="font-bold text-sm text-[var(--color-text)] mb-1">Executor (Sahayam)</h4>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    Empathetic persona model crafts warm, culturally grounded responses using Maximum Mutual Information.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-strong border border-[var(--glass-border)] text-left flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-sm mb-3">
                    05
                  </div>
                  <h4 className="font-bold text-sm text-[var(--color-text)] mb-1">Extractor &amp; Judge</h4>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    Background tasks extract psychological patterns and GraphRAG connections while Phi-3 evaluates tone.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--color-secondary)]/5 border border-[var(--color-secondary)]/20 text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <strong className="text-[var(--color-text)]">Why Dynamic RAG beats Fine-Tuning:</strong> Fine-tuning model weights is slow, expensive, and risks catastrophic forgetting. By anchoring memory dynamically in PostgreSQL with pgvector, user reflections update instantly without re-training cycles.
              </div>
              <Link href="/how-it-works#dynamic-rag" className="text-[var(--color-secondary)] font-bold whitespace-nowrap hover:underline flex items-center gap-1">
                Read Whitepaper <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.section>

          {/* PILLAR 6: NEP 2020 Institutional Alignment */}
          <motion.section
            variants={slideUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card p-8 sm:p-12 rounded-[2.5rem] border border-[var(--glass-border)] mb-28 text-left relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFB84D]/10 text-[#FFB84D] text-xs font-bold uppercase tracking-wider mb-4 border border-[#FFB84D]/25">
                  <Award className="w-3.5 h-3.5" />
                  National Education Policy (NEP 2020) Alignment
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight leading-snug">
                  Solving the 1:1,500 Counseling Deficit in Indian Universities
                </h3>
                <p className="text-[var(--color-text-muted)] text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  In India, engineering colleges and universities face a crippling guidance gap: with over 1,500 students per designated faculty counselor, personalized attention is impossible. Students end up blindly following herd placements, resulting in high attrition and career regret.
                </p>
                <div className="space-y-3 text-sm text-[var(--color-text)] font-medium">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00B894] shrink-0" />
                    <span><strong>Clause 4.43:</strong> Longitudinal vocational counseling and self-discovery.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00B894] shrink-0" />
                    <span><strong>Multidisciplinary Integration:</strong> Blending technical aptitude with humanities and ethics.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00B894] shrink-0" />
                    <span><strong>Tier-2 &amp; Tier-3 Empowerment:</strong> Accessible vernacular AI for suburban polytechnics.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 rounded-2xl glass-strong border border-[var(--glass-border)] text-center">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] flex items-center justify-center mx-auto mb-4">
                  <Server className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-[var(--color-text)] mb-2">B2B Campus Edition</h4>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-6">
                  Deployable as an on-premise, containerized edge server inside campus computer networks with strict student privacy.
                </p>
                <a
                  href="mailto:info@baagupadu.com?subject=Campus%20Edition%20Institutional%20Inquiry"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-secondary)] hover:bg-[#5658d6] text-white text-xs font-bold transition-all shadow-md"
                >
                  <Mail className="w-4 h-4" /> Schedule Institutional Demo
                </a>
              </div>
            </div>
          </motion.section>

          {/* Call to Action Footer Card */}
          <motion.div
            variants={slideUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card p-10 sm:p-14 text-center rounded-[3rem] border border-[var(--color-secondary)]/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)]/15 via-[#FF6B8A]/10 to-[#00B894]/15 -z-10" />
            <h2 className="text-3xl sm:text-5xl font-black text-[var(--color-text)] mb-4 tracking-tight leading-tight">
              Begin Your Journey with a Friend <br className="hidden sm:block" />
              Who Truly Understands You.
            </h2>
            <p className="text-base sm:text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
              No judgment. No generic bullets. No corporate clichés. Just deep self-discovery, cultural empathy, and an actionable roadmap for your future.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/chat">
                <button className="px-8 py-4 rounded-full bg-[var(--color-text)] text-[var(--color-background)] font-bold text-base hover:bg-[var(--color-secondary)] hover:text-white transition-all shadow-xl hover:scale-105">
                  Start Your Conversation Free
                </button>
              </Link>
              <Link href="/how-it-works">
                <button className="px-8 py-4 rounded-full glass border border-[var(--glass-border)] text-[var(--color-text)] font-bold text-base hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                  See the 6 Discovery Phases
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <Footer />
      </main>
    </>
  );
}
