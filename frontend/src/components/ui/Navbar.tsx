'use client';

import Link from 'next/link';
import { useAuth, UserButton } from '@clerk/nextjs';
import { ThemeToggle } from './ThemeToggle';
import BaagupaduLogo from './BaagupaduLogo';

export default function Navbar() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-4 sm:px-6 py-3 border-b border-black/5 dark:border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-300"
      style={{
        background: 'var(--glass-strong-bg)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      <BaagupaduLogo size="md" />

      <div className="hidden md:flex items-center gap-6 text-[var(--color-text-muted)] font-medium text-[13px]">
        <Link href="/companion" className="hover:text-[var(--color-text)] transition-colors">The Companion</Link>
        <Link href="/how-it-works" className="hover:text-[var(--color-text)] transition-colors">How It Works</Link>
        <Link href="/mentors" className="hover:text-[var(--color-text)] transition-colors">Mentors</Link>
        <a href="mailto:info@baagupadu.com?subject=Institutional%20Pilot%20Inquiry" className="hover:text-[var(--color-text)] transition-colors flex items-center gap-1">
          Campus Edition
          <span className="text-[10px] bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] px-1.5 py-0.5 rounded font-bold">B2B</span>
        </a>
        <a href="mailto:info@baagupadu.com" className="hover:text-[var(--color-text)] transition-colors">Contact</a>
      </div>


      <div className="flex items-center gap-4">
        <ThemeToggle />

        {isLoaded && !isSignedIn && (
          <>
            <Link href="/login" rel="nofollow" className="hidden sm:block text-[var(--color-text-muted)] font-medium text-[13px] hover:text-[var(--color-text)] transition-colors">Log in</Link>
            <Link href="/login" rel="nofollow">
              <button className="px-4 py-1.5 rounded-full bg-[var(--color-text)] text-[var(--color-background)] font-medium text-[13px] hover:bg-[var(--color-secondary)] hover:text-white transition-colors shadow-sm hover:shadow-md">
                Sign Up
              </button>
            </Link>
          </>
        )}

        {isLoaded && isSignedIn && (
          <div className="flex items-center gap-4">
            <Link href="/chat">
              <button className="px-4 py-1.5 rounded-full bg-[var(--color-secondary)] text-white font-medium text-[13px] hover:bg-[#5658d6] transition-colors shadow-sm hover:shadow-md">
                Dashboard
              </button>
            </Link>
            <UserButton />
          </div>
        )}
      </div>
    </nav>
  );
}
