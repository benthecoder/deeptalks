'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
import { questions } from './questions';
import { colorPairs } from './colors';

export default function QuestionCards() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mouseDownTime, setMouseDownTime] = useState(0);

  const handleMouseDown = () => {
    setIsPaused(true);
    setMouseDownTime(Date.now());
  };

  const handleMouseUp = () => {
    setIsPaused(false);

    // If mouse was down for less than 200ms, consider it a click
    const isClick = Date.now() - mouseDownTime < 200;
    if (isClick) {
      goToNextQuestion();
    }
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    setColorIndex((prevIndex) => (prevIndex + 1) % colorPairs.length);
    setProgress(0);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setCurrentQuestionIndex(
            (prevIndex) => (prevIndex + 1) % questions.length
          );
          setColorIndex((prevIndex) => (prevIndex + 1) % colorPairs.length);
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
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none',
        MozUserSelect: 'none',
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
