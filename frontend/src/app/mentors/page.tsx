'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Brain, Compass, Target, BookOpen, Mail } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { containerVariants, slideUpVariants } from '@/lib/utils/animations';

const TRAITS = [
  { label: 'Close Friend', percentage: 40, color: '#FF6B8A', icon: <Heart className="w-5 h-5 text-white" />, desc: 'Offers empathy, non-judgmental support, and psychological safety.' },
  { label: 'Mentor', percentage: 25, color: '#6C3CE1', icon: <Brain className="w-5 h-5 text-white" />, desc: 'Shares wisdom, recognizes overarching patterns, and guides long-term vision.' },
  { label: 'Curious Explorer', percentage: 20, color: '#00CEC9', icon: <Compass className="w-5 h-5 text-white" />, desc: 'Asks deep, probing questions to uncover hidden strengths and interests.' },
  { label: 'Career Coach', percentage: 10, color: '#FFB84D', icon: <Target className="w-5 h-5 text-white" />, desc: 'Provides actionable accountability and strict guidance when discipline drops.' },
  { label: 'Storyteller', percentage: 5, color: '#6DD5B8', icon: <BookOpen className="w-5 h-5 text-white" />, desc: 'Weaves your experiences into a cohesive, empowering personal narrative.' },
];

const FUTURE_MODULES = [
  { id: 'm1', title: '"Ekkadiki Vellali?"', translation: '(Career Direction)', desc: 'Advanced AI mapping connecting your synthesized persona to real-world career trajectories and industry demands.', status: 'In Development' },
  { id: 'm2', title: '"Ela Penchukovali?"', translation: '(Skill Development)', desc: 'Personalized curriculum generation to bridge the gap between your current skills and your ideal career path.', status: 'Upcoming' },
  { id: 'm3', title: '"Em Chesi?"', translation: '(Life Planning)', desc: 'Holistic lifestyle and financial goal integration to ensure your career aligns with your broader life vision.', status: 'Upcoming' },
];

export default function MentorsPage() {
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
          <div className="text-center max-w-4xl mx-auto mb-24 px-4 mt-8">
            <motion.h1 variants={slideUpVariants} className="text-5xl md:text-7xl font-extrabold text-[var(--color-text)] mb-6 tracking-tight leading-[1.1]">
              Meet <span className="gradient-text">Sahayam.</span>
            </motion.h1>
            <motion.p variants={slideUpVariants} className="text-xl text-[var(--color-text-muted)] leading-relaxed max-w-2xl mx-auto">
              More than a chatbot. Sahayam is a meticulously engineered autonomous AI companion and empathetic AI friend that adapts to your emotional state—acting as a loyal friend when you need psychological safety, and a coach when you need accountability.
            </motion.p>
          </div>

          {/* Personality Blend */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-32"
          >
            <div className="text-center max-w-3xl mx-auto mb-16 px-4">
              <motion.h2 variants={slideUpVariants} className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
                The Personality Blend
              </motion.h2>
              <motion.p variants={slideUpVariants} className="text-lg text-[var(--color-text-muted)]">
                The exact psychological architecture powering your personal mentor.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TRAITS.map((trait) => (
                <motion.div
                  key={trait.label}
                  variants={slideUpVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/70 backdrop-blur-md p-8 rounded-[2rem] border border-[var(--color-surface)] shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl shadow-sm" style={{ backgroundColor: trait.color }}>
                      {trait.icon}
                    </div>
                    <div className="text-3xl font-black opacity-20" style={{ color: trait.color }}>
                      {trait.percentage}%
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-text)] mb-3">{trait.label}</h3>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    {trait.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Dynamic Persona Modes Deep Dive */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-32 text-left"
          >
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] block mb-2">
                Conversational Architecture
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text)] tracking-tight">
                How Sahayam Adapts to Your Emotional State
              </h2>
              <p className="text-base text-[var(--color-text-muted)] mt-3 leading-relaxed">
                Most AI tools treat every conversation as a transactional prompt-and-response loop. Sahayam operates as a stateful, autonomous companion that dynamically adjusts its conversational persona depending on whether you need psychological reassurance or strict execution discipline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-7 rounded-3xl glass-card border border-black/5 dark:border-white/5 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FF6B8A]/10 text-[#FF6B8A] flex items-center justify-center mb-5">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Empathetic Confidant</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                    When you are overwhelmed by exam stress, family pressure, or career uncertainty, Sahayam activates an emotionally safe sounding board. It listens without judgment and helps you decompress vulnerability before attempting solutions.
                  </p>
                </div>
                <div className="text-xs font-semibold text-[#FF6B8A] bg-[#FF6B8A]/10 px-3 py-1.5 rounded-full w-fit">
                  Focus: Psychological Safety
                </div>
              </div>

              <div className="p-7 rounded-3xl glass-card border border-black/5 dark:border-white/5 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FFB84D]/10 text-[#FFB84D] flex items-center justify-center mb-5">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Accountability Coach</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                    When motivation dips and procrastination sets in, Sahayam steps up as a firm accountability coach. It breaks daunting roadmaps into bite-sized daily habits and tracks whether you followed through on your self-declared commitments.
                  </p>
                </div>
                <div className="text-xs font-semibold text-[#FFB84D] bg-[#FFB84D]/10 px-3 py-1.5 rounded-full w-fit">
                  Focus: Execution &amp; Discipline
                </div>
              </div>

              <div className="p-7 rounded-3xl glass-card border border-black/5 dark:border-white/5 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#6C3CE1]/10 text-[#6C3CE1] flex items-center justify-center mb-5">
                    <Brain className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Strategic Mentor</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                    For long-term horizon planning, Sahayam draws upon cognitive frameworks and skill-gap architectures to help you navigate college placements, engineering specializations, and industry career transitions.
                  </p>
                </div>
                <div className="text-xs font-semibold text-[#6C3CE1] bg-[#6C3CE1]/10 px-3 py-1.5 rounded-full w-fit">
                  Focus: Long-term Trajectory
                </div>
              </div>
            </div>

            {/* Early Access Pilot Callout */}
            <div className="p-8 rounded-3xl glass-strong border border-[var(--color-secondary)]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] block mb-1">
                  Pilot Program Status
                </span>
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">
                  Experience Sahayam in Early Access Pilot
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  Baagupadu is currently conducting private pilot evaluations with students and educational institutions. Reach out to join upcoming cohort access or explore institutional partnership.
                </p>
              </div>
              <a
                href="mailto:info@baagupadu.com?subject=Mentorship%20Pilot%20Inquiry"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--color-secondary)] hover:bg-[#5658d6] text-white text-sm font-bold shadow-md hover:shadow-xl transition-all shrink-0 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Request Pilot Access</span>
              </a>
            </div>
          </motion.div>

          {/* Future Modules Roadmap */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="glass-card p-10 md:p-16 rounded-[3rem] relative overflow-hidden mb-20"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A] to-[#1E293B] -z-10" />
            
            <div className="text-center max-w-3xl mx-auto mb-16 px-4">
              <motion.h2 variants={slideUpVariants} className="text-3xl md:text-4xl font-bold text-white mb-4">
                The Future of Mentorship
              </motion.h2>
              <motion.p variants={slideUpVariants} className="text-lg text-slate-300">
                The &ldquo;Nenu Evaru?&rdquo; (Who Am I?) module is just the beginning. The Baagupadu ecosystem is expanding into a comprehensive career architecture.
              </motion.p>
            </div>

            <div className="space-y-6">
              {FUTURE_MODULES.map((mod) => (
                <motion.div 
                  key={mod.id}
                  variants={slideUpVariants}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors gap-6"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-white">{mod.title}</h3>
                      <span className="text-[var(--color-secondary)] font-medium">{mod.translation}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed max-w-2xl">
                      {mod.desc}
                    </p>
                  </div>
                  <div className="px-4 py-2 rounded-full border border-slate-500 text-slate-300 text-sm font-semibold whitespace-nowrap">
                    {mod.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>

        <Footer />
      </main>
    </>
  );
}

