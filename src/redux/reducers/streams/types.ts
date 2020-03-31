export const STREAM_GROUPS = {
  MINI_TICKER: 'miniTicker',
} as const;

export interface IMiniTickerStreamData {
  e: string;
  E: number;
  s: string;
  c: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
}
