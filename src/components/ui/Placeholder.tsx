import type { Tone } from '@/config/site';
import { cn } from '@/lib/cn';

const tones: Record<Tone, { from: string; to: string; ink: string }> = {
  blush: { from: '#F4E3DD', to: '#E2BFB4', ink: '#5B3A33' },
  sage: { from: '#D3DCD1', to: '#9DB29F', ink: '#23382B' },
  cream: { from: '#F6F1E6', to: '#E4D9C1', ink: '#4A3F2A' },
  emerald: { from: '#0C5A46', to: '#063D30', ink: '#DCC18A' },
  champagne: { from: '#F1E3C0', to: '#D6BB82', ink: '#4F3E18' },
};

interface PlaceholderProps {
  tone?: Tone;
  label?: string;
  className?: string;
  /** Soft arch top instead of a plain rectangle */
  arch?: boolean;
}

/**
 * Honest stand-in for product photography. Swap for <Image> once real photos exist.
 * It is a plain gradient, not a render of any real product.
 */
export function Placeholder({ tone = 'cream', label = 'Photograph', className, arch = false }: PlaceholderProps) {
  const t = tones[tone];
  return (
    <div
      role="img"
      aria-label={`${label} placeholder`}
      className={cn('relative h-full w-full overflow-hidden', arch && 'rounded-t-[999px]', className)}
      style={{ background: `linear-gradient(160deg, ${t.from} 0%, ${t.to} 100%)` }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-[0.18]" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g fill="none" stroke={t.ink} strokeWidth="0.3">
          <circle cx="50" cy="48" r="10" />
          <circle cx="50" cy="48" r="20" />
          <circle cx="50" cy="48" r="30" />
          <circle cx="50" cy="48" r="40" />
        </g>
      </svg>
      <span
        className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.6rem] font-medium uppercase tracking-[0.24em]"
        style={{ color: t.ink, opacity: 0.7 }}
      >
        {label}
      </span>
    </div>
  );
}
