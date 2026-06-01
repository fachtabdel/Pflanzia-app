export default function HistoryLoading() {
  return (
    <div className="px-4 py-10 sm:px-8 max-w-4xl mx-auto animate-pulse">
      <div className="h-8 bg-gray-800 rounded w-56 mb-2" />
      <div className="h-4 bg-gray-800 rounded w-72 mb-8" />
      <div className="flex gap-3 mb-6">
        <div className="flex-1 h-10 bg-gray-900 border border-gray-800 rounded-xl" />
        <div className="w-44 h-10 bg-gray-900 border border-gray-800 rounded-xl" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-gray-800 bg-gray-900 h-36" />
        ))}
      </div>
    </div>
  );
}
