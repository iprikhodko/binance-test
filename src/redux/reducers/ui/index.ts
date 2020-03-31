import APP from '../../../constants/app';
import { ACTIONS, AllUiActions } from './actions';

export interface IUiState {
  theme: typeof APP.THEMES[keyof typeof APP.THEMES],
  language: typeof APP.LANGUAGES[keyof typeof APP.LANGUAGES],
}

const initialState: IUiState = {
  theme: APP.THEMES.DARK,
  language: APP.LANGUAGES.EN,
};

const uiReducer = (state: IUiState = initialState, action: AllUiActions) => {
  switch (action.type) {
    case ACTIONS.CHANGE_THEME: {
      return {
        ...state,
        theme: action.payload,
      };
    }
    case ACTIONS.CHANGE_LANGUAGE: {
      return {
        ...state,
        language: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default uiReducer;
