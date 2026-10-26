'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight,
  Activity
} from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { containerVariants, slideUpVariants } from '@/lib/utils/animations';

const PHASES = [
  {
    phase: 'Phase 1',
    name: 'Psychological Safety & Trust Building',
    focus: 'De-escalating defense mechanisms & fostering vulnerability',
    desc: 'Before probing deep childhood memories or career anxieties, Sahayam builds rapport through active listening and unconditional positive regard, creating an unshakeable container of trust.',
  },
  {
    phase: 'Phase 2',
    name: 'Childhood (0-12) Blueprint',
    focus: 'Uncovering latent curiosities & foundational emotional habits',
    desc: 'Explores early play preferences, natural obsessions, and family expectations to identify intrinsic motivation patterns formed prior to standardized academic conditioning.',
  },
  {
    phase: 'Phase 3',
    name: 'Teenage (13-19) Identity Crossroads',
    focus: 'Academic stream pressures, peer comparisons & resilience',
    desc: 'Analyzes how the student navigated board exams, competitive entrance environments, and parental conflicts, extracting resilience markers and core personal values.',
  },
  {
    phase: 'Phase 4',
    name: 'Adult (20-30) Ambitions & Market Reality',
    focus: 'Vocational aptitudes, technical skills & economic goals',
    desc: 'Maps current college experiences, self-taught skills, and pragmatic career aspirations against real-world Indian and global technology market trajectories.',
  },
  {
    phase: 'Phase 5',
    name: 'Persona Synthesis & Actionable Compass',
    focus: 'Visual personality wheel & week-by-week execution roadmap',
    desc: 'Synthesizes multi-turn dialogue patterns into a coherent personal compass, establishing clear micro-milestones to bridge the gap between where the student is and where they want to go.',
  },
];

const AGENTS = [
  {
    name: 'Guardrail Agent',
    role: 'Input Sanitization & Penetration Shield',
    desc: 'Runs pre-execution adversarial testing to intercept prompt injection attempts, DAN exploits, and sanitizes Indian PII (phone, Aadhaar, PAN) via regex filters.',
  },
  {
    name: 'Planner Agent',
    role: 'Deterministic Strategy Generation',
    desc: 'Ingests user reflections and matches against Open Knowledge Format (OKF) psychological frameworks in gems/nenu_evaru/ to produce structured strategy plans.',
  },
  {
    name: 'Executor Agent',
    role: 'Empathetic & Socratic Synthesis',
    desc: 'Generates the companion dialogue following a strict cognitive triad formula: Empathetic Validation + Psychological Insight + Open Provocative Question.',
  },
  {
    name: 'Evaluator Agent',
    role: 'Non-Blocking Quality Scorer',
    desc: 'Executes async background evaluations computing ROUGE-L (factual grounding against retrieved knowledge) and Distinct-2 (lexical diversity to avoid repetitive loops).',
  },
  {
    name: 'Extractor Agent',
    role: 'Life-Stage Profile State Tracking',
    desc: 'Continuously extracts student markers, academic streams, emotional states, and milestones into a persistent PostgreSQL ProfileState entity.',
  },
];

export default function ResearchPage() {
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
            <span className="text-[var(--color-text)]">Cognitive Frameworks &amp; Research</span>
          </div>

          {/* Hero Header */}
          <div className="mb-14 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider mb-4 border border-[var(--color-secondary)]/20">
              <Cpu className="w-3.5 h-3.5" />
              Engineering Whitepaper • Cognitive AI Architecture
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--color-text)] mb-6 tracking-tight leading-[1.15]">
              Cognitive Frameworks &amp; <br className="hidden sm:inline" />
              <span className="gradient-text">Dynamic RAG Architecture</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--color-text-muted)] max-w-3xl leading-relaxed mb-6">
              A scientific whitepaper exploring how <strong>Baagupadu Technologies</strong> unifies developmental psychology, multi-agent cognitive orchestration, and vector retrieval to create an autonomous, empathetic companion that eliminates hallucinations and delivers grounded life roadmaps.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[var(--color-text-muted)]">
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5 font-mono">
                Author: <strong>Sreekar Reddy Pindi</strong> (Co-Founder &amp; AI Architect)
              </span>
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5 font-mono">
                Version: 1.0.0 (October 2026)
              </span>
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5">
                Classification: Public Engineering Specification
              </span>
            </div>
          </div>

          {/* Section 1: Dynamic RAG vs Fine-Tuning */}
          <motion.section
            variants={slideUpVariants}
            className="p-8 sm:p-12 rounded-[2.5rem] mb-16 glass-card border border-[var(--color-secondary)]/25 text-left relative overflow-hidden"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-secondary)] mb-3">
              Section 1 • Systems Engineering
            </div>
            <h2 className="text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight">
              Why Dynamic RAG Wins Over Static Fine-Tuning
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed mb-8">
              <p>
                In consumer AI, many teams attempt to fine-tune generative models directly on counseling conversations. At Baagupadu, we deliberately rejected this paradigm for three critical architectural reasons:
              </p>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--color-text)]">Zero Latency Data &amp; Curriculum Ingestion:</strong>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      Fine-tuned weights are static snapshots. When an Indian university alters its syllabus or an emerging tech role surges in demand, fine-tuned models require weeks of costly retraining. Dynamic RAG updates knowledge within milliseconds via pgvector ingestion.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--color-text)]">Elimination of Hallucinations in Life Guidance:</strong>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      Career counseling cannot afford generative fabrications. By binding responses strictly to verified psychological frameworks (Open Knowledge Format in <code className="text-[11px] font-mono bg-black/5 dark:bg-white/5 px-1 py-0.5 rounded">gems/nenu_evaru/</code>), hallucination rates drop to near zero.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--color-text)]">Complete Student Data Privacy:</strong>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      Personal student memories and reflections reside in isolated PostgreSQL user memory vaults, never baked permanently into shared neural network weights.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Reciprocal Rank Fusion Formula Callout */}
            <div className="p-6 rounded-2xl glass-strong border border-black/10 dark:border-white/10 font-mono text-xs sm:text-sm">
              <div className="text-xs font-sans font-bold uppercase tracking-wider text-[var(--color-secondary)] mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Memory Retrieval: Reciprocal Rank Fusion (RRF) Formula
              </div>
              <p className="text-[var(--color-text)] font-bold mb-3 font-mono text-center sm:text-left text-sm sm:text-base py-2">
                RRF_Score(d) = ∑ ( 1 / ( 60 + Rank_dense(d) ) ) + ( 1 / ( 60 + Rank_sparse(d) ) )
              </p>
              <p className="text-xs font-sans text-[var(--color-text-muted)] leading-relaxed">
                We fuse dense semantic vectors (<code className="text-[11px] font-mono">nomic-embed-text-v1.5</code> 768-dimensional embeddings) with sparse keyword retrieval (<code className="text-[11px] font-mono">to_tsvector</code> in PostgreSQL). Only the Top-4 highest-scoring memories are injected into active inference, eliminating prompt bloat and saving over 70% in token overhead.
              </p>
            </div>
          </motion.section>

          {/* Section 2: Multi-Agent LangGraph Cognitive Architecture */}
          <motion.section variants={slideUpVariants} className="mb-16 text-left">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] block mb-2">
                Section 2 • Multi-Agent Systems
              </span>
              <h2 className="text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
                LangGraph Cognitive Finite State Machine
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] mt-2 max-w-2xl">
                Rather than relying on a single monolithic prompt, Sahayam decomposes conversational cognition across an asynchronous LangGraph multi-agent pipeline.
              </p>
            </div>

            <div className="space-y-4">
              {AGENTS.map((agent, i) => (
                <div key={agent.name} className="p-6 rounded-2xl glass-card border border-black/5 dark:border-white/5 flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] flex items-center justify-center font-mono font-bold text-sm shrink-0">
                    0{i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                      <h3 className="text-base font-bold text-[var(--color-text)]">{agent.name}</h3>
                      <span className="text-xs font-medium text-[var(--color-secondary)] px-2 py-0.5 rounded-full bg-[var(--color-secondary)]/10 self-start sm:self-auto">
                        {agent.role}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {agent.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 3: The 5-Phase Psychological Discovery Journey */}
          <motion.section variants={slideUpVariants} className="mb-16 text-left">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] block mb-2">
                Section 3 • Cognitive Psychology
              </span>
              <h2 className="text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
                The 5-Phase Psychological Discovery Framework
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] mt-2 max-w-2xl">
                Grounding our inquiries in Bandura&apos;s Self-Efficacy Theory, Erikson&apos;s Psychosocial Stages, and Super&apos;s Life-Span Career Model.
              </p>
            </div>

            <div className="space-y-4">
              {PHASES.map((p) => (
                <div key={p.phase} className="p-6 rounded-2xl glass-card border border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-secondary)] px-2 py-0.5 rounded bg-[var(--color-secondary)]/10 font-mono">
                      {p.phase}
                    </span>
                    <h3 className="text-lg font-bold text-[var(--color-text)]">{p.name}</h3>
                  </div>
                  <div className="text-xs font-semibold text-[var(--color-text)] mb-2 italic">
                    Focus: {p.focus}
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 4: Automated Quality & Evaluation Benchmarks */}
          <motion.section
            variants={slideUpVariants}
            className="p-8 sm:p-10 rounded-[2.5rem] mb-16 glass-strong border border-black/5 dark:border-white/5 text-left"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] block mb-2">
              Section 4 • Continuous Quality Auditing
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight">
              Automated NLP Evaluation Benchmarks
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6">
              To guarantee that responses remain both factually grounded and emotionally distinct across extended sessions, our background Evaluator Agent computes two real-time metrics per conversation turn:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl glass border border-black/5 dark:border-white/5">
                <h3 className="text-base font-bold text-[var(--color-text)] mb-1">ROUGE-L Knowledge Grounding</h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  Measures longest common subsequence overlap between the companion&apos;s response and retrieved Open Knowledge Format rules to ensure guidance is anchored in vetted psychology rather than ungrounded intuition.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass border border-black/5 dark:border-white/5">
                <h3 className="text-base font-bold text-[var(--color-text)] mb-1">Distinct-2 Lexical Diversity</h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  Calculates the ratio of unique bi-grams to total bi-grams. If Distinct-2 falls below 0.65, the system flags robotic repetition and dynamically adjusts the generation temperature.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Research Inquiries & Citations */}
          <div className="p-8 rounded-3xl glass-card border border-black/5 dark:border-white/5 text-left">
            <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">
              Academic Collaboration &amp; Whitepaper Inquiries
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
              Universities, AI labs, and developmental psychology researchers interested in citing our Dynamic RAG findings or partnering on youth self-discovery studies can reach out directly to the research office.
            </p>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <a href="mailto:info@baagupadu.com?subject=Research%20Collaboration%20Inquiry" className="text-[var(--color-secondary)] hover:underline flex items-center gap-1 font-mono">
                info@baagupadu.com
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>

        <Footer />
      </main>
    </>
  );
}
