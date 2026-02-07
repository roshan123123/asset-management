import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vault - Asset Portfolio Builder" },
    { name: "description", content: "Build your investment portfolio" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Portfolio Builder
        </h1>
        <p className="text-gray-600 mb-8">
          Create a diversified portfolio from equities and bonds
        </p>
        <Link
          to="/create-portfolio"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
