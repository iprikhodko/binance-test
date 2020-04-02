import { ACTIONS, AllStreamActions, ICommonStreamAction, IUpdateDataAction } from './actions';
import { IMiniTickerStreamData, STREAM_GROUPS } from './types';

interface IStream {
  subscribersCount: number;
  isConnecting: boolean;
  isConnected: boolean;
  // keep not boolean name in case we could pass something readable
  error: boolean;
}

export interface IStreamState {
  streams: {
    [stream: string]: IStream;
  },
  streamsData: {
    miniTicker: {
      [symbol: string]: IMiniTickerStreamData;
    };
  };
}

const initialStreamState: IStreamState = {
  streams: {},
  streamsData: {
    miniTicker: {},
  },
};

const getStreamState = (state: IStreamState, action: ICommonStreamAction): IStream => {
  const { payload } = action;
  const { stream } = payload;

  if (stream in state.streams) {
    return state.streams[stream];
  }

  return {
    isConnecting: false,
    isConnected: false,
    subscribersCount: 0,
    error: false,
  };
};

const updateData = (state: IStreamState, action: IUpdateDataAction): IStreamState => {
  const { streamGroup } = action.payload;
  let streamData = state.streamsData[streamGroup];

  switch (streamGroup) {
    case STREAM_GROUPS.MINI_TICKER: {
      const { data } = action.payload;

      streamData = {
        ...streamData,
        ...data.reduce((result, item) => ({
          ...result,
          [item.s]: item,
        }), {})
      };
    }
  }

  return {
    ...state,
    streamsData: {
      ...state.streamsData,
      [streamGroup]: streamData,
    },
  }
};

const streamsReducer = (state: IStreamState = initialStreamState, action: AllStreamActions): IStreamState => {
  switch (action.type) {
    case ACTIONS.CONNECTING: {
      const { stream } = action.payload;
      const streamState = getStreamState(state, action);

      return {
        ...state,
        streams: {
          ...state.streams,
          [stream]: {
            ...streamState,
            isConnecting: true,
            isConnected: false,
          },
        },
      };
    }
    case ACTIONS.CONNECTED: {
      const { stream } = action.payload;
      const streamState = getStreamState(state, action);

      return {
        ...state,
        streams: {
          ...state.streams,
          [stream]: {
            ...streamState,
            isConnecting: false,
            isConnected: true,
          },
        },
      };
    }
    case ACTIONS.ERROR: {
      const { stream } = action.payload;
      const streamState = getStreamState(state, action);

      return {
        ...state,
        streams: {
          ...state.streams,
          [stream]: {
            ...streamState,
            error: true,
          },
        },
      };
    }
    case ACTIONS.SUBSCRIBE: {
      const { stream } = action.payload;
      const streamState = getStreamState(state, action);

      return {
        ...state,
        streams: {
          ...state.streams,
          [stream]: {
            ...streamState,
            subscribersCount: streamState.subscribersCount + 1,
          },
        },
      };
    }
    case ACTIONS.UPDATE_DATA: {
      return updateData(state, action);
    }
    case ACTIONS.UNSUBSCRIBE: {
      const { stream } = action.payload;
      const streamState = getStreamState(state, action);

      return {
        ...state,
        streams: {
          ...state.streams,
          [stream]: {
            ...streamState,
            subscribersCount: streamState.subscribersCount ? streamState.subscribersCount - 1 : 0,
          },
        },
      };
    }
    case ACTIONS.DISCONNECTED: {
      const { stream } = action.payload;

      return {
        ...state,
        streams: {
          ...state.streams,
          [stream]: {
            isConnecting: false,
            isConnected: false,
            subscribersCount: 0,
            error: false,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default streamsReducer;
