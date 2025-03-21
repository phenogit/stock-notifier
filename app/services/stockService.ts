import { StockInfo } from "../types/alerts";

const API_KEY =
  "ZTUwMDYxMGMtZTUwMS00MzdlLTlmNTAtZmVkNDFiMjZhNDcyIDkxYjNiYjYxLTUxZWUtNGI5NC1hMjIxLWZjYTgxYzAzZTEyMg=="; // Replace with your actual API key
const BASE_URL = "https://api.fugle.tw/marketdata/v1.0";

export async function fetchStockInfo(symbol: string): Promise<StockInfo> {
  try {
    const response = await fetch(
      `${BASE_URL}/stock/intraday/ticker/${symbol}`,
      {
        headers: {
          "x-api-key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch stock info");
    }

    const data = await response.json();
    return data as StockInfo;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Error fetching stock info: ${errorMessage}`);
  }
}
