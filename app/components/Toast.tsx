import { useEffect, useState } from "react";
import { XIcon } from "./icons";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg shadow-lg border transition-all duration-300 transform min-w-[320px] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      } ${
        type === "success"
          ? "bg-green-50 border-green-600 text-green-900"
          : "bg-red-50 border-red-600 text-red-900"
      }`}
    >
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="p-1 rounded-full hover:bg-black/10 transition-colors ml-2"
      >
        <XIcon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
