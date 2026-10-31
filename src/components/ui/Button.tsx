import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'outline' | 'light' | 'outlineLight';

interface ButtonProps {
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  children: React.ReactNode;
}

const base =
  'inline-flex items-center justify-center gap-2 px-7 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-emerald text-ivory ring-1 ring-inset ring-transparent hover:bg-forest hover:ring-gold',
  outline: 'border border-emerald text-emerald hover:bg-emerald hover:text-ivory',
  light: 'bg-ivory text-emerald hover:bg-champagne',
  outlineLight: 'border border-champagne/70 text-champagne hover:bg-champagne hover:text-forest',
};

export function Button({ variant = 'primary', href, onClick, disabled, type = 'button', className, children }: ButtonProps) {
  const classes = cn(base, variants[variant], className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
