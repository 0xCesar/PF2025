'use client';

import { useEffect, useState } from 'react';

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!(window.WebGLRenderingContext && gl && gl instanceof WebGLRenderingContext);
  } catch (e) {
    return false;
  }
}

export function useWebGLSupport() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setIsSupported(checkWebGLSupport());
  }, []);

  return isSupported;
}
