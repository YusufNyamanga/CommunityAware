// Supported languages based on Qwen's capabilities
export const SUPPORTED_LANGUAGES = {
  'en': { name: 'English', nativeName: 'English' },
  'zh': { name: 'Chinese (Simplified)', nativeName: '简体中文' },
  'zh-tw': { name: 'Chinese (Traditional)', nativeName: '繁體中文' },
  'ar': { name: 'Arabic', nativeName: 'العربية' },
  'es': { name: 'Spanish', nativeName: 'Español' },
  'fr': { name: 'French', nativeName: 'Français' },
  'pt': { name: 'Portuguese', nativeName: 'Português' },
  'ru': { name: 'Russian', nativeName: 'Русский' },
  'hi': { name: 'Hindi', nativeName: 'हिन्दी' },
  'th': { name: 'Thai', nativeName: 'ไทย' },
  'id': { name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  'ms': { name: 'Malay', nativeName: 'Bahasa Melayu' },
  'tr': { name: 'Turkish', nativeName: 'Türkçe' },
  'ur': { name: 'Urdu', nativeName: 'اردو' },
  'bn': { name: 'Bengali', nativeName: 'বাংলা' },
  'ta': { name: 'Tamil', nativeName: 'தமिழ்' },
  'te': { name: 'Telugu', nativeName: 'తెలుగు' },
  'ml': { name: 'Malayalam', nativeName: 'മലയാളം' },
  'pa': { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  'ne': { name: 'Nepali', nativeName: 'नेपाली' },
  'am': { name: 'Amharic', nativeName: 'አማርኛ' },
  'sw': { name: 'Swahili', nativeName: 'Kiswahili' },
  'yo': { name: 'Yoruba', nativeName: 'Yorùbá' },
  'lg': { name: 'Luganda', nativeName: 'Luganda' },
  'tl': { name: 'Tagalog', nativeName: 'Tagalog' },
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;
export type LanguageInfo = typeof SUPPORTED_LANGUAGES[SupportedLanguage];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

// Get browser language or default to English
export const getBrowserLanguage = (): SupportedLanguage => {
  const browserLang = navigator.language.toLowerCase();
  
  // Check for exact match first
  if (browserLang in SUPPORTED_LANGUAGES) {
    return browserLang as SupportedLanguage;
  }
  
  // Check for language without region (e.g., 'en' from 'en-US')
  const langCode = browserLang.split('-')[0];
  if (langCode in SUPPORTED_LANGUAGES) {
    return langCode as SupportedLanguage;
  }
  
  // Special cases for Chinese
  if (browserLang.includes('zh-tw') || browserLang.includes('zh-hk')) {
    return 'zh-tw';
  }
  if (browserLang.includes('zh')) {
    return 'zh';
  }
  
  return DEFAULT_LANGUAGE;
};
