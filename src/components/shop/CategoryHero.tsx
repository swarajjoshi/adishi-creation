'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { Category } from '@/config/site';
import { Placeholder } from '@/components/ui/Placeholder';
import { EASE_LUXE } from '@/lib/motion';
import { useTransitionStore } from '@/store/transition';

/**
 * Full-screen opening of a category page. Its background is the same frame the homepage card
 * expanded from, so the hand-off from the transition overlay is seamless.
 */
export function CategoryHero({ category }: { category: Category }) {
  const reduce = useReducedMotion() ?? false;
  const headingRef = useRef<HTMLHeadingElement>(null);
  // True when we arrived via the card transition (decided once, on first render).
  const [arrivedViaTransition] = useState(() => useTransitionStore.getState().origin !== null);
  // The title waits until the overlay starts dissolving; on a direct visit it plays straight away.
  const revealed = useTransitionStore((s) => s.phase !== 'covering');
  const show = reduce || revealed;

  useEffect(() => {
    useTransitionStore.getState().markReady(`/${category.slug}`);
    // Move keyboard / screen-reader focus to the page title after a card transition.
    if (arrivedViaTransition) headingRef.current?.focus({ preventScroll: true });
  }, [category.slug, arrivedViaTransition]);

  const transition = { duration: 1, ease: EASE_LUXE };

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Placeholder tone={category.tone} label={category.label} />
      </div>

      <div className="container-page relative flex h-full flex-col justify-end pb-16 lg:pb-24">
        <motion.p
          className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-emerald/80"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 12 }}
          transition={{ ...transition, delay: 0.05 }}
        >
          Collection
        </motion.p>

        <div className="overflow-hidden py-1">
          <motion.h1
            ref={headingRef}
            tabIndex={-1}
            className="display mt-3 text-[clamp(3.5rem,11vw,9rem)] text-emerald outline-none"
            initial={reduce ? false : { y: '110%' }}
            animate={{ y: show ? '0%' : '110%' }}
            transition={{ ...transition, delay: 0.12 }}
          >
            {category.label}
          </motion.h1>
        </div>

        <motion.p
          className="mt-4 max-w-md text-base leading-relaxed text-emerald/80"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 12 }}
          transition={{ ...transition, delay: 0.3 }}
        >
          {category.tagline}
        </motion.p>
      </div>
    </section>
  );
}
