import { Button } from '@/components/ui/Button';
import { Placeholder } from '@/components/ui/Placeholder';
import { Reveal } from '@/components/ui/Reveal';

const steps = ['Choose your wrapping', 'Pick a shape', 'Select your flowers', 'Add chocolates, a teddy or a note'];

export function CustomizeIntro() {
  return (
    <section className="bg-ivory py-24 lg:py-36">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow">The bouquet studio</p>
          <h2 className="display mt-5 text-4xl text-emerald sm:text-5xl lg:text-6xl">Design a bouquet that is entirely yours.</h2>
          <ol className="mt-10 space-y-4">
            {steps.map((s, i) => (
              <li key={s} className="flex items-baseline gap-5 border-b border-champagne/60 pb-4">
                <span className="font-display text-xl italic text-gilt">0{i + 1}</span>
                <span className="text-base text-charcoal/80">{s}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Button href="/customize">Start creating</Button>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-6">
          <div className="aspect-[5/4] w-full">
            <Placeholder tone="sage" label="Bouquet studio preview" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
