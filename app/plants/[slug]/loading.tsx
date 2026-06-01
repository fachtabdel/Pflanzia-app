export default function PlantPageLoading() {
  return (
    <div className="bg-gray-950 min-h-screen animate-pulse">
      <div className="border-b border-gray-800 h-12" />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="w-48 h-48 rounded-2xl bg-gray-900 border border-gray-800 shrink-0" />
          <div className="flex-1 flex flex-col gap-3">
            <div className="h-3 bg-gray-800 rounded w-40" />
            <div className="h-8 bg-gray-800 rounded w-64" />
            <div className="h-5 bg-gray-800 rounded w-48" />
            <div className="h-4 bg-gray-800 rounded w-full mt-2" />
            <div className="h-4 bg-gray-800 rounded w-5/6" />
          </div>
        </div>
        <div className="h-16 bg-gray-900 border border-gray-800 rounded-xl mb-8" />
        <div className="h-6 bg-gray-800 rounded w-32 mb-4" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-gray-900 border border-gray-800 h-28" />
          ))}
        </div>
      </div>
    </div>
  );
}
