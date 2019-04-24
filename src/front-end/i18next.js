import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

import {
  DEFAULT_LOCALE,
} from './containers/LanguageProvider/constants';

let resolved;
let initCallback = (t) => {
  resolved = t;
};

export const i18nextInited = new Promise((resolve) => {
  if (resolved) {
    resolve(resolved);
  } else {
    initCallback = resolve;
  }
});

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    ns: ['app-common'],
    defaultNS: 'app-common',

    // fallbackLng: 'en',
    fallbackLng: {
      'zh-TW': ['zh-TW', 'en'],
      'zh-CN': ['zh-CN', 'en'],
      default: ['en'],
    },
    // debug: true,

    // (overrides language detection)
    lng: DEFAULT_LOCALE,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      loadPath: 'translations/{{ns}}/{{lng}}.json',
    },
    react: {
      useSuspense: false,
    },
  }, (...args) => initCallback(...args));


export default i18n;


export const appLocales = [
  'en',
  'de',
  'ja',
  'zh-TW',
  'zh-CN',
];

export const appLocaleNames = [
  'English',
  'Deutsch',
  '日本語',
  '繁體中文',
  '简体中文',
];

export const localeIndex = {};
appLocales.forEach((appLocale, i) => {
  localeIndex[appLocale] = i;
});

export const localeNameIndex = {};
appLocaleNames.forEach((appLocaleName, i) => {
  localeNameIndex[appLocaleName] = i;
});
