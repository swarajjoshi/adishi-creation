'use client';

import Link from 'next/link';
import { useState } from 'react';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/cn';

interface LogoProps {
  /** Smaller size used once the header has shrunk on scroll */
  compact?: boolean;
  onClick?: () => void;
}

/**
 * Shows the official logo from public/brand/adishi-logo.png, untouched:
 * only the HEIGHT is set, the width follows the file's own proportions (no stretching, no recoloring).
 * If the file is missing, a plain text wordmark appears instead so the header never looks broken.
 */
export function Logo({ compact = false, onClick }: LogoProps) {
  const [missing, setMissing] = useState(false);

  return (
    <Link href="/" onClick={onClick} aria-label={`${siteConfig.name}, home`} className="inline-flex items-center">
      {missing ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-2xl font-semibold tracking-[0.3em] text-emerald">ADISHI</span>
          <span className="mt-1 text-[0.55rem] font-medium uppercase tracking-[0.5em] text-gilt">Creation</span>
        </span>
      ) : (
        // Plain <img> on purpose: the file's dimensions are unknown until the real logo is added.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={siteConfig.logo.src}
          alt={siteConfig.logo.alt}
          onError={() => setMissing(true)}
          className={cn('w-auto select-none object-contain transition-[height] duration-500 ease-luxe', compact ? 'h-11' : 'h-14 md:h-16')}
          draggable={false}
        />
      )}
    </Link>
  );
}
