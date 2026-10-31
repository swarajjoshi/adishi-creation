export type Tone = 'blush' | 'sage' | 'cream' | 'emerald' | 'champagne';
export type CategorySlug = 'bouquets' | 'hampers' | 'crochet' | 'crafts';

export const siteConfig = {
  name: 'ADISHI CREATION',
  shortName: 'ADISHI',
  description:
    'Handmade bouquets, hampers, crochet and crafts, designed to turn your most meaningful moments into something unforgettable.',
  // Replace the file at public/brand/adishi-logo.png with the official logo.
  logo: { src: '/brand/adishi-logo.png', alt: 'ADISHI CREATION' },
} as const;

export interface Category {
  slug: CategorySlug;
  label: string;
  tagline: string;
  tone: Tone;
}

export const categories: Category[] = [
  { slug: 'bouquets', label: 'Bouquets', tagline: 'Roses, tulips and sunflowers, wrapped by hand.', tone: 'blush' },
  { slug: 'hampers', label: 'Hampers', tagline: 'Curated gift sets, chocolates and keepsakes.', tone: 'champagne' },
  { slug: 'crochet', label: 'Crochet', tagline: 'Everlasting flowers and keepsakes, stitch by stitch.', tone: 'sage' },
  { slug: 'crafts', label: 'Crafts', tagline: 'Artistic handmade pieces and personalised gifts.', tone: 'cream' },
];

export const navLinks = categories.map((c) => ({ href: `/${c.slug}`, label: c.label }));
