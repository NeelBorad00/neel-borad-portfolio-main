'use client';

import { useEffect, useState } from 'react';

export function NoiseOverlay() {
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const SIZE = 256;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext('2d')!;
    const img = ctx.createImageData(SIZE, SIZE);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.floor(Math.random() * 255);
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    setDataUrl(canvas.toDataURL());
  }, []);

  if (!dataUrl) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.028]"
      style={{
        backgroundImage: `url(${dataUrl})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
      }}
    />
  );
}
