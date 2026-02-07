import type { FetchAssetsParams, FetchAssetsResponse } from "../types/types";
import { MOCK_ASSETS } from "./mock-data";

/**
 * Mock API function to fetch assets with search, filtering, and pagination
 * Simulates network latency of 500-800ms
 */
export async function fetchAssets({
  query = "",
  category,
  instruments = [],
  page = 1,
  pageSize = 10,
}: FetchAssetsParams = {}): Promise<FetchAssetsResponse> {
  // Simulate network latency
  await new Promise((resolve) =>
    setTimeout(resolve, 500 + Math.random() * 300),
  );

  // Filter assets based on search query (name and ticker)
  let filteredAssets = MOCK_ASSETS.filter((asset) => {
    const matchesQuery =
      !query ||
      asset.name.toLowerCase().includes(query.toLowerCase());
    //    || asset.ticker.toLowerCase().includes(query.toLowerCase()); If we want to search by ticker as well

    const matchesCategory = !category || asset.category === category;

    const matchesInstrument =
      instruments.length === 0 || instruments.includes(asset.instrument);

    return matchesQuery && matchesCategory && matchesInstrument;
  });

  const totalCount = filteredAssets.length;

  // Paginate results
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const assets = filteredAssets.slice(startIndex, endIndex);
  const hasMore = endIndex < totalCount;

  return {
    assets,
    totalCount,
    hasMore,
    currentPage: page,
  };
}
