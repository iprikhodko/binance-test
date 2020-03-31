const FIAT_CURRENCIES = {
  RUB: 'RUB',
  USDT: 'USDT',
  BUSD: 'BUSD',
  PAX: 'PAX',
  TUSD: 'TUSD',
  EUR: 'EUR',
  TRY: 'TRY',
  ZAR: 'ZAR',
};

export const FIAT_CURRENCIES_LIST = Object.values(FIAT_CURRENCIES);

const ALTS_CURRENCIES = {
  ETH: 'ETH',
  TRX: 'TRX',
  XRP: 'XRP',
};

export const ALTS_CURRENCIES_LIST = Object.values(ALTS_CURRENCIES);

export const CURRENCIES = {
  BNB: 'BNB',
  BTC: 'BTC',
  ...FIAT_CURRENCIES,
  ...ALTS_CURRENCIES,
};