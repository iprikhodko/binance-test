import { IThunkAction } from '../index';
import { IRequestErrorAction, IRequestPendingAction, IRequestSuccessAction, makeRequest } from '../request/actions';
import { IInstrument } from './types';

export const ACTIONS = {
  FETCH_INSTRUMENTS_PENDING: 'staticData/FETCH_INSTRUMENTS_PENDING',
  FETCH_INSTRUMENTS_SUCCESS: 'staticData/FETCH_INSTRUMENTS_SUCCESS',
  FETCH_INSTRUMENTS_ERROR: 'staticData/FETCH_INSTRUMENTS_ERROR',
} as const;

export type IAllFetchInstrumentsActions = IRequestPendingAction<typeof ACTIONS.FETCH_INSTRUMENTS_PENDING> |
  IRequestSuccessAction<typeof ACTIONS.FETCH_INSTRUMENTS_SUCCESS, IInstrument[]> |
  IRequestErrorAction<typeof ACTIONS.FETCH_INSTRUMENTS_ERROR>;

export const fetchInstruments = (): IThunkAction =>  (dispatch, getState) => {
  const { staticData: { instruments } } = getState();

  if (instruments.isFetched) {
    return;
  }

  dispatch(makeRequest({
    config: {
      url: 'http://localhost:3000/exchange-api/v1/public/asset-service/product/get-products',
      method: 'get',
    },
    actions: {
      pending: ACTIONS.FETCH_INSTRUMENTS_PENDING,
      success: ACTIONS.FETCH_INSTRUMENTS_SUCCESS,
      error: ACTIONS.FETCH_INSTRUMENTS_ERROR,
    },
  }));
};

export type IAllStaticDataActions = IAllFetchInstrumentsActions;
