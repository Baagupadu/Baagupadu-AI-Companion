'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Lock, 
  Compass, 
  ChevronRight,
  ArrowUpRight,
  GraduationCap
} from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { containerVariants, slideUpVariants } from '@/lib/utils/animations';

const SECTIONS = [
  { id: 'acceptance', title: '1. Acceptance of Terms & Eligibility' },
  { id: 'scope-service', title: '2. Scope of Service & Nature of AI' },
  { id: 'user-accounts', title: '3. Accounts & Authentication' },
  { id: 'acceptable-use', title: '4. Acceptable Use & AI Safety Rails' },
  { id: 'intellectual-property', title: '5. Intellectual Property & Ownership' },
  { id: 'campus-edition', title: '6. Institutional & Campus Pilot Terms' },
  { id: 'disclaimer-liability', title: '7. Disclaimers & Limitation of Liability' },
  { id: 'suspension-termination', title: '8. Account Suspension & Termination' },
  { id: 'governing-law', title: '9. Governing Law & Hyderabad Jurisdiction' },
  { id: 'contact-amendments', title: '10. Contact Information & Updates' },
];

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState('acceptance');

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
            <span className="text-[var(--color-text)]">Terms of Service</span>
          </div>

          {/* Hero Header */}
          <div className="mb-14 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider mb-4 border border-[var(--color-secondary)]/20">
              <FileText className="w-3.5 h-3.5" />
              Community Agreement &amp; Platform Terms
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--color-text)] mb-6 tracking-tight leading-[1.15]">
              Terms of Service &amp; <br className="hidden sm:inline" />
              <span className="gradient-text">User Agreement</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--color-text-muted)] max-w-3xl leading-relaxed mb-6">
              Welcome to <strong>Baagupadu</strong> (&quot;బాగుపడు&quot;). These Terms of Service set forth the rights, responsibilities, and legal principles governing your relationship with our autonomous AI companion platform.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[var(--color-text-muted)]">
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5">
                Effective Date: <strong>October 2026</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5 font-semibold text-[var(--color-secondary)]">
                Jurisdiction: Hyderabad, India
              </span>
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5">
                DPDP Act 2023 Aligned
              </span>
            </div>
          </div>

          {/* Key Summary Cards */}
          <motion.div variants={slideUpVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="glass-card p-6 rounded-2xl border border-[var(--color-secondary)]/20">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-[var(--color-text)] mb-2">Self-Discovery Focus</h2>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                Sahayam is an autonomous AI companion designed for personal clarity, self-betterment, and career exploration.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-emerald-500/20">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-[var(--color-text)] mb-2">You Own Your Reflections</h2>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                You retain complete ownership over your written thoughts, childhood memories, and career roadmaps generated on the platform.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-amber-500/20">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-[var(--color-text)] mb-2">Informational Disclaimer</h2>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                AI guidance does not replace certified psychological therapy, clinical psychiatric counsel, or guarantee university admissions.
              </p>
            </div>
          </motion.div>

          {/* Main Layout: Sticky Sidebar TOC + Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
            {/* Desktop Sticky Table of Contents Sidebar */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28">
              <div className="glass-card p-5 rounded-2xl border border-black/5 dark:border-white/5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-4 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  Table of Contents
                </h3>
                <nav className="space-y-1">
                  {SECTIONS.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={() => setActiveSection(sec.id)}
                      className={`block text-xs font-medium py-2 px-3 rounded-lg transition-colors ${
                        activeSection === sec.id
                          ? 'bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] font-bold'
                          : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>

                <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5">
                  <p className="text-[11px] text-[var(--color-text-muted)] mb-2 font-medium">
                    Questions regarding terms?
                  </p>
                  <a
                    href="mailto:contact@baagupadu.com"
                    className="text-xs font-semibold text-[var(--color-secondary)] hover:underline flex items-center gap-1"
                  >
                    <span>Contact Legal Team</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </aside>

            {/* Content Sections */}
            <div className="lg:col-span-8 space-y-12">
              {/* Section 1 */}
              <section id="acceptance" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <Scale className="w-7 h-7 text-[var(--color-secondary)] flex-shrink-0" />
                  <span>1. Acceptance of Terms &amp; Eligibility</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <p>
                    By registering for, accessing, or utilizing the services provided by <strong>Baagupadu Technologies</strong> (&quot;Baagupadu&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you acknowledge that you have read, understood, and agreed to be legally bound by these Terms of Service.
                  </p>
                  <p>
                    <strong>Eligibility:</strong> You must be at least 18 years of age to establish an independent personal account. If you are a student under 18 years of age (a &quot;Minor&quot; under Section 9 of the DPDP Act 2023), you may only use Baagupadu with verifiable consent from your parent or lawful guardian, or through an authorized educational institution participating in the Baagupadu Campus Edition pilot.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section id="scope-service" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <Sparkles className="w-7 h-7 text-indigo-500 flex-shrink-0" />
                  <span>2. Scope of Service &amp; Nature of AI Companion</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <p>
                    Baagupadu provides an autonomous artificial intelligence companion (&quot;Sahayam AI&quot;) designed to assist youth, students, and professionals in self-discovery, emotional pattern recognition, and educational roadmap planning.
                  </p>
                  
                  <div className="p-5 rounded-2xl glass-strong border border-amber-500/25 bg-amber-500/[0.03]">
                    <h3 className="text-sm font-bold text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      Statutory Informational Disclaimer
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                      Sahayam AI is an educational exploration and life-coaching tool. It is <strong>not</strong> a certified clinical psychologist, medical practitioner, psychiatric healthcare provider, or licensed career placement agency. Responses do not constitute medical, psychiatric, legal, or guaranteed commercial advice. If you are experiencing acute distress or a mental health crisis, please contact professional emergency hotlines (e.g., Tele-MANAS at 14416 in India).
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="user-accounts" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <Lock className="w-7 h-7 text-emerald-500 flex-shrink-0" />
                  <span>3. User Accounts &amp; Authentication</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <p>
                    User authentication is secured via Clerk.com utilizing enterprise-grade JSON Web Tokens (RS256 JWKS). You are responsible for maintaining the confidentiality of your credentials and all activities occurring under your account.
                  </p>
                  <p>
                    You agree to immediately notify Baagupadu at <a href="mailto:security@baagupadu.com" className="text-[var(--color-secondary)] hover:underline">security@baagupadu.com</a> if you suspect any unauthorized access or security breach.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section id="acceptable-use" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-rose-500/20 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <ShieldCheck className="w-7 h-7 text-rose-500 flex-shrink-0" />
                  <span>4. Acceptable Use &amp; AI Safety Guardrails</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <p>
                    To maintain psychological safety for all learners, you agree that you will <strong>NOT</strong>:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-[var(--color-text-muted)] pl-2">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0 mt-2" />
                      <span>Attempt prompt injection, adversarial jailbreaking, or system prompt exfiltration against Sahayam AI.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0 mt-2" />
                      <span>Use automated bots, scrapers, or scripts to harvest cognitive frameworks, question banks, or platform content.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0 mt-2" />
                      <span>Submit harmful, obscene, harassing, defamatory, or unlawful content in violation of the Information Technology Act 2000.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0 mt-2" />
                      <span>Reverse engineer, decompile, or create derivative works of the Baagupadu codebase or proprietary RAG architecture.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section id="intellectual-property" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <Building2 className="w-7 h-7 text-[var(--color-secondary)] flex-shrink-0" />
                  <span>5. Intellectual Property &amp; Content Ownership</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <div className="p-4 rounded-xl glass-strong border border-emerald-500/20">
                    <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                      Your Content Ownership:
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                      You retain full intellectual ownership of your personal reflections, journal inputs, and goals submitted to Baagupadu. We only process your content as necessary to provide companion guidance, and we do <strong>not</strong> claim ownership over your life story.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                    <h3 className="text-sm font-bold text-[var(--color-text)] mb-1">
                      Baagupadu Intellectual Property:
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                      All platform software, algorithms, Dynamic RAG pipelines, personality engines, cognitive models, visual branding, logos, and UI designs are the exclusive intellectual property of Baagupadu Technologies and its co-founders.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section id="campus-edition" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <GraduationCap className="w-7 h-7 text-indigo-500 flex-shrink-0" />
                  <span>6. Institutional &amp; Campus Edition Pilot Terms</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <p>
                    Educational institutions, colleges, and polytechnics deploying Baagupadu Campus Edition for student cohorts are governed by individualized Institutional Pilot Agreements and Data Processing Agreements (DPAs).
                  </p>
                  <p>
                    Participating institutions are responsible for ensuring lawful basis under the DPDP Act 2023 for enrolled student cohorts and facilitating parental notices where required for minor students.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section id="disclaimer-liability" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <AlertTriangle className="w-7 h-7 text-amber-500 flex-shrink-0" />
                  <span>7. Disclaimers &amp; Limitation of Liability</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <p>
                    THE PLATFORM IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE INDIAN LAW, BAAGUPADU TECHNOLOGIES AND ITS FOUNDERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF OR INABILITY TO USE THE PLATFORM.
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    In no event shall Baagupadu&apos;s total aggregate liability exceed the total amount paid by you to Baagupadu in the preceding twelve (12) months, or INR ₹1,000, whichever is greater.
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section id="suspension-termination" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <CheckCircle2 className="w-7 h-7 text-emerald-500 flex-shrink-0" />
                  <span>8. Account Suspension &amp; Termination</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <p>
                    You may terminate your account at any time by exercising your Right to Erasure in compliance with the DPDP Act 2023. Upon termination, all personal reflection records are purged from active production databases.
                  </p>
                  <p>
                    Baagupadu reserves the right to suspend or terminate access for users who repeatedly violate our Acceptable Use Policy or attempt adversarial security intrusions.
                  </p>
                </div>
              </section>

              {/* Section 9 */}
              <section id="governing-law" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <Scale className="w-7 h-7 text-indigo-500 flex-shrink-0" />
                  <span>9. Governing Law &amp; Hyderabad Jurisdiction</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <p>
                    These Terms of Service and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of the Republic of India.
                  </p>
                  <p>
                    The competent courts located in <strong>Hyderabad, Telangana, India</strong> shall have exclusive jurisdiction over any dispute, legal proceedings, or controversy arising out of these Terms or the use of Baagupadu.
                  </p>
                </div>
              </section>

              {/* Section 10 */}
              <section id="contact-amendments" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-[var(--color-secondary)]/20 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <Building2 className="w-7 h-7 text-[var(--color-secondary)] flex-shrink-0" />
                  <span>10. Contact Information &amp; Amendments</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <p>
                    We may update these Terms periodically to reflect evolving regulatory frameworks or platform capabilities. Material revisions will be prominently announced on our platform.
                  </p>
                  <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5 text-xs text-[var(--color-text-muted)] space-y-1">
                    <p className="font-semibold text-[var(--color-text)]">Baagupadu Technologies</p>
                    <p>Co-Founder: Sreekar Reddy Pindi • Hyderabad, Telangana, India</p>
                    <p>Legal &amp; Support Inquiries: <a href="mailto:contact@baagupadu.com" className="text-[var(--color-secondary)] hover:underline font-mono">contact@baagupadu.com</a></p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </motion.div>

        <Footer />
      </main>
    </>
  );
}
