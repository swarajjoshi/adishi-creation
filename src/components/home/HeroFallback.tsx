/** Static illustration shown while the 3D scene loads, or when WebGL is unavailable. */
const BLOOMS: { cx: number; cy: number; c: string }[] = [
  { cx: 200, cy: 150, c: '#E5AFA7' },
  { cx: 150, cy: 185, c: '#F7F0E4' },
  { cx: 250, cy: 185, c: '#8E2B38' },
  { cx: 118, cy: 240, c: '#E6CDA3' },
  { cx: 200, cy: 230, c: '#D4848E' },
  { cx: 282, cy: 240, c: '#F7F0E4' },
  { cx: 160, cy: 275, c: '#8E2B38' },
  { cx: 240, cy: 275, c: '#E5AFA7' },
];

export function HeroFallback() {
  return (
    <svg viewBox="0 0 400 500" className="h-full w-full" role="img" aria-label="Illustration of a bouquet">
      <path d="M95 300 L305 300 L200 480 Z" fill="#F4ECDD" />
      <path d="M115 300 L285 300 L200 455 Z" fill="#E9CFC7" opacity="0.7" />
      <path d="M150 372 L250 372" stroke="#C6A15B" strokeWidth="3" strokeLinecap="round" />
      {BLOOMS.map((b, i) => (
        <g key={i}>
          <circle cx={b.cx} cy={b.cy} r="38" fill={b.c} />
          <circle cx={b.cx} cy={b.cy} r="26" fill="#fff" opacity="0.18" />
          <circle cx={b.cx} cy={b.cy} r="14" fill="#000" opacity="0.1" />
        </g>
      ))}
    </svg>
  );
}
