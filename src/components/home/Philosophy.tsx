'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Placeholder } from '@/components/ui/Placeholder';
import { Reveal } from '@/components/ui/Reveal';

export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30]); // subtle parallax

  return (
    <section className="bg-ivory py-24 lg:py-36">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div ref={ref} className="lg:col-span-5">
          <div className="mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-[999px]">
            <motion.div style={{ y }} className="h-[115%] w-full">
              <Placeholder tone="blush" label="Studio photograph" />
            </motion.div>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="eyebrow">Our philosophy</p>
            <h2 className="display mt-5 text-4xl text-emerald sm:text-5xl lg:text-6xl">Made slowly, by hand, for someone specific.</h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-charcoal/75">
              Every bouquet, hamper and crochet piece at ADISHI begins with a person and a moment. We design each creation with care, so that what you give
              feels considered, personal and lasting.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
