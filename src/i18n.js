import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const languages = [
  'en',
  'es'
];
const sections = [
  'login',
  'home',
  'form'
];

const resources = languages.reduce((acc, lang) => {
  acc[lang] = sections.reduce((secAcc, section) => {
    secAcc[section] = require(`./languages/${section}/${lang}/translate.json`);
    return secAcc;
  }, {});
  return acc;
}, {});

i18n
  .use(detector)
  .use(initReactI18next) 
  .init({
    resources,
    fallbackLng: "en", 
    ns: sections,
    lng: "en",
    defaultNS: 'translate',
    detection: {
      order: ['navigator'],
      lookupNavigator: true,
    },
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;