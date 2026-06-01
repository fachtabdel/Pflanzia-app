export default function ResultLoading() {
  return (
    <div className="px-4 py-10 sm:px-8 max-w-3xl mx-auto animate-pulse">
      <div className="h-4 bg-gray-800 rounded w-24 mb-8" />
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-800" />
          <div className="flex flex-col gap-2">
            <div className="h-6 bg-gray-800 rounded w-48" />
            <div className="h-4 bg-gray-800 rounded w-36" />
          </div>
        </div>
        <div className="h-4 bg-gray-800 rounded w-full mb-2" />
        <div className="h-4 bg-gray-800 rounded w-5/6" />
      </div>
      <div className="rounded-xl bg-gray-900 border border-gray-800 h-16 mb-6" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-gray-900 border border-gray-800 h-28" />
        ))}
      </div>
    </div>
  );
}
