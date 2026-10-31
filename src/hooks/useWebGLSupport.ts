import { useEffect, useState } from 'react';

/** null = still checking, true/false = result. */
export function useWebGLSupport() {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = (canvas.getContext('webgl2') || canvas.getContext('webgl')) as WebGLRenderingContext | null;
      setSupported(!!gl);
      gl?.getExtension('WEBGL_lose_context')?.loseContext(); // free the test context immediately
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
