
import { categories } from '@/config/site';
import { Placeholder } from '@/components/ui/Placeholder';
import { Reveal } from '@/components/ui/Reveal';
import { TransitionLink } from '@/components/motion/TransitionLink';

export function Collections() {
  return (
    <section id="collections" className="bg-ivory pb-24 lg:pb-36">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">The collections</p>
          <h2 className="display mt-5 text-4xl text-emerald sm:text-5xl lg:text-6xl">
            Four ways to say it with care.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <TransitionLink
                href={`/${c.slug}`}
                tone={c.tone}
                label={c.label}
                className="group block"
              >
                <div data-transition-media className="aspect-[3/4] overflow-hidden">
                  <div className="h-full w-full transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]">
                    <Placeholder tone={c.tone} label={c.label} />
                  </div>
                </div>

                <div className="mt-5 flex items-baseline justify-between border-b border-champagne/60 pb-4">
                  <h3 className="font-display text-2xl text-emerald">
                    {c.label}
                  </h3>
                  <span className="text-[0.68rem] uppercase tracking-[0.22em] text-gilt transition-transform duration-500 ease-luxe group-hover:translate-x-1">
                    View →
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
                  {c.tagline}
                </p>
              </TransitionLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
