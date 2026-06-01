"use client";

import { useState } from "react";
import DropZone from "@/components/DropZone";
import ConfidenceBadge from "@/components/ui/ConfidenceBadge";
import Link from "next/link";

interface PlantResult {
  commonName: string;
  scientificName: string;
  family: string;
  confidence: "high" | "medium" | "low";
  summary: string;
}

export default function IdentifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PlantResult | null>(null);
  const [resultId] = useState<string>("placeholder-id");

  async function handleAnalyze() {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", file);
      if (context.trim()) formData.append("context", context.trim());

      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Analysis failed. Please try again.");

      const json = await res.json();
      setResult(json.plant);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-4 py-10 sm:px-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Identify a Plant</h1>
        <p className="mt-2 text-gray-400">
          Upload a clear photo of a plant and AI will identify it instantly.
        </p>
      </div>

      {/* DropZone */}
      <div className="mb-5">
        <DropZone onFileSelect={setFile} disabled={loading} />
      </div>

      {/* Context input */}
      <div className="mb-6">
        <label htmlFor="context" className="block text-sm font-medium text-gray-300 mb-1.5">
          Additional context <span className="text-gray-600">(optional)</span>
        </label>
        <textarea
          id="context"
          rows={2}
          placeholder="e.g. Found in a tropical greenhouse in Spain..."
          value={context}
          onChange={(e) => setContext(e.target.value)}
          disabled={loading}
          className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 resize-none disabled:opacity-50"
        />
      </div>

      {/* Analyze button */}
      <button
        onClick={handleAnalyze}
        disabled={!file || loading}
        className="w-full rounded-xl bg-green-600 py-3.5 text-sm font-semibold text-white hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
      >
        {loading ? "Analyzing…" : "Analyze Plant"}
      </button>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-800 bg-red-900/30 p-4 text-red-400 text-sm mb-6">
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 animate-pulse flex flex-col gap-3">
          <div className="h-5 bg-gray-800 rounded w-1/2" />
          <div className="h-4 bg-gray-800 rounded w-1/3" />
          <div className="h-4 bg-gray-800 rounded w-full mt-2" />
          <div className="h-4 bg-gray-800 rounded w-5/6" />
        </div>
      )}

      {/* Inline result preview */}
      {result && !loading && (
        <div className="rounded-2xl border border-green-800 bg-green-900/20 p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-white font-bold text-xl">{result.commonName}</h2>
              <p className="text-gray-400 text-sm italic">{result.scientificName}</p>
              <p className="text-gray-600 text-xs mt-0.5">{result.family}</p>
            </div>
            <ConfidenceBadge confidence={result.confidence} />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{result.summary}</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href={`/result/${resultId}`}
              className="flex-1 rounded-xl bg-green-600 py-2.5 text-sm font-semibold text-white hover:bg-green-500 transition-colors text-center"
            >
              View Full Results
            </Link>
            <button
              onClick={() => { setResult(null); setFile(null); setContext(""); }}
              className="flex-1 rounded-xl border border-gray-700 py-2.5 text-sm font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
            >
              Identify Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
