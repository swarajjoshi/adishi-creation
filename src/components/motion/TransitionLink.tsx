'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Tone } from '@/config/site';
import { useTransitionStore } from '@/store/transition';

interface TransitionLinkProps {
  href: string;
  tone: Tone;
  label: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * A normal link that, on a plain click, expands the card's image into the destination page.
 * The card must contain one element marked  data-transition-media  (the image frame).
 * In every other case (new-tab click, modifier keys, reduced motion, missing frame)
 * it behaves exactly like a standard <Link>, so navigation can never break.
 */
export function TransitionLink({ href, tone, label, className, children }: TransitionLinkProps) {
  const router = useRouter();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // A transition is already running: ignore extra clicks instead of stacking animations.
    if (useTransitionStore.getState().origin) {
      e.preventDefault();
      return;
    }

    const media = e.currentTarget.querySelector<HTMLElement>('[data-transition-media]');
    if (!media) return;
    const rect = media.getBoundingClientRect();
    if (rect.width < 8 || rect.height < 8) return;

    e.preventDefault();
    useTransitionStore.getState().start({
      rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      tone,
      label,
      href,
    });
    router.push(href);
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
