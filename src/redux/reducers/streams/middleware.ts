import { Dispatch, Middleware } from 'redux';
import { IState } from '../index';
import {
  ACTIONS,
  AllStreamActions,
  connecting,
  connected,
  disconnected,
  updateData,
} from './actions';
import { getSubscribersCountByStream } from './selectors';
import { STREAM_GROUPS } from './types';

const websockets: {
  [stream: string]: InstanceType<typeof WebSocket>;
} = {};

const STREAMS_REGEXP = {
  MINI_TICKER_ARR: /!miniTicker@arr/,
} as const;

const WS_CODES = {
  CLOSE_NORMAL: 1000,
  ABNORMAL: 1006,
  IMITATE_SERVER_CLOSING: 4500,
};

const WS_STATES = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
};

const openStreamConnection = ({
  stream,
  dispatch,
}: {
  stream: string;
  dispatch: Dispatch;
}) => {
  const ws = new WebSocket(`wss://stream.binance.com/stream?streams=${stream}`);

  websockets[stream] = ws;

  dispatch(connecting({ stream }));

  ws.addEventListener('open', () => dispatch(connected({ stream })));

  ws.addEventListener('close', ({ code }) => {
    const currOrigin = websockets[stream];

    if (ws !== currOrigin) {
      return;
    }

    delete websockets[stream];

    if ([WS_CODES.CLOSE_NORMAL, WS_CODES.ABNORMAL].includes(code)) {
      dispatch(disconnected({ stream }));
      return;
    }

    openStreamConnection({ stream, dispatch });
  });

  ws.addEventListener('message', ({ data }) => {
    let preparedData;

    try {
      preparedData = JSON.parse(data);
    } catch (e) {
      // log error
      return;
    }

    if (STREAMS_REGEXP.MINI_TICKER_ARR.test(stream)) {
      dispatch(updateData({
        data: preparedData.data,
        streamGroup: STREAM_GROUPS.MINI_TICKER,
      }));
    }
  });
};

const closeStreamConnection = ({
  code,
  stream,
}: {
  code?: number;
  stream: string;
  dispatch: Dispatch;
}) => {
  const ws = websockets[stream];

  if (!ws) {
    return;
  }

  ws.close(code);
};

const streamsMiddleware: Middleware<any, IState> = store => next => (action: AllStreamActions) => {
  const { dispatch } = store;

  if (action.type === ACTIONS.SUBSCRIBE) {
    const { stream } = action.payload;
    const ws = websockets[stream];

    if (!ws || ([WS_STATES.CLOSING, WS_STATES.CLOSED]).includes(ws.readyState)) {
      openStreamConnection({ stream, dispatch });
    }
  } else if (action.type === ACTIONS.UNSUBSCRIBE) {
    const result = next(action);
    const { stream } = action.payload;

    const subscribersCount = getSubscribersCountByStream(store.getState(), { stream });

    if (subscribersCount === 0) {
      closeStreamConnection({
        stream,
        dispatch,
      });
    }

    return result;
  } else if (action.type === ACTIONS.IMITATE_SERVER_CLOSING) {
    const { stream } = action.payload;

    closeStreamConnection({
      code: WS_CODES.IMITATE_SERVER_CLOSING,
      stream,
      dispatch,
    });
  }

  return next(action);
};

export default streamsMiddleware;
