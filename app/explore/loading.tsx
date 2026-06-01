export default function ExploreLoading() {
  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="border-b border-gray-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl animate-pulse">
          <div className="h-10 bg-gray-800 rounded w-64 mb-4" />
          <div className="h-4 bg-gray-800 rounded w-80 mb-6" />
          <div className="h-12 bg-gray-900 border border-gray-800 rounded-2xl max-w-xl" />
        </div>
      </div>
      <div className="px-4 py-10 sm:px-6 lg:px-8 animate-pulse">
        <div className="mx-auto max-w-6xl">
          <div className="flex gap-2 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-7 w-20 bg-gray-800 rounded-full" />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-800 bg-gray-900 h-40" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
