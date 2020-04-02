import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import APP from '../constants/app';

const resources = {
  [APP.LANGUAGES.EN]: {
    translation: {
      'Symbol': 'Symbol',
      'Last price': 'Last price',
      'Change': 'Change',
      'Volume': 'Volume',
      'No symbols found': 'No symbols found',
      'Something went wrong': 'Something went wrong',
      'Try again': 'Try again',
      'Change theme': 'Change theme',
      'Change language': 'Change language',
      'Imitate disconnection': 'Imitate disconnection',
      'Imitate error': 'Imitate error',
      'Show component': 'Show component',
      'Hide component': 'Hide component',
    }
  },
  [APP.LANGUAGES.RU]: {
    translation: {
      'Symbol': 'Тикер',
      'Last price': 'Цена',
      'Change': 'Изменение',
      'Volume': 'Объем',
      'No symbols found': 'Символы не найдены',
      'Something went wrong': 'Что-то пошло не так',
      'Try again': 'Попробовать снова',
      'Change theme': 'Изменить тему',
      'Change language': 'Изменить язык',
      'Imitate disconnection': 'Сымитировать разрыв соединения',
      'Imitate error': 'Сымитировать ошибку сервера',
      'Show component': 'Показать компонент',
      'Hide component': 'Скрыть компонент',
    }
  },
  [APP.LANGUAGES.CH]: {
    translation: {
      'Symbol': '工具',
      'Last price': '最后价格',
      'Change': '变动',
      'Volume': '交量',
      'No symbols found': '找不到符号',
      'Something went wrong': '出了些问题',
      'Try again': '再试一次',
      'Change theme': '改变主题',
      'Change language': '改变语言',
      'Imitate disconnection': '断线',
      'Imitate error': '模拟错误',
      'Show component': '显示组件',
      'Hide component': '隐藏组件',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: APP.LANGUAGES.EN,
    keySeparator: false,
    interpolation: {
      escapeValue: true,
    }
  });

export default i18n;