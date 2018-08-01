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

import enTranslationFromJson from './translations/en.json';
import deTranslationFromJson from './translations/de.json';
import jaTranslationFromJson from './translations/ja.json';
import zhTWTranslationFromJson from './translations/zh-TW.json';
import zhCNTranslationFromJson from './translations/zh-CN.json';

import { translations } from '~/utils/translationManager';

// console.log('translations :', translations);

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
  '简体中文',
];

const localeIndex = {};
appLocales.forEach((appLocale, i) => {
  localeIndex[appLocale] = i;
});

const localeNameIndex = {};
appLocaleNames.forEach((appLocaleName, i) => {
  localeNameIndex[appLocaleName] = i;
});

let enTranslationMessages = null;
let deTranslationMessages = null;
let jaTranslationMessages = null;
let zhTWTranslationMessages = null;
let zhCNTranslationMessages = null;

const delayInit = () => {
  if (enTranslationMessages) {
    return;
  }
  enTranslationMessages = {
    ...enTranslationFromJson,
    ...translations.en,
  };

  deTranslationMessages = {
    ...deTranslationFromJson,
    ...translations.de,
  };

  jaTranslationMessages = {
    ...jaTranslationFromJson,
    ...translations.ja,
  };

  zhTWTranslationMessages = {
    ...zhTWTranslationFromJson,
    ...translations['zh-TW'],
  };

  zhCNTranslationMessages = {
    ...zhCNTranslationFromJson,
    ...translations['zh-CN'],
  };
};

export {
  localeIndex,
  localeNameIndex,
};

export const formatTranslationMessages = (locale, messages) => {
  delayInit();
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

export const getTranslationMessages = () => {
  delayInit();
  return {
    en: formatTranslationMessages('en', enTranslationMessages),
    de: formatTranslationMessages('de', deTranslationMessages),
    ja: formatTranslationMessages('ja', jaTranslationMessages),
    'zh-TW': formatTranslationMessages('zh-TW', zhTWTranslationMessages),
    'zh-CN': formatTranslationMessages('zh-CN', zhCNTranslationMessages),
  };
};
