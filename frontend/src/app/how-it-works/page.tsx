'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layers, Fingerprint, MapPin, Compass, Search, Target, HelpCircle, Mail, Sparkles, ArrowRight } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { containerVariants, slideUpVariants } from '@/lib/utils/animations';

const PHASES = [
  {
    id: 'trust-building',
    phase: 'Phase 1',
    title: 'Trust Building',
    focus: 'Psychological Safety',
    desc: 'We start with a warm welcome. Sahayam creates a safe, judgment-free space so you can open up without fear.',
    icon: <HeartHandshakeIcon className="w-8 h-8 text-[#FF6B8A]" />,
  },
  {
    id: 'childhood',
    phase: 'Phase 2',
    title: 'Childhood (0-12)',
    focus: 'Core Emotional Blueprint',
    desc: 'Exploring your early family dynamics, curiosity, and play to understand the foundational patterns that shaped you.',
    icon: <Fingerprint className="w-8 h-8 text-[#6C3CE1]" />,
  },
  {
    id: 'teenage',
    phase: 'Phase 3',
    title: 'Teenage (13-19)',
    focus: 'Identity & Resilience',
    desc: 'We dive into your identity formation, friendships, and core values developed during your most transformative years.',
    icon: <Compass className="w-8 h-8 text-[#00B894]" />,
  },
  {
    id: 'adult',
    phase: 'Phase 4',
    title: 'Adult (20-30)',
    focus: 'Ambition & Growth',
    desc: 'Connecting the dots between your adult career experiences, skills, purpose, and current life state.',
    icon: <MapPin className="w-8 h-8 text-[#FFB84D]" />,
  },
  {
    id: 'persona-synthesis',
    phase: 'Phase 5',
    title: 'Synthesis',
    focus: 'Comprehensive Persona',
    desc: 'Sahayam weaves together the patterns from your past to reveal a profound, synthesized understanding of who you are.',
    icon: <Layers className="w-8 h-8 text-[#00CEC9]" />,
  },
  {
    id: 'guidance',
    phase: 'Phase 6',
    title: 'Guidance Delivery',
    focus: 'Actionable Roadmap',
    desc: 'We translate your deep self-knowledge into a concrete, personalized career roadmap with clear action steps.',
    icon: <Target className="w-8 h-8 text-[#6DD5B8]" />,
  },
];

// Helper icon
function HeartHandshakeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
      <path d="m18 15-2-2" />
      <path d="m15 18-2-2" />
    </svg>
  );
}

export default function HowItWorksPage() {
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-start px-4 py-24 overflow-x-hidden relative">
        <motion.div
          className="w-full max-w-6xl relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: yOffset }}
        >
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-32 px-4 mt-8">
            <motion.div variants={slideUpVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-600 font-semibold text-sm mb-6">
              <Search className="w-4 h-4" />
              The Information Paradox
            </motion.div>
            <motion.h1 variants={slideUpVariants} className="text-5xl md:text-6xl font-extrabold text-[var(--color-text)] mb-6 tracking-tight leading-[1.1]">
              Knowledge without clarity <br className="hidden md:block"/> is just <span className="gradient-text">noise.</span>
            </motion.h1>
            <motion.p variants={slideUpVariants} className="text-xl text-[var(--color-text-muted)] leading-relaxed mb-10">
              The internet gave us unlimited access to educational content, but it produced an &ldquo;Information Paradox&rdquo;—leaving you with decision paralysis and shallow learning. Baagupadu cuts through the noise by starting with the most important subject: <strong>You.</strong>
            </motion.p>
          </div>

          {/* 6-Phase Journey Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-32"
          >
            <div className="text-center max-w-3xl mx-auto mb-16 px-4">
              <motion.h2 variants={slideUpVariants} className="text-3xl md:text-5xl font-bold text-[var(--color-text)] mb-4 tracking-tight">
                The 6-Phase Discovery Journey
              </motion.h2>
              <motion.p variants={slideUpVariants} className="text-lg text-[var(--color-text-muted)]">
                We replace boring surveys with deep, empathetic conversations. Sahayam guides you through your past to illuminate your future.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
              {PHASES.map((phase, i) => (
                <motion.div
                  id={phase.id}
                  key={phase.title}
                  variants={slideUpVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white/70 backdrop-blur-md p-8 rounded-[2rem] border border-[var(--color-surface)] shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-8xl font-black text-[var(--color-secondary)]">{i + 1}</span>
                  </div>
                  
                  <div className="mb-6 p-4 rounded-2xl w-fit bg-[var(--color-surface)] shadow-sm relative z-10">
                    {phase.icon}
                  </div>
                  <div className="inline-block px-3 py-1 bg-[var(--color-surface)] text-[var(--color-text-muted)] text-xs font-bold rounded-full mb-4 uppercase tracking-widest relative z-10">
                    {phase.phase}
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-text)] mb-2 relative z-10">{phase.title}</h3>
                  <h4 className="text-sm font-semibold text-[var(--color-secondary)] mb-4 uppercase tracking-wide relative z-10">{phase.focus}</h4>
                  <p className="text-[var(--color-text-muted)] leading-relaxed relative z-10">
                    {phase.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Engine Description */}
          <motion.div
            variants={slideUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card p-12 text-center rounded-[3rem] mb-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)]/10 to-[#6DD5B8]/10 -z-10" />
            <h2 className="text-4xl font-extrabold text-[var(--color-text)] mb-6">Powered by the <span className="text-[var(--color-secondary)]">&ldquo;Nenu Evaru?&rdquo;</span> Engine</h2>
            <p className="text-lg text-[var(--color-text-muted)] max-w-3xl mx-auto mb-10 leading-relaxed">
              &ldquo;Nenu Evaru?&rdquo; (Telugu for &ldquo;Who Am I?&rdquo;) is our foundational AI framework. It dynamically adapts its conversational tone to match your emotional state, identifying patterns in your history to generate a deeply personalized career synthesis.
            </p>
            <Link href="/chat">
              <button className="px-8 py-4 rounded-full bg-[var(--color-text)] text-white font-bold text-lg hover:bg-[var(--color-secondary)] transition-colors shadow-2xl">
                Experience the Journey
              </button>
            </Link>
          </motion.div>

          {/* Technical Architecture: Dynamic RAG vs Fine-Tuning */}
          <motion.div
            variants={slideUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card p-10 md:p-12 text-left rounded-[3rem] mb-20 relative overflow-hidden border border-[var(--color-secondary)]/15"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider mb-4">
              AI System Architecture • Engineering Whitepaper
            </div>
            <h3 className="text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight">
              Why Baagupadu&apos;s AI Companion Uses Dynamic RAG Over Fine-Tuning
            </h3>
            <p className="text-[var(--color-text-muted)] text-[16px] leading-relaxed mb-8 max-w-3xl">
              Co-founded and architected by <strong className="text-[var(--color-text)]">Sreekar Reddy Pindi</strong> and the founding team in Hyderabad, Baagupadu (&ldquo;బాగుపడు&rdquo; - to improve and prosper) leverages a decoupled, multi-agent cognitive architecture combining <strong>Dynamic Retrieval-Augmented Generation (RAG)</strong> with pgvector embeddings rather than static parameter fine-tuning.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl glass-strong border border-black/5 dark:border-white/5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold mb-4">
                  01
                </div>
                <h4 className="text-lg font-bold text-[var(--color-text)] mb-2">Real-Time Data &amp; Context Updates</h4>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                  Unlike traditional model fine-tuning that bakes static knowledge into model weights, Dynamic RAG allows the companion to pull the most recent user context, emotional cues, and institutional college curriculums dynamically without expensive retraining cycles.
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-strong border border-black/5 dark:border-white/5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold mb-4">
                  02
                </div>
                <h4 className="text-lg font-bold text-[var(--color-text)] mb-2">Strict Hallucination Control</h4>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                  By anchoring companion dialogues directly to a verifiable knowledge base of cognitive psychology frameworks and student memory vaults, the system eliminates hallucinations common in purely fine-tuned generative models.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Spotlight Bridge to Companion Deep Dive */}
          <motion.div
            variants={slideUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card p-8 sm:p-10 rounded-[2.5rem] mb-20 border border-[var(--color-secondary)]/25 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[var(--color-secondary)]/10 via-[#FF6B8A]/5 to-[#00B894]/10"
          >
            <div className="max-w-xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Comprehensive Architecture &amp; Philosophy Whitepaper
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight mb-2">
                The Purposeful AI Companion Deep Dive
              </h3>
              <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
                Explore our full manifesto on why Sahayam never gives preachy advice, our 4-D longitudinal modeling of culture and lifestyle habits, IT standards (DPDP Act 2023, ISO 42001), and market comparative analysis.
              </p>
            </div>
            <Link href="/companion" className="shrink-0">
              <button className="px-6 py-3.5 rounded-full bg-[var(--color-secondary)] hover:bg-[#5658d6] text-white font-bold text-sm transition-all shadow-md hover:shadow-xl flex items-center gap-2 group">
                Read Full Deep Dive
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>

          {/* Direct Answers & Foundational Concepts (AEO) */}
          <motion.section
            variants={slideUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 text-left rounded-[3rem] mb-20 relative overflow-hidden border border-[var(--color-secondary)]/15"
            id="frequently-asked-questions"
          >
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider mb-3">
                <HelpCircle className="w-3.5 h-3.5" />
                Frequently Explored Concepts • Direct Answers
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] tracking-tight">
                Understanding Baagupadu &amp; AI Companionship
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-text-muted)] mt-2 leading-relaxed">
                Concise, factual explanations addressing how our autonomous companion operates, how it differs from traditional chatbots, and our current operational stage.
              </p>
            </div>

            <div className="space-y-6">
              {/* Question 1: What is Baagupadu? */}
              <div className="p-6 md:p-8 rounded-2xl glass-strong border border-black/5 dark:border-white/5">
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">
                  What is Baagupadu?
                </h3>
                <p className="text-[var(--color-text)] font-medium text-sm sm:text-base leading-relaxed mb-3 bg-[var(--color-secondary)]/5 p-4 rounded-xl border border-[var(--color-secondary)]/10">
                  Baagupadu (బాగుపడు) is an autonomous AI companion platform engineered in Hyderabad, India, designed to help youth, students, and professionals achieve emotional clarity, self-discovery, and actionable career roadmaps. Powered by its conversational engine Sahayam, the platform guides users through an empathetic exploration of their formative life stages to synthesize a personalized vocational and life compass.
                </p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  Named after the culturally revered Telugu blessing meaning &ldquo;to improve oneself, uplift your life, and flourish,&rdquo; Baagupadu replaces superficial conversational banter with grounded psychological inquiry and structured milestone planning.
                </p>
              </div>

              {/* Question 2: AI Companion vs Chatbot */}
              <div className="p-6 md:p-8 rounded-2xl glass-strong border border-black/5 dark:border-white/5">
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">
                  What is a personalized AI companion, and how does it differ from a chatbot?
                </h3>
                <p className="text-[var(--color-text)] font-medium text-sm sm:text-base leading-relaxed mb-3 bg-[var(--color-secondary)]/5 p-4 rounded-xl border border-[var(--color-secondary)]/10">
                  A personalized AI companion is a stateful conversational system with persistent memory and emotional intelligence designed to support an individual&apos;s personal growth over time. While standard chatbots are stateless, transactional, and answer isolated one-off prompts within a single session, an AI companion remembers emotional context across interactions, recognizes recurring behavioral patterns, and adapts its guidance to the user&apos;s evolving goals.
                </p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  Rather than treating every conversation as a blank slate, Baagupadu retains longitudinal context across multiple life stages—connecting past curiosities and challenges directly to future opportunities.
                </p>
              </div>

              {/* Question 3: Contextual AI Personalization */}
              <div className="p-6 md:p-8 rounded-2xl glass-strong border border-black/5 dark:border-white/5">
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">
                  What is contextual AI personalization?
                </h3>
                <p className="text-[var(--color-text)] font-medium text-sm sm:text-base leading-relaxed mb-3 bg-[var(--color-secondary)]/5 p-4 rounded-xl border border-[var(--color-secondary)]/10">
                  Contextual AI personalization is the system&apos;s ability to ground every response in the user&apos;s specific history, past reflections, and emotional state rather than generic statistical averages. Baagupadu achieves this through a Dynamic Retrieval-Augmented Generation (RAG) multi-agent pipeline built on LangGraph and PostgreSQL with pgvector, retrieving only relevant memory fragments at inference time to prevent hallucinations and maintain conversational continuity.
                </p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  By decoupling user memories from model weights, the system adapts instantly whenever a user reflects on a new aspiration or milestone, avoiding costly retraining cycles.
                </p>
              </div>

              {/* Question 4: Culturally Aware AI */}
              <div className="p-6 md:p-8 rounded-2xl glass-strong border border-black/5 dark:border-white/5">
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">
                  What does culturally aware AI mean?
                </h3>
                <p className="text-[var(--color-text)] font-medium text-sm sm:text-base leading-relaxed mb-3 bg-[var(--color-secondary)]/5 p-4 rounded-xl border border-[var(--color-secondary)]/10">
                  Culturally aware AI means recognizing the distinct socio-academic realities of Indian students—including familial expectations, competitive exam pressures (JEE, NEET, GATE), campus placement anxiety, and tier-2/3 college opportunities—without imposing Western clinical assumptions or generic corporate clichés.
                </p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  In India, career choices are closely tied to familial dignity and economic realities. Sahayam acknowledges these factors empathetically, helping users navigate pragmatic compromises and constructive conversations with parents.
                </p>
              </div>

              {/* Question 5: Development Stage */}
              <div className="p-6 md:p-8 rounded-2xl glass-strong border border-black/5 dark:border-white/5">
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">
                  What is Baagupadu&apos;s current development stage?
                </h3>
                <p className="text-[var(--color-text)] font-medium text-sm sm:text-base leading-relaxed mb-3 bg-[var(--color-secondary)]/5 p-4 rounded-xl border border-[var(--color-secondary)]/10">
                  Baagupadu is currently in an early-access preview and private pilot stage. The core conversational architecture and self-discovery modules are actively being evaluated and refined through pilot programs with students, mentors, and select academic partners in India.
                </p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  Interactive demonstrations are available to pilot participants while the platform prepares for broader cohort rollout.
                </p>
              </div>

              {/* Question 6: Intended Use Cases */}
              <div className="p-6 md:p-8 rounded-2xl glass-strong border border-black/5 dark:border-white/5">
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">
                  What are the intended use cases for Baagupadu?
                </h3>
                <p className="text-[var(--color-text)] font-medium text-sm sm:text-base leading-relaxed mb-3 bg-[var(--color-secondary)]/5 p-4 rounded-xl border border-[var(--color-secondary)]/10">
                  Baagupadu is engineered for three primary use cases: (1) youth and college students navigating career confusion, imposter syndrome, and placement readiness; (2) early-career professionals seeking alignment between their core values and vocational trajectory; and (3) educational institutions seeking an empathetic guidance layer to complement overburdened campus counseling resources.
                </p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  The system serves as a confidential sounding board, habit accountability coach, and reflective mentor throughout these transitions.
                </p>
              </div>

              {/* Question 7: Contact */}
              <div className="p-6 md:p-8 rounded-2xl glass-strong border border-black/5 dark:border-white/5">
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">
                  How can interested users and institutions contact the team?
                </h3>
                <p className="text-[var(--color-text)] font-medium text-sm sm:text-base leading-relaxed mb-3 bg-[var(--color-secondary)]/5 p-4 rounded-xl border border-[var(--color-secondary)]/10">
                  Interested individuals, pilot participants, educators, and institutional partners can reach the team directly via email at <a href="mailto:info@baagupadu.com" className="text-[var(--color-secondary)] font-semibold underline underline-offset-4">info@baagupadu.com</a>, or contact co-founder and AI architect Sreekar Reddy Pindi at <a href="mailto:sreekar.pindi@baagupadu.com" className="text-[var(--color-secondary)] font-semibold underline underline-offset-4">sreekar.pindi@baagupadu.com</a>.
                </p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[var(--color-secondary)] shrink-0" />
                  Headquarters: Hyderabad, Telangana, India. Inquiries are typically reviewed within 24–48 hours.
                </p>
              </div>
            </div>
          </motion.section>

        </motion.div>

        <Footer />
      </main>
    </>
  );
}

