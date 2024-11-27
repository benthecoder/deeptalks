import { useState, useEffect } from 'react';
import { colorPairs } from '@/data/colors';

export function useColorTransition() {
  const [colorIndex, setColorIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setColorIndex(Math.floor(Math.random() * colorPairs.length));
  }, []);

  const [bgColor, textColor] = colorPairs[colorIndex];

  return {
    colorIndex,
    setColorIndex,
    bgColor,
    textColor,
    mounted,
  };
}
