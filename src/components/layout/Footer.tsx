import Link from 'next/link';
import { Logo } from '@/components/layout/Logo';
import { categories } from '@/config/site';

export function Footer() {
  return (
    <footer className="border-t border-champagne/60 bg-cream">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm font-display text-2xl leading-snug text-emerald">Thoughtfully made. Beautifully remembered.</p>
        </div>
        <nav aria-label="Shop" className="md:col-span-3 md:col-start-7">
          <p className="eyebrow">Shop</p>
          <ul className="mt-5 space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="text-charcoal/75 transition-colors hover:text-emerald">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Studio" className="md:col-span-3">
          <p className="eyebrow">Studio</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link href="/customize" className="text-charcoal/75 transition-colors hover:text-emerald">
                Create your own bouquet
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-champagne/50">
        <p className="container-page py-6 text-xs tracking-wide text-charcoal/55">© {new Date().getFullYear()} ADISHI CREATION. All rights reserved.</p>
      </div>
    </footer>
  );
}
