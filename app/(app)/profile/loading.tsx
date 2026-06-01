export default function ProfileLoading() {
  return (
    <div className="px-4 py-10 sm:px-8 max-w-2xl mx-auto animate-pulse">
      <div className="h-8 bg-gray-800 rounded w-52 mb-8" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-gray-800 bg-gray-900 h-40 mb-6" />
      ))}
    </div>
  );
}
