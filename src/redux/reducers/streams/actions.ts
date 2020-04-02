import { createAction } from 'redux-actions';
import { IMiniTickerStreamData, STREAM_GROUPS } from './types';

export const ACTIONS = {
  CONNECTING: 'stream/CONNECTING',
  CONNECTED: 'stream/CONNECTED',
  SUBSCRIBE: 'stream/SUBSCRIBE',
  ERROR: 'stream/ERROR',
  UPDATE_DATA: 'stream/UPDATE_DATA',
  UNSUBSCRIBE: 'stream/UNSUBSCRIBE',
  DISCONNECTED: 'stream/DISCONNECTED',
  IMITATE_SERVER_CLOSING: 'stream/IMITATE_SERVER_CLOSING',
} as const;

type ICommonPayload = {
  stream: string;
};

export type ICommonStreamAction = {
  type: any;
  payload: ICommonPayload;
}

export type IConnectingStreamAction = {
  type: typeof ACTIONS.CONNECTING;
  payload: ICommonPayload;
};
export const connecting = createAction<IConnectingStreamAction['payload']>(ACTIONS.CONNECTING);

export type IConnectedStreamAction = {
  type: typeof ACTIONS.CONNECTED;
  payload: ICommonPayload;
};
export const connected = createAction<IConnectedStreamAction['payload']>(ACTIONS.CONNECTED);

export type ISubscribeAction = {
  type: typeof ACTIONS.SUBSCRIBE;
  payload: ICommonPayload;
};
export const subscribe = createAction<ISubscribeAction['payload']>(ACTIONS.SUBSCRIBE);

export type IUpdateDataAction = {
  type: typeof ACTIONS.UPDATE_DATA;
  payload: {
    data: IMiniTickerStreamData[];
    streamGroup: typeof STREAM_GROUPS.MINI_TICKER;
  };
};
export const updateData = createAction<IUpdateDataAction['payload']>(ACTIONS.UPDATE_DATA);

export type IErrorAction = {
  type: typeof ACTIONS.ERROR;
  payload: ICommonPayload;
};
export const handleError = createAction<IErrorAction['payload']>(ACTIONS.ERROR);

export type IUnsubscribeAction = {
  type: typeof ACTIONS.UNSUBSCRIBE;
  payload: ICommonPayload;
};
export const unsubscribe = createAction<IUnsubscribeAction['payload']>(ACTIONS.UNSUBSCRIBE);

type IDisconnectedAction = {
  type: typeof ACTIONS.DISCONNECTED;
  payload: ICommonPayload;
};
export const disconnected = createAction<IDisconnectedAction['payload']>(ACTIONS.DISCONNECTED);

type IImitateServerClosingAction = {
  type: typeof ACTIONS.IMITATE_SERVER_CLOSING;
  payload: ICommonPayload;
}
export const imitateServerClosing = createAction<IImitateServerClosingAction['payload']>(ACTIONS.IMITATE_SERVER_CLOSING);

export type AllStreamActions = IConnectingStreamAction |
  IConnectedStreamAction |
  ISubscribeAction |
  IErrorAction |
  IUpdateDataAction |
  IUnsubscribeAction |
  IDisconnectedAction |
  IImitateServerClosingAction;
