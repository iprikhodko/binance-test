import APP from '../../../constants/app';
import { ACTIONS, IAllStaticDataActions } from './actions';
import { IInstrument } from './types';

interface ICommonStaticDataState<D = any> {
  requestId: string | null;
  isFetching: boolean;
  isFetched: boolean;
  error: {
    code: string;
    message: string | null;
    messageDetail: string | null;
  } | null;
}

export interface IStaticDataState {
  instruments: ICommonStaticDataState & {
    data: {
      [symbol: string]: IInstrument;
    };
    altsMarket: string[];
    fiatMarket: string[];
    hasBnbMarket: boolean;
    hasBtcMarket: boolean;
  };
}

const initialState: IStaticDataState = {
  instruments: {
    data: {},
    altsMarket: [],
    fiatMarket: [],
    hasBnbMarket: false,
    hasBtcMarket: false,
    isFetching: false,
    isFetched: false,
    error: null,
    requestId: null,
  },
};

const staticDataReducer = (state: IStaticDataState = initialState, action: IAllStaticDataActions) => {
  switch (action.type) {
    case ACTIONS.FETCH_INSTRUMENTS_PENDING: {
      const { requestId } = action.payload;

      return {
        ...state,
        instruments: {
          ...state.instruments,
          isFetching: true,
          isFetched: false,
          error: null,
          requestId,
        },
      };
    }
    case ACTIONS.FETCH_INSTRUMENTS_SUCCESS: {
      const { data } = action.payload;
      const altsMarket: string[] = [];
      const fiatMarket: string[] = [];
      const hasBnbMarket: boolean = false;
      const hasBtcMarket: boolean = false;
      let preparedData = {};

      data.forEach(instrument => {
        const { s, pm, q } = instrument;
        let { pn } = instrument;

        // I'm not sure this is correct because of pm and pn is equal for USD@
        // that is why I get pn from qn
        if ([APP.ALTS_MARKET_NAME, APP.FIAT_MARKET_NAME].includes(pm)) {
          pn = q;
        }

        preparedData = {
          ...preparedData,
          [s]: {
            ...instrument,
            pn,
          },
        };

        switch (pm) {
          case APP.ALTS_MARKET_NAME: {
            if (!altsMarket.includes(pn)) {
              altsMarket.push(pn);
            }
            break;
          }
          case APP.FIAT_MARKET_NAME: {
            if (!fiatMarket.includes(pn)) {
              fiatMarket.push(pn);
            }
            break;
          }
          default: {
            break;
          }
        }
      });

      return {
        ...state,
        instruments: {
          ...state.instruments,
          data: preparedData,
          altsMarket,
          fiatMarket,
          hasBnbMarket,
          hasBtcMarket,
          isFetching: false,
          isFetched: true,
          requestId: null,
        },
      };
    }
    case ACTIONS.FETCH_INSTRUMENTS_ERROR: {
      const { error } = action.payload;

      return {
        ...state,
        instruments: {
          ...state.instruments,
          isFetching: false,
          isFetched: false,
          error,
          requestId: null,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default staticDataReducer;
