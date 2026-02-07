export interface Asset {
  id: string;
  ticker: string;
  name: string;
  category: "Equities" | "Bonds";
  instrument: string;
  returns: {
    "1Y": string;
    "3Y": string;
    "5Y": string;
  };
  exchange: string;
}

export const ASSET_FILTER_HIERARCHY = {
  Equities: {
    instrument: ["ETF", "Direct stock", "Mutual Fund"],
  },
  Bonds: {
    instrument: ["ETF", "Mutual Fund"],
  },
} as const;

export type Category = keyof typeof ASSET_FILTER_HIERARCHY;

export interface FetchAssetsParams {
  query?: string;
  category?: Category;
  instruments?: string[];
  page?: number;
  pageSize?: number;
}

export interface FetchAssetsResponse {
  assets: Asset[];
  totalCount: number;
  hasMore: boolean;
  currentPage: number;
}
