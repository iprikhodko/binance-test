import { createSelector } from 'reselect';
import { IState } from '../index';

// Using createSelector doesn't make sense here, but it is used to follow the rules of common signature

export const getStreamByStreamName = createSelector<IState, { stream: string }, IState['streams']['streams'][string], IState['streams']['streams'][string]>(
  ({ streams: { streams } }, { stream }) => streams[stream],
  stream => stream || {
    isConnecting: false,
    isConnected: false,
    subscribersCount: 0,
    error: null,
  }
);

export const getSubscribersCountByStream = createSelector<IState, { stream: string }, ReturnType<typeof getStreamByStreamName>, number>(
  getStreamByStreamName,
  stream => stream.subscribersCount,
);

export const getIsConnectingByStream = createSelector<IState, { stream: string }, ReturnType<typeof getStreamByStreamName>, number>(
  // @ts-ignore
  getStreamByStreamName,
  stream => stream.isConnecting,
);

export const getIsConnectedByStream = createSelector<IState, { stream: string }, ReturnType<typeof getStreamByStreamName>, number>(
  // @ts-ignore
  getStreamByStreamName,
  stream => stream.isConnected,
);

export const getErrorByStream = createSelector<IState, { stream: string }, ReturnType<typeof getStreamByStreamName>, number>(
  // @ts-ignore
  getStreamByStreamName,
  stream => stream.error,
);
