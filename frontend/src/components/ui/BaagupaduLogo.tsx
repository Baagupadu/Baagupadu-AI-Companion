'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BaagupaduLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  showSubtitle?: boolean;
  subtitle?: string;
  asLink?: boolean;
  href?: string;
  className?: string;
  variant?: 'default' | 'gradient' | 'minimal';
}

const sizeConfig = {
  sm: { icon: 28, text: 'text-[17px]', sub: 'text-[11px]', gap: 'gap-2' },
  md: { icon: 34, text: 'text-[20px]', sub: 'text-[12px]', gap: 'gap-2.5' },
  lg: { icon: 42, text: 'text-[24px]', sub: 'text-[13px]', gap: 'gap-3' },
  xl: { icon: 54, text: 'text-[32px]', sub: 'text-[15px]', gap: 'gap-3.5' },
};

export default function BaagupaduLogo({
  size = 'md',
  showWordmark = true,
  showSubtitle = true,
  subtitle = 'బాగుపడు',
  asLink = true,
  href = '/',
  className = '',
  variant = 'default',
}: BaagupaduLogoProps) {
  const cfg = sizeConfig[size];

  const content = (
    <div className={`inline-flex items-center ${cfg.gap} group cursor-pointer select-none brand-gradient-hover ${className}`}>
      {/* ── 3D Companion Emblem ── */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ width: cfg.icon, height: cfg.icon }}
      >
        <Image
          src="/brand/baagupadu-logo.png"
          alt="Baagupadu — Autonomous AI Companion"
          width={cfg.icon * 2}
          height={cfg.icon * 2}
          className="w-full h-full object-contain drop-shadow-[0_4px_14px_rgba(255,142,117,0.28)]"
          priority
        />
        {/* Ambient brand glow aura on hover */}
        <div className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-400 -z-10 bg-gradient-to-tr from-[#FF8E75] via-[#E293B8] to-[#8B7AE8]" />
      </div>

      {/* ── Brand Wordmark Typography ── */}
      {showWordmark && (
        <div className="flex items-baseline gap-2">
          <span
            className={`font-brand font-black tracking-[-0.03em] ${cfg.text} ${
              variant === 'gradient'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#FF7E67] via-[#E293B8] to-[#8B7AE8]'
                : 'brand-gradient-text transition-all duration-300'
            }`}
          >
            Baagupadu
          </span>
          {showSubtitle && (
            <span
              className={`font-medium ${cfg.sub} text-[#FF8E75] dark:text-[#FFA694] opacity-85 group-hover:opacity-100 transition-opacity duration-300 hidden sm:inline tracking-normal`}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link href={href} className="inline-flex items-center shrink-0">
        {content}
      </Link>
    );
  }

  return content;
}
