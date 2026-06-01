import Link from "next/link";
import CareGrid from "@/components/ui/CareGrid";
import ToxicityBanner from "@/components/ui/ToxicityBanner";
import ConfidenceBadge from "@/components/ui/ConfidenceBadge";

// Mock data — replace with Supabase DB fetch by ID once connected
const getMockResult = (id: string) => ({
  id,
  commonName: "Monstera Deliciosa",
  scientificName: "Monstera deliciosa",
  family: "Araceae",
  confidence: "high" as const,
  nativeRegion: "Southern Mexico to Panama",
  summary:
    "Monstera deliciosa, commonly known as the Swiss cheese plant, is a popular tropical houseplant prized for its large, fenestrated leaves. It thrives in bright indirect light and is relatively easy to care for.",
  toxicity: "Toxic to cats and dogs. Can cause oral irritation, drooling, and vomiting if ingested.",
  commonProblems: [
    "Yellow leaves from overwatering",
    "Brown leaf tips from low humidity",
    "Root rot in waterlogged soil",
    "Spider mites in dry conditions",
  ],
  care: {
    watering: "Water every 1–2 weeks, allowing the top inch of soil to dry out between waterings.",
    sunlight: "Bright indirect light. Avoid direct afternoon sun which can scorch the leaves.",
    soil: "Well-draining potting mix with perlite. A mix of peat, bark, and perlite works well.",
    humidity: "Prefers 50–70% humidity. Mist regularly or use a humidifier in dry climates.",
    temperature: "18–30°C (65–85°F). Keep away from drafts and cold windows.",
    fertilizing: "Feed monthly with a balanced liquid fertilizer during spring and summer.",
  },
  date: new Date().toISOString(),
});

export default function ResultPage({ params }: { params: { id: string } }) {
  const plant = getMockResult(params.id);

  return (
    <div className="px-4 py-10 sm:px-8 max-w-3xl mx-auto">
      {/* Back link */}
      <Link
        href="/history"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-8"
      >
        ← Back to History
      </Link>

      {/* Plant hero */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-green-900/30 border border-green-800 flex items-center justify-center text-4xl">
              🌿
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{plant.commonName}</h1>
              <p className="text-gray-400 italic text-sm">{plant.scientificName}</p>
              <p className="text-gray-600 text-xs mt-0.5">{plant.family}</p>
            </div>
          </div>
          <ConfidenceBadge confidence={plant.confidence} />
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-4">
          <span aria-hidden="true">📍</span>
          <span>Native to {plant.nativeRegion}</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">{plant.summary}</p>
      </div>

      {/* Toxicity */}
      <div className="mb-6">
        <ToxicityBanner toxicity={plant.toxicity} />
      </div>

      {/* Care instructions */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white mb-4">Care Instructions</h2>
        <CareGrid care={plant.care} />
      </div>

      {/* Common problems */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-4">Common Problems</h2>
        <ul className="space-y-3">
          {plant.commonProblems.map((problem) => (
            <li key={problem} className="flex items-start gap-3 text-sm text-gray-400">
              <span className="text-yellow-500 shrink-0 mt-0.5" aria-hidden="true">⚠</span>
              {problem}
            </li>
          ))}
        </ul>
      </div>

      {/* Action bar */}
      <div className="flex flex-wrap gap-3">
        <button className="flex-1 rounded-xl bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-500 transition-colors text-center">
          🔖 Save to Collection
        </button>
        <button className="rounded-xl border border-gray-700 px-4 py-3 text-sm font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors">
          Share
        </button>
        <Link
          href="/identify"
          className="rounded-xl border border-gray-700 px-4 py-3 text-sm font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
        >
          Identify Another
        </Link>
      </div>
    </div>
  );
}
