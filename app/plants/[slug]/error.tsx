"use client";

import Link from "next/link";

export default function PlantPageError({ reset }: { reset: () => void }) {
  return (
    <div className="bg-gray-950 min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <span className="text-7xl mb-6 block" aria-hidden="true">🌵</span>
        <h1 className="text-2xl font-bold text-white mb-2">Plant not found</h1>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          We couldn&apos;t find a plant page for this URL. It may have been removed or the link is incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="rounded-xl border border-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
          >
            Try again
          </button>
          <Link
            href="/explore"
            className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-500 transition-colors"
          >
            Browse All Plants
          </Link>
        </div>
      </div>
    </div>
  );
}
