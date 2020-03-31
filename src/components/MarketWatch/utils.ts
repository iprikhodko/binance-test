const MARKET_WATCH = {
  STREAM_NAME: '!miniTicker@arr',
  STORAGE_NAME: 'ui/MarketWatch',
  SORT: {
    ASC: 'asc',
    DESC: 'desc',
  } as const,
  COLUMNS: {
    FAVORITE: 'isFavorite',
    INSTRUMENT_NAME: 'instrumentName',
    LAST_PRICE: 'lastPrice',
    CHANGE: 'change',
    VOLUME: 'volume',
  } as const,
};

export default MARKET_WATCH;
