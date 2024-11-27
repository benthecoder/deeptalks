export type SupportedLanguages = 'en' | 'zh-TW';

export interface Questions {
  en: string[];
  'zh-TW': string[];
}

export interface ColorPair {
  background: string;
  text: string;
}
