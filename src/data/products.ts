import type { CategorySlug, Tone } from '@/config/site';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  /** Price in INR (whole rupees). SAMPLE DATA, replace with real prices. */
  price: number;
  blurb: string;
  tone: Tone;
  bestseller?: boolean;
}

// SAMPLE DATA. Names, prices and descriptions are placeholders until real products are supplied.
export const products: Product[] = [
  { id: 'bq-001', slug: 'blush-garden-bouquet', name: 'Blush Garden Bouquet', category: 'bouquets', price: 1899, blurb: 'Pink roses and cream tulips in layered ivory wrap.', tone: 'blush', bestseller: true },
  { id: 'bq-002', slug: 'sunlit-sunflower-bouquet', name: 'Sunlit Sunflower Bouquet', category: 'bouquets', price: 1499, blurb: 'Sunflowers hand-tied with soft ribbon.', tone: 'champagne', bestseller: true },
  { id: 'hp-001', slug: 'chocolate-keepsake-hamper', name: 'Chocolate Keepsake Hamper', category: 'hampers', price: 2799, blurb: 'Chocolates, a handwritten note and a small keepsake.', tone: 'cream', bestseller: true },
  { id: 'cr-001', slug: 'crochet-tulip-set', name: 'Crochet Tulip Set', category: 'crochet', price: 1299, blurb: 'Crocheted tulips that never wilt.', tone: 'sage', bestseller: true },
  { id: 'bq-003', slug: 'classic-red-rose-bouquet', name: 'Classic Red Rose Bouquet', category: 'bouquets', price: 2199, blurb: 'Deep red roses, Korean-style wrap.', tone: 'emerald' },
  { id: 'hp-002', slug: 'celebration-hamper', name: 'Celebration Hamper', category: 'hampers', price: 3499, blurb: 'A generous curated hamper for milestones.', tone: 'blush' },
  { id: 'cr-002', slug: 'crochet-sunflower-pot', name: 'Crochet Sunflower Pot', category: 'crochet', price: 899, blurb: 'A small crocheted sunflower in a tiny pot.', tone: 'champagne' },
  { id: 'cf-001', slug: 'hand-painted-memory-box', name: 'Hand-painted Memory Box', category: 'crafts', price: 1599, blurb: 'A keepsake box, painted and personalised.', tone: 'cream' },
];

export const bestsellers = products.filter((p) => p.bestseller);
