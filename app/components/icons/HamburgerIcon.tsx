import type { SVGProps } from "react";

export function HamburgerIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M3 7h18M3 12h18M3 17h18" />
    </svg>
  );
}
