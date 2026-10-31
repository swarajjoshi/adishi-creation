import { Hero } from '@/components/home/Hero';
import { Philosophy } from '@/components/home/Philosophy';
import { Collections } from '@/components/home/Collections';
import { Bestsellers } from '@/components/home/Bestsellers';
import { WhyHandmade } from '@/components/home/WhyHandmade';
import { CustomizeIntro } from '@/components/home/CustomizeIntro';
import { GiftingMessage } from '@/components/home/GiftingMessage';
import { FinalCta } from '@/components/home/FinalCta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Collections />
      <Bestsellers />
      <WhyHandmade />
      <CustomizeIntro />
      <GiftingMessage />
      <FinalCta />
    </>
  );
}
