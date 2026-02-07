import { useState, useEffect } from "react";
import { HamburgerIcon, XIcon, PlusIcon } from "./icons";

interface InstrumentFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedInstruments: string[];
  availableInstruments: string[];
  onInstrumentsChange: (instruments: string[]) => void;
}

export function InstrumentFilterModal({
  isOpen,
  onClose,
  selectedInstruments,
  availableInstruments,
  onInstrumentsChange,
}: InstrumentFilterModalProps) {
  // Local state for temporary selections to avoid direct mutation of parent state and api calls
  const [localSelected, setLocalSelected] =
    useState<string[]>(selectedInstruments);

  // Update local state when parent state changes (e.g., when modal opens)
  useEffect(() => {
    if (isOpen) {
      setLocalSelected(selectedInstruments);
    }
  }, [selectedInstruments, isOpen]);

  if (!isOpen) return null;

  const toggleInstrument = (instrument: string) => {
    setLocalSelected((prev) =>
      prev.includes(instrument)
        ? prev.filter((i) => i !== instrument)
        : [...prev, instrument],
    );
  };

  const removeInstrument = (instrument: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalSelected((prev) => prev.filter((i) => i !== instrument));
  };

  const handleClearAll = () => {
    setLocalSelected([]);
  };

  const handleApply = () => {
    onInstrumentsChange(localSelected);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 overscroll-none"
        onClick={handleApply}
        style={{ touchAction: "none" }}
      />

      <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-xl animate-slide-up">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <HamburgerIcon className="w-5 h-5 text-gray-900" />
              <h2 className="text-lg font-medium text-gray-900">Instrument</h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleClearAll}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear all
              </button>
              <button
                onClick={handleApply}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <XIcon className="w-5 h-5 text-gray-900" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {availableInstruments.map((instrument) => {
              const isSelected = localSelected.includes(instrument);
              return (
                <button
                  key={instrument}
                  onClick={() => toggleInstrument(instrument)}
                  className={`
                    px-5 py-2.5 rounded-full text-sm font-normal transition-all flex items-center gap-2
                    ${
                      isSelected
                        ? "bg-gray-100 text-gray-900 border border-gray-900"
                        : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                    }
                  `}
                >
                  <span>{instrument}</span>
                  {isSelected ? (
                    <button
                      onClick={(e) => removeInstrument(instrument, e)}
                      className="hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                    >
                      <XIcon className="w-3.5 h-3.5 text-gray-900" />
                    </button>
                  ) : (
                    <PlusIcon className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex justify-center pt-2">
            <div className="w-32 h-1 bg-gray-900 rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
}
