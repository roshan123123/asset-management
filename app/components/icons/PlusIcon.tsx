import type { SVGProps } from "react";

export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path d="M12 4v16m8-8H4" />
    </svg>
  );
}
