export interface Alert {
  id: string;
  symbol: string;
  name: string;
  type: "stock" | "crypto";
  price: number;
  priceChange: number;
  ceilingPrice: number;
  floorPrice: number;
  icon?: string;
}

export type AlertsData = Alert[];

export const MOCK_ALERTS: AlertsData = [
  {
    id: "1",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 602.5,
    priceChange: 1.25,
    type: "stock",
    ceilingPrice: 603.75,
    floorPrice: 599.25,
  },
  {
    id: "2",
    symbol: "BTC",
    name: "Bitcoin",
    price: 51291,
    priceChange: 7.9,
    type: "crypto",
    ceilingPrice: 51370,
    floorPrice: 51212,
  },
  {
    id: "3",
    symbol: "FB",
    name: "Facebook, Inc.",
    price: 263.35,
    priceChange: 0.52,
    type: "stock",
    ceilingPrice: 263.87,
    floorPrice: 262.83,
  },
  {
    id: "4",
    symbol: "GME",
    name: "GameStop Corp.",
    price: 132.85,
    priceChange: 13.52,
    type: "stock",
    ceilingPrice: 146.37,
    floorPrice: 129.33,
  },
  {
    id: "5",
    symbol: "BRK.A",
    name: "Berkshire Hathaway",
    price: 382720.0,
    priceChange: -2.47,
    type: "stock",
    ceilingPrice: 383002.4,
    floorPrice: 382437.6,
  },
  {
    id: "6",
    symbol: "AAPL",
    name: "Apple, Inc.",
    price: 118.32,
    priceChange: 4.72,
    type: "stock",
    ceilingPrice: 123.05,
    floorPrice: 113.59,
  },
];

export interface StockInfo {
  date: string;
  type: string;
  exchange: string;
  market: string;
  symbol: string;
  name: string;
  industry: string;
  securityType: string;
  previousClose: number;
  referencePrice: number;
  limitUpPrice: number;
  limitDownPrice: number;
  canDayTrade: boolean;
  canBuyDayTrade: boolean;
  canBelowFlatMarginShortSell: boolean;
  canBelowFlatSBLShortSell: boolean;
  isAttention: boolean;
  isDisposition: boolean;
  isUnusuallyRecommended: boolean;
  isSpecificAbnormally: boolean;
  matchingInterval: number;
  securityStatus: string;
  boardLot: number;
  tradingCurrency: string;
}
