const translations = {
  'en': {
    'error.bad-tune': "Empty tune or unknown format",
    'play': 'Play',
    'pause': 'Pause',
    'stop': 'Stop'
  },

  'ru': {
    'error.bad-tune': 'Пустая мелодия или ошибка в записи',
    'play': 'Играть',
    'pause': 'Пауза',
    'stop': 'Остановить'
  }
};

const lang = 'en';

/**
 * Translate by key
 *
 * @param key
 * @returns {string}
 */
const translate = key =>
  translations
  && translations[lang]
  && translations[lang][key]
  || key;

export default translate;
