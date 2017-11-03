/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import deLocaleData from 'react-intl/locale-data/de';
import jaLocaleData from 'react-intl/locale-data/ja';
import zhLocaleData from 'react-intl/locale-data/zh';

import { DEFAULT_LOCALE } from '~/containers/App/constants';

import enTranslationMessages from './translations/en.json';
import deTranslationMessages from './translations/de.json';
import jaTranslationMessages from './translations/ja.json';
import zhTWTranslationMessages from './translations/zh-TW.json';
import zhCNTranslationMessages from './translations/zh-CN.json';

addLocaleData(enLocaleData);
addLocaleData(deLocaleData);
addLocaleData(jaLocaleData);
addLocaleData(zhLocaleData);

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
  '?体中文',
];

let localeIndex = {};
appLocales.map((appLocale, i) => {
  localeIndex[appLocale] = i;
});

let localeNameIndex = {};
appLocaleNames.map((appLocaleName, i) => {
  localeNameIndex[appLocaleName] = i;
});

export {
  localeIndex,
  localeNameIndex,
};

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
      ? defaultFormattedMessages[key]
      : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  de: formatTranslationMessages('de', deTranslationMessages),
  ja: formatTranslationMessages('ja', jaTranslationMessages),
  'zh-TW': formatTranslationMessages('zh-TW', zhTWTranslationMessages),
  'zh-CN': formatTranslationMessages('zh-CN', zhCNTranslationMessages),
};
