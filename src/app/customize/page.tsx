import type { Metadata } from 'next';
import { ComingSoon } from '@/components/ui/ComingSoon';

export const metadata: Metadata = { title: 'Customize your bouquet' };

export default function CustomizePage() {
  return (
    <ComingSoon
      eyebrow="Bouquet studio"
      title="Create your own bouquet"
      message="Choose your wrapping, shape and flowers, and watch your bouquet come together. The studio is being prepared."
      tone="blush"
      showBuilderCta
    />
  );
}
