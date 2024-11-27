'use client';

import { useState } from 'react';
import QuestionCards from './QuestionCards';
import LandingPage from './LandingPage';

export default function Home() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <LandingPage onStart={() => setStarted(true)} />;
  }

  return <QuestionCards />;
}
