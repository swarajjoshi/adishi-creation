'use client';

import { useState } from 'react';
import type { Product } from '@/data/products';
import { useCartStore } from '@/store/cart';
import { formatINR } from '@/lib/format';
import { Placeholder } from '@/components/ui/Placeholder';
import { Button } from '@/components/ui/Button';

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem({ id: product.id, name: product.name, unitPrice: product.price, category: product.category, tone: product.tone });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <article className="group flex flex-col">
      <div className="aspect-[4/5] overflow-hidden">
        <div className="h-full w-full transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]">
          <Placeholder tone={product.tone} label="Product photograph" />
        </div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl leading-tight text-emerald">{product.name}</h3>
        <p className="whitespace-nowrap pt-1 text-sm font-medium text-charcoal">{formatINR(product.price)}</p>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{product.blurb}</p>
      <Button variant="outline" onClick={handleAdd} className="mt-5 w-full">
        {justAdded ? 'Added ✓' : 'Add to cart'}
      </Button>
    </article>
  );
}
