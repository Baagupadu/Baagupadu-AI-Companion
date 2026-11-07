import Link from 'next/link';
import { Compass, Home, ArrowRight } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center pt-32 pb-20">
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] flex items-center justify-center mb-6 shadow-sm">
          <Compass className="w-8 h-8 text-[var(--color-secondary)] animate-pulse" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-secondary)] mb-2 font-mono">
          HTTP 404 • Page Not Found
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight">
          Every Journey Has Uncharted Paths
        </h1>
        <p className="text-base text-[var(--color-text-muted)] max-w-md mx-auto mb-8 leading-relaxed">
          The page or resource you are looking for has been relocated or does not exist. Let Sahayam guide you back to your journey.
        </p>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-secondary)] text-white font-semibold text-sm hover:bg-[#5658d6] transition-all shadow-md"
          >
            <Home className="w-4 h-4" /> Return to Homepage
          </Link>
          <Link
            href="/how-it-works"
            className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-[var(--glass-border)] text-[var(--color-text)] font-semibold text-sm hover:border-[var(--color-secondary)] transition-all"
          >
            How It Works <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

