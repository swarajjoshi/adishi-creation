import { create } from 'zustand';
import type { Tone } from '@/config/site';

export interface TransitionRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface TransitionOrigin {
  id: number;
  rect: TransitionRect;
  tone: Tone;
  label: string;
  href: string;
}

type Phase = 'idle' | 'covering' | 'revealing';

interface TransitionState {
  origin: TransitionOrigin | null;
  /** 'covering' = overlay hides the page, 'revealing' = overlay is dissolving */
  phase: Phase;
  /** True once the destination page has mounted */
  ready: boolean;
  /** Text for the screen-reader live region */
  announcement: string;
  start: (origin: Omit<TransitionOrigin, 'id'>) => void;
  markReady: (href: string) => void;
  beginReveal: () => void;
  finish: () => void;
}

let counter = 0;

/** Not persisted: transitions are momentary UI state, never saved. */
export const useTransitionStore = create<TransitionState>()((set, get) => ({
  origin: null,
  phase: 'idle',
  ready: false,
  announcement: '',
  start: (origin) =>
    set({
      origin: { ...origin, id: ++counter },
      phase: 'covering',
      ready: false,
      announcement: `Opening ${origin.label}`,
    }),
  markReady: (href) => {
    const { origin } = get();
    if (origin && origin.href === href) set({ ready: true });
  },
  beginReveal: () => set({ phase: 'revealing' }),
  finish: () => {
    const { origin } = get();
    set({
      origin: null,
      phase: 'idle',
      ready: false,
      announcement: origin ? `${origin.label} collection` : '',
    });
  },
}));
