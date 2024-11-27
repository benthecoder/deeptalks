'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Inter } from 'next/font/google';
import { colorPairs } from './colors';
import styles from './styles.module.css';

const inter = Inter({ subsets: ['latin'] });

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
      className={`min-h-screen flex flex-col items-center justify-center p-4 ${inter.className} ${styles.transition}`}
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
        initial={{ y: 10 }} // Starts 5 pixels below its final position
        animate={{ y: 0 }} // Animates to its natural position
        transition={{ delay: 0.2 }} // Waits 0.2 seconds before starting
        className="text-center space-y-8"
      >
        <h1 className="text-5xl md:text-7xl font-bold">deeptalks</h1>
        <p
          className="max-w-md mx-auto font-light text-lg md:text-xl"
          style={{ opacity: 0.8 }}
        >
          A list of interesting questions to better know your friends, family,
          lovers, coworkers, nemeses, and yourself.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-8 py-3 text-lg rounded-lg transition-all duration-300"
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
