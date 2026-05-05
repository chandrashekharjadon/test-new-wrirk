export default function ResearchSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Hero / Header Section */}
      <div className="w-full h-40 bg-gray-200 rounded-xl mb-6" />

      {/* Title */}
      <div className="h-6 w-1/3 bg-gray-200 rounded mb-4" />

      {/* Paragraph lines */}
      <div className="space-y-3 mb-8">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-32 bg-gray-200 rounded-xl"
          />
        ))}
      </div>

      {/* Bottom section */}
      <div className="mt-8 space-y-3">
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
      </div>
    </div>
  );
}