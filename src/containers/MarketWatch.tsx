import { ComponentProps } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import BigNumber from 'bignumber.js';
import MarketWatch from '../components/MarketWatch';
import MARKET_WATCH from '../components/MarketWatch/utils';
import { IState, IThunkAction } from '../redux/reducers';
import { fetchInstruments } from '../redux/reducers/staticData/actions';
import { subscribe, unsubscribe } from '../redux/reducers/streams/actions';
import { getIsConnectedByStream, getIsConnectingByStream } from '../redux/reducers/streams/selectors';

const getMarketWatchData = createSelector<
IState,
IState['staticData']['instruments']['data'],
IState['streams']['streamsData']['miniTicker'],
ComponentProps<typeof MarketWatch>['data']
>(
  ({ staticData }) => staticData.instruments.data,
  ({ streams }) => streams.streamsData.miniTicker,
  (instruments, miniTicker) => Object.values(instruments).map(instrument => {
    let {
      s: rawInstrumentName,
      b: baseCurrency,
      q: quoteCurrency,
      o: openPrice,
      c: lastPrice,
      pm: group,
      pn: subGroup,
      qv: volume,
    } = instrument;

    const ticker = miniTicker[instrument.s];

    if (ticker) {
      openPrice = new BigNumber(ticker.o).toNumber();
      lastPrice = new BigNumber(ticker.c).toNumber();
      volume = new BigNumber(ticker.q).toNumber();
    }

    const instrumentName = `${baseCurrency}/${quoteCurrency}`;

    return {
      rawInstrumentName,
      isFavorite: false,
      instrumentName: instrumentName,
      lastPrice: new BigNumber(lastPrice).toFixed(),
      change: new BigNumber(lastPrice).div(openPrice).minus(1).times(100).toFixed(),
      volume: new BigNumber(volume).toFixed(),
      group,
      subGroup,
    };
  }),
);

const onSubscribe = (): IThunkAction => (dispatch, getState) => {
  const state = getState();
  const isStreamConnecting = getIsConnectingByStream(state, { stream: MARKET_WATCH.STREAM_NAME });
  const isStreamConnected = getIsConnectedByStream(state, { stream: MARKET_WATCH.STREAM_NAME });

  dispatch(fetchInstruments());

  if (!isStreamConnected && !isStreamConnecting) {
    dispatch(subscribe({ stream: MARKET_WATCH.STREAM_NAME }));
  }
};

const mapStateToProps = (state: IState) => {
  const {
    staticData: { instruments },
  } = state;

  return ({
    isFetching: instruments.isFetching || getIsConnectingByStream(state, { stream: MARKET_WATCH.STREAM_NAME }),
    hasError: !!instruments.error,
    data: getMarketWatchData(state),
    alts: instruments.altsMarket,
    fiat: instruments.fiatMarket,
  });
};

const mapDispatchToProps = {
  onSubscribe,
  onUnsubscribe: () => unsubscribe({ stream: MARKET_WATCH.STREAM_NAME }),
};

const MarketWatchContainer = connect(mapStateToProps, mapDispatchToProps)(MarketWatch);

export default MarketWatchContainer;
