'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Cookie, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  RefreshCw, 
  SlidersHorizontal,
  ExternalLink,
  ChevronRight,
  Database,
  EyeOff,
  Sparkles
} from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { containerVariants, slideUpVariants } from '@/lib/utils/animations';

const COOKIE_INVENTORY = [
  {
    name: '__session',
    provider: 'Clerk.com (Auth)',
    category: 'Strictly Essential',
    purpose: 'Cryptographically encrypted JSON Web Token (JWT) used to verify your signed-in identity and maintain your authenticated session.',
    duration: 'Session / Rolling',
    type: 'HTTP Cookie',
  },
  {
    name: '__client_uat',
    provider: 'Clerk.com (Auth)',
    category: 'Strictly Essential',
    purpose: 'Client "User Activity Timestamp" utilized to detect multi-tab session changes and ensure session validity across browser tabs.',
    duration: '1 Year',
    type: 'HTTP Cookie',
  },
  {
    name: 'theme',
    provider: 'Baagupadu (next-themes)',
    category: 'User Preference',
    purpose: 'Remembers your preferred visual mode (Dark Mode, Light Mode, or System Default) to prevent blinding white flash on page reload.',
    duration: 'Persistent',
    type: 'Local Storage',
  },
  {
    name: 'baagupadu_cookie_consent',
    provider: 'Baagupadu',
    category: 'Compliance / Functional',
    purpose: 'Stores your consent preference ("accepted" or "essential") so our floating privacy banner does not repeatedly prompt you on every visit.',
    duration: '1 Year',
    type: 'Local Storage',
  },
  {
    name: 'idb-keyval (offline cache)',
    provider: 'Baagupadu App Client',
    category: 'Performance / Local Storage',
    purpose: 'Caches conversation history and active persona responses locally on your device for instantaneous offline-first page transitions.',
    duration: 'Persistent (Client-only)',
    type: 'IndexedDB',
  },
  {
    name: 'cf_clearance / __cf_bm',
    provider: 'Cloudflare',
    category: 'Security & DDoS Defense',
    purpose: 'Distinguishes genuine human students from malicious scraping bots, distributed denial-of-service (DDoS) networks, and automated crawlers.',
    duration: '30 min to 1 Year',
    type: 'HTTP Cookie',
  },
];

const TRACKER_AUDIT = [
  { name: 'Meta / Facebook Pixel', status: 'Blocked / Never Included', desc: 'We do not trace your identity or deliver targeted advertising on social media networks.' },
  { name: 'Google Ads & DoubleClick', status: 'Blocked / Never Included', desc: 'No commercial remarketing cookies or behavioral profile beacons are embedded.' },
  { name: 'TikTok & ByteDance Trackers', status: 'Blocked / Never Included', desc: 'Zero third-party social tracking pixels or cross-site tracking scripts.' },
  { name: 'Data Brokers & Ad Exchanges', status: 'Blocked / Never Included', desc: 'Student inputs, reflections, and guidance goals are never monetized, traded, or sold.' },
];

export default function CookiePolicyPage() {
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const handleResetPreferences = () => {
    try {
      localStorage.removeItem('baagupadu_cookie_consent');
      setResetMessage('Preferences successfully cleared! Refresh this page to see the consent banner.');
      setTimeout(() => setResetMessage(null), 5000);
    } catch {
      setResetMessage('Unable to access localStorage on your browser.');
    }
  };

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
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-6">
            <Link href="/" className="hover:text-[var(--color-secondary)] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[var(--color-text)]">Cookie Policy</span>
          </div>

          {/* Hero Header */}
          <div className="mb-14 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider mb-4 border border-[var(--color-secondary)]/20">
              <Cookie className="w-3.5 h-3.5" />
              Tracking Transparency &amp; Cookie Architecture
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--color-text)] mb-6 tracking-tight leading-[1.15]">
              Cookie Policy &amp; <br className="hidden sm:inline" />
              <span className="gradient-text">Zero-Tracker Transparency</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--color-text-muted)] max-w-3xl leading-relaxed mb-6">
              At <strong>Baagupadu Technologies</strong>, we reject invasive commercial surveillance. We do not use third-party advertising cookies, data broker beacons, or behavioral remarketing scripts. Below is a full, transparent audit of the strictly essential cookies and local storage items required to operate the Baagupadu platform.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[var(--color-text-muted)]">
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5">
                Effective: <strong>October 2026</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5">
                DPDP Act 2023 Aligned
              </span>
              <span className="px-3 py-1.5 rounded-lg glass border border-black/5 dark:border-white/5">
                Zero Third-Party Ad Trackers
              </span>
            </div>
          </div>

          {/* Executive Summary Cards */}
          <motion.div variants={slideUpVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="glass-card p-6 rounded-2xl border border-[var(--color-secondary)]/20">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-[var(--color-text)] mb-2">1. Strictly Essential</h2>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                Authentication cookies via Clerk that keep you securely signed in to your autonomous AI companion sessions. Without these, authenticated chat is impossible.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-emerald-500/20">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-[var(--color-text)] mb-2">2. Functional &amp; Preferences</h2>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                Stores your dark mode/light mode visual choice and your cookie consent status so you don&apos;t get interrupted every time you visit.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-rose-500/20">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4">
                <EyeOff className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-[var(--color-text)] mb-2">3. Zero Ad Trackers</h2>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                We have completely eliminated advertising networks, remarketing pixels, and data brokers. Your self-discovery reflections will never follow you around the web.
              </p>
            </div>
          </motion.div>

          {/* Cookie Inventory Table */}
          <motion.section variants={slideUpVariants} className="glass-card p-6 sm:p-10 rounded-[2.5rem] mb-16 border border-black/5 dark:border-white/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
                  Detailed Inventory of Cookies &amp; Storage
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  Full disclosure of all state storage mechanisms active on <code className="text-xs px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5">baagupadu.com</code>.
                </p>
              </div>

              <span className="self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                100% Essential &amp; Functional Only
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                    <th className="py-3.5 px-4">Cookie / Key</th>
                    <th className="py-3.5 px-4">Provider</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Purpose</th>
                    <th className="py-3.5 px-4">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs sm:text-sm">
                  {COOKIE_INVENTORY.map((item) => (
                    <tr key={item.name} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 font-mono font-semibold text-[var(--color-secondary)]">
                        {item.name}
                        <div className="text-[10px] text-[var(--color-text-muted)] font-sans font-normal">{item.type}</div>
                      </td>
                      <td className="py-4 px-4 font-medium text-[var(--color-text)]">
                        {item.provider}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                          item.category.includes('Essential')
                            ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-[var(--color-text-muted)] leading-relaxed max-w-xs">
                        {item.purpose}
                      </td>
                      <td className="py-4 px-4 font-medium text-[var(--color-text-muted)] whitespace-nowrap">
                        {item.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Third-Party Trackers We Refuse to Use */}
          <motion.section variants={slideUpVariants} className="glass-card p-6 sm:p-10 rounded-[2.5rem] mb-16 border border-black/5 dark:border-white/5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-3 tracking-tight">
              Third-Party Advertising Trackers We Refuse To Use
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-8 max-w-3xl">
              Unlike traditional edtech or commercial web services that monetize student attention, Baagupadu guarantees complete isolation from commercial ad networks.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TRACKER_AUDIT.map((tracker) => (
                <div key={tracker.name} className="p-4 rounded-2xl glass-strong border border-black/5 dark:border-white/5 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-[var(--color-text)]">{tracker.name}</h3>
                      <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">
                        {tracker.status}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                      {tracker.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Manage & Reset Device Cookies */}
          <motion.section variants={slideUpVariants} className="glass-card p-6 sm:p-10 rounded-[2.5rem] mb-16 border border-[var(--color-secondary)]/20 relative overflow-hidden">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-3 tracking-tight">
                Manage Or Reset Your Preferences
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6">
                You can reset your cookie consent choice at any time. Clicking the button below will immediately clear your stored consent preference on this browser.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={handleResetPreferences}
                  className="px-5 py-2.5 rounded-xl bg-[var(--color-secondary)] hover:bg-[#5658d6] text-white text-sm font-semibold transition-all shadow-sm hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset Cookie Consent on This Device</span>
                </button>

                <Link
                  href="/privacy"
                  className="text-xs font-semibold text-[var(--color-secondary)] hover:underline flex items-center gap-1"
                >
                  <span>Review Full Privacy Policy</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {resetMessage && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{resetMessage}</span>
                </div>
              )}
            </div>
          </motion.section>

          {/* Browser Control Instructions */}
          <motion.section variants={slideUpVariants} className="glass-card p-6 sm:p-10 rounded-[2.5rem] mb-16 border border-black/5 dark:border-white/5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-3 tracking-tight">
              How To Control Cookies In Your Browser
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-8 max-w-3xl">
              You have the legal right to prevent cookies from being saved on your device through your browser settings. Please note that blocking strictly essential cookies will prevent authentication with Clerk and disable the Sahayam companion chat.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                <h3 className="font-bold text-[var(--color-text)] mb-2">Google Chrome</h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  Go to <code className="text-[11px] bg-black/5 dark:bg-white/5 px-1 py-0.5 rounded">Settings &gt; Privacy and Security &gt; Third-party cookies</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                <h3 className="font-bold text-[var(--color-text)] mb-2">Apple Safari</h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  Go to <code className="text-[11px] bg-black/5 dark:bg-white/5 px-1 py-0.5 rounded">Settings &gt; Privacy &gt; Prevent Cross-Site Tracking</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                <h3 className="font-bold text-[var(--color-text)] mb-2">Mozilla Firefox</h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  Go to <code className="text-[11px] bg-black/5 dark:bg-white/5 px-1 py-0.5 rounded">Settings &gt; Privacy &amp; Security &gt; Enhanced Tracking Protection</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl glass-strong border border-black/5 dark:border-white/5">
                <h3 className="font-bold text-[var(--color-text)] mb-2">Microsoft Edge</h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  Go to <code className="text-[11px] bg-black/5 dark:bg-white/5 px-1 py-0.5 rounded">Settings &gt; Cookies and site permissions &gt; Manage and delete cookies</code>.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Contact / Inquiries Box */}
          <div className="text-center max-w-xl mx-auto text-xs text-[var(--color-text-muted)]">
            <p className="mb-2">
              Questions regarding our cookie practices or tracking transparency?
            </p>
            <p>
              Reach our privacy team directly at{' '}
              <a href="mailto:privacy@baagupadu.com" className="font-semibold text-[var(--color-secondary)] hover:underline">
                privacy@baagupadu.com
              </a>{' '}
              or{' '}
              <a href="mailto:info@baagupadu.com" className="font-semibold text-[var(--color-secondary)] hover:underline">
                info@baagupadu.com
              </a>
              .
            </p>
          </div>
        </motion.div>

        <Footer />
      </main>
    </>
  );
}
