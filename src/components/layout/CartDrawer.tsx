'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { selectSubtotal, useCartStore } from '@/store/cart';
import { useHasMounted } from '@/hooks/useHasMounted';
import { formatINR } from '@/lib/format';
import { Placeholder } from '@/components/ui/Placeholder';
import { Button } from '@/components/ui/Button';

export function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const subtotal = useCartStore(selectSubtotal);
  const { closeCart, setQuantity, removeItem } = useCartStore.getState();
  const mounted = useHasMounted();
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && useCartStore.getState().closeCart();
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="scrim"
          className="fixed inset-0 z-[60] bg-forest/50"
          onClick={closeCart}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {isOpen && (
        <motion.aside
          key="panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
          tabIndex={-1}
          className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col border-l border-champagne/60 bg-ivory focus:outline-none"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between border-b border-champagne/50 px-6 py-5">
            <h2 className="font-display text-2xl text-emerald">Your cart</h2>
            <button type="button" onClick={closeCart} aria-label="Close cart" className="flex h-10 w-10 items-center justify-center text-emerald">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
              <p className="font-display text-3xl text-emerald">Nothing here yet</p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-charcoal/70">
                Add a handmade creation, or design a bouquet of your own.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <Button href="/bouquets">Browse bouquets</Button>
                <Button href="/customize" variant="outline">
                  Create your own
                </Button>
              </div>
            </div>
          ) : (
            <>
              <ul className="flex-1 divide-y divide-champagne/40 overflow-y-auto px-6">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 py-5">
                    <div className="aspect-[4/5] w-20 shrink-0">
                      <Placeholder tone={item.tone} label="" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="font-display text-xl leading-tight text-emerald">{item.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-charcoal/55">{formatINR(item.unitPrice)}</p>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center border border-champagne/70">
                          <button type="button" aria-label={`Decrease quantity of ${item.name}`} onClick={() => setQuantity(item.id, item.quantity - 1)} className="h-8 w-8 text-emerald hover:bg-cream">
                            −
                          </button>
                          <span className="w-8 text-center text-sm" aria-live="polite">
                            {item.quantity}
                          </span>
                          <button type="button" aria-label={`Increase quantity of ${item.name}`} onClick={() => setQuantity(item.id, item.quantity + 1)} className="h-8 w-8 text-emerald hover:bg-cream">
                            +
                          </button>
                        </div>
                        <button type="button" onClick={() => removeItem(item.id)} className="text-[0.68rem] uppercase tracking-[0.18em] text-charcoal/60 underline-offset-4 hover:text-emerald hover:underline">
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-emerald">{formatINR(item.unitPrice * item.quantity)}</p>
                  </li>
                ))}
              </ul>
              <div className="border-t border-champagne/50 px-6 py-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-[0.22em] text-charcoal/70">Subtotal</span>
                  <span className="font-display text-3xl text-emerald">{formatINR(subtotal)}</span>
                </div>
                <p className="mt-2 text-xs text-charcoal/55">Delivery and taxes are calculated at checkout.</p>
                <Button disabled className="mt-5 w-full">
                  Checkout opens soon
                </Button>
              </div>
            </>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
