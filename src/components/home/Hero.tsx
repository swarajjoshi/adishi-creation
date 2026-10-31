import { Button } from '@/components/ui/Button';
import { HeroVisual } from '@/components/home/HeroVisual';

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ivory pb-16 pt-28 lg:pt-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="eyebrow">Handmade bouquets · Hampers · Crochet · Crafts</p>
          <h1 className="display mt-6 text-[clamp(2.9rem,7vw,6rem)] text-emerald">
            Thoughtfully made.
            <br />
            <span className="italic text-gilt">Beautifully remembered.</span>
          </h1>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-charcoal/75 sm:text-lg">
            Handcrafted creations, designed to turn your most meaningful moments into something unforgettable.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/#collections">Explore collection</Button>
            <Button href="/customize" variant="outline">
              Create your own bouquet
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          {/* Arch-shaped stage for the 3D bouquet */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-t-[999px] bg-gradient-to-b from-emerald to-forest">
            <HeroVisual />
            <div className="pointer-events-none absolute inset-3 rounded-t-[999px] border border-gold/50" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
