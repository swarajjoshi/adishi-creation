'use client';

import { useAnimate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Placeholder } from '@/components/ui/Placeholder';
import { DURATION, EASE_LUXE } from '@/lib/motion';
import { useTransitionStore, type TransitionOrigin } from '@/store/transition';

const SCROLL_KEYS = new Set([' ', 'PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown']);

function Overlay({ origin }: { origin: TransitionOrigin }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const ready = useTransitionStore((s) => s.ready);
  const [expanded, setExpanded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const dissolving = useRef(false);

  // Keep the page still while the image travels (the overlay is positioned from the card's spot).
  useEffect(() => {
    const stop = (e: Event) => e.preventDefault();
    const onKey = (e: KeyboardEvent) => SCROLL_KEYS.has(e.key) && e.preventDefault();
    window.addEventListener('wheel', stop, { passive: false });
    window.addEventListener('touchmove', stop, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchmove', stop);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  // Step 1: grow from the card's exact position to the full screen.
  useEffect(() => {
    let cancelled = false;
    const target = {
      top: 0,
      left: 0,
      width: document.documentElement.clientWidth,
      height: window.innerHeight,
    };
    const duration = window.innerWidth < 640 ? DURATION.expandCompact : DURATION.expand;
    animate(scope.current, target, { duration, ease: EASE_LUXE }).then(() => {
      if (!cancelled) setExpanded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [animate, scope]);

  // If the new page is slow (for example the first dev compile), keep covering, but not forever.
  useEffect(() => {
    if (!expanded) return;
    const t = window.setTimeout(() => setTimedOut(true), 4000);
    return () => window.clearTimeout(t);
  }, [expanded]);

  // Step 2: once the new page is ready, dissolve to reveal it.
  useEffect(() => {
    if (!expanded || !(ready || timedOut) || dissolving.current) return;
    dissolving.current = true;
    useTransitionStore.getState().beginReveal();
    animate(scope.current, { opacity: 0 }, { duration: DURATION.dissolve, ease: 'easeOut' }).then(() => {
      useTransitionStore.getState().finish();
    });
  }, [expanded, ready, timedOut, animate, scope]);

  const { rect } = origin;
  return (
    <div
      ref={scope}
      aria-hidden="true"
      className="fixed z-[70] overflow-hidden"
      style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
    >
      <Placeholder tone={origin.tone} label={origin.label} />
    </div>
  );
}

/** Lives once in the root layout. Renders nothing unless a category transition is running. */
export function TransitionLayer() {
  const origin = useTransitionStore((s) => s.origin);
  const announcement = useTransitionStore((s) => s.announcement);
  const originId = origin?.id;

  // Hard safety net: whatever happens, the overlay is gone after 8 seconds.
  useEffect(() => {
    if (originId === undefined) return;
    const t = window.setTimeout(() => useTransitionStore.getState().finish(), 8000);
    return () => window.clearTimeout(t);
  }, [originId]);

  return (
    <>
      {origin && <Overlay key={origin.id} origin={origin} />}
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </>
  );
}
