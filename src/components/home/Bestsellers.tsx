import { bestsellers } from '@/data/products';
import { ProductCard } from '@/components/home/ProductCard';
import { Reveal } from '@/components/ui/Reveal';

export function Bestsellers() {
  return (
    <section className="bg-cream py-24 lg:py-36">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Bestselling creations</p>
          <h2 className="display mt-5 text-4xl text-emerald sm:text-5xl lg:text-6xl">Loved, gifted, and given again.</h2>
        </Reveal>
        <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {bestsellers.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
