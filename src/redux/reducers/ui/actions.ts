import { createAction } from 'redux-actions';
import i18n from '../../../i18n';
import APP from '../../../constants/app';

export const ACTIONS = {
  CHANGE_THEME: 'ui/CHANGE_THEME',
  CHANGE_LANGUAGE: 'ui/CHANGE_LANGUAGE',
} as const;

type IChangeThemeAction = {
  type: typeof ACTIONS.CHANGE_THEME;
  payload: typeof APP.THEMES[keyof typeof APP.THEMES];
};
export const changeTheme = createAction<IChangeThemeAction['payload']>(ACTIONS.CHANGE_THEME);

type IChangeLanguageAction = {
  type: typeof ACTIONS.CHANGE_LANGUAGE;
  payload: typeof APP.LANGUAGES[keyof typeof APP.LANGUAGES];
};
const changeLanguageCreator = createAction<IChangeLanguageAction['payload']>(ACTIONS.CHANGE_LANGUAGE);
export const changeLanguage: typeof changeLanguageCreator = lang => {
  i18n.changeLanguage(lang);
  return changeLanguageCreator(lang);
};

export type AllUiActions = IChangeThemeAction | IChangeLanguageAction;
