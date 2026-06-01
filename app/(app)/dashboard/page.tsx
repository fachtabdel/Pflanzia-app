import Link from "next/link";
import PlantCard from "@/components/ui/PlantCard";

// Mock data — replace with Supabase queries once connected
const mockStats = { total: 24, saved: 8, streak: 5 };

const mockRecent = [
  { id: "1", commonName: "Monstera Deliciosa", scientificName: "Monstera deliciosa", confidence: "high" as const, date: "2026-05-30T10:00:00Z" },
  { id: "2", commonName: "Peace Lily", scientificName: "Spathiphyllum wallisii", confidence: "high" as const, date: "2026-05-28T14:30:00Z" },
  { id: "3", commonName: "Pothos", scientificName: "Epipremnum aureum", confidence: "medium" as const, date: "2026-05-25T09:15:00Z" },
];

const tips = [
  "Water most houseplants when the top inch of soil feels dry.",
  "Most plants prefer bright indirect light, not direct sun.",
  "Dust your plant leaves occasionally to improve photosynthesis.",
  "Repot plants in spring when roots start escaping drainage holes.",
  "Yellow leaves usually mean overwatering; drooping means underwatering.",
];

const todayTip = tips[new Date().getDay() % tips.length];

const quickActions = [
  { label: "Identify a Plant", href: "/identify", icon: "🔍", description: "Upload a photo" },
  { label: "View History", href: "/history", icon: "🕐", description: "Past identifications" },
  { label: "Saved Plants", href: "/saved", icon: "🔖", description: "Your collection" },
];

export default function DashboardPage() {
  return (
    <div className="px-4 py-10 sm:px-8 max-w-4xl mx-auto">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-gray-500 text-sm">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Identifications", value: mockStats.total, icon: "🔍" },
          { label: "Saved Plants", value: mockStats.saved, icon: "🔖" },
          { label: "Day Streak", value: mockStats.streak, icon: "🔥" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-gray-800 bg-gray-900 p-5 text-center">
            <span className="text-2xl block mb-2" aria-hidden="true">{stat.icon}</span>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center gap-4 rounded-2xl border border-gray-800 bg-gray-900 px-5 py-4 hover:border-green-700 hover:bg-gray-800/60 transition-all"
            >
              <span className="text-2xl" aria-hidden="true">{action.icon}</span>
              <div>
                <p className="text-white font-semibold text-sm">{action.label}</p>
                <p className="text-gray-500 text-xs">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent identifications */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Recent Identifications</h2>
          <Link href="/history" className="text-sm text-green-400 hover:text-green-300 transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {mockRecent.map((plant) => (
            <PlantCard key={plant.id} {...plant} />
          ))}
        </div>
      </div>

      {/* Tip of the day */}
      <div className="rounded-2xl border border-green-800 bg-green-900/20 p-5 flex items-start gap-3">
        <span className="text-xl shrink-0" aria-hidden="true">💡</span>
        <div>
          <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-1">Tip of the Day</p>
          <p className="text-gray-300 text-sm leading-relaxed">{todayTip}</p>
        </div>
      </div>
    </div>
  );
}
