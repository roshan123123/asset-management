import type { Asset } from "../types/types";
import { ChevronLeftIcon, XIcon, TrashIcon, PlusIcon } from "./icons";

interface AllocationWidgetProps {
  currentAssets: Asset[];
  allocations: Map<string, string>;
  totalAllocation: number;
  minimumInvestment: string;
  updateAllocation: (assetId: string, value: string) => void;
  removeAsset: (assetId: string) => void;
  handleBack: () => void;
  handleSubmit: () => void;
  onClose: () => void;
}

export function AllocationWidget({
  currentAssets,
  allocations,
  totalAllocation,
  minimumInvestment,
  updateAllocation,
  removeAsset,
  handleBack,
  handleSubmit,
  onClose,
}: AllocationWidgetProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-100 z-20">
        <div className="px-4 pt-4 pb-3">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handleBack}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeftIcon className="w-6 h-6 text-gray-900" />
            </button>

            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XIcon className="w-6 h-6 text-gray-900" />
            </button>
          </div>

          <h1 className="text-xl font-medium text-gray-900 mb-4">
            Your allocation
          </h1>
        </div>
      </div>

      <div className="px-4 pb-32 pt-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4">
          {currentAssets.map((asset) => (
            <div key={asset.id} className="p-4 border-b border-gray-100">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-medium text-base leading-snug mb-1 line-clamp-2"
                    style={{ color: "#137153" }}
                  >
                    {asset.name}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {asset.instrument} · {asset.category}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={allocations.get(asset.id) || ""}
                      onChange={(e) =>
                        updateAllocation(asset.id, e.target.value)
                      }
                      className="w-28 pl-3 pr-8 py-2 bg-white border border-gray-300 text-sm text-right focus:outline-none focus:border-gray-400 transition-colors"
                      style={{ borderRadius: "100px" }}
                      placeholder="0.00"
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 pointer-events-none text-sm">
                      %
                    </span>
                  </div>

                  <button
                    onClick={() => removeAsset(asset.id)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <TrashIcon className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="p-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">Total %</span>
            <span
              className="text-base font-medium"
              style={{ color: totalAllocation === 100 ? "#137153" : "#000" }}
            >
              {totalAllocation.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Minimum investment required
            </span>
            <span
              className="text-base font-medium"
              style={{ color: "#137153" }}
            >
              {minimumInvestment}
            </span>
          </div>
        </div>

        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Add fund</span>
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white z-10">
        <div className="h-1 bg-gray-200">
          <div className="h-full bg-gray-900" style={{ width: "40%" }} />
        </div>

        <div className="border-t border-gray-200 p-4 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={totalAllocation !== 100}
            className={`
              w-auto py-3.5 px-6 font-medium rounded-full transition-colors
              ${
                totalAllocation === 100
                  ? "text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
            style={
              totalAllocation === 100
                ? { backgroundColor: "#052619" }
                : undefined
            }
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
