'use client';

import { useState } from 'react';
import QuestionCards from './components/QuestionCards';
import LandingPage from './components/LandingPage';

export default function Home() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <LandingPage onStart={() => setStarted(true)} />;
  }

  return <QuestionCards />;
}
