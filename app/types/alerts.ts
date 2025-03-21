export interface Alert {
  id: string;
  symbol: string;
  name: string;
  price: number;
  priceChange: number;
  type: "stock" | "crypto";
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
  },
  {
    id: "2",
    symbol: "BTC",
    name: "Bitcoin",
    price: 51291,
    priceChange: 7.9,
    type: "crypto",
  },
  {
    id: "3",
    symbol: "FB",
    name: "Facebook, Inc.",
    price: 263.35,
    priceChange: 0.52,
    type: "stock",
  },
  {
    id: "4",
    symbol: "GME",
    name: "GameStop Corp.",
    price: 132.85,
    priceChange: 13.52,
    type: "stock",
  },
  {
    id: "5",
    symbol: "BRK.A",
    name: "Berkshire Hathaway",
    price: 382720.0,
    priceChange: -2.47,
    type: "stock",
  },
  {
    id: "6",
    symbol: "AAPL",
    name: "Apple, Inc.",
    price: 118.32,
    priceChange: 4.72,
    type: "stock",
  },
];
