import { defineMessages } from 'react-intl';

const translations = {};
export {
  translations,
};


const addPrefix = (prefix, entryName) => `${prefix}.${entryName}`;

const addPrefixToKeys = (prefix, obj) => {
  const result = {};
  Object.keys(obj).forEach((key) => {
    result[addPrefix(prefix, key)] = obj[key];
  });
  return result;
};

export const registerTranslationData = (prefix, translationData) => {
  const translationMap = translationData.translation;
  const messageData = {};
  Object.keys(translationMap).forEach((locale) => {
    translations[locale] = {
      ...translations[locale],
      ...addPrefixToKeys(prefix, translationMap[locale]),
    };
    Object.keys(translationMap[locale]).forEach((entryName) => {
      let defaultMessage;
      if (translationData.defaultMessages[entryName]) {
        defaultMessage = translationData.defaultMessages[entryName];
      }
      messageData[entryName] = {
        id: addPrefix(prefix, entryName),
        defaultMessage,
      };
    });
  });

  // console.log('translations :', translations);
  // console.log('messageData :', messageData);

  const messages = defineMessages(messageData);

  return {
    messages,
  };
};
