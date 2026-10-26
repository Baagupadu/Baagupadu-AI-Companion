'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cookie, X, ArrowRight, Check } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'baagupadu_cookie_consent';

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!savedConsent) {
        // Small delay so the user is not jarred on initial page render
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore localStorage errors (e.g. private browsing storage disabled)
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    } catch {
      // ignore
    }
    setIsOpen(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'essential');
    } catch {
      // ignore
    }
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          role="region"
          aria-label="Cookie consent banner"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-lg w-[calc(100%-2rem)] sm:w-[460px] p-5 sm:p-6 rounded-2xl glass-strong border border-black/10 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl"
          style={{
            background: 'var(--glass-strong-bg)',
          }}
        >
          {/* Header Row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-secondary)] to-[#818CF8] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--color-text)] flex items-center gap-1.5">
                  Privacy-First Cookies
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    Zero Ad Trackers
                  </span>
                </h3>
                <p className="text-[11px] text-[var(--color-text-muted)]">
                  Compliant with DPDP Act 2023 &amp; e-Privacy
                </p>
              </div>
            </div>

            <button
              onClick={handleEssentialOnly}
              aria-label="Dismiss cookie notice with essential cookies only"
              className="p-1 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed mb-4">
            We respect your digital autonomy. Baagupadu uses strictly essential cookies for secure authentication (Clerk) and theme preferences. We do <strong>not</strong> use advertising trackers or sell your personal data.
          </p>

          {/* Feature Badges */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-[11px] font-medium text-[var(--color-text-muted)]">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
              <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span>Session Security</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
              <span>PII Masked AI</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1 border-t border-black/5 dark:border-white/5">
            <button
              onClick={handleAcceptAll}
              className="flex-1 px-4 py-2 rounded-xl bg-[var(--color-secondary)] hover:bg-[#5658d6] text-white text-[13px] font-semibold transition-all shadow-sm hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] text-center flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Accept All</span>
            </button>

            <button
              onClick={handleEssentialOnly}
              className="px-4 py-2 rounded-xl bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-[var(--color-text)] border border-black/10 dark:border-white/10 text-[13px] font-semibold transition-colors text-center cursor-pointer"
            >
              <span>Essential Only</span>
            </button>

            <Link
              href="/cookies"
              onClick={() => setIsOpen(false)}
              className="text-[12px] text-[var(--color-secondary)] hover:underline font-medium text-center sm:text-left px-2 py-1 flex items-center justify-center sm:justify-start gap-1"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
