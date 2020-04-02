import { AxiosRequestConfig } from 'axios';
import { createAction } from 'redux-actions';

export const ACTIONS = {
  MAKE_REQUEST: 'request/MAKE_REQUEST',
  CANCEL_REQUEST: 'request/CANCEL_REQUEST',
} as const;

type ICommonPayload = {
  requestId: string;
};

export type IMakeRequestAction = {
  type: typeof ACTIONS.MAKE_REQUEST,
  payload: {
    config: AxiosRequestConfig;
    actions: {
      pending: string;
      success: string;
      error: string;
    };
  };
};
export const makeRequest = createAction<IMakeRequestAction['payload']>(ACTIONS.MAKE_REQUEST);

export type ICancelRequestAction = {
  type: typeof ACTIONS.CANCEL_REQUEST,
  payload: {
    requestId?: string | null;
  };
};
export const cancelRequest = createAction<ICancelRequestAction['payload']>(ACTIONS.CANCEL_REQUEST);

export type IRequestPendingAction<A extends string> = {
  type: A,
  payload: ICommonPayload;
};

export type IRequestSuccessAction<A extends string, D = any> = {
  type: A,
  payload: ICommonPayload & {
    data: D;
  };
};

export type IRequestErrorAction<A extends string> = {
  type: A,
  payload: ICommonPayload & {
    error: {
      code: string
      message: string | null;
      messageDetail: string | null;
    };
  };
};

export type IAllRequestActions = IMakeRequestAction | ICancelRequestAction;
