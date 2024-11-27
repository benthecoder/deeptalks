import { motion } from 'framer-motion';
import type { SupportedLanguages } from '@/types';

interface LanguageToggleProps {
  language: SupportedLanguages;
  setLanguage: (lang: SupportedLanguages) => void;
  textColor: string;
}

export default function LanguageToggle({
  language,
  setLanguage,
  textColor,
}: LanguageToggleProps) {
  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'zh-TW' : 'en');
  };

  return (
    <motion.button
      onClick={handleLanguageToggle}
      whileHover={{ scale: 1.02 }} // Reduced scale effect
      whileTap={{ scale: 0.98 }} // Reduced scale effect
      className="relative w-12 h-12 rounded-full flex items-center justify-center"
      style={{
        backgroundColor: `${textColor}10`,
        border: `1px solid ${textColor}25`,
      }}
    >
      <div className="relative w-6 h-6">
        <motion.div
          initial={false}
          animate={{
            opacity: language === 'en' ? 1 : 0,
            scale: language === 'en' ? 1 : 0.5,
            rotateY: language === 'en' ? 0 : 180,
          }}
          transition={{ duration: 0.2 }}
          style={{ color: textColor }}
          className="absolute inset-0 flex items-center justify-center"
        >
          En
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            opacity: language === 'zh-TW' ? 1 : 0,
            scale: language === 'zh-TW' ? 1 : 0.5,
            rotateY: language === 'zh-TW' ? 0 : -180,
          }}
          transition={{ duration: 0.2 }}
          style={{ color: textColor }}
          className="absolute inset-0 flex items-center justify-center"
        >
          中
        </motion.div>
      </div>
    </motion.button>
  );
}
