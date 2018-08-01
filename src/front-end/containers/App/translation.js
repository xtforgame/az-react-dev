import { registerTranslationData } from '~/utils/translationManager';

export const translationData = {
  defaultMessages: {
    greetText: 'Hi, user.',
  },
  translation: {
    de: {
      greetText: 'Hallo {user}.',
    },
    en: {
      greetText: 'Hi, {user}.',
    },
    ja: {
      greetText: '{user}さん、こんにちは。',
    },
    'zh-CN': {
      greetText: '早上好，{user}。',
    },
    'zh-TW': {
      greetText: '你好，{user}。',
    },
  },
};

const t = registerTranslationData('app.containers.App', translationData);
export const { messages } = t;
