'use client';

import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import { HeroFallback } from '@/components/home/HeroFallback';

// The heavy 3D code is only downloaded in the browser, and only after the page has rendered.
const HeroScene = dynamic(() => import('@/components/home/HeroScene'), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion() ?? false;
  const webgl = useWebGLSupport();
  const [lost, setLost] = useState(false);

  const use3D = webgl === true && !lost;

  return (
    <div ref={ref} className="absolute inset-0">
      {use3D ? <HeroScene active={inView} reducedMotion={reduce} onContextLost={() => setLost(true)} /> : <HeroFallback />}
    </div>
  );
}
