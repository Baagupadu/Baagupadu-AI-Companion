'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Mail, MapPin, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full mt-4 border-t border-[var(--glass-border)] bg-[var(--color-surface)]/30 backdrop-blur-md pt-6 pb-12 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-secondary)]/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF6B8A]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Newsletter / Early Access Banner */}
        <div className="glass-card p-6 md:p-8 rounded-[2rem] border border-[var(--glass-border)] mb-12 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm">
          <div className="max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-[12px] font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Early Institutional & Student Access
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text)] tracking-tight mb-2">
              Stay Connected with Baagupadu
            </h3>
            <p className="text-[var(--color-text-muted)] text-[15px] font-medium leading-relaxed">
              Receive updates on new mentorship models, institutional college partnerships, and research papers from the Sahayam AI team.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 min-w-[320px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="px-5 py-3.5 rounded-xl glass-strong border border-[var(--glass-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)]/70 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-all min-w-[260px]"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-[var(--color-secondary)] hover:bg-[#5658d6] text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              {subscribed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Subscribed!
                </>
              ) : (
                <>
                  Join Waitlist <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Main Footer Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-16 text-left">
          {/* Brand & Corporate Overview (Spans 2 columns) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-[var(--color-secondary)] to-[#818CF8] shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Sparkles className="w-4.5 h-4.5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-2xl tracking-tight text-[var(--color-text)]">
                    Baagupadu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-secondary)] to-[#FF6B8A]">Technologies</span>
                  </span>
                  <span className="text-xs font-semibold text-[var(--color-text-muted)] tracking-wider">
                    బాగుపడు • Human Potential Accelerated
                  </span>
                </div>
              </Link>

              <p className="text-[var(--color-text-muted)] text-[14px] leading-relaxed mb-6 font-medium max-w-sm">
                India&apos;s pioneering autonomous AI career mentorship platform. We understand your foundational experiences, synthesize your unique persona, and deliver actionable career roadmaps.
              </p>

              <div className="space-y-2.5 text-[13px] font-medium text-[var(--color-text-muted)] mb-6">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[var(--color-secondary)] shrink-0" />
                  <span>Hyderabad, Telangana, India</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[var(--color-secondary)] shrink-0" />
                  <a href="mailto:contact@baagupadu.com" className="hover:text-[var(--color-secondary)] transition-colors underline-offset-4 hover:underline">
                    contact@baagupadu.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media SVG Icons */}
            <div className="pt-2">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] block mb-3">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                {/* X (formerly Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Baagupadu on X"
                  className="w-9 h-9 rounded-lg glass border border-[var(--glass-border)] flex items-center justify-center text-[var(--color-text)] hover:text-white hover:bg-black hover:border-black transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with Baagupadu on LinkedIn"
                  className="w-9 h-9 rounded-lg glass border border-[var(--glass-border)] flex items-center justify-center text-[var(--color-text)] hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Baagupadu on Instagram"
                  className="w-9 h-9 rounded-lg glass border border-[var(--glass-border)] flex items-center justify-center text-[var(--color-text)] hover:text-white hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/Baagupadu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Baagupadu Open Source on GitHub"
                  className="w-9 h-9 rounded-lg glass border border-[var(--glass-border)] flex items-center justify-center text-[var(--color-text)] hover:text-white hover:bg-[#24292e] hover:border-[#24292e] transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Watch Baagupadu Tutorials on YouTube"
                  className="w-9 h-9 rounded-lg glass border border-[var(--glass-border)] flex items-center justify-center text-[var(--color-text)] hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 1: Product */}
          <div>
            <h4 className="font-bold text-[var(--color-text)] mb-5 text-[13px] uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-3 text-[14px] font-medium text-[var(--color-text-muted)]">
              <li>
                <Link href="/how-it-works" className="hover:text-[var(--color-secondary)] transition-colors">
                  Sahayam AI Engine
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-[var(--color-secondary)] transition-colors">
                  Nenu Evaru? (Self-Discovery)
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-secondary)] transition-colors">
                  Dynamic Persona Synthesis
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-secondary)] transition-colors">
                  Career Compass &amp; Milestones
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-secondary)] transition-colors">
                  Skill Gap &amp; Growth Analysis
                </Link>
              </li>
              <li>
                <Link href="/mentors" className="hover:text-[var(--color-secondary)] transition-colors">
                  Adaptive AI Personas
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="font-bold text-[var(--color-text)] mb-5 text-[13px] uppercase tracking-wider">
              Solutions
            </h4>
            <ul className="space-y-3 text-[14px] font-medium text-[var(--color-text-muted)]">
              <li>
                <Link href="#" className="hover:text-[var(--color-secondary)] transition-colors flex items-center gap-1.5">
                  For Colleges &amp; Universities
                  <span className="text-[10px] bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] px-1.5 py-0.5 rounded font-bold">B2B</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-secondary)] transition-colors">
                  High School (Classes 9-12)
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-secondary)] transition-colors">
                  Engineering &amp; Tech Grads
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-secondary)] transition-colors">
                  Career Pivot &amp; Working Pros
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-secondary)] transition-colors">
                  NEP 2020 Guidance Alignment
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-secondary)] transition-colors">
                  Institutional Licensing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-bold text-[var(--color-text)] mb-5 text-[13px] uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3 text-[14px] font-medium text-[var(--color-text-muted)]">
              <li>
                <Link href="#" className="hover:text-[var(--color-secondary)] transition-colors">
                  About Baagupadu
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-secondary)] transition-colors">
                  The Founding Manifesto
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-secondary)] transition-colors">
                  Cognitive Frameworks &amp; Research
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-secondary)] transition-colors flex items-center gap-1.5">
                  Careers
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded font-bold">Hiring ✦</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-secondary)] transition-colors">
                  Press &amp; Media Kit
                </Link>
              </li>
              <li>
                <a href="mailto:contact@baagupadu.com" className="hover:text-[var(--color-secondary)] transition-colors">
                  Contact Founders
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Legal */}
          <div>
            <h4 className="font-bold text-[var(--color-text)] mb-5 text-[13px] uppercase tracking-wider">
              Trust &amp; Legal
            </h4>
            <ul className="space-y-3 text-[14px] font-medium text-[var(--color-text-muted)]">
              <li>
                <Link href="#" className="hover:text-[var(--color-secondary)] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-secondary)] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-secondary)] transition-colors">
                  Data Privacy &amp; Protection
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-secondary)] transition-colors">
                  Security Architecture
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-[var(--color-secondary)] transition-colors">
                  Grievance Redressal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, System Status & Encryption */}
        <div className="pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] font-medium text-[var(--color-text-muted)]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Baagupadu Technologies. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[12px] opacity-80">Built with purpose in Hyderabad, India</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[12px] font-semibold text-[var(--color-text)]">All Systems Operational</span>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] opacity-85">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
              <span>256-Bit SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
