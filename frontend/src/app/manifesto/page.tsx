'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Quote, 
  ChevronRight, 
  ArrowRight,
  Flame
} from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { containerVariants, slideUpVariants } from '@/lib/utils/animations';

const TENETS = [
  {
    num: '01',
    title: 'Empathy Must Precede Instruction',
    statement: 'Nobody can receive wisdom when they feel judged, anxious, or unheard.',
    desc: 'The tech industry builds algorithms that immediately command: "Learn this course, solve this LeetCode problem, apply to these 50 jobs." But humans are not assembly-line components. Before a student can build a future, they must be given the emotional safety to acknowledge their doubts, familial pressures, and unspoken fears.',
  },
  {
    num: '02',
    title: 'Your Past Is Data, Not A Life Sentence',
    statement: 'Your mistakes in school, exam scores, or parental expectations do not dictate your ceiling.',
    desc: 'Too many Indian youths believe that an arbitrary rank in a standardized entrance test defines their intelligence forever. We treat your past as psychological data—revealing where your natural curiosities flared up, how you handled friction, and what values you developed—in order to rewrite your adult trajectory.',
  },
  {
    num: '03',
    title: 'We Refuse To Monetize Student Vulnerability',
    statement: 'Zero advertising. Zero data brokering. Absolute psychological privacy.',
    desc: 'Traditional edtech platforms monetize student anxiety by selling their contact details to high-pressure course sales boiler rooms. We consider this a moral betrayal. At Baagupadu, your reflections are scrubbed by automated PII filters, stored under strict encryption, and never weaponized for ads.',
  },
  {
    num: '04',
    title: 'Guidance Without Execution Is Just Entertainment',
    statement: 'Inspiration is fleeting. Sustainable life-betterment requires consistency.',
    desc: 'It is easy to generate inspirational quotes; it is difficult to build a career. Sahayam does not stop at warm words. It synthesizes your persona into concrete, week-by-week actionable execution compasses with measurable milestones, holding you accountable when your discipline wavers.',
  },
  {
    num: '05',
    title: 'Elite Mentorship Belongs In Every Tier 2 & Tier 3 Hometown',
    statement: 'A student in a rural polytechnic deserves the same caliber of guidance as someone in an elite metro.',
    desc: 'The geographic and socio-economic lottery should not determine who receives life-changing mentorship. We engineer Baagupadu to run vernacularly, cost-effectively, and frictionlessly—so every hungry mind can prosper.',
  },
];

export default function ManifestoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-start px-4 pt-24 sm:pt-28 pb-20 relative overflow-x-hidden">
        <motion.div
          className="w-full max-w-4xl relative z-10"
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
            <span className="text-[var(--color-text)]">The Founding Manifesto</span>
          </div>

          {/* Hero Header */}
          <div className="mb-16 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-500/20">
              <Flame className="w-3.5 h-3.5" />
              The Founding Declaration • October 2026
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--color-text)] mb-6 tracking-tight leading-[1.15]">
              The Manifesto for <br className="hidden sm:inline" />
              <span className="gradient-text">Purposeful Human Flourishing</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--color-text-muted)] leading-relaxed font-serif italic">
              &ldquo;A declaration against superficial AI chatbots, the commercialization of student anxiety, and the passive surrender of human potential.&rdquo;
            </p>
          </div>

          {/* Opening Statement Card */}
          <motion.div
            variants={slideUpVariants}
            className="p-8 sm:p-12 rounded-[2.5rem] mb-16 glass-strong border border-[var(--color-secondary)]/25 relative overflow-hidden text-left"
          >
            <Quote className="w-12 h-12 text-[var(--color-secondary)]/20 absolute top-8 right-8" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-6 tracking-tight">
              I. The Epidemic of Quiet Despair
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed">
              <p>
                Every year across India, over fifteen lakh engineering and graduate students walk out of college halls into an indifferent market. The prevailing narrative tells them they are &ldquo;unemployable,&rdquo; that they failed, that their effort was in vain.
              </p>
              <p>
                Nobody stops to ask: <em>When did anyone ever sit down with them to listen to who they actually were?</em>
              </p>
              <p>
                From age ten, our youth are funneled through grueling coaching factories. They are told what to memorize, what rank to covet, and what degree will satisfy family relatives. By age twenty-two, they have mastered exam syllabi, but they have never spent thirty minutes reflecting on what makes them come alive, where their genuine aptitudes lie, or how to navigate life when the rigid syllabus ends.
              </p>
              <p className="font-semibold text-[var(--color-text)]">
                We refuse to accept this quiet tragedy as inevitable.
              </p>
            </div>
          </motion.div>

          {/* Section II: Why Superficial AI Fails */}
          <motion.div variants={slideUpVariants} className="mb-16 text-left space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
              II. The Flaw of Superficial Chatbots
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              <p>
                When generative artificial intelligence emerged, Silicon Valley raced to build two categories of tools: <strong>transactional productivity bots</strong> that speed up repetitive labor, and <strong>superficial roleplay chatbots</strong> designed to trap user attention in trivial loops.
              </p>
              <p>
                Both failed to grasp the deeper human calling. A tool that only writes code faster does not tell an engineer whether they should be building systems, writing scientific papers, or leading organizations. A chatbot that only showers you with hollow flattery does not help you overcome procrastination, face your parents, or prepare for a grueling technical interview.
              </p>
              <p className="p-5 rounded-2xl glass border border-[var(--color-secondary)]/20 font-medium text-[var(--color-text)]">
                We believe an artificial intelligence companion must be <em>purposeful</em>. It must hold the memory of who you were at eight years old, how you felt at fifteen, and what promises you made to yourself at twenty.
              </p>
            </div>
          </motion.div>

          {/* Section III: The 5 Non-Negotiable Tenets */}
          <motion.div variants={slideUpVariants} className="mb-20 text-left">
            <div className="mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] block mb-2">
                Our Creed
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] tracking-tight">
                III. The Five Non-Negotiable Tenets
              </h2>
            </div>

            <div className="space-y-6">
              {TENETS.map((tenet) => (
                <div
                  key={tenet.num}
                  className="p-7 sm:p-9 rounded-[2rem] glass-card border border-black/5 dark:border-white/5 relative overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                    <span className="text-xs font-mono font-bold text-[var(--color-secondary)] px-2.5 py-1 rounded-md bg-[var(--color-secondary)]/10">
                      {tenet.num}
                    </span>
                    <h3 className="text-xl font-extrabold text-[var(--color-text)]">
                      {tenet.title}
                    </h3>
                  </div>
                  <p className="text-sm font-semibold text-[var(--color-text)] mb-3 italic">
                    &ldquo;{tenet.statement}&rdquo;
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {tenet.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Final Pledge & Signature */}
          <motion.div
            variants={slideUpVariants}
            className="p-8 sm:p-12 rounded-[2.5rem] mb-16 glass-strong border border-black/10 dark:border-white/10 text-left"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight">
              IV. The Promise of Baagupadu
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed mb-8">
              <p>
                To every student feeling lost in an overwhelming world: You are not defective. You are simply unmentored.
              </p>
              <p>
                We built Baagupadu to walk with you through the storm. To give you the courage to say <em>&ldquo;I do not know,&rdquo;</em> and the structured compass to figure it out step by step.
              </p>
              <p className="text-base sm:text-lg font-serif italic text-[var(--color-text)]">
                &ldquo;బాగుపడు&rdquo; is not just our name. It is our solemn promise to your future.
              </p>
            </div>

            <div className="pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="font-extrabold text-base text-[var(--color-text)]">Sreekar Reddy Pindi</div>
                <div className="text-xs text-[var(--color-text-muted)]">Co-Founder &amp; Chief AI Architect • Baagupadu Technologies</div>
                <div className="text-xs text-[var(--color-text-muted)]">Hyderabad, Telangana, India</div>
              </div>
              <div className="text-xs font-mono px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5 text-[var(--color-text-muted)]">
                October 2026 • Hyderabad
              </div>
            </div>
          </motion.div>

          {/* Bottom Action */}
          <div className="text-center">
            <Link href="/research">
              <button className="px-6 py-3 rounded-full bg-[var(--color-secondary)] hover:bg-[#5658d6] text-white text-sm font-bold shadow-md hover:shadow-xl transition-all inline-flex items-center gap-2 cursor-pointer">
                <span>Explore Our Cognitive Frameworks &amp; Research</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </motion.div>

        <Footer />
      </main>
    </>
  );
}
