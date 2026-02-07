import { AssetCard } from "./AssetCard";
import { SearchBar } from "./SearchBar";
import { InstrumentFilterModal } from "./InstrumentFilterModal";
import { XIcon, FilterIcon, ChevronDownIcon } from "./icons";
import type { Asset, Category } from "../types/types";

interface SelectionWidgetProps {
  assets: Asset[];
  selectedAssetIds: Set<string>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category | null;
  selectedInstruments: string[];
  showInstrumentFilter: boolean;
  setShowInstrumentFilter: (show: boolean) => void;
  isLoading: boolean;
  totalCount: number;
  hasMore: boolean;
  handleViewMore: () => void;
  toggleAsset: (assetId: string) => void;
  handleCategoryChange: (category: Category) => void;
  handleClearCategory: () => void;
  availableInstruments: string[];
  setSelectedInstruments: (instruments: string[]) => void;
  handleClearAll: () => void;
  handleContinue: () => void;
  onClose: () => void;
}

export function SelectionWidget({
  assets,
  selectedAssetIds,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  selectedInstruments,
  showInstrumentFilter,
  setShowInstrumentFilter,
  isLoading,
  totalCount,
  hasMore,
  handleViewMore,
  toggleAsset,
  handleCategoryChange,
  handleClearCategory,
  availableInstruments,
  setSelectedInstruments,
  handleClearAll,
  handleContinue,
  onClose,
}: SelectionWidgetProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-100 z-20">
        <div className="px-4 pt-4 pb-3">
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XIcon className="w-6 h-6 text-gray-900" />
            </button>
          </div>

          <h1 className="text-xl font-medium text-gray-900 mb-4">
            Create a portfolio of up to 10 funds
          </h1>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name"
          />

          <div className="flex gap-2 mt-3">
            {!selectedCategory && (
              <>
                <button
                  onClick={() => handleCategoryChange("Equities")}
                  className="px-5 py-2.5 rounded-full text-sm font-normal transition-colors bg-white text-gray-700 border border-gray-300 hover:border-gray-400 flex items-center gap-2"
                >
                  <span>Equities</span>
                </button>
                <button
                  onClick={() => handleCategoryChange("Bonds")}
                  className="px-5 py-2.5 rounded-full text-sm font-normal transition-colors bg-white text-gray-700 border border-gray-300 hover:border-gray-400 flex items-center gap-2"
                >
                  <span>Bonds</span>
                </button>
              </>
            )}

            {selectedCategory && (
              <button className="px-5 py-2.5 rounded-full text-sm font-normal transition-colors bg-gray-100 text-gray-900 border border-gray-900 flex items-center gap-2">
                <span>{selectedCategory}</span>
                <button
                  onClick={handleClearCategory}
                  className="hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                >
                  <XIcon className="w-3.5 h-3.5 text-gray-900" />
                </button>
              </button>
            )}

            {selectedCategory && (
              <button
                onClick={() => setShowInstrumentFilter(true)}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-normal transition-colors flex items-center gap-2
                  ${
                    selectedInstruments.length > 0
                      ? "bg-gray-100 text-gray-900 border border-gray-900"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                  }
                `}
              >
                <FilterIcon className="w-4 h-4" />
                Instrument
                {selectedInstruments.length > 0 && (
                  <span>({selectedInstruments.length})</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-2">
        <p className="text-sm text-gray-500">Funds ({totalCount})</p>
      </div>

      <div
        className={`px-4 space-y-3 ${isLoading ? "pb-32" : selectedAssetIds.size > 0 ? "pb-24" : "pb-6"}`}
      >
        {assets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            isSelected={selectedAssetIds.has(asset.id)}
            onToggle={() => toggleAsset(asset.id)}
          />
        ))}

        {isLoading && (
          <div className="flex justify-center py-1">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800" />
          </div>
        )}

        {!isLoading && hasMore && assets.length > 0 && (
          <button
            onClick={handleViewMore}
            className="w-full py-3 text-sm text-gray-700 hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
          >
            <span>View 10 more</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>
        )}

        {!isLoading && assets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No funds found</p>
          </div>
        )}
      </div>

      {selectedAssetIds.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white z-10">
          <div className="h-1 bg-gray-200">
            <div className="h-full bg-gray-900" style={{ width: "20%" }} />
          </div>

          <div className="border-t border-gray-200 p-4 flex justify-end">
            <button
              onClick={handleContinue}
              className="w-auto py-3.5 px-6 text-white font-medium rounded-full transition-colors flex items-center justify-center gap-2"
              style={{ backgroundColor: "#052619" }}
            >
              <span>View assets</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                {selectedAssetIds.size}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Instrument Filter Modal */}
      <InstrumentFilterModal
        isOpen={showInstrumentFilter}
        onClose={() => setShowInstrumentFilter(false)}
        selectedInstruments={selectedInstruments}
        availableInstruments={availableInstruments}
        onInstrumentsChange={setSelectedInstruments}
      />
    </div>
  );
}
