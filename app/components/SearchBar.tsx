import { memo } from "react";
import { SearchIcon } from "./icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = memo(function SearchBar({
  value,
  onChange,
  placeholder = "Search Name",
}: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 pr-10 bg-white border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
        style={{ borderRadius: "100px" }}
      />

      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <SearchIcon className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
});
