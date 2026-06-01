import PlantCard from "@/components/ui/PlantCard";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";

// Mock data — replace with Supabase paginated query once connected
const mockHistory = [
  { id: "1", commonName: "Monstera Deliciosa", scientificName: "Monstera deliciosa", confidence: "high" as const, date: "2026-05-30T10:00:00Z", family: "Araceae" },
  { id: "2", commonName: "Peace Lily", scientificName: "Spathiphyllum wallisii", confidence: "high" as const, date: "2026-05-28T14:30:00Z", family: "Araceae" },
  { id: "3", commonName: "Pothos", scientificName: "Epipremnum aureum", confidence: "medium" as const, date: "2026-05-25T09:15:00Z", family: "Araceae" },
  { id: "4", commonName: "ZZ Plant", scientificName: "Zamioculcas zamiifolia", confidence: "high" as const, date: "2026-05-20T16:00:00Z", family: "Araceae" },
  { id: "5", commonName: "Snake Plant", scientificName: "Dracaena trifasciata", confidence: "high" as const, date: "2026-05-18T11:30:00Z", family: "Asparagaceae" },
  { id: "6", commonName: "Fiddle Leaf Fig", scientificName: "Ficus lyrata", confidence: "low" as const, date: "2026-05-15T08:45:00Z", family: "Moraceae" },
];

export default function HistoryPage() {
  const hasHistory = mockHistory.length > 0;

  return (
    <div className="px-4 py-10 sm:px-8 max-w-4xl mx-auto">
      <PageHeader
        title="Identification History"
        description="All your past plant identifications in one place."
      />

      {!hasHistory ? (
        <EmptyState
          icon="🌱"
          title="No identifications yet"
          description="Upload your first plant photo to get started."
          cta={{ label: "Identify a Plant", href: "/identify" }}
        />
      ) : (
        <>
          {/* Search and filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="search"
              placeholder="Search by plant name…"
              className="flex-1 rounded-xl border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
            <select className="rounded-xl border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-gray-300 focus:border-green-600 focus:outline-none">
              <option value="">Sort: Newest first</option>
              <option value="oldest">Sort: Oldest first</option>
              <option value="confidence-high">Confidence: High</option>
              <option value="confidence-low">Confidence: Low</option>
            </select>
          </div>

          <div className="text-xs text-gray-600 mb-4">{mockHistory.length} identifications</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockHistory.map((plant) => (
              <PlantCard key={plant.id} {...plant} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
