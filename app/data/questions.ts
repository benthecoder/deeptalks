import { questionsZhTW } from './questionsZhTW';
import { questionsEn } from './questionsEn';
import type { Questions, SupportedLanguages } from '@/types';

export const questions: Questions = {
  en: questionsEn,
  'zh-TW': questionsZhTW,
};

export type { SupportedLanguages };
