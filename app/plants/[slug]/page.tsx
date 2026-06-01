import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CareGrid, { type CareInstructions } from "@/components/ui/CareGrid";
import ToxicityBanner from "@/components/ui/ToxicityBanner";

// Mock encyclopedia data — replace with Supabase plant encyclopedia table or static JSON
const plantData: Record<string, {
  commonName: string;
  scientificName: string;
  family: string;
  kingdom: string;
  genus: string;
  nativeRegion: string;
  summary: string;
  toxicity: string;
  care: CareInstructions;
  commonProblems: string[];
  relatedSlugs: string[];
}> = {
  "monstera-deliciosa": {
    commonName: "Monstera Deliciosa",
    scientificName: "Monstera deliciosa",
    family: "Araceae",
    kingdom: "Plantae",
    genus: "Monstera",
    nativeRegion: "Southern Mexico to Panama",
    summary:
      "Monstera deliciosa, the Swiss cheese plant, is one of the most popular tropical houseplants in the world. Its large, glossy, fenestrated leaves create a striking visual impact. It's a fast grower in the right conditions and relatively tolerant of beginner mistakes.",
    toxicity: "Toxic to cats and dogs. Can cause oral irritation, drooling, and vomiting if ingested.",
    care: {
      watering: "Water every 1–2 weeks, allowing the top inch of soil to dry between waterings. Reduce in winter.",
      sunlight: "Bright indirect light. Tolerates lower light but grows slower. Avoid harsh direct sun.",
      soil: "Well-draining, aerated potting mix with perlite and bark.",
      humidity: "Prefers 50–70% humidity. Mist leaves or use a pebble tray.",
      temperature: "18–30°C (65–85°F). Protect from drafts and temperatures below 10°C.",
      fertilizing: "Monthly balanced liquid fertilizer in spring and summer.",
    },
    commonProblems: [
      "Yellow leaves — usually overwatering",
      "Brown tips — low humidity or inconsistent watering",
      "Root rot — waterlogged soil",
      "Spider mites — dry conditions",
    ],
    relatedSlugs: ["pothos", "peace-lily"],
  },
};

const fallbackPlant = {
  commonName: "Unknown Plant",
  scientificName: "Species unknown",
  family: "Unknown",
  kingdom: "Plantae",
  genus: "Unknown",
  nativeRegion: "Unknown",
  summary: "No information available for this plant.",
  toxicity: "Unknown",
  care: {
    watering: "Information not available.",
    sunlight: "Information not available.",
    soil: "Information not available.",
    humidity: "Information not available.",
    temperature: "Information not available.",
    fertilizing: "Information not available.",
  },
  commonProblems: [],
  relatedSlugs: [],
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const plant = plantData[params.slug];
  if (!plant) return { title: "Plant Not Found — Pflanzia" };
  return {
    title: `${plant.commonName} (${plant.scientificName}) — Pflanzia`,
    description: plant.summary,
    openGraph: {
      title: `${plant.commonName} — Pflanzia Plant Encyclopedia`,
      description: plant.summary,
      type: "article",
    },
  };
}

export default function PlantPage({ params }: { params: { slug: string } }) {
  const plant = plantData[params.slug] ?? fallbackPlant;

  return (
    <>
      <Navbar />
      <main className="bg-gray-950 text-white flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-gray-800 px-4 py-4 sm:px-6 lg:px-8">
          <nav className="mx-auto max-w-4xl flex items-center gap-2 text-xs text-gray-600">
            <Link href="/explore" className="hover:text-gray-400 transition-colors">Explore</Link>
            <span>›</span>
            <span className="text-gray-400">{plant.family}</span>
            <span>›</span>
            <span className="text-gray-300">{plant.commonName}</span>
          </nav>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
            <div className="w-full md:w-48 h-48 rounded-2xl bg-green-900/20 border border-green-900 flex items-center justify-center text-7xl shrink-0">
              🌿
            </div>
            <div className="flex-1">
              {/* Taxonomy */}
              <p className="text-xs text-gray-600 mb-2">
                {plant.kingdom} › {plant.family} › {plant.genus}
              </p>
              <h1 className="text-4xl font-bold text-white mb-1">{plant.commonName}</h1>
              <p className="text-gray-400 italic text-lg mb-1">{plant.scientificName}</p>
              <p className="text-gray-600 text-sm mb-4">{plant.family}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                <span aria-hidden="true">📍</span>
                Native to {plant.nativeRegion}
              </div>
              <p className="text-gray-400 leading-relaxed">{plant.summary}</p>
            </div>
          </div>

          {/* Toxicity */}
          <div className="mb-8">
            <ToxicityBanner toxicity={plant.toxicity} />
          </div>

          {/* Care guide */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Care Guide</h2>
            <CareGrid care={plant.care} />
          </div>

          {/* Common problems */}
          {plant.commonProblems.length > 0 && (
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Common Problems</h2>
              <ul className="space-y-3">
                {plant.commonProblems.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-gray-400">
                    <span className="text-yellow-500 shrink-0 mt-0.5" aria-hidden="true">⚠</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/identify"
              className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-500 transition-colors"
            >
              Identify This Plant
            </Link>
            <Link
              href="/explore"
              className="rounded-xl border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
            >
              Explore More Plants
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
