import type { SVGProps } from "react";

export function FilterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path d="M3 4h18M3 12h12M3 20h6" />
    </svg>
  );
}
