import { Reveal } from '@/components/ui/Reveal';

const reasons = [
  { n: 'I', title: 'Made one at a time', text: 'Nothing is mass-produced. Each piece is shaped, wrapped and finished by hand.' },
  { n: 'II', title: 'Personal by design', text: 'Colours, flowers, notes and details are chosen around the person receiving them.' },
  { n: 'III', title: 'Made to be kept', text: 'We care about the unwrapping, and about what remains on the shelf afterwards.' },
];

export function WhyHandmade() {
  return (
    <section className="bg-emerald py-24 text-ivory lg:py-32">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow-light">Why handmade matters</p>
          <h2 className="display mt-5 text-4xl sm:text-5xl lg:text-6xl">A gift should feel like it was made for you.</h2>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.n} delay={i * 0.1}>
              <div className="border-t border-gold/60 pt-6">
                <span className="font-display text-3xl italic text-champagne">{r.n}</span>
                <h3 className="mt-4 font-display text-2xl">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/75">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
