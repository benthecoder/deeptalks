export const PROGRESS_INCREMENT = 0.333;
export const CLICK_THRESHOLD = 200;
export const DEFAULT_LANGUAGE = 'en' as const;

export const SUPPORTED_LANGUAGES = ['en', 'zh-TW'] as const;

export const SITE_METADATA = {
  title: 'deeptalks',
  description:
    'Discover profound questions that spark meaningful dialogues and deep self-reflection.',
  url: 'https://deeptalks.vercel.app',
} as const;

export const USER_SELECT_STYLES = {
  userSelect: 'none',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
  MozUserSelect: 'none',
} as const;
