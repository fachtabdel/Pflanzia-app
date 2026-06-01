"use client";

import Link from "next/link";

export default function ResultError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="px-4 py-20 sm:px-8 max-w-md mx-auto text-center">
      <span className="text-6xl mb-6 block" aria-hidden="true">🌵</span>
      <h1 className="text-2xl font-bold text-white mb-2">Result not found</h1>
      <p className="text-gray-400 text-sm mb-8 leading-relaxed">
        This plant result may have been deleted or the link is invalid.
        {error.message && ` (${error.message})`}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={reset}
          className="rounded-xl border border-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
        >
          Try again
        </button>
        <Link
          href="/history"
          className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-500 transition-colors"
        >
          Back to History
        </Link>
      </div>
    </div>
  );
}
