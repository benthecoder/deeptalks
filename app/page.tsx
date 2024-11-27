'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
import { questions } from './questions';

const colorPairs = [
  ['#1A1E2E', '#B8C0D4'], // Deep navy & cloud white
  ['#2D1B2E', '#BFA8C0'], // Rich plum & soft lilac
  ['#1E2C2B', '#A8C5C3'], // Dark teal & misty sage
  ['#252333', '#B6B4C9'], // Midnight purple & lavender frost
  ['#1D2733', '#A9B6C7'], // Ocean depth & morning blue
  ['#2A1F2D', '#BFB4C2'], // Dark mulberry & pearl pink
  ['#1F2C25', '#AFC5BA'], // Forest shadow & mint mist
  ['#2C2126', '#C4B5BA'], // Dark rosewood & shell pink
  ['#212E36', '#B0BDC5'], // Deep slate & arctic grey
  ['#2B2A1F', '#C3C2B7'], // Dark olive & cream silk
  ['#1E1F2D', '#B0B1BF'], // Night indigo & twilight grey
  ['#2D2320', '#C5BBB8'], // Dark cocoa & almond cream
  ['#1B2B32', '#A7B7BE'], // Dark cerulean & sea foam
  ['#2E2633', '#C0BDC7'], // Dark amethyst & moon glow
  ['#232E2A', '#B5C0BC'], // Dark emerald & morning frost
  ['#2D1E1F', '#C5B6B7'], // Dark burgundy & rose dust
  ['#1F2D2D', '#B1BFBF'], // Dark cyan & silver mist
  ['#2B1D29', '#C3B5C1'], // Dark orchid & dawn pink
  ['#202C1F', '#B2BEB1'], // Dark pine & sage frost
  ['#2E2228', '#C6BAC0'], // Dark mahogany & pearl white
];

export default function QuestionCards() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // Add this line

  const getRandomIndex = (max: number, exclude: number): number => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * max);
    } while (newIndex === exclude);
    return newIndex;
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      getRandomIndex(questions.length, prevIndex)
    );
    setColorIndex((prevIndex) => getRandomIndex(colorPairs.length, prevIndex));
    setProgress(0);
  };

  // Add these mouse event handlers
  const handleMouseDown = () => {
    setIsPaused(true);
  };

  const handleMouseUp = () => {
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setCurrentQuestionIndex((prevIndex) =>
            getRandomIndex(questions.length, prevIndex)
          );
          setColorIndex((prevIndex) =>
            getRandomIndex(colorPairs.length, prevIndex)
          );
          return 0;
        }
        return Math.min(oldProgress + 0.333, 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, isPaused]);

  const [bgColor, textColor] = colorPairs[colorIndex];

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden cursor-pointer bg-grain ${inter.className}`}
      onClick={goToNextQuestion}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        userSelect: 'none', // Add these properties
        WebkitUserSelect: 'none', // for cross-browser
        msUserSelect: 'none', // text selection
        MozUserSelect: 'none', // prevention
      }}
    >
      <motion.div
        className="w-full max-w-3xl relative px-4 md:px-6"
        initial={false}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-[200px] flex items-center justify-center py-8"
          >
            <p className="text-xl sm:text-4xl md:text-4xl text-center leading-relaxed font-light max-w-2xl mx-auto">
              {questions[currentQuestionIndex]}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="fixed bottom-0 left-0 right-0 p-6">
          <motion.div
            className="w-full max-w-xl mx-auto h-[10px] overflow-hidden rounded-full opacity-50"
            style={{ backgroundColor: `${textColor}15` }}
            initial={false}
          >
            <motion.div
              className="h-full"
              style={{ backgroundColor: textColor }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
