export default function IdentifyLoading() {
  return (
    <div className="px-4 py-10 sm:px-8 max-w-2xl mx-auto animate-pulse">
      <div className="h-8 bg-gray-800 rounded w-48 mb-3" />
      <div className="h-4 bg-gray-800 rounded w-72 mb-8" />
      <div className="h-56 bg-gray-900 border border-gray-800 rounded-2xl mb-5" />
      <div className="h-20 bg-gray-900 border border-gray-800 rounded-xl mb-6" />
      <div className="h-12 bg-gray-800 rounded-xl" />
    </div>
  );
}
