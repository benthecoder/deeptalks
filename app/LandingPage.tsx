'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Inter } from 'next/font/google';
import { Domine } from 'next/font/google';
import { colorPairs } from './colors';
import styles from './styles.module.css';

const inter = Inter({ subsets: ['latin'] });

const domine = Domine({
  subsets: ['latin'],
  variable: '--font-domine',
  weight: ['400', '500', '600', '700'],
});

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const [colorIndex, setColorIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setColorIndex(Math.floor(Math.random() * colorPairs.length));
  }, []);

  const [bgColor, textColor] = colorPairs[colorIndex];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen flex flex-col items-center justify-center p-6 sm:p-8 ${styles.transition}`}
      style={
        mounted
          ? {
              backgroundColor: bgColor,
              color: textColor,
              userSelect: 'none',
              WebkitUserSelect: 'none',
              msUserSelect: 'none',
              MozUserSelect: 'none',
            }
          : {}
      }
    >
      <motion.div
        initial={{ y: 10 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center space-y-10 w-full max-w-2xl px-4 sm:px-6"
      >
        <h1
          className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${domine.className}`}
        >
          deeptalks
        </h1>
        <p
          className={`max-w-xl mx-auto font-light text-lg sm:text-xl ${inter.className}`}
          style={{ opacity: 0.8 }}
        >
          A list of interesting questions to better know your friends, family,
          lovers, coworkers, nemeses, and yourself.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-10 py-4 text-xl sm:text-2xl rounded-xl transition-all duration-300"
          style={{
            border: `1px solid ${mounted ? textColor : colorPairs[0][1]}40`,
            backgroundColor: `${mounted ? textColor : colorPairs[0][1]}10`,
          }}
        >
          Start
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
