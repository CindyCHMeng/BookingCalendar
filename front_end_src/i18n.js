import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './util/i18n/en.json';
import tw from './util/i18n/zh-TW.json';

const resources = {
  'en-US': {
    translation: en,
  },
  'zh-TW': {
    translation: tw,
  },
};

const browserLanguage = window.navigator.userLanguage || window.navigator.language;

i18n.use(initReactI18next).init({
  resources,
  lng: browserLanguage,     // 預設語言
  fallbackLng: 'en-US',     // 如果當前切換的語言沒有對應的翻譯則使用這個語言，
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;