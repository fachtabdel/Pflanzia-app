export default function DashboardLoading() {
  return (
    <div className="px-4 py-10 sm:px-8 max-w-4xl mx-auto animate-pulse">
      <div className="h-8 bg-gray-800 rounded w-40 mb-2" />
      <div className="h-4 bg-gray-800 rounded w-56 mb-8" />
      <div className="grid grid-cols-3 gap-4 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-gray-800 bg-gray-900 h-28" />
        ))}
      </div>
      <div className="h-4 bg-gray-800 rounded w-28 mb-3" />
      <div className="grid grid-cols-3 gap-3 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-gray-800 bg-gray-900 h-20" />
        ))}
      </div>
      <div className="h-6 bg-gray-800 rounded w-44 mb-4" />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-gray-800 bg-gray-900 h-32" />
        ))}
      </div>
    </div>
  );
}
