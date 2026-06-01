import PlantCard from "@/components/ui/PlantCard";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";

// Mock data — replace with Supabase saved_plants query once connected
const mockSaved = [
  { id: "1", commonName: "Monstera Deliciosa", scientificName: "Monstera deliciosa", confidence: "high" as const, date: "2026-05-30T10:00:00Z", family: "Araceae" },
  { id: "4", commonName: "ZZ Plant", scientificName: "Zamioculcas zamiifolia", confidence: "high" as const, date: "2026-05-20T16:00:00Z", family: "Araceae" },
  { id: "5", commonName: "Snake Plant", scientificName: "Dracaena trifasciata", confidence: "high" as const, date: "2026-05-18T11:30:00Z", family: "Asparagaceae" },
];

export default function SavedPage() {
  const hasSaved = mockSaved.length > 0;

  return (
    <div className="px-4 py-10 sm:px-8 max-w-4xl mx-auto">
      <PageHeader
        title="Saved Plants"
        description="Your bookmarked plant collection."
      />

      {!hasSaved ? (
        <EmptyState
          icon="🔖"
          title="No saved plants yet"
          description="Save plants from your results to build your personal collection."
          cta={{ label: "Start Exploring", href: "/explore" }}
        />
      ) : (
        <>
          {/* Filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="search"
              placeholder="Search saved plants…"
              className="flex-1 rounded-xl border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
            <select className="rounded-xl border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-gray-300 focus:border-green-600 focus:outline-none">
              <option value="">All plants</option>
              <option value="safe">Safe for pets</option>
              <option value="toxic">Toxic</option>
            </select>
          </div>

          <div className="text-xs text-gray-600 mb-4">{mockSaved.length} saved plants</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockSaved.map((plant) => (
              <PlantCard key={plant.id} {...plant} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
