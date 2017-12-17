import { defineMessages } from 'react-intl';

const translations = {};
export {
  translations,
};


const addPrefix = (prefix, entryName) => {
  return `${prefix}.${entryName}`;
};

const addPrefixToKeys = (prefix, obj) => {
  let result = {};
  Object.keys(obj).map(key => {
    result[addPrefix(prefix, key)] = obj[key];
  });
  return result;
};

export const registerTranslationData = (prefix, translationData) => {
  const translationMap = translationData.translation;
  const messageData = {};
  Object.keys(translationMap).map(locale => {
    translations[locale] = {
      ...translations[locale],
      ...addPrefixToKeys(prefix, translationMap[locale]),
    };
    Object.keys(translationMap[locale]).map(entryName => {
      let defaultMessage = undefined;
      if(translationData.defaultMessages[entryName]){
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
}
