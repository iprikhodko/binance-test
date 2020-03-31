import { AnyAction, combineReducers } from 'redux';
import { ThunkAction } from 'redux-thunk';
import staticDataReducer, { IStaticDataState } from './staticData';
import streamsReducer, { IStreamState } from './streams';
import uiReducer, { IUiState } from './ui';

const mainReducer = combineReducers({
  ui: uiReducer,
  streams: streamsReducer,
  staticData: staticDataReducer,
});

export type IState = {
  ui: IUiState;
  streams: IStreamState;
  staticData: IStaticDataState;
};

export type IThunkAction = ThunkAction<any, IState, void, AnyAction>;

export default mainReducer;
