'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { selectCount, useCartStore } from '@/store/cart';
import { useHasMounted } from '@/hooks/useHasMounted';

export function CartButton() {
  const count = useCartStore(selectCount);
  const openCart = useCartStore((s) => s.openCart);
  const mounted = useHasMounted();
  const shown = mounted ? count : 0;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart, ${shown} ${shown === 1 ? 'item' : 'items'}`}
      className="group relative flex h-11 w-11 items-center justify-center text-emerald transition-colors hover:text-gilt"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 8h14l-1 12H6L5 8Z" />
        <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      </svg>
      <AnimatePresence initial={false}>
        {shown > 0 && (
          <motion.span
            key={shown}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center bg-emerald px-1 text-[0.62rem] font-medium text-champagne"
            aria-hidden="true"
          >
            {shown}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
