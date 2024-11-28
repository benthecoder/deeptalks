'use client';

import { motion } from 'framer-motion';
import { Inter } from 'next/font/google';
import { Domine } from 'next/font/google';
import { colorPairs } from '@/data/colors';
import styles from '@/styles/styles.module.css';
import { useColorTransition } from '@/hooks';
import { USER_SELECT_STYLES } from '@/lib/constants';

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
  const { textColor, bgColor, mounted } = useColorTransition();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen flex flex-col items-center justify-center p-6 sm:p-8 bg-grain ${styles.transition}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        ...(mounted ? USER_SELECT_STYLES : {}),
      }}
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
          DeepTalks
        </h1>
        <p
          className={`max-w-xl mx-auto font-light text-lg sm:text-xl ${inter.className}`}
          style={{ opacity: 0.8 }}
        >
          questions to better know your friends, family, lovers, coworkers,
          nemeses, and yourself
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="px-8 py-3 text-lg sm:text-xl rounded-xl transition-all duration-300 backdrop-blur-sm"
          style={{
            border: `1px solid ${mounted ? textColor : colorPairs[0][1]}30`,
            backgroundColor: `${mounted ? textColor : colorPairs[0][1]}08`,
          }}
        >
          Start
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
