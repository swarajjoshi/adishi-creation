import type { Tone } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { Placeholder } from '@/components/ui/Placeholder';

interface ComingSoonProps {
  eyebrow: string;
  title: string;
  message: string;
  tone: Tone;
  /** Show the "Create your own bouquet" button. Only the Bouquets category and the builder page opt in. */
  showBuilderCta?: boolean;
}

/** A real page for sections not built yet, so no navigation link ever dead-ends. */
export function ComingSoon({ eyebrow, title, message, tone, showBuilderCta = false }: ComingSoonProps) {
  return (
    <section className="container-page grid min-h-[80svh] items-center gap-12 pb-20 pt-32 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-5 text-5xl sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal/75">{message}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/">Back to home</Button>
          {showBuilderCta && (
            <Button href="/customize" variant="outline">
              Create your own bouquet
            </Button>
          )}
        </div>
      </div>
      <div className="mx-auto aspect-[4/5] w-full max-w-sm lg:col-span-5">
        <Placeholder tone={tone} label={title} arch />
      </div>
    </section>
  );
}
