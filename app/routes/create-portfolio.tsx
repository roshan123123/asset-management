import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { SelectionWidget } from "../components/SelectionWidget";
import { AllocationWidget } from "../components/AllocationWidget";
import { Toast } from "../components/Toast";
import { fetchAssets } from "../lib/api";
import { ASSET_FILTER_HIERARCHY } from "../types/types";
import { useDebounce } from "../hooks/useDebounce";
import type { Asset, Category } from "../types/types";

export default function SelectAssets() {
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      setToast({ message, type });
    },
    [],
  );

  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAssetIds, setSelectedAssetIds] = useState<Set<string>>(
    new Set(),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [showInstrumentFilter, setShowInstrumentFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const [allocations, setAllocations] = useState<Map<string, string>>(
    new Map(),
  );
  const selectedAssets = useMemo(
    () => assets.filter((a) => selectedAssetIds.has(a.id)),
    [assets, selectedAssetIds],
  );

  const totalAllocation = useMemo(
    () =>
      Array.from(allocations.values()).reduce(
        (sum, value) => sum + (parseFloat(value) || 0),
        0,
      ),
    [allocations],
  );

  // Calculate minimum investment (placeholder)
  const minimumInvestment = "$XXX.XX";

  useEffect(() => {
    setAssets([]);
    setCurrentPage(1);
    setTotalCount(0);
    setHasMore(false);
  }, [debouncedQuery, selectedCategory, selectedInstruments]);

  const loadAssets = useCallback(
    async (page: number) => {
      if (isLoading) return;

      setIsLoading(true);
      try {
        const response = await fetchAssets({
          query: debouncedQuery,
          category: selectedCategory || undefined,
          instruments: selectedInstruments,
          page,
          pageSize: 10,
        });

        setAssets((prev) =>
          page === 1 ? response.assets : [...prev, ...response.assets],
        );
        setCurrentPage(response.currentPage);
        setTotalCount(response.totalCount);
        setHasMore(response.hasMore);
      } catch (error) {
        console.error("Failed to load assets:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedQuery, selectedCategory, selectedInstruments, isLoading],
  );

  useEffect(() => {
    if (step === 1) {
      loadAssets(1);
    }
  }, [debouncedQuery, selectedCategory, selectedInstruments, step]);

  // Clean up selected assets when new data loads - remove items not in current results
  // IN CASE WE WANT THIS
  //   useEffect(() => {
  //     if (assets.length > 0) {
  //       const currentAssetIds = new Set(assets.map((a) => a.id));
  //       setSelectedAssetIds((prev) => {
  //         const updated = new Set<string>();
  //         prev.forEach((id) => {
  //           if (currentAssetIds.has(id)) {
  //             updated.add(id);
  //           }
  //         });
  //         // Only update if something changed
  //         return updated.size !== prev.size ? updated : prev;
  //       });
  //     }
  //   }, [assets]);

  const handleViewMore = useCallback(() => {
    loadAssets(currentPage + 1);
  }, [loadAssets, currentPage]);

  const toggleAsset = useCallback((assetId: string) => {
    setSelectedAssetIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(assetId)) {
        newSet.delete(assetId);
      } else {
        if (newSet.size >= 10) {
          showToast("Cannot select more than 10 funds", "error");
          return prev;
        }
        newSet.add(assetId);
      }
      return newSet;
    });
  }, []);

  const handleContinue = () => {
    // Initialize allocations for selected assets
    const newAllocations = new Map<string, string>();
    selectedAssets.forEach((asset) => {
      newAllocations.set(asset.id, "");
    });
    setAllocations(newAllocations);
    setStep(2);
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setSelectedInstruments([]);
  };

  const handleClearCategory = () => {
    setSelectedCategory(null);
    setSelectedInstruments([]);
  };

  const availableInstruments = useMemo(
    () =>
      selectedCategory
        ? [...ASSET_FILTER_HIERARCHY[selectedCategory].instrument]
        : [],
    [selectedCategory],
  );

  const handleClearAll = () => {
    setSelectedInstruments([]);
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (showInstrumentFilter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showInstrumentFilter]);

  const updateAllocation = useCallback((assetId: string, value: string) => {
    setAllocations((prev) => {
      const newMap = new Map(prev);
      newMap.set(assetId, value);
      return newMap;
    });
  }, []);

  const removeAsset = (assetId: string) => {
    const newAllocations = new Map(allocations);
    newAllocations.delete(assetId);
    setAllocations(newAllocations);

    const newSelectedIds = new Set(selectedAssetIds);
    newSelectedIds.delete(assetId);
    setSelectedAssetIds(newSelectedIds);

    if (newAllocations.size === 0) {
      setStep(1);
    }
  };

  const handleSubmit = () => {
    if (totalAllocation !== 100) {
      showToast("Total allocation must equal 100%", "error");
      return;
    }

    const allocationData = Array.from(allocations.entries()).map(
      ([id, allocation]) => {
        const asset = selectedAssets.find((a) => a.id === id)!;
        return {
          asset: asset.name,
          ticker: asset.ticker,
          allocation: parseFloat(allocation) || 0,
        };
      },
    );

    console.log("Allocation submitted:", allocationData);
    console.log("Allocation submitted:", allocationData);
    showToast("Submitted and logged", "success");
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleClose = () => {
    navigate("/");
  };

  const currentAssets = useMemo(
    () => selectedAssets.filter((asset) => allocations.has(asset.id)),
    [selectedAssets, allocations],
  );

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {step === 1 ? (
        <SelectionWidget
          assets={assets}
          selectedAssetIds={selectedAssetIds}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          selectedInstruments={selectedInstruments}
          showInstrumentFilter={showInstrumentFilter}
          setShowInstrumentFilter={setShowInstrumentFilter}
          isLoading={isLoading}
          totalCount={totalCount}
          hasMore={hasMore}
          handleViewMore={handleViewMore}
          toggleAsset={toggleAsset}
          handleCategoryChange={handleCategoryChange}
          handleClearCategory={handleClearCategory}
          availableInstruments={availableInstruments}
          setSelectedInstruments={setSelectedInstruments}
          handleClearAll={handleClearAll}
          handleContinue={handleContinue}
          onClose={handleClose}
        />
      ) : (
        <AllocationWidget
          currentAssets={currentAssets}
          allocations={allocations}
          totalAllocation={totalAllocation}
          minimumInvestment={minimumInvestment}
          updateAllocation={updateAllocation}
          removeAsset={removeAsset}
          handleBack={handleBack}
          handleSubmit={handleSubmit}
          onClose={handleClose}
        />
      )}
    </>
  );
}
