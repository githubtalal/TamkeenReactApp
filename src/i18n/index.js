import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enCommon from './locals/enCommon';
import arCommon from './locals/arCommon';

const resources = {
  en: {
    common: enCommon
  },
  ar: {
    common: arCommon
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false // React already safe from XSS
    }
  });

export default i18n;