import { useEffect, useState } from 'react';

/** True only after the first client render. Prevents server/client mismatches for persisted state. */
export function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
