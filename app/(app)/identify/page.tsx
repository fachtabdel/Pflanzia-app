"use client";

import { useState } from "react";
import DropZone from "@/components/DropZone";
import ConfidenceBadge from "@/components/ui/ConfidenceBadge";

interface CareInstructions {
  watering: string;
  sunlight: string;
  soil: string;
  humidity: string;
  temperature: string;
  fertilizing: string;
}

interface PlantResult {
  commonName: string;
  scientificName: string;
  family: string;
  confidence: "high" | "medium" | "low";
  summary: string;
  careInstructions?: CareInstructions;
  commonProblems?: string[];
  toxicity?: string;
  nativeRegion?: string;
}

const CARE_ICONS: Record<keyof CareInstructions, string> = {
  watering: "💧",
  sunlight: "☀️",
  soil: "🪴",
  humidity: "💨",
  temperature: "🌡️",
  fertilizing: "🌱",
};

const CARE_LABELS: Record<keyof CareInstructions, string> = {
  watering: "Watering",
  sunlight: "Sunlight",
  soil: "Soil",
  humidity: "Humidity",
  temperature: "Temperature",
  fertilizing: "Fertilizing",
};

export default function IdentifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PlantResult | null>(null);

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
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Analysis failed. Please try again.");
      if (!json.plant) throw new Error("No plant data returned. Please try again.");

      setResult(json.plant);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setFile(null);
    setContext("");
    setError(null);
  }

  return (
    <div className="px-4 py-10 sm:px-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Identify a Plant</h1>
        <p className="mt-2 text-gray-400">
          Upload a clear photo and AI will identify the plant and give you care advice.
        </p>
      </div>

      {!result && (
        <>
          <div className="mb-5">
            <DropZone onFileSelect={setFile} disabled={loading} />
          </div>

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

          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="w-full rounded-xl bg-green-600 py-3.5 text-sm font-semibold text-white hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing…
              </span>
            ) : "Analyze Plant"}
          </button>

          {error && (
            <div className="rounded-xl border border-red-800 bg-red-900/30 p-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          {loading && (
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 animate-pulse flex flex-col gap-3">
              <div className="h-5 bg-gray-800 rounded w-1/2" />
              <div className="h-4 bg-gray-800 rounded w-1/3" />
              <div className="h-4 bg-gray-800 rounded w-full mt-2" />
              <div className="h-4 bg-gray-800 rounded w-5/6" />
            </div>
          )}
        </>
      )}

      {result && !loading && (
        <div className="flex flex-col gap-5">
          {/* Header card */}
          <div className="rounded-2xl border border-green-800 bg-green-900/20 p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h2 className="text-white font-bold text-2xl">{result.commonName}</h2>
                <p className="text-gray-400 text-sm italic mt-0.5">{result.scientificName}</p>
                {result.family && (
                  <p className="text-gray-600 text-xs mt-0.5">Family: {result.family}</p>
                )}
              </div>
              <ConfidenceBadge confidence={result.confidence} />
            </div>
            {result.summary && (
              <p className="text-gray-300 text-sm leading-relaxed">{result.summary}</p>
            )}
            <div className="flex flex-wrap gap-3 mt-4">
              {result.nativeRegion && (
                <span className="text-xs text-gray-400 bg-gray-800 rounded-full px-3 py-1">
                  🌍 {result.nativeRegion}
                </span>
              )}
              {result.toxicity && (
                <span className={`text-xs rounded-full px-3 py-1 font-medium ${
                  result.toxicity.toLowerCase().includes("toxic") ||
                  result.toxicity.toLowerCase().includes("poison")
                    ? "bg-red-900/40 text-red-400"
                    : "bg-green-900/40 text-green-400"
                }`}>
                  ⚠️ {result.toxicity}
                </span>
              )}
            </div>
          </div>

          {/* Care instructions */}
          {result.careInstructions && (
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="text-white font-semibold mb-4">Care Instructions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(Object.keys(CARE_LABELS) as (keyof CareInstructions)[]).map((key) => {
                  const value = result.careInstructions?.[key];
                  if (!value) return null;
                  return (
                    <div key={key} className="flex gap-3 p-3 rounded-xl bg-gray-800/50">
                      <span className="text-xl shrink-0">{CARE_ICONS[key]}</span>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          {CARE_LABELS[key]}
                        </p>
                        <p className="text-sm text-gray-300 mt-0.5 leading-snug">{value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Common problems */}
          {result.commonProblems && result.commonProblems.length > 0 && (
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="text-white font-semibold mb-3">Common Problems</h3>
              <ul className="flex flex-col gap-2">
                {result.commonProblems.map((problem, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-amber-400 shrink-0 mt-0.5">•</span>
                    {problem}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Identify another */}
          <button
            onClick={handleReset}
            className="w-full rounded-xl border border-gray-700 py-3 text-sm font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
          >
            ↩ Identify Another Plant
          </button>
        </div>
      )}
    </div>
  );
}
