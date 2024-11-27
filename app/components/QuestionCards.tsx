'use client';

// React imports
import { useState, useEffect, useRef } from 'react';

// Third-party imports
import { motion, AnimatePresence } from 'framer-motion';
import { Inter } from 'next/font/google';

// Local imports
import LanguageToggle from './LanguageToggle';
import { questions } from '@/data/questions';
import { colorPairs } from '@/data/colors';

import { useColorTransition, useLanguage } from '@/hooks';
import {
  PROGRESS_INCREMENT,
  CLICK_THRESHOLD,
  USER_SELECT_STYLES,
} from '@/lib/constants';

const inter = Inter({ subsets: ['latin'] });

export default function QuestionCards() {
  const { language, setLanguage } = useLanguage();
  const { bgColor, textColor, setColorIndex } = useColorTransition();

  const initialIndexRef = useRef(
    Math.floor(Math.random() * questions['en'].length)
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    initialIndexRef.current
  );
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mouseDownTime, setMouseDownTime] = useState(0);

  const goToNextQuestion = () => {
    const nextIndex = (currentQuestionIndex + 1) % questions[language].length;
    setCurrentQuestionIndex(nextIndex);
    setColorIndex((prevIndex) => (prevIndex + 1) % colorPairs.length);
    setProgress(0);
  };

  const handleInteractionStart = () => {
    setIsPaused(true);
    setMouseDownTime(Date.now());
  };

  const handleInteractionEnd = () => {
    setIsPaused(false);
    const isClick = Date.now() - mouseDownTime < CLICK_THRESHOLD;
    if (isClick) {
      goToNextQuestion();
    }
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          goToNextQuestion();
          return 0;
        }
        return Math.min(oldProgress + PROGRESS_INCREMENT, 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, isPaused, language, goToNextQuestion]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden cursor-pointer bg-grain ${inter.className}`}
      onMouseDown={handleInteractionStart}
      onMouseUp={handleInteractionEnd}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        ...USER_SELECT_STYLES,
      }}
    >
      <div className="absolute top-4 right-4">
        <LanguageToggle
          language={language}
          setLanguage={setLanguage}
          textColor={textColor}
        />
      </div>
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
              {questions[language][currentQuestionIndex]}
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
