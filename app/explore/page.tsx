import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConfidenceBadge from "@/components/ui/ConfidenceBadge";

export const metadata: Metadata = {
  title: "Explore Plants — Pflanzia",
  description:
    "Browse thousands of plant identifications from the Pflanzia community. Filter by family, region, toxicity, and more.",
};

// Mock public gallery data — replace with Supabase public identifications query
const mockPlants = [
  { id: "1", slug: "monstera-deliciosa", commonName: "Monstera Deliciosa", scientificName: "Monstera deliciosa", family: "Araceae", confidence: "high" as const, toxicity: "toxic" },
  { id: "2", slug: "peace-lily", commonName: "Peace Lily", scientificName: "Spathiphyllum wallisii", family: "Araceae", confidence: "high" as const, toxicity: "toxic" },
  { id: "3", slug: "pothos", commonName: "Pothos", scientificName: "Epipremnum aureum", family: "Araceae", confidence: "medium" as const, toxicity: "toxic" },
  { id: "4", slug: "snake-plant", commonName: "Snake Plant", scientificName: "Dracaena trifasciata", family: "Asparagaceae", confidence: "high" as const, toxicity: "safe" },
  { id: "5", slug: "boston-fern", commonName: "Boston Fern", scientificName: "Nephrolepis exaltata", family: "Nephrolepidaceae", confidence: "high" as const, toxicity: "safe" },
  { id: "6", slug: "lavender", commonName: "Lavender", scientificName: "Lavandula angustifolia", family: "Lamiaceae", confidence: "high" as const, toxicity: "safe" },
  { id: "7", slug: "aloe-vera", commonName: "Aloe Vera", scientificName: "Aloe vera", family: "Asphodelaceae", confidence: "high" as const, toxicity: "caution" },
  { id: "8", slug: "fiddle-leaf-fig", commonName: "Fiddle Leaf Fig", scientificName: "Ficus lyrata", family: "Moraceae", confidence: "medium" as const, toxicity: "toxic" },
  { id: "9", slug: "spider-plant", commonName: "Spider Plant", scientificName: "Chlorophytum comosum", family: "Asparagaceae", confidence: "high" as const, toxicity: "safe" },
];

const toxicityColor: Record<string, string> = {
  toxic: "text-red-400",
  safe: "text-green-400",
  caution: "text-yellow-400",
};

const toxicityIcon: Record<string, string> = {
  toxic: "☠️",
  safe: "✅",
  caution: "⚠️",
};

export default function ExplorePage() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-950 text-white flex-1">
        {/* Hero */}
        <section className="border-b border-gray-800 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Explore the Plant World</h1>
            <p className="text-gray-400 mb-6">
              Browse identifications from the Pflanzia community and discover new plant species.
            </p>
            <input
              type="search"
              placeholder="Search plants by name, family, or region…"
              className="w-full max-w-xl rounded-2xl border border-gray-700 bg-gray-900 px-5 py-3.5 text-sm text-white placeholder-gray-600 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>
        </section>

        {/* Filters + grid */}
        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {/* Filter chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["All", "Safe for pets", "Toxic", "Tropical", "Succulents", "Flowering", "Trees"].map((f) => (
                <button
                  key={f}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                    f === "All"
                      ? "border-green-700 bg-green-900/30 text-green-400"
                      : "border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="text-xs text-gray-600 mb-4">{mockPlants.length} plants</div>

            {/* Plant grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {mockPlants.map((plant) => (
                <Link
                  key={plant.id}
                  href={`/plants/${plant.slug}`}
                  className="group rounded-2xl border border-gray-800 bg-gray-900 p-5 hover:border-green-700 hover:bg-gray-800/60 transition-all flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-green-900/30 border border-green-900 flex items-center justify-center text-2xl">
                      🌿
                    </div>
                    <ConfidenceBadge confidence={plant.confidence} />
                  </div>

                  <div>
                    <h3 className="text-white font-semibold group-hover:text-green-400 transition-colors">
                      {plant.commonName}
                    </h3>
                    <p className="text-gray-500 text-xs italic">{plant.scientificName}</p>
                    <p className="text-gray-600 text-xs mt-0.5">{plant.family}</p>
                  </div>

                  <div className={`flex items-center gap-1.5 text-xs ${toxicityColor[plant.toxicity] ?? "text-gray-400"}`}>
                    <span aria-hidden="true">{toxicityIcon[plant.toxicity]}</span>
                    <span className="capitalize">{plant.toxicity}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
