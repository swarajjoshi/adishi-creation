
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { categories } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { CategoryHero } from '@/components/shop/CategoryHero';

export const dynamicParams = false;

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  return { title: category?.label ?? 'Collection' };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  return (
    <>
      <CategoryHero category={category} />

      <section className="container-page py-20 lg:py-28">
        <p className="max-w-xl text-base leading-relaxed text-charcoal/75">
          {`${category.tagline} The full ${category.label.toLowerCase()} catalogue, with search, filters and product pages, is being prepared.`}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/">Back to home</Button>

          {category.slug === 'bouquets' && (
            <Button href="/customize" variant="outline">
              Create your own bouquet
            </Button>
          )}
        </div>
      </section>
    </>
  );
}
