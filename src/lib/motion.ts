/** Shared motion tokens. One easing curve is used everywhere so movement feels consistent. */
export const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  /** Category image expanding to fill the screen */
  expand: 0.9,
  expandCompact: 0.65, // phones: slightly quicker
  /** Transition layer dissolving to reveal the new page */
  dissolve: 0.55,
} as const;
