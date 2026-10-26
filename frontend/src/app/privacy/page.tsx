'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  FileText, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  Cpu, 
  Server, 
  Mail, 
  Building2, 
  ChevronRight, 
  Trash2, 
  Search,
  Scale,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { containerVariants, slideUpVariants } from '@/lib/utils/animations';

const SECTIONS = [
  { id: 'introduction', title: '1. Introduction & Entity Details' },
  { id: 'legal-framework', title: '2. Statutory Legal Framework' },
  { id: 'data-collection', title: '3. Data We Collect & What We Reject' },
  { id: 'pii-scrubbing', title: '4. Automated PII Redaction Engine' },
  { id: 'minor-protection', title: '5. Protection of Minors (Section 9)' },
  { id: 'data-principal-rights', title: '6. Your Rights & Data Erasure' },
  { id: 'ai-transparency', title: '7. AI Governance & Companion Ethics' },
  { id: 'security-retention', title: '8. Security & CERT-In Log Retention' },
  { id: 'sub-processors', title: '9. Infrastructure & Sub-Processors' },
  { id: 'grievance-redressal', title: '10. DPO & Grievance Redressal' },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('introduction');

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
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-6">
            <Link href="/" className="hover:text-[var(--color-secondary)] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[var(--color-text)]">Privacy Policy</span>
          </div>

          {/* Hero Header */}
          <div className="mb-14 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Statutory Privacy &amp; Data Governance Specification
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--color-text)] mb-6 tracking-tight leading-[1.15]">
              Privacy Policy &amp; <br className="hidden sm:inline" />
              <span className="gradient-text">Data Protection Framework</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--color-text-muted)] max-w-3xl leading-relaxed mb-6">
              Baagupadu is engineered on the principle that self-discovery requires absolute psychological safety. We strictly adhere to India&apos;s <strong>Digital Personal Data Protection (DPDP) Act 2023</strong>, the <strong>Information Technology Act 2000</strong>, and <strong>CERT-In cybersecurity directives</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[var(--color-text-muted)]">
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5">
                Last Updated: <strong>October 2026</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5 text-emerald-600 dark:text-emerald-400 font-semibold">
                ✓ DPDP Act 2023 Enforced
              </span>
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5">
                Section 9 Minor Protected
              </span>
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5">
                Zero Third-Party Ad Trackers
              </span>
            </div>
          </div>

          {/* Key Commitments Callout Banner */}
          <motion.div
            variants={slideUpVariants}
            className="p-6 sm:p-8 rounded-3xl mb-14 glass-strong border border-emerald-500/25 bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-indigo-500/[0.04]"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-[var(--color-text)] mb-2">
                  Our Uncompromising Privacy Commitments (TL;DR)
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-[var(--color-text-muted)] mt-3">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span><strong>No Sale of Data:</strong> We never monetize, rent, or trade your journal entries or career roadmaps.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span><strong>Active PII Scrubbing:</strong> Phone numbers, Aadhaar, PAN, and emails are scrubbed before LLM dispatch.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span><strong>Minor Non-Tracking (Sec 9):</strong> Zero behavioral tracking or advertising targeted at students under 18.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span><strong>Right to Erasure:</strong> You can permanently purge your entire profile and chat history on demand.</span>
                  </li>
                </ul>
              </div>
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
                    Questions or formal DSAR requests?
                  </p>
                  <a
                    href="mailto:privacy@baagupadu.com"
                    className="text-xs font-semibold text-[var(--color-secondary)] hover:underline flex items-center gap-1"
                  >
                    <span>Contact Privacy Team</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </aside>

            {/* Content Sections */}
            <div className="lg:col-span-8 space-y-12">
              {/* Section 1 */}
              <section id="introduction" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <Building2 className="w-7 h-7 text-[var(--color-secondary)] flex-shrink-0" />
                  <span>1. Introduction &amp; Entity Details</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <p>
                    This Privacy Policy constitutes a legally binding agreement between you (the &quot;Data Principal&quot;, &quot;User&quot;, or &quot;Student&quot;) and <strong>Baagupadu Technologies</strong> (&quot;Baagupadu&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), an Indian technology enterprise co-founded and architected by <strong>Sreekar Reddy Pindi</strong> in Hyderabad, Telangana, India.
                  </p>
                  <p>
                    This policy governs your access to and use of <code className="text-xs px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 font-mono">baagupadu.com</code>, our conversational autonomous AI companion engine (&quot;Sahayam AI&quot;), student reflective journals, career roadmap synthesizers, and educational institutional pilot programs (Campus Edition).
                  </p>
                  <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5 text-xs text-[var(--color-text-muted)]">
                    <p className="font-semibold text-[var(--color-text)] mb-1">Corporate Registration &amp; Operating Headquarters:</p>
                    <p>Baagupadu Technologies • Hyderabad, Telangana, India • Email: <a href="mailto:contact@baagupadu.com" className="text-[var(--color-secondary)] hover:underline">contact@baagupadu.com</a></p>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section id="legal-framework" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <Scale className="w-7 h-7 text-indigo-500 flex-shrink-0" />
                  <span>2. Statutory Legal Framework</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <p>
                    Baagupadu operates under strict compliance with the statutory legal doctrines of the Republic of India:
                  </p>
                  <ul className="space-y-3 pl-2">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[var(--color-text)]">Digital Personal Data Protection (DPDP) Act 2023 (Act No. 22 of 2023):</strong>
                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                          Enforcing lawful grounds for processing digital personal data, verifiable parental consent for minors, purpose limitation, and statutory rights of Data Principals.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[var(--color-text)]">Information Technology Act 2000 &amp; IT Rules 2011:</strong>
                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                          Governing reasonable security practices and procedures for sensitive personal data or information (SPDI).
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[var(--color-text)]">CERT-In Cybersecurity Directives (Section 70B(6) IT Act):</strong>
                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                          Mandatory secure logging, 180-day audit log retention within Indian territorial jurisdiction, and immediate incident notification.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section id="data-collection" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <EyeOff className="w-7 h-7 text-rose-500 flex-shrink-0" />
                  <span id="data-protection">3. Data We Collect &amp; What We Reject</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <p>
                    Under Section 6 (Notice) and Section 7 of the DPDP Act 2023, personal data processing must be limited to specific, necessary purposes:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="p-5 rounded-2xl glass-strong border border-emerald-500/20">
                      <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        What We Collect (With Consent)
                      </h3>
                      <ul className="space-y-2 text-xs text-[var(--color-text-muted)]">
                        <li>• <strong>Account Identifiers:</strong> Name and email address authenticated via Clerk.</li>
                        <li>• <strong>Reflective Inputs:</strong> Answers provided during childhood curiosity, teenage identity, and adult ambition explorations.</li>
                        <li>• <strong>Guidance Preferences:</strong> Academic stream, vocational goals, and preferred companion tone.</li>
                        <li>• <strong>Security Telemetry:</strong> IP address and browser type for rate-limiting and DDoS defense.</li>
                      </ul>
                    </div>

                    <div className="p-5 rounded-2xl glass-strong border border-rose-500/20">
                      <h3 className="text-sm font-bold text-rose-600 dark:text-rose-400 mb-2 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" />
                        What We Strictly Never Collect
                      </h3>
                      <ul className="space-y-2 text-xs text-[var(--color-text-muted)]">
                        <li>• <strong>Biometric Data:</strong> No fingerprints, facial scans, or voiceprints.</li>
                        <li>• <strong>Financial Credentials:</strong> No credit/debit card numbers or bank account PINs.</li>
                        <li>• <strong>National IDs:</strong> No Aadhaar scans, PAN copies, or passport records.</li>
                        <li>• <strong>Invasive Geolocation:</strong> No real-time GPS tracking or background tracking.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section id="pii-scrubbing" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-[var(--color-secondary)]/20 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <Cpu className="w-7 h-7 text-[var(--color-secondary)] flex-shrink-0" />
                  <span>4. Automated PII Redaction Engine</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <p>
                    A foundational cornerstone of Baagupadu&apos;s architecture is our <strong>internal PII Scrubbing Engine</strong> (implemented in <code className="text-xs px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 font-mono">backend/core/pii_scrubber.py</code>).
                  </p>
                  <p>
                    Before any student reflection or dialogue is dispatched to our reasoning pipeline or Large Language Model (LLM), it passes through high-speed regex sanitizers specifically tuned for the Indian subcontinent:
                  </p>

                  <div className="p-5 rounded-2xl glass-strong border border-black/5 dark:border-white/5 font-mono text-xs text-[var(--color-text-muted)] space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/5 font-sans font-semibold text-[var(--color-text)]">
                      <span>Indian Identifier Pattern</span>
                      <span>Sanitization Outcome</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Indian Mobile (+91 / 10-digit)</span>
                      <span className="text-emerald-500 font-bold">[PHONE_REDACTED]</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Aadhaar Card (12-digit UIDAI)</span>
                      <span className="text-emerald-500 font-bold">[AADHAAR_REDACTED]</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Income Tax PAN (10-char alphanumeric)</span>
                      <span className="text-emerald-500 font-bold">[PAN_REDACTED]</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Personal Email Address</span>
                      <span className="text-emerald-500 font-bold">[EMAIL_REDACTED]</span>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--color-text-muted)] italic">
                    This ensures that even if a student accidentally shares their phone number or Aadhaar in conversation, that information is masked in volatile memory before reaching the inference model.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section id="minor-protection" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <UserCheck className="w-7 h-7 text-emerald-500 flex-shrink-0" />
                  <span>5. Special Protections for Minors (Section 9 DPDP Act)</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <p>
                    Section 9 of the DPDP Act 2023 establishes stringent statutory safeguards for children (individuals under 18 years of age). Baagupadu adheres to these protections comprehensively:
                  </p>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                      <h4 className="text-sm font-bold text-[var(--color-text)] mb-1">
                        1. Complete Prohibition on Behavioral Tracking &amp; Profiling
                      </h4>
                      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                        Under Section 9(2), Baagupadu does <strong>not</strong> undertake behavioral tracking, advertising surveillance, or predictive commercial profiling of minor students.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                      <h4 className="text-sm font-bold text-[var(--color-text)] mb-1">
                        2. Absolute Ban on Targeted Advertising
                      </h4>
                      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                        Under Section 9(3), we never serve targeted advertisements directed at children or monetize student academic stress.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                      <h4 className="text-sm font-bold text-[var(--color-text)] mb-1">
                        3. Guardian Consent Framework
                      </h4>
                      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                        For students under the age of 18 participating via institutional tie-ups (schools/colleges), verifiable parental or institutional guardian consent is required prior to processing student data.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section id="data-principal-rights" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <Trash2 className="w-7 h-7 text-indigo-500 flex-shrink-0" />
                  <span>6. Data Principal Rights &amp; Right to Erasure</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <p>
                    Under Chapter III of the DPDP Act 2023, you hold enforceable statutory rights over your personal data:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                      <h4 className="text-sm font-bold text-[var(--color-text)] mb-1">Right to Access (Section 11)</h4>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        Request a readable copy of all your persona reflections, conversation messages, and generated roadmap milestones.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                      <h4 className="text-sm font-bold text-[var(--color-text)] mb-1">Right to Correction (Section 12)</h4>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        Correct or update outdated career goals, academic streams, or account credentials at any time.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl glass-strong border border-rose-500/20">
                      <h4 className="text-sm font-bold text-rose-600 dark:text-rose-400 mb-1">Right to Erasure (&quot;Delete Me&quot;)</h4>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        Under Section 12(3), demand the permanent deletion of your account. We execute a cascade delete of all chat history and anonymize security logs.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                      <h4 className="text-sm font-bold text-[var(--color-text)] mb-1">Right of Grievance Redressal (Section 13)</h4>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        Access a dedicated, accessible grievance resolution process with a nominated Data Protection Officer.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section id="ai-transparency" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <Sparkles className="w-7 h-7 text-amber-500 flex-shrink-0" />
                  <span>7. AI Governance, Dynamic RAG &amp; Scope of Advice</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <p>
                    In accordance with international AI transparency principles (aligned with EU AI Act Articles 13 &amp; 14):
                  </p>
                  <ul className="space-y-3 text-xs sm:text-sm text-[var(--color-text-muted)]">
                    <li className="p-3.5 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                      <strong className="text-[var(--color-text)]">Clear AI Notification:</strong> You are conversing with an autonomous artificial intelligence system (&quot;Sahayam AI&quot;), not a human counselor.
                    </li>
                    <li className="p-3.5 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                      <strong className="text-[var(--color-text)]">Dynamic RAG Grounding:</strong> Rather than unconstrained text generation, Sahayam uses pgvector retrieval against curated developmental psychology and educational frameworks to prevent hallucinations.
                    </li>
                    <li className="p-3.5 rounded-xl glass-strong border border-amber-500/20">
                      <strong className="text-[var(--color-text)]">Important Informational Disclaimer:</strong> Sahayam AI provides educational exploration, empathetic self-discovery, and reflective roadmaps. It does <strong>not</strong> provide licensed clinical psychiatric treatment, statutory psychological therapy, medical diagnosis, or guaranteed admission/employment outcomes.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 8 */}
              <section id="security-retention" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <Lock className="w-7 h-7 text-indigo-500 flex-shrink-0" />
                  <span id="security">8. Security Architecture &amp; CERT-In Log Retention</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <p>
                    Baagupadu employs defense-in-depth cybersecurity controls across every layer:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                      <h4 className="font-bold text-[var(--color-text)] mb-1">Transport Encryption</h4>
                      <p className="text-[var(--color-text-muted)]">TLS 1.3 encryption enforced on all incoming traffic via Cloudflare Zero Trust tunnel protection.</p>
                    </div>
                    <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                      <h4 className="font-bold text-[var(--color-text)] mb-1">Cryptographic Auth</h4>
                      <p className="text-[var(--color-text-muted)]">Clerk RS256 JWKS public key validation verifies every API request before backend handler execution.</p>
                    </div>
                    <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                      <h4 className="font-bold text-[var(--color-text)] mb-1">Adversarial LLM Rails</h4>
                      <p className="text-[var(--color-text-muted)]">Guardrail agents continuously filter prompt injections, jailbreaks, and sensitive data leakage.</p>
                    </div>
                    <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                      <h4 className="font-bold text-[var(--color-text)] mb-1">CERT-In 180-Day Retention</h4>
                      <p className="text-[var(--color-text-muted)]">In accordance with CERT-In directives, technical access and security logs are securely stored for 180 days within India.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 9 */}
              <section id="sub-processors" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <Server className="w-7 h-7 text-[var(--color-secondary)] flex-shrink-0" />
                  <span>9. Infrastructure &amp; Third-Party Sub-Processors</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <p>
                    We engage vetted enterprise infrastructure providers under strict Data Processing Addendums:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-black/10 dark:border-white/10 text-[var(--color-text)] font-bold">
                          <th className="py-2.5 px-3">Sub-Processor</th>
                          <th className="py-2.5 px-3">Purpose</th>
                          <th className="py-2.5 px-3">Security Certifications</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5 dark:divide-white/5 text-[var(--color-text-muted)]">
                        <tr>
                          <td className="py-2.5 px-3 font-semibold text-[var(--color-text)]">Clerk.com</td>
                          <td className="py-2.5 px-3">User Authentication &amp; Multi-Factor Security</td>
                          <td className="py-2.5 px-3">SOC 2 Type II, ISO 27001</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold text-[var(--color-text)]">Cloudflare, Inc.</td>
                          <td className="py-2.5 px-3">Global Edge WAF, DDoS Mitigation &amp; TLS Termination</td>
                          <td className="py-2.5 px-3">SOC 2 Type II, ISO 27001</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold text-[var(--color-text)]">Vercel Inc.</td>
                          <td className="py-2.5 px-3">Frontend Application Delivery &amp; CDN</td>
                          <td className="py-2.5 px-3">SOC 2 Type II</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Section 10 */}
              <section id="grievance-redressal" className="glass-card p-6 sm:p-10 rounded-[2.5rem] border border-emerald-500/25 scroll-mt-28">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight flex items-center gap-3">
                  <Mail className="w-7 h-7 text-emerald-500 flex-shrink-0" />
                  <span>10. DPO &amp; Grievance Redressal</span>
                </h2>
                <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
                  <p>
                    In compliance with Section 13(2) of the Digital Personal Data Protection Act 2023, Baagupadu has appointed a dedicated <strong>Data Protection Officer (DPO) &amp; Grievance Redressal Officer</strong>.
                  </p>

                  <div className="p-6 rounded-2xl glass-strong border border-black/5 dark:border-white/5 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[var(--color-text-muted)] block">Nominated Officer:</span>
                        <strong className="text-[var(--color-text)] text-sm">Sreekar Reddy Pindi</strong>
                        <span className="text-[var(--color-text-muted)] block">Co-Founder &amp; Data Protection Officer</span>
                      </div>
                      <div>
                        <span className="text-[var(--color-text-muted)] block">Entity Name:</span>
                        <strong className="text-[var(--color-text)] text-sm">Baagupadu Technologies</strong>
                        <span className="text-[var(--color-text-muted)] block">Hyderabad, Telangana, India</span>
                      </div>
                      <div>
                        <span className="text-[var(--color-text-muted)] block">Grievance &amp; DSAR Email:</span>
                        <a href="mailto:privacy@baagupadu.com" className="font-mono text-sm text-[var(--color-secondary)] hover:underline font-bold">
                          privacy@baagupadu.com
                        </a>
                      </div>
                      <div>
                        <span className="text-[var(--color-text-muted)] block">General Contact:</span>
                        <a href="mailto:contact@baagupadu.com" className="font-mono text-sm text-[var(--color-secondary)] hover:underline font-bold">
                          contact@baagupadu.com
                        </a>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-black/5 dark:border-white/5 text-xs text-[var(--color-text-muted)]">
                      <p><strong>Statutory SLA:</strong> All privacy grievances, access requests, or deletion notices are formally acknowledged within <strong>24 business hours</strong> and resolved within <strong>30 calendar days</strong> as required by Indian law.</p>
                    </div>
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
