import { Reveal } from '@/components/ui/Reveal';

export function GiftingMessage() {
  return (
    <section className="bg-cream py-28 lg:py-40">
      <Reveal className="container-page text-center">
        <p className="eyebrow">A note on gifting</p>
        <blockquote className="display mx-auto mt-8 max-w-4xl text-3xl italic text-emerald sm:text-5xl lg:text-6xl">
          “Some gifts are remembered for the occasion. The best are remembered for the care.”
        </blockquote>
      </Reveal>
    </section>
  );
}
