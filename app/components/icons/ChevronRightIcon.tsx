import type { SVGProps } from "react";

export function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}
