import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export function FinalCta() {
  return (
    <section className="bg-forest py-24 text-center text-ivory lg:py-32">
      <Reveal className="container-page">
        <p className="eyebrow-light">ADISHI CREATION</p>
        <h2 className="display mx-auto mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">Make something they will keep.</h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/bouquets" variant="light">
            Explore collection
          </Button>
          <Button href="/customize" variant="outlineLight">
            Create your own bouquet
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
