'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/layout/Logo';
import { CartButton } from '@/components/layout/CartButton';
import { navLinks } from '@/config/site';
import { cn } from '@/lib/cn';

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Shrinks after a little scroll, hides when scrolling down, returns when scrolling up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setCompact(y > 40);
    if (y > 320 && y > previous) setHidden(true);
    else if (y < previous) setHidden(false);
  });

  // Close the mobile menu on route change.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Lock page scroll and support Escape while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        onFocusCapture={() => setHidden(false)}
        className={cn(
          'fixed inset-x-0 top-0 z-40 border-b transition-[transform,background-color,border-color] duration-500 ease-luxe',
          hidden ? '-translate-y-full' : 'translate-y-0',
          compact ? 'border-champagne/50 bg-ivory/95' : 'border-transparent bg-ivory',
        )}
      >
        <div
          className={cn(
            'container-page grid grid-cols-[1fr_auto] items-center transition-[height] duration-500 ease-luxe md:grid-cols-[1fr_auto_1fr]',
            compact ? 'h-16' : 'h-20 md:h-[88px]',
          )}
        >
          {/* Left: logo */}
          <div className="flex items-center">
            <Logo compact={compact} />
          </div>

          {/* Center: primary navigation (desktop) */}
          <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group relative py-2 text-[0.72rem] font-medium uppercase tracking-[0.24em] transition-colors',
                    active ? 'text-emerald' : 'text-charcoal/70 hover:text-emerald',
                  )}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-luxe group-hover:scale-x-100" />
                  {active && <motion.span layoutId="nav-active" className="absolute -bottom-0.5 left-0 h-px w-full bg-gold" />}
                </Link>
              );
            })}
          </nav>

          {/* Right: customize + cart + menu button */}
          <div className="flex items-center justify-end gap-1 sm:gap-3">
            <Link
              href="/customize"
              className="group relative hidden items-center gap-2 bg-emerald px-5 py-3 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-champagne transition-colors duration-300 hover:bg-forest sm:inline-flex"
            >
              <span className="pointer-events-none absolute inset-[3px] border border-gold/60 transition-colors group-hover:border-gold" />
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
              Customize
            </Link>
            <CartButton />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center text-emerald md:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M4 8h16M4 16h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu: a sibling of <header> (not inside it) so it can cover the whole screen */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col bg-ivory md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-page flex h-20 items-center justify-between">
              <Logo onClick={() => setMenuOpen(false)} />
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center text-emerald">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <nav aria-label="Mobile" className="container-page flex flex-1 flex-col justify-center gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    aria-current={pathname === link.href ? 'page' : undefined}
                    className={cn(
                      'block border-b border-champagne/50 py-4 font-display text-4xl',
                      pathname === link.href ? 'text-gilt' : 'text-emerald',
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="pt-8"
              >
                <Link
                  href="/customize"
                  className="flex items-center justify-center bg-emerald px-6 py-5 text-[0.75rem] font-medium uppercase tracking-[0.24em] text-champagne ring-1 ring-inset ring-gold"
                >
                  Customize your bouquet
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
