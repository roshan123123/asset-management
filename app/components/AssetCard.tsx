import { memo } from "react";
import type { Asset } from "../types/types";
import { ChevronRightIcon, CheckIcon, PlusIcon } from "./icons";

interface AssetCardProps {
  asset: Asset;
  isSelected: boolean;
  onToggle: () => void;
}

export const AssetCard = memo(function AssetCard({
  asset,
  isSelected,
  onToggle,
}: AssetCardProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        w-full text-left p-4 rounded-xl border transition-all bg-white
        ${isSelected ? "" : "border-gray-200 hover:border-gray-300"}
      `}
      style={isSelected ? { borderColor: "#03524D" } : undefined}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className="font-medium text-base leading-snug line-clamp-2"
              style={{ color: "#137153" }}
            >
              {asset.name}
            </h3>
            <ChevronRightIcon
              className="w-4 h-4 flex-shrink-0"
              style={{ color: "#137153" }}
            />
          </div>

          <p className="text-xs text-gray-500 mb-3">
            {asset.instrument} · {asset.category}
          </p>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-0.5">{asset.ticker}</p>
              <p className="text-xs font-medium text-gray-900">Ticker</p>
            </div>

            {/* Separator */}
            <div className="w-px h-8 bg-gray-200" />

            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-0.5">{asset.exchange}</p>
              <p className="text-xs font-medium text-gray-900">Exchange</p>
            </div>

            {/* Separator */}
            <div className="w-px h-8 bg-gray-200" />

            <div className="flex-1">
              <p
                className={`text-xs font-medium mb-0.5 ${
                  asset.returns["1Y"].startsWith("+")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {asset.returns["1Y"]}
              </p>
              <p className="text-xs font-medium text-gray-900">1Y Return</p>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center">
          <div
            className="w-6 h-6 rounded-full border flex items-center justify-center transition-all"
            style={
              isSelected
                ? { borderColor: "#137153", backgroundColor: "#137153" }
                : { borderColor: "#d1d5db", backgroundColor: "white" }
            }
          >
            {isSelected ? (
              <CheckIcon className="w-3.5 h-3.5 text-white" />
            ) : (
              <PlusIcon className="w-3.5 h-3.5 text-gray-400" />
            )}
          </div>
        </div>
      </div>
    </button>
  );
});
